const categorias = [
    "Comidas e bebidas",
    "Eletrodomésticos de linha branca",
    "Saúde e cuidados pessoais",
    "Bebidas alcoólicas",
    "Pneus e rodas",
    "Indústria e Ciência",
    "Produtos para bebês",
    "Produtos para animais de estimação",
    "Eletroportáteis de cuidado pessoal",
    "Cozinha",
    "Jardim e Piscina",
    "Brinquedos e jogos",
    "TV, áudio e cinema em casa",
    "PC",
    "Eletrônicos portáteis",
    "Peças e acessórios automotivos",
    "Casa",
    "Beleza",
    "Beleza de luxo",
    "Celulares",
    "Câmera e fotografia",
    "Videogames e consoles",
    "Esportes, aventura e lazer",
    "Ferramentas e Construção",
    "Papelaria e Escritório",
    "Bagagem e acessórios de viagem",
    "Roupas e acessórios",
    "Calçados, bolsas e óculos escuros",
    "Relógios",
    "Joias",
    "Livros",
    "Acessórios para eletrônicos e para PC",
    "Móveis",
    "Vídeo e DVD",
    "Música",
    "Instrumentos musicais e acessórios",
    "Demais categorias"
];

window.onload = () => {
    const select = document.getElementById("categoria");
    categorias.forEach(cat => {
        const opt = document.createElement("option");
        opt.textContent = cat;
        select.appendChild(opt);
    });
};

function lerNumero(valor) {
    if (valor.includes(",")) {
        alert("Use ponto (.) em vez de vírgula");
        return null;
    }
    const num = parseFloat(valor);
    return isNaN(num) ? null : num;
}

function calcularComissao(categoria, preco) {
    const comissoes = {
        "Comidas e bebidas": 0.10,
        "Eletrodomésticos de linha branca": 0.11,
        "Saúde e cuidados pessoais": 0.12,
        "Bebidas alcoólicas": 0.11,
        "Pneus e rodas": 0.10,
        "Indústria e Ciência": 0.12,
        "Produtos para bebês": 0.12,
        "Produtos para animais de estimação": 0.12,
        "Eletroportáteis de cuidado pessoal": 0.12,
        "Cozinha": 0.12,
        "Jardim e Piscina": 0.12,
        "Brinquedos e jogos": 0.12,
        "TV, áudio e cinema em casa": 0.10,
        "PC": 0.12,
        "Eletrônicos portáteis": 0.13,
        "Peças e acessórios automotivos": 0.12,
        "Casa": 0.12,
        "Beleza": 0.13,
        "Beleza de luxo": 0.14,
        "Celulares": 0.11,
        "Câmera e fotografia": 0.11,
        "Videogames e consoles": 0.11,
        "Esportes, aventura e lazer": 0.12,
        "Ferramentas e Construção": 0.11,
        "Papelaria e Escritório": 0.13,
        "Bagagem e acessórios de viagem": 0.14,
        "Roupas e acessórios": 0.14,
        "Calçados, bolsas e óculos escuros": 0.14,
        "Relógios": 0.13,
        "Joias": 0.14,
        "Livros": 0.15,
        "Vídeo e DVD": 0.15,
        "Música": 0.15,
        "Instrumentos musicais e acessórios": 0.12,
        "Demais categorias": 0.15
    };

    if (categoria === "Acessórios para eletrônicos e para PC") {
        return preco <= 100 ? preco * 0.15 : (100 * 0.15) + ((preco - 100) * 0.10);
    }

    if (categoria === "Móveis") {
        return preco <= 200 ? preco * 0.15 : (200 * 0.15) + ((preco - 200) * 0.10);
    }

    let comissao = preco * (comissoes[categoria] || 0.15);

    if (categoria === "Indústria e Ciência" && comissao < 2) {
        return 2.00;
    }

    return comissao;
}

