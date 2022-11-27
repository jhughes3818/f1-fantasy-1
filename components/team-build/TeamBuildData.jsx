const TeamBuildData = [
  {
    id: 1,
    name: "Lewis Hamilton",
    team: "Mercedes",
    seasonPoints: 100,
    price: 9,
    overtakes: 5,
    bestRaceResult: 4,
    bestQualifyingResult: 4,
    results: [],
  },
  {
    id: 2,
    name: "George Russell",
    team: "Mercedes",
    seasonPoints: 100,
    price: 5,
    overtakes: 5,
    bestRaceResult: 4,
    bestQualifyingResult: 4,
    results: [],
  },

  {
    id: 3,
    name: "Max Verstappen",
    team: "Red Bull Racing",
    seasonPoints: 100,
    price: 12,
    overtakes: 5,
    bestRaceResult: 4,
    bestQualifyingResult: 4,
    results: [],
  },
  {
    id: 4,
    name: "Sergio Pérez",
    team: "Red Bull Racing",
    seasonPoints: 100,
    price: 6,
    overtakes: 5,
    bestRaceResult: 4,
    bestQualifyingResult: 4,
    results: [],
  },

  {
    id: 5,
    name: "Charles Leclerc",
    team: "Ferrari",
    seasonPoints: 100,
    price: 6.2,
    overtakes: 5,
    bestRaceResult: 4,
    bestQualifyingResult: 4,
    results: [],
  },
  {
    id: 6,
    name: "Carlos Sainz",
    team: "Ferrari",
    seasonPoints: 100,
    price: 5.4,
    overtakes: 5,
    bestRaceResult: 4,
    bestQualifyingResult: 4,
    results: [],
  },

  {
    id: 7,
    name: "Lando Norris",
    team: "McLaren",
    seasonPoints: 100,
    price: 5.9,
    overtakes: 5,
    bestRaceResult: 4,
    bestQualifyingResult: 4,
    results: [],
  },
  {
    id: 8,
    name: "Daniel Ricciardo",
    team: "McLaren",
    seasonPoints: 100,
    price: 4,
    overtakes: 5,
    bestRaceResult: 4,
    bestQualifyingResult: 4,
    results: [],
  },

  {
    id: 9,
    name: "Sebastian Vettel",
    team: "Aston Martin",
    seasonPoints: 100,
    price: 6,
    overtakes: 5,
    bestRaceResult: 4,
    bestQualifyingResult: 4,
    results: [],
  },
  {
    id: 10,
    name: "Lance Stroll",
    team: "Aston Martin",
    seasonPoints: 100,
    price: 3,
    overtakes: 5,
    bestRaceResult: 4,
    bestQualifyingResult: 4,
    results: [],
  },

  {
    id: 11,
    name: "Fernando Alonso",
    team: "Alpine",
    seasonPoints: 100,
    price: 7,
    overtakes: 5,
    bestRaceResult: 4,
    bestQualifyingResult: 4,
    results: [],
  },
  {
    id: 12,
    name: "Esteban Ocon",
    team: "Alpine",
    seasonPoints: 100,
    price: 5,
    overtakes: 5,
    bestRaceResult: 4,
    bestQualifyingResult: 4,
    results: [],
  },

  {
    id: 13,
    name: "Yuki Tsunoda",
    team: "Alpha Tauri",
    seasonPoints: 100,
    price: 5,
    overtakes: 5,
    bestRaceResult: 4,
    bestQualifyingResult: 4,
    results: [],
  },
  {
    id: 14,
    name: "Pierre Gasly",
    team: "Alpha Tauri",
    seasonPoints: 100,
    price: 6,
    overtakes: 5,
    bestRaceResult: 4,
    bestQualifyingResult: 4,
    results: [],
  },

  {
    id: 15,
    name: "Valtteri Bottas",
    team: "Alfa Romeo",
    seasonPoints: 100,
    price: 7,
    overtakes: 5,
    bestRaceResult: 4,
    bestQualifyingResult: 4,
    results: [],
  },
  {
    id: 16,
    name: "Guanyu Zhou",
    team: "Alfa Romeo",
    seasonPoints: 100,
    price: 5,
    overtakes: 5,
    bestRaceResult: 4,
    bestQualifyingResult: 4,
    results: [],
  },

  {
    id: 17,
    name: "Alexander Albon",
    team: "Williams",
    seasonPoints: 100,
    price: 3,
    overtakes: 5,
    bestRaceResult: 4,
    bestQualifyingResult: 4,
    results: [],
  },
  {
    id: 18,
    name: "Nicholas Latifi",
    team: "Williams",
    seasonPoints: 100,
    price: 2,
    overtakes: 5,
    bestRaceResult: 4,
    bestQualifyingResult: 4,
    results: [],
  },

  {
    id: 19,
    name: "Mick Schumacher",
    team: "Haas",
    seasonPoints: 100,
    price: 4,
    overtakes: 5,
    bestRaceResult: 4,
    bestQualifyingResult: 4,
    results: [],
  },
  {
    id: 20,
    name: "Kevin Magnussen",
    team: "Haas",
    seasonPoints: 100,
    price: 5,
    overtakes: 5,
    bestRaceResult: 4,
    bestQualifyingResult: 4,
    results: [],
  },
];

