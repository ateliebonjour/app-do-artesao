# 🎨 Design System – App do Artesão

> **Versão:** 1.0
> **Última Atualização:** 2026-03-15
> **Fontes de Verdade:** `doc/mockups/vibe/4-hybrid.html` e `doc/mockups/mobile-tables/3-responsive.html`
> **Decisões Formais:** [ADR-003](../../doc/adrs/ADR-003-design-system-and-components.md), [RFC-002](../../doc/rfcs/RFC-002-design-vibe.md), [RFC-003](../../doc/rfcs/RFC-003-mobile-tables.md)

Este documento é a **referência canônica e obrigatória** para qualquer Agente ou Humano construindo interfaces no projeto. Ele lista os tokens, padrões e regras exatos extraídos dos protótipos aprovados. **Não invente classes ou cores fora deste guia.**

---

## 1. Tipografia

| Token            | Valor                              | Uso                                        |
|------------------|------------------------------------|--------------------------------------------|
| **Família**      | `'Outfit', sans-serif`             | Fonte única de todo o app.                 |
| **Import CSS**   | `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');` | Inserir no `<head>` ou no CSS global. |
| **Pesos usados** | `400` (body), `500` (medium), `600` (semibold), `700` (bold), `800` (extrabold) | Ver tabela de hierarquia abaixo. |

### Hierarquia Tipográfica

| Elemento                     | Classe Tailwind                                                                  |
|------------------------------|----------------------------------------------------------------------------------|
| Título de Página (`h1`)     | `text-2xl font-extrabold text-stone-900 leading-tight tracking-tight`            |
| Título de Seção (`h2`)      | `font-bold text-stone-800 text-lg`                                               |
| Subtítulo / Descrição       | `text-sm text-stone-500 font-medium`                                             |
| Label de Grupo (sidebar)    | `text-[10px] uppercase tracking-widest font-bold text-stone-500`                 |
| Label de Stat Card          | `text-[11px] font-bold text-stone-500 uppercase tracking-widest`                 |
| Valor Principal (numérico)  | `text-3xl font-black text-stone-900 tracking-tight`                              |
| Texto de corpo              | `text-sm text-stone-600 font-medium`                                             |
| Texto de Tabela (thead)     | `font-bold uppercase text-[10px] tracking-wider text-stone-500`                  |
| Texto de Tabela (tbody)     | `text-[13px] font-extrabold text-stone-900` (primário) / `text-[11px] text-stone-500 font-semibold` (secundário) |
| Texto Mono (IDs/Códigos)    | `font-mono text-xs text-stone-400 font-semibold`                                 |

---

## 2. Paleta de Cores

### 2.1 Configuração do Tailwind (`tailwind.config`)

```javascript
// Inserir em theme.extend.colors
colors: {
  amber:      { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309', 900: '#78350f' },
  stone:      { 50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 500: '#78716c', 800: '#292524', 900: '#1c1917' },
  terracotta: { 50: '#fef5f2', 100: '#fcebe5', 200: '#fad1c2', 500: '#c05621', 600: '#9c4221', 700: '#7b341e' },
}
```

### 2.2 Funções Semânticas das Cores

