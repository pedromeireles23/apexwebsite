# Normalização de tamanho das Lendas

Atualizado em: 3 de setembro de 2026

Este documento registra a auditoria de escala e alinhamento óptico dos 28 retratos, a solução técnica recomendada e a ordem de implementação em grupos de quatro Lendas. Ele complementa `docs/legend-portrait-standard.md`: aquele documento controla qualidade e fidelidade dos retratos; este controla tamanho visual, alinhamento óptico e posicionamento responsivo.

## Objetivo

Fazer todas as Lendas apresentarem a mesma altura visual, com a cabeça próxima ao limite inferior do cabeçalho sem ultrapassá-lo e com os pés próximos da base da viewport. Além da escala vertical, todas devem passar por alinhamento óptico horizontal para que o peso visual do personagem não fique colado à borda direita nem invada excessivamente a área de conteúdo. A largura natural, o tipo físico, a pose e os equipamentos de cada personagem devem continuar diferentes.

Backgrounds, cores, telemetria, partículas, animações temáticas e demais elementos dos pôsteres não fazem parte desta normalização.

## Auditoria visual inicial

As 28 Lendas foram comparadas nas mesmas condições em três viewports:

| Viewport auditada | Altura do cabeçalho | Distância atual entre silhueta e cabeçalho | Altura atualmente visível |
| --- | ---: | ---: | ---: |
| Desktop — 1440 × 900 | 104 px | −82 a +119 px | 677 a 788 px |
| Tablet — 768 × 1024 | 88 px | +124 a +426 px | 494 a 796 px |
| Mobile — 390 × 844 | 70 px | −50 a +116 px | 658 a 758 px |

Distâncias negativas indicam que a silhueta entrou na área do cabeçalho. A altura visível considera apenas a região entre o cabeçalho e o fim da viewport; portanto, ela também revela quando parte do personagem está fora da tela.

### Grupos observados

- Invadem o cabeçalho em pelo menos um dos viewports principais: Alter, Ash, Axle, Bangalore e Bloodhound.
- Aparecem menores ou excessivamente baixas em um ou mais breakpoints: Ballistic, Catalyst, Crypto, Fuse, Mirage, Octane, Rampart e Sparrow.
- Mantêm escala intermediária, mas possuem parte inferior fora da viewport: Caustic, Conduit, Gibraltar, Horizon, Lifeline, Loba, Mad Maggie, Newcastle, Pathfinder, Revenant, Seer, Valkyrie, Vantage, Wattson e Wraith.
- Em desktop e mobile, 23 das 28 Lendas possuem alguma parte da silhueta abaixo da viewport.
- Tablet é o breakpoint mais inconsistente: todas as Lendas começam mais de 120 px abaixo do cabeçalho, e a diferença de altura visível chega a aproximadamente 302 px.

## Causas confirmadas

1. Os arquivos possuem margens transparentes diferentes. Caixas CSS iguais não produzem personagens com o mesmo tamanho.
2. Os pôsteres usam vários valores de `top`, `height`, `width`, escala, máscara e posicionamento.
3. No tablet, o limite de largura baseado em `vw` reduz excessivamente retratos verticais em uma tela estreita e alta.
4. Posicionamento e animação compartilham `transform` em alguns pôsteres; o zoom da animação pode desfazer o alinhamento seguro.
5. Algumas silhuetas incluem rifle, arco, corvo, Sheila ou outros equipamentos. Usar apenas o retângulo alfa completo como medida pode reduzir o corpo do personagem indevidamente.

## Resultado visual desejado

### Regra vertical

- A moldura vertical começa em `var(--legend-header-height)` e termina na base da viewport.
- A cabeça deve ficar entre 8 e 20 px abaixo do cabeçalho.
- Os pés devem ficar entre 8 e 20 px acima da base.
- Nenhuma parte essencial da cabeça, rosto, mãos ou pés pode ser cortada.
- A altura do corpo, medida da cabeça ao pé mais baixo, deve variar no máximo 1,5% entre Lendas no mesmo viewport.
- Equipamentos externos devem permanecer completos sempre que possível, mas não serão usados sozinhos para determinar a escala do corpo.