const TARIFAS_ENVIO = {
    fixo: [
        [30, 4.50],
        [49.99, 6.50],
        [78.99, 6.75]
    ],
    faixas: [
        {
            max: 99.99, adicional: 3.05,
            tabela: [[0.25,11.95],[0.5,12.85],[1,13.45],[2,14.00],[3,14.95],[4,16.15],[5,17.00],[6,25.00],[7,26.00],[8,27.00],[9,28.00],[10,39.50]]
        },
        {
            max: 119.99, adicional: 3.05,
            tabela: [[0.25,15.00],[0.5,15.00],[1,15.70],[2,16.35],[3,17.45],[4,18.85],[5,19.90],[6,30.00],[7,31.00],[8,32.00],[9,33.00],[10,46.00]]
        },
        {
            max: 149.99, adicional: 3.05,
            tabela: [[0.25,15.95],[0.5,17.15],[1,17.95],[2,18.75],[3,19.95],[4,21.55],[5,22.75],[6,34.00],[7,35.00],[8,36.00],[9,37.00],[10,52.75]]
        },
        {
            max: 199.99, adicional: 3.05,
            tabela: [[0.25,17.95],[0.5,19.30],[1,20.20],[2,21.10],[3,22.40],[4,24.20],[5,25.60],[6,38.00],[7,39.00],[8,40.00],[9,41.00],[10,59.00]]
        },
        {
            max: Infinity, adicional: 4.00,
            tabela: [[0.25,20.45],[0.5,20.95],[1,21.95],[2,23.45],[3,24.45],[4,25.95],[5,27.95],[6,36.95],[7,39.45],[8,40.45],[9,46.95],[10,65.95]]
        }
    ]
};

