export const materiais = [
  {
    "id": "titanita-fragmento",
    "name": "Fragmento de titanita",
    "en": "Titanite Shard",
    "img": "2/20/2090.png",
    "uso": "Reforça armas comuns de +0 a +5 (9 no total) e armaduras comuns até +3.",
    "fonte": "https://darksouls.wiki.fextralife.com/Titanite+Shard",
    "compra": [
      { "npc": "Andre de Astora", "local": "Paróquia dos Mortos-vivos", "preco": 800, "condicao": null },
      { "npc": "Vamos", "local": "Catacumbas", "preco": 800, "condicao": null },
      { "npc": "Ferreiro gigante", "local": "Anor Londo", "preco": 800, "condicao": null },
      { "npc": "Crestfallen Merchant", "local": "Fortaleza de Sen", "preco": 1000, "condicao": null },
      { "npc": "Gough Olhos de Falcão", "local": "Município de Oolacile", "preco": 800, "condicao": "DLC Artorias of the Abyss" }
    ],
    "obter": [
      { "tipo": "inimigo", "inimigo": "Cavaleiro de Balder", "inimigoEn": "Balder Knight", "inimigoImg": "e/ee/Balder_Knight_enemy_dark_soul.png", "local": "Fortaleza de Sen", "fogueira": "Fogueira do topo da Fortaleza de Sen", "chance": "21,6% (1) · 1,8% (2)", "obs": "Renascem. Na Paróquia dos Mortos-vivos a chance cai para 8%." },
      { "tipo": "inimigo", "inimigo": "Soldado Vazio", "inimigoEn": "Undead Soldier", "inimigoImg": "f/f1/Undead_soldier_spear_enemy_dark_soul.png", "local": "Burgo dos Mortos-vivos", "fogueira": "Fogueira do Burgo dos Mortos-vivos", "chance": "1,6%", "obs": "Também na Paróquia, no Santuário do Elo de Fogo e no Asilo (revisitado)." },
      { "tipo": "inimigo", "inimigo": "Cavaleiro de Berenike", "inimigoEn": "Berenike Knight", "inimigoImg": "thumb/b/b2/Boss_0004_The_Berenike_Knights.png/250px-Boss_0004_The_Berenike_Knights.png", "local": "Paróquia dos Mortos-vivos", "fogueira": "Fogueira da Paróquia dos Mortos-vivos", "chance": "Garantido (1)", "obs": "Esse cavaleiro não renasce." }
    ]
  },
  {
    "id": "titanita-fragmento-grande",
    "name": "Fragmento grande de titanita",
    "en": "Large Titanite Shard",
    "img": "8/81/2091.png",
    "uso": "Reforça armas comuns de +5 a +10 e armas rústicas até +5 (inclui a ascensão rústica). Exige o Grande braseiro com Andre.",
    "fonte": "https://darksouls.wiki.fextralife.com/Large+Titanite+Shard",
    "compra": [
      { "npc": "Crestfallen Merchant", "local": "Fortaleza de Sen", "preco": 4000, "condicao": null },
      { "npc": "Ferreiro gigante", "local": "Anor Londo", "preco": 3800, "condicao": null },
      { "npc": "Gough Olhos de Falcão", "local": "Município de Oolacile", "preco": 3800, "condicao": "DLC Artorias of the Abyss" }
    ],
    "obter": [
      { "tipo": "inimigo", "inimigo": "Cavaleiro de Berenike", "inimigoEn": "Berenike Knight", "inimigoImg": "thumb/b/b2/Boss_0004_The_Berenike_Knights.png/250px-Boss_0004_The_Berenike_Knights.png", "local": "Fortaleza de Sen (topo)", "fogueira": "Fogueira do topo da Fortaleza de Sen", "chance": "Muito alta", "obs": "Melhor farm: renasce ao descansar na fogueira do topo." },
      { "tipo": "inimigo", "inimigo": "Cavaleiro de Berenike", "inimigoEn": "Berenike Knight", "inimigoImg": "thumb/b/b2/Boss_0004_The_Berenike_Knights.png/250px-Boss_0004_The_Berenike_Knights.png", "local": "Mundo da Pintura de Ariamis", "fogueira": "Fogueira perto da ponte de Priscilla", "chance": "100%", "obs": "O cavaleiro que guarda o caminho até Priscilla." },
      { "tipo": "inimigo", "inimigo": "Sanguessuga gigante", "inimigoEn": "Giant Leech", "inimigoImg": "e/ea/Giant_leech_dsr_header2.png", "local": "Cidade das Moléstias (pântano)", "fogueira": "Fogueira do pântano / entrada do Grande Algar", "chance": "5,15%", "obs": "Renascem; ficam no lado esquerdo do pântano." },
      { "tipo": "inimigo", "inimigo": "Gosma", "inimigoEn": "Slime", "inimigoImg": "c/c5/Slime_enemy_dark_soul.png", "local": "Profundezas", "fogueira": "Fogueira das Profundezas", "chance": "2%", "obs": "No corredor diante da porta da fogueira; também soltam Fragmento de titanita verde." },
      { "tipo": "inimigo", "inimigo": "Lagarto de cristal", "inimigoEn": "Crystal Lizard", "inimigoImg": "d/d5/Crystal_lizard_enemy_dark_soul.png", "local": "Vários (Burgo, Catacumbas, Tumba dos Gigantes, Grande Algar, Caverna de Cristal…)", "fogueira": "Varia", "chance": "25%", "obs": "Não renascem." },
      { "tipo": "bau", "local": "Fortaleza de Sen", "fogueira": "Fogueira da Fortaleza de Sen", "obs": "2 num baú depois do primeiro Mago homem-serpente." },
      { "tipo": "corpo", "local": "Fortaleza de Sen", "fogueira": "Fogueira da Fortaleza de Sen", "obs": "2 num corpo atrás de um homem-serpente, antes da última ponte de pêndulos." },
      { "tipo": "corpo", "local": "Fortaleza de Sen", "fogueira": "Fogueira do topo da Fortaleza de Sen", "obs": "2 num corpo perto do topo." },
      { "tipo": "corpo", "local": "Profundezas", "fogueira": "Fogueira das Profundezas", "obs": "Atrás de um pilar acima da sala do chefe, na área do Canalizador." },
      { "tipo": "corpo", "local": "Cidade das Moléstias (pântano)", "fogueira": "Fogueira do pântano", "obs": "No ninho das sanguessugas, perto da entrada do Grande Algar; outro ao lado de Quelana, perto da roda-d'água." },
      { "tipo": "troca", "npc": "Frampt", "local": "Santuário do Elo de Fogo", "fogueira": "Fogueira do Santuário do Elo de Fogo", "obs": "Dê 1 Pedaço de titanita a Frampt para receber 3 Fragmentos grandes de titanita." }
    ]
  },
  {
    "id": "titanita-pedaco",
    "name": "Pedaço de titanita",
    "en": "Titanite Chunk",
    "img": "e/eb/2093.png",
    "uso": "Reforça armas comuns de +10 a +14 e faz a ascensão e o reforço das armas cristalizadas e elétricas até +4.",
    "fonte": "https://darksouls.wiki.fextralife.com/Titanite+Chunk",
    "compra": [],
    "obter": [
      { "tipo": "inimigo", "inimigo": "Cavaleiro negro", "inimigoEn": "Black Knight", "inimigoImg": "7/7d/Black_knight_enemy_dark_soul.png", "local": "Fornalha da Primeira Chama", "fogueira": "Fogueira da Fornalha da Primeira Chama", "chance": "100%", "obs": "O primeiro e o terceiro cavaleiros renascem e sempre soltam um pedaço. Os do Burgo e da Paróquia também soltam, mas não renascem." },
      { "tipo": "inimigo", "inimigo": "Aparição Negra", "inimigoEn": "Darkwraith", "inimigoImg": "f/fc/Darkwraith_knight_header3.png", "local": "Ruínas de Nova Londo (parte baixa)", "fogueira": "Fogueira da Depressão da Raiz Negra, via Vale dos Dragonetes", "chance": "Rara", "obs": "Renascem depois de drenar a água; também podem soltar Placa de titanita." },
      { "tipo": "inimigo", "inimigo": "Gigante", "inimigoEn": "Giant", "inimigoImg": "a/a1/Giant_enemy_dark_soul.png", "local": "Fortaleza de Sen", "fogueira": "Fogueira do topo da Fortaleza de Sen", "chance": "Garantido", "obs": "O gigante que abre o portão e o que joga bombas no topo. Não renascem." },
      { "tipo": "inimigo", "inimigo": "Lagarto de cristal", "inimigoEn": "Crystal Lizard", "inimigoImg": "d/d5/Crystal_lizard_enemy_dark_soul.png", "local": "Vários (Burgo, Catacumbas, Tumba dos Gigantes, Grande Algar, Caverna de Cristal…)", "fogueira": "Varia", "chance": "8,33% ou 41,67%", "obs": "Não renascem." },
      { "tipo": "corpo", "local": "Anor Londo", "fogueira": "Fogueira do Ferreiro gigante", "obs": "Na área em frente ao Ferreiro gigante." },
      { "tipo": "bau", "local": "Ruínas de Nova Londo", "fogueira": "Fogueira do Santuário do Elo de Fogo", "obs": "Num baú atrás de uma parede ilusória." },
      { "tipo": "troca", "npc": "Snuggly (corvo)", "local": "Asilo dos Mortos-vivos do Norte", "fogueira": "Fogueira do pátio do Asilo", "obs": "Deixe 1 Entulho no ninho para receber 1 Pedaço de titanita." }
    ]
  },
  {
    "id": "titanita-placa",
    "name": "Placa de titanita",
    "en": "Titanite Slab",
    "img": "0/01/2097.png",
    "uso": "Último reforço das armas comuns (+15), cristalizadas (+5) e elétricas (+5).",
    "fonte": "https://darksouls.wiki.fextralife.com/Titanite+Slab",
    "compra": [],
    "obter": [
      { "tipo": "inimigo", "inimigo": "Demônio Errante", "inimigoEn": "Stray Demon", "inimigoImg": "thumb/4/42/Boss_0017_Stray_Demon.png/250px-Boss_0017_Stray_Demon.png", "local": "Asilo dos Mortos-vivos do Norte (revisitado)", "fogueira": "Fogueira do pátio do Asilo", "chance": "Garantido", "obs": "Chefe; só uma vez por ciclo." },
      { "tipo": "inimigo", "inimigo": "Aparição Negra", "inimigoEn": "Darkwraith", "inimigoImg": "f/fc/Darkwraith_knight_header3.png", "local": "Ruínas de Nova Londo (parte baixa)", "fogueira": "Fogueira da Depressão da Raiz Negra, via Vale dos Dragonetes", "chance": "Muito rara", "obs": "Único farm repetível de placas." },
      { "tipo": "inimigo", "inimigo": "Lagarto de cristal", "inimigoEn": "Crystal Lizard", "inimigoImg": "d/d5/Crystal_lizard_enemy_dark_soul.png", "local": "Grande Algar", "fogueira": "Fogueira do Grande Algar", "chance": "Não garantida", "obs": "Matar os 10 lagartos costuma render ao menos uma placa. Não renascem." },
      { "tipo": "recompensa", "local": "Izalith Perdida", "fogueira": "—", "obs": "Recompensa ao concluir a história de Siegmeyer de Catarina." },
      { "tipo": "bau", "local": "Bosque Real", "fogueira": "Fogueira do Bosque Real", "obs": "DLC: baú atrás da cachoeira, na área do Dragão Negro Kalameet (não precisa derrotá-lo)." }
    ]
  },
  {
    "id": "titanita-fragmento-verde",
    "name": "Fragmento de titanita verde",
    "en": "Green Titanite Shard",
    "img": "d/dd/2092.png",
    "uso": "Ascensão de comum +5 para mágica, divina ou ígnea e reforço desses caminhos até +5 (10 por caminho).",
    "fonte": "https://darksouls.wiki.fextralife.com/Green+Titanite+Shard",
    "compra": [
      { "npc": "Crestfallen Merchant", "local": "Fortaleza de Sen", "preco": 5000, "condicao": null },
      { "npc": "Ferreiro gigante", "local": "Anor Londo", "preco": 4800, "condicao": null },
      { "npc": "Gough Olhos de Falcão", "local": "Município de Oolacile", "preco": 4800, "condicao": "DLC Artorias of the Abyss" }
    ],
    "obter": [
      { "tipo": "inimigo", "inimigo": "Verme de rocha", "inimigoEn": "Burrowing Rockworm", "inimigoImg": "4/4c/Burrowing_rockworm_dsr_header4.png", "local": "Ruínas do Demônio", "fogueira": "Fogueira das Ruínas do Demônio", "chance": "4,76% a 25,81%", "obs": "" },
      { "tipo": "inimigo", "inimigo": "Sanguessuga gigante", "inimigoEn": "Giant Leech", "inimigoImg": "e/ea/Giant_leech_dsr_header2.png", "local": "Cidade das Moléstias (pântano)", "fogueira": "Fogueira do pântano / entrada do Grande Algar", "chance": "2,06% (5 de uma vez)", "obs": "Renascem; ficam no lado esquerdo do pântano." },
      { "tipo": "inimigo", "inimigo": "Gosma", "inimigoEn": "Slime", "inimigoImg": "c/c5/Slime_enemy_dark_soul.png", "local": "Profundezas", "fogueira": "Fogueira das Profundezas", "chance": "2%", "obs": "Farm cedo: descanse, mate as gosmas do corredor e volte." },
      { "tipo": "inimigo", "inimigo": "Feiticeiro intumescido", "inimigoEn": "Oolacile Sorceress", "inimigoImg": "c/cb/Bloathead_sorcerer_abyss_guard_header1.png", "local": "Município de Oolacile", "fogueira": "Fogueira do Município de Oolacile", "chance": "1% a 5%", "obs": "DLC Artorias of the Abyss." },
      { "tipo": "corpo", "local": "Catacumbas", "fogueira": "Fogueira de Vamos", "obs": "Na última saliência antes da queda para a área de Vamos." },
      { "tipo": "corpo", "local": "Ruínas do Demônio", "fogueira": "Fogueira das Ruínas do Demônio", "obs": "À esquerda, sob a primeira grande escadaria com as quatro Estátuas demoníacas; outro dentro da arena do Demônio-centopéia." },
      { "tipo": "corpo", "local": "Izalith Perdida", "fogueira": "Fogueira de Izalith Perdida", "obs": "2 num corpo no esgoto venenoso, logo abaixo de onde Siegmeyer aparece." },
      { "tipo": "corpo", "local": "Ruínas de Nova Londo", "fogueira": "Fogueira do Santuário do Elo de Fogo", "obs": "Na saliência quebrada da torrezinha em frente à entrada do Abismo." },
      { "tipo": "corpo", "local": "Cidade das Moléstias (pântano)", "fogueira": "Fogueira do pântano", "obs": "Diante das duas sanguessugas, sob o galho que leva ao Grande Algar." },
      { "tipo": "troca", "npc": "Frampt", "local": "Santuário do Elo de Fogo", "fogueira": "Fogueira do Santuário do Elo de Fogo", "obs": "Dê pedaços de titanita azul, branca ou vermelha a Frampt em troca de fragmentos verdes." }
    ]
  },
  {
    "id": "titanita-pedaco-azul",
    "name": "Pedaço de titanita azul",
    "en": "Blue Titanite Chunk",
    "img": "1/19/2094.png",
    "uso": "Reforça armas mágicas de +5 a +9 e faz a ascensão e o reforço das armas encantadas até +4.",
    "fonte": "https://darksouls.wiki.fextralife.com/Blue+Titanite+Chunk",
    "compra": [],
    "obter": [
      { "tipo": "inimigo", "inimigo": "Golem de cristal", "inimigoEn": "Crystal Golem", "inimigoImg": "4/47/Crystal_golem_dsr_header1.png", "local": "Jardim da Biblioteca do Duque", "fogueira": "Fogueira da Biblioteca do Duque (prisão)", "chance": "8%", "obs": "Também na Depressão da Raiz Negra e na Caverna de Cristal. Rende 2 a 6 por volta com o anel da serpente dourada." },
      { "tipo": "inimigo", "inimigo": "Cavaleiro negro", "inimigoEn": "Black Knight", "inimigoImg": "7/7d/Black_knight_enemy_dark_soul.png", "local": "Fornalha da Primeira Chama", "fogueira": "Fogueira da Fornalha da Primeira Chama", "chance": "100%", "obs": "O último cavaleiro (alabarda). Renasce." },
      { "tipo": "inimigo", "inimigo": "Cavaleiro negro", "inimigoEn": "Black Knight", "inimigoImg": "7/7d/Black_knight_enemy_dark_soul.png", "local": "Depressão da Raiz Negra", "fogueira": "Fogueira da Depressão da Raiz Negra", "chance": "100%", "obs": "O cavaleiro da entrada da área. Não renasce." },
      { "tipo": "inimigo", "inimigo": "Borboleta da Luz Lunar", "inimigoEn": "Moonlight Butterfly", "inimigoImg": "3/39/Moonlight_butterfly_enemy_dark_soul-min.png", "local": "Caverna de Cristal", "fogueira": "Fogueira da Caverna de Cristal", "chance": "10%", "obs": "As borboletas comuns da caverna, não o chefe." },
      { "tipo": "corpo", "local": "Grande Algar", "fogueira": "Fogueira do Grande Algar", "obs": "2 pedaços em corpos ao longo da descida." },
      { "tipo": "troca", "npc": "Snuggly (corvo)", "local": "Asilo dos Mortos-vivos do Norte", "fogueira": "Fogueira do pátio do Asilo", "obs": "Deixe Dedos ressecados no ninho." }
    ]
  },
  {
    "id": "titanita-placa-azul",
    "name": "Placa de titanita azul",
    "en": "Blue Titanite Slab",
    "img": "d/d6/2098.png",
    "uso": "Último reforço das armas mágicas (+10) e encantadas (+5).",
    "fonte": "https://darksouls.wiki.fextralife.com/Blue+Titanite+Slab",
    "compra": [],
    "obter": [
      { "tipo": "corpo", "local": "Caverna de Cristal", "fogueira": "Fogueira da Caverna de Cristal", "obs": "No fim de um caminho invisível perto de um Lagarto de cristal: depois do cristal gigante com um golem, desça entre os dois cristais pequenos à direita e siga o caminho invisível (curva à direita e depois à esquerda)." },
      { "tipo": "inimigo", "inimigo": "Borboleta da Luz Lunar", "inimigoEn": "Moonlight Butterfly", "inimigoImg": "3/39/Moonlight_butterfly_enemy_dark_soul-min.png", "local": "Caverna de Cristal", "fogueira": "Fogueira da Caverna de Cristal", "chance": "0,2%", "obs": "Extremamente rara." },
      { "tipo": "bau", "local": "Bosque Real", "fogueira": "Fogueira do Bosque Real", "obs": "DLC: baú escondido no capim de um laguinho, guardado por Guardiões." }
    ]
  },
  {
    "id": "titanita-pedaco-vermelha",
    "name": "Pedaço de titanita vermelha",
    "en": "Red Titanite Chunk",
    "img": "8/85/2096.png",
    "uso": "Reforça armas ígneas de +5 a +9 e faz a ascensão e o reforço das armas caóticas até +4.",
    "fonte": "https://darksouls.wiki.fextralife.com/Red+Titanite+Chunk",
    "compra": [],
    "obter": [
      { "tipo": "inimigo", "inimigo": "Cavaleiro negro", "inimigoEn": "Black Knight", "inimigoImg": "7/7d/Black_knight_enemy_dark_soul.png", "local": "Fornalha da Primeira Chama", "fogueira": "Fogueira da Fornalha da Primeira Chama", "chance": "100%", "obs": "O cavaleiro de espada grande. Renasce." },
      { "tipo": "inimigo", "inimigo": "Devorador do Caos", "inimigoEn": "Chaos Eater", "inimigoImg": "thumb/0/07/Chaos_eater_enemy_dark_soul.png/200px-Chaos_eater_enemy_dark_soul.png", "local": "Izalith Perdida", "fogueira": "Fogueira de Izalith Perdida", "chance": "10%", "obs": "Ficam no fosso venenoso abaixo do piso desabado." },
      { "tipo": "inimigo", "inimigo": "Cavaleiro negro", "inimigoEn": "Black Knight", "inimigoImg": "7/7d/Black_knight_enemy_dark_soul.png", "local": "Asilo dos Mortos-vivos do Norte (revisitado)", "fogueira": "Fogueira do pátio do Asilo", "chance": "Garantido", "obs": "Os dois cavaleiros soltam um cada. Não renascem." },
      { "tipo": "inimigo", "inimigo": "Verme de rocha", "inimigoEn": "Burrowing Rockworm", "inimigoImg": "4/4c/Burrowing_rockworm_dsr_header4.png", "local": "Ruínas do Demônio", "fogueira": "Fogueira das Ruínas do Demônio", "chance": "5%", "obs": "Não dá para farmar." },
      { "tipo": "inimigo", "inimigo": "Inseto do caos", "inimigoEn": "Chaos Bug", "inimigoImg": "", "local": "Entre as Ruínas do Demônio e Izalith Perdida", "fogueira": "Fogueira das Ruínas do Demônio", "chance": "0,5%", "obs": "A Medalha da Luz Solar cai bem mais." },
      { "tipo": "corpo", "local": "Izalith Perdida", "fogueira": "Fogueira de Izalith Perdida", "obs": "Um num corpo no fosso venenoso, perto de Devoradores do Caos; outro ao subir a escada que sai do fosso." },
      { "tipo": "corpo", "local": "Grande Algar", "fogueira": "Fogueira do Grande Algar", "obs": "Um perto do topo e outro num galho pequeno logo acima dos sapos-arraia." },
      { "tipo": "troca", "npc": "Snuggly (corvo)", "local": "Asilo dos Mortos-vivos do Norte", "fogueira": "Fogueira do pátio do Asilo", "obs": "Deixe uma Chama piromântica +0 no ninho." }
    ]
  },
  {
    "id": "titanita-placa-vermelha",
    "name": "Placa de titanita vermelha",
    "en": "Red Titanite Slab",
    "img": "2/2b/2100.png",
    "uso": "Último reforço das armas ígneas (+10) e caóticas (+5).",
    "fonte": "https://darksouls.wiki.fextralife.com/Red+Titanite+Slab",
    "compra": [],
    "obter": [
      { "tipo": "bau", "local": "Izalith Perdida", "fogueira": "Fogueira de Izalith Perdida", "obs": "Num baú do labirinto de esgoto perto do Berço do Caos, ao lado de um grande fosso." },
      { "tipo": "inimigo", "inimigo": "Devorador do Caos", "inimigoEn": "Chaos Eater", "inimigoImg": "thumb/0/07/Chaos_eater_enemy_dark_soul.png/200px-Chaos_eater_enemy_dark_soul.png", "local": "Izalith Perdida", "fogueira": "Fogueira de Izalith Perdida", "chance": "0,3%", "obs": "" },
      { "tipo": "troca", "npc": "Snuggly (corvo)", "local": "Asilo dos Mortos-vivos do Norte", "fogueira": "Fogueira do pátio do Asilo", "obs": "Deixe a versão ascendida da Chama piromântica, ainda em +0." }
    ]
  },
  {
    "id": "titanita-pedaco-branca",
    "name": "Pedaço de titanita branca",
    "en": "White Titanite Chunk",
    "img": "c/c0/2095.png",
    "uso": "Reforça armas divinas de +5 a +9 e faz a ascensão e o reforço das armas ocultas até +4.",
    "fonte": "https://darksouls.wiki.fextralife.com/White+Titanite+Chunk",
    "compra": [],
    "obter": [
      { "tipo": "inimigo", "inimigo": "Cavaleiro negro", "inimigoEn": "Black Knight", "inimigoImg": "7/7d/Black_knight_enemy_dark_soul.png", "local": "Fornalha da Primeira Chama", "fogueira": "Fogueira da Fornalha da Primeira Chama", "chance": "100%", "obs": "O cavaleiro de machado. Renasce. Os de Burgo, Paróquia, Depressão, Catacumbas, Asilo e Tumba também soltam, sem renascer." },
      { "tipo": "inimigo", "inimigo": "Torre de ossos", "inimigoEn": "Bone Tower", "inimigoImg": "8/88/Bone_tower_dsr_header1.png", "local": "Tumba dos Gigantes", "fogueira": "Fogueira da Tumba dos Gigantes", "chance": "5%", "obs": "" },
      { "tipo": "inimigo", "inimigo": "Servo do Catavento", "inimigoEn": "Pinwheel Servant", "inimigoImg": "5/5b/Pinwheel_servant_enemy_dark_soul.png", "local": "Tumba dos Gigantes", "fogueira": "Fogueira da Tumba dos Gigantes", "chance": "0,3% ou 10%", "obs": "Na área dos bebês esqueleto." },
      { "tipo": "inimigo", "inimigo": "Devorador do Caos", "inimigoEn": "Chaos Eater", "inimigoImg": "thumb/0/07/Chaos_eater_enemy_dark_soul.png/200px-Chaos_eater_enemy_dark_soul.png", "local": "Izalith Perdida", "fogueira": "Fogueira de Izalith Perdida", "chance": "0,2%", "obs": "" },
      { "tipo": "corpo", "local": "Tumba dos Gigantes", "fogueira": "Fogueira da Tumba dos Gigantes", "obs": "Há pedaços em corpos ao longo da área." },
      { "tipo": "troca", "npc": "Snuggly (corvo)", "local": "Asilo dos Mortos-vivos do Norte", "fogueira": "Fogueira do pátio do Asilo", "obs": "Deixe uma Medalha da Luz Solar no ninho." }
    ]
  },
  {
    "id": "titanita-placa-branca",
    "name": "Placa de titanita branca",
    "en": "White Titanite Slab",
    "img": "c/ce/2099.png",
    "uso": "Último reforço das armas divinas (+10) e ocultas (+5).",
    "fonte": "https://darksouls.wiki.fextralife.com/White+Titanite+Slab",
    "compra": [],
    "obter": [
      { "tipo": "corpo", "local": "Tumba dos Gigantes", "fogueira": "Fogueira da Tumba dos Gigantes", "obs": "Numa caverna estreita antes da névoa de Nito: de frente para a entrada da luta, desça pela esquerda." },
      { "tipo": "inimigo", "inimigo": "Servo do Catavento", "inimigoEn": "Pinwheel Servant", "inimigoImg": "5/5b/Pinwheel_servant_enemy_dark_soul.png", "local": "Tumba dos Gigantes", "fogueira": "Fogueira da Tumba dos Gigantes", "chance": "0,2%", "obs": "Os servos perto da névoa de Nito." },
      { "tipo": "corpo", "local": "Voragem do Abismo", "fogueira": "Fogueira da Voragem do Abismo", "obs": "DLC: na última rampa até a névoa de Manus, saia pela direita; o corpo fica no fim, guardado por dois Fantasmas de Humanidade." }
    ]
  },
  {
    "id": "titanita-cintilante",
    "name": "Titanita cintilante",
    "en": "Twinkling Titanite",
    "img": "2/27/2123.png",
    "uso": "Reforça até +5 as armas que não podem ser reforçadas normalmente (ex.: Espada grande de cavaleiro negro) e armaduras raras. Não entra em nenhum troféu de reforço.",
    "fonte": "https://darksouls.wiki.fextralife.com/Twinkling+Titanite",
    "compra": [
      { "npc": "Ferreiro gigante", "local": "Anor Londo", "preco": 8000, "condicao": null }
    ],
    "obter": [
      { "tipo": "inimigo", "inimigo": "Amêijoa gigante", "inimigoEn": "Man-Eater Shell", "inimigoImg": "4/4e/Man-eater_shell_enemy_dark_soul.png", "local": "Lago das Cinzas", "fogueira": "Primeira fogueira do Lago das Cinzas", "chance": "30%", "obs": "Mate as duas primeiras e use Osso do regresso para renascê-las." },
      { "tipo": "inimigo", "inimigo": "Amêijoa gigante", "inimigoEn": "Man-Eater Shell", "inimigoImg": "4/4e/Man-eater_shell_enemy_dark_soul.png", "local": "Caverna de Cristal", "fogueira": "Fogueira da Caverna de Cristal", "chance": "20%", "obs": "A fogueira abre depois de derrotar Seath; dá para viajar até ela." },
      { "tipo": "inimigo", "inimigo": "Lagarto de cristal", "inimigoEn": "Crystal Lizard", "inimigoImg": "d/d5/Crystal_lizard_enemy_dark_soul.png", "local": "Vários (Burgo, Catacumbas, Tumba dos Gigantes, Grande Algar, Caverna de Cristal…)", "fogueira": "Varia", "chance": "Garantido", "obs": "Não renascem." },
      { "tipo": "troca", "npc": "Snuggly (corvo)", "local": "Asilo dos Mortos-vivos do Norte", "fogueira": "Fogueira do pátio do Asilo", "obs": "1 por Musgo roxo, 1 por Musgo sangrento, 2 por Musgo roxo florescente." }
    ]
  },
  {
    "id": "titanita-demoniaca",
    "name": "Titanita demoníaca",
    "en": "Demon Titanite",
    "img": "c/cd/2036.png",
    "uso": "Reforça armas criadas com almas de chefe (até +5). Não entra em nenhum troféu de reforço.",
    "fonte": "https://darksouls.wiki.fextralife.com/Demon+Titanite",
    "compra": [],
    "obter": [
      { "tipo": "inimigo", "inimigo": "Demônio de titanita", "inimigoEn": "Titanite Demon", "inimigoImg": "thumb/c/cd/Titanite_demon.png/250px-Titanite_demon.png", "local": "Izalith Perdida", "fogueira": "Fogueira do elevador das Ruínas do Demônio", "chance": "Garantido (2)", "obs": "O único que renasce: fica na ponte de Izalith Perdida." },
      { "tipo": "inimigo", "inimigo": "Demônio de titanita", "inimigoEn": "Titanite Demon", "inimigoImg": "thumb/c/cd/Titanite_demon.png/250px-Titanite_demon.png", "local": "Anor Londo", "fogueira": "Fogueira de Anor Londo", "chance": "Garantido (2)", "obs": "Não renasce. Os demais (como o perto de Andre, na Paróquia) soltam 1." },
      { "tipo": "bau", "local": "Anor Londo", "fogueira": "Fogueira de Anor Londo", "obs": "1 no primeiro baú guardado por duas Sentinelas; 1 no baú escondido atrás da primeira torre do elevador; 2 no baú do quarto guardado por três Cavaleiros prateados." },
      { "tipo": "troca", "npc": "Snuggly (corvo)", "local": "Asilo dos Mortos-vivos do Norte", "fogueira": "Fogueira do pátio do Asilo", "obs": "1 por Pedra de prisma." }
    ]
  },
  {
    "id": "escama-de-dragao",
    "name": "Escama de dragão",
    "en": "Dragon Scale",
    "img": "b/b5/2111.png",
    "uso": "Reforça armas de dragão (ex.: Espada grande da luz lunar, Dente de dragão) e sobe de nível no pacto Caminho do Dragão. Não entra em nenhum troféu de reforço.",
    "fonte": "https://darksouls.wiki.fextralife.com/Dragon+Scale",
    "compra": [],
    "obter": [
      { "tipo": "inimigo", "inimigo": "Draco azul", "inimigoEn": "Drake", "inimigoImg": "e/ed/Drake_dsr_header1.png", "local": "Vale dos Dragonetes", "fogueira": "Fogueira da Depressão da Raiz Negra", "chance": "5%", "obs": "" },
      { "tipo": "inimigo", "inimigo": "Dragão morto-vivo", "inimigoEn": "Undead Dragon", "inimigoImg": "thumb/0/05/Zombiedragon.png/285px-Zombiedragon.png", "local": "Vale dos Dragonetes", "fogueira": "Fogueira da Depressão da Raiz Negra", "chance": "Garantido (1)", "obs": "Não renasce. O do Mundo da Pintura de Ariamis também solta 1." },
      { "tipo": "inimigo", "inimigo": "Hidra", "inimigoEn": "Hydra", "inimigoImg": "thumb/1/14/Boss_0014_Hydra.png/250px-Boss_0014_Hydra.png", "local": "Depressão da Raiz Negra", "fogueira": "Fogueira da Depressão da Raiz Negra", "chance": "Garantido (1)", "obs": "Não renasce. A hidra do Lago das Cinzas solta 2." },
      { "tipo": "bau", "local": "Cidade das Moléstias", "fogueira": "Segunda fogueira da Cidade das Moléstias", "obs": "No baú perto da fogueira." },
      { "tipo": "corpo", "local": "Lago das Cinzas", "fogueira": "Fogueira do Lago das Cinzas", "obs": "Um à esquerda da hidra, um num corpo flutuante depois das amêijoas e um dentro da árvore oca na praia." },
      { "tipo": "troca", "npc": "Snuggly (corvo)", "local": "Asilo dos Mortos-vivos do Norte", "fogueira": "Fogueira do pátio do Asilo", "obs": "1 por Vermífugo de ovos." }
    ]
  }
];