const TeamBuildDataDB = [
  [
    {
      name: "mer",
      drivers: [
        {
          id: 1,
          name: "Lewis Hamilton",
          seasonPoints: 100,
          price: 9,
          overtakes: "5",
          bestRaceResult: "4th",
          bestQualifyingResult: "4th",
        },
        {
          id: 2,
          name: "George Russell",
          seasonPoints: 100,
          price: 5,
          overtakes: "5",
          bestRaceResult: "4th",
          bestQualifyingResult: "4th",
        },
      ],
    },
  ],
  [
    {
      name: "rbr",
      drivers: [
        {
          id: 3,
          name: "Max Verstappen",
          seasonPoints: 100,
          price: 12,
          overtakes: "5",
          bestRaceResult: "4th",
          bestQualifyingResult: "4th",
        },
        {
          id: 4,
          name: "Sergio Perez",
          seasonPoints: 100,
          price: 6,
          overtakes: "5",
          bestRaceResult: "4th",
          bestQualifyingResult: "4th",
        },
      ],
    },
  ],
  [
    {
      name: "fer",
      drivers: [
        {
          id: 5,
          name: "Charles Leclerc",
          seasonPoints: 100,
          price: 6.2,
          overtakes: "5",
          bestRaceResult: "4th",
          bestQualifyingResult: "4th",
        },
        {
          id: 6,
          name: "Carlos Sainz",
          seasonPoints: 100,
          price: 5.4,
          overtakes: "5",
          bestRaceResult: "4th",
          bestQualifyingResult: "4th",
        },
      ],
    },
  ],
  [
    {
      name: "mcl",
      drivers: [
        {
          id: 7,
          name: "Lando Norris",
          seasonPoints: 100,
          price: 5.9,
          overtakes: "5",
          bestRaceResult: "7th",
          bestQualifyingResult: "5th",
        },
        {
          id: 8,
          name: "Daniel Ricciardo",
          seasonPoints: 100,
          price: 4,
          overtakes: "77",
          bestRaceResult: "4th",
          bestQualifyingResult: "4th",
        },
      ],
    },
  ],
  [
    {
      name: "amr",
      drivers: [
        {
          id: 9,
          name: "Sebastien Vettel",
          seasonPoints: 100,
          price: 6,
          overtakes: "5",
          bestRaceResult: "4th",
          bestQualifyingResult: "4th",
        },
        {
          id: 10,
          name: "Lance Stroll",
          seasonPoints: 100,
          price: 3,
          overtakes: "5",
          bestRaceResult: "4th",
          bestQualifyingResult: "4th",
        },
      ],
    },
  ],
  [
    {
      name: "alp",
      drivers: [
        {
          id: 11,
          name: "Fernando Alonso",
          seasonPoints: 100,
          price: 7,
          overtakes: "5",
          bestRaceResult: "4th",
          bestQualifyingResult: "4th",
        },
        {
          id: 12,
          name: "Esteban Ocon",
          seasonPoints: 100,
          price: 5,
          overtakes: "5",
          bestRaceResult: "4th",
          bestQualifyingResult: "4th",
        },
      ],
    },
  ],
  [
    {
      name: "atr",
      drivers: [
        {
          id: 13,
          name: "Yuki Tsunoda",
          seasonPoints: 100,
          price: 5,
          overtakes: "5",
          bestRaceResult: "4th",
          bestQualifyingResult: "4th",
        },
        {
          id: 14,
          name: "Pierre Gasly",
          seasonPoints: 100,
          price: 6,
          overtakes: "5",
          bestRaceResult: "4th",
          bestQualifyingResult: "4th",
        },
      ],
    },
  ],
  [
    {
      name: "ars",
      drivers: [
        {
          id: 15,
          name: "Valterri Bottas",
          seasonPoints: 100,
          price: 7,
          overtakes: "5",
          bestRaceResult: "4th",
          bestQualifyingResult: "4th",
        },
        {
          id: 16,
          name: "Guanyu Zhou",
          seasonPoints: 100,
          price: 5,
          overtakes: "5",
          bestRaceResult: "4th",
          bestQualifyingResult: "4th",
        },
      ],
    },
  ],
  [
    {
      name: "wil",
      drivers: [
        {
          id: 17,
          name: "Alexander Albon",
          seasonPoints: 100,
          price: 3,
          overtakes: "5",
          bestRaceResult: "4th",
          bestQualifyingResult: "4th",
        },
        {
          id: 18,
          name: "Nicholas Latifi",
          seasonPoints: 100,
          price: 2,
          overtakes: "5",
          bestRaceResult: "4th",
          bestQualifyingResult: "4th",
        },
      ],
    },
  ],
  [
    {
      name: "haa",
      drivers: [
        {
          id: 19,
          name: "Mick Schmuacher",
          seasonPoints: 100,
          price: 4,
          overtakes: "5",
          bestRaceResult: "4th",
          bestQualifyingResult: "4th",
        },
        {
          id: 20,
          name: "Kevin Magnussen",
          seasonPoints: 100,
          price: 5,
          overtakes: "5",
          bestRaceResult: "4th",
          bestQualifyingResult: "4th",
        },
      ],
    },
  ],
];

//const TeamBuildDataDB = [{}];

export { TeamBuildData, TeamBuildDataDB };
