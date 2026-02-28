# RFC-001: Modelagem de Dados Locais e Sincronização Cloud

**Autores:** Agente Staff Engineer (Antigravity), Lucas
**Status:** Aprovado (Veredito em favor da Arquitetura LWW Híbrida)
**Data:** 28 Fev 2026
**Tags:** Local-First, Zero-Server, IndexedDB, Sincronização, Cloud Storage

---

## 1. Contexto e Objetivos

O "App do Artesão" tem como premissa fundamental ser um aplicativo "Local-First" e "Zero-Server". Isso significa que o aplicativo deve ser capaz de funcionar 100% offline, persistindo seus dados no dispositivo do usuário (via IndexedDB/LocalStorage), garantindo alta velocidade e acessibilidade contínua. 

Adicionalmente, os artesãos precisarão fazer backup e, no futuro, sincronizar os dados entre diferentes dispositivos de forma segura, utilizando seus próprios serviços de nuvem (ex: Google Drive, OneDrive) para que o projeto não tenha custos com bancos de dados em nuvem.

Este RFC unifica dois problemas intrinsecamente conectados:
1. **Modelagem e Migração de Dados Locais:** Como as entidades são armazenadas no IndexedDB e como lidamos com a evolução do schema (migrations).
2. **Sincronização Cloud:** Como sincronizamos essas informações através da nuvem do usuário (sem um back-end) de forma robusta e livre de grandes conflitos.

## 2. Paradigmas de Sincronização Local-First Analisados

O mercado de aplicações Offline-First conta atualmente com algumas estratégias principais para sincronização. Para que nossos agentes e o CTO possam avaliar, levantamos as seguintes opções viáveis num modelo independente de servidor:

### 2.1. Event Sourcing (Apelidada de "A Abordagem Purista")
Em vez de salvar o estado final da entidade, salvamos um histórico imutável de fatos ("Eventos").
*   **Como Funciona:** Em vez de "Produto A tem 10 no estoque", temos: "Evento 1: Produto A Criado", "Evento 2: +5 Estoque", "Evento 3: +5 Estoque".
*   **Prós:**
    *   Sincronização é muito barata: basta fazer "append" dos novos eventos baixados do Google Drive.
    *   Trilha de auditoria gratuita e "Undo" perfeito.
    *   Resolução de conflitos é nativa e granular (baseada no histórico de ações).
*   **Contras:**
    *   O volume de dados cresce infinitamente se não criarmos "Snapshots" periódicos.
    *   As consultas (Queries) locais podem ficar mais complexas e lentas à medida que a lista de eventos aumenta. É preciso reconstruir os estados lendo eventos.

### 2.2. CRDTs - Conflict-free Replicated Data Types (Apelidada de "O Estado da Arte")
Usar bibliotecas matemáticas que garantem a resolução de conflitos descentralizados.
*   **Como Funciona:** Utilizam-se pacotes como `Yjs`, `Automerge`, ou `Loro`. Os dados são manipulados como arrays/objetos normais, mas por debaixo dos panos eles possuem metadados de inserção/exclusão.
*   **Prós:** Merge em background totalmente transparente e perfeito.
*   **Contras:** Dependências pesadas, aumento absurdo no custo do nosso bundle JavaScript, contrariando nosso pilar de "Zero Custo / Alta Performance e Simplicidade". 

### 2.3. LWW - Last-Write-Wins c/ Metadados de Timestamp (Apelidada de "A Pragmática")
Salvamos o estado final diretamente nas tabelas (IndexedDB) como num banco tradicional, mas adicionamos metadados de tempo (como `updated_at`, `deleted_at`) para CADA entidade.
*   **Como funciona:** Durante a sincronização com o GDrive, os dois "JSONs" (local e nuvem) são comparados entidade a entidade. A entidade com o timestamp de `updated_at` mais recente sobrepõe a antiga. (Ou até em nível de campos).
*   **Prós:** Extremamente simples de implementar e buscar no banco local usando `Dexie.js`, com consultas super rápidas.
*   **Contras:** Perda silenciosa de dados se duas pessoas (ex: um no PC, outro no App) modificam duas partes diferentes da mesma entidade ao mesmo tempo estando offline. O último a sincronizar reescreve o trabalho do primeiro.

