const express = require("express");
const CaixaDaLanchonete = require("./src/caixa-da-lanchonete");

const app = express();
const port = 3000;

app.use(express.json());

app.post("/calcular-compra", (req, res) => {
  const { formaDePagamento, itens } = req.body;
  const caixa = new CaixaDaLanchonete();
  const result = caixa.calcularValorDaCompra(formaDePagamento, itens);
  res.json({ valorTotal: result });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
