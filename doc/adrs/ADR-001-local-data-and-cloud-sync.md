# ADR-001: Estratégia de Persistência Local e Sincronização Cloud

**Data:** 28 de Fevereiro de 2026
**Status:** Aceito
**Contexto:** O "App do Artesão" requer uma arquitetura "Local-First" forte (Zero Server) com a promessa de o usuário armazenar seus backups no Google Drive ou OneDrive, visando custo de infraestrutura 0. Precisávamos decidir de que forma essas mutações de dados aconteceriam nas tabelas do local (IndexedDB) e qual paradigma geriria a sincronia/conflitos sem o acoplamento excessivo de um backend. (Ref: [RFC-001](../rfcs/RFC-001-local-data-and-cloud-sync.md))

## Decisão

Optou-se por uma arquitetura **Híbrida baseada em Last-Write-Wins (LWW) com Dexie.js**.
A fundação do aplicativo não utilizará *Event Sourcing Global*.

O modelo será implementado em fases:
1. **Fase 1 (MVP - Lançamento):** A sincronização se dará de forma bruta. Será um dump completo (JSON) do SQLite/Dexie local para o Drive.
2. **Fase 2 (Deltas/Sync via LWW):** Na evolução da sincronia sem intervenção humana, adotaremos *Timestamp-based LWW* (`updatedAt`). O registro mais novo na nuvem ou no banco local sobrepõe o registro antigo sem causar falhas no banco.
3. **Pilar de Exceção (Resolução Segura e Time-Series):** Trataremos problemas passíveis de colisão de regras de domínio complexas do artesão (ex: estoque com múltiplas subtrações atômicas) pontualmente com contadores matemáticos no frontend (Deltas) e usaremos tabelas autônomas "Append-Only" apenas para visualização de relatórios/Inflação (Time-Series Ledgers) se o Produto requerer.

## Consequências

**Positivas:**
- Abstração local natural. Agentes e humanos interagirão de forma relacional atômica com as entidades usando algo intuitivo: `db.produtos.put()`.
- Economia imensa do limite e bateria do usuário final no dispositivo Mobile usando cache local, mantendo a leitura em algo próximo de ~10ms (sem *reducers* passando por centenas de eventos em cada load).
- Custo de manutenção e *bundle size* significativamente baixos pela ausência de bibliotecas de CRDT massivas.

**Negativas:**
- O LWW causará perdas de dados silenciosas se (e somente se) o próprio artesão utilizar o App offline ao mesmo tempo num tablet e num PC alterando propositalmente na mesma hora a mesma propriedade do mesmo produto e então forçar o upload de forma cega.
- Auditar mudanças contínuas dos usuários necessitará de "Time-Series Logs" (tabelas extras) ao invés do modelo fornecer isso "de graça" igual seria no *Event Sourcing*.

## Decisões Periféricas (A Fundamentação da Camada Gratuita)

Para garantir que a base do aplicativo siga os princípios estritos de "Zero Custos", "Alta Performance", e "Complexidade Enxuta", as seguintes ferramentas de código aberto (100% gratuitas) complementam esta arquitetura:

### 1. Segurança e Privacidade (Web Crypto API)
- **Decisão:** O JSON contendo o backup do banco de dados (Dexie) será criptografado no lado do cliente (*Client-Side Encryption*) **antes** de ser feito o upload para o provedor de nuvem (Google Drive/OneDrive).
- **Tecnologia:** `Web Crypto API` (Nativa do navegador, custo zero de CPU/Servidor).
- **Justificativa:** Como o Drive pertence ao usuário e os dados sensíveis (clientes, preços) trafegarão pela internet, a criptografia garante a privacidade total dos negócios do artesão.

### 2. Integridade de Dados no Client-Side (Zod / Valibot)
- **Decisão:** Todas as inserções e atualizações (`put`/`add`) no Dexie.js passarão por uma catraca rigorosa de esquema de dados.
- **Tecnologia:** `Zod` (ou alternativamente `Valibot` para menor *bundle size*).
- **Justificativa:** Como abandonamos o controle severo das entidades que um *backend* tradicional forneceria, precisamos garantir que inserções assíncronas feitas através da UI não corrompam o IndexedDB. Isso atuará como um TypeScript em tempo de execução.

### 3. PWA e Código Oflfine-First (Workbox)
- **Decisão:** O "App do Artesão" dependerá de regras estruturadas de Cache API para garantir que arquivos estáticos (HTML/JS/CSS e Imagens) sempre abram instantaneamente na ausência completa de sinal de internet.
- **Tecnologia:** `Workbox` (Integrado ao Vite PWA Plugin).
- **Justificativa:** Uma vez que os dados sobrevivem no IndexedDB e migram pela Nuvem via OAuth de graça, o código visual também precisa residir nativamente no aparelho como um App real. O Service worker do Workbox será responsável pelo *Network-First* / *Cache-First* do aplicativo.
