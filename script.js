let chartInstance = null; // Variável global para armazenar o gráfico de barras
let affineChartInstance = null; // Variável global para armazenar o gráfico de função afim

document.addEventListener("DOMContentLoaded", function () {
  const shoppingListItems = document.getElementById("shoppingListItems");
  const totalPriceElement = document.getElementById("totalPrice");
  const productSelectModal = document.getElementById("productSelectModal");
  const quantityInputModal = document.getElementById("quantityInputModal"); // Campo de quantidade no modal
  const priceInputModal = document.getElementById("priceInputModal"); // Campo de preço no modal
  const addItemButton = document.getElementById("addItem"); // Botão de adicionar item
  const saveListButton = document.getElementById("saveList");

  // Dados fictícios de preços em mercados para diferentes produtos
  const marketData = {
    // Produtos de cereais e grãos
    arroz: [
      { store: 'Mercado A', price: 20.99 },
      { store: 'Mercado B', price: 21.50 },
      { store: 'Mercado C', price: 22.00 },
      { store: 'Mercado D', price: 19.90 },
    ],
    feijao: [
      { store: 'Mercado A', price: 7.50 },
      { store: 'Mercado B', price: 8.00 },
      { store: 'Mercado C', price: 7.75 },
      { store: 'Mercado D', price: 8.20 },
    ],
    milho: [
      { store: 'Mercado A', price: 5.00 },
      { store: 'Mercado B', price: 5.30 },
      { store: 'Mercado C', price: 5.10 },
      { store: 'Mercado D', price: 5.20 },
    ],
    trigo: [
      { store: 'Mercado A', price: 12.30 },
      { store: 'Mercado B', price: 12.50 },
      { store: 'Mercado C', price: 12.40 },
      { store: 'Mercado D', price: 12.00 },
    ],
    
    // Produtos de óleos e condimentos
    oleo: [
      { store: 'Mercado A', price: 6.99 },
      { store: 'Mercado B', price: 7.20 },
      { store: 'Mercado C', price: 7.10 },
      { store: 'Mercado D', price: 6.80 },
    ],
    azeite: [
      { store: 'Mercado A', price: 19.99 },
      { store: 'Mercado B', price: 20.50 },
      { store: 'Mercado C', price: 20.00 },
      { store: 'Mercado D', price: 19.80 },
    ],
    vinagre: [
      { store: 'Mercado A', price: 3.50 },
      { store: 'Mercado B', price: 3.80 },
      { store: 'Mercado C', price: 3.60 },
      { store: 'Mercado D', price: 3.40 },
    ],
    
    // Laticínios e derivados
    leite: [
      { store: 'Mercado A', price: 4.99 },
      { store: 'Mercado B', price: 5.50 },
      { store: 'Mercado C', price: 5.20 },
      { store: 'Mercado D', price: 5.10 },
    ],
    queijo: [
      { store: 'Mercado A', price: 15.00 },
      { store: 'Mercado B', price: 16.00 },
      { store: 'Mercado C', price: 15.50 },
      { store: 'Mercado D', price: 15.20 },
    ],
    iogurte: [
      { store: 'Mercado A', price: 3.50 },
      { store: 'Mercado B', price: 3.80 },
      { store: 'Mercado C', price: 3.60 },
      { store: 'Mercado D', price: 3.40 },
    ],
    
    // Produtos de panificação
    pao: [
      { store: 'Mercado A', price: 12.00 },
      { store: 'Mercado B', price: 13.50 },
      { store: 'Mercado C', price: 12.75 },
      { store: 'Mercado D', price: 13.00 },
    ],
    bolo: [
      { store: 'Mercado A', price: 18.00 },
      { store: 'Mercado B', price: 18.50 },
      { store: 'Mercado C', price: 18.20 },
      { store: 'Mercado D', price: 18.30 },
    ],
    
    // Carnes e derivados
    carne: [
      { store: 'Mercado A', price: 35.00 },
      { store: 'Mercado B', price: 36.50 },
      { store: 'Mercado C', price: 34.80 },
      { store: 'Mercado D', price: 35.20 },
    ],
    frango: [
      { store: 'Mercado A', price: 20.50 },
      { store: 'Mercado B', price: 21.00 },
      { store: 'Mercado C', price: 20.80 },
      { store: 'Mercado D', price: 20.30 },
    ],
    linguicaCalabresa: [
      { store: 'Mercado A', price: 23.50 },
      { store: 'Mercado B', price: 22.00 },
      { store: 'Mercado C', price: 21.80 },
      { store: 'Mercado D', price: 30.00 },
    ],
    // Hortifrútis
    tomate: [
      { store: 'Mercado A', price: 6.00 },
      { store: 'Mercado B', price: 6.50 },
      { store: 'Mercado C', price: 6.20 },
      { store: 'Mercado D', price: 6.30 },
    ],
    alface: [
      { store: 'Mercado A', price: 2.50 },
      { store: 'Mercado B', price: 2.80 },
      { store: 'Mercado C', price: 2.70 },
      { store: 'Mercado D', price: 2.60 },
    ],
    cenoura: [
      { store: 'Mercado A', price: 3.20 },
      { store: 'Mercado B', price: 3.50 },
      { store: 'Mercado C', price: 3.30 },
      { store: 'Mercado D', price: 3.10 },
    ],
    banana: [
      { store: 'Mercado A', price: 2.00 },
      { store: 'Mercado B', price: 2.20 },
      { store: 'Mercado C', price: 2.10 },
      { store: 'Mercado D', price: 2.30 },
    ],
    
    // Bebidas
    agua: [
      { store: 'Mercado A', price: 1.00 },
      { store: 'Mercado B', price: 1.10 },
      { store: 'Mercado C', price: 1.05 },
      { store: 'Mercado D', price: 1.00 },
    ],
    refrigerante: [
      { store: 'Mercado A', price: 4.00 },
      { store: 'Mercado B', price: 4.20 },
      { store: 'Mercado C', price: 4.10 },
      { store: 'Mercado D', price: 4.30 },
    ],
    suco: [
      { store: 'Mercado A', price: 5.00 },
      { store: 'Mercado B', price: 5.30 },
      { store: 'Mercado C', price: 5.20 },
      { store: 'Mercado D', price: 5.10 },
    ],
    
    // Produtos de limpeza
    sabao: [
      { store: 'Mercado A', price: 3.00 },
      { store: 'Mercado B', price: 3.20 },
      { store: 'Mercado C', price: 3.10 },
      { store: 'Mercado D', price: 3.30 },
    ],
    detergente: [
      { store: 'Mercado A', price: 2.50 },
      { store: 'Mercado B', price: 2.80 },
      { store: 'Mercado C', price: 2.60 },
      { store: 'Mercado D', price: 2.70 },
    ],
    
    // Higiene pessoal
    sabonete: [
      { store: 'Mercado A', price: 1.50 },
      { store: 'Mercado B', price: 1.60 },
      { store: 'Mercado C', price: 1.55 },
      { store: 'Mercado D', price: 1.45 },
    ],
    shampoo: [
      { store: 'Mercado A', price: 7.00 },
      { store: 'Mercado B', price: 7.50 },
      { store: 'Mercado C', price: 7.30 },
      { store: 'Mercado D', price: 7.20 },
    ],
    pastaDeDente: [
      { store: 'Mercado A', price: 3.50 },
      { store: 'Mercado B', price: 3.80 },
      { store: 'Mercado C', price: 3.70 },
      { store: 'Mercado D', price: 3.60 },
    ],
  };

  const productSelect = document.getElementById('product');
  
  function calcularDerivada(precoUnitario) {
    const deltaQ = 1; // Pequena mudança na quantidade
    const custo1 = precoUnitario * 1;
    const custo2 = precoUnitario * (1 + deltaQ);
    return (custo2 - custo1) / deltaQ; // Derivada aproximada
  }

  // Adiciona os produtos ao select
  Object.keys(marketData).forEach(product => {
    const option = document.createElement('option');
    option.value = product;
    option.textContent = product.charAt(0).toUpperCase() + product.slice(1); // Capitaliza o nome do produto
    productSelect.appendChild(option);
  });

  document.getElementById('priceForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const product = document.getElementById('product').value;
    const userPrice = parseFloat(document.getElementById('price').value);
    const quantity = Math.min(parseInt(document.getElementById('quantity').value)); // Limita a quantidade máxima para 10

    const selectedProductData = marketData[product];

    // Calcular a média
    const total = selectedProductData.reduce((sum, item) => sum + item.price, 0);
    const averagePrice = total / selectedProductData.length;

    // Verificar se o preço informado está acima, abaixo ou na média
    let comparisonResult = '';
    if (userPrice < averagePrice) {
      comparisonResult = '<span class="text-success">O preço informado está mais barato que a média.</span>';
    } else if (userPrice > averagePrice) {
      comparisonResult = '<span class="text-danger">O preço informado está mais caro que a média.</span>';
    } else {
      comparisonResult = '<span class="text-warning">O preço informado está dentro da média.</span>';
    }

    // Exibir o resultado
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ` 
      <h4>Resultado para ${product.charAt(0).toUpperCase() + product.slice(1)}</h4>
      <p>${comparisonResult}</p>
    `;

    // Gráfico de barras com os preços dos mercados
    const labels = selectedProductData.map(item => item.store).concat('Informado');
    const prices = selectedProductData.map(item => item.price).concat(userPrice);

    // Destruir o gráfico de barras anterior se existir
    if (chartInstance) {
      chartInstance.destroy();
    }

    // Criar o gráfico de barras
    const ctx = document.getElementById('priceChart').getContext('2d');
    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Preço (R$)',
          data: prices,
          backgroundColor: ['#0d6efd', '#6c757d', '#198754', '#ffc107', '#dc3545', '#6610f2']
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Gráfico da função afim (cálculo de custo total com base na quantidade)
    const quantityRange = Array.from({ length: quantity }, (_, index) => index + 1); // Quantidade de 1 até o valor digitado
    const costValues = quantityRange.map(q => userPrice * q); // Cálculo do custo total

    // Derivada: A derivada de uma função linear é constante e igual ao preço
    const derivativeValue = userPrice;
    const derivativeLine = new Array(quantity).fill(derivativeValue); // Linha horizontal com o valor da derivada

    // Destruir o gráfico da função afim anterior se existir
    if (affineChartInstance) {
      affineChartInstance.destroy();
    }

    // Criar o gráfico da função afim com derivada e limite
    const affineCtx = document.getElementById('affineChart').getContext('2d');
    affineChartInstance = new Chart(affineCtx, {
      type: 'line',
      data: {
        labels: quantityRange,
        datasets: [
          {
            label: 'Custo Total (R$)',
            data: costValues,
            borderColor: '#198754',
            fill: false,
            tension: 0.1
          },
          {
            label: 'Derivada (R$)',
            data: derivativeLine,
            borderColor: '#FF0000', // Linha vermelha para a derivada
            fill: false,
            borderDash: [5, 5], // Linha pontilhada
            tension: 0.1
          },
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });


  Object.keys(marketData).forEach(product => {
    const option = document.createElement('option');
    option.value = product;
    option.textContent = product.charAt(0).toUpperCase() + product.slice(1); // Capitaliza o nome do produto
    productSelectModal.appendChild(option);
  });
  
  let shoppingList = [];

  // Função para adicionar item à lista de compras
  const addItem = () => {
    const product = productSelectModal.value; // Pega o valor do select do modal
    const quantity = parseInt(quantityInputModal.value); // Pega a quantidade do modal
    const manualPrice = parseFloat(priceInputModal.value); // Pega o preço digitado pelo usuário

    // Depuração: Verificar os valores dos campos
    console.log("Produto selecionado:", product);
    console.log("Quantidade do modal:", quantity);
    console.log("Preço manual do modal:", manualPrice);

    // Verificar se o produto e a quantidade são válidos
    if (!product || isNaN(quantity) || quantity <= 0) {
      console.log("Erro na validação: Campos inválidos.");
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    // Encontrar o produto no marketData
    const selectedProductData = marketData[product];
    if (!selectedProductData) {
      console.log("Erro: Produto não encontrado.");
      alert('Produto não encontrado.');
      return;
    }

    // Se o preço não for digitado, pegar o preço mais barato
    let price = manualPrice;
    if (isNaN(price) || price <= 0) {
      // Encontrar o preço mais barato
      price = Math.min(...selectedProductData.map(p => p.price));
    }

    // Calcular o preço total do item
    const totalItemPrice = price * quantity;

    // Adicionar o item à lista de compras
    shoppingList.push({
      name: product,
      price: price,
      quantity: quantity,
      total: totalItemPrice,
    });

    // Atualizar a interface da lista de compras
    renderShoppingList();
    updateTotalPrice();
  };

  // Adicionar item ao clicar no botão
  addItemButton.addEventListener("click", addItem);

  // Adicionar item ao pressionar Enter
  quantityInputModal.addEventListener("keypress", (event) => {
    if (event.key === "Enter") addItem();
  });

  // Função para renderizar a lista de compras
  const renderShoppingList = () => {
    shoppingListItems.innerHTML = ''; // Limpar lista atual
    shoppingList.forEach(item => {
      const listItem = document.createElement("li");
      listItem.className = "list-group-item d-flex justify-content-between align-items-center";
      listItem.innerHTML = `${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity} = R$ ${item.total.toFixed(2)}`;

      // Botão de remover
      const removeButton = document.createElement("button");
      removeButton.className = "btn btn-sm btn-danger";
      removeButton.textContent = "Remover";
      removeButton.onclick = () => {
        shoppingList = shoppingList.filter(i => i !== item);
        renderShoppingList();
        updateTotalPrice();
      };

      listItem.appendChild(removeButton);
      shoppingListItems.appendChild(listItem);
    });
  };

  // Função para atualizar o preço total
  const updateTotalPrice = () => {
    const total = shoppingList.reduce((sum, item) => sum + item.total, 0);
    totalPriceElement.textContent = total.toFixed(2);
  };

  // Salvar lista (exemplo de como isso pode funcionar)
  saveListButton.addEventListener("click", () => {
    if (shoppingList.length > 0) {
      alert('Lista salva com sucesso!');
      // Aqui você pode adicionar a lógica para salvar a lista em um banco de dados ou outro lugar
    } else {
      alert('Sua lista está vazia.');
    }
  });
});