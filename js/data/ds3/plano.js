export const plano = {
  "id": "ds3-plano",
  "title": "Plano de ciclos",
  "type": "guide",
  "intro": "Um roteiro de três ciclos no mesmo personagem. As versões +1 dos anéis aparecem a partir do NG+, as +2 e o Anel da vida +3 só no NG++, e cada final pede o fim de um ciclo. Estas marcações não contam para os troféus.",
  "groups": [
    {
      "label": "Primeiro ciclo (NG)",
      "ids": [
        "plano-fragmentos",
        "plano-pactos-cedo",
        "plano-sirris",
        "plano-usurpacao",
        "plano-magias",
        "plano-aneis",
        "plano-final-1"
      ]
    },
    {
      "label": "Segundo ciclo (NG+)",
      "ids": [
        "plano-aneis-1",
        "plano-rosaria",
        "plano-gestos",
        "plano-pendencias",
        "plano-final-2"
      ]
    },
    {
      "label": "Terceiro ciclo (NG++)",
      "ids": [
        "plano-aneis-2",
        "plano-anel-vida-3",
        "plano-final-3"
      ]
    },
    {
      "label": "Qualquer ciclo",
      "ids": [
        "plano-reforco",
        "plano-infusao",
        "plano-pacto-farm",
        "plano-backup"
      ]
    }
  ],
  "items": [
    {
      "id": "plano-fragmentos",
      "name": "Pegar os 11 Fragmentos de Estus e os 10 de osso",
      "obs": "Nenhum é perdível e todos voltam no NG+, mas pegar cedo deixa o jogo mais fácil. Fecha Estus Definitivo e Fogueira Definitiva.",
      "done": false
    },
    {
      "id": "plano-pactos-cedo",
      "name": "Entrar nos pactos perdíveis assim que possível",
      "obs": "Criadores de Montes antes de derrotar a Grande Madeira Apodrecida; Vigilantes de Farron logo ao chegar ao pântano do Forte de Farron.",
      "perdivel": "Se perder, sobram para o NG+.",
      "done": false
    },
    {
      "id": "plano-sirris",
      "name": "Fazer a missão de Sirris",
      "obs": "Rende o Anel do gato prateado, o gesto Lealdade da Lua Negra e a entrada no pacto Lâmina da Lua Negra. Neste ciclo, não suba de nível no pacto de Rosaria com Língua Pálida.",
      "perdivel": "Oferecer Língua Pálida a Rosaria expulsa Sirris do Santuário.",
      "done": false
    },
    {
      "id": "plano-usurpacao",
      "name": "Seguir a missão de Yoel, Yuria e Anri",
      "obs": "É o caminho para A Usurpação do Fogo. Não cure o esvaziamento durante a missão.",
      "perdivel": "A missão é longa e pode falhar no meio.",
      "done": false
    },
    {
      "id": "plano-magias",
      "name": "Comprar as magias e entregar pergaminhos e tomos",
      "obs": "Orbeck, Cornyx, Irina e Karla (liberte-a no Calabouço de Irithyll). Karla é a única que ensina as piromancias de Quelana e do guardião de tumbas.",
      "done": false
    },
    {
      "id": "plano-aneis",
      "name": "Pegar os 70 anéis comuns",
      "obs": "Não venda nenhum anel: todos contam para o Mestre dos Anéis.",
      "done": false
    },
    {
      "id": "plano-final-1",
      "name": "Primeiro final",
      "obs": "Se a missão da Usurpação estiver completa, este é o ciclo dela. Caso contrário, Acender a Primeira Chama.",
      "done": false
    },
    {
      "id": "plano-aneis-1",
      "name": "Pegar as 20 versões +1 dos anéis",
      "ciclo": "NG+",
      "obs": "Ficam em lugares diferentes das versões comuns. Os locais estão na seção Mestre dos Anéis.",
      "done": false
    },
    {
      "id": "plano-rosaria",
      "name": "Subir o pacto de Rosaria e pegar o Reverência cortês",
      "ciclo": "NG+",
      "obs": "Ofereça uma Língua Pálida a Rosaria para o Anel obscurecedor e para o sinal de Heysel, o Dedo Amarelo no Forte de Farron, que dá o gesto Reverência cortês.",
      "done": false
    },
    {
      "id": "plano-gestos",
      "name": "Completar os gestos que dependem de NPCs",
      "ciclo": "NG+",
      "obs": "Confira na seção Mestre da Expressão os que ficaram para trás no primeiro ciclo.",
      "done": false
    },
    {
      "id": "plano-pendencias",
      "name": "Recuperar o que foi perdido no primeiro ciclo",
      "ciclo": "NG+",
      "obs": "Pactos, magias, anéis e gestos de NPCs voltam no NG+ com o mundo reiniciado.",
      "done": false
    },
    {
      "id": "plano-final-2",
      "name": "Segundo final",
      "ciclo": "NG+",
      "obs": "O Fim do Fogo: entregue os Olhos de Guardiã do Fogo (Túmulos Abandonados) à Guardiã do Fogo e invoque-a depois da Alma das Cinzas.",
      "done": false
    },
    {
      "id": "plano-aneis-2",
      "name": "Pegar as 16 versões +2 dos anéis",
      "ciclo": "NG++",
      "obs": "Os locais estão na seção Mestre dos Anéis.",
      "done": false
    },
    {
      "id": "plano-anel-vida-3",
      "name": "Pegar o Anel da vida +3",
      "ciclo": "NG++",
      "obs": "Atrás do trono central nos Túmulos Abandonados. Com ele, os 107 anéis fecham o Mestre dos Anéis.",
      "done": false
    },
    {
      "id": "plano-final-3",
      "name": "Terceiro final",
      "ciclo": "NG++",
      "obs": "O final que ainda faltar entre Acender a Primeira Chama, O Fim do Fogo e A Usurpação do Fogo.",
      "done": false
    },
    {
      "id": "plano-reforco",
      "name": "Juntar Placa de titanita ou Titanita Cintilante",
      "obs": "Para uma arma comum +10 ou rara +5 (Reforço de Arma Suprema).",
      "done": false
    },
    {
      "id": "plano-infusao",
      "name": "Juntar as 15 joias e as 4 hulhas",
      "obs": "As hulhas de Farron, de sábio, profanada e de gigante liberam as infusões com Andre.",
      "done": false
    },
    {
      "id": "plano-pacto-farm",
      "name": "Farmar os itens dos pactos",
      "obs": "Algumas magias e anéis são recompensas de nível de pacto. Dá para farmar offline; equipamentos de descoberta de itens aceleram.",
      "done": false
    },
    {
      "id": "plano-backup",
      "name": "Fazer backup do save antes da Alma das Cinzas",
      "obs": "Com uma cópia do save antes da luta final, dá para repetir o fim do ciclo se algo der errado.",
      "done": false
    }
  ]
};