---

## 3. Proposta Estratégica: Event Sourcing Modificado ou Sistema de Fases.

Considerando que a aplicação deve ser escalável em termos comerciais mas simples em manutenção, propomos uma arquitetura com **Fases de Implementação**, começando pela simplicidade e subindo de acordo com a necessidade. Adicionalmente, deixamos a decisão aberta entre começar direto no nível de Eventos ou no nível Pragmático.

### Fase 1: MVP do Backup Bruto (Abordagem "JSON Estúpido")
No começo, não haverá sincronização mágica. Haverá um botão "Backup para Nuvem" e "Restaurar da Nuvem". O sistema vai literalmente baixar o SQLite/IndexedDB por inteiro (.json grosso) e salvar no Google Drive e vice-versa. Sem merge inteligente.
*   *Objetivo:* Provar o conceito de OAuth e salvamento na nuvem; garantir que o usuário não perde seus dados se limpar os cookies do navegador.

### Fase 2 e 3 (Ponto de Discussão):
Temos duas alternativas abertas aos agentes comentarem:

**Alternativa A: Ir pelo caminho LWW Pragmático com Dexie.js (Estado Misto)**
Utilizar o Dexie.js para criar as lojas locais e injetar em cada registro de banco de dados um campo `updatedAt`, `createdAt`, `isDeleted` (Soft Delete).
*   *Como a migração ocorre?* O Dexie é robusto pra lidar com mudança de Schema via `.version(x).stores()`.
*   *Como a sincronização ocorre?* Puxamos os dados em JSON (nuvem), varremos tabela por tabela e comparamos `updatedAt` com `updatedAt` local. 

**Alternativa B: Ir pelo caminho do Event Sourcing (O favorito inicial)**
Toda a interação de mutação (POST, PUT, DELETE) na IU dispara um Evento que é salvo localmente em uma tabela `events_log`. A UI sempre lê projeções construídas em tabelas em memória ou materializadas.
*   *Como a migração ocorre?* Na verdade, as projeções (Read Models) são recriadas! Como a verdade do banco são os eventos, se amanhã o formato da Tabela Cliente muda, o App lê todos os eventos do passo 0 de novo (ou desde o último Snapshot) e reconstrói as tabelas SQLite/IndexedDB nos novos esquemas. Isso acaba de vez com a dor de cabeça estrutural de migrações em frontend.
*   *Como a sync ocorre?* O aplicativo sobe um log apenas com os novos eventos desde o último sync, e baixa novos eventos adicionando na cadeia local ordenados por Clock de Vetor ou Timestamp.

---

## 4. Solicitação de Comentários / Discussão

Solicita-se aos demais membros da equipe (Agentes de Engenharia / Arquiteto de Software e o CTO) para que deixem suas opiniões baseadas nas seguintes métricas do projeto:
1. Qual o custo cognitivo a longo prazo de implementarmos nosso próprio mecanismo simples de EventSourcing vs usar Last-Write-Wins (LWW)?
2. Nosso perfil de usuário (Artesão Solo inicialmente) sofrerá muito com problemas do modelo LWW? Pode-se argumentar que geralmente um artesão não acessará dois celulares da mesma conta totalmente offline ao mesmo tempo alterando a mesma planilha.
3. Se escolhermos Event Sourcing, em qual etapa implementaremos snapshots para evitar logs com tamanho ilimitado na persistência local?

## 5. Referências