Com retratos normalizados e aproximadamente 2% de margem interna superior e inferior, as alturas visuais de referência são:

| Viewport | Área disponível após o cabeçalho | Altura visual aproximada da Lenda |
| --- | ---: | ---: |
| 1440 × 900 | 796 px | 764 px |
| 768 × 1024 | 936 px | 899 px |
| 390 × 844 | 774 px | 743 px |

### Regra horizontal e alinhamento óptico

- A altura será compartilhada; personagens mais largos continuarão naturalmente mais largos.
- O deslocamento horizontal deve ser calibrado individualmente por Lenda e por faixa de viewport.
- Equipamentos característicos não devem ser cortados para forçar larguras idênticas.
- O enquadramento deve preservar a leitura do texto e dos cartões de habilidades em desktop, tablet e mobile.
- A caixa CSS e o centro do canvas não determinam sozinhos o placement. Margens transparentes, pose, direção do rosto, massa do tronco e equipamentos assimétricos alteram o centro visual percebido.
- O retângulo alfa deve ser usado como medida técnica inicial; o foco visual formado por rosto, cabeça e tronco deve definir a correção final.
- Portrait e echo devem compartilhar exatamente o mesmo placement para não criar duplicação ou deslocamento aparente durante a animação.

#### Alvo óptico por faixa de viewport

| Faixa | Alvo principal | Área de respiro e corte permitido |
| --- | --- | --- |
| Desktop amplo — 1200 px ou mais | Centro da massa visual aproximadamente entre 75% e 77% da largura da viewport | Buscar de 6 a 8vw entre a silhueta essencial e a borda direita; poses estreitas ou assimétricas podem exceder essa margem quando o centro visual continuar correto. |
| Tablet e desktop compacto — 768 a 1199 px | Manter a Lenda no terço direito sem comprimir a área de conteúdo | Preservar uma separação visual mínima entre a silhueta principal e o limite direito do conteúdo; reduzir o deslocamento para a esquerda quando ele causar conflito com o texto. |
| Mobile — até 767 px | Posicionar rosto e tronco preferencialmente entre 60% e 75% da largura | Priorizar rosto, mãos relevantes e leitura corporal; armas, escudos, aves, arcos e outros elementos periféricos podem receber corte lateral controlado quando forem mais largos que a viewport. |

Esses intervalos são guias de composição, não coordenadas cegas. O aceite depende da leitura conjunta do personagem, do background e do conteúdo em todos os viewports obrigatórios.

#### Área protegida do conteúdo

- Em desktop e tablet, calcular o limite direito ocupado pelo título, texto, protocolo de classe e cartões antes de mover o retrato para a esquerda.
- Manter uma separação visual preferencial de pelo menos 24 px entre o conteúdo e a parte essencial da silhueta quando ambos estiverem no mesmo plano de leitura.
- Em mobile, a sobreposição com o retrato faz parte da direção de arte, mas o gradiente deve preservar contraste suficiente e o foco facial não deve ficar diretamente atrás do título quando isso prejudicar sua leitura.
- O background pode continuar assimétrico; a regra se aplica à camada principal `portrait` e ao respectivo `echo`, não exige centralizar portal, key art, partículas ou telemetria.

## Implementação recomendada

### 1. Normalizar os assets sem redesenhar as Lendas

