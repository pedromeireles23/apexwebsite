# Padrão visual dos retratos das Lendas

Atualizado em: 3 de setembro de 2026

Este documento registra a auditoria visual dos retratos, o padrão aprovado para as próximas substituições e o andamento da migração. O objetivo é permitir que o trabalho avance aos poucos sem perder as decisões já tomadas.

O plano separado para uniformizar altura, alinhamento com o cabeçalho, alinhamento óptico horizontal e responsividade está em [`docs/legend-size-normalization.md`](legend-size-normalization.md).

## Objetivo

Uniformizar a camada principal dos personagens sem remover a identidade dos backgrounds, cores, telemetria e animações de cada Lenda.

As referências de acabamento visual são Wraith, Newcastle e Gibraltar. A identidade de rosto, roupa, equipamento e proporções deve vir de material canônico da EA/Respawn e da skin padrão da Lenda.

## Diagnóstico

O projeto mistura pelo menos três famílias de imagens:

1. Retratos ilustrados com fundo embutido e tratamento exclusivo: Bangalore e Bloodhound pertenciam a esse grupo antes da sétima rodada; Alter e Ash pertenciam antes da sexta rodada.
2. Ilustrações 2D horizontais de baixa resolução efetiva: Ballistic, Catalyst, Caustic, Conduit, Crypto e Fuse.
3. Retratos verticais detalhados, mas nem sempre fiéis ao visual canônico: Horizon, Mirage, Rampart, Sparrow e parte do grupo restante.

Axle era um caso isolado: o retrato anterior tinha composição quase quadrada, pose aérea e tratamento 2D próprios. A oitava rodada substituiu esse recorte pelo mesmo padrão vertical 3D das demais Lendas migradas.

### Evidência de resolução

| Lenda | Tela do arquivo anterior | Área efetiva do personagem | Arquivo publicado anterior |
| --- | ---: | ---: | ---: |
| Conduit | 1120 × 630 | 444 × 616 px | 84 KB |
| Revenant | 1024 × 1536 | 996 × 1510 px | 368 KB |
| Seer | 1024 × 1536 | 640 × 1497 px | 278 KB |

Conduit possuía aproximadamente 2,4 vezes menos informação vertical no personagem do que Revenant e Seer. A diferença não estava no background, que tinha resolução suficiente, mas no recorte principal.

### Diferenças de implementação

- Alter e Ash possuem pôsteres próprios em `LegendShowcase.tsx`.
- Bangalore e Bloodhound possuem pôsteres próprios em `LateSpecialMotionPosters.tsx`.
- As demais Lendas passam principalmente por `ArchiveMotionPoster.tsx`.
- Existem compensações de largura, altura, máscara, filtro e posicionamento diferentes em `archive-motion.css`.
- No mobile, algumas caixas de retrato chegam a 154–166vw, enquanto o `sizes` informado anteriormente ao `next/image` era 100vw.
- Os PNGs mestres com transparência são convertidos para WebP em qualidade 92, mas o `next/image` voltava a processá-los na qualidade padrão 75.

## Padrão aprovado

Cada novo retrato deve seguir estes critérios:

- Skin padrão e aparência canônica da Lenda.
- Rosto, cabelo, roupa, silhueta e equipamentos reconhecíveis no jogo.
- Render vertical transparente em proporção aproximada de 2:3.
- Resolução ideal de 1536 × 2304 para o arquivo mestre; pilotos menores podem ser aceitos provisoriamente quando a informação efetiva superar claramente o asset anterior.
- Personagem ocupando aproximadamente 85–92% da altura.
- Corpo inteiro ou enquadramento amplo, sem cortar cabeça, mãos ou pés de forma acidental.
- Alinhamento óptico horizontal obrigatório após a normalização: o foco de rosto e tronco deve ser equilibrado com a área de conteúdo e com o respiro da borda direita, conforme `docs/legend-size-normalization.md`.
- Acabamento 3D detalhado semelhante ao grupo Wraith/Newcastle/Gibraltar.
- Luz cinematográfica controlada, sem transformar o personagem em uma pessoa real genérica.
- Sem texto, logotipo, moldura, fundo embutido ou marca-d'água.
- Fundo realmente transparente e bordas sem halo.
- Os efeitos e backgrounds específicos de cada Lenda podem continuar diferentes.

## Uso de geração ou edição assistida

Material gerado não deve reinventar o personagem. A ordem de prioridade é:

1. Usar render oficial da skin padrão quando estiver disponível com qualidade suficiente.
2. Recortar, limpar, ampliar ou recompor bordas de um render oficial preservando a identidade.
3. Gerar um novo render apenas com referências canônicas explícitas e verificação manual posterior.

Uma imagem tecnicamente nítida deve ser rejeitada se alterar o rosto, a idade aparente, a roupa, as cores principais ou os equipamentos característicos.

Referências usadas no piloto:

