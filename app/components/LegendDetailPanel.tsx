"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import "./legend-detail.css";

type LegendAbility = {
  type: string;
  name: string;
  description: string;
  icon: string;
  code: string;
};

type LegendClassProtocol = {
  code: string;
  name: string;
  summary: string;
  description: string;
  icon: string;
  perks: ReadonlyArray<string>;
};

type LegendDetailData = {
  slug:
    | "alter"
    | "ash"
    | "axle"
    | "ballistic"
    | "bangalore"
    | "bloodhound"
    | "catalyst"
    | "caustic"
    | "conduit"
    | "crypto"
    | "fuse"
    | "gibraltar"
    | "horizon"
    | "lifeline"
    | "loba"
    | "mad-maggie"
    | "mirage"
    | "newcastle"
    | "octane"
    | "pathfinder"
    | "rampart"
    | "revenant"
    | "seer"
    | "sparrow"
    | "valkyrie"
    | "vantage"
    | "wattson"
    | "wraith";
  listIndex: number;
  classification: string;
  name: string;
  role: string;
  classIcon: string;
  age: string;
  tagline: string;
  story: string;
  extraStory: string;
  metadata: ReadonlyArray<{ label: string; value: string }>;
  classProtocol?: LegendClassProtocol;
  abilities: ReadonlyArray<LegendAbility>;
  accent: string;
  accentRgb: string;
};

