// Exporting module: State manager&keeper

// let dictionary = {
//   "english": {
//     "acute": "острый",
//     "immaculate": "безупречный",
//     "perplexed": "озадаченный",
//     "pious": "благочестивый",
//     "adhere": "придерживаться",
//     "resilience": "устойчивость",
//     "impartial": "беспристрастный",
//     "allegations": "обвинения",
//     "mitigate": "смягчать",
//     "exacerbate": "обострять",
//     "austerity": "тщательность",
//     "implications": "последствия",
//   },
//   "spanish": {
//     "Desarrollo": "Development",
//     "Código": "Code",
//     "Depuración": "Debugging",
//     "Algoritmo": "Algorithm",
//     "Seguridad": "Security",
//     "Red ": "Grid",
//     "Base de datos": "Database",
//     "Programsdor": "Programmer",
//     "Arquitectura": "Architecture",
//     "Despliegue": "Deployment",
//     "Escalabilidad": "Scalability",
//   },
//   "french": {
//     "Réseau": "Network",
//     "Base de données": "Database",
//     "Déploiement": "Deployment",
//     "Logiciel": "Software",
//     "Sauvegarde": "Backup",
//     "RIntelligence artificielle": "Artificial intelligence",
//     "Récursivité": "Recursion",
//     "Promesse": "Promise",
//     "Tableau": "Array",
//     "Événement": "Event",
//     "Boucle": "Loop",
//   },
// };

const dictionary = [
  {
    set: "english",
    cards: [
      ["acute", "острый"],
      ["perplexed", "озадаченный"],
      ["pious", "благочестивый"],
      ["adhere", "придерживаться"],
      ["resilience", "устойчивость"],
      ["impartial", "беспристрастный"],
      ["allegations", "обвинения"],
      ["mitigate", "смягчать"],
      ["exacerbate", "обострять"],
      ["austerity", "тщательность"],
      ["implications", "последствия"],
    ],
  },
  {
    set: "spanish",
    cards: [
      ["Desarrollo", "Development"],
      ["Código", "Code"],
      ["Depuración", "Debugging"],
      ["Algoritmo", "Algorithm"],
      ["Seguridad", "Security"],
      ["Red ", "Grid"],
      ["Base de datos", "Database"],
      ["Programador", "Programmer"],
      ["Arquitectura", "Architecture"],
      ["Despliegue", "Deployment"],
      ["Escalabilidad", "Scalability"],
    ],
  },
  {
    set: "french",
    cards: [
      ["réseau", "network"],
      ["base de données", "database"],
      ["Déploiement", "Deployment"],
      ["Logiciel", "Software"],
      ["Sauvegarde", "Backup"],
      ["intelligence artificielle", "artificial intelligence"],
      ["Récursivité", "Recursion"],
      ["Promesse", "Promise"],
      ["Tableau", "Array"],
      ["Événement", "Event"],
      ["Boucle", "Loop"],
    ],
  },
];

let counter = 0;
let curSet = null;

export default {
  counter,
  dictionary,
  curSet,
};
