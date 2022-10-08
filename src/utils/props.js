export const socials = [
  {title: "Twitter", href: "404.html", icon: ""},
  {title: "Facebook", href: "404.html", icon: ""},
  {title: "Instagram", href: "404.html", icon: ""},
];
export const footerLinks = {
  navigation: [
    {title: 'О нас', href: '404.html'},
    {title: 'Новости', href: '404.html'},
    {title: 'Служба поддержки', href: '404.html'},
    {title: 'Услуги', href: '404.html'},
  ],
  aboutUs: [
    {title: 'О сервисе', href: '404.html'},
    {title: 'Наша команда', href: '404.html'},
    {title: 'Вакансии', href: '404.html'},
    {title: 'Инвесторы', href: '404.html'},
  ],
  support: [
    {title: 'Соглашения', href: '404.html'},
    {title: 'Сообщества', href: '404.html'},
    {title: 'Связь с нами', href: '404.html'},
  ],
};
export const headerLinks = [
  {title: "О нас", href: "/aboutUs.html", bold: true},
  {title: "Услуги", href: "/services.html", expandable: true, items:
      [
        {title: "Услуги 1", href: "/services1.html"},
        {title: "Услуги 2", href: "/services2.html"},
        {title: "Услуги 3", href: "/services3.html"},
      ]
  },
  {title: "Вакансии", href: "/vacancies.html"},
  {title: "Новости", href: "/news.html"},
  {title: "Соглашения", href: "/agreements.html", expandable: true, items:
      [
        {title: "Соглашение 1", href: "/agreement1.html"},
        {title: "Соглашение 2", href: "/agreement2.html"},
        {title: "Соглашение 3", href: "/agreement3.html"},
      ]
  },
];
export const selectedRoomData = {
  comments: [
    {
      img: "img/avatars/man.jpg",
      userName: "Мурад Сарафанов",
      commentDate: "5 дней назад",
      liked: true,
      likeCount: 12,
      commentText: "Великолепный матрас на кровати в основной спальне! А пуфик вообще потрясающий. И стены, действительно, шумоподавляющие. Выкрикивал комплименты повару — никто не жаловался из соседей."
    },
    {
      img: "img/avatars/woman.jpg",
      userName: "Патрисия Стёклышкова",
      commentDate: "Неделю назад",
      likeCount: 2,
      commentText: "Обслуживание на высоте! Всё аккуратно, чисто. Завтраки в номер советую заказать, каждый день новое блюдо и десерт как комплимент"
    }
  ],
  votes: [
    {title: "Великолепно", value: 130},
    {title: "Хорошо", value: 65},
    {title: "Удовлетворительно", value: 65},
    {title: "Разочарован", value: 0}
  ],
  rules: [
    {title: "Нельзя с питомцами"},
    {title: "Без вечеринок и мероприятий"},
    {title: "Время прибытия — после 13:00, а выезд до 12:00"}
  ],
  details: [
    {icon: "insert_emoticon", title: "Комфорт", subtitle: "Шумопоглощающие стены"},
    {icon: "location_city", title: "Удобство", subtitle: "Окно в каждой из спален"},
    {icon: "whatshot", title: "Уют", subtitle: "Номер оснащён камином"}
  ],
  cancelRule: 'Бесплатная отмена в течение 48 ч. После этого при отмене не позднее чем за 5 дн. до прибытия вы получите полный возврат за вычетом сбора за услуги.'
};
export const selectedRoomCardData = {
  priceListItems: [
    {price: 39960, info: false, title: "9 990₽ х 4 суток"},
    {price: 0, info: true, title: "Сбор за услуги: скидка 2 179₽"},
    {price: 300, info: true, title: "Сбор за дополнительные услуги"},
  ],
  priceTotal: 38081,
};
export const roomsArray = [
  {img: [
      {src: "img/rooms/room-1-thumbnail.jpg", alt: "Фотография комнаты №1"},
      {src: "img/rooms/room-2-thumbnail.jpg", alt: "Фотография комнаты №2"},
      {src: "img/rooms/room-3-thumbnail.jpg", alt: "Фотография комнаты №3"},
      {src: "img/rooms/room-4-thumbnail.jpg", alt: "Фотография комнаты №4"}
    ],
    rate: 5, price: 9900, comments: 145, number: 888, type: "Люкс"},
  {img: [
      {src: "img/rooms/room-2-thumbnail.jpg", alt: "Фотография комнаты №1"},
      {src: "img/rooms/room-3-thumbnail.jpg", alt: "Фотография комнаты №2"},
      {src: "img/rooms/room-4-thumbnail.jpg", alt: "Фотография комнаты №3"},
      {src: "img/rooms/room-5-thumbnail.jpg", alt: "Фотография комнаты №4"}
    ],
    rate: 4, price: 9900, comments: 65, number: 840},
  {img: [
      {src: "img/rooms/room-3-thumbnail.jpg", alt: "Фотография комнаты №1"},
      {src: "img/rooms/room-4-thumbnail.jpg", alt: "Фотография комнаты №2"},
      {src: "img/rooms/room-5-thumbnail.jpg", alt: "Фотография комнаты №3"},
      {src: "img/rooms/room-6-thumbnail.jpg", alt: "Фотография комнаты №4"}
    ],
    rate: 3, price: 8500, comments: 35, number: 980},
  {img: [
      {src: "img/rooms/room-4-thumbnail.jpg", alt: "Фотография комнаты №1"},
      {src: "img/rooms/room-5-thumbnail.jpg", alt: "Фотография комнаты №2"},
      {src: "img/rooms/room-6-thumbnail.jpg", alt: "Фотография комнаты №3"},
      {src: "img/rooms/room-7-thumbnail.jpg", alt: "Фотография комнаты №4"}
    ],
    rate: 5, price: 7300, comments: 19, number: 856},
  {img: [
      {src: "img/rooms/room-5-thumbnail.jpg", alt: "Фотография комнаты №1"},
      {src: "img/rooms/room-6-thumbnail.jpg", alt: "Фотография комнаты №2"},
      {src: "img/rooms/room-7-thumbnail.jpg", alt: "Фотография комнаты №3"},
      {src: "img/rooms/room-8-thumbnail.jpg", alt: "Фотография комнаты №4"}
    ],
    rate: 4, price: 6000, comments: 44, number: 740},
  {img: [
      {src: "img/rooms/room-6-thumbnail.jpg", alt: "Фотография комнаты №1"},
      {src: "img/rooms/room-7-thumbnail.jpg", alt: "Фотография комнаты №2"},
      {src: "img/rooms/room-8-thumbnail.jpg", alt: "Фотография комнаты №3"},
      {src: "img/rooms/room-9-thumbnail.jpg", alt: "Фотография комнаты №4"}
    ],
    rate: 3, price: 5800, comments: 56, number: 982},
  {img: [
      {src: "img/rooms/room-7-thumbnail.jpg", alt: "Фотография комнаты №1"},
      {src: "img/rooms/room-8-thumbnail.jpg", alt: "Фотография комнаты №2"},
      {src: "img/rooms/room-9-thumbnail.jpg", alt: "Фотография комнаты №3"},
      {src: "img/rooms/room-10-thumbnail.jpg", alt: "Фотография комнаты №4"}
    ],
    rate: 5, price: 5500, comments: 45, number: 678},
  {img: [
      {src: "img/rooms/room-8-thumbnail.jpg", alt: "Фотография комнаты №1"},
      {src: "img/rooms/room-9-thumbnail.jpg", alt: "Фотография комнаты №2"},
      {src: "img/rooms/room-10-thumbnail.jpg", alt: "Фотография комнаты №3"},
      {src: "img/rooms/room-11-thumbnail.jpg", alt: "Фотография комнаты №4"}
    ],
    rate: 4, price: 5300, comments: 39, number: 450},
  {img: [
      {src: "img/rooms/room-9-thumbnail.jpg", alt: "Фотография комнаты №1"},
      {src: "img/rooms/room-10-thumbnail.jpg", alt: "Фотография комнаты №2"},
      {src: "img/rooms/room-11-thumbnail.jpg", alt: "Фотография комнаты №3"},
      {src: "img/rooms/room-12-thumbnail.jpg", alt: "Фотография комнаты №4"}
    ],
    rate: 3, price: 5000, comments: 77, number: 350},
  {img: [
      {src: "img/rooms/room-10-thumbnail.jpg", alt: "Фотография комнаты №1"},
      {src: "img/rooms/room-11-thumbnail.jpg", alt: "Фотография комнаты №2"},
      {src: "img/rooms/room-12-thumbnail.jpg", alt: "Фотография комнаты №3"},
      {src: "img/rooms/room-1-thumbnail.jpg", alt: "Фотография комнаты №4"}
    ],
    rate: 5, price: 5000, comments: 25, number: 666},
  {img: [
      {src: "img/rooms/room-11-thumbnail.jpg", alt: "Фотография комнаты №1"},
      {src: "img/rooms/room-12-thumbnail.jpg", alt: "Фотография комнаты №2"},
      {src: "img/rooms/room-1-thumbnail.jpg", alt: "Фотография комнаты №3"},
      {src: "img/rooms/room-2-thumbnail.jpg", alt: "Фотография комнаты №4"}
    ],
    rate: 3, price: 5000, comments: 15, number: 444},
  {img: [
      {src: "img/rooms/room-12-thumbnail.jpg", alt: "Фотография комнаты №1"},
      {src: "img/rooms/room-1-thumbnail.jpg", alt: "Фотография комнаты №2"},
      {src: "img/rooms/room-2-thumbnail.jpg", alt: "Фотография комнаты №3"},
      {src: "img/rooms/room-3-thumbnail.jpg", alt: "Фотография комнаты №4"}
    ],
    rate: 3, price: 5000, comments: 55, number: 352},
];