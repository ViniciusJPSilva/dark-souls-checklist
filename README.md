# Dark Souls — Checklist de Conquistas (PT-BR)

Checklist das conquistas e troféus da série Dark Souls, com os nomes da tradução oficial em português, imagens e progresso salvo no navegador. Escolha o jogo nas abas do topo (ou pelo link `?jogo=ds1`, `?jogo=ds3`).

## Dark Souls Remastered (DS1)

- Os 41 troféus, com feitiços, piromancias, milagres e armas raras (imagem, custo, NPC, local, requisitos e observações)
- Etapas dos 10 troféus de reforço de armas, com braseiros e materiais calculados
- Guia de materiais de reforço: onde comprar e onde farmar cada titanita

## Dark Souls III (DS3)

- Os 43 troféus com nomes oficiais em PT-BR e selo **Perdível** com a condição
- Coleções com lista de itens: 34 feitiços, 27 piromancias, 35 milagres, 107 anéis (com versões +1/+2/+3), 33 gestos, 15 infusões, 11 Fragmentos de Estus e 10 de osso
- Filtros por ciclo (*Até NG / NG+ / NG++*) e *Só perdíveis*
- Plano de ciclos: o que fazer em cada um dos três ciclos
- **Roteiro**: linha do tempo por chefe, com o que pegar antes de cada luta, passos das missões de NPC e prazos. No celular abre pelo botão no canto inferior direito; no desktop fica ao lado da checklist

## Dark Souls II

Ainda não implementado. (Ps.: é o melhor souls.)

## Para todos os jogos

- Troféus de coleção e a platina são marcados automaticamente
- Termos, níveis e cor por plataforma: Steam (padrão), PlayStation ou Xbox, com Gamerscore
- Busca sem acentos, filtro *Todos / Pendentes / Feitos*, nomes em inglês opcionais
- Exportar/importar progresso por código (para levar a outro aparelho); cada jogo tem o próprio progresso
- Mobile first, sem build: HTML + CSS + JavaScript (ES modules)

## Rodar localmente

Como usa ES modules, abrir o `index.html` direto (`file://`) não funciona. Use um servidor estático:

```bash
npx serve .
# ou
python -m http.server 8000
```

## Testes

Testes de ponta a ponta com Playwright, usando o Google Chrome instalado. O comando sobe um servidor local sozinho:

```bash
npm install
npm test
```

- `npm test -- ds3 roteiro` roda só algumas suítes.
- `BASE_URL=https://… npm test -- jogos` roda contra um site já publicado.
- `CHROME_PATH=…` aponta para outro executável do navegador.
- As capturas de tela ficam em `tests/.out/`.

## Fontes e créditos

As fontes de cada dado estão em [FONTES.md](FONTES.md) (DS1) e [FONTES-DS3.md](FONTES-DS3.md) (DS3).

- **Nomes dos troféus:** lista oficial PT-BR (PSN/Xbox/Steam).
- **Nomes de magias, itens, áreas e NPCs:** tradução PT-BR do jogo, conferida com a [Estus](https://estus.com.br/wiki/dark-souls).
- **Dados e imagens:** [Fextralife](https://darksouls.wiki.fextralife.com), Steam e PSNProfiles.

Dark Souls é marca da FromSoftware/Bandai Namco; projeto de fã sem fins lucrativos.
