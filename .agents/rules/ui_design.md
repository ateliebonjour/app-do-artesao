# Regras de Design de Interface (UI/UX)

Quando um Agente for encarregado de criar ou modificar uma interface de usuário no **App do Artesão**, as seguintes regras estruturais devem ser aplicadas sempre:

## 1. Fonte da Verdade do Design ("Design as Code")
- Esqueça Figma ou editores de imagem. Para o escopo deste projeto, a **única fonte de verdade para design são os documentos e código HTML/Tailwind**.
- Decisões de arquitetura de Design estarão registradas em `doc/adrs/` (ex: `ADR-002-agentic-design-process.md`). Sempre leia-as para não propor padrões de interação que já foram discutidos e descartados.

## 2. O Processo de Prototipagem (Workflow Obrigatório)
- **NUNCA** construa uma tela complexa ou fluxo inteiramente no framework final (React/Vue/etc.) antes de validá-la.
- Siga estritamente o workflow `/design_ui_component` (disponível em `.agents/workflows/design_ui_component.md`).
- Você deve criar uma "maquete" em HTML puro e Tailwind CSS isolada (em `doc/mockups/`) e obter a aprovação do usuário (Pessoa de Produto/Design) primeiro.

## 3. Discutindo Padrões de Layout Complexos (RFCs)
- Interfaces de alta complexidade (Ex: Cadastro denso de dados no Mobile) devem ter sua estratégia de UX discutida via **RFCs (Request for Comments)**.
- Se o usuário solicitar algo que muda o paradigma do layout atual, proponha criar um RFC descrevendo as opções possíveis, faça mockups das alternativas em HTML e peça a decisão do Usuário antes de adotar a solução.

## 4. Estilização: Utility-First (Tailwind)
- Nosso design system mora nas classes utilitárias. O uso de arquivos CSS customizados é **restrito**.
- Cumpra a coesão de cores e propriedades do tema que será estabelecido no `tailwind.config.js`.

**Importante:** Se o Agente finalizou a fase de protótipo e vai aprovar uma nova "Task", ele deverá garantir que seu conhecimento resultante atualizou ou respeitou esta base.