const legendDetails: Record<LegendDetailData["slug"], LegendDetailData> = {
  alter: {
    slug: "alter",
    listIndex: 0,
    classification: "01 // TRANSDIMENSIONAL",
    name: "Alter",
    role: "Combate",
    classIcon: "/classes/skirmisher.svg",
    age: "Idade desconhecida",
    tagline: "Invasora do Vazio.",
    story:
      "Alter surgiu de outra dimensão com tecnologia interdimensional do Vazio e uma vontade insaciável de se divertir. Ela atravessa realidades à beira do colapso para assistir ao caos se revelar.",
    extraStory:
      "Moralidade e responsabilidade ficaram para trás durante suas viagens. Em diferentes mundos destruídos, Alter encontrou uma conexão recorrente — e chegou às Terras Ermas determinada a testemunhar o maior apocalipse de todos.",
    metadata: [
      { label: "Identidade", value: "YingLing Lui (雷盈灵)" },
      { label: "Origem", value: "Desconhecida" },
      { label: "Estreia", value: "Temporada 21 — 2024" },
    ],
    classProtocol: {
      code: "CLS // SKIRMISHER",
      name: "Protocolo de Combate",
      summary: "Reposicionamento rápido. Consumo em movimento. Equipe coesa.",
      description:
        "Alter entra e sai de confrontos mais rapidamente, detecta Cápsulas de Suprimentos a caminho e mantém mais velocidade ao usar consumíveis. Aliados também se movem mais rápido ao correr em sua direção.",
      icon: "/classes/skirmisher.svg",
      perks: ["Cápsulas em rota", "Consumo em movimento", "Impulso para aliados"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Passagem do Vazio",
        description:
          "Cria uma passagem dimensional através de uma superfície, permitindo uma travessia instantânea em qualquer direção.",
        icon: "/abilities/alter-tactical.png",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Presente da Fenda",
        description:
          "Interage remotamente com uma caixa de abate para coletar um item. Núcleos de escudo não podem ser retirados.",
        icon: "/abilities/alter-passive.png",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Nexus do Vazio",
        description:
          "Cria um ponto de reagrupamento que permite às unidades aliadas abrir remotamente um túnel dimensional de volta ao local.",
        icon: "/abilities/alter-ultimate.png",
        code: "ULT // 03",
      },
    ],
    accent: "#d946ef",
    accentRgb: "217 70 239",
  },
  ash: {
    slug: "ash",
    listIndex: 1,
    classification: "02 // SIMULACRO",
    name: "Ash",
    role: "Combate",
    classIcon: "/classes/skirmisher.svg",
    age: "122 anos",
    tagline: "Instigadora incisiva.",
    story:
      "A Dra. Ashleigh Reid sobreviveu como um simulacro dividido entre duas consciências. Ash busca provar que transcendeu toda a humanidade; Leigh luta para voltar à superfície.",
    extraStory:
      "Fragmentos de memória e o trauma de sua morte partiram sua personalidade. A programação que manteve Leigh adormecida está falhando, transformando cada confronto em uma disputa interna.",
    metadata: [
      { label: "Identidade", value: "Dra. Ashleigh Reid" },
      { label: "Origem", value: "Desconhecida" },
      { label: "Estreia", value: "Temporada 11 — 2021" },
    ],
    classProtocol: {
      code: "CLS // SKIRMISHER",
      name: "Protocolo de Combate",
      summary: "Reposicionamento rápido. Consumo em movimento. Equipe coesa.",
      description:
        "Ash entra e sai de confrontos mais rapidamente, detecta Cápsulas de Suprimentos a caminho e mantém mais velocidade ao usar consumíveis. Aliados também se movem mais rápido ao correr em sua direção.",
      icon: "/classes/skirmisher.svg",
      perks: ["Cápsulas em rota", "Consumo em movimento", "Impulso para aliados"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Armadilha Voltaica",
        description:
          "Lança uma armadilha giratória que causa dano e conecta-se ao primeiro inimigo que se aproximar demais.",
        icon: "/abilities/ash-tactical.png",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Perseguição de Predadora",
        description:
          "Permite que Ash realize uma arrancada enquanto estiver no ar e pressione o avanço sobre seus alvos.",
        icon: "/abilities/ash-passive.png",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Ruptura Dimensional",
        description:
          "Abre um portal de mão única para uma posição designada, permitindo uma investida instantânea.",
        icon: "/abilities/ash-ultimate.png",
        code: "ULT // 03",
      },
    ],
    accent: "#ef4444",
    accentRgb: "239 68 68",
  },
  axle: {
    slug: "axle",
    listIndex: 2,
    classification: "03 // REDLINE",
    name: "Axle",
    role: "Combate",
    classIcon: "/classes/skirmisher.svg",
    age: "28 anos",
    tagline: "Pilota de combate.",
    story:
      "Isa Wegner cresceu nas corridas subterrâneas de Salvo, onde velocidade e sobrevivência dividem a mesma pista. Cada acidente a fez reconstruir o próprio corpo mais forte, até Axle se tornar parte máquina e completamente impossível de frear.",
    extraStory:
      "Sua rivalidade com Weaver chamou a atenção de Kuben Blisk e transformou a última volta da Redline em uma disputa por um Cartão Apex. Axle acordou no hospital com a vitória amarga, um novo destino e apenas uma regra: acelerar até a pista — ou a sorte — acabar.",
    metadata: [
      { label: "Identidade", value: "Isa Wegner" },
      { label: "Origem", value: "Salvo" },
      { label: "Estreia", value: "Temporada 29 — 2026" },
    ],
    classProtocol: {
      code: "CLS // SKIRMISHER",
      name: "Protocolo de Combate",
      summary: "Reposicionamento rápido. Consumo em movimento. Equipe coesa.",
      description:
        "Axle converte velocidade em controle de combate, mantém mobilidade durante o uso de recursos e cria oportunidades para que o esquadrão acompanhe suas investidas.",
      icon: "/classes/skirmisher.svg",
      perks: ["Cápsulas em rota", "Consumo em movimento", "Impulso para aliados"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Portal de Nitro",
        description:
          "Implanta um portal de velocidade que lança qualquer pessoa usuária em um deslizamento impulsionado.",
        icon: "/abilities/axle-tactical-transparent.png",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Drift",
        description:
          "Concede controle aprimorado durante deslizamentos para contornar obstáculos e manter o embalo.",
        icon: "/abilities/axle-passive-transparent.png",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Arranque",
        description:
          "Solta um drone perseguidor que busca adversários e os desloca violentamente no impacto.",
        icon: "/abilities/axle-ultimate-transparent.png",
        code: "ULT // 03",
      },
    ],
    accent: "#ec4899",
    accentRgb: "236 72 153",
  },
  ballistic: {
    slug: "ballistic",
    listIndex: 3,
    classification: "04 // THUNDERDOME",
    name: "Ballistic",
    role: "Assalto",
    classIcon: "/classes/assault.svg",
    age: "63 anos",
    tagline: "Pistoleiro refinado.",
    story:
      "August Brinkman foi a primeira celebridade da Cúpula do Trovão. Depois que sua arrogância custou a vida do cunhado, ele abandonou os holofotes e viveu isolado por décadas.",
    extraStory:
      "Quando seu filho Nathaniel se classificou para os Jogos Apex, August negociou com o Sindicato e tomou seu lugar. Ballistic voltou à arena para proteger o filho — e provar que o velho campeão ainda é letal.",
    metadata: [
      { label: "Identidade", value: "August Montgomery Brinkman" },
      { label: "Origem", value: "Gaea" },
      { label: "Estreia", value: "Temporada 17 — 2023" },
    ],
    classProtocol: {
      code: "CLS // ASSAULT",
      name: "Protocolo de Assalto",
      summary: "Mais munição. Granadas extras. Pressão após a quebra.",
      description:
        "Ballistic carrega mais munição por caixa e possui espaços extras para granadas. Ele usa armas mais rapidamente e, quando seu escudo é quebrado, recebe um impulso temporário de recarga e movimento. Também acessa compartimentos secretos das Arcas de Suprimentos.",
      icon: "/classes/assault.svg",
      perks: ["Munição ampliada", "Granadas extras", "Impulso de combate"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Assobio",
        description:
          "Dispara um projétil que aquece a arma inimiga enquanto ela atira. O superaquecimento causa dano e interrompe o disparo.",
        icon: "/abilities/ballistic-tactical.png",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Bandoleira",
        description:
          "Armazena uma terceira arma na bandoleira. Ela não recebe acessórios, mas é aprimorada durante a Suprema.",
        icon: "/abilities/ballistic-passive.png",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Tormenta",
        description:
          "Concede a aliados próximos recarga acelerada, movimento armado mais veloz e munição infinita; a arma da bandoleira recebe melhoria máxima.",
        icon: "/abilities/ballistic-ultimate.png",
        code: "ULT // 03",
      },
    ],
    accent: "#d6ad62",
    accentRgb: "214 173 98",
  },
  bangalore: {
    slug: "bangalore",
    listIndex: 4,
    classification: "05 // IMC",
    name: "Bangalore",
    role: "Assalto",
    classIcon: "/classes/assault.svg",
    age: "40 anos",
    tagline: "Combatente profissional.",
    story:
      "Anita Williams nasceu em uma família militar e tornou-se uma excepcional soldada da IMC. Presa nas Terras Ermas, transformou seu treinamento e conhecimento de armas em sobrevivência nos Jogos Apex.",
    extraStory:
      "Durante anos, Anita lutou para financiar a viagem de volta a Gridiron e reencontrar sua família. Após descobrir que seu irmão Jackson estava vivo, passou a reconstruir essa relação e a proteger a nova família que encontrou entre as Lendas.",
    metadata: [
      { label: "Identidade", value: "Anita Williams" },
      { label: "Origem", value: "Gridiron" },
      { label: "Estreia", value: "Pré-Temporada — 2019" },
    ],
    classProtocol: {
      code: "CLS // ASSAULT",
      name: "Protocolo de Assalto",
      summary: "Mais munição. Granadas extras. Pressão após a quebra.",
      description:
        "Bangalore carrega mais munição por caixa e possui espaços extras para granadas. Ela usa armas mais rapidamente e, quando seu escudo é quebrado, recebe um impulso temporário de recarga e movimento. Também acessa compartimentos secretos das Arcas de Suprimentos.",
      icon: "/classes/assault.svg",
      perks: ["Munição ampliada", "Granadas extras", "Impulso de combate"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Lançador de Fumaça",
        description:
          "Dispara um cilindro de alta velocidade que explode ao sofrer impacto e forma uma cortina de fumaça.",
        icon: "/abilities/bangalore-tactical.png",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Asas nos Pés",
        description:
          "Receber disparos enquanto corre aumenta temporariamente sua velocidade de movimento.",
        icon: "/abilities/bangalore-passive.png",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Estrondo do Trovão",
        description:
          "Solicita um ataque de artilharia que avança lentamente e varre toda a área à frente.",
        icon: "/abilities/bangalore-ultimate.png",
        code: "ULT // 03",
      },
    ],
    accent: "#f97316",
    accentRgb: "249 115 22",
  },
  bloodhound: {
    slug: "bloodhound",
    listIndex: 5,
    classification: "06 // CAÇADORE",
    name: "Bloodhound",
    role: "Batedor",
    classIcon: "/classes/recon.svg",
    age: "40 anos",
    tagline: "Rastreadore tecnológique.",
    story:
      "Filhe de dois engenheiros em Talos, Bloodhound perdeu os pais em um colapso e foi criade pelo tio Artur. Unindo os Costumes Antigos à tecnologia, tornou-se uma figura lendária entre quem caça na Fronteira.",
    extraStory:
      "Após perder seu grande amor na Cúpula do Trovão, Bloodhound jurou conquistar vitórias suficientes para que ambos entrassem em Valhalla. Guiade pelos antigos deuses nórdicos, encara o destino como um caminho inevitável — e encontra força nessa certeza.",
    metadata: [
      { label: "Identidade", value: "Blódhundr" },
      { label: "Origem", value: "Talos" },
      { label: "Estreia", value: "Pré-Temporada — 2019" },
    ],
    classProtocol: {
      code: "CLS // RECON",
      name: "Protocolo Batedor",
      summary: "Varredura segura. Pulso triplo. Visão de ameaça.",
      description:
        "Bloodhound escaneia Sinalizadores de Pesquisa mais rapidamente sem revelar sua localização. Cada sinalizador executa três pulsos em uma grande área, enquanto a mira concede visão de ameaça dentro das limitações de alcance e cobertura.",
      icon: "/classes/recon.svg",
      perks: ["Sinalizador veloz", "Pulso triplo", "Visão de ameaça"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Olho do Pai de Todos",
        description:
          "Revela brevemente unidades inimigas ocultas, armadilhas e pistas através das estruturas à sua frente.",
        icon: "/abilities/bloodhound-tactical.png",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Rastreadore",
        description:
          "Identifica rastros deixados por oponentes e ativa Corvos Brancos para localizar unidades inimigas.",
        icon: "/abilities/bloodhound-passive.png",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Manto do Pai de Todos",
        description:
          "Arremessa um dispositivo que camufla as Lendas dentro do alcance enquanto elas se movimentam lentamente.",
        icon: "/abilities/bloodhound-ultimate.png",
        code: "ULT // 03",
      },
    ],
    accent: "#dc2626",
    accentRgb: "220 38 38",
  },
  catalyst: {
    slug: "catalyst",
    listIndex: 6,
    classification: "07 // FERROFLUIDO",
    name: "Catalyst",
    role: "Controle",
    classIcon: "/classes/controller.svg",
    age: "30 anos",
    tagline: "Conjuradora defensiva.",
    story:
      "Tressa Crystal Smith encontrou na amizade, na bruxaria e em sua conexão com a lua Cleo um lugar ao qual pertencer. Em Cleo, passou a trabalhar com ferrofluido nas equipes de terraformação.",
    extraStory:
      "A chegada dos Jogos Apex ameaçou tudo o que Tressa ajudou a construir. Como Catalyst, ela transforma o ferrofluido em lâminas, barricadas e muralhas para proteger seu lar e escolher o próprio destino.",
    metadata: [
      { label: "Identidade", value: "Tressa Crystal Smith" },
      { label: "Origem", value: "Boreas" },
      { label: "Estreia", value: "Temporada 15 — 2022" },
    ],
    classProtocol: {
      code: "CLS // CONTROLLER",
      name: "Protocolo de Controle",
      summary: "Leitura do anel. Escudo reforçado. Fortificações recuperáveis.",
      description:
        "Catalyst acessa Consoles do Anel para localizar a próxima zona. Dentro do anel, recebe capacidade adicional de escudo e pode recuperar remotamente armadilhas e itens posicionáveis próximos.",
      icon: "/classes/controller.svg",
      perks: ["Console do Anel", "Escudo reforçado", "Recuperação remota"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Faixa de Espinhos",
        description:
          "Lança uma mancha de ferrofluido que se transforma em espinhos quando inimigos se aproximam, causando dano e lentidão.",
        icon: "/abilities/catalyst-tactical.png",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Barricada",
        description:
          "Reforça portas com ferrofluido, aumentando sua resistência e permitindo que Catalyst as abra mesmo após terem sido destruídas.",
        icon: "/abilities/catalyst-passive.png",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Barreira de Ferro",
        description:
          "Ergue uma parede permeável de ferrofluido que desacelera e cega parcialmente inimigos que a atravessam.",
        icon: "/abilities/catalyst-ultimate.png",
        code: "ULT // 03",
      },
    ],
    accent: "#a855f7",
    accentRgb: "168 85 247",
  },
  caustic: {
    slug: "caustic",
    listIndex: 7,
    classification: "08 // NOX",
    name: "Caustic",
    role: "Controle",
    classIcon: "/classes/controller.svg",
    age: "50 anos",
    tagline: "Caçador tóxico.",
    story:
      "Alexander Nox era um dos cientistas mais brilhantes da Humbert Labs. Obcecado por aperfeiçoar seus pesticidas, trocou testes controlados por experimentos letais em seres humanos.",
    extraStory:
      "Depois de incendiar o laboratório e simular a própria morte, Nox encontrou nos Jogos Apex uma fonte inesgotável de cobaias. Sob o nome Caustic, observa cada reação com frieza científica.",
    metadata: [
      { label: "Identidade", value: "Alexander Maxwell Nox" },
      { label: "Origem", value: "Gaea" },
      { label: "Estreia", value: "Pré-Temporada — 2019" },
    ],
    classProtocol: {
      code: "CLS // CONTROLLER",
      name: "Protocolo de Controle",
      summary: "Leitura do anel. Escudo reforçado. Fortificações recuperáveis.",
      description:
        "Caustic acessa Consoles do Anel para localizar a próxima zona. Dentro do anel, recebe capacidade adicional de escudo e pode recuperar remotamente armadilhas e itens posicionáveis próximos.",
      icon: "/classes/controller.svg",
      perks: ["Console do Anel", "Escudo reforçado", "Recuperação remota"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Armadilha de Gás Nox",
        description:
          "Posiciona recipientes que liberam gás Nox mortal quando atingidos ou acionados pela proximidade de inimigos.",
        icon: "/abilities/caustic-tactical.png",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Visão Nox",
        description:
          "Permite que Caustic enxergue inimigos através de seu gás e acompanhe os resultados de cada experimento.",
        icon: "/abilities/caustic-passive.png",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Granada de Gás Nox",
        description:
          "Cobre uma grande área com gás Nox, restringindo rotas e forçando inimigos a abandonar posições protegidas.",
        icon: "/abilities/caustic-ultimate.png",
        code: "ULT // 03",
      },
    ],
    accent: "#b7d52a",
    accentRgb: "183 213 42",
  },
  conduit: {
    slug: "conduit",
    listIndex: 8,
    classification: "09 // RADIANTE",
    name: "Conduit",
    role: "Suporte",
    classIcon: "/classes/support.svg",
    age: "27 anos",
    tagline: "Curandeira de escudo.",
    story:
      "Rowenna cresceu em Nexus, onde a bateria de um Titã Monarch salvou sua comunidade. Anos depois, ela utilizou os restos irradiados da máquina para construir um equipamento de combate.",
    extraStory:
      "Mesmo sabendo que a tecnologia cobra um preço de seu corpo, Conduit entrou nos Jogos Apex para sustentar a família. Seu otimismo transforma cada combate em uma chance de manter o esquadrão de pé.",
    metadata: [
      { label: "Identidade", value: "Rowenna Valentina Coffey Divina" },
      { label: "Origem", value: "Nexus" },
      { label: "Estreia", value: "Temporada 19 — 2023" },
    ],
    classProtocol: {
      code: "CLS // SUPPORT",
      name: "Protocolo de Suporte",
      summary: "Recuperação veloz. Recursos da equipe. Retorno ao combate.",
      description:
        "Conduit sustenta o esquadrão com recuperações mais eficientes e acesso ampliado a recursos de suporte. A classe prioriza manter aliados ativos e facilita o retorno de integrantes eliminados.",
      icon: "/classes/support.svg",
      perks: ["Recuperação de aliados", "Recursos de suporte", "Retorno do esquadrão"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Transferência Radiante",
        description:
          "Envia uma onda de energia para regenerar temporariamente os escudos de Conduit e de um aliado em perigo.",
        icon: "/abilities/conduit-tactical.png",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Velocidade da Salvadora",
        description:
          "Concede um impulso de velocidade quando Conduit corre em direção a um aliado fora do alcance da habilidade tática.",
        icon: "/abilities/conduit-passive.png",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Barricada de Energia",
        description:
          "Dispara dispositivos que formam uma barreira de interferência, causando dano e lentidão a inimigos na área.",
        icon: "/abilities/conduit-ultimate.png",
        code: "ULT // 03",
      },
    ],
    accent: "#22d3ee",
    accentRgb: "34 211 238",
  },
  crypto: {
    slug: "crypto",
    listIndex: 9,
    classification: "10 // OFF-GRID",
    name: "Crypto",
    role: "Batedor",
    classIcon: "/classes/recon.svg",
    age: "24 anos",
    tagline: "Especialista em espionagem.",
    story:
      "Tae Joon Park e sua irmã adotiva Mila descobriram um algoritmo capaz de prever o resultado dos Jogos Apex. Mila desapareceu, Tae Joon foi acusado e precisou abandonar sua identidade.",
    extraStory:
      "Refeito como Crypto, ele entrou nos Jogos para se aproximar do Sindicato e limpar seu nome. Seu drone Hack encontra o que os olhos não veem, enquanto ele permanece sempre um passo fora da rede.",
    metadata: [
      { label: "Identidade", value: "Tae Joon Park" },
      { label: "Origem", value: "Gaea" },
      { label: "Estreia", value: "Temporada 3 — 2019" },
    ],
    classProtocol: {
      code: "CLS // RECON",
      name: "Protocolo Batedor",
      summary: "Varredura segura. Pulso triplo. Visão de ameaça.",
      description:
        "Crypto escaneia Sinalizadores de Pesquisa mais rapidamente sem revelar sua localização. Cada sinalizador executa três pulsos em uma grande área, enquanto a mira concede visão de ameaça dentro das limitações de alcance e cobertura.",
      icon: "/classes/recon.svg",
      perks: ["Sinalizador veloz", "Pulso triplo", "Visão de ameaça"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Drone de Vigilância",
        description:
          "Posiciona um drone aéreo que observa a área, marca inimigos e interage remotamente com objetos e sinalizadores.",
        icon: "/abilities/crypto-tactical.png",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Neurolink",
        description:
          "Inimigos detectados pelo drone dentro do alcance são destacados para Crypto e todo o seu esquadrão.",
        icon: "/abilities/crypto-passive.png",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "PEM do Drone",
        description:
          "Detona um pulso eletromagnético a partir do drone, causando dano a escudos, lentidão e destruição de armadilhas.",
        icon: "/abilities/crypto-ultimate.png",
        code: "ULT // 03",
      },
    ],
    accent: "#57e389",
    accentRgb: "87 227 137",
  },
  fuse: {
    slug: "fuse",
    listIndex: 10,
    classification: "11 // SALVO",
    name: "Fuse",
    role: "Assalto",
    classIcon: "/classes/assault.svg",
    age: "55 anos",
    tagline: "Especialista em explosivos.",
    story:
      "Walter Fitzroy cresceu em Salvo ao lado de Margaret Kōhere, sobrevivendo como mercenário e encontrando prazer em qualquer coisa que explodisse. Seu carisma o levou ao título do Bonecage.",
    extraStory:
      "Quando Salvo se juntou ao Sindicato, Fuse aceitou o convite para os Jogos Apex e rompeu com Maggie. Na arena, ele combina precisão, excesso e espetáculo — sempre com mais uma granada à mão.",
    metadata: [
      { label: "Identidade", value: "Walter Fitzroy Jr." },
      { label: "Origem", value: "Salvo" },
      { label: "Estreia", value: "Temporada 8 — 2021" },
    ],
    classProtocol: {
      code: "CLS // ASSAULT",
      name: "Protocolo de Assalto",
      summary: "Mais munição. Granadas extras. Pressão após a quebra.",
      description:
        "Fuse carrega mais munição por caixa e possui espaços extras para granadas. Ele usa armas mais rapidamente e, quando seu escudo é quebrado, recebe um impulso temporário de recarga e movimento. Também acessa compartimentos secretos das Arcas de Suprimentos.",
      icon: "/classes/assault.svg",
      perks: ["Munição ampliada", "Granadas extras", "Impulso de combate"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Bomba de Fragmentação",
        description:
          "Lança uma carga que libera repetidas explosões de concussão, causando dano contínuo em uma área concentrada.",
        icon: "/abilities/fuse-tactical.png",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Granadeiro",
        description:
          "Permite empilhar mais granadas por espaço e arremessá-las com maior velocidade, distância e precisão.",
        icon: "/abilities/fuse-passive.png",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Megabomba",
        description:
          "Dispara um explosivo que cerca a área-alvo com uma muralha de chamas e revela inimigos presos no perímetro.",
        icon: "/abilities/fuse-ultimate.png",
        code: "ULT // 03",
      },
    ],
    accent: "#ff7a18",
    accentRgb: "255 122 24",
  },
  gibraltar: {
    slug: "gibraltar",
    listIndex: 11,
    classification: "12 // SARAS",
    name: "Gibraltar",
    role: "Suporte",
    classIcon: "/classes/support.svg",
    age: "32 anos",
    tagline: "Fortaleza blindada.",
    story:
      "Makoa Gibraltar cresceu entre voluntários da SARAS em Solace e aprendeu cedo o custo de salvar outras pessoas. Depois que seu pai perdeu um braço ao resgatá-lo de um deslizamento, ele dedicou a vida a proteger quem precisa.",
    extraStory:
      "Quando amigos começaram a entrar nos Jogos Apex em busca de dinheiro e glória, alguns nunca voltaram. Gibraltar entrou na arena para mantê-los seguros e tornou-se um símbolo de coragem dentro e fora dos Jogos.",
    metadata: [
      { label: "Identidade", value: "Makoa Gibraltar" },
      { label: "Origem", value: "Solace" },
      { label: "Estreia", value: "Pré-Temporada — 2019" },
    ],
    classProtocol: {
      code: "CLS // SUPPORT",
      name: "Protocolo de Suporte",
      summary: "Cura em movimento. Reanimação veloz. Retorno do esquadrão.",
      description:
        "Gibraltar se move mais rapidamente enquanto usa itens de cura e reanima aliados com maior velocidade. Com uma Lenda de Suporte na equipe, caixas de abate aliadas também podem fornecer recursos para trazer integrantes de volta.",
      icon: "/classes/support.svg",
      perks: ["Cura em movimento", "Reanimação veloz", "Ressurgimento móvel"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Domo de Proteção",
        description:
          "Cria um escudo em forma de domo que bloqueia ataques de entrada e saída por um curto período.",
        icon: "/abilities/gibraltar-tactical.svg",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Escudo de Arma",
        description:
          "Mirar ativa um escudo frontal que absorve disparos. Ao manter a corrida máxima desarmado, Gibraltar também recebe um impulso de velocidade.",
        icon: "/abilities/gibraltar-passive.svg",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Bombardeio Defensivo",
        description:
          "Solicita um ataque de morteiro concentrado sobre uma posição marcada.",
        icon: "/abilities/gibraltar-ultimate.svg",
        code: "ULT // 03",
      },
    ],
    accent: "#f59e0b",
    accentRgb: "245 158 11",
  },
  horizon: {
    slug: "horizon",
    listIndex: 12,
    classification: "13 // BRANTHIUM",
    name: "Horizon",
    role: "Combate",
    classIcon: "/classes/skirmisher.svg",
    age: "39 anos (+87)",
    tagline: "Manipuladora gravitacional.",
    story:
      "A astrofísica Dra. Mary Somers encontrou o Branthium que poderia salvar as Terras Ermas. Traída por sua assistente, Dra. Reid, ela foi abandonada na órbita de um buraco negro.",
    extraStory:
      "Horizon escapou com a ajuda de N.E.W.T., mas a dilatação temporal fez 87 anos passarem longe de seu filho Newton. Agora, os Jogos financiam sua pesquisa para voltar no tempo e cumprir a promessa de retornar para ele.",
    metadata: [
      { label: "Identidade", value: "Dra. Mary Somers" },
      { label: "Origem", value: "Solace" },
      { label: "Estreia", value: "Temporada 7 — 2020" },
    ],
    classProtocol: {
      code: "CLS // SKIRMISHER",
      name: "Protocolo de Combate",
      summary: "Reposicionamento rápido. Consumo em movimento. Equipe coesa.",
      description:
        "Horizon entra e sai de confrontos mais rapidamente, detecta Cápsulas de Suprimentos a caminho e mantém mais velocidade ao usar consumíveis. Aliados também se movem mais rápido ao correr em sua direção.",
      icon: "/classes/skirmisher.svg",
      perks: ["Cápsulas em rota", "Consumo em movimento", "Impulso para aliados"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Elevador Gravitacional",
        description:
          "Reverte o fluxo da gravidade, elevando jogadores e concedendo impulso ao sair.",
        icon: "/abilities/horizon-tactical.svg",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Andar Espacial",
        description:
          "Aumenta o controle aéreo e reduz o impacto das quedas com o traje personalizado de Horizon.",
        icon: "/abilities/horizon-passive.svg",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Buraco Negro",
        description:
          "Posiciona N.E.W.T. para criar um microburaco negro que atrai jogadores para o centro.",
        icon: "/abilities/horizon-ultimate.svg",
        code: "ULT // 03",
      },
    ],
    accent: "#22d3ee",
    accentRgb: "34 211 238",
  },
  lifeline: {
    slug: "lifeline",
    listIndex: 13,
    classification: "14 // D.O.C.",
    name: "Lifeline",
    role: "Suporte",
    classIcon: "/classes/support.svg",
    age: "26 anos",
    tagline: "Médica de combate.",
    story:
      "Ajay Che deixou para trás uma família enriquecida pela guerra quando percebeu o dano causado pelos negócios dos próprios pais. Ela se juntou ao Corpo de Fronteira para ajudar comunidades esquecidas.",
    extraStory:
      "Nos Jogos Apex, Lifeline usa o prêmio e a visibilidade para financiar missões humanitárias. Sarcástica e inquieta, ela leva D.O.C. para onde seu esquadrão mais precisa de uma segunda chance.",
    metadata: [
      { label: "Identidade", value: "Ajay Che" },
      { label: "Origem", value: "Psamathe" },
      { label: "Estreia", value: "Pré-Temporada — 2019" },
    ],
    classProtocol: {
      code: "CLS // SUPPORT",
      name: "Protocolo de Suporte",
      summary: "Cura em movimento. Reanimação veloz. Retorno do esquadrão.",
      description:
        "Lifeline se move mais rapidamente enquanto usa itens de cura e reanima aliados com maior velocidade. Com uma Lenda de Suporte na equipe, caixas de abate aliadas também podem fornecer recursos para trazer integrantes de volta.",
      icon: "/classes/support.svg",
      perks: ["Cura em movimento", "Reanimação veloz", "Ressurgimento móvel"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Drone Dr. Cura",
        description:
          "Aciona D.O.C. para seguir e curar automaticamente pessoas aliadas próximas.",
        icon: "/abilities/lifeline-tactical.svg",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Reanimação em Combate",
        description:
          "D.O.C. reanima uma pessoa aliada enquanto Lifeline continua lutando; no ar, ela também pode planar por alguns instantes.",
        icon: "/abilities/lifeline-passive.svg",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Auréola do Dr. Cura",
        description:
          "D.O.C. cria uma barreira que bloqueia projéteis e acelera o uso de itens de cura em seu interior.",
        icon: "/abilities/lifeline-ultimate.svg",
        code: "ULT // 03",
      },
    ],
    accent: "#38bdf8",
    accentRgb: "56 189 248",
  },
  loba: {
    slug: "loba",
    listIndex: 14,
    classification: "15 // TRANSLOCAÇÃO",
    name: "Loba",
    role: "Suporte",
    classIcon: "/classes/support.svg",
    age: "36 anos",
    tagline: "Ladra translocadora.",
    story:
      "Loba Andrade tinha nove anos quando Revenant assassinou seus pais. Sozinha, sobreviveu roubando e transformou cada furto em preparação para um acerto de contas.",
    extraStory:
      "Com sua pulseira de translocação e um instinto raro para tesouros, Loba invadiu instalações da Hammond e chegou aos Jogos. A arena oferece tudo o que ela aprecia: alvos valiosos, segredos e vingança.",
    metadata: [
      { label: "Identidade", value: "Loba Andrade" },
      { label: "Origem", value: "Sem planeta natal" },
      { label: "Estreia", value: "Temporada 5 — 2020" },
    ],
    classProtocol: {
      code: "CLS // SUPPORT",
      name: "Protocolo de Suporte",
      summary: "Cura em movimento. Reanimação veloz. Retorno do esquadrão.",
      description:
        "Loba se move mais rapidamente enquanto usa itens de cura e reanima aliados com maior velocidade. Com uma Lenda de Suporte na equipe, caixas de abate aliadas também podem fornecer recursos para trazer integrantes de volta.",
      icon: "/classes/support.svg",
      perks: ["Cura em movimento", "Reanimação veloz", "Ressurgimento móvel"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Melhor Amigo da Ladra",
        description:
          "Arremessa a pulseira de salto para se teleportar até um local difícil de alcançar ou escapar rapidamente.",
        icon: "/abilities/loba-tactical.svg",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "De Olho na Qualidade",
        description:
          "Permite enxergar espólios épicos e lendários através de paredes dentro do alcance.",
        icon: "/abilities/loba-passive.svg",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Butique do Mercado Clandestino",
        description:
          "Coloca um dispositivo portátil que teleporta espólios próximos diretamente para o inventário.",
        icon: "/abilities/loba-ultimate.svg",
        code: "ULT // 03",
      },
    ],
    accent: "#e11d48",
    accentRgb: "225 29 72",
  },
  "mad-maggie": {
    slug: "mad-maggie",
    listIndex: 15,
    classification: "16 // SALVO",
    name: "Mad Maggie",
    role: "Assalto",
    classIcon: "/classes/assault.svg",
    age: "56 anos",
    tagline: "Senhora da guerra rebelde.",
    story:
      "Margaret Kōhere cresceu em Salvo ao lado de Walter Fitzroy. Juntos, formaram a Garra Quebrada e lutaram para manter o planeta independente do Sindicato.",
    extraStory:
      "Quando Fuse escolheu os Jogos, Maggie enxergou uma traição e respondeu com fogo. Capturada e condenada a morrer na arena, ela transformou a sentença em mais uma guerra que se recusa a perder.",
    metadata: [
      { label: "Identidade", value: "Margaret Kōhere" },
      { label: "Origem", value: "Salvo" },
      { label: "Estreia", value: "Temporada 12 — 2022" },
    ],
    classProtocol: {
      code: "CLS // ASSAULT",
      name: "Protocolo de Assalto",
      summary: "Mais munição. Granadas extras. Pressão após a quebra.",
      description:
        "Mad Maggie carrega mais munição por caixa e possui espaços extras para granadas. Ela usa armas mais rapidamente e, quando seu escudo é quebrado, recebe um impulso temporário de recarga e movimento. Também acessa compartimentos secretos das Arcas de Suprimentos.",
      icon: "/classes/assault.svg",
      perks: ["Munição ampliada", "Granadas extras", "Impulso de combate"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Furadeira de Motim",
        description:
          "Dispara uma furadeira que atravessa obstáculos e queima pessoas inimigas do outro lado.",
        icon: "/abilities/mad-maggie-tactical.svg",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Cólera Déspota",
        description:
          "Destaca temporariamente inimigos atingidos e permite correr mais rápido com escopetas.",
        icon: "/abilities/mad-maggie-passive.svg",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Bola de Demolição",
        description:
          "Lança uma bola que libera impulsos de velocidade e detona perto de inimigos.",
        icon: "/abilities/mad-maggie-ultimate.svg",
        code: "ULT // 03",
      },
    ],
    accent: "#e4ff27",
    accentRgb: "228 255 39",
  },
  mirage: {
    slug: "mirage",
    listIndex: 16,
    classification: "17 // HOLO",
    name: "Mirage",
    role: "Suporte",
    classIcon: "/classes/support.svg",
    age: "32 anos",
    tagline: "Trapaceiro holográfico.",
    story:
      "Elliott Witt é o caçula de quatro irmãos e aprendeu tecnologia holográfica com sua mãe engenheira. Depois que os irmãos desapareceram na guerra, os holos tornaram-se companhia, defesa e espetáculo.",
    extraStory:
      "Trabalhando como bartender, Mirage ouvia histórias dos Jogos até receber da mãe um conjunto de dispositivos personalizados. Na arena, ele esconde inseguranças atrás de piadas e deixa os adversários discutindo com a cópia errada.",
    metadata: [
      { label: "Identidade", value: "Elliott Witt" },
      { label: "Origem", value: "Solace" },
      { label: "Estreia", value: "Pré-Temporada — 2019" },
    ],
    classProtocol: {
      code: "CLS // SUPPORT",
      name: "Protocolo de Suporte",
      summary: "Cura em movimento. Reanimação veloz. Retorno do esquadrão.",
      description:
        "Mirage se move mais rapidamente enquanto usa itens de cura e reanima aliados com maior velocidade. Com uma Lenda de Suporte na equipe, caixas de abate aliadas também podem fornecer recursos para trazer integrantes de volta.",
      icon: "/classes/support.svg",
      perks: ["Cura em movimento", "Reanimação veloz", "Ressurgimento móvel"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Astúcia",
        description:
          "Envia um holograma controlável para confundir inimigos e revelar quem atirar nele.",
        icon: "/abilities/mirage-tactical.svg",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Agora Você Me Vê",
        description:
          "Camufla Mirage e a pessoa aliada durante uma reanimação, além de ocultá-lo ao usar um sinalizador de ressurgimento.",
        icon: "/abilities/mirage-passive.svg",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Animação da Festa",
        description:
          "Implanta uma equipe de hologramas que imita os movimentos de Mirage para confundir inimigos.",
        icon: "/abilities/mirage-ultimate.svg",
        code: "ULT // 03",
      },
    ],
    accent: "#facc15",
    accentRgb: "250 204 21",
  },
  newcastle: {
    slug: "newcastle",
    listIndex: 17,
    classification: "18 // CASTLE",
    name: "Newcastle",
    role: "Suporte",
    classIcon: "/classes/support.svg",
    age: "41 anos",
    tagline: "Defensor heroico.",
    story:
      "Jackson Williams abandonou a IMC para construir uma vida em Gridiron. Anos depois, assumiu a armadura de Newcastle e entrou nos Jogos Apex para proteger Harris Valley e as pessoas que passaram a depender dele.",
    extraStory:
      "O irmão de Bangalore encontrou no antigo título de herói uma segunda chance. Entre dívidas, segredos e o peso de uma comunidade inteira, Jackson luta para provar que a coragem vale mais do que o nome estampado na armadura.",
    metadata: [
      { label: "Identidade", value: "Jackson Williams" },
      { label: "Origem", value: "Gridiron" },
      { label: "Estreia", value: "Temporada 13 — 2022" },
    ],
    classProtocol: {
      code: "CLS // SUPPORT",
      name: "Protocolo de Suporte",
      summary: "Cura em movimento. Reanimação veloz. Retorno do esquadrão.",
      description:
        "Newcastle mantém a equipe ativa em situações críticas: usa cura sem perder tanta mobilidade, reanima com mais eficiência e ajuda a recuperar integrantes eliminados por meio dos sistemas de ressurgimento.",
      icon: "/classes/support.svg",
      perks: ["Cura em movimento", "Reanimação veloz", "Ressurgimento móvel"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Escudo Móvel",
        description:
          "Lança um drone que projeta um escudo de energia controlável para avançar, recuar ou proteger a equipe.",
        icon: "/abilities/newcastle-tactical.png",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Resgate de Feridos",
        description:
          "Arrasta a pessoa aliada enquanto a reanima e protege o resgate com o escudo de nocaute.",
        icon: "/abilities/newcastle-passive.png",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Muralha do Castelo",
        description:
          "Salta até uma posição ou pessoa aliada e ergue uma muralha fortificada que bloqueia o avanço inimigo.",
        icon: "/abilities/newcastle-ultimate.png",
        code: "ULT // 03",
      },
    ],
    accent: "#f59e0b",
    accentRgb: "245 158 11",
  },
  octane: {
    slug: "octane",
    listIndex: 18,
    classification: "19 // STIM",
    name: "Octane",
    role: "Combate",
    classIcon: "/classes/skirmisher.svg",
    age: "26 anos",
    tagline: "Acrobata de alta velocidade.",
    story:
      "Octavio Silva transformou o tédio de uma vida privilegiada em uma coleção de desafios extremos. Depois de perder as pernas tentando quebrar um recorde com uma granada, voltou ainda mais rápido com próteses biônicas.",
    extraStory:
      "Nos Jogos Apex, cada arena é uma nova pista e cada risco vira espetáculo. Octane vive pela próxima descarga de adrenalina — de preferência diante de uma plateia grande o bastante para não perder nenhum segundo.",
    metadata: [
      { label: "Identidade", value: "Octavio Silva" },
      { label: "Origem", value: "Psamathe" },
      { label: "Estreia", value: "Temporada 1 — 2019" },
    ],
    classProtocol: {
      code: "CLS // SKIRMISHER",
      name: "Protocolo de Combate",
      summary: "Reposicionamento rápido. Consumo em movimento. Equipe coesa.",
      description:
        "Octane domina o ritmo do confronto: mantém mobilidade ao usar consumíveis, identifica oportunidades de reposicionamento e acelera a convergência de aliados que correm em sua direção.",
      icon: "/classes/skirmisher.svg",
      perks: ["Cápsulas em rota", "Consumo em movimento", "Impulso para aliados"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Estimulante",
        description:
          "Sacrifica parte da vida para ganhar velocidade por alguns segundos e atravessar o combate em ritmo extremo.",
        icon: "/abilities/octane-tactical.png",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Reparo Rápido",
        description:
          "Recupera vida gradualmente quando não está sofrendo dano, mantendo Octane pronto para a próxima corrida.",
        icon: "/abilities/octane-passive.png",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Suporte de Salto",
        description:
          "Implanta um trampolim que lança quem o utilizar pelo ar e cria rotas rápidas para todo o esquadrão.",
        icon: "/abilities/octane-ultimate.png",
        code: "ULT // 03",
      },
    ],
    accent: "#a3e635",
    accentRgb: "163 230 53",
  },
  pathfinder: {
    slug: "pathfinder",
    listIndex: 19,
    classification: "20 // MRVN",
    name: "Pathfinder",
    role: "Combate",
    classIcon: "/classes/skirmisher.svg",
    age: "77 anos",
    tagline: "MRVN em busca de respostas.",
    story:
      "Pathfinder despertou décadas atrás sem saber quem o havia criado. Otimista por programação — e por escolha —, o MRVN percorre as Terras Ermas ajudando desconhecidos enquanto procura a própria família.",
    extraStory:
      "Criado por cientistas para enfrentar a crise energética das Terras Ermas, ele descobriu que seu legado vai além da missão original. Cada combate, amizade e tirolesa o aproxima de novas pistas sobre quem veio antes — e quem pode vir depois.",
    metadata: [
      { label: "Identidade", value: "Pathfinder" },
      { label: "Origem", value: "Psamathe" },
      { label: "Estreia", value: "Pré-Temporada — 2019" },
    ],
    classProtocol: {
      code: "CLS // SKIRMISHER",
      name: "Protocolo de Combate",
      summary: "Reposicionamento rápido. Consumo em movimento. Equipe coesa.",
      description:
        "Pathfinder abre rotas para a equipe e transforma terreno em vantagem. A classe favorece movimentos rápidos, uso de consumíveis durante deslocamentos e a aproximação eficiente dos aliados.",
      icon: "/classes/skirmisher.svg",
      perks: ["Cápsulas em rota", "Consumo em movimento", "Impulso para aliados"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Gancho",
        description:
          "Dispara um gancho para alcançar posições elevadas, mudar de direção no ar e surpreender adversários.",
        icon: "/abilities/pathfinder-tactical.png",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Conhecimento Interno",
        description:
          "Usa sistemas de reconhecimento para reduzir a recarga da Tirolesa e fortalecer o próximo reposicionamento.",
        icon: "/abilities/pathfinder-passive.png",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Arma de Tirolesa",
        description:
          "Cria uma tirolesa de longa distância que pode ser utilizada por toda a equipe para atravessar o mapa.",
        icon: "/abilities/pathfinder-ultimate.png",
        code: "ULT // 03",
      },
    ],
    accent: "#38bdf8",
    accentRgb: "56 189 248",
  },
  rampart: {
    slug: "rampart",
    listIndex: 20,
    classification: "21 // MOD",
    name: "Rampart",
    role: "Controle",
    classIcon: "/classes/controller.svg",
    age: "23 anos",
    tagline: "Modder amplificada.",
    story:
      "Ramya Parekh construiu uma reputação nos circuitos clandestinos com equipamentos personalizados e uma língua tão afiada quanto suas ferramentas. Quando um ataque destruiu sua oficina, o convite para os Jogos Apex virou a chance de reconstruir seu nome.",
    extraStory:
      "Rampart transforma sucata em ouro e qualquer posição em uma fortaleza. Entre paredes amplificadas, metralhadoras modificadas e provocações incessantes, ela prova que a melhor arma é aquela que passou por sua bancada.",
    metadata: [
      { label: "Identidade", value: "Ramya Parekh" },
      { label: "Origem", value: "Gaea" },
      { label: "Estreia", value: "Temporada 6 — 2020" },
    ],
    classProtocol: {
      code: "CLS // CONTROLLER",
      name: "Protocolo de Controle",
      summary: "Leitura do Anel. Domínio de área. Fortificação de posição.",
      description:
        "Rampart transforma informação de zona em vantagem defensiva, encontra posições seguras com antecedência e sustenta o esquadrão atrás de estruturas fortificadas.",
      icon: "/classes/controller.svg",
      perks: ["Leitura do Anel", "Controle de área", "Fortificação tática"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Cobertura Amplificada",
        description:
          "Constrói uma barreira que bloqueia disparos recebidos e amplifica os tiros feitos através dela.",
        icon: "/abilities/rampart-tactical.svg",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Modder de Batalha",
        description:
          "Melhora capacidade, recarga e desempenho de metralhadoras leves, da Minigun e das paredes amplificadas.",
        icon: "/abilities/rampart-passive.svg",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Minigun Sheila",
        description:
          "Equipe ou posicione uma metralhadora de alta capacidade capaz de manter pressão contínua sobre uma área.",
        icon: "/abilities/rampart-ultimate.svg",
        code: "ULT // 03",
      },
    ],
    accent: "#3b82f6",
    accentRgb: "59 130 246",
  },
  revenant: {
    slug: "revenant",
    listIndex: 21,
    classification: "22 // DEATH",
    name: "Revenant",
    role: "Combate",
    classIcon: "/classes/skirmisher.svg",
    age: "359 anos",
    tagline: "Pesadelo sintético.",
    story:
      "Kaleb Cross foi o maior assassino do Sindicato Mercenário até descobrir que seu rosto humano era apenas uma mentira programada. Transformado em simulacro, Revenant atravessou séculos de mortes e renascimentos sem poder alcançar o fim que deseja.",
    extraStory:
      "Depois de caçar seus criadores e perder a chance de destruir a própria cabeça preservada, ele despertou novamente com habilidades desconhecidas. Agora, cada sombra endurecida e cada vítima o aproxima de quem ousou reconstruí-lo mais uma vez.",
    metadata: [
      { label: "Identidade", value: "Kaleb Cross" },
      { label: "Origem", value: "Desconhecida" },
      { label: "Estreia", value: "Temporada 4 — 2020" },
    ],
    classProtocol: {
      code: "CLS // SKIRMISHER",
      name: "Protocolo de Combate",
      summary: "Reposicionamento rápido. Consumo em movimento. Equipe coesa.",
      description:
        "Revenant usa mobilidade vertical e explosões de velocidade para perseguir alvos enfraquecidos, reposicionar-se e abrir uma rota agressiva para o esquadrão.",
      icon: "/classes/skirmisher.svg",
      perks: ["Cápsulas em rota", "Consumo em movimento", "Impulso para aliados"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Bote das Sombras",
        description:
          "Carrega e libera uma investida poderosa para frente, alcançando distâncias maiores quanto mais tempo for preparada.",
        icon: "/abilities/revenant-tactical.svg",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Instinto de Assassino",
        description:
          "Destaca inimigos próximos com pouca vida, melhora a escalada e aumenta a velocidade ao caminhar agachado.",
        icon: "/abilities/revenant-passive.svg",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Sombras Forjadas",
        description:
          "Cria uma mortalha de sombras endurecidas que bloqueia dano e começa a se regenerar após derrubadas.",
        icon: "/abilities/revenant-ultimate.svg",
        code: "ULT // 03",
      },
    ],
    accent: "#dc2626",
    accentRgb: "220 38 38",
  },
  seer: {
    slug: "seer",
    listIndex: 22,
    classification: "23 // HEART",
    name: "Seer",
    role: "Batedor",
    classIcon: "/classes/recon.svg",
    age: "27 anos",
    tagline: "Artista das emboscadas.",
    story:
      "Obi Edolasim nasceu sob um presságio que fez Boreas enxergar uma maldição onde seus pais viram uma alma sensível e criativa. Nas Arenas, Seer transformou o olhar desconfiado da multidão em admiração e deu voz a quem sempre viveu à margem.",
    extraStory:
      "Nos Jogos Apex, cada combate é uma apresentação construída com microdrones, batimentos cardíacos e precisão teatral. Ele continua lutando pelos não aceitos enquanto tenta reparar a relação com o planeta que ainda o culpa por sua lua destruída.",
    metadata: [
      { label: "Identidade", value: "Obi Edolasim" },
      { label: "Origem", value: "Boreas" },
      { label: "Estreia", value: "Temporada 10 — 2021" },
    ],
    classProtocol: {
      code: "CLS // RECON",
      name: "Protocolo de Batedor",
      summary: "Varredura segura. Visão de ameaça. Inteligência de campo.",
      description:
        "Seer lê o campo antes do confronto, usa Sinalizadores de Pesquisa sem expor sua localização e combina visão de ameaça com seus microdrones para rastrear movimentações.",
      icon: "/classes/recon.svg",
      perks: ["Varredura protegida", "Visão de ameaça", "Rastreamento de área"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Foco de Atenção",
        description:
          "Emite uma explosão de microdrones através de paredes que revela inimigos e concede impulso de velocidade ao acertar.",
        icon: "/abilities/seer-tactical.svg",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Busca de Coração",
        description:
          "Ouve e visualiza os batimentos cardíacos de inimigos próximos enquanto mira.",
        icon: "/abilities/seer-passive.svg",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Exposição",
        description:
          "Cria uma esfera de microdrones que revela inimigos em movimento rápido ou disparando dentro dela.",
        icon: "/abilities/seer-ultimate.svg",
        code: "ULT // 03",
      },
    ],
    accent: "#38bdf8",
    accentRgb: "56 189 248",
  },
  sparrow: {
    slug: "sparrow",
    listIndex: 23,
    classification: "24 // BOLT",
    name: "Sparrow",
    role: "Batedor",
    classIcon: "/classes/recon.svg",
    age: "20 anos",
    tagline: "Arqueiro ágil.",
    story:
      "Enea Davide Guarino nasceu no Clessidra Rossa, um clã de caçadores de recompensas conhecido por habilidade e rigidez. Talentoso demais para aceitar respostas simples, Sparrow escolheu seus próprios termos e acabou afastado da família que esperava que ele liderasse.",
    extraStory:
      "Recrutado enquanto caçava recompensas sozinho, ele encontrou nos Jogos Apex o lugar perfeito para testar seus limites. Entre saltos impossíveis, rastreadores e flechas energizadas, Sparrow espera conquistar glória suficiente para recuperar o respeito de casa.",
    metadata: [
      { label: "Identidade", value: "Enea Davide Guarino" },
      { label: "Origem", value: "Psamathe" },
      { label: "Estreia", value: "Temporada 25 — 2025" },
    ],
    classProtocol: {
      code: "CLS // RECON",
      name: "Protocolo de Batedor",
      summary: "Varredura segura. Visão de ameaça. Inteligência de campo.",
      description:
        "Sparrow combina reconhecimento de longa distância com Sinalizadores de Pesquisa protegidos, visão de ameaça e rastreadores capazes de confirmar uma rota antes da equipe avançar.",
      icon: "/classes/recon.svg",
      perks: ["Varredura protegida", "Visão de ameaça", "Rastreamento de área"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Dardo Rastreador",
        description:
          "Dispara uma armadilha que revela inimigos em sua linha de visão e ativa Sinalizadores de Pesquisa à distância.",
        icon: "/abilities/sparrow-tactical.svg",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Salto Duplo",
        description:
          "Permite um segundo salto no ar, impulsiona escaladas e amplia a capacidade de carregar flechas do Bocek.",
        icon: "/abilities/sparrow-passive.svg",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Ferrão de Balestra",
        description:
          "Fixa uma flecha carregada que libera pulsos de choque, causando dano e desacelerando quem estiver no alcance.",
        icon: "/abilities/sparrow-ultimate.svg",
        code: "ULT // 03",
      },
    ],
    accent: "#ef4444",
    accentRgb: "239 68 68",
  },
  valkyrie: {
    slug: "valkyrie",
    listIndex: 24,
    classification: "25 // VIPER",
    name: "Valkyrie",
    role: "Batedor",
    classIcon: "/classes/recon.svg",
    age: "31 anos",
    tagline: "Vingadora alada.",
    story:
      "Kairi Imahara cresceu tentando alcançar Viper, o pai e piloto de Titã que nunca voltou de uma missão. Anos de contrabando e voo a levaram até Kuben Blisk, mas a vingança deu lugar a um Cartão Apex e a uma chance de construir seu próprio legado.",
    extraStory:
      "Com o núcleo de voo da Northstar de Viper, Valkyrie construiu uma mochila a jato que transformou a memória do pai em liberdade. Nos Jogos, ela domina o espaço aéreo, abre rotas e ataca de onde ninguém consegue se esconder.",
    metadata: [
      { label: "Identidade", value: "Kairi Imahara" },
      { label: "Origem", value: "Angelia" },
      { label: "Estreia", value: "Temporada 9 — 2021" },
    ],
    classProtocol: {
      code: "CLS // RECON",
      name: "Protocolo de Batedor",
      summary: "Varredura segura. Visão de ameaça. Inteligência de campo.",
      description:
        "Valkyrie usa altura e visão de ameaça para reconhecer rotas, escaneia Sinalizadores de Pesquisa com segurança e guia o esquadrão até posições melhores.",
      icon: "/classes/recon.svg",
      perks: ["Varredura protegida", "Visão de ameaça", "Rastreamento de área"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Enxame de Mísseis",
        description:
          "Dispara uma formação de minimísseis que causa dano e desorienta inimigos na área atingida.",
        icon: "/abilities/valkyrie-tactical.svg",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Jatos VTOL",
        description:
          "Ativa uma mochila a jato para voar por tempo limitado, ganhar altura e obter visão de ameaça.",
        icon: "/abilities/valkyrie-passive.svg",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Salto Ascendente",
        description:
          "Lança Valkyrie e aliados conectados ao céu para atravessar grandes distâncias e reposicionar o esquadrão.",
        icon: "/abilities/valkyrie-ultimate.svg",
        code: "ULT // 03",
      },
    ],
    accent: "#f97316",
    accentRgb: "249 115 22",
  },
  vantage: {
    slug: "vantage",
    listIndex: 25,
    classification: "26 // SCOPE",
    name: "Vantage",
    role: "Batedor",
    classIcon: "/classes/recon.svg",
    age: "19 anos",
    tagline: "Atiradora prodígio.",
    story:
      "Xiomara ‘Mara’ Contreras cresceu isolada no planeta gelado Págos, aprendendo com a mãe a sobreviver onde qualquer erro poderia ser fatal. Quando descobriu que Xenia havia sido condenada injustamente, Mara entrou nos Jogos Apex para transformar cada disparo em atenção para a verdade.",
    extraStory:
      "Acompanhada pelo morcego Echo e por um rifle construído para longas distâncias, Vantage lê o campo antes que a luta comece. Sua precisão revela alvos, abre vantagens para a equipe e mantém viva a promessa de libertar a mãe.",
    metadata: [
      { label: "Identidade", value: "Xiomara ‘Mara’ Contreras" },
      { label: "Origem", value: "Págos" },
      { label: "Estreia", value: "Temporada 14 — 2022" },
    ],
    classProtocol: {
      code: "CLS // RECON",
      name: "Protocolo de Batedor",
      summary: "Varredura segura. Visão de ameaça. Inteligência de campo.",
      description:
        "Vantage combina observação de longo alcance com leitura de ameaças, escaneia Sinalizadores de Pesquisa com segurança e identifica as melhores rotas antes do confronto.",
      icon: "/classes/recon.svg",
      perks: ["Varredura protegida", "Visão de ameaça", "Rastreamento de área"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Reposicionamento do Echo",
        description:
          "Posiciona Echo e lança Vantage em direção ao companheiro alado, permitindo ganhar altura ou escapar rapidamente.",
        icon: "/abilities/vantage-tactical.svg",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Lente de Observação",
        description:
          "Analisa inimigos à distância, revela informações do esquadrão observado e oferece um indicador de queda de projétil.",
        icon: "/abilities/vantage-passive.svg",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Marca de Franco-atiradora",
        description:
          "Usa um rifle personalizado para marcar alvos, aumentando o dano causado por Vantage e pelo restante do esquadrão.",
        icon: "/abilities/vantage-ultimate.svg",
        code: "ULT // 03",
      },
    ],
    accent: "#ef4444",
    accentRgb: "239 68 68",
  },
  wattson: {
    slug: "wattson",
    listIndex: 26,
    classification: "27 // ARC",
    name: "Wattson",
    role: "Controle",
    classIcon: "/classes/controller.svg",
    age: "24 anos",
    tagline: "Defensora estática.",
    story:
      "Natalie Paquette cresceu entre circuitos e equações, ajudando o pai a projetar o Anel que tornou os Jogos Apex possíveis. Após a morte dele, as Lendas acolheram Wattson como família, e a arena que ela ajudou a construir tornou-se o lugar onde encontrou pertencimento.",
    extraStory:
      "Por trás do jeito gentil existe uma engenheira capaz de remodelar qualquer combate. Wattson fecha rotas com cercas eletrificadas, neutraliza projéteis e transforma posições vulneráveis em fortalezas para o esquadrão.",
    metadata: [
      { label: "Identidade", value: "Natalie Paquette" },
      { label: "Origem", value: "Solace" },
      { label: "Estreia", value: "Temporada 2 — 2019" },
    ],
    classProtocol: {
      code: "CLS // CONTROLLER",
      name: "Protocolo de Controle",
      summary: "Leitura do Anel. Domínio de área. Fortificação de posição.",
      description:
        "Wattson antecipa o próximo Anel, recebe proteção adicional dentro da zona segura e recolhe seus dispositivos à distância para reconstruir a defesa rapidamente.",
      icon: "/classes/controller.svg",
      perks: ["Leitura do Anel", "Sobrecarga de escudo", "Recuperação remota"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Segurança de Perímetro",
        description:
          "Conecta nodos para criar cercas eletrificadas que causam dano, desaceleram inimigos e controlam passagens.",
        icon: "/abilities/wattson-tactical.svg",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Carregamento Relâmpago",
        description:
          "Aceleradores de Suprema recarregam totalmente sua habilidade suprema, enquanto seus escudos se regeneram gradualmente.",
        icon: "/abilities/wattson-passive.svg",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Torre Interceptora",
        description:
          "Posiciona uma torre eletrificada que destrói projéteis próximos e repara os escudos danificados do esquadrão.",
        icon: "/abilities/wattson-ultimate.svg",
        code: "ULT // 03",
      },
    ],
    accent: "#38bdf8",
    accentRgb: "56 189 248",
  },
  wraith: {
    slug: "wraith",
    listIndex: 27,
    classification: "28 // PHASE",
    name: "Wraith",
    role: "Combate",
    classIcon: "/classes/skirmisher.svg",
    age: "34 anos",
    tagline: "Combatente interdimensional.",
    story:
      "Renee Hope Blasey despertou em uma instalação da IMC sem lembranças, cercada por vozes de outras versões de si mesma. Uma dessas vozes ensinou Wraith a atravessar o Vazio e a escapar, iniciando uma busca obstinada pela cientista que existiu antes dos experimentos.",
    extraStory:
      "Cada instalação abandonada e cada portal aberto aproxima Wraith da verdade, mesmo quando ela teme o que poderá encontrar. Nos Jogos, suas fendas reposicionam toda a equipe e transformam o próprio espaço em uma rota de ataque.",
    metadata: [
      { label: "Identidade", value: "Renee Hope Blasey" },
      { label: "Origem", value: "Typhon" },
      { label: "Estreia", value: "Pré-temporada — 2019" },
    ],
    classProtocol: {
      code: "CLS // SKIRMISHER",
      name: "Protocolo de Combate",
      summary: "Reposicionamento rápido. Consumo em movimento. Equipe coesa.",
      description:
        "Wraith atravessa confrontos com velocidade, usa consumíveis em movimento e cria rotas dimensionais que aceleram a aproximação de aliados.",
      icon: "/classes/skirmisher.svg",
      perks: ["Movimento com consumíveis", "Impulso para aliados", "Acesso a cápsulas"],
    },
    abilities: [
      {
        type: "Habilidade tática",
        name: "Adentrando o Vazio",
        description:
          "Reposiciona Wraith rapidamente pela segurança do espaço vazio, protegendo-a de todo o dano durante a travessia.",
        icon: "/abilities/wraith-tactical.svg",
        code: "TAC // 01",
      },
      {
        type: "Habilidade passiva",
        name: "Vozes do Vazio",
        description:
          "Vozes de outras dimensões avisam Wraith quando o perigo se aproxima ou quando alguém mira em sua direção.",
        icon: "/abilities/wraith-passive.svg",
        code: "PAS // 02",
      },
      {
        type: "Habilidade suprema",
        name: "Fenda Dimensional",
        description:
          "Conecta dois locais com portais que podem ser usados por toda a equipe para atacar, escapar ou reposicionar.",
        icon: "/abilities/wraith-ultimate.svg",
        code: "ULT // 03",
      },
    ],
    accent: "#8b5cf6",
    accentRgb: "139 92 246",
  },
};

