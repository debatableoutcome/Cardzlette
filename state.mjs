// Exporting module: State manager&keeper

let dictionary = {
  "english": {
    "acute": "острый",
    "immaculate": "безупречный",
    "perplexed": "озадаченный",
    "pious": "благочестивый",
    "adhere": "придерживаться",
  },
  "spanish": {
    "Desarrollo": "Development",
    "Código": "Code",
    "Depuración": "Debugging",
    "Algoritmo": "Algorithm",
    "Seguridad": "Security",
    "Red ": "Development",
    "Base de datos": "Network",
    "Depuración": "Database",
    "Arquitectura": "Architecture",
    "Despliegue": "Deployment",
    "Escalabilidad": "Scalability",
  },
  "french": {
    "Réseau": "Network",
    "Base de données": "Database",
    "Déploiement": "Deployment",
    "Logiciel": "Software",
    "Sauvegarde": "Backup",
    "RIntelligence artificielle": "Artificial intelligence",
    "Récursivité": "Recursion",
    "Promesse": "Promise",
    "Tableau": "Array",
    "Événement": "Event",
    "Boucle": "Loop",
  },
};

let counter = 0;
let curSet = null;
// let curDeck = new Map();

export default {
  counter,
  dictionary,
  curSet,
};