| Função                       | Token / Classe Tailwind                         | Exemplo de Uso                                |
|------------------------------|-------------------------------------------------|-----------------------------------------------|
| **Fundo da Aplicação**       | `bg-[#fcfaf8]`                                   | Body / Fundo geral sob os cards.              |
| **Fundo de Superfície**      | `bg-white`                                       | Cards, tabelas, modais.                       |
| **Fundo Secundário (sutil)** | `bg-stone-50` / `bg-stone-50/30`                | Cabeçalhos de tabela, áreas de destaque leve. |
| **Bordas Estruturais**       | `border-stone-100`                               | Bordas padrão de cards/tabelas.               |
| **Borda Header principal**   | `border-amber-50`                                | Borda inferior do header superior.            |
| **Borda Hover (interativo)** | `hover:border-amber-300`                         | Feedback visual em cards clicáveis.           |
| **Texto Primário**           | `text-stone-900` / `text-stone-800`              | Títulos e conteúdo principal.                 |
| **Texto Secundário**         | `text-stone-500`                                 | Labels, descriptions, metadata.               |
| **Texto Terciário**          | `text-stone-400`                                 | IDs, placeholders, hints.                     |
| **Texto sobre Sidebar**      | `text-stone-300` (normal) / `text-white` (hover/active) | Links da sidebar.                  |
| **Cor Primária de Ação**     | `amber-600` — `bg-amber-600`, `text-amber-600`  | Botões CTA, links de ação, destaques.         |
| **Cor Primária Hover**       | `amber-700` — `hover:bg-amber-700`              | Estado hover de botões.                       |
| **Cor de Marca / Accent**    | `terracotta-500` — `text-terracotta-500`         | Ícones de destaque, badges de notificação.    |
| **Sidebar / Fundo Escuro**   | `bg-stone-900`, `border-stone-800`               | Sidebar principal, barra de custo total.      |
| **Sucesso (Status)**         | `bg-emerald-50 text-emerald-700 border-emerald-100` | Badge "Pago", valor positivo.             |
| **Alerta / Pendente**        | `bg-amber-50 text-amber-700 border-amber-100/50` | Badge "Pendente".                            |
| **Erro / Remover**           | `text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100` | Botão de exclusão.                |
| **Destaque Numérico (custo)**| `text-emerald-600 font-black`                    | Valores de custo em tabelas de insumos.       |

> [!CAUTION]
> **Cores Proibidas:** `gray-*`, `slate-*`, `blue-*`, `indigo-*`, `violet-*`, `purple-*`. Substitua QUALQUER cinza por `stone-*` e qualquer azul corporativo por `amber-*` ou `terracotta-*`.

---

## 3. Bordas, Sombras e Formatos

### 3.1 Arredondamento (Border Radius)

| Contexto                    | Classe Tailwind       | Valor               |
|-----------------------------|-----------------------|----------------------|
| Botões, inputs, badges      | `rounded-xl`          | `0.75rem` (12px)     |
| Stat Cards                  | `rounded-2xl`         | `1rem` (16px)        |
| Containers / Tabelas        | `rounded-[1.5rem]`    | `1.5rem` (24px)      |
| Mobile Cards (dentro de tabela) | `rounded-2xl`     | `1rem` (16px)        |
| Avatar / Logo mark          | `rounded-xl`          | `0.75rem` (12px)     |
| Input fields                | `rounded-lg`          | `0.5rem` (8px)       |

### 3.2 Sombras

| Contexto                    | Classe Tailwind                                          |
|-----------------------------|----------------------------------------------------------|
| Cards e Containers (repouso)| `shadow-sm`                                              |
| Header Sticky               | `shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]`              |
| Botão CTA (amber glow)      | `shadow-md shadow-amber-600/20`                          |
| Logo Mark (sidebar)         | `shadow-md shadow-amber-600/30`                          |
| Barra Custo Total (bottom)  | `shadow-lg` (no card interno) + `shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]` (no container) |
| Mobile Cards (dentro da tab.)| `shadow-sm` (→ `md:shadow-none` no modo desktop)        |

### 3.3 Bordas

| Contexto                    | Classe Tailwind                             |
|-----------------------------|---------------------------------------------|
| Card padrão                 | `border border-stone-100`                   |
| Mobile Card (dentro tabela) | `border-2 border-stone-100 md:border-0`     |
| Tabela container            | `border-2 border-stone-100`                 |
| Divisor de linhas (tabela)  | `divide-y divide-stone-50` (table `<tbody>`).|
| Divisor de linhas (mobile)  | `divide-y-2 divide-stone-50`                |
| Input padrão                | `border-2 border-stone-200`                 |
| Input em foco               | `focus:border-amber-400 focus:ring-2 focus:ring-amber-100` |
| Separador vertical (header) | `h-6 w-px bg-stone-200`                    |

---

## 4. Espaçamento e Layout

### 4.1 Espaçamentos Padrão

| Contexto                      | Tailwind                                     |
|-------------------------------|----------------------------------------------|
| Padding de página (desktop)   | `p-8`                                        |
| Padding de página (mobile)    | `p-4`                                        |
| Padding de Card (stat)        | `p-5`                                        |
| Padding interno de Card mobile| `p-5 md:px-6 md:py-3`                       |
| Gap entre stat cards          | `gap-6`                                      |
| Margem inferior entre seções  | `mb-8`                                       |
| Margem superior em separadores| `mt-8`                                       |
| Gap entre itens de sidebar    | `space-y-2`                                  |

