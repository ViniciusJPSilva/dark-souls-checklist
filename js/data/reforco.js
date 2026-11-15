export const reforco = {
  "id": "armas-reforco",
  "title": "Reforço de Armas",
  "type": "list",
  "entries": [
    {
      "id": "t-excepcional",
      "trophy": "bronze",
      "icon": "17Sf65f26.png",
      "name": "Arma excepcional",
      "en": "Strongest Weapon",
      "desc": "Adquira a melhor arma através de reforço padrão.",
      "hint": "Arma comum +15",
      "cost": "Varia",
      "npc": "Andre de Astora",
      "local": "Paróquia dos Mortos-vivos",
      "req": "Entregar o Grande braseiro e o Enorme braseiro.",
      "obs": "O Grande braseiro fica nas Profundezas e o Enorme braseiro nas Ruínas de Nova Londo.",
      "caminho": "comum",
      "etapas": [
        { "id": "t-excepcional:base", "label": "Arma comum (+0)" },
        { "id": "t-excepcional:5", "label": "Arma comum +5", "ate": { "caminho": "comum", "nivel": 5 } },
        { "id": "t-excepcional:10", "label": "Arma comum +10", "ate": { "caminho": "comum", "nivel": 10 } },
        { "id": "t-excepcional:15", "label": "Arma comum +15", "ate": { "caminho": "comum", "nivel": 15 } }
      ],
      "done": false
    },
    {
      "id": "t-cristalizada",
      "trophy": "bronze",
      "icon": "18Sf95c59.png",
      "name": "Arma cristalizada",
      "en": "Crystal Weapon",
      "desc": "Adquira a melhor arma através de reforço cristalizado.",
      "hint": "Arma cristalizada +5",
      "cost": "Varia",
      "npc": "Ferreiro gigante",
      "local": "Anor Londo",
      "req": "Entregar o Braseiro cristalizado. Precisa de arma comum +10.",
      "obs": "O Braseiro cristalizado fica na Biblioteca do Duque.",
      "caminho": "cristalizada",
      "etapas": [
        { "id": "t-cristalizada:pre", "label": "Arma comum +10 (pré-requisito)", "ate": { "caminho": "comum", "nivel": 10 } },
        { "id": "t-cristalizada:0", "label": "Arma cristalizada +0", "ate": { "caminho": "cristalizada", "nivel": 0 } },
        { "id": "t-cristalizada:5", "label": "Arma cristalizada +5", "ate": { "caminho": "cristalizada", "nivel": 5 } }
      ],
      "done": false
    },
    {
      "id": "t-eletrica",
      "trophy": "bronze",
      "icon": "19Sffb988.png",
      "name": "Arma elétrica",
      "en": "Lightning Weapon",
      "desc": "Adquira a melhor arma através de reforço elétrico.",
      "hint": "Arma elétrica +5",
      "cost": "Varia",
      "npc": "Ferreiro gigante",
      "local": "Anor Londo",
      "req": "Precisa de arma comum +10.",
      "caminho": "eletrica",
      "etapas": [
        { "id": "t-eletrica:pre", "label": "Arma comum +10 (pré-requisito)", "ate": { "caminho": "comum", "nivel": 10 } },
        { "id": "t-eletrica:0", "label": "Arma elétrica +0", "ate": { "caminho": "eletrica", "nivel": 0 } },
        { "id": "t-eletrica:5", "label": "Arma elétrica +5", "ate": { "caminho": "eletrica", "nivel": 5 } }
      ],
      "done": false
    },
    {
      "id": "t-rustica",
      "trophy": "bronze",
      "icon": "20S305a2c.png",
      "name": "Arma rústica",
      "en": "Raw Weapon",
      "desc": "Adquira a melhor arma através de reforço rústico.",
      "hint": "Arma rústica +5",
      "cost": "Varia",
      "npc": "Andre de Astora",
      "local": "Paróquia dos Mortos-vivos",
      "req": "Entregar o Grande braseiro. Precisa de arma comum +5.",
      "caminho": "rustica",
      "etapas": [
        { "id": "t-rustica:pre", "label": "Arma comum +5 (pré-requisito)", "ate": { "caminho": "comum", "nivel": 5 } },
        { "id": "t-rustica:0", "label": "Arma rústica +0", "ate": { "caminho": "rustica", "nivel": 0 } },
        { "id": "t-rustica:5", "label": "Arma rústica +5", "ate": { "caminho": "rustica", "nivel": 5 } }
      ],
      "done": false
    },
    {
      "id": "t-magica",
      "trophy": "bronze",
      "icon": "21S3986b7.png",
      "name": "Arma mágica",
      "en": "Magic Weapon",
      "desc": "Adquira a melhor arma através de reforço mágico.",
      "hint": "Arma mágica +10",
      "cost": "Varia",
      "npc": "Rickert de Vinheim",
      "local": "Ruínas de Nova Londo",
      "req": "Entregar o Grande braseiro mágico. Precisa de arma comum +5.",
      "obs": "O Grande braseiro mágico fica na Biblioteca do Duque.",
      "caminho": "magica",
      "etapas": [
        { "id": "t-magica:pre", "label": "Arma comum +5 (pré-requisito)", "ate": { "caminho": "comum", "nivel": 5 } },
        { "id": "t-magica:5", "label": "Arma mágica +5", "ate": { "caminho": "magica", "nivel": 5 } },
        { "id": "t-magica:10", "label": "Arma mágica +10", "ate": { "caminho": "magica", "nivel": 10 } }
      ],
      "done": false
    },
    {
      "id": "t-encantada",
      "trophy": "bronze",
      "icon": "22S907bf8.png",
      "name": "Arma encantada",
      "en": "Enchanted Weapon",
      "desc": "Adquira a melhor arma através de reforço encantado.",
      "hint": "Arma encantada +5",
      "cost": "Varia",
      "npc": "Rickert de Vinheim",
      "local": "Ruínas de Nova Londo",
      "req": "Entregar o Braseiro encantado. Precisa de arma mágica +5.",
      "obs": "O Braseiro encantado fica no Jardim da Raiz Negra.",
      "caminho": "encantada",
      "etapas": [
        { "id": "t-encantada:pre", "label": "Arma mágica +5 (pré-requisito)", "ate": { "caminho": "magica", "nivel": 5 } },
        { "id": "t-encantada:0", "label": "Arma encantada +0", "ate": { "caminho": "encantada", "nivel": 0 } },
        { "id": "t-encantada:5", "label": "Arma encantada +5", "ate": { "caminho": "encantada", "nivel": 5 } }
      ],
      "done": false
    },
    {
      "id": "t-divina",
      "trophy": "bronze",
      "icon": "23S530ee8.png",
      "name": "Arma divina",
      "en": "Divine Weapon",
      "desc": "Adquira a melhor arma através de reforço divino.",
      "hint": "Arma divina +10",
      "cost": "Varia",
      "npc": "Andre de Astora",
      "local": "Paróquia dos Mortos-vivos",
      "req": "Entregar o Braseiro divino e o Grande braseiro divino. Precisa de arma comum +5.",
      "obs": "O Braseiro divino fica no Jardim da Raiz Negra e o Grande braseiro divino na Tumba dos Gigantes.",
      "caminho": "divina",
      "etapas": [
        { "id": "t-divina:pre", "label": "Arma comum +5 (pré-requisito)", "ate": { "caminho": "comum", "nivel": 5 } },
        { "id": "t-divina:5", "label": "Arma divina +5", "ate": { "caminho": "divina", "nivel": 5 } },
        { "id": "t-divina:10", "label": "Arma divina +10", "ate": { "caminho": "divina", "nivel": 10 } }
      ],
      "done": false
    },
    {
      "id": "t-oculta",
      "trophy": "bronze",
      "icon": "24S80ec19.png",
      "name": "Arma oculta",
      "en": "Occult Weapon",
      "desc": "Adquira a melhor arma através de reforço oculto.",
      "hint": "Arma oculta +5",
      "cost": "Varia",
      "npc": "Andre de Astora",
      "local": "Paróquia dos Mortos-vivos",
      "req": "Entregar o Braseiro oculto. Precisa de arma divina +5.",
      "obs": "O Braseiro oculto fica no Mundo da Pintura de Ariamis.",
      "caminho": "oculta",
      "etapas": [
        { "id": "t-oculta:pre", "label": "Arma divina +5 (pré-requisito)", "ate": { "caminho": "divina", "nivel": 5 } },
        { "id": "t-oculta:0", "label": "Arma oculta +0", "ate": { "caminho": "oculta", "nivel": 0 } },
        { "id": "t-oculta:5", "label": "Arma oculta +5", "ate": { "caminho": "oculta", "nivel": 5 } }
      ],
      "done": false
    },
    {
      "id": "t-ignea",
      "trophy": "bronze",
      "icon": "25S29a1b2.png",
      "name": "Arma ígnea",
      "en": "Fire Weapon",
      "desc": "Adquira a melhor arma através de reforço ígneo.",
      "hint": "Arma ígnea +10",
      "cost": "Varia",
      "npc": "Vamos",
      "local": "Catacumbas",
      "req": "Entregar o Grande braseiro ígneo. Precisa de arma comum +5.",
      "obs": "O Grande braseiro ígneo fica nas Ruínas do Demônio.",
      "caminho": "ignea",
      "etapas": [
        { "id": "t-ignea:pre", "label": "Arma comum +5 (pré-requisito)", "ate": { "caminho": "comum", "nivel": 5 } },
        { "id": "t-ignea:5", "label": "Arma ígnea +5", "ate": { "caminho": "ignea", "nivel": 5 } },
        { "id": "t-ignea:10", "label": "Arma ígnea +10", "ate": { "caminho": "ignea", "nivel": 10 } }
      ],
      "done": false
    },
    {
      "id": "t-caotica",
      "trophy": "bronze",
      "icon": "26Sade884.png",
      "name": "Arma caótica",
      "en": "Chaos Weapon",
      "desc": "Adquira a melhor arma através de reforço caótico.",
      "hint": "Arma caótica +5",
      "cost": "Varia",
      "npc": "Vamos",
      "local": "Catacumbas",
      "req": "Entregar o Braseiro de fogo caótico. Precisa de arma ígnea +5.",
      "obs": "O Braseiro de fogo caótico fica nas Ruínas do Demônio.",
      "caminho": "caotica",
      "etapas": [
        { "id": "t-caotica:pre", "label": "Arma ígnea +5 (pré-requisito)", "ate": { "caminho": "ignea", "nivel": 5 } },
        { "id": "t-caotica:0", "label": "Arma caótica +0", "ate": { "caminho": "caotica", "nivel": 0 } },
        { "id": "t-caotica:5", "label": "Arma caótica +5", "ate": { "caminho": "caotica", "nivel": 5 } }
      ],
      "done": false
    }
  ]
};
