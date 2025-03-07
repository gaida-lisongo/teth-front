export const MOCK_USER = {
  id: '1',
  pseudo: 'JohnDoe',
  email: 'john@example.com',
  phone: '+243123456789',
  avatar: null,
  balance: 15000,
  pieces: 8,
  stats: {
    gamesPlayed: 12,
    correctAnswers: 28,
    wrongAnswers: 8,
  }
};

export const MOCK_TOKENS = [
  {
    id: '1',
    name: 'Jeton Etoile',
    description: '10 pièces + 3 offertes',
    price: 5000,
    pieces: 10,
    bonus: 3,
    icon: 'star'
  },
  {
    id: '2',
    name: 'Jeton Diamant',
    description: '25 pièces + 5 offertes',
    price: 12500,
    pieces: 25,
    bonus: 5,
    icon: 'diamond'
  },
  {
    id: '3',
    name: 'Jeton Esengo',
    description: '60 pièces + 10 offertes',
    price: 30000,
    pieces: 60,
    bonus: 10,
    icon: 'crown'
  },
  {
    id: '4',
    name: 'Jeton Or',
    description: '100 pièces + 20 offertes',
    price: 50000,
    pieces: 100,
    bonus: 20,
    icon: 'trophy'
  },
  {
    id: '5',
    name: 'Jeton Platine',
    description: '200 pièces + 50 offertes',
    price: 100000,
    pieces: 200,
    bonus: 50,
    icon: 'award'
  }
];

export const MOCK_LEADERBOARD = [
  { id: '1', pseudo: 'Champion123', score: 45000 },
  { id: '2', pseudo: 'BrainMaster', score: 38000 },
  { id: '3', pseudo: 'QuizKing', score: 32000 },
  { id: '4', pseudo: 'SmartPlayer', score: 28000 },
  { id: '5', pseudo: 'TopQuizzer', score: 25000 },
];

export const MOCK_CATEGORIES = [
  {
    id: '1',
    name: 'Culture Générale',
    icon: 'book',
    color: '#4A90E2',
    description: 'Questions variées sur différents sujets',
  },
  {
    id: '2',
    name: 'Sport',
    icon: 'futbol',
    color: '#50C878',
    description: 'Football, basketball, tennis et plus',
  },
  {
    id: '3',
    name: 'Histoire',
    icon: 'monument',
    color: '#C17E61',
    description: 'Événements et personnages historiques',
  },
  {
    id: '4',
    name: 'Géographie',
    icon: 'globe-africa',
    color: '#3498DB',
    description: 'Pays, capitales et découvertes',
  },
  {
    id: '5',
    name: 'Sciences',
    icon: 'flask',
    color: '#9B59B6',
    description: 'Physique, chimie et biologie',
  },
  {
    id: '6',
    name: 'Divertissement',
    icon: 'theater-masks',
    color: '#F39C12',
    description: 'Cinéma, musique, séries et plus',
  }
];

export const ONBOARDING_SLIDES = [
  {
    id: '1',
    title: 'Bienvenue sur Teth',
    description: `La plateforme qui vous permet de gagner de l'argent grâce à vos connaissances`,
    image: require('@/assets/images/onboarding/slide1.jpeg'),
    color: '#041cd7'
  },
  {
    id: '2',
    title: 'Comment ça marche ?',
    description: 'Répondez à des questions sur différents sujets dans un temps limité. Chaque bonne réponse vous rapproche du gain !',
    image: require('@/assets/images/onboarding/slide2.png'),
    color: '#de8015'
  },
  {
    id: '3',
    title: 'Vos Jetons',
    description: 'Achetez des jetons pour jouer des parties. Une partie = Une pièce. Gagnez jusqu\'à 3000 Fc par partie !',
    image: require('@/assets/images/onboarding/slide3.png'),
    color: '#041cd7'
  },
  {
    id: '4',
    title: 'Prêt à commencer ?',
    description: 'Inscrivez-vous et recevez 3 pièces gratuites pour commencer votre aventure !',
    image: require('@/assets/images/onboarding/slide4.jpeg'),
    color: '#de8015'
  },
];