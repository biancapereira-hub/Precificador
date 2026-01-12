console.log("JS carregou");

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

    // opção padrão
    const defaultOpt = document.createElement("option");
    defaultOpt.value = "";
    defaultOpt.textContent = "Selecione uma categoria";
    defaultOpt.disabled = true;
    defaultOpt.selected = true;
    select.appendChild(defaultOpt);

    categorias.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat;
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
function copiarResultado() {
    const preco = document.getElementById("precoVendaCopiar");

    if (!preco) {
        alert("Calcule o preço antes de copiar.");
        return;
    }

    navigator.clipboard.writeText(preco.innerText);
    alert("Preço de venda copiado!");
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

    if (custo === null || custo <= 0) {
        alert("Informe um custo válido.");
        return;
    }

    if (custo > 78.99 && (!peso || peso <= 0)) {
        alert("Informe o peso do produto.");
        return;
    }

    let envio = 0;

    for (let [limite, valor] of TARIFAS_ENVIO.fixo) {
        if (custo <= limite) {
            envio = valor;
            break;
        }
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
                    envio =
                        faixa.tabela[faixa.tabela.length - 1][1] +
                        Math.ceil(peso - 10) * faixa.adicional;
                }
                if (!categoria) {
    alert("Selecione uma categoria.");
    return;
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
    
document.getElementById("resultado").innerHTML = `
📦 <strong>RESUMO DO CÁLCULO</strong><br><br>

Custo do produto: R$ ${custo.toFixed(2)}<br>
Categoria: ${categoria}<br>
Comissão: R$ ${comissao.toFixed(2)}<br>
Frete: R$ ${envio.toFixed(2)}<br><br>

Custo total: R$ ${custoTotal.toFixed(2)}<br>

<strong>Preço de venda:</strong><br>
<span id="precoVendaCopiar">${precoVenda.toFixed(2)}</span>
<button onclick="copiarResultado()">Copiar</button><br><br>

Lucro: R$ ${lucro.toFixed(2)}<br>
Margem real: ${margemPct.toFixed(2)}%
`;
}