- Partir sempre dos PNGs mestres de `design-assets/motion-originals`.
- Preservar os arquivos atuais para comparação e rollback.
- Gerar uma nova versão normalizada em canvas vertical comum, preferencialmente 1024 × 1536.
- Usar cabeça e pés como âncoras principais do corpo.
- Reservar aproximadamente 2% de margem transparente no topo e na base.
- Considerar manualmente as exceções com equipamentos acima ou ao lado do corpo.
- Não usar geração de imagem nesta etapa; apenas escala uniforme, reposicionamento e composição sobre transparência.
- Publicar um novo WebP com qualidade 92 e `alphaQuality: 100`, sem recomprimir o WebP atual.

### 2. Criar uma moldura vertical compartilhada

- A moldura externa deve ocupar o espaço de `var(--legend-header-height)` até a base da viewport.
- Todos os retratos devem usar `object-fit: contain` e alinhamento inferior.
- Remover compensações verticais individuais depois que o asset correspondente estiver normalizado.
- Manter apenas uma variável horizontal por Lenda quando necessária.
- Alter, Ash, Bangalore e Bloodhound devem adotar a mesma área segura, mesmo preservando seus componentes de pôster próprios.

### 3. Aplicar o alinhamento óptico

- Medir o retângulo alfa em cada asset normalizado e registrar as margens transparentes laterais.
- Identificar manualmente o foco visual da pose: rosto/cabeça, eixo do tronco e direção para a qual a Lenda olha ou aponta.
- Comparar as quatro Lendas da rodada no mesmo viewport antes de definir offsets individuais.
- Usar três calibrações responsivas quando necessário: desktop amplo, tablet/desktop compacto e mobile.
- Registrar o deslocamento horizontal como variável por Lenda, evitando seletores que alterem novamente a escala ou o eixo vertical.
- Permitir uma correção final de até 2vw após a primeira captura comparativa. Correções maiores exigem nova conferência da área protegida do conteúdo.
- Considerar o alinhamento concluído somente quando o centro visual, o respiro à direita, a leitura do conteúdo e os cortes laterais estiverem aprovados conjuntamente.

### 4. Separar layout e animação

- A moldura externa controla posição e tamanho e não deve ser animada.
- Uma camada interna controla entrada, drift e echo.
- Limitar o zoom ocioso a aproximadamente `scale(1.01)` ou substituí-lo por deslocamento leve.
- A animação não pode mover a cabeça para dentro do cabeçalho nem empurrar os pés para fora da viewport.

### 5. Validar por dados e por imagem

- Gerar um relatório do retângulo alfa e das âncoras cabeça/pés de cada asset.
- Criar comparativos lado a lado antes e depois de cada rodada.
- Conferir as quatro Lendas da rodada juntas, e não apenas individualmente.
- Conferir o placement em uma matriz que mostre desktop, tablet e mobile lado a lado, registrando o centro visual aproximado, a distância à borda direita e qualquer corte lateral intencional.
- Só marcar uma rodada como concluída após aprovação visual nos breakpoints obrigatórios.

## Ordem das rodadas

Cada rodada contém quatro Lendas. A ordem começa pelos casos que representam os principais extremos e depois avança por famílias de implementação semelhantes.

### Rodada 1 — piloto de normalização e alinhamento óptico

- [x] Ash — normalização e alinhamento óptico integrados; aguarda aprovação visual.
- [x] Rampart — normalização e alinhamento óptico integrados com controle horizontal para a Sheila; aguarda aprovação visual.
- [x] Gibraltar — normalização e alinhamento óptico integrados com enquadramento próprio para o corpo largo; aguarda aprovação visual.
- [x] Bloodhound — normalização e alinhamento óptico integrados com deslocamento mobile que preserva o corvo; aguarda aprovação visual.

### Rodada 2 — extremos restantes

- [ ] Alter — invade o cabeçalho e possui cauda extensa.
- [ ] Axle — invade o cabeçalho e usa enquadramento próprio.
- [ ] Bangalore — invade o cabeçalho e possui rifle acima do ombro.
- [ ] Sparrow — atualmente pequena e baixa; arco e aljava ampliam a silhueta.

### Rodada 3 — retratos atualizados com comportamento baixo