### 4.2 Grid da Página

```html
<!-- Container principal -->
<div class="p-8 max-w-6xl mx-auto w-full">

  <!-- Grid de Stat Cards: 1 col mobile, 3 no desktop -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    ...
  </div>
</div>
```

### 4.3 Largura Máxima

| Contexto              | Classe Tailwind     |
|-----------------------|---------------------|
| Conteúdo principal    | `max-w-6xl`         |
| Campo de busca        | `max-w-sm`          |
| Tabela responsiva     | `max-w-5xl`         |

---

## 5. Componentes Canônicos

### 5.1 Botão Primário (CTA)

```html
<button class="bg-amber-600 text-white text-sm px-4 py-2 rounded-xl font-bold shadow-md shadow-amber-600/20 hover:bg-amber-700 hover:-translate-y-px transition-all flex items-center gap-2">
  <i data-lucide="plus" class="w-4 h-4"></i> Texto da Ação
</button>
```

**Regras:**
- Sempre `bg-amber-600` + `text-white`.
- Sombra com glow: `shadow-md shadow-amber-600/20`.
- Micro-animação hover: `hover:-translate-y-px` + `transition-all`.
- Ícone Lucide à esquerda do texto quando aplicável.
- Variante Mobile: Substituir `text-sm px-4 py-2` por `px-4 py-2.5` para target zone maior.

### 5.2 Botão Secundário / Ghost (Ação de Texto)

```html
<button class="text-amber-600 text-sm font-bold hover:text-amber-800 flex items-center gap-1 group">
  Ver todas <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
</button>
```

**Regras:**
- Sem background. Apenas `text-amber-600`.
- Ícone com micro-animação via `group` / `group-hover:translate-x-1`.

### 5.3 Botão Mobile Full-Width (dentro de Cards)

```html
<button class="md:hidden w-full border-2 border-stone-200 text-stone-600 font-bold text-xs py-2 rounded-xl hover:bg-stone-50 transition-colors">
  Mais Opções
</button>
```

### 5.4 Botão de Exclusão (Desktop inline)

```html
<button class="hidden md:inline-block text-red-400 hover:text-red-600 font-bold px-2 py-1 bg-red-50 rounded-lg text-xs hover:bg-red-100 transition-colors">
  ⨯
</button>
```

### 5.5 Badge de Status

```html
<!-- Sucesso / Pago -->
<span class="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider">
  Pago
</span>

<!-- Pendente -->
<span class="bg-amber-50 text-amber-700 border border-amber-100/50 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider">
  Pendente
</span>

<!-- Tag / Categoria -->
<span class="text-[10px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-lg uppercase">
  Insumo
</span>
```

### 5.6 Campo de Busca (Search Input)

```html
<div class="relative w-full max-w-sm">
  <i data-lucide="search" class="w-4 h-4 absolute left-3 top-2.5 text-stone-400"></i>
  <input type="text" placeholder="Buscar receitas, ingredientes..."
    class="w-full bg-stone-50 border-none rounded-xl pl-9 pr-3 py-2 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all">
</div>
```

### 5.7 Input Numérico (Editable Data)

```html
<input type="number" value="200"
  class="w-full md:w-20 border-2 border-stone-200 rounded-lg px-2 py-1.5 text-center font-bold text-stone-900 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:outline-none bg-white">
```

### 5.8 Tab Switcher

```html
<div class="bg-stone-100 p-1 rounded-xl flex text-sm font-semibold border border-stone-200/50">
  <!-- Tab Ativa -->
  <button class="px-5 py-1.5 bg-white text-stone-900 rounded-lg shadow-sm border border-stone-200/50">Hoje</button>
  <!-- Tab Inativa -->
  <button class="px-5 py-1.5 text-stone-500 hover:text-stone-700 transition-colors">7 Dias</button>
</div>
```

### 5.9 Stat Card (KPI)