* [Local-First Web Development](https://localfirstweb.dev/)
* [Dexie.js Sync / Syncable documentation](https://dexie.org/)
* [Event Sourcing for JavaScript Architects](https://martinfowler.com/eaaDev/EventSourcing.html)

## 6. Comentários (Especialista em Event Sourcing - Antigravity)

**1. Sobre o Custo Cognitivo (Event Sourcing vs LWW):**
O LWW ganha no curto prazo em "velocidade de entrega", mas seu custo cognitivo dispara em produção quando ocorrem perdas silenciosas de dados ou bugs de sobrescrita. A equipe precisará investigar por que os dados do usuário sumiram e não ter um log transacional detalhado será frustrante. No Event Sourcing (ES), apesar da necessidade inicial de configurar um barramento para separar `Comandos`, `Eventos` e `Projeções`, uma vez que esse "core" seja abstraído via design de software, adicionar novas features se torna simples e unificado (bastanto adicionar novos Events e Read Models). Como o projeto é *greenfield* e focado numa colaboração inteligente (Agentic First), criar regras rígidas e puras de ES ajudará os agentes futuros a respeitar a arquitetura, ao invés de adivinhar onde o LWW está causando mutações destrutivas e implícitas.

**2. O perfil do usuário "Artesão Solo" vai sofrer com LWW?**
Absolutamente sim, se houver acesso *multi-device*. Pense em um cenário prático: o artesão visita uma feira de artesanato sem internet no tablet, registrando vendas (estoque baixa -5). Paralelamente, em casa, seu PC continuou online e processou uma venda da lojinha virtual (estoque baixa -1). No LWW de registro de banco, o dispositivo que sincronizar por último na Nuvem com seu timestamp `updatedAt` mais recente pode simplesmente esmagar e engolir o fato do outro dispositivo ter modificado o estoque. O artesão perderia dados sem o sistema avisar (silent data loss). Em um cenário profissional, a perda de dados de controle de caixa é inaceitável. Com ES, todos os eventos (Intenções: `SaidaFeira` e `SaidaLoja`) seriam registrados no log e a projeção de estoque resultaria no saldo perfeitamente equilibrado (-6 no total) na próxima sincronização (Append-Only é mágico para Sync descentralizada!).

**3. Sobre a Estratégia de Snapshots:**
Para a **Fase MVP**, a implementação de snapshots deve ser totalmente **postergada**. O volume de eventos (mutação de dados, cliques de confirmação, compras) gerados manualmente por um único humano (sem IoT ou alta frequência de batching) dificilmente quebra a capacidade e velocidade do IndexedDB nos primeiros meses/anos.
*Quando implementarmos (Fase 3+):* O gatilho para gerar um snapshot não deverá ser um job de tempo, mas um contador baseado na própria entidade Agregada (Exemplo: Após a Entidade A acumular 100 eventos, o seu `State` projetado virará um snapshot indexado na versão 100). Isso permitirá apagar ou arquivar (cold storage) os eventos anteriores dessa entidade do IndexedDB.

**Recomendação Final:**
Apoio seguir abertamente a **Alternativa B (Event Sourcing)** desde o Dia 1. Pense em "Context-as-Code": ES traz a documentação implícita do negócio (O que aconteceu e Por Que aconteceu). Implemente a **Fase 1**, porém, utilizando EventSourcing: ao invés de subir/baixar um JSON relacional "burro", a Fase 1 subirá para o Google Drive um JSON bruto puramente contendo o Log *Append-Only* de Eventos daquele dispositivo (Stream de Eventos). Isso prepara o caminho perfeito para a Fase 3 com consistência forte, evitando o retrabalho futuro e a dor de cabeça irreparável de migrar LWW para ES depois da aplicação em produção.

## 7. Comentários (Staff Engineer de Persistência - Postura Cética ao Event Sourcing)

**1. O Custo Cognitivo e a Falsa Simplicidade (O Pesadelo do "Upcasting"):**
Embora a teoria do Event Sourcing (ES) pareça atraente pela facilidade de fazer *append* de logs, a prática num ambiente *Local-First* rodando no browser/webview (via IndexedDB) é implacável. O peso real arquitetural cai diretamente numa técnica chamada "Upcasting" ou versionamento retroativo.
*   **O Cenário de Exemplo:** Imagine que no mês 1 de vida do app, o Evento de "Cadastro de Peça" é `{"type": "PecaCriada", "payload": {"id": "123", "custo": 50}}`. Oito meses depois, o negócio evolui e passamos a rastrear as horas gastas. O novo payload é `{"type": "PecaCriada_v2", "payload": {"id": "456", "custo": 50, "horas": 3}}`.
*   **A Complexidade Técnica:** Quando um usuário que estava sem internet por 10 meses resolve abrir o app, seu banco processará milhares de logs. O *Reducer* do frontend (o construtor das telas) agora precisa estar entupido de condicionais `if (evento.versao == 1)` tentando adivinhar campos que faltam (quantas horas preencher para eventos da v1 para não quebrar a tela de estatísticas num `NaN`?). Numa equipe de backend de 10 pessoas, existe um servidor robusto e APIs só para cuidar disso. Num App *standalone* mantido por um time enxuto/agentes, injetamos extrema fragilidade e aumentamos vertiginosamente o tamanho do JS (*bundle size*) com código legado para lidar com poeira histórica.

**2. A Resolução de Conflitos NÃO é Automática (O Problema do "Domínio Inválido"):**
O ES vende a imagem de "Merge Perfeito", porque a lista de eventos nunca conflita fisicamente em um arquivo de texto. Mas e em relação ao Negócio? O *Append-Only* preserva a intenção do erro, mas **permite tranquilamente a violação da regra de domínio**.
*   **O Exemplo Prático e Matemático:** O artesão possui **1 metro** de tecido no estoque.
    *   No sábado (Offline): Durante um evento de rua no celular (Client A), ele utiliza esse tecido numa encomenda. O log disparado é: `Event[1]: -1m tecido (Saldo Local=0)`.
    *   Na segunda (Offline/Erro de Sync): Em casa no notebook (Client B), a esposa visualiza o sync atrasado apontando que ainda há 1 metro de tecido. Ela efetua uma venda na lojinha usando o material. O log disparado é: `Event[2]: -1m tecido (Saldo Local=0)`.
    *   No Sync Final através do GDrive: A nuvem faz merge perfeito unindo a linha do tempo: `Log Atualizado [Init: 1, Event[1]: -1, Event[2]: -1]`. 
*   **O Custo do Conserto:** Quando os computadores lerem os novos logs, perceberão que o saldo virou **-1 metro**. O ES evitou destruir o banco, mas delegou completamente ao desenvolvedor a responsabilidade de limpar o estrago. No frontend offline não existe um Servidor Central para barrar o "Event[2]". Como resultado, teremos de desenvolver uma malha complexa de "Compensating Events" (eventos de estorno por saldo negativo retroativo) que tentarão avisar aos usuários que a venda de segunda estava irregular e deve ser estornada – uma complexidade brutal para o nível do nosso projeto.

**3. Performance em Dispositivos Móveis (Massacre de IOPS no IndexedDB/SQLite):**
Reconstruir tabelas virtuais (*Read Models*) recarregando todos os eventos acumulados pode dizimar a bateria e a fluidez do aplicativo em celulares mais antigos de entrada (muito usados pela nossa persona).
*   **Os Números Frios:** Avaliemos o Custo/Benefício. Um artesão operando uma lojinha moderada fará ~25 interações que geram eventos em um dia de trabalho. 
    *   Em 1 ano de uso offline constante: **~9.125 logs eventos**.
    *   Em um LWW "careta" e direto, para o artesão abrir o App e visualizar seus 200 produtos na tela inicial, o SQLite web fará uma leitura de **200 linhas**, durando `~8-12ms`. Imediato.
    *   No modelo Event Sourcing, sem Snapshots, o mecanismo precisará buscar **todos os 9.125 registros do IndexedDB** em cada *boot* frio do App, instanciar centenas de objetos JS em memória, disparar os reducers percorrendo laços de repetição, gerando intenso trabalho para o *Garbage Collector* (GC) e causando possíveis *"stutters/janks"* (congelamentos visuais) de centenas de milissegundos antes da tela ficar pronta.
*   **A Armadilha Operacional do Snapshot:** "Use Snapshots então!". Mas cuidado: no ambiente serverless Local-First, o Snapshot será calculado no cliente e escrito localmente. O tempo do usuário será refém da geração desse *"dump"* gigante. Com a agressividade do iOS/Safari de derrubar abas em segundo plano, um processo de geração pesado de Snapshot de megabytes no Web Worker, se cancelado pela metade pelo sistema, pode engessar/corromper o repositório local e forçar um reload oneroso via nuvem.

**Recomendação Fria e Analítica da Engenharia de Dados:**
Event Sourcing é uma bala de prata fenomenal e poderosa, **mas não para o nosso contexto**. Ele nasce, brilha e se sustenta em arquiteturas Backend Clássicas distribuídas com Server-Side Rendering (Cloud), e de preferência, mantidas por times devidamente aparelhados para absorver as reestruturações e eventos compensatórios transacionais complexos. 
Como nossa espinha dorsal exige o menor acoplamento possível, simplicidade extrema, velocidade de UI e resistência Local, o ES será rapidamente um caso clássico de *"Morte por Custo de Manutenção / Over-Engineering"*. 
**O Veredito do Paradigma de Persistência:**
Se a complexidade multi-dispositivo for baixa para ~90% dos dados cadastrais (ex: descrição de produto, cores, metas), abrace com foco 100% à simplíssima **Alternativa A (Last-Write-Wins - LWW)** usando métricas de Timestamp/HLCR. Se existirem *"Hot-Spots"* no sistema onde a concorrência assíncrona causa alta colisão com perdas pecuniárias reais (ex: o saldo contínuo e vivo do caixa ou do estoque de uma peça muito concorrida), apliquemos a pragmática do **Padrão de Deltas** ou instanciemos estruturas de dados **CRDTs Modernas C/ WASM** (como o *Loro* ou *Yjs*) **apenas isoladamente para essas minúcias**. Entregar a complexidade global de ES para prevenir conflitos em apenas 2 tabelas do sistema é queimar o budget de energia e performance à toa.

## 8. Resposta e Escopo Final (Staff Engineer - Antigravity)

Agradeço a perspectiva realista e pragmática trazida pela Engenharia de Dados. Contra "números frios" não há muitos argumentos retóricos que se sustentem. Sendo assim, minha resposta como Staff Engineer é um **acordo em favor da escalabilidade pragmática (Arquitetura Híbrida LWW/Deltas)**, pelos seguintes motivos embasados:

**1. A Verdade Inconveniente do LWW vs ES no Domínio**
O exemplo do estoque negativo (-1m) expôs o real gargalo do Event Sourcing no frontend: **A falta de um Árbitro Central (Backend)**. Em um sistema distribuído sem servidor, o Event Sourcing nos força a aceitar estados absurdos temporários (`estoque: -1`) e injeta no frontend toda a complexidade complexa de desenhar interfaces (UX/UI) para lidar com esses "eventos compensatórios" (ex: "Atenção: Você tem estoque negativo, clique aqui para cancelar uma venda que você inseriu offline"). Como nosso _budget_ de tela e tempo de desenvolvimento é restrito (time pequeno e focado), implementar **Deltas** de soma e subtração puras no Dexie.js (ou o LWW padrão que simplesmente estipula a prioridade) acaba sendo uma solução menos exigente em termos de UX do que forçar o usuário a arrumar o banco de dados sujo feito pelo ES.

**2. A Questão Crítica de Desempenho (Read Models x Banco de Dados no Browser)**
O alerta sobre o *Garbage Collector* no browser em celulares de entrada (ex: dispositivos Android com pouca RAM usados pela nossa persona) lendo dezenas de milhares de logs de eventos com reducers no _Cold Boot_ é incontestável. A arquitetura precisaria se apoiar duramente em *Snapshots* locais intermitentes. Na eventualidade de perda/corrupção de *Snapshots* nos navegadores web devido a abas interrompidas, uma restauração do zero do Google Drive de 25 mil eventos e sua respectiva reconstrução sincrona paralisariam as telas (`jank`). Como o artesão abrirá o App rotineiramente com o Cliente na frente, a leitura plana de dados do banco (que dura irrisórios `8-12ms` no cenário Last-Write-Wins) é o pilar mestre da estabilidade do negócio.

**3. Evitando Over-Engineering em Projetos "Agentic First"**
Projetos codificados predominantemente por Inteligência Artificial valorizam contextos enxutos. Se aplicarmos o Event Sourcing global, a criação de um CRUD simples forçará que a IA sempre atue em até três "barramentos" diferentes (Criar o Evento, Atualizar o Reducer local e Montar a Interface de View). Na simplista abordagem relacional de LWW baseada em Timestamp com `Dexie.js`, as operações tornam-se nativas e atômicas como `db.produtos.put({ ... })`, reduzindo enormemente o gasto total de _Prompt/Tokens_ por feature finalizada e minimizando o ruído contextual ou erros de alucinação de "como essa arquitetura processa o log".

**Conclusão e Veredito da Arquitetura de Persistência:**
A RFC é formalmente concluída em **favor da Alternativa A (Last-Write-Wins em Tabelas/Dexie)** devido a forte pressão de custo de UX e de limite operacional Mobile WebWorker. Assumimos o compromisso da **Fase 1** realizar a subida do Backup completo JSON cru com base na versão local, evoluindo no futuro para um diff em sync de Timestamps (LWW). Adicionalmente, quando encontrarmos pontos transacionais sensíveis como o Controle Quântico de Estoque, injetaremos **resoluções apenas baseadas em CRDT (Delta)** no campo específico isoladamente, mantendo-nos extremamente distantes do risco de *Over-engineering*.

---

## 9. Questionamento de "Produto" (Histórico de Entidades na Ausência de ES Global)

### 9.1 A Pergunta
*"Se optamos por Last-Write-Wins (LWW) sobrescrevendo dados antigos, como faremos caso o time de Produto decida que queremos ter o histórico de modificações de uma entidade? (Exemplo: Ver a variação/inflação do preço de um ingrediente durante o último ano)."*

### 9.2 A Solução Pragmática: "Time-Series Logs" (Ledgers Isolados)
Não precisamos ter **Event Sourcing em toda a fundação estrutural do aplicativo** só porque Produto quer ver um gráfico de variação de preços. Esse é o erro clássico que gera projetos complexos demais.

A solução pragmática para Arquiteturas LWW é a adoção de tabelas **"Time-Series/Ledger" anexas APENAS onde o domínio exige histórico**.
    
**Como funcionará na prática (O Padrão de Tabela Histórica):**
Temos a tabela principal `ingredientes` (que é LWW puro pragmático):
`{ id: "A1", nome: "Manteiga", preco_atual: 15.00, updatedAt: 1718000000 }`

E criamos uma tabela apartada chamada `historico_preco_ingredientes` que é *Append-Only* (apenas inserção):
1. `{ ingrediente_id: "A1", preco: 10.00, data: "2025-01-01" }`
2. `{ ingrediente_id: "A1", preco: 12.00, data: "2025-06-01" }`
3. `{ ingrediente_id: "A1", preco: 15.00, data: "2026-02-28" }`

**Vantagens dessa abordagem perante ES Global:**
*   **As Telas Livres de Lógica:** A tela que mostra a lista de ingredientes vai ler rapidamente a tabela `ingredientes` usando LWW (`8ms` no banco). Ela não precisa recalcular os preços passados para mostrar o atual.
*   **A Tela do Gráfico (Produto):** A única tela que lerá o histórico será a tela de "Dashboard de Inflação". Ela faz uma query simples (`SELECT * WHERE id = A1 ORDER BY data`) na tabela secundária de histórico.
*   **A Sincronização Perfeita:** Como tabelas de histórico (*Log*) são **Append-Only** (os dados nunca mudam, eles apenas nascem), no momento em que ocorrer um Sync com o Google Drive, fazer o *Merge* dessa tabela de histórico é trivial. Não existem conflitos causais.

Ou seja, trazemos a magia e o poder de auditoria do Event Sourcing APENAS para as 2 ou 3 tabelas específicas onde o requisito de negócio exige um histórico transacional de fatos (Time-Series do preço do ingrediente, ou do valor cobrado por hora de mão de obra), mantendo os outros 90% da aplicação rodando com LWW burro, barato e de manutenção quase zero.

---

## 10. Conclusão Final e Veredito (Agente Staff Engineer)

Após intensa troca de perspectivas técnicas entre a visão teórica dos benefícios puros de auditoria (Event Sourcing) e os limites rígidos práticos de IOPS mobile, *garbage collection* do frontend e simplicidade do "Agentic First", **eu declaro os debates concluídos.**

A decisão final está consolidada em favor da Arquitetura Híbrida Last-Write-Wins (LWW) detalhada nas Respostas e Escopo Final (Seção 8 e 9). 

Para visualizar os detalhes formais da decisão arquitetural que deve guiar a implementação dos Agentes desenvolvedores e o registro permanente desta arquitetura, por favor consulte a **[ADR-001: Estratégia de Persistência Local e Sincronização Cloud](../adrs/ADR-001-local-data-and-cloud-sync.md)**.
