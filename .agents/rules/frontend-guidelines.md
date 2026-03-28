# Frontend (UI/App Layer) Code Style Guidelines

Estas regras se aplicam à camada `app/` (Application/UI) do projeto **App do Artesão**.

## 1. Responsabilidades da Camada UI
- **Coordenação:** A interface deve atuar como um coordenador ("Traffic Cop" ou "Logic Sandwich"). Lê da infraestrutura, aciona a lógica pura (`logic/`) e atualiza a infraestrutura de volta.
- **Nenhuma Lógica de Negócio:** Tratamentos de regras de negócio, cálculos financeiros ou agregações **NÃO** devem ocorrer em arquivos de UI ou nos Controladores da camada de App.
- **Sem comunicação direta com APIs HTTP/Fetch:** Para buscar dados ou interagir com o DOM permanentemente (como IndexedDB ou LocalStorage), utilize Wrappers de `infrastructure/`.

## 2. Padrão de Componentes e DOM
- Use **Componentes Nativos/Vanilla JavaScript** (ES Modules).
- Minimize o uso de frameworks obstrutivos. Siga o padrão de inicialização e mapeamento de DOM (ex.: `document.getElementById`).
- Centralize a manipulação de Eventos e certifique-se de remover os listeners caso o elemento seja destruído.

## 3. Identidade Visual (Design System)
- Todo o estilo deve ser feito via classes do **Tailwind CSS**.
- Não use CSS inline no JavaScript para animações complexas, delegue para o CSS (`index.css` via keyframes) ou para classes do Tailwind.
- Siga as diretrizes de design "Acolhedora & Artesanal" combinadas com "Modern Dashboard" estabelecidas pelo `.agents/rules/ui-design-guidelines.md` (se disponível) e garanta responsividade em todos os componentes.

## 4. Testes de Interface
- Testes da UI não requerem simular redes, pois devem injetar "Nullables" (Embedded Stubs) da Infraestrutura.
- Valide se o Controller escuta corretamente os cliques, chama a Lógica e atualiza a View corretamente.
- Use `@testing-library/dom` e `jsdom` no ambiente de teste Vitest.
