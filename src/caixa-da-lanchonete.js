class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: 3.0,
      chantily: 1.5,
      suco: 6.2,
      sanduiche: 6.5,
      queijo: 2.0,
      salgado: 7.25,
      combo1: 9.5,
      combo2: 7.5,
    };
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    if (!["dinheiro", "debito", "credito"].includes(formaDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let total = 0;
    let hasPrincipal = false;

    for (const itemQuantidade of itens) {
      const [item, quantidade] = itemQuantidade.split(",");
      if (!this.cardapio[item]) {
        return "Item inválido!";
      }

      if (item !== "chantily" && item !== "queijo") {
        hasPrincipal = true;
      }

      const precoItem = this.cardapio[item];
      total += precoItem * parseInt(quantidade);

      if (item === "cafe") {
        total += 1.5 * parseInt(quantidade); // chantily
      } else if (item === "sanduiche") {
        total += 2.0 * parseInt(quantidade); // queijo
      }
    }

    if (
      !hasPrincipal &&
      itens.some((item) => ["chantily", "queijo"].includes(item.split(",")[0]))
    ) {
      return "Item extra não pode ser pedido sem o principal";
    }

    if (formaDePagamento === "dinheiro") {
      total *= 0.95; // 5% de desconto
    } else if (formaDePagamento === "credito") {
      total *= 1.03; // 3% de acréscimo
    }

    return `R$ ${total.toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