- [ ] Ballistic
- [ ] Catalyst
- [ ] Crypto
- [ ] Fuse

### Rodada 4 — demais retratos atualizados

- [ ] Caustic
- [ ] Conduit
- [ ] Horizon
- [ ] Mirage

### Rodada 5 — proporções variadas

- [ ] Lifeline
- [ ] Loba
- [ ] Mad Maggie
- [ ] Newcastle

### Rodada 6 — poses e silhuetas especiais

- [ ] Octane
- [ ] Pathfinder
- [ ] Revenant
- [ ] Seer

### Rodada 7 — fechamento do grupo de referência

- [ ] Valkyrie
- [ ] Vantage
- [ ] Wattson
- [ ] Wraith

## Rodada 1 — resultado técnico

Os quatro retratos foram normalizados sem geração de imagem e sem sobrescrever os mestres anteriores. O comparativo de canvas está em [`docs/legend-size-normalization-round-1.webp`](legend-size-normalization-round-1.webp); a coluna da esquerda mostra os arquivos anteriores e a coluna da direita mostra as versões normalizadas, com as linhas tracejadas marcando a área segura de 2%.

| Lenda | Mestre anterior | Mestre normalizado | Altura alfa anterior | Altura alfa nova | Escala aplicada |
| --- | --- | --- | ---: | ---: | ---: |
| Ash | `ash-portrait-v2.png` | `ash-portrait-v3.png` | 1413 px | 1475 px | 1,043171× |
| Rampart | `rampart-portrait-v2.png` | `rampart-portrait-v3.png` | 1333 px | 1475 px | 1,105776× |
| Gibraltar | `gibraltar-portrait-clean.png` | `gibraltar-portrait-v2.png` | 1523 px | 1474 px | 0,967827× |
| Bloodhound | `bloodhound-portrait-v2.png` | `bloodhound-portrait-v3.png` | 1358 px | 1475 px | 1,085420× |

Os quatro arquivos publicados usam WebP 1024 × 1536, qualidade 92 e `alphaQuality: 100`. A variação de altura alfa dentro da rodada caiu para 1 px, aproximadamente 0,07%.

### Moldura compartilhada

- `.legend-portrait-frame` ocupa exatamente o espaço entre `var(--legend-header-height)` e a base da viewport, com proporção 2:3, `object-fit: contain` e alinhamento inferior.
- O posicionamento vertical não possui mais compensações individuais nessas quatro Lendas. Apenas o deslocamento horizontal varia por Lenda e por breakpoint quando necessário.
- A entrada e o drift passaram para a imagem interna. O zoom máximo é `scale(1.006)` e não altera a geometria da moldura externa.
- O `sizes` do `next/image` passou a refletir a largura derivada da altura útil da viewport, inclusive no desktop de pouca altura.
- Portrait e echo continuam apontando para a mesma versão normalizada. Backgrounds, portal, Sheila, corvo, telemetria, filtros e demais efeitos foram preservados.

### Medidas nos viewports obrigatórios

As medidas abaixo representam a moldura estática. Durante entrada e drift, a margem vertical mínima continua acima de 10 px.

| Viewport | Cabeça abaixo do cabeçalho | Pés acima da base | Altura visual | Variação entre as quatro |
| --- | ---: | ---: | ---: | ---: |
| 1920 × 1080 | 19,70 px | 19,06–19,70 px | 936,60–937,24 px | 0,07% |
| 1440 × 900 | 16,07 px | 15,55–16,07 px | 763,87–764,39 px | 0,07% |
| 1366 × 768 | 13,40 px | 12,97–13,40 px | 637,20–637,63 px | 0,07% |
| 1024 × 768 | 13,40 px | 12,97–13,40 px | 637,20–637,63 px | 0,07% |
| 768 × 1024 | 18,57 px | 17,97–18,57 px | 882,86–883,46 px | 0,07% |
| 390 × 844 | 15,62 px | 15,12–15,62 px | 742,76–743,26 px | 0,07% |
| 360 × 800 | 14,73 px | 14,26–14,73 px | 700,53–701,01 px | 0,07% |

