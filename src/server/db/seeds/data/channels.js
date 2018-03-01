const channels = [
  {
    id: 1,
    name: 'Sony Channel Turkiye',
    menu: ['programs', 'tv_guide', 'videos', 'live_feed', 'galleries'],
    locale: 'tr_TR',
    is_default: true,
  },
  {
    id: 2,
    name: 'Sony Crime Channel',
    menu: ['programs', 'tv_guide', 'galleries', 'news', 'games_and_more'],
    locale: 'en_GB',
    is_default: true,
  },
  {
    id: 3,
    name: 'Sony Movie Channel',
    menu: ['programs', 'tv_guide', 'galleries', 'quizzes', 'videos', 'news'],
    locale: 'en_GB',
  },
  {
    id: 4,
    name: 'Sony Channel Deutschland',
    locale: 'de_DE',
    menu: ['programs', 'tv_guide', 'videos', 'live_feed', 'galleries'],
    is_default: true,
  },
];

module.exports = { channels };
