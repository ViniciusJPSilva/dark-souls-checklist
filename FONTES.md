# Fontes do reforço de armas

Consultadas em 15/11/2026. Os números de `js/data/caminhos.js` e as fontes de `js/data/materiais.js` vêm das páginas abaixo; cada caminho e material também guarda a própria URL no campo `fonte`.

## Caminhos (`js/data/caminhos.js`)

| Caminho | Fonte |
|---|---|
| Comum | https://darksouls.wiki.fextralife.com/Regular+Upgrades |
| Rústica | https://darksouls.wiki.fextralife.com/Raw+Upgrades |
| Cristalizada | https://darksouls.wiki.fextralife.com/Crystal+Upgrades |
| Elétrica | https://darksouls.wiki.fextralife.com/Lightning+Upgrades |
| Mágica | https://darksouls.wiki.fextralife.com/Magic+Upgrades |
| Encantada | https://darksouls.wiki.fextralife.com/Enchanted+Upgrades |
| Divina | https://darksouls.wiki.fextralife.com/Divine+Upgrades |
| Oculta | https://darksouls.wiki.fextralife.com/Occult+Upgrades |
| Ígnea | https://darksouls.wiki.fextralife.com/Fire+Upgrades |
| Caótica | https://darksouls.wiki.fextralife.com/Chaos+Upgrades |
| Visão geral e totais | https://darksouls.wiki.fextralife.com/Upgrades |

Todas as páginas dizem que o custo em almas varia conforme a arma, por isso aparece "Varia".

Pontos conferidos:
- Comum +11 a +14 usa 1, 1, 2, 3 pedaços (7 no total). A Fextralife traz essa sequência nível a nível e a página Upgrades confirma o total de 7.
- Cristalizada: 1 pedaço para a ascensão, depois 1, 1, 2, 3 e 1 placa.
- Elétrica: 1 pedaço para a ascensão, depois **1, 2, 2, 3** e 1 placa. A Fextralife dá números diferentes para a Elétrica e para a Cristalizada, embora as duas sejam feitas pelo mesmo ferreiro. Não achei uma segunda fonte com números por nível: a wiki do Fandom só diz "additional Titanite Chunks" e a Wikidot está fora do ar. O dado foi mantido como está na página.
- Mágica, Ígnea e Elétrica não precisam de braseiro para a ascensão: Rickert, Vamos e o Ferreiro gigante já fazem essas ascensões. Na Mágica e na Ígnea, o braseiro só é exigido no +6.
- Os totais da Caótica (9 fragmentos, 10 verdes, 8 vermelhos e 1 placa) batem com o resumo da Fextralife.

## Braseiros (`js/data/braseiros.js`)
- https://darksouls.wiki.fextralife.com/Embers (localização, ferreiro e o que cada braseiro libera)

## Materiais (`js/data/materiais.js`)

| Material | Fonte |
|---|---|
| Fragmento de titanita | https://darksouls.wiki.fextralife.com/Titanite+Shard |
| Fragmento grande de titanita | https://darksouls.wiki.fextralife.com/Large+Titanite+Shard |
| Pedaço de titanita | https://darksouls.wiki.fextralife.com/Titanite+Chunk |
| Placa de titanita | https://darksouls.wiki.fextralife.com/Titanite+Slab |
| Fragmento de titanita verde | https://darksouls.wiki.fextralife.com/Green+Titanite+Shard |
| Pedaço de titanita azul | https://darksouls.wiki.fextralife.com/Blue+Titanite+Chunk |
| Placa de titanita azul | https://darksouls.wiki.fextralife.com/Blue+Titanite+Slab |
| Pedaço de titanita vermelha | https://darksouls.wiki.fextralife.com/Red+Titanite+Chunk |
| Placa de titanita vermelha | https://darksouls.wiki.fextralife.com/Red+Titanite+Slab |
| Pedaço de titanita branca | https://darksouls.wiki.fextralife.com/White+Titanite+Chunk |
| Placa de titanita branca | https://darksouls.wiki.fextralife.com/White+Titanite+Slab |
| Titanita cintilante | https://darksouls.wiki.fextralife.com/Twinkling+Titanite |
| Titanita demoníaca | https://darksouls.wiki.fextralife.com/Demon+Titanite |
| Escama de dragão | https://darksouls.wiki.fextralife.com/Dragon+Scale |
| Rotas de farm | https://darksouls.wiki.fextralife.com/Titanite+Farming |

Fotos de inimigos: páginas da Fextralife de cada inimigo (Black+Knight, Crystal+Lizard, Slimes, Giant+Leech, Balder+Knight, Berenike+Knights, Darkwraith+Knight, Crystal+Golem, Moonlight+Butterfly, Chaos+Eater, Pinwheel+Servant, Bone+Tower, Titanite+Demon, Man-Eater+Shell, Drake, Burrowing+Rockworm, Undead+Soldier, Stray+Demon, Giant, Oolacile+Sorceress, Hydra, Undead+Dragon).

## Nomes em PT-BR e preços
- Materiais: https://estus.com.br/wiki/dark-souls/itens?tipo=Material+de+melhoria (confirma "Placa de titanita azul / branca / vermelha")
- Braseiros: https://estus.com.br/wiki/dark-souls/itens?tipo=Brasa
- Inimigos: https://estus.com.br/wiki/dark-souls/inimigos (e `?pagina=2`)
- Áreas: https://estus.com.br/wiki/dark-souls/areas
- Personagens: https://estus.com.br/wiki/dark-souls/personagens
- Chefes: https://estus.com.br/wiki/dark-souls/chefes
- Lojas dos ferreiros (preços 800 / 3.800 / 4.800 / 8.000): https://estus.com.br/wiki/dark-souls/guia/ferreiros
- Loja do Crestfallen Merchant (1.000 / 4.000 / 5.000): https://estus.com.br/wiki/dark-souls/guia/mercadores-e-servos
- Itens de troca (Entulho, Dedos ressecados, Medalha da Luz Solar, musgos, Pedra de prisma, Vermífugo de ovos): https://estus.com.br/wiki/dark-souls/itens

A Estus deixa sem tradução "Crestfallen Merchant" e "Snuggly the Crow", então esses nomes ficaram em inglês. As fogueiras do DS1 não têm nome oficial, por isso o campo `fogueira` descreve a fogueira mais próxima.
