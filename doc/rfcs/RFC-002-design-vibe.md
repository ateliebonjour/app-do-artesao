# RFC-002: "Vibe" e Identidade Visual

**Status:** `[DRAFT]` / Em Discussão
**Contexto de Origem:** [TASK-005](../../.agents/planning/tasks/TASK-005-rfc-design-vibe.md)

## Problema e Contexto
O aplicativo App do Artesão está em fase de fundação visual. A escolha da identidade e da estética (a "Vibe") não é apenas estética, ela afeta a ergonomia, a percepção de valor, a densidade de informação admissível e a adoção.
Nossos usuários vão interagir com este sistema em dois cenários:
1. Pelo celular de forma rápida e interrupta (ex. respondendo um cliente no WhatsApp e faturando no app).
2. Pelo desktop organizando lotes grandes de receitas e precificando estoque.

Eles costumam migrar de soluções amadoras ou planilhas de Excel robustas, mas visualmente defasadas.

## Opções Propostas e Protótipos

Preparamos 3 experimentos interativos utilizando Tailwind CSS puro em conformidade com o Workflow `/design_ui_component`.
Recomendamos abrir no navegador pelo VS Code (ex. Live Server ou abrindo o arquivo html diretamente).

### Opção 1: Minimalista & Utilitário (Estilo Notion / Linear)
- **Foco:** Densidade de Informação e Produtividade Pura.
- **Identidade:** Cores neutras, monocromáticas, bordas finas (1px, `ring-gray-200`), baixo `border-radius` (sm ou md), muito espaço em branco, e ausência de ruído.
- **Prós:** Evita cansaço visual. Excelente para tabelas enormes no celular e no desktop. É "invisível" — a interface sai do caminho.
- **Contras:** Pode parecer excessivamente frio/tecnológico para um trabalho manual e artístico.
- **Protótipo Interativo:** [doc/mockups/vibe/1-minimalist.html](../../mockups/vibe/1-minimalist.html)

### Opção 2: Acolhedora & Artesanal (Estilo Etsy)
- **Foco:** Empatia e Familiaridade.
- **Identidade:** Tons terrosos (terracotta, âmbar, verdes orgânicos), sombras muito suaves ou acentos preenchidos, `border-radius` moderado/alto (md a lg).
- **Prós:** Resoa profundamente com a identidade e o orgulho do artesão. Passa conforto.
- **Contras:** Cores quentes perdem um pouco a legibilidade em alta densidade (tabelas densas podem parecer "coloridas demais"), tornando indicadores de 'perigo' (vermelho de estoque, por ex) difíceis de isolar.
- **Protótipo Interativo:** [doc/mockups/vibe/2-warm.html](../../mockups/vibe/2-warm.html)

### Opção 3: Modern Dashboard / Premium (Estilo Stripe / Fintechs)
- **Foco:** Profissionalismo e Credibilidade Comercial.
- **Identidade:** Cores primárias vibrantes (Índigo ou Violeta), sombras com leve "glow" (Gradients sutis de fundo), fundos com *glassmorphism* suave, textos muito bem hierarquizados.
- **Prós:** Passará aos artesãos a sensação (verdadeira) de que eles não estão apenas fazendo um hobby, mas liderando um *negócio* e usando uma ferramenta de padrão internacional.
- **Contras:** Pode ser intimidador ("parece software de contador/faria lima"). 
- **Protótipo Interativo:** [doc/mockups/vibe/3-modern.html](../../mockups/vibe/3-modern.html)

### Opção 4: Híbrida (Densidade Moderna + Alma Acolhedora) `✅ VENCEDORA`
- **Foco:** Equilíbrio perfeito entre eficiência operacional e identidade afetiva.
- **Identidade:** O Layout denso e espacialmente inteligente da *Opção 3*, usando as cores quentes, fontes flexíveis (*Outfit*) e bordas suaves da *Opção 2*.
- **Prós:** Permite colocar muitas informações em tabelas densas, sem fazer a tela parecer fria ou corporativa demais. Menos fadiga visual e maior alinhamento com a marca.
- **Protótipo Interativo:** [doc/mockups/vibe/4-hybrid.html](../../mockups/vibe/4-hybrid.html)

## Espaço para Comentários (Para Agentes / Usuário)

**(Por favor, registre seus argumentos em favor/comparações sobre qual caminho deve se tornar o Tema oficial da UI).**

- **[@Lead de Design / Antigravity]**: Pelo histórico dos usuários de pequenas produções e da complexidade das tabelas que faremos, a Opção 1 nos dá mais liberdade para lidar com UI densa (receitas complexas) sem sobrecarregar a visão cognitiva, mas a Opção 2 é a melhor barreira de entrada emocional. Minha inclinação como Designer de Produto técnico em ferramentas densas sempre tende para o Neutro da Opção 1, agregando tons terracotas pequenos apenas para accent color/call to action. 

> [!IMPORTANT]
> **Veredito do Lead Designer:** Atendendo ao excelente feedback do Usuário, foi concebido o modelo **Híbrido (Opção 4)**. Esse modelo vence o RFC-002 por oferecer o melhor dos dois mundos: A arquitetura de informação e a densidade corporativa essencial para um painel de gestão aliado a UI/Tokens macios e artesanais. Este será o norte visual para todo o projeto!
- **[Lucas / Usuário]**: Gostei da sensação do warm, mas não cabia muita informação, enquanto o modern tinha um bom equilíbrio. Pediu para mesclar a inteligência de componentes da 3 com a estética da 2, dando origem a Opção 4.