export default function LegendDetailPanel({
  detailSlug,
  onBack,
}: {
  detailSlug: LegendDetailData["slug"];
  onBack: () => void;
}) {
  const detail = legendDetails[detailSlug];
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClassExpanded, setIsClassExpanded] = useState(false);
  const [selectedAbility, setSelectedAbility] = useState(0);
  const [previewAbility, setPreviewAbility] = useState<number | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const abilityRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const onBackRef = useRef(onBack);
  const activeAbility = detail.abilities[previewAbility ?? selectedAbility];
  const titleId = `${detail.slug}-detail-title`;
  const abilitiesTitleId = `${detail.slug}-abilities-title`;
  const abilityDescriptionId = `${detail.slug}-ability-description`;

  useEffect(() => {
    onBackRef.current = onBack;
  }, [onBack]);

  useEffect(() => {
    const focusFrame = requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      event.preventDefault();
      onBackRef.current();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const selectAbilityFromKeyboard = (index: number) => {
    setSelectedAbility(index);
    setPreviewAbility(null);
    abilityRefs.current[index]?.focus();
  };

  return (
    <div
      className={`legend-detail legend-detail--${detail.slug}`}
      role="region"
      aria-labelledby={titleId}
      style={
        {
          "--detail-accent": detail.accent,
          "--detail-accent-rgb": detail.accentRgb,
        } as CSSProperties
      }
    >
      <article className="legend-detail__content">
        <div className="legend-detail__heading">
          <p className="legend-detail__classification">{detail.classification}</p>
          <h1 id={titleId} ref={headingRef} tabIndex={-1}>
            {detail.name}
          </h1>
          <span className="legend-detail__role">
            <span
              className="legend-class-icon"
              aria-hidden="true"
              style={
                {
                  "--class-icon": `url("${detail.classIcon}")`,
                } as CSSProperties
              }
            />
            {detail.role}
          </span>
        </div>

        <p className="legend-detail__age">{detail.age}</p>
        <p className="legend-detail__tagline">{detail.tagline}</p>

        <div className={`legend-detail__story ${isExpanded ? "is-expanded" : ""}`}>
          <p>{detail.story}</p>

          {isExpanded ? (
            <div className="legend-detail__story-extra">
              <p>{detail.extraStory}</p>

              <dl className="legend-detail__metadata">
                {detail.metadata.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
        </div>

        <button
          className="legend-detail__more"
          type="button"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((expanded) => !expanded)}
        >
          {isExpanded ? "Recolher" : "Mostrar dossiê"}
        </button>

        {detail.classProtocol ? (
          <section
            className={`legend-class-perk ${isClassExpanded ? "is-expanded" : ""}`}
            aria-label={`Vantagens da classe ${detail.role}`}
          >
            <button
              className="legend-class-perk__trigger"
              type="button"
              aria-expanded={isClassExpanded}
              aria-controls={`${detail.slug}-class-protocol`}
              onClick={() => setIsClassExpanded((expanded) => !expanded)}
            >
              <span className="legend-class-perk__icon" aria-hidden="true">
                <Image
                  src={detail.classProtocol.icon}
                  alt=""
                  width={48}
                  height={48}
                />
              </span>

              <span className="legend-class-perk__copy">
                <span>
                  Protocolo de classe <i>{detail.classProtocol.code}</i>
                </span>
                <strong>{detail.classProtocol.name}</strong>
                <small>{detail.classProtocol.summary}</small>
              </span>

              <span className="legend-class-perk__toggle" aria-hidden="true">
                {isClassExpanded ? "−" : "+"}
              </span>
            </button>

            {isClassExpanded ? (
              <div
                className="legend-class-perk__panel"
                id={`${detail.slug}-class-protocol`}
              >
                <p>{detail.classProtocol.description}</p>
                <div className="legend-class-perk__tags" aria-label="Benefícios">
                  {detail.classProtocol.perks.map((perk) => (
                    <span key={perk}>{perk}</span>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        ) : null}

        <section className="legend-abilities" aria-labelledby={abilitiesTitleId}>
          <div className="legend-abilities__header">
            <p id={abilitiesTitleId}>Kit de habilidades</p>
            <span>{activeAbility.code}</span>
          </div>

          <div
            className="legend-abilities__icons"
            role="tablist"
            aria-label={`Habilidades de ${detail.name}`}
          >
            {detail.abilities.map((ability, index) => (
              <button
                className={`legend-ability ${
                  index === (previewAbility ?? selectedAbility) ? "is-active" : ""
                }`}
                key={ability.name}
                id={`${detail.slug}-ability-tab-${index}`}
                ref={(element) => {
                  abilityRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                aria-selected={index === selectedAbility}
                aria-controls={abilityDescriptionId}
                tabIndex={index === selectedAbility ? 0 : -1}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setPreviewAbility(index);
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType === "mouse") setPreviewAbility(null);
                }}
                onFocus={() => setPreviewAbility(index)}
                onBlur={() => setPreviewAbility(null)}
                onClick={() => setSelectedAbility(index)}
                onKeyDown={(event) => {
                  let nextIndex: number | null = null;

                  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                    nextIndex = (index + 1) % detail.abilities.length;
                  } else if (
                    event.key === "ArrowLeft" ||
                    event.key === "ArrowUp"
                  ) {
                    nextIndex =
                      (index - 1 + detail.abilities.length) %
                      detail.abilities.length;
                  } else if (event.key === "Home") {
                    nextIndex = 0;
                  } else if (event.key === "End") {
                    nextIndex = detail.abilities.length - 1;
                  }

                  if (nextIndex === null) return;

                  event.preventDefault();
                  selectAbilityFromKeyboard(nextIndex);
                }}
              >
                <Image
                  src={ability.icon}
                  alt=""
                  width={76}
                  height={76}
                />
                <span>{ability.type.replace("Habilidade ", "")}</span>
              </button>
            ))}
          </div>

          <div
            className="legend-ability-detail"
            id={abilityDescriptionId}
            role="tabpanel"
            aria-labelledby={`${detail.slug}-ability-tab-${selectedAbility}`}
            key={activeAbility.name}
          >
            <p>{activeAbility.type}</p>
            <h2>{activeAbility.name}</h2>
            <span>{activeAbility.description}</span>
          </div>
        </section>
      </article>

      <button
        className="legend-back"
        type="button"
        aria-label="Voltar ao arquivo de lendas"
        onClick={onBack}
      >
        <span className="legend-back__arrow" />
        <span className="legend-back__label">Voltar</span>
      </button>
    </div>
  );
}
