export const caminhos = {
  "comum": {
    "nome": "Comum",
    "en": "Regular",
    "ferreiro": "Andre de Astora",
    "almas": "Varia",
    "fonte": "https://darksouls.wiki.fextralife.com/Regular+Upgrades",
    "niveis": [
      { "nivel": 1, "materiais": [{ "id": "titanita-fragmento", "qtd": 1 }], "braseiro": null },
      { "nivel": 2, "materiais": [{ "id": "titanita-fragmento", "qtd": 1 }], "braseiro": null },
      { "nivel": 3, "materiais": [{ "id": "titanita-fragmento", "qtd": 2 }], "braseiro": null },
      { "nivel": 4, "materiais": [{ "id": "titanita-fragmento", "qtd": 2 }], "braseiro": null },
      { "nivel": 5, "materiais": [{ "id": "titanita-fragmento", "qtd": 3 }], "braseiro": null },
      { "nivel": 6, "materiais": [{ "id": "titanita-fragmento-grande", "qtd": 1 }], "braseiro": "grande-braseiro" },
      { "nivel": 7, "materiais": [{ "id": "titanita-fragmento-grande", "qtd": 1 }], "braseiro": null },
      { "nivel": 8, "materiais": [{ "id": "titanita-fragmento-grande", "qtd": 2 }], "braseiro": null },
      { "nivel": 9, "materiais": [{ "id": "titanita-fragmento-grande", "qtd": 2 }], "braseiro": null },
      { "nivel": 10, "materiais": [{ "id": "titanita-fragmento-grande", "qtd": 3 }], "braseiro": null },
      { "nivel": 11, "materiais": [{ "id": "titanita-pedaco", "qtd": 1 }], "braseiro": "enorme-braseiro" },
      { "nivel": 12, "materiais": [{ "id": "titanita-pedaco", "qtd": 1 }], "braseiro": null },
      { "nivel": 13, "materiais": [{ "id": "titanita-pedaco", "qtd": 2 }], "braseiro": null },
      { "nivel": 14, "materiais": [{ "id": "titanita-pedaco", "qtd": 3 }], "braseiro": null },
      { "nivel": 15, "materiais": [{ "id": "titanita-placa", "qtd": 1 }], "braseiro": null }
    ]
  },
  "rustica": {
    "nome": "Rústica",
    "en": "Raw",
    "ferreiro": "Andre de Astora",
    "almas": "Varia",
    "fonte": "https://darksouls.wiki.fextralife.com/Raw+Upgrades",
    "base": { "caminho": "comum", "nivel": 5 },
    "ascensao": {
      "materiais": [
        { "id": "titanita-fragmento-grande", "qtd": 1 }
      ],
      "braseiro": "grande-braseiro"
    },
    "niveis": [
      { "nivel": 1, "materiais": [{ "id": "titanita-fragmento-grande", "qtd": 1 }], "braseiro": null },
      { "nivel": 2, "materiais": [{ "id": "titanita-fragmento-grande", "qtd": 1 }], "braseiro": null },
      { "nivel": 3, "materiais": [{ "id": "titanita-fragmento-grande", "qtd": 2 }], "braseiro": null },
      { "nivel": 4, "materiais": [{ "id": "titanita-fragmento-grande", "qtd": 2 }], "braseiro": null },
      { "nivel": 5, "materiais": [{ "id": "titanita-fragmento-grande", "qtd": 3 }], "braseiro": null }
    ]
  },
  "cristalizada": {
    "nome": "Cristalizada",
    "en": "Crystal",
    "ferreiro": "Ferreiro gigante",
    "almas": "Varia",
    "fonte": "https://darksouls.wiki.fextralife.com/Crystal+Upgrades",
    "base": { "caminho": "comum", "nivel": 10 },
    "ascensao": {
      "materiais": [
        { "id": "titanita-pedaco", "qtd": 1 }
      ],
      "braseiro": "braseiro-cristalizado"
    },
    "niveis": [
      { "nivel": 1, "materiais": [{ "id": "titanita-pedaco", "qtd": 1 }], "braseiro": null },
      { "nivel": 2, "materiais": [{ "id": "titanita-pedaco", "qtd": 1 }], "braseiro": null },
      { "nivel": 3, "materiais": [{ "id": "titanita-pedaco", "qtd": 2 }], "braseiro": null },
      { "nivel": 4, "materiais": [{ "id": "titanita-pedaco", "qtd": 3 }], "braseiro": null },
      { "nivel": 5, "materiais": [{ "id": "titanita-placa", "qtd": 1 }], "braseiro": null }
    ]
  },
  "eletrica": {
    "nome": "Elétrica",
    "en": "Lightning",
    "ferreiro": "Ferreiro gigante",
    "almas": "Varia",
    "fonte": "https://darksouls.wiki.fextralife.com/Lightning+Upgrades",
    "base": { "caminho": "comum", "nivel": 10 },
    "ascensao": {
      "materiais": [
        { "id": "titanita-pedaco", "qtd": 1 }
      ],
      "braseiro": null
    },
    "niveis": [
      { "nivel": 1, "materiais": [{ "id": "titanita-pedaco", "qtd": 1 }], "braseiro": null },
      { "nivel": 2, "materiais": [{ "id": "titanita-pedaco", "qtd": 2 }], "braseiro": null },
      { "nivel": 3, "materiais": [{ "id": "titanita-pedaco", "qtd": 2 }], "braseiro": null },
      { "nivel": 4, "materiais": [{ "id": "titanita-pedaco", "qtd": 3 }], "braseiro": null },
      { "nivel": 5, "materiais": [{ "id": "titanita-placa", "qtd": 1 }], "braseiro": null }
    ]
  },
  "magica": {
    "nome": "Mágica",
    "en": "Magic",
    "ferreiro": "Rickert de Vinheim",
    "almas": "Varia",
    "fonte": "https://darksouls.wiki.fextralife.com/Magic+Upgrades",
    "base": { "caminho": "comum", "nivel": 5 },
    "ascensao": {
      "materiais": [
        { "id": "titanita-fragmento-verde", "qtd": 1 }
      ],
      "braseiro": null
    },
    "niveis": [
      { "nivel": 1, "materiais": [{ "id": "titanita-fragmento-verde", "qtd": 1 }], "braseiro": null },
      { "nivel": 2, "materiais": [{ "id": "titanita-fragmento-verde", "qtd": 1 }], "braseiro": null },
      { "nivel": 3, "materiais": [{ "id": "titanita-fragmento-verde", "qtd": 2 }], "braseiro": null },
      { "nivel": 4, "materiais": [{ "id": "titanita-fragmento-verde", "qtd": 2 }], "braseiro": null },
      { "nivel": 5, "materiais": [{ "id": "titanita-fragmento-verde", "qtd": 3 }], "braseiro": null },
      { "nivel": 6, "materiais": [{ "id": "titanita-pedaco-azul", "qtd": 1 }], "braseiro": "grande-braseiro-magico" },
      { "nivel": 7, "materiais": [{ "id": "titanita-pedaco-azul", "qtd": 1 }], "braseiro": null },
      { "nivel": 8, "materiais": [{ "id": "titanita-pedaco-azul", "qtd": 2 }], "braseiro": null },
      { "nivel": 9, "materiais": [{ "id": "titanita-pedaco-azul", "qtd": 3 }], "braseiro": null },
      { "nivel": 10, "materiais": [{ "id": "titanita-placa-azul", "qtd": 1 }], "braseiro": null }
    ]
  },
  "encantada": {
    "nome": "Encantada",
    "en": "Enchanted",
    "ferreiro": "Rickert de Vinheim",
    "almas": "Varia",
    "fonte": "https://darksouls.wiki.fextralife.com/Enchanted+Upgrades",
    "base": { "caminho": "magica", "nivel": 5 },
    "ascensao": {
      "materiais": [
        { "id": "titanita-pedaco-azul", "qtd": 1 }
      ],
      "braseiro": "braseiro-encantado"
    },
    "niveis": [
      { "nivel": 1, "materiais": [{ "id": "titanita-pedaco-azul", "qtd": 1 }], "braseiro": null },
      { "nivel": 2, "materiais": [{ "id": "titanita-pedaco-azul", "qtd": 1 }], "braseiro": null },
      { "nivel": 3, "materiais": [{ "id": "titanita-pedaco-azul", "qtd": 2 }], "braseiro": null },
      { "nivel": 4, "materiais": [{ "id": "titanita-pedaco-azul", "qtd": 3 }], "braseiro": null },
      { "nivel": 5, "materiais": [{ "id": "titanita-placa-azul", "qtd": 1 }], "braseiro": null }
    ]
  },
  "divina": {
    "nome": "Divina",
    "en": "Divine",
    "ferreiro": "Andre de Astora",
    "almas": "Varia",
    "fonte": "https://darksouls.wiki.fextralife.com/Divine+Upgrades",
    "base": { "caminho": "comum", "nivel": 5 },
    "ascensao": {
      "materiais": [
        { "id": "titanita-fragmento-verde", "qtd": 1 }
      ],
      "braseiro": "braseiro-divino"
    },
    "niveis": [
      { "nivel": 1, "materiais": [{ "id": "titanita-fragmento-verde", "qtd": 1 }], "braseiro": null },
      { "nivel": 2, "materiais": [{ "id": "titanita-fragmento-verde", "qtd": 1 }], "braseiro": null },
      { "nivel": 3, "materiais": [{ "id": "titanita-fragmento-verde", "qtd": 2 }], "braseiro": null },
      { "nivel": 4, "materiais": [{ "id": "titanita-fragmento-verde", "qtd": 2 }], "braseiro": null },
      { "nivel": 5, "materiais": [{ "id": "titanita-fragmento-verde", "qtd": 3 }], "braseiro": null },
      { "nivel": 6, "materiais": [{ "id": "titanita-pedaco-branca", "qtd": 1 }], "braseiro": "grande-braseiro-divino" },
      { "nivel": 7, "materiais": [{ "id": "titanita-pedaco-branca", "qtd": 1 }], "braseiro": null },
      { "nivel": 8, "materiais": [{ "id": "titanita-pedaco-branca", "qtd": 2 }], "braseiro": null },
      { "nivel": 9, "materiais": [{ "id": "titanita-pedaco-branca", "qtd": 3 }], "braseiro": null },
      { "nivel": 10, "materiais": [{ "id": "titanita-placa-branca", "qtd": 1 }], "braseiro": null }
    ]
  },
  "oculta": {
    "nome": "Oculta",
    "en": "Occult",
    "ferreiro": "Andre de Astora",
    "almas": "Varia",
    "fonte": "https://darksouls.wiki.fextralife.com/Occult+Upgrades",
    "base": { "caminho": "divina", "nivel": 5 },
    "ascensao": {
      "materiais": [
        { "id": "titanita-pedaco-branca", "qtd": 1 }
      ],
      "braseiro": "braseiro-oculto"
    },
    "niveis": [
      { "nivel": 1, "materiais": [{ "id": "titanita-pedaco-branca", "qtd": 1 }], "braseiro": null },
      { "nivel": 2, "materiais": [{ "id": "titanita-pedaco-branca", "qtd": 1 }], "braseiro": null },
      { "nivel": 3, "materiais": [{ "id": "titanita-pedaco-branca", "qtd": 2 }], "braseiro": null },
      { "nivel": 4, "materiais": [{ "id": "titanita-pedaco-branca", "qtd": 3 }], "braseiro": null },
      { "nivel": 5, "materiais": [{ "id": "titanita-placa-branca", "qtd": 1 }], "braseiro": null }
    ]
  },
  "ignea": {
    "nome": "Ígnea",
    "en": "Fire",
    "ferreiro": "Vamos",
    "almas": "Varia",
    "fonte": "https://darksouls.wiki.fextralife.com/Fire+Upgrades",
    "base": { "caminho": "comum", "nivel": 5 },
    "ascensao": {
      "materiais": [
        { "id": "titanita-fragmento-verde", "qtd": 1 }
      ],
      "braseiro": null
    },
    "niveis": [
      { "nivel": 1, "materiais": [{ "id": "titanita-fragmento-verde", "qtd": 1 }], "braseiro": null },
      { "nivel": 2, "materiais": [{ "id": "titanita-fragmento-verde", "qtd": 1 }], "braseiro": null },
      { "nivel": 3, "materiais": [{ "id": "titanita-fragmento-verde", "qtd": 2 }], "braseiro": null },
      { "nivel": 4, "materiais": [{ "id": "titanita-fragmento-verde", "qtd": 2 }], "braseiro": null },
      { "nivel": 5, "materiais": [{ "id": "titanita-fragmento-verde", "qtd": 3 }], "braseiro": null },
      { "nivel": 6, "materiais": [{ "id": "titanita-pedaco-vermelha", "qtd": 1 }], "braseiro": "grande-braseiro-igneo" },
      { "nivel": 7, "materiais": [{ "id": "titanita-pedaco-vermelha", "qtd": 1 }], "braseiro": null },
      { "nivel": 8, "materiais": [{ "id": "titanita-pedaco-vermelha", "qtd": 2 }], "braseiro": null },
      { "nivel": 9, "materiais": [{ "id": "titanita-pedaco-vermelha", "qtd": 3 }], "braseiro": null },
      { "nivel": 10, "materiais": [{ "id": "titanita-placa-vermelha", "qtd": 1 }], "braseiro": null }
    ]
  },
  "caotica": {
    "nome": "Caótica",
    "en": "Chaos",
    "ferreiro": "Vamos",
    "almas": "Varia",
    "fonte": "https://darksouls.wiki.fextralife.com/Chaos+Upgrades",
    "base": { "caminho": "ignea", "nivel": 5 },
    "ascensao": {
      "materiais": [
        { "id": "titanita-pedaco-vermelha", "qtd": 1 }
      ],
      "braseiro": "braseiro-de-fogo-caotico"
    },
    "niveis": [
      { "nivel": 1, "materiais": [{ "id": "titanita-pedaco-vermelha", "qtd": 1 }], "braseiro": null },
      { "nivel": 2, "materiais": [{ "id": "titanita-pedaco-vermelha", "qtd": 1 }], "braseiro": null },
      { "nivel": 3, "materiais": [{ "id": "titanita-pedaco-vermelha", "qtd": 2 }], "braseiro": null },
      { "nivel": 4, "materiais": [{ "id": "titanita-pedaco-vermelha", "qtd": 3 }], "braseiro": null },
      { "nivel": 5, "materiais": [{ "id": "titanita-placa-vermelha", "qtd": 1 }], "braseiro": null }
    ]
  }
};
