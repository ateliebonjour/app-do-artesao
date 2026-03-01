# ADR 002: Agentic Design Process & UI Guidelines

## Context
Designing a complex user interface usually relies on visual tools like Figma. However, in an "Agentic First" architecture, AI agents operate best with text, code, and structured rules. To ensure a seamless, high-quality UI that can be iterated and expanded autonomously by AI agents, we need a "Design as Code" process.

## Decision
We will adopt the following constraints and processes for UI/UX Design:

1. **No Figma/Image Mockups:** Visuals will not be the source of truth. The source of truth will be code (HTML/Tailwind) and descriptive Context records (ADRs/Markdown).
2. **Unified Styling Stack:** We will strictly limit styling to **Tailwind CSS**. Custom CSS is banned unless strictly necessary for complex animations. 
3. **Component Library:** We will adopt a headless component system (e.g., Shadcn/ui or Radix primitives) to guarantee accessibility, keyboard navigation, and consistent aesthetics without AI agents hallucinating CSS.
4. **Agentic Prototyping Workflow:** 
   - Before implementing complex React/frontend logic, agents will present UI proposals via isolated, static "Playground" HTML/Tailwind files. 
   - The user/Product Manager will open these HTML files in the browser, review, and request changes.
   - Once the design code is stable, it will be componentized into the main application.

*See `.agents/workflows/design_ui_component.md` for the step-by-step workflow.*

## Status
Proposed

## Consequences
- **Positive:** AIs can read, write, and flawlessly reproduce the design system. Less friction between "Design" and "Engineering", as both are code-based.
- **Negative:** Requires more upfront imagination from the human user during text-based descriptions, since there are no pixel-perfect non-functional click-through prototypes.
