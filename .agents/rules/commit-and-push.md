# Regra de Git: Commit e Push Obrigatórios

Para manter a integridade e o histórico do projeto, todos os Agentes de IA devem seguir rigorosamente esta regra:

## 1. Quando Commitar e Pushar
- **Ao finalizar uma tarefa:** Assim que um item de alto nível no `task.md` for concluído e verificado.
- **Marcos significativos:** Se uma tarefa for longa, faça commits intermediários em pontos de estabilidade (ex: após passar nos testes de uma sub-funcionalidade).
- **Antes de `notify_user`:** Sempre que for solicitar revisão de código funcional (não apenas planos), as alterações devem estar no repositório.

## 2. Formato do Commit
Siga o padrão Conventional Commits:
- `feat:` para novas funcionalidades.
- `fix:` para correções de bugs.
- `docs:` para alterações em documentação.
- `chore:` para tarefas de manutenção ou configuração.
- `refactor:` para mudanças no código que não alteram funcionalidade.

## 3. Comando de Execução
Sempre use a combinação de add, commit e push:
```bash
git add . && git commit -m "<tipo>: <descrição curta>" && git push
```

> [!IMPORTANT]
> A falha em realizar o push após o commit impede que outros agentes ou o usuário vejam o progresso mais recente. SEMPRE finalize com `git push`.