No mobile, as silhuetas completas de Gibraltar e Rampart são mais largas que a viewport quando o corpo mantém a altura normalizada. O alinhamento óptico usa corte lateral controlado e assimétrico, preserva cabeça, mãos e pés e mantém o escudo e a Sheila reconhecíveis; nos demais breakpoints os equipamentos ficam completos.

### Auditoria de alinhamento óptico da Rodada 1

A normalização vertical não encerra o placement horizontal. Antes da correção óptica, a medição da borda alfa em 1440 × 900 mostrou que os quatro retratos possuíam pesos laterais diferentes mesmo usando a mesma moldura:

| Lenda | Distância atual da silhueta opaca à borda direita | Diagnóstico |
| --- | ---: | --- |
| Ash | aproximadamente 187 px | Já possui respiro suficiente no desktop; a pose e o background podem fazê-la parecer mais à direita do que sua geometria real. |
| Bloodhound | aproximadamente 89 px | Levemente apertada; admite correção pequena para a esquerda. |
| Gibraltar | aproximadamente 75 px | Apertado para o volume da armadura; admite correção moderada. |
| Rampart | aproximadamente 2 px | Sheila e a silhueta encostam visualmente na borda; é a principal correção da rodada. |

No mobile de 390 × 844, Ash conserva aproximadamente 56 px de respiro, Bloodhound encosta na borda e Gibraltar/Rampart excedem lateralmente a viewport. Como as duas últimas silhuetas são fisicamente mais largas que a tela na altura normalizada, o objetivo mobile é melhorar o foco de rosto e tronco e controlar o corte periférico, não exibir obrigatoriamente todo o retângulo alfa.

Após a calibração visual, os offsets foram integrados em três faixas responsivas. Valores maiores ou menos negativos de `right` movem a moldura para a esquerda:

| Lenda | Desktop amplo | Desktop amplo com até 800 px de altura | 768–1199 px | Mobile |
| --- | ---: | ---: | ---: | ---: |
| Ash | `5vw` | `6vw` | `4vw` | `-8vw` |
| Bloodhound | `6vw` | `8vw` | `5vw` | `-4vw` |
| Gibraltar | `6vw` | `8vw` | `5vw` | `-8vw` |
| Rampart | `7vw` | `9vw` | `4vw` | `-4vw` |

Em telas a partir de 1600 px, Ash também usa `6vw` para impedir que a mudança de proporção da viewport leve seu centro visual novamente para a direita.

#### Resultado nos sete viewports

| Viewport | Centro alfa no desktop | Respiro alfa à direita | Corte lateral controlado |
| --- | ---: | ---: | --- |
| 1920 × 1080 | 76,8–77,9% | 136,3–273,4 px | Nenhum |
| 1440 × 900 | 75,3–76,6% | 102,4–201,0 px | Nenhum |
| 1366 × 768 | 75,6–77,5% | 124,2–189,6 px | Nenhum |
| 1024 × 768 | 73,1–76,7% | 42,3–148,6 px | Nenhum |
| 768 × 1024 | não usado como alvo isolado | 32,5–179,9 px | Nenhum; composição verificada com o conteúdo sobreposto |
| 390 × 844 | não usado como alvo isolado | −14,1–94,3 px | Até 61,5 px à esquerda e 14,1 px à direita nas silhuetas largas |
| 360 × 800 | não usado como alvo isolado | −13,0–89,5 px | Até 66,2 px à esquerda e 13,0 px à direita nas silhuetas largas |

O centro alfa é apenas um indicador técnico e não substitui o foco óptico manual. Em tablet vertical e mobile, a largura da moldura supera uma parcela grande da viewport; por isso o aceite foi feito pela posição do rosto/tronco, pela legibilidade do conteúdo e pela preservação dos elementos essenciais.