- [EA — Community Resources](https://www.ea.com/games/apex-legends/apex-legends/game-objects/community-resources-hub)
- [Apex Legends Wiki — render padrão da Conduit](https://apexlegends.wiki.gg/wiki/Special:Redirect/file/Original_Conduit.png)
- [Apex Legends Wiki — render padrão da Horizon](https://apexlegends.wiki.gg/wiki/Special:Redirect/file/Original_Horizon.png)
- [EA — Caustic](https://www.ea.com/games/apex-legends/apex-legends/characters-hub/caustic)
- [Apex Legends Wiki — render padrão do Caustic](https://apexlegends.wiki.gg/wiki/Special:Redirect/file/Original_Caustic.png)
- [EA — Mirage](https://www.ea.com/games/apex-legends/apex-legends/characters-hub/mirage)
- [Apex Legends Wiki — render padrão do Mirage](https://apexlegends.wiki.gg/wiki/Special:Redirect/file/Original_Mirage.png)
- [EA — Crypto](https://www.ea.com/games/apex-legends/apex-legends/characters-hub/crypto)
- [Apex Legends Wiki — render padrão do Crypto](https://apexlegends.wiki.gg/wiki/Special:Redirect/file/Original_Crypto.png)
- [EA — Rampart](https://www.ea.com/games/apex-legends/apex-legends/characters-hub/rampart)
- [Apex Legends Wiki — render padrão da Rampart](https://apexlegends.wiki.gg/wiki/Special:Redirect/file/Original_Rampart.png)
- [EA — Catalyst](https://www.ea.com/games/apex-legends/apex-legends/characters-hub/catalyst)
- [Apex Legends Wiki — render padrão da Catalyst](https://apexlegends.wiki.gg/wiki/Special:Redirect/file/Original_Catalyst.png)
- [EA — Sparrow](https://www.ea.com/pt-br/games/apex-legends/apex-legends/characters-hub/sparrow)
- [Apex Legends Wiki — render padrão do Sparrow](https://apexlegends.wiki.gg/wiki/Special:Redirect/file/Original_Sparrow.png)
- [EA — Fuse](https://www.ea.com/pt-br/games/apex-legends/apex-legends/characters-hub/fuse)
- [Apex Legends Wiki — render padrão do Fuse](https://apexlegends.wiki.gg/wiki/Special:Redirect/file/Original_Fuse.png)
- [EA — Ballistic](https://www.ea.com/games/apex-legends/apex-legends/characters-hub/ballistic)
- [Apex Legends Wiki — render padrão do Ballistic](https://apexlegends.wiki.gg/wiki/Special:Redirect/file/Original_Ballistic.png)
- [EA — Ash](https://www.ea.com/games/apex-legends/apex-legends/characters-hub/ash)
- [Apex Legends Wiki — render padrão da Ash](https://apexlegends.wiki.gg/wiki/Special:Redirect/file/Original_Ash.png)
- [EA — guia visual oficial da Alter](https://media.contentapi.ea.com/content/dam/apex-legends/common/cosplay-guide/pdf-asset/alter-v2.pdf)
- [Apex Legends Wiki — render padrão da Alter](https://apexlegends.wiki.gg/wiki/Special:Redirect/file/Original_Alter.png)
- [EA — Bangalore](https://www.ea.com/es/games/apex-legends/apex-legends/game-objects/characters-hub/game-object/bangalore)
- [Apex Legends Wiki — render padrão da Bangalore](https://apexlegends.wiki.gg/wiki/Special:Redirect/file/Original_Bangalore.png)
- [EA — Bloodhound](https://www.ea.com/games/apex-legends/apex-legends/characters-hub/bloodhound)
- [Apex Legends Wiki — render padrão de Bloodhound](https://apexlegends.wiki.gg/wiki/Special:Redirect/file/Original_Bloodhound.png)
- [EA — Axle](https://www.ea.com/games/apex-legends/apex-legends/characters-hub/axle)
- [EA — guia visual oficial da Axle](https://www.ea.com/games/apex-legends/apex-legends/community-resources-hub/axle-cosplay-guide)
- [Apex Legends Wiki — render padrão da Axle](https://apexlegends.wiki.gg/wiki/Special:Redirect/file/Original_Axle.png)

## Plano por grupo

### Substituição de fonte obrigatória

- [x] Alter — sexta rodada integrada; aguarda aprovação visual
- [x] Axle — oitava rodada integrada; aguarda aprovação visual
- [x] Ash — sexta rodada integrada; aguarda aprovação visual
- [x] Ballistic — quinta rodada integrada; aguarda aprovação visual
- [x] Bangalore — sétima rodada integrada; aguarda aprovação visual
- [x] Bloodhound — sétima rodada integrada; aguarda aprovação visual
- [x] Catalyst — quarta rodada integrada; aguarda aprovação visual
- [x] Caustic — segunda rodada integrada; aguarda aprovação visual
- [x] Conduit — piloto integrado e aprovado como referência inicial
- [x] Crypto — terceira rodada integrada; aguarda aprovação visual
- [x] Fuse — quinta rodada integrada; aguarda aprovação visual

### Correção de fidelidade canônica

- [x] Horizon — piloto integrado e aprovado como referência inicial
- [x] Mirage — segunda rodada integrada; aguarda aprovação visual
- [x] Rampart — terceira rodada integrada; aguarda aprovação visual
- [x] Sparrow — quarta rodada integrada; aguarda aprovação visual

### Grupo de referência e auditoria final

- [ ] Revisar Wraith, Newcastle e Gibraltar como referência de acabamento.
- [ ] Revisar as demais Lendas para pequenas correções de escala e enquadramento.

## Pilotos integrados

### Conduit

- Problema anterior: recorte 2D horizontal com apenas 616 px efetivos de altura.
- Mestre novo: `design-assets/motion-originals/conduit-portrait-v2.png`, 864 × 1821, com alfa.
- Publicação nova: `public/motion/conduit-portrait-v2.webp`, WebP 92 com alfa.
- Resultado: corpo inteiro, acabamento 3D, armadura verde-lima/azul/preta e equipamento circular preservado.
- Status: integrado e aprovado visualmente como referência inicial para as próximas substituições.

### Horizon

- Problema anterior: boa resolução, mas rosto rejuvenescido e acabamento distante da Dra. Mary Somers do jogo.
- Mestre novo: `design-assets/motion-originals/horizon-portrait-v3.png`, 925 × 1700, com alfa.
- Publicação nova: `public/motion/horizon-portrait-v3.webp`, WebP 92 com alfa.
- Resultado: corpo inteiro, cabelo ruivo curto/cacheado, goggles e traje espacial marfim/verde com detalhes vermelhos.
- Status: integrado e aprovado visualmente como referência inicial. A comparação com material canônico continua obrigatória nas próximas gerações para evitar rejuvenescimento ou alteração facial.

### Caustic

- Problema anterior: ilustração 2D horizontal de 1120 × 630, com apenas 595 × 556 px efetivos e sem o corpo inteiro.
- Referência canônica: render da skin padrão, com construção corporal larga, goggles verdes, respirador, avental amarelo, tubos, medidores, cilindro e mochila.
- Mestre novo: `design-assets/motion-originals/caustic-portrait-v2.png`, 1024 × 1536, com alfa.
- Publicação nova: `public/motion/caustic-portrait-v2.webp`, WebP 92 com alfa.
- Área efetiva nova: 595 × 1466 px; aproximadamente 2,6 vezes mais informação vertical que o retrato anterior.
- Status: integrado tecnicamente; aguarda aprovação visual no layout.

### Mirage

- Problema anterior: resolução suficiente, mas rosto, cabelo, cores e traje se afastavam da skin padrão; havia excesso de elementos verdes e dourados.
- Referência canônica: render da skin padrão de Elliott Witt, com cabelo curto, barba aparada, goggles laranja, scarf, traje amarelo acolchoado e emissores nos ombros e antebraços.
- Mestre novo: `design-assets/motion-originals/mirage-portrait-v3.png`, 862 × 1825, com alfa.
- Publicação nova: `public/motion/mirage-portrait-v3.webp`, WebP 92 com alfa.
- Área efetiva nova: 627 × 1600 px.
- Status: integrado tecnicamente; aguarda aprovação visual no layout.

### Crypto

- Problema anterior: ilustração 2D horizontal de 1120 × 630, com apenas 447 × 607 px efetivos e enquadramento cortado abaixo da cintura.
- Referência canônica: skin padrão de Tae Joon Park, com rosto e cabelo assimétrico reconhecíveis, marca facial azul-cinza, sobretudo tecnológico branco/cinza com forro e mangas verde-lima, traje de vigilância preto, módulos nas pernas e o drone Hack.
- Mestre novo: `design-assets/motion-originals/crypto-portrait-v2.png`, 1024 × 1536, com alfa.
- Publicação nova: `public/motion/crypto-portrait-v2.webp`, WebP 92 com alfa.
- Área efetiva nova: 578 × 1369 px; aproximadamente 2,25 vezes mais informação vertical que o retrato anterior.
- Status: integrado tecnicamente; aguarda aprovação visual no layout.

### Rampart

- Problema anterior: o arquivo já tinha 1024 × 1536, mas rosto, cabelo e proporções estavam glamourizados e distantes da aparência de Ramya Parekh no jogo.
- Referência canônica: skin padrão, com traços indianos, pintura facial azul, cabelo escuro assimétrico com detalhes azuis, macacão mecânico vermelho-laranja, painel teal, proteções cinzas, ferramentas, botas assimétricas e a Sheila.
- Mestre novo: `design-assets/motion-originals/rampart-portrait-v2.png`, 1024 × 1536, com alfa.
- Publicação nova: `public/motion/rampart-portrait-v2.webp`, WebP 92 com alfa.
- Área efetiva nova: 835 × 1333 px, incluindo a Sheila posicionada ao lado sem ocultar o corpo. Nesta substituição, o ganho principal é de fidelidade canônica, não de resolução nominal.
- Status: integrado tecnicamente; aguarda aprovação visual no layout.

### Catalyst

- Problema anterior: ilustração 2D horizontal de 1120 × 630, com apenas 544 × 616 px efetivos, corpo cortado abaixo das coxas e acabamento diferente do grupo de referência.
- Referência canônica: skin padrão de Tressa Crystal Smith, mulher adulta de pele clara, bob preto assimétrico com mecha azul, maquiagem escura e marcações faciais, gola alta preta com contorno teal, traje técnico preto/branco/cinza, gauntlets reforçados, conduítes flexíveis e ferrofluido.
- Mestre novo: `design-assets/motion-originals/catalyst-portrait-v2.png`, 1024 × 1536, com alfa.
- Publicação nova: `public/motion/catalyst-portrait-v2.webp`, WebP 92 com alfa.
- Área efetiva nova: 721 × 1397 px; aproximadamente 2,27 vezes mais informação vertical que o retrato anterior.
- Status: integrado tecnicamente; aguarda aprovação visual no layout.

### Sparrow

- Problema anterior: o arquivo tinha 1024 × 1536 e boa densidade, mas apresentava um arqueiro genérico mais velho, com roupa predominantemente preta/vermelha, cabelo, rosto, proporções e peças muito diferentes do Enea oficial.
- Referência canônica: skin padrão de Enea Davide Guarino, jovem de 20 anos, corpo esguio, rosto sem barba, cabelo castanho ondulado com mechas douradas, armadura assimétrica vermelha/branca/cinza, gola azul-marinho, calça técnica clara com seções vermelhas, joelheiras, botas com detalhes teal, arco, aljava e gato de orelhas grandes.
- Mestre novo: `design-assets/motion-originals/sparrow-portrait-v2.png`, 1024 × 1536, com alfa.
- Publicação nova: `public/motion/sparrow-portrait-v2.webp`, WebP 92 com alfa.
- Área efetiva nova: 674 × 1335 px, incluindo o arco. Nesta substituição, o ganho principal é de fidelidade canônica e coerência de acabamento.
- Status: integrado tecnicamente; aguarda aprovação visual no layout.

### Fuse

- Problema anterior: ilustração 2D horizontal de 1120 × 630, com apenas 634 × 590 px efetivos e corpo cortado abaixo dos joelhos.
- Referência canônica: skin padrão de Walter Fitzroy Jr., homem de 55 anos, corpo largo e musculoso, moicano escuro com laterais grisalhas, bigode ferradura, tapa-olho dourado, colete escuro/bordô, regata clara, bandoleiras, braço direito mecânico de latão, granadas, calça cinza, joelheiras bordô/douradas, botas, rifle 30-30 e lançador Megabomba.
- Mestre corrigido: `design-assets/motion-originals/fuse-portrait-v3.png`, 1024 × 1536, com alfa. A versão v2 foi preservada para comparação.
- Publicação corrigida: `public/motion/fuse-portrait-v3.webp`, WebP 92 com alfa.
- Área efetiva nova: 732 × 1354 px; aproximadamente 2,29 vezes mais informação vertical que o retrato anterior.
- Correção posterior: removidos somente 5.662 pixels claros de checkerboard presos entre o rifle, o braço mecânico e o tronco. Nenhum pixel abaixo do limiar de fundo foi apagado, preservando integralmente a borda do braço e da arma.
- Status: integrado tecnicamente; aguarda aprovação visual no layout.

### Ballistic

- Problema anterior: ilustração 2D horizontal de 1120 × 630, com apenas 594 × 573 px efetivos, pose de ação compacta e pernas cortadas pelo quadro.
- Referência canônica: skin padrão de August Montgomery Brinkman, homem de 63 anos, cabelo curto e barba grisalhos, bigode e cavanhaque aparados, óculos redondos vermelhos, sobretudo longo azul-marinho com forro ocre, mangas teal, placas brancas/cinzas, armadura de peito, calça técnica escura, proteção de canela, botas e pistola inteligente Whistler.
- Mestre novo: `design-assets/motion-originals/ballistic-portrait-v2.png`, 1024 × 1536, com alfa.
- Publicação nova: `public/motion/ballistic-portrait-v2.webp`, WebP 92 com alfa.
- Área efetiva nova: 502 × 1408 px; aproximadamente 2,46 vezes mais informação vertical que o retrato anterior.
- Status: integrado tecnicamente; aguarda aprovação visual no layout.

### Ash

- Problema anterior: ilustração 2D de 1800 × 2013 em JPEG, com fundo cinza embutido e linguagem visual diferente dos renders 3D usados como referência.
- Referência canônica: skin padrão da Dra. Ashleigh Reid, com rosto segmentado de simulacro, olhos âmbar, capuz teal, placas areia/marfim, articulações mecânicas expostas, tecido assimétrico, lâminas nos antebraços, atuadores circulares no quadril e espada de fase nas costas.
- Mestre novo: `design-assets/motion-originals/ash-portrait-v2.png`, 1024 × 1536, com alfa.
- Publicação nova: `public/motion/ash-portrait-v2.webp`, WebP 92 com alfa.
- Área efetiva nova: 521 × 1413 px. O ganho principal é de acabamento 3D, fidelidade canônica e separação real entre personagem e cenário, não de resolução nominal do canvas.
- Integração especial: somente as camadas `portrait` e `echo` de `AshMotionPoster` foram redirecionadas; key art, portal, atmosfera, partículas, retículo, telemetria e animações foram preservados. A máscara radial necessária para o JPEG foi removida e o recorte passou a usar `contain`, centro inferior.
- Status: integrado tecnicamente; aguarda aprovação visual no layout.

### Alter

- Problema anterior: ilustração 2D de 1800 × 2013 em JPEG, com fundo cinza embutido, pose muito inclinada e tratamento diferente do grupo de referência.
- Referência canônica: skin padrão de YingLing Lui, com cabelo curto teal/verde, pele clara, maquiagem preta angular, spikes metálicos nas têmporas, traje tático assimétrico preto/cinza/branco, detalhes magenta/cyan e cauda cibernética rosa segmentada com ponta tripla.
- Mestre novo: `design-assets/motion-originals/alter-portrait-v2.png`, 1024 × 1536, com alfa.
- Publicação nova: `public/motion/alter-portrait-v2.webp`, WebP 92 com alfa.
- Área efetiva nova: 662 × 1369 px, incluindo a cauda completa. O ganho principal é de acabamento 3D, fidelidade da skin e leitura limpa da silhueta.
- Integração especial: somente as camadas `portrait` e os dois `echo` de `AlterMotionPoster` foram redirecionados; key art, void, rifts, shards, sigilo, telemetria e animações foram preservados. A máscara radial foi removida e o recorte passou a usar `contain`, centro inferior.
- Status: integrado tecnicamente; aguarda aprovação visual no layout.

### Bangalore

- Problema anterior: ilustração 2D de 1800 × 2013 em JPEG, com fundo cinza embutido e tratamento diferente do acabamento 3D usado como referência.
- Referência canônica: skin padrão de Anita Williams, mulher negra adulta e atlética, cabelo curto cacheado em high-top com laterais raspadas, túnica militar rosa-salmão, armadura segmentada preta/cinza, canisters laranja, mochila lançadora de fumaça, calça envolta, joelheiras e rifle sobre o ombro.
- Mestre novo: `design-assets/motion-originals/bangalore-portrait-v2.png`, 1024 × 1536, com alfa.
- Publicação nova: `public/motion/bangalore-portrait-v2.webp`, WebP 92 com alfa.
- Área efetiva nova: 588 × 1335 px, com rifle, mochila, dois braços, pernas e botas completos.
- Integração especial: somente as camadas `portrait` e `echo` de `BangaloreMotionPoster` foram redirecionadas; key art, calor, fumaça, traçantes, clarão, alvo, telemetria e animações foram preservados. A máscara radial necessária ao JPEG foi removida e o recorte passou a usar `contain`, centro inferior.
- Status: integrado tecnicamente; aguarda aprovação visual no layout.

### Bloodhound

- Problema anterior: ilustração 2D de 1800 × 2013 em JPEG, com fundo cinza embutido e tratamento diferente dos renders 3D do grupo de referência.
- Referência canônica: skin padrão de Bloodhound, pessoa não binária de aparência andrógina e rosto totalmente coberto por goggles redondos e respirador vermelho, capacete verde-bronze com pena branca e adornos, manto de pele, casaco cáqui/oliva, placas verdes, tubos e luvas vermelhos, proteções amarelas e um corvo preto pousado no antebraço.
- Mestre novo: `design-assets/motion-originals/bloodhound-portrait-v2.png`, 1024 × 1536, com alfa.
- Publicação nova: `public/motion/bloodhound-portrait-v2.webp`, WebP 92 com alfa.
- Área efetiva nova: 699 × 1358 px, incluindo capacete, tubos, duas mãos, pernas, botas e o corvo completo.
- Integração especial: somente as camadas `portrait` e `echo` de `BloodhoundMotionPoster` foram redirecionadas; key art, névoa, pulso, brilho dos olhos, corvos em voo, partículas, sigilo, telemetria e animações foram preservados. A máscara radial foi removida e o recorte passou a usar `contain`, centro inferior.
- Status: integrado tecnicamente; aguarda aprovação visual no layout.

### Axle

- Problema anterior: ilustração 2D de 844 × 969, com pose aérea/diagonal, proporção quase quadrada e checkerboard incorporado em parte do recorte, destoando dos retratos verticais 3D.
- Referência canônica: skin padrão da Axle, mulher adulta atlética, cabelo preto assimétrico com detalhes vermelhos e laterais raspadas, cicatriz no rosto, placa metálica roxa no lado direito, traje de corrida preto/branco/roxo, ombreiras, booster traseiro, disco Nitro Gate e perna direita fortemente modificada.
- Mestre novo: `design-assets/motion-originals/axle-portrait-v2.png`, 1024 × 1536, com alfa.
- Publicação nova: `public/motion/axle-portrait-v2.webp`, WebP 92 com alfa.
- Área efetiva nova: 579 × 1420 px, com cabelo, ombreiras, booster, dois braços, disco, pernas e botas completos.
- Integração especial: somente o campo `portrait` de Axle em `ArchiveMotionPoster.tsx` foi redirecionado. O key art de Overclocked, wash, anéis, scan, partículas, retículo, telemetria e animações foram preservados; a máscara radial e a redução de escala exigidas pelo recorte anterior foram removidas. O novo retrato usa `contain`, centro inferior, caixa de 165vw no mobile e 68vw no desktop.
- Prompt completo: [`docs/prompts/axle-portrait-v2.md`](prompts/axle-portrait-v2.md).
- Status: integrado tecnicamente; aguarda aprovação visual no layout.

### Prompt de produção consolidado

```text
CONDUIT — Retrato vertical de corpo inteiro para hero de website, skin padrão e identidade canônica da Conduit/Rowenna, mulher filipina adulta, expressão confiante, armadura verde-lima, azul e preta e equipamento circular característico. Acabamento 3D cinematográfico detalhado semelhante aos retratos de Wraith, Newcastle e Gibraltar. Personagem ocupando 85–90% do quadro, sem cortes, texto, plataforma ou cenário; fundo transparente.

HORIZON — Retrato vertical de corpo inteiro para hero de website, skin padrão e identidade canônica da Dra. Mary Somers/Horizon, cientista escocesa madura, cabelo ruivo curto e cacheado, goggles e traje espacial marfim, verde e preto com detalhes vermelhos. Acabamento 3D cinematográfico detalhado semelhante aos retratos de Wraith, Newcastle e Gibraltar, sem glamourização ou rejuvenescimento. Personagem ocupando 85–90% do quadro, sem cortes, texto, plataforma ou cenário; fundo transparente.

CAUSTIC — Retrato vertical de corpo inteiro para hero de website, skin padrão e identidade canônica de Caustic/Alexander Nox, homem de meia-idade largo e pesado, cabelo escuro penteado para trás, goggles verdes, respirador fechado, avental técnico amarelo, traje químico preto, tubos e medidores metálicos, cilindro lateral, mochila e botas pesadas. Acabamento 3D cinematográfico detalhado semelhante aos retratos aprovados, sem expor boca ou nariz e sem redesenhar o equipamento. Personagem ocupando 87–91% do quadro, sem cortes, gás, texto, plataforma ou cenário; fundo transparente.

MIRAGE — Retrato vertical de corpo inteiro para hero de website, skin padrão e identidade canônica de Mirage/Elliott Witt, homem adulto de pele morena, cabelo castanho curto, barba aparada, goggles laranja na testa, scarf, traje amarelo acolchoado, harness preto/cinza e emissores holográficos nas posições corretas dos ombros e antebraços. Acabamento 3D cinematográfico detalhado semelhante aos retratos aprovados, sem glamourização, traje verde/dourado ou emissores extras. Personagem ocupando 87–91% do quadro, sem cortes, clones, texto, plataforma ou cenário; fundo transparente.

CRYPTO — Retrato vertical de corpo inteiro para hero de website, skin padrão e identidade canônica de Crypto/Tae Joon Park, homem coreano adulto de construção esguia, cabelo preto curto e assimétrico, expressão séria, marca facial azul-cinza, sobretudo tecnológico branco/cinza com forro e mangas verde-lima, traje de vigilância preto, módulos nas pernas e exatamente um drone Hack. Acabamento 3D cinematográfico detalhado semelhante aos retratos aprovados, sem barba, cabelo comprido, skin alternativa ou drones adicionais. Personagem e drone ocupando 87–91% do quadro, sem cortes, texto, plataforma ou cenário; fundo transparente.

RAMPART — Retrato vertical de corpo inteiro para hero de website, skin padrão e identidade canônica de Rampart/Ramya Parekh, jovem mulher indiana de pele morena, sorriso discreto, pintura facial azul e cabelo escuro assimétrico com detalhes azuis. Macacão mecânico vermelho-laranja, painel teal, gola e proteções cinzas, harness, ferramentas, joelheiras, botas assimétricas e exatamente uma Sheila vermelha, marfim e grafite posicionada verticalmente ao lado. Acabamento 3D cinematográfico detalhado semelhante aos retratos aprovados, sem glamourização, sexualização, rabo de cavalo longo ou arma cobrindo o corpo. Personagem e Sheila ocupando 86–90% do quadro, sem cortes, chiclete, texto, plataforma ou cenário; fundo transparente.

CATALYST — Retrato vertical de corpo inteiro para hero de website, skin padrão e identidade canônica de Catalyst/Tressa Crystal Smith, mulher adulta de pele clara, rosto maduro, bob preto assimétrico com mecha azul, maquiagem escura, batom preto e marcações faciais verticais. Gola alta preta com contorno teal, traje técnico preto/branco/cinza, ombros expostos, gauntlets reforçados, armadura segmentada, botas e dois conduítes flexíveis, com uma pequena esfera ou faixa controlada de ferrofluido. Acabamento 3D cinematográfico detalhado semelhante aos retratos aprovados, sem glamourização, cabelo comprido, roupa roxa ou traje de bruxa. Personagem e conduítes ocupando 87–91% do quadro, sem cortes, texto, plataforma ou cenário; fundo transparente.

SPARROW — Retrato vertical de corpo inteiro para hero de website, skin padrão e identidade canônica de Sparrow/Enea Davide Guarino, jovem arqueiro italiano de 20 anos, esguio, sem barba, cabelo castanho curto e ondulado com mechas douradas. Armadura assimétrica vermelha, branca e cinza, gola azul-marinho, gauntlets com pequenos detalhes cyan, calça técnica clara com seções vermelhas, joelheiras, botas cinza/teal, uma aljava, um arco tecnológico e um pequeno gato marrom de orelhas grandes no ombro. Acabamento 3D cinematográfico detalhado semelhante aos retratos aprovados, sem rosto de modelo mais velho, roupa urbana preta, tatuagens ou arma de fogo. Conjunto ocupando 86–90% do quadro, sem cortes, texto, plataforma ou cenário; fundo transparente.

FUSE — Retrato vertical de corpo inteiro para hero de website, skin padrão e identidade canônica de Fuse/Walter Fitzroy Jr., homem robusto de 55 anos, rosto castigado, moicano escuro com laterais grisalhas, bigode ferradura, pequeno soul patch, tapa-olho dourado e meio sorriso confiante. Colete escuro/bordô, regata clara, ombreira de latão, bandoleiras, cinto com caveira, braço direito mecânico dourado, granadas na coxa, calça cinza, joelheiras bordô/douradas, botas, um rifle 30-30 no ombro e o lançador Megabomba nas costas. Acabamento 3D cinematográfico detalhado semelhante aos retratos aprovados, sem rejuvenescimento, barba genérica, lado errado da prótese ou armas extras. Conjunto ocupando 86–90% do quadro, sem cortes, fogo, texto, plataforma ou cenário; fundo transparente.

CORREÇÃO DE ALFA DO FUSE — Alterar somente a máscara de fundo na abertura entre o rifle, o braço mecânico, o ombro e o tronco. Preservar rosto, corpo, pose, roupa, rifle, braço, mão, lançador, iluminação, cores, dimensões e posição; não redesenhar nem remover peças. A abertura deve ficar realmente transparente e sem halo.

BALLISTIC — Retrato vertical de corpo inteiro para hero de website, skin padrão e identidade canônica de Ballistic/August Montgomery Brinkman, cavalheiro atlético de 63 anos, rosto maduro, cabelo prateado curto, bigode e cavanhaque grisalhos e óculos redondos vermelhos sobre os dois olhos. Sobretudo longo azul-marinho com forro ocre, mangas teal, placas brancas/cinzas, armadura de peito, harness, calça técnica escura, caneleiras, botas e exatamente uma pistola Whistler apontada para baixo. Acabamento 3D cinematográfico detalhado semelhante aos retratos aprovados, sem monóculo, tapa-olho, rosto jovem, barba cheia, sobretudo laranja ou rifle. Personagem ocupando 87–91% do quadro, sem cortes, disparo, texto, plataforma ou cenário; fundo transparente.

ASH — Retrato vertical de corpo inteiro para hero de website, skin padrão e identidade canônica de Ash/Dra. Ashleigh Reid, simulacro feminino esguio, rosto robótico segmentado marfim com rachaduras finas, olhos âmbar, detalhe dourado no queixo, capuz e tecido teal, placas angulares areia/marfim, juntas e cabos pretos, atuadores circulares no quadril, tecido assimétrico nas pernas, lâminas canônicas nos antebraços e exatamente uma espada de fase embainhada nas costas. Acabamento 3D cinematográfico detalhado semelhante aos retratos aprovados, sem pele humana, cabelo humano, corpo volumoso, skin alternativa, armas duplicadas ou estilo vermelho de Revenant. Personagem ocupando 87–91% do quadro, com corpo e equipamento completos, sem texto, plataforma, cenário, portal ou partículas; fundo realmente transparente.

ALTER — Retrato vertical de corpo inteiro para hero de website, skin padrão e identidade canônica de Alter/YingLing Lui, mulher asiática esguia e atlética, cabelo curto teal/verde cobrindo parcialmente um olho, pele clara, olhos cyan, maquiagem preta angular, batom ameixa e dois spikes metálicos nas têmporas. Traje tático assimétrico preto/grafite/branco/cinza, placas de ombro angulares, detalhes magenta e cyan, luvas, calças assimétricas, botas pesadas e exatamente uma cauda cibernética rosa segmentada, completa, com ponta tripla. Acabamento 3D cinematográfico detalhado semelhante aos retratos aprovados, sem skin alternativa, cabelo preto genérico, orelhas élficas, cauda orgânica ou equipamentos duplicados. Conjunto ocupando 87–91% do quadro, sem cortes, texto, plataforma, cenário, shards ou portal; fundo realmente transparente.

BANGALORE — Retrato vertical de corpo inteiro para hero de website, skin padrão e identidade canônica de Bangalore/Anita Williams, mulher negra adulta e atlética, expressão firme, cabelo curto cacheado em high-top com laterais raspadas, túnica militar rosa-salmão, armadura segmentada preta/cinza, luvas, faixa no antebraço, canisters laranja, mochila lançadora de fumaça, calça envolta, joelheiras, botas e exatamente um rifle canônico sobre o ombro. Acabamento 3D cinematográfico detalhado semelhante aos retratos aprovados, sem skin alternativa, glamourização, pele clareada, cabelo comprido, armas ou canisters duplicados. Personagem e equipamento ocupando 88–90% do quadro, com corpo, rifle e mochila completos, sem fumaça, texto, plataforma ou cenário; fundo realmente transparente.

BLOODHOUND — Retrato vertical de corpo inteiro para hero de website, skin padrão e identidade canônica de Bloodhound, pessoa não binária de aparência andrógina e rosto completamente oculto por goggles redondos e respirador vermelho com tubos. Capacete verde-bronze com pena branca e adornos, manto de pele, casaco cáqui/oliva, placas verdes, bolsas, luvas e tubos vermelhos, proteções amarelas, calça envolta, botas e exatamente um corvo preto completo pousado no antebraço erguido. Acabamento 3D cinematográfico detalhado semelhante aos retratos aprovados, sem rosto exposto, máscara de caveira, bico de médico da peste, skin alternativa, arma, traje amarelo de Caustic ou aves adicionais. Personagem e corvo ocupando 88–90% do quadro, sem cortes, névoa, texto, plataforma ou cenário; fundo realmente transparente.

AXLE — Retrato vertical de corpo inteiro para hero de website, skin padrão e identidade canônica da Axle, mulher adulta atlética com cabelo preto assimétrico e detalhes vermelhos, laterais raspadas, cicatriz, placa metálica roxa no lado direito do rosto, traje de corrida preto/branco/roxo, ombreiras angulares, booster traseiro, exatamente um disco Nitro Gate e perna direita cibernética roxa/prateada. Acabamento 3D cinematográfico detalhado semelhante aos retratos aprovados, sem espelhar placa ou perna, sem skin alternativa, glamourização, armas ou discos duplicados. Personagem e equipamento ocupando 88–91% do quadro, com corpo inteiro e margens de segurança, sem salto, pose horizontal, texto, plataforma ou cenário; fundo realmente transparente.
```

O gerador entregou o checkerboard incorporado ao bitmap apesar do pedido de transparência. Para não redesenhar os personagens, o alfa foi extraído de forma determinística por `scripts/extract-generated-checkerboard.mjs`, preservando exatamente o render escolhido. Na segunda rodada, o script passou a exigir o padrão claro/escuro equilibrado antes de remover regiões internas; isso evita confundir peças brancas do traje com o checkerboard. Na quarta rodada, a tolerância de equilíbrio foi calibrada para reconhecer aberturas grandes e estreitas isoladas por equipamentos finos, como as cordas do arco, sem remover os painéis claros da roupa. Na revisão do Fuse, regiões internas grandes passaram a aceitar checkerboards desequilibrados, enquanto a limpeza de borda ficou restrita ao fundo conectado ao canvas para não erodir braços, armas ou outros equipamentos.

## Integração técnica do piloto

- Os novos arquivos são versionados e os anteriores foram preservados para comparação e rollback.
- Conduit, Horizon, Caustic, Mirage, Crypto, Rampart, Catalyst, Sparrow, Fuse, Ballistic, Gibraltar e Axle foram redirecionadas para retratos versionados em `ArchiveMotionPoster.tsx`. Ash e Alter foram redirecionadas nas camadas `portrait`/`echo` de seus pôsteres próprios em `LegendShowcase.tsx`; Bangalore e Bloodhound receberam a mesma substituição isolada em `LateSpecialMotionPosters.tsx`.
- As dezesseis usam `quality={90}`; o Next.js 16 permite as qualidades 75 e 90.
- O `sizes` padrão dos retratos atualizados ainda não normalizados informa 154vw no mobile, 82vw no tablet e 66vw no desktop. Os valores refletem as caixas reais do CSS.
- Alter informa 171vw/64vw, conforme sua caixa especial no mobile/desktop.
- Bangalore informa 168vw/61vw, conforme sua caixa especial no mobile/desktop.
- Axle informa 165vw/82vw/68vw no mobile/tablet/desktop, conforme sua caixa especial e a largura compartilhada no tablet.
- Conduit, Catalyst, Fuse, Ballistic, Ash, Alter, Bangalore, Bloodhound e Axle passaram a usar enquadramento vertical com `object-fit: contain` do grupo de referência.
- A primeira rodada de normalização de tamanho substituiu somente a composição geométrica de Ash, Rampart, Gibraltar e Bloodhound. As quatro agora usam a moldura compartilhada e o alinhamento óptico responsivo descritos em `docs/legend-size-normalization.md`, com largura derivada da altura útil da viewport; por isso os valores antigos de `sizes` dessas quatro não se aplicam mais.
- `node scripts/optimize-motion-assets.mjs --verify`: 68 referências e nenhum asset ausente.
- `npm.cmd run build`: compilação, TypeScript e 36 páginas estáticas concluídos com sucesso.

### Estado técnico que deve ser preservado

| Lenda | Mestre local | Arquivo publicado | Dimensões | Qualidade no Next.js | Enquadramento |
| --- | --- | --- | ---: | ---: | --- |
| Conduit | `conduit-portrait-v2.png` | `conduit-portrait-v2.webp` | 864 × 1821 | 90 | `contain`, centro inferior |
| Horizon | `horizon-portrait-v3.png` | `horizon-portrait-v3.webp` | 925 × 1700 | 90 | `contain`, centro inferior |
| Caustic | `caustic-portrait-v2.png` | `caustic-portrait-v2.webp` | 1024 × 1536 | 90 | `contain`, centro inferior |
| Mirage | `mirage-portrait-v3.png` | `mirage-portrait-v3.webp` | 862 × 1825 | 90 | `contain`, centro inferior |
| Crypto | `crypto-portrait-v2.png` | `crypto-portrait-v2.webp` | 1024 × 1536 | 90 | `contain`, centro inferior |
| Rampart | `rampart-portrait-v3.png` | `rampart-portrait-v3.webp` | 1024 × 1536 | 90 | moldura normalizada e alinhamento óptico responsivo; Sheila preservada |
| Catalyst | `catalyst-portrait-v2.png` | `catalyst-portrait-v2.webp` | 1024 × 1536 | 90 | `contain`, centro inferior |
| Sparrow | `sparrow-portrait-v2.png` | `sparrow-portrait-v2.webp` | 1024 × 1536 | 90 | `contain`, centro inferior |
| Fuse | `fuse-portrait-v3.png` | `fuse-portrait-v3.webp` | 1024 × 1536 | 90 | `contain`, centro inferior |
| Ballistic | `ballistic-portrait-v2.png` | `ballistic-portrait-v2.webp` | 1024 × 1536 | 90 | `contain`, centro inferior |
| Ash | `ash-portrait-v3.png` | `ash-portrait-v3.webp` | 1024 × 1536 | 90 | moldura normalizada e alinhamento óptico responsivo; pôster próprio preservado |
| Alter | `alter-portrait-v2.png` | `alter-portrait-v2.webp` | 1024 × 1536 | 90 | `contain`, centro inferior; pôster próprio e cauda completa preservados |
| Bangalore | `bangalore-portrait-v2.png` | `bangalore-portrait-v2.webp` | 1024 × 1536 | 90 | `contain`, centro inferior; pôster próprio e rifle completo preservados |
| Bloodhound | `bloodhound-portrait-v3.png` | `bloodhound-portrait-v3.webp` | 1024 × 1536 | 90 | moldura normalizada e alinhamento óptico responsivo; pôster próprio e corvo preservados |
| Gibraltar | `gibraltar-portrait-v2.png` | `gibraltar-portrait-v2.webp` | 1024 × 1536 | 90 | moldura normalizada e alinhamento óptico responsivo; corpo largo preservado |
| Axle | `axle-portrait-v2.png` | `axle-portrait-v2.webp` | 1024 × 1536 | 90 | `contain`, centro inferior; key art e efeitos preservados |

Os PNGs mestres ficam em `design-assets/motion-originals`, diretório ignorado pelo Git. Eles estão preservados localmente, mas precisam ser copiados em qualquer backup ou migração de máquina. Os WebPs de `public/motion` e o script de extração são versionáveis.

## Procedimento para as próximas Lendas

Aplicar esta sequência individualmente, sem substituir várias Lendas de uma só vez:

1. Auditar o retrato atual: dimensões do arquivo, área efetiva do personagem, transparência, compressão, proporção e regras de CSS aplicadas.
2. Reunir uma referência canônica da skin padrão e usar Wraith/Newcastle/Gibraltar somente como referência de acabamento.
3. Priorizar render oficial; usar geração assistida apenas quando não existir uma fonte adequada.
4. Produzir um retrato vertical de corpo inteiro, com pose legível, fundo transparente e ocupação de 85–92% da altura.
5. Comparar rosto, idade aparente, cabelo, roupa, cores, silhueta e equipamentos com a referência antes de integrar.
6. Se o gerador incorporar checkerboard, extrair o alfa com `scripts/extract-generated-checkerboard.mjs` e conferir o resultado sobre fundo claro e escuro.
7. Salvar o PNG mestre com um novo sufixo de versão em `design-assets/motion-originals`; nunca sobrescrever o anterior.
8. Gerar WebP versionado em `public/motion` com qualidade 92 e `alphaQuality: 100`.
9. Alterar somente o campo `portrait` da Lenda em `ArchiveMotionPoster.tsx` e manter portrait/echo apontando para a mesma fonte. Em pôsteres próprios, alterar apenas os `src` de portrait/echo no componente especial.
10. Para retratos transparentes verticais, partir de `object-fit: contain` e `object-position: center bottom`.
11. Normalizar a escala vertical e aplicar o alinhamento óptico horizontal por Lenda e por faixa de viewport. Medir o retângulo alfa, mas decidir o placement pelo foco de rosto/tronco, pela área protegida do conteúdo e pelo respiro da borda direita, seguindo `docs/legend-size-normalization.md`.
12. Usar qualidade 90 no `next/image` e informar em `sizes` a largura real definida pelo CSS.
13. Executar a verificação de assets e o build de produção.
14. Só marcar a Lenda como concluída depois da aprovação visual no layout.

### Critérios de comparação

- O ganho de nitidez deve ser avaliado no personagem, não apenas nas dimensões totais do arquivo.
- Fidelidade canônica tem prioridade sobre beleza, realismo ou detalhamento inventado.
- O acabamento deve ser uniforme, mas pose, silhueta, cores e equipamentos devem continuar próprios de cada Lenda.
- Backgrounds, telemetria, partículas e animações existentes devem ser preservados salvo quando houver um problema específico documentado.
- Exceções de CSS devem ser pequenas, justificadas pelo enquadramento e limitadas à Lenda correspondente.

## Checklist de aceite por retrato

- [ ] Identidade e skin conferidas visualmente com fonte canônica.
- [ ] Sem elementos inventados ou removidos.
- [x] Transparência real e bordas limpas.
- [x] Resolução e densidade superiores aos assets substituídos.
- [x] Enquadramento dos pilotos aprovado visualmente como referência inicial.
- [x] Contraste dos pilotos aprovado visualmente como referência inicial.
- [x] Sem artefatos visíveis de compressão no arquivo publicado.
- [x] Arquivo mestre e arquivo publicado preservados.
- [x] Build e verificação de assets concluídos.
- [ ] Alinhamento óptico aprovado em desktop amplo, tablet/desktop compacto e mobile.

## Registro de decisões

- 2026-09-02: auditoria inicial concluída.
- 2026-09-02: Wraith/Newcastle/Gibraltar definidos como referência de acabamento, não como fonte definitiva de identidade canônica.
- 2026-09-02: Conduit e Horizon escolhidas para o piloto por representarem, respectivamente, o problema de baixa resolução e o problema de baixa fidelidade ao jogo.
- 2026-09-02: pilotos gerados, recortados, versionados e integrados sem sobrescrever os retratos anteriores.
- 2026-09-02: resultado de Conduit e Horizon aprovado como referência inicial para continuar a migração nas outras Lendas.
- 2026-09-02: Caustic e Mirage escolhidos para a segunda rodada, cobrindo baixa resolução e baixa fidelidade canônica.
- 2026-09-02: novos retratos de Caustic e Mirage gerados, recortados, versionados e integrados; aguardam aprovação visual.
- 2026-09-02: Crypto e Rampart escolhidos para a terceira rodada, cobrindo respectivamente baixa resolução efetiva e baixa fidelidade canônica.
- 2026-09-02: novos retratos de Crypto e Rampart gerados com referências canônicas, recortados, versionados e integrados; aguardam aprovação visual.
- 2026-09-02: Catalyst e Sparrow escolhidos para a quarta rodada, cobrindo respectivamente baixa resolução efetiva e forte divergência da identidade oficial.
- 2026-09-02: novos retratos de Catalyst e Sparrow gerados com referências canônicas, recortados, versionados e integrados; aguardam aprovação visual.
- 2026-09-02: Fuse e Ballistic escolhidos para a quinta rodada por compartilharem imagens horizontais de baixa resolução efetiva e regras específicas de enquadramento.
- 2026-09-02: novos retratos de Fuse e Ballistic gerados com referências canônicas, recortados, versionados e integrados no padrão vertical; aguardam aprovação visual.
- 2026-09-02: fundo branco residual do Fuse identificado entre o rifle e o braço mecânico; a edição generativa de teste foi rejeitada por alterar a anatomia, e a v3 foi produzida a partir do render original com correção exclusiva de alfa.
- 2026-09-02: Ash e Alter escolhidas para a sexta rodada por compartilharem pôsteres próprios e retratos 2D em JPEG com fundo cinza embutido.
- 2026-09-02: novos retratos de Ash e Alter gerados no modo nativo `image_gen`, recortados, versionados e integrados somente nas camadas de personagem; backgrounds, efeitos e animações especiais foram preservados e aguardam aprovação visual.
- 2026-09-03: Bangalore e Bloodhound escolhidas para a sétima rodada por compartilharem pôsteres próprios e retratos 2D em JPEG com fundo cinza embutido.
- 2026-09-03: novos retratos de Bangalore e Bloodhound gerados no modo nativo `image_gen`, recortados, validados em fundos claro e escuro, versionados e integrados somente nas camadas de personagem; backgrounds, efeitos e animações especiais foram preservados e aguardam aprovação visual.
- 2026-09-03: Axle escolhida para a oitava rodada por ser a última substituição de fonte obrigatória e por usar uma ilustração 2D quase quadrada com pose aérea e tratamento próprio.
- 2026-09-03: novo retrato da Axle gerado no modo nativo `image_gen` com o guia visual oficial, recortado, validado em fundos claro e escuro, versionado e integrado somente no campo `portrait`; key art, efeitos e animações foram preservados e a lista de substituições obrigatórias ficou concluída, aguardando aprovação visual.
- 2026-09-03: alinhamento óptico horizontal incorporado ao padrão obrigatório de todos os retratos. A posição final deixa de usar apenas caixa CSS ou centro do canvas e passa a considerar massa visual, área de conteúdo, respiro à direita e cortes responsivos controlados.
- 2026-09-03: Ash, Bloodhound, Gibraltar e Rampart receberam a primeira implementação do alinhamento óptico obrigatório, com offsets registrados para desktop amplo, desktop de pouca altura, tablet/desktop compacto e mobile.