```html
<div class="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm relative overflow-hidden group hover:border-amber-300 transition-colors cursor-pointer">
  <!-- Opcional: Gradiente decorativo no canto -->
  <div class="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-amber-50 to-white -mr-4 -mt-4 rounded-full group-hover:scale-110 transition-transform duration-500"></div>

  <p class="text-[11px] font-bold text-stone-500 uppercase tracking-widest mb-2 flex items-center gap-2 relative z-10">
    <i data-lucide="trending-up" class="w-3.5 h-3.5 text-emerald-500"></i> Label do KPI
  </p>
  <div class="flex items-end gap-3 relative z-10">
    <p class="text-3xl font-black text-stone-900 tracking-tight">R$ 3.840,00</p>
    <span class="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg mb-1.5 border border-emerald-100">+12%</span>
  </div>
</div>
```

**Regras do Stat Card:**
- `hover:border-amber-300` para feedback interativo.
- Gradiente decorativo (`bg-gradient-to-br from-amber-50`) é opcional e exclusivo de cards com destaque principal.
- `group-hover:scale-110 transition-transform duration-500` no ornamento.
- Ícone do Lucide no label usando `w-3.5 h-3.5`.

---

## 6. Tabela / Data Grid Responsiva (Padrão Canônico)

> [!IMPORTANT]
> Esta é a regra mais crítica do Design System. **Todo componente que exibe lista densa de dados DEVE seguir este padrão.**

### 6.1 Princípio

Um **único bloco HTML/Componente** que se transforma entre dois modos usando apenas CSS (Media Queries do Tailwind):

| Viewport           | Comportamento                              | Display             |
|---------------------|--------------------------------------------|---------------------|
| **Mobile** (`< md`) | Cada linha vira um **Card empilhado**      | `grid grid-cols-1`  |
| **Desktop** (`≥ md`)| Layout clássico de **Data Grid / Tabela**  | `md:grid-cols-12`   |

### 6.2 Container da Tabela

```html
<div class="bg-white border-2 border-stone-100 rounded-[1.5rem] shadow-sm overflow-hidden text-sm">
  <!-- Cabeçalho (só desktop) -->
  <div class="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-stone-50 border-b-2 border-stone-100 font-bold uppercase tracking-wider text-[11px] text-stone-500">
    <div class="col-span-5">Coluna A</div>
    <div class="col-span-2 text-center">Coluna B</div>
    <div class="col-span-2 text-center">Coluna C</div>
    <div class="col-span-2 text-right">Coluna D</div>
    <div class="col-span-1 text-center">Ação</div>
  </div>

  <!-- Corpo -->
  <div class="divide-y-2 divide-stone-50 p-4 md:p-0 space-y-4 md:space-y-0">
    <!-- Itens aqui (ver 6.3) -->
  </div>

  <!-- Rodapé / Ação Ghost -->
  <div class="px-6 py-4 border-t-2 border-stone-100 text-xs text-amber-600 font-black cursor-pointer hover:bg-amber-50/50 tracking-wide uppercase transition-colors text-center md:text-left">
    + Adicionar Nova Linha
  </div>
</div>
```

### 6.3 Linha / Item (Dual-Mode)