function calcular() {
    const custo = lerNumero(document.getElementById("custo").value);
    const peso = lerNumero(document.getElementById("peso").value || "0");
    const categoria = document.getElementById("categoria").value;

    if (custo === null) return;

    let envio = 0;

    for (let [limite, valor] of TARIFAS_ENVIO.fixo) {
        if (custo <= limite) envio = valor;
    }

    if (custo > 78.99) {
        for (let faixa of TARIFAS_ENVIO.faixas) {
            if (custo <= faixa.max) {
                for (let [lim, val] of faixa.tabela) {
                    if (peso <= lim) {
                        envio = val;
                        break;
                    }
                }
                if (peso > 10) {
                    envio = faixa.tabela[faixa.tabela.length - 1][1] + ((peso - 10) * faixa.adicional);
                }
                break;
            }
        }
    }

    const comissao = calcularComissao(categoria, custo);
    const custoTotal = custo + envio + comissao;

    const margem = 0.20;
    const precoVenda = custoTotal / (1 - margem);
    const lucro = precoVenda - custoTotal;
    const margemPct = (lucro / precoVenda) * 100;

   function calcularPreco() {
    const custoInput = document.getElementById("custo").value;
    const pesoInput = document.getElementById("peso").value;
    const categoria = document.getElementById("categoria").value;

    if (custoInput.includes(",") || pesoInput.includes(",")) {
        alert("Use ponto (.) ao invés de vírgula.");
        return;
    }

    const custo = parseFloat(custoInput);
    const peso = parseFloat(pesoInput);

    if (isNaN(custo) || custo <= 0) {
        alert("Custo inválido.");
        return;
    }

    if (custo > 78.99 && (isNaN(peso) || peso <= 0)) {
        alert("Informe o peso do produto.");
        return;
    }

    /* ===== COMISSÕES ===== */
    const comissoes = {
        "Comidas e bebidas": 0.10,
        "Eletrônicos portáteis": 0.13,
        "Livros": 0.15,
        "Indústria e Ciência": 0.12,
        "Demais categorias": 0.15
    };

    const percentualComissao = comissoes[categoria] || 0.15;
    let valorComissao = custo * percentualComissao;

    if (categoria === "Indústria e Ciência" && valorComissao < 2) {
        valorComissao = 2;
    }

    /* ===== FRETE ===== */
    let frete = 0;
    let adicionalKg = custo >= 200 ? 4.00 : 3.05;

    function faixaPeso(peso, tabela) {
        for (let faixa of tabela) {
            if (peso <= faixa.max) return faixa.valor;
        }
        const excedente = Math.ceil(peso - 10);
        return tabela[tabela.length - 1].valor + (excedente * adicionalKg);
    }

    if (custo <= 30) frete = 4.50;
    else if (custo <= 49.99) frete = 6.50;
    else if (custo <= 78.99) frete = 6.75;
    else if (custo <= 99.99) {
        frete = faixaPeso(peso, [
            { max: 0.25, valor: 11.95 },
            { max: 0.5, valor: 12.85 },
            { max: 1, valor: 13.45 },
            { max: 2, valor: 14.00 },
            { max: 3, valor: 14.95 },
            { max: 4, valor: 16.15 },
            { max: 5, valor: 17.00 },
            { max: 6, valor: 25.00 },
            { max: 7, valor: 26.00 },
            { max: 8, valor: 27.00 },
            { max: 9, valor: 28.00 },
            { max: 10, valor: 39.50 }
        ]);
    }
    else if (custo <= 119.99) {
        frete = faixaPeso(peso, [
            { max: 0.25, valor: 15.00 },
            { max: 0.5, valor: 15.00 },
            { max: 1, valor: 15.70 },
            { max: 2, valor: 16.35 },
            { max: 3, valor: 17.45 },
            { max: 4, valor: 18.85 },
            { max: 5, valor: 19.90 },
            { max: 6, valor: 30.00 },
            { max: 7, valor: 31.00 },
            { max: 8, valor: 32.00 },
            { max: 9, valor: 33.00 },
            { max: 10, valor: 46.00 }
        ]);
    }
    else if (custo <= 149.99) {
        frete = faixaPeso(peso, [
            { max: 0.25, valor: 15.95 },
            { max: 0.5, valor: 17.15 },
            { max: 1, valor: 17.95 },
            { max: 2, valor: 18.75 },
            { max: 3, valor: 19.95 },
            { max: 4, valor: 21.55 },
            { max: 5, valor: 22.75 },
            { max: 6, valor: 34.00 },
            { max: 7, valor: 35.00 },
            { max: 8, valor: 36.00 },
            { max: 9, valor: 37.00 },
            { max: 10, valor: 52.75 }
        ]);
    }
    else if (custo <= 199.99) {
        frete = faixaPeso(peso, [
            { max: 0.25, valor: 17.95 },
            { max: 0.5, valor: 19.30 },
            { max: 1, valor: 20.20 },
            { max: 2, valor: 21.10 },
            { max: 3, valor: 22.40 },
            { max: 4, valor: 24.20 },
            { max: 5, valor: 25.60 },
            { max: 6, valor: 38.00 },
            { max: 7, valor: 39.00 },
            { max: 8, valor: 40.00 },
            { max: 9, valor: 41.00 },
            { max: 10, valor: 59.00 }
        ]);
    }
    else {
        frete = faixaPeso(peso, [
            { max: 0.25, valor: 20.45 },
            { max: 0.5, valor: 20.95 },
            { max: 1, valor: 21.95 },
            { max: 2, valor: 23.45 },
            { max: 3, valor: 24.45 },
            { max: 4, valor: 25.95 },
            { max: 5, valor: 27.95 },
            { max: 6, valor: 36.95 },
            { max: 7, valor: 39.45 },
            { max: 8, valor: 40.45 },
            { max: 9, valor: 46.95 },
            { max: 10, valor: 65.95 }
        ]);
    }

    /* ===== CÁLCULOS FINAIS ===== */
    const custoTotal = custo + valorComissao + frete;
    const precoVenda = custoTotal / 0.8;
    const lucro = precoVenda - custoTotal;
    const percLucro = (lucro / precoVenda) * 100;

    document.getElementById("resultado").innerHTML = `
📦 RESUMO DO CÁLCULO

Custo do produto: R$ ${custo.toFixed(2)}
Categoria: ${categoria}
Comissão: R$ ${valorComissao.toFixed(2)}
Frete: R$ ${frete.toFixed(2)}

Custo total: R$ ${custoTotal.toFixed(2)}
Preço de venda: R$ ${precoVenda.toFixed(2)}
Lucro: R$ ${lucro.toFixed(2)}
Margem real: ${percLucro.toFixed(2)}%
`;
}

    document.getElementById("resultado").innerHTML = `
        <strong>Preço de venda:</strong> R$ ${precoVenda.toFixed(2)}<br>
        <strong>Lucro:</strong> R$ ${lucro.toFixed(2)}<br>
        <strong>Margem:</strong> ${margemPct.toFixed(2)}%
    `;
}

function copiarResultado() {
    const texto = document.getElementById("resultado").innerText;
    navigator.clipboard.writeText(texto);
    alert("Resultados copiados!");
}
