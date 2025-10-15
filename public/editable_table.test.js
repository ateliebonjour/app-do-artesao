// Teste unitário para EditableTable usando Vitest
// Certifique-se de instalar o vitest e jsdom: npm install --save-dev vitest jsdom

import { describe, it, expect, beforeEach, vi } from "vitest";
import { EditableTable } from "./editable_table.js";
import { screen, getByRole, getAllByRole } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

describe("EditableTable", () => {
  let tableBody, onChangeMock;

  beforeEach(() => {
    document.body.innerHTML = `
      <table id="test-table">
        <thead>
          <tr><th>Nome</th><th>Valor</th></tr>
        </thead>
        <tbody data-testid="table-body"></tbody>
      </table>
    `;
    tableBody = screen.getByTestId("table-body");
    onChangeMock = vi.fn();
  });

  const columns = [
    { label: "Nome", get: (row) => row.nome, set: (row, v) => (row.nome = v) },
    { label: "Valor", get: (row) => row.valor, set: (row, v) => (row.valor = v) },
  ];

  it("deve renderizar linhas iniciais e uma linha vazia", () => {
    new EditableTable({
      tableElement: tableBody,
      columns: [
        { get: (row) => row.nome, set: (row, v) => (row.nome = v) },
        { get: (row) => row.valor, set: (row, v) => (row.valor = v) },
      ],
      items: [{ nome: "Arroz", valor: "10" }],
      onChange: onChangeMock,
    });

    const rows = getAllByRole(tableBody, "row");
    expect(rows[0]).toBeTruthy(); // Garante que a primeira linha foi encontrada e existe
    expect(rows).toHaveLength(2); // 1 linha de dados + 1 linha vazia

    const firstRowInputs = getAllByRole(rows[0], "textbox");
    expect(firstRowInputs[0].value).toBe("Arroz");
    expect(firstRowInputs[1].value).toBe("10");

    const lastRowInputs = getAllByRole(rows[1], "textbox");
    expect(lastRowInputs[0].value).toBe("");
    expect(lastRowInputs[1].value).toBe("");
  });

  it("deve chamar onChange com os dados corretos ao editar", async () => {
    const user = userEvent.setup();
    new EditableTable({
      tableElement: tableBody,
      columns,
      items: [{ nome: "Arroz", valor: "10" }],
      onChange: onChangeMock,
    });

    const input = screen.getByDisplayValue("Arroz");
    await user.clear(input);
    await user.type(input, "Feijão");

    expect(onChangeMock).toHaveBeenCalled();
    // Verifica o último estado enviado para o onChange
    const lastCallData = onChangeMock.mock.calls.slice(-1)[0][0];
    expect(lastCallData).toEqual([{ nome: "Feijão", valor: "10" }]);
  });

  it("deve adicionar uma nova linha quando a última linha vazia é preenchida", async () => {
    const user = userEvent.setup();
    new EditableTable({ tableElement: tableBody, columns, items: [], onChange: onChangeMock });

    let rows = getAllByRole(tableBody, "row");
    expect(rows).toHaveLength(1); // Apenas a linha vazia inicial

    const firstInput = getAllByRole(rows[0], "textbox")[0];
    await user.type(firstInput, "Novo Item");

    rows = getAllByRole(tableBody, "row");
    expect(rows).toHaveLength(2); // Linha preenchida + nova linha vazia
    expect(onChangeMock).toHaveBeenCalled();
  });
});