```html
<div class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-4 md:items-center
            p-5 md:px-6 md:py-3
            bg-white rounded-2xl md:rounded-none
            border-2 border-stone-100 md:border-0
            hover:bg-amber-50/50 transition-colors
            shadow-sm md:shadow-none">

  <!-- Col 1: Nome (Mobile=topo / Desktop=esquerda) -->
  <div class="col-span-1 md:col-span-5 flex justify-between md:justify-start items-center">
    <span class="font-bold text-base md:text-sm text-stone-900">Nome do Item</span>
    <!-- Tag mobile-only -->
    <span class="md:hidden text-[10px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-lg uppercase">Tipo</span>
  </div>

  <!-- Cols 2-4: Métricas (Mobile=grid 2 cols | Desktop=unwrap via md:contents) -->
  <div class="md:contents grid grid-cols-2 gap-3 mt-1 md:mt-0">

    <!-- Métrica A -->
    <div class="col-span-1 md:col-span-2 bg-stone-50 md:bg-transparent p-3 md:p-0 rounded-xl flex flex-col md:block items-start justify-center text-center">
      <span class="md:hidden text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Label A</span>
      <input type="number" value="200" class="w-full md:w-20 border-2 border-stone-200 rounded-lg px-2 py-1.5 text-center font-bold text-stone-900 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:outline-none bg-white">
    </div>

    <!-- Métrica B (Desktop only) -->
    <div class="hidden md:block col-span-2 text-center text-stone-500 font-semibold text-xs">
      unidade
    </div>

    <!-- Métrica C (Valor) -->
    <div class="col-span-1 md:col-span-2 bg-stone-50 md:bg-transparent p-3 md:p-0 rounded-xl flex flex-col md:block md:text-right">
      <span class="md:hidden text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Label C</span>
      <span class="font-black text-emerald-600 text-base md:text-sm md:w-full block">R$ 15,00</span>
    </div>
  </div>

  <!-- Col 5: Ações (Mobile=botão full | Desktop=inline) -->
  <div class="col-span-1 md:col-span-1 mt-2 md:mt-0 text-center">
    <button class="md:hidden w-full border-2 border-stone-200 text-stone-600 font-bold text-xs py-2 rounded-xl hover:bg-stone-50 transition-colors">Mais Opções</button>
    <button class="hidden md:inline-block text-red-400 hover:text-red-600 font-bold px-2 py-1 bg-red-50 rounded-lg text-xs hover:bg-red-100 transition-colors mx-auto">⨯</button>
  </div>
</div>
```

### 6.4 Regras Obrigatórias de Implementação

1. **Nunca** use `<table>` HTML para dados editáveis no mobile. Utilize CSS Grid com `div` semânticas.
2. **`md:contents`** é a técnica-chave: no mobile o wrapper cria um grid 2-colunas; no desktop ele se dissolve, deixando os filhos participarem do grid-12 do pai.
3. Labels inline (`<span class="md:hidden ...">`) devem existir em cada métrica para substituir os headers que ficam `hidden` no mobile.
4. **`shadow-sm md:shadow-none`** e **`border-2 md:border-0`** garantem que cada item pareça um card no mobile mas se integre como linha flat no desktop.
5. **`rounded-2xl md:rounded-none`** — arredondamento de card no mobile, sem arredondamento no desktop.
6. **`p-5 md:px-6 md:py-3`** — padding generoso no mobile (card), compacto no desktop (row).
7. **Hover de linha**: `hover:bg-amber-50/50 transition-colors`.

---

## 7. Tabela Clássica (Modo De Leitura / Read-Only)

Para tabelas de dados **não editáveis** (ex: Transações Recentes), o padrão admitido é `<table>` HTML:

```html
<div class="bg-white border border-stone-100 rounded-[1.5rem] shadow-sm overflow-hidden flex flex-col">
  <!-- Header da Seção -->
  <div class="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/30">
    <h2 class="font-bold text-stone-800 text-lg">Título da Tabela</h2>
    <button class="text-amber-600 text-sm font-bold hover:text-amber-800 flex items-center gap-1 group">
      Ver todas <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
    </button>
  </div>

  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm whitespace-nowrap">
      <thead>
        <tr class="bg-stone-50 text-stone-500 border-b border-stone-100">
          <th class="py-3 px-6 font-bold uppercase text-[10px] tracking-wider">Coluna</th>
          <!-- ... -->
        </tr>
      </thead>
      <tbody class="divide-y divide-stone-50">
        <tr class="hover:bg-amber-50/50 transition-colors cursor-pointer group">
          <td class="py-3 px-6 ...">Dados</td>
          <!-- ... -->
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

---

## 8. Sidebar (Navegação Principal)

```html
<aside class="w-64 bg-stone-900 border-r border-stone-800 flex flex-col hidden md:flex">
  <!-- Logo / Brand -->
  <div class="h-16 flex items-center px-6 border-b border-stone-800 shadow-sm">
    <div class="w-8 h-8 bg-amber-600 rounded-xl flex items-center justify-center text-white font-bold mr-3 shadow-md shadow-amber-600/30">
      <i data-lucide="cookie" class="w-5 h-5"></i>
    </div>
    <span class="font-extrabold text-white text-lg tracking-tight">Ateliê Bonjour</span>
  </div>

  <!-- Navegação -->
  <nav class="flex-1 p-4 space-y-2 text-sm">
    <p class="text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-3 pl-2">Menu Principal</p>

    <!-- Link Ativo -->
    <a href="#" class="flex items-center gap-3 px-3 py-2.5 bg-terracotta-500/10 text-terracotta-400 rounded-xl font-bold">
      <i data-lucide="bar-chart-2" class="w-4 h-4"></i> Visão Geral
    </a>

    <!-- Link Inativo -->
    <a href="#" class="flex items-center gap-3 px-3 py-2.5 hover:bg-stone-800 text-stone-300 hover:text-white rounded-xl font-semibold transition-colors">
      <i data-lucide="book-open-text" class="w-4 h-4"></i> Receitas & Fichas
    </a>
  </nav>
