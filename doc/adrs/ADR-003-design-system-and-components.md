# ADR 003: Design System, Identidade Híbrida e Responsividade
**Data:** 15 de Março de 2026
**Status:** Aprovado

## Contexto
Durante a fundação visual do App do Artesão, foi discutido através do RFC-002 e RFC-003 qual deveria ser a identidade ("Vibe") e o comportamento de elementos densos (Tabelas) para conciliar a alta necessidade de informação analítica e a ergonomia no uso mobile por artesãos.

## Decisão

As seguintes decisões de Design System foram tomadas e validadas através de protótipos funcionais, tornando-se o **Norte Arquitetural Visual** obrigatório para a construção de qualquer novo componente na aplicação:

### 1. Identidade Visual "Híbrida" (Densidade Moderna + Alma Acolhedora)
Adotaremos um modelo híbrido que mescla o layout funcional de dashboards financeiros (espaçamento inteligente, dados densos) com as "tokens" afetivas da marca:
- **Tipografia:** Uso exclusivo da família tipográfica `Outfit` para toda a aplicação.
- **Paleta de Cores Base:** Uso extensivo dos tons `stone` (para neutralidade quente) substituindo cinzas puros/azulados (`slate`/`gray`).
- **Accent Colors:** Cores primárias de ação e marca serão baseadas em `amber` (otimismo/artesanal) e `terracotta` (terra/barro).
- **Formatos:** Uso intensivo de bordas arredondadas macias (`rounded-xl`, `rounded-2xl`, `rounded-[1.5rem]`/`3xl` para modais/cards maiores).

### 2. Responsividade Universal via CSS Puro (O Caso "Mobile Tables")
Tabelas e grades densas **não devem usar Scroll Horizontal** acidental no Mobile. O padrão exigido estabelece que haja apenas **um único componente** estrutural que se transmuta visualmente baseado em Media Queries (breakpoints do Tailwind):
- **Desktop (`>= md/768px`):** O componente deve utilizar `display: grid` ou `<table className="w-full">` para apresentar os dados na clássica visão de planilhas analíticas ("Data Grid").
- **Mobile (`< md/768px`):** O mesmo componente deve esconder as *headers* da tabela, colapsar em `display: flex` (tamanho 100% da largura) e renderizar cada linha como um *Card* empilhado verticalmente. As ações de edição no celular devem expandir o próprio card ao invés de forçar zoom in.

## Consequências
- **Para os Agentes:** Agentes devem sempre consultar os mockups em `doc/mockups/` correspondentes às decisões finais antes de escrever JSX/Vue. Os templates já estão criados (ex: `vibe/4-hybrid.html` e `mobile-tables/3-responsive.html`).
- Os arquivos `/tailwind.config.js` e equivalentes devem ser configurados nos projetos finais para incluir as dependências da fonte *Outfit* e as cores customizadas do escopo híbrido.