### Verificação

- `npm.cmd run portraits:verify:round1`: quatro mestres e quatro WebPs presentes, dimensões e retângulos alfa conferidos.
- `npm.cmd run assets:verify`: 68 referências e nenhum asset ausente.
- `npm.cmd run lint`: concluído sem erros; permanece apenas o aviso preexistente de `<img>` em `app/opengraph-image.tsx`.
- `npm.cmd run build`: compilação, TypeScript e 36 páginas estáticas concluídos com sucesso.
- Aprovação visual do usuário continua pendente antes da Rodada 2.

## Viewports obrigatórios para aceite

- 1920 × 1080 — desktop amplo.
- 1440 × 900 — desktop de referência da auditoria.
- 1366 × 768 — desktop com pouca altura.
- 1024 × 768 — tablet horizontal ou notebook compacto.
- 768 × 1024 — tablet vertical.
- 390 × 844 — mobile de referência da auditoria.
- 360 × 800 — mobile estreito.

## Checklist por rodada

- [x] Quatro Lendas comparadas antes da alteração.
- [x] Assets normalizados e versionados sem sobrescrever os anteriores.
- [x] Cabeça entre 8 e 20 px abaixo do cabeçalho nos viewports de referência.
- [x] Variação de altura do corpo igual ou inferior a 1,5% dentro da rodada e em relação às rodadas aprovadas.
- [x] Pés visíveis e próximos da base.
- [x] Nenhum equipamento essencial cortado; no mobile, Gibraltar e Rampart usam corte lateral controlado sem perder a leitura dos equipamentos.
- [x] Texto e cartões continuam legíveis.
- [x] Backgrounds, efeitos, telemetria e identidade do pôster preservados.
- [x] Entrada, drift, echo e modo de movimento reduzido verificados.
- [x] `sizes` do `next/image` corresponde à nova caixa responsiva.
- [x] Verificação de assets, lint e build concluídos.
- [x] Alinhamento óptico conferido pela massa visual, e não apenas pelo centro do canvas ou pela caixa CSS.
- [x] Respiro à direita, área protegida do conteúdo e cortes laterais verificados tecnicamente nos três grupos de breakpoint.
- [x] Offsets finais de desktop amplo, tablet/desktop compacto e mobile registrados para cada Lenda.
- [ ] Resultado aprovado visualmente antes da próxima rodada.

## Registro de decisões

- 2026-09-03: auditoria visual concluída nas 28 Lendas em desktop, tablet e mobile.
- 2026-09-03: decidido normalizar primeiro o conteúdo dos assets e depois aplicar uma moldura vertical compartilhada, evitando 28 correções verticais independentes.
- 2026-09-03: altura do corpo, da cabeça aos pés, definida como referência principal; equipamentos externos serão tratados como margem e exceção de composição.
- 2026-09-03: implementação dividida em sete rodadas de quatro Lendas, começando por Ash, Rampart, Gibraltar e Bloodhound.
- 2026-09-03: Rodada 1 integrada com novos assets versionados, moldura vertical compartilhada, animação interna limitada e validação nos sete viewports obrigatórios; aguarda aprovação visual antes da Rodada 2.
- 2026-09-03: alinhamento óptico horizontal definido como etapa obrigatória para todas as 28 Lendas. O placement passa a considerar retângulo alfa, massa visual de rosto/tronco, respiro à direita, área protegida do conteúdo e cortes responsivos, com calibração própria para desktop amplo, tablet/desktop compacto e mobile.
- 2026-09-03: alinhamento óptico da Rodada 1 integrado e verificado. Ash, Bloodhound, Gibraltar e Rampart receberam offsets próprios por breakpoint e uma correção adicional para desktops de pouca altura; a aprovação visual do usuário permanece como último requisito antes da Rodada 2.