</aside>
```

**Regras da Sidebar:**
- Fundo: `bg-stone-900`.
- Link ativo: `bg-terracotta-500/10 text-terracotta-400` — fundo translúcido terracota.
- Link inativo: `text-stone-300 hover:bg-stone-800 hover:text-white`.
- Ícones Lucide: `w-4 h-4`.
- `hidden md:flex` — sidebar oculta no mobile.

---

## 9. Barra Fixa de Totalização (Sticky Bottom)

```html
<div class="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-stone-200 p-5 md:p-6 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] z-50">
  <div class="max-w-5xl mx-auto flex justify-between items-center bg-stone-900 text-white rounded-2xl p-4 md:px-6 shadow-lg">
    <span class="text-xs md:text-sm font-bold uppercase tracking-widest text-stone-300">Custo Total da Produção</span>
    <span class="text-2xl md:text-3xl font-black">R$ 23,50</span>
  </div>
</div>
```

---

## 10. Ícones

| Propriedade         | Valor                                  |
|---------------------|----------------------------------------|
| **Biblioteca**      | [Lucide Icons](https://lucide.dev)     |
| **CDN**             | `https://unpkg.com/lucide@latest`      |
| **Inicialização**   | `<script>lucide.createIcons();</script>` (no fim do body) |
| **Tamanho padrão**  | `w-4 h-4` (inline) / `w-5 h-5` (header/nav) / `w-3.5 h-3.5` (labels de KPI) |

---

## 11. Transições e Micro-Animações

| Efeito                              | Classe Tailwind                                       |
|--------------------------------------|-------------------------------------------------------|
| Transição genérica de cor            | `transition-colors`                                   |
| Transição completa (cor + transform) | `transition-all`                                      |
| Botão CTA hover lift                 | `hover:-translate-y-px transition-all`                |
| Seta / ícone slide                   | `group-hover:translate-x-1 transition-transform`      |
| Ornamento de card se expandindo      | `group-hover:scale-110 transition-transform duration-500` |

---

## 12. Breakpoints

| Nome      | Largura   | Uso                                            |
|-----------|-----------|-------------------------------------------------|
| `base`    | `< 768px` | Mobile: Cards, sidebar oculta, padding `p-4`.   |
| `md`      | `≥ 768px` | Desktop: Data Grid, sidebar visível, `p-8`.     |
| `sm`      | `≥ 640px` | Usado pontualmente para layout de header flex.  |

---

## 13. Processo: Do Mockup à Implementação

```
doc/mockups/*.html  ──(aprovação do usuário)──▶  Componente React/Vue
       │                                              │
       │  Tailwind puro + Lucide CDN                  │  Mesmas classes, Lucide via npm
       │  Arquivo isolado                             │  Arquivo no /src/
       ▼                                              ▼
  [Válida estética]                        [Integra ao app final]
```

1. **Criar** mockup HTML em `doc/mockups/<feature>/` usando CDN do Tailwind + Lucide.
2. **Submeter** ao usuário para aprovação visual via navegador.
3. **Implementar** o componente React/Vue replicando 1:1 as classes Tailwind aprovadas.
4. **Registrar** qualquer novo padrão neste documento.

> [!WARNING]
> Se um novo componente exigir classes ou cores **não listadas** neste guia, o agente deve primeiro criar um mockup propondo a extensão, obter aprovação, e **então atualizar este documento** antes de implementar.

---

## Changelog

| Data       | Autor                | Mudança                                                |
|------------|----------------------|--------------------------------------------------------|
| 2026-03-15 | Antigravity (TASK-007) | Versão 1.0 — Extração completa dos mockups aprovados. |
