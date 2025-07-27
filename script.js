// Global variables
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.indicator');
let slideInterval;

// Anime data with real covers and video sources
const animeData = {
    'attack-on-titan': {
        title: 'Атака титанов',
        episodes: 75,
        year: '2013-2023',
        rating: 9.0,
        description: 'Эпическая история о борьбе человечества за выживание в мире, где правят гигантские титаны.',
        cover: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
        videoUrl: 'https://tridnyahey.server/stream/attack-on-titan/s01e01.mp4',
        realVideoUrl: 'https://archive.org/download/SampleVideo1280x7205mb/SampleVideo_1280x720_5mb.mp4',
        genres: ['Экшен', 'Драма', 'Фэнтези', 'Военное'],
        episodes_list: [
            { number: 1, title: 'Человечеству - 2000 лет спустя', duration: '24:10', url: 'https://tridnyahey.server/stream/attack-on-titan/s01e01.mp4', realUrl: 'https://archive.org/download/SampleVideo1280x7205mb/SampleVideo_1280x720_5mb.mp4' },
            { number: 2, title: 'В тот день', duration: '24:10', url: 'https://tridnyahey.server/stream/attack-on-titan/s01e02.mp4', realUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
            { number: 3, title: 'Тусклый свет среди отчаяния', duration: '24:10', url: 'https://tridnyahey.server/stream/attack-on-titan/s01e03.mp4', realUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' }
        ]
    },
    'naruto': {
        title: 'Наруто',
        episodes: 720,
        year: '2002-2017',
        rating: 8.4,
        description: 'Приключения молодого ниндзя, мечтающего стать Хокаге своей деревни.',
        cover: 'https://cdn.myanimelist.net/images/anime/13/17405.jpg',
        videoUrl: 'https://tridnyahey.server/stream/naruto/s01e01.mp4',
        realVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        genres: ['Экшен', 'Приключения', 'Комедия', 'Школа'],
        episodes_list: [
            { number: 1, title: 'Узумаки Наруто появляется!', duration: '23:05', url: 'https://tridnyahey.server/stream/naruto/s01e01.mp4', realUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
            { number: 2, title: 'Меня зовут Коноха-мару!', duration: '23:05', url: 'https://tridnyahey.server/stream/naruto/s01e02.mp4', realUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
            { number: 3, title: 'Соперники? Сасуке и Сакура', duration: '23:05', url: 'https://tridnyahey.server/stream/naruto/s01e03.mp4', realUrl: 'https://archive.org/download/SampleVideo1280x7205mb/SampleVideo_1280x720_5mb.mp4' }
        ]
    },
    'demon-slayer': {
        title: 'Клинок, рассекающий демонов',
        episodes: 44,
        year: '2019-2023',
        rating: 8.7,
        description: 'История о мальчике, который стал охотником на демонов, чтобы спасти свою сестру.',
        cover: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
        videoUrl: 'https://tridnyahey.server/stream/demon-slayer/s01e01.mp4',
        realVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        genres: ['Экшен', 'Сверхъестественное', 'Историческое'],
        episodes_list: [
            { number: 1, title: 'Жестокость', duration: '23:40', url: 'https://tridnyahey.server/stream/demon-slayer/s01e01.mp4', realUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
            { number: 2, title: 'Учитель Саконджи Урокодаки', duration: '23:40', url: 'https://tridnyahey.server/stream/demon-slayer/s01e02.mp4', realUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
            { number: 3, title: 'Сабито и Макомо', duration: '23:40', url: 'https://tridnyahey.server/stream/demon-slayer/s01e03.mp4', realUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' }
        ]
    },
    'jujutsu-kaisen': {
        title: 'Магическая битва',
        episodes: 24,
        year: '2020-2021',
        rating: 8.5,
        description: 'Юноша попадает в мир магии и проклятий, чтобы спасти своих друзей.',
        cover: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
        videoUrl: 'https://tridnyahey.server/stream/jujutsu-kaisen/s01e01.mp4',
        realVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        genres: ['Экшен', 'Сверхъестественное', 'Школа'],
        episodes_list: [
            { number: 1, title: 'Рёмен Сукуна', duration: '23:42', url: 'https://tridnyahey.server/stream/jujutsu-kaisen/s01e01.mp4', realUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
            { number: 2, title: 'Для меня самого', duration: '23:42', url: 'https://tridnyahey.server/stream/jujutsu-kaisen/s01e02.mp4', realUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
            { number: 3, title: 'Девочка из стали', duration: '23:42', url: 'https://tridnyahey.server/stream/jujutsu-kaisen/s01e03.mp4', realUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }
        ]
    },
    'one-piece': {
        title: 'Ван Пис',
        episodes: 1000,
        year: '1999-настоящее время',
        rating: 9.0,
        description: 'Приключения пирата Монки Д. Луффи в поисках легендарного сокровища.',
        cover: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        genres: ['Экшен', 'Приключения', 'Комедия', 'Драма'],
        episodes_list: [
            { number: 1, title: 'Я - Луффи! Мужчина, который станет Королём Пиратов!', duration: '24:08' },
            { number: 2, title: 'Появление великого мечника! Пиратский охотник Ророноа Зоро', duration: '24:08' },
            { number: 3, title: 'Морган против Луффи! Кто такая загадочная красивая девушка?', duration: '24:08' }
        ]
    },
    'spirited-away': {
        title: 'Унесённые призраками',
        episodes: 1,
        year: '2001',
        rating: 9.3,
        description: 'Девочка попадает в мир духов и должна найти способ вернуться домой.',
        cover: 'https://cdn.myanimelist.net/images/anime/6/79597.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        genres: ['Приключения', 'Семейное', 'Фэнтези'],
        episodes_list: [
            { number: 1, title: 'Полнометражный фильм', duration: '125:00' }
        ]
    },
    'your-name': {
        title: 'Твоё имя',
        episodes: 1,
        year: '2016',
        rating: 8.4,
        description: 'Романтическая история о двух подростках, которые меняются телами.',
        cover: 'https://cdn.myanimelist.net/images/anime/5/87048.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        genres: ['Драма', 'Романтика', 'Сверхъестественное'],
        episodes_list: [
            { number: 1, title: 'Полнометражный фильм', duration: '106:00' }
        ]
    },
    'death-note': {
        title: 'Тетрадь смерти',
        episodes: 37,
        year: '2006-2007',
        rating: 9.0,
        description: 'Студент находит тетрадь, способную убивать людей, и решает изменить мир.',
        cover: 'https://cdn.myanimelist.net/images/anime/9/9453.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        genres: ['Драма', 'Психологическое', 'Сверхъестественное', 'Триллер'],
        episodes_list: [
            { number: 1, title: 'Возрождение', duration: '23:10' },
            { number: 2, title: 'Столкновение', duration: '23:10' },
            { number: 3, title: 'Сделка', duration: '23:10' }
        ]
    },
    'one-punch-man': {
        title: 'Ванпанчмен',
        episodes: 24,
        year: '2015-2019',
        rating: 8.7,
        description: 'Герой, который может победить любого врага одним ударом.',
        cover: 'https://cdn.myanimelist.net/images/anime/12/76049.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        genres: ['Экшен', 'Комедия', 'Сверхъестественное'],
        episodes_list: [
            { number: 1, title: 'Самый сильный мужчина', duration: '24:15' },
            { number: 2, title: 'Одинокий киборг', duration: '24:15' },
            { number: 3, title: 'Учёный, жаждущий справедливости', duration: '24:15' }
        ]
    },
    'my-hero-academia': {
        title: 'Моя геройская академия',
        episodes: 138,
        year: '2016-2023',
        rating: 7.9,
        description: 'В мире, где у большинства людей есть суперспособности, мальчик без них мечтает стать героем.',
        cover: 'https://cdn.myanimelist.net/images/anime/10/78745.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        genres: ['Экшен', 'Комедия', 'Школа', 'Сверхъестественное'],
        episodes_list: [
            { number: 1, title: 'Изуку Мидория: Начало', duration: '23:40' },
            { number: 2, title: 'Что нужно, чтобы стать героем', duration: '23:40' },
            { number: 3, title: 'Ревущие мышцы', duration: '23:40' }
        ]
    },
    'tokyo-ghoul': {
        title: 'Токийский гуль',
        episodes: 48,
        year: '2014-2018',
        rating: 7.8,
        description: 'Студент становится полугулем и должен научиться жить в двух мирах.',
        cover: 'https://cdn.myanimelist.net/images/anime/5/64449.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        genres: ['Экшен', 'Драма', 'Ужасы', 'Сверхъестественное'],
        episodes_list: [
            { number: 1, title: 'Трагедия', duration: '23:50' },
            { number: 2, title: 'Инкубационный период', duration: '23:50' },
            { number: 3, title: 'Белый голубь', duration: '23:50' }
        ]
    },
    'fullmetal-alchemist': {
        title: 'Стальной алхимик: Братство',
        episodes: 64,
        year: '2009-2010',
        rating: 9.1,
        description: 'Братья-алхимики ищут философский камень, чтобы вернуть свои тела.',
        cover: 'https://cdn.myanimelist.net/images/anime/1223/96541.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        genres: ['Экшен', 'Приключения', 'Драма', 'Фэнтези'],
        episodes_list: [
            { number: 1, title: 'Стальной алхимик', duration: '24:50' },
            { number: 2, title: 'Первый день', duration: '24:50' },
            { number: 3, title: 'Город еретиков', duration: '24:50' }
        ]
    },
    'mob-psycho': {
        title: 'Моб Психо 100',
        episodes: 37,
        year: '2016-2022',
        rating: 8.8,
        description: 'Школьник с психическими способностями пытается жить обычной жизнью.',
        cover: 'https://cdn.myanimelist.net/images/anime/8/80356.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        genres: ['Экшен', 'Комедия', 'Сверхъестественное', 'Школа'],
        episodes_list: [
            { number: 1, title: 'Самопровозглашённый экстрасенс', duration: '24:10' },
            { number: 2, title: 'Беспокойство по поводу будущего', duration: '24:10' },
            { number: 3, title: 'Приглашение к совершенствованию', duration: '24:10' }
        ]
    },
    'hunter-x-hunter': {
        title: 'Хантер х Хантер',
        episodes: 148,
        year: '2011-2014',
        rating: 9.0,
        description: 'Мальчик отправляется в путешествие, чтобы найти своего отца-охотника.',
        cover: 'https://cdn.myanimelist.net/images/anime/11/33657.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        genres: ['Экшен', 'Приключения', 'Фэнтези'],
        episodes_list: [
            { number: 1, title: 'Отъезд х и х Друзья', duration: '23:40' },
            { number: 2, title: 'Испытание х Достоинства х Неожиданное путешествие', duration: '23:40' },
            { number: 3, title: 'Соперники х за х выживание', duration: '23:40' }
        ]
    },
    'code-geass': {
        title: 'Код Гиас: Восставший Лелуш',
        episodes: 50,
        year: '2006-2008',
        rating: 8.7,
        description: 'Принц получает силу Гиас и начинает революцию против империи.',
        cover: 'https://cdn.myanimelist.net/images/anime/5/50331.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        genres: ['Экшен', 'Драма', 'Меха', 'Военное'],
        episodes_list: [
            { number: 1, title: 'День рождения демона', duration: '25:00' },
            { number: 2, title: 'Пробуждение Белого рыцаря', duration: '25:00' },
            { number: 3, title: 'Ложная классность', duration: '25:00' }
        ]
    },
    'violet-evergarden': {
        title: 'Вайолет Эвергарден',
        episodes: 13,
        year: '2018',
        rating: 8.5,
        description: 'Бывший солдат учится понимать эмоции, работая писателем писем.',
        cover: 'https://cdn.myanimelist.net/images/anime/3/88097.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        genres: ['Драма', 'Фэнтези', 'Романтика'],
        episodes_list: [
            { number: 1, title: 'Я люблю тебя и Автоматические куклы', duration: '24:00' },
            { number: 2, title: 'Никогда не вернуться', duration: '24:00' },
            { number: 3, title: 'Может быть, ты тот особенный "Другой"', duration: '24:00' }
        ]
    },
    'cowboy-bebop': {
        title: 'Ковбой Бибоп',
        episodes: 26,
        year: '1998-1999',
        rating: 8.8,
        description: 'Команда охотников за головами путешествует по солнечной системе.',
        cover: 'https://cdn.myanimelist.net/images/anime/4/19644.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        genres: ['Экшен', 'Приключения', 'Космос', 'Драма'],
        episodes_list: [
            { number: 1, title: 'Астероидный блюз', duration: '24:40' },
            { number: 2, title: 'Бродячий пёс', duration: '24:40' },
            { number: 3, title: 'Честный Эд', duration: '24:40' }
        ]
    },
    'steins-gate': {
        title: 'Врата Штейна',
        episodes: 24,
        year: '2011',
        rating: 9.0,
        description: 'Учёный-любитель случайно изобретает машину времени.',
        cover: 'https://cdn.myanimelist.net/images/anime/5/73199.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        genres: ['Драма', 'Научная фантастика', 'Триллер'],
        episodes_list: [
            { number: 1, title: 'Начало и конец теории пролога', duration: '24:10' },
            { number: 2, title: 'Время-паранойя', duration: '24:10' },
            { number: 3, title: 'Параллельный процесс-паранойя', duration: '24:10' }
        ]
    },
    'akame-ga-kill': {
        title: 'Убийца Акаме',
        episodes: 24,
        year: '2014',
        rating: 7.5,
        description: 'Деревенский парень присоединяется к группе убийц, чтобы свергнуть империю.',
        cover: 'https://cdn.myanimelist.net/images/anime/1429/95946.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        genres: ['Экшен', 'Приключения', 'Драма', 'Фэнтези'],
        episodes_list: [
            { number: 1, title: 'Убить тьму', duration: '23:40' },
            { number: 2, title: 'Убить власть', duration: '23:40' },
            { number: 3, title: 'Убить своих друзей', duration: '23:40' }
        ]
    },
    'mob-psycho-100': {
        title: 'Моб Психо 100 III',
        episodes: 12,
        year: '2022',
        rating: 9.2,
        description: 'Заключительный сезон истории о школьнике с психическими способностями.',
        cover: 'https://cdn.myanimelist.net/images/anime/1228/125011.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        genres: ['Экшен', 'Комедия', 'Сверхъестественное'],
        episodes_list: [
            { number: 1, title: 'Будущее', duration: '23:20' },
            { number: 2, title: 'Большая чистка', duration: '23:20' },
            { number: 3, title: 'Карьера', duration: '23:20' }
        ]
    },
    'kimetsu-no-yaiba-movie': {
        title: 'Клинок, рассекающий демонов: Поезд Бесконечности',
        episodes: 1,
        year: '2020',
        rating: 8.2,
        description: 'Танджиро и его друзья сражаются с демонами в поезде.',
        cover: 'https://cdn.myanimelist.net/images/anime/1704/106947.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        genres: ['Экшен', 'Сверхъестественное', 'Историческое'],
        episodes_list: [
            { number: 1, title: 'Полнометражный фильм', duration: '117:00' }
        ]
    },
    'kaguya-sama': {
        title: 'Госпожа Кагуя: В любви как на войне',
        episodes: 37,
        year: '2019-2022',
        rating: 8.4,
        description: 'Два гения пытаются заставить друг друга признаться в любви первыми.',
        cover: 'https://cdn.myanimelist.net/images/anime/1160/95099.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        genres: ['Комедия', 'Романтика', 'Школа'],
        episodes_list: [
            { number: 1, title: 'Я заставлю тебя признаться', duration: '23:40' },
            { number: 2, title: 'Кино и зонт', duration: '23:40' },
            { number: 3, title: 'Кагуя хочет быть признанной', duration: '23:40' }
        ]
    },
    'haikyuu': {
        title: 'Волейбол!!',
        episodes: 85,
        year: '2014-2020',
        rating: 8.7,
        description: 'История о школьной волейбольной команде и их пути к чемпионству.',
        cover: 'https://cdn.myanimelist.net/images/anime/7/76014.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        genres: ['Комедия', 'Драма', 'Школа', 'Спорт'],
        episodes_list: [
            { number: 1, title: 'Конец и начало', duration: '24:10' },
            { number: 2, title: 'Взгляд на волейбол', duration: '24:10' },
            { number: 3, title: 'Самый сильный соперник', duration: '24:10' }
        ]
    },
    'overlord': {
        title: 'Повелитель',
        episodes: 52,
        year: '2015-2022',
        rating: 7.9,
        description: 'Игрок застревает в MMORPG в роли могущественного скелета-мага.',
        cover: 'https://cdn.myanimelist.net/images/anime/7/88019.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        genres: ['Экшен', 'Приключения', 'Фэнтези', 'Сверхъестественное'],
        episodes_list: [
            { number: 1, title: 'Конец и начало', duration: '23:40' },
            { number: 2, title: 'Этаж гробниц', duration: '23:40' },
            { number: 3, title: 'Битва за Карне', duration: '23:40' }
        ]
    },
    're-zero': {
        title: 'Re:Zero - Жизнь с нуля в альтернативном мире',
        episodes: 50,
        year: '2016-2021',
        rating: 8.2,
        description: 'Парень попадает в фэнтезийный мир и получает способность возвращаться после смерти.',
        cover: 'https://cdn.myanimelist.net/images/anime/1522/128039.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        genres: ['Драма', 'Фэнтези', 'Психологическое', 'Триллер'],
        episodes_list: [
            { number: 1, title: 'Начало конца мира', duration: '49:35' },
            { number: 2, title: 'Воссоединение с Вещим', duration: '25:10' },
            { number: 3, title: 'Начать жизнь с нуля в другом мире', duration: '25:10' }
        ]
    },
    'made-in-abyss': {
        title: 'Созданный в Бездне',
        episodes: 25,
        year: '2017-2022',
        rating: 8.7,
        description: 'Девочка спускается в таинственную бездну в поисках своей матери.',
        cover: 'https://cdn.myanimelist.net/images/anime/6/86733.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        genres: ['Приключения', 'Драма', 'Фэнтези', 'Научная фантастика'],
        episodes_list: [
            { number: 1, title: 'Город на краю Бездны', duration: '25:40' },
            { number: 2, title: 'Воскрешение', duration: '25:40' },
            { number: 3, title: 'Отъезд', duration: '25:40' }
        ]
    },
    'vinland-saga': {
        title: 'Сага о Винланде',
        episodes: 48,
        year: '2019-2023',
        rating: 8.8,
        description: 'Эпическая история о викингах и поиске мирной земли Винланд.',
        cover: 'https://cdn.myanimelist.net/images/anime/1500/103005.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        genres: ['Экшен', 'Приключения', 'Драма', 'Историческое'],
        episodes_list: [
            { number: 1, title: 'Где-то не здесь', duration: '24:20' },
            { number: 2, title: 'Меч', duration: '24:20' },
            { number: 3, title: 'Тролль', duration: '24:20' }
        ]
    },
    'jojo-bizarre-adventure': {
        title: 'Невероятные приключения ДжоДжо',
        episodes: 190,
        year: '2012-2023',
        rating: 8.5,
        description: 'Многопоколенческая сага о семье Джостар и их сверхъестественных приключениях.',
        cover: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        genres: ['Экшен', 'Приключения', 'Сверхъестественное', 'Комедия'],
        episodes_list: [
            { number: 1, title: 'Дио Брандо', duration: '23:30' },
            { number: 2, title: 'Письмо от прошлого', duration: '23:30' },
            { number: 3, title: 'Молодость с Дио', duration: '23:30' }
        ]
    },
    'chainsaw-man': {
        title: 'Человек-бензопила',
        episodes: 12,
        year: '2022',
        rating: 8.9,
        description: 'Подросток Дэндзи живёт в нищете и мечтает о простых радостях жизни.',
        cover: 'https://cdn.myanimelist.net/images/anime/1806/126216.jpg',
        videoUrl: 'https://tridnyahey.server/stream/chainsaw-man/s01e01.mp4',
        realVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        genres: ['Экшен', 'Сверхъестественное', 'Комедия'],
        episodes_list: [
            { number: 1, title: 'Собака и бензопила', duration: '23:15', url: 'https://tridnyahey.server/stream/chainsaw-man/s01e01.mp4', realUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
            { number: 2, title: 'Приход дьявола мускулов', duration: '23:15', url: 'https://tridnyahey.server/stream/chainsaw-man/s01e02.mp4', realUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
            { number: 3, title: 'Мечты и реальность', duration: '23:15', url: 'https://tridnyahey.server/stream/chainsaw-man/s01e03.mp4', realUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }
        ]
    },
    'spy-x-family': {
        title: 'Семья шпиона',
        episodes: 25,
        year: '2022-2023',
        rating: 8.6,
        description: 'Шпион создаёт фальшивую семью для выполнения миссии.',
        cover: 'https://cdn.myanimelist.net/images/anime/1441/122795.jpg',
        videoUrl: 'https://tridnyahey.server/stream/spy-x-family/s01e01.mp4',
        realVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        genres: ['Экшен', 'Комедия', 'Семейное'],
        episodes_list: [
            { number: 1, title: 'Операция Стрикс', duration: '24:10', url: 'https://tridnyahey.server/stream/spy-x-family/s01e01.mp4', realUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
            { number: 2, title: 'Обеспечить жену', duration: '24:10', url: 'https://tridnyahey.server/stream/spy-x-family/s01e02.mp4', realUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
            { number: 3, title: 'Подготовиться к собеседованию', duration: '24:10', url: 'https://tridnyahey.server/stream/spy-x-family/s01e03.mp4', realUrl: 'https://archive.org/download/SampleVideo1280x7205mb/SampleVideo_1280x720_5mb.mp4' }
        ]
    },
    'weathering-with-you': {
        title: 'Дитя погоды',
        episodes: 1,
        year: '2019',
        rating: 8.2,
        description: 'Парень встречает девушку, которая может управлять погодой.',
        cover: 'https://cdn.myanimelist.net/images/anime/1880/101146.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        genres: ['Драма', 'Романтика', 'Сверхъестественное'],
        episodes_list: [
            { number: 1, title: 'Полнометражный фильм', duration: '112:00' }
        ]
    },
    'princess-mononoke': {
        title: 'Принцесса Мононоке',
        episodes: 1,
        year: '1997',
        rating: 8.4,
        description: 'Принц пытается найти лекарство от проклятия и попадает в войну между людьми и духами леса.',
        cover: 'https://cdn.myanimelist.net/images/anime/7/75919.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        genres: ['Экшен', 'Приключения', 'Драма', 'Фэнтези'],
        episodes_list: [
            { number: 1, title: 'Полнометражный фильм', duration: '134:00' }
        ]
    },
    'howls-moving-castle': {
        title: 'Ходячий замок Хаула',
        episodes: 1,
        year: '2004',
        rating: 8.2,
        description: 'Девушка превращается в старуху и отправляется в путешествие с волшебником.',
        cover: 'https://cdn.myanimelist.net/images/anime/5/75810.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        genres: ['Приключения', 'Драма', 'Фэнтези', 'Романтика'],
        episodes_list: [
            { number: 1, title: 'Полнометражный фильм', duration: '119:00' }
        ]
    }
};

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Generate fake server URLs for anime without explicit URLs
    generateFakeServerUrls();
    
    initializeSlider();
    initializeSearch();
    initializeNavigation();
    setBackgroundImages();
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Show fake server info in console
    showServerInfo();
});

// Show fake server information
function showServerInfo() {
    console.log('%c🎌 TRIDNYAHEY Streaming Platform', 'color: #4ecdc4; font-size: 20px; font-weight: bold;');
    console.log('%c🖥️  Server Status: Online', 'color: #00ff00; font-weight: bold;');
    console.log('%c📡 CDN Servers: 4 active', 'color: #4ecdc4;');
    console.log('%c🎬 Content Library: 22 anime series', 'color: #4ecdc4;');
    console.log('%c⚡ Streaming Quality: Up to 1080p', 'color: #4ecdc4;');
    console.log('%c🔒 Connection: Secured by Tridnyah Protocol', 'color: #4ecdc4;');
    console.log('%c\n📋 Available Servers:', 'color: #ff6b6b; font-weight: bold;');
    console.log('   • tridnyahey-cdn-1.ru');
    console.log('   • tridnyahey-cdn-2.ru');
    console.log('   • tridnyahey-stream-1.ru');
    console.log('   • tridnyahey-media-1.ru');
    console.log('%c\n🎯 Player: Tridnyah v2.1.0', 'color: #45b7d1; font-weight: bold;');
});

// Generate fake server URLs for anime that don't have them
function generateFakeServerUrls() {
    const videoSources = [
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        'https://archive.org/download/SampleVideo1280x7205mb/SampleVideo_1280x720_5mb.mp4'
    ];
    
    Object.keys(animeData).forEach(animeId => {
        const anime = animeData[animeId];
        
        // Generate main video URL if not exists
        if (!anime.videoUrl.includes('tridnyahey.server')) {
            anime.realVideoUrl = anime.videoUrl;
            anime.videoUrl = `https://tridnyahey.server/stream/${animeId}/s01e01.mp4`;
        }
        
        // Generate episode URLs if not exists
        if (anime.episodes_list) {
            anime.episodes_list.forEach((episode, index) => {
                if (!episode.url) {
                    episode.url = `https://tridnyahey.server/stream/${animeId}/s01e${episode.number.toString().padStart(2, '0')}.mp4`;
                    episode.realUrl = videoSources[index % videoSources.length];
                }
            });
        }
    });
}

// Hero Slider Functions
function initializeSlider() {
    if (slides.length === 0) return;
    
    // Set initial slide
    showSlide(0);
    
    // Auto-slide every 5 seconds
    slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => clearInterval(slideInterval));
        heroSection.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
}

function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    if (slides[index]) {
        slides[index].classList.add('active');
        const bgImage = slides[index].dataset.bg;
        if (bgImage) {
            slides[index].style.backgroundImage = `url(${bgImage})`;
        }
    }
    
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
    
    currentSlide = index;
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
}

function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
}

function goToSlide(index) {
    showSlide(index);
    // Reset auto-slide timer
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

// Set background images for slides
function setBackgroundImages() {
    slides.forEach(slide => {
        const bgImage = slide.dataset.bg;
        if (bgImage) {
            slide.style.backgroundImage = `url(${bgImage})`;
        }
    });
}

// Navigation Functions (updated version is below)

// Search Functions
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            searchAnime(query);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.toLowerCase().trim();
                if (query) {
                    performSearch(query);
                }
            }
        });
    }
}

function searchAnime(query) {
    if (!query) return;
    
    const animeCards = document.querySelectorAll('.anime-card');
    
    animeCards.forEach(card => {
        const title = card.querySelector('.anime-title');
        if (title) {
            const titleText = title.textContent.toLowerCase();
            if (titleText.includes(query)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

function performSearch(query) {
    // Highlight search results
    const animeCards = document.querySelectorAll('.anime-card');
    let foundResults = false;
    
    animeCards.forEach(card => {
        const title = card.querySelector('.anime-title');
        if (title) {
            const titleText = title.textContent.toLowerCase();
            if (titleText.includes(query)) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 500);
                foundResults = true;
                return;
            }
        }
    });
    
    if (!foundResults) {
        showNotification('Аниме не найдено', 'error');
    }
}

// Tridnyah Player Functions
function openPlayer(animeId) {
    const modal = document.getElementById('player-modal');
    const playerTitle = document.getElementById('player-title');
    const video = document.getElementById('tridnyah-player');
    const episodesGrid = document.getElementById('episodes-grid');
    
    if (!animeData[animeId]) {
        showNotification('Аниме не найдено', 'error');
        return;
    }
    
    const anime = animeData[animeId];
    
    // Set player title
    playerTitle.textContent = anime.title;
    
    // Show fake loading from our server
    showVideoLoading(video);
    
    // Set real video source after short delay to simulate server response
    setTimeout(() => {
        const realUrl = anime.realVideoUrl || anime.videoUrl;
        video.src = realUrl;
        hideVideoLoading();
        
        // Show success notification with fake server info
        showServerNotification(anime.title, 1);
    }, 1500);
    
    // Generate episodes
    generateEpisodes(animeId, episodesGrid);
    
    // Show modal
    modal.classList.add('active');
    modal.style.display = 'flex';
    
    // Disable body scroll
    document.body.style.overflow = 'hidden';
    
    // Add escape key listener
    document.addEventListener('keydown', handlePlayerKeydown);
}

function closePlayer() {
    const modal = document.getElementById('player-modal');
    const video = document.getElementById('tridnyah-player');
    
    // Hide modal
    modal.classList.remove('active');
    modal.style.display = 'none';
    
    // Stop video
    video.pause();
    video.currentTime = 0;
    
    // Enable body scroll
    document.body.style.overflow = 'auto';
    
    // Remove escape key listener
    document.removeEventListener('keydown', handlePlayerKeydown);
}

function handlePlayerKeydown(e) {
    if (e.key === 'Escape') {
        closePlayer();
    } else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
    }
}

function generateEpisodes(animeId, container) {
    container.innerHTML = '';
    
    const anime = animeData[animeId];
    if (!anime || !anime.episodes_list) return;
    
    // Create episodes list with real titles
    anime.episodes_list.forEach((episode, index) => {
        const episodeItem = document.createElement('div');
        episodeItem.className = 'episode-item';
        episodeItem.innerHTML = `
            <div class="episode-number">${episode.number}</div>
            <div class="episode-details">
                <div class="episode-title">${episode.title}</div>
                <div class="episode-duration">${episode.duration}</div>
            </div>
            <button class="episode-play-btn" onclick="selectEpisode(${episode.number}, this.parentElement)">
                <i class="fas fa-play"></i>
            </button>
            <div class="episode-url" style="display: none;">${episode.url || `https://tridnyahey.server/stream/${animeId}/s01e${episode.number.toString().padStart(2, '0')}.mp4`}</div>
        `;
        
        if (index === 0) {
            episodeItem.classList.add('active');
        }
        
        container.appendChild(episodeItem);
    });
    
    // Add "show more" if there are more episodes
    if (anime.episodes > anime.episodes_list.length) {
        const moreItem = document.createElement('div');
        moreItem.className = 'episode-item more-episodes';
        moreItem.innerHTML = `
            <div class="episode-details">
                <div class="episode-title">Ещё ${anime.episodes - anime.episodes_list.length} эпизодов...</div>
                <div class="episode-duration">Скоро будут добавлены</div>
            </div>
        `;
        container.appendChild(moreItem);
    }
}

function selectEpisode(episodeNumber, episodeElement) {
    // Remove active class from all episode items
    document.querySelectorAll('.episode-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to selected episode
    episodeElement.classList.add('active');
    
    const video = document.getElementById('tridnyah-player');
    const playerTitle = document.getElementById('player-title');
    
    // Find current anime and episode
    let currentAnime = null;
    let currentEpisode = null;
    
    for (const [animeId, anime] of Object.entries(animeData)) {
        if (anime.title === playerTitle.textContent) {
            currentAnime = anime;
            currentEpisode = anime.episodes_list.find(ep => ep.number === episodeNumber);
            break;
        }
    }
    
    if (currentEpisode) {
        // Show loading
        showVideoLoading(video);
        
        // Simulate server loading
        setTimeout(() => {
            const realUrl = currentEpisode.realUrl || currentEpisode.url;
            video.src = realUrl;
            video.currentTime = 0;
            video.play();
            hideVideoLoading();
            
            // Show server notification
            showServerNotification(currentAnime.title, episodeNumber);
        }, 800);
    } else {
        // Fallback
        video.currentTime = 0;
        video.play();
        showNotification(`Эпизод ${episodeNumber} загружен`, 'success');
    }
}

// Video Player Controls
function togglePlay() {
    const video = document.getElementById('tridnyah-player');
    const playPauseIcon = document.getElementById('play-pause-icon');
    
    if (video.paused) {
        video.play();
        playPauseIcon.className = 'fas fa-pause';
    } else {
        video.pause();
        playPauseIcon.className = 'fas fa-play';
    }
}

function toggleMute() {
    const video = document.getElementById('tridnyah-player');
    const volumeIcon = document.getElementById('volume-icon');
    
    if (video.muted) {
        video.muted = false;
        volumeIcon.className = 'fas fa-volume-up';
    } else {
        video.muted = true;
        volumeIcon.className = 'fas fa-volume-mute';
    }
}

function changeVolume(value) {
    const video = document.getElementById('tridnyah-player');
    video.volume = value / 100;
    
    const volumeIcon = document.getElementById('volume-icon');
    if (value == 0) {
        volumeIcon.className = 'fas fa-volume-mute';
    } else if (value < 50) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-up';
    }
}

function toggleFullscreen() {
    const video = document.getElementById('tridnyah-player');
    
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}

// Server Simulation Functions
function showVideoLoading(videoElement) {
    const playerWrapper = videoElement.parentElement;
    
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'video-loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <div class="loading-text">
                <p>Подключение к серверу Tridnyah...</p>
                <p class="server-info">Server: tridnyahey-cdn-${Math.floor(Math.random() * 9) + 1}.ru</p>
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
            </div>
        </div>
    `;
    
    playerWrapper.appendChild(loadingOverlay);
    
    // Animate loading bar
    const progressBar = loadingOverlay.querySelector('.loading-progress');
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        progressBar.style.width = progress + '%';
        if (progress >= 100) clearInterval(interval);
    }, 200);
}

function hideVideoLoading() {
    const loadingOverlay = document.querySelector('.video-loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            if (loadingOverlay.parentNode) {
                loadingOverlay.parentNode.removeChild(loadingOverlay);
            }
        }, 300);
    }
}

function showServerNotification(animeTitle, episodeNumber) {
    const servers = [
        'tridnyahey-cdn-1.ru',
        'tridnyahey-cdn-2.ru', 
        'tridnyahey-stream-1.ru',
        'tridnyahey-media-1.ru'
    ];
    
    const server = servers[Math.floor(Math.random() * servers.length)];
    const quality = ['1080p', '720p', '480p'][Math.floor(Math.random() * 3)];
    
    showNotification(
        `✅ Загружено с ${server} | ${quality} | Эпизод ${episodeNumber}`, 
        'success'
    );
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #4ecdc4, #44a08d)' : 
                     type === 'error' ? 'linear-gradient(45deg, #ff6b6b, #ee5a52)' : 
                     'linear-gradient(45deg, #45b7d1, #4ecdc4)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .loaded {
        animation: fadeIn 0.5s ease;
    }
`;
document.head.appendChild(style);

// Genre card interactions
document.addEventListener('DOMContentLoaded', function() {
    const genreCards = document.querySelectorAll('.genre-card');
    
    genreCards.forEach(card => {
        card.addEventListener('click', function() {
            const genreName = this.querySelector('h3').textContent;
            showNotification(`Поиск аниме в жанре: ${genreName}`, 'info');
            
            // Scroll to anime grid
            const animeGrid = document.querySelector('.anime-grid');
            if (animeGrid) {
                animeGrid.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((key, index) => key === konamiSequence[index])) {
        
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';
        showNotification('🎉 Tridnyah Player активирован! 🎉', 'success');
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        konamiCode = [];
    }
});

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// Catalog and Genre Functions
let currentView = 'popular'; // 'popular', 'catalog', 'genre'
let currentGenre = null;

function showCatalog() {
    currentView = 'catalog';
    const section = document.querySelector('.section');
    const container = section.querySelector('.container');
    
    // Update section title
    const title = container.querySelector('.section-title');
    title.textContent = 'Полный каталог аниме';
    
    // Create filter controls
    const filterControls = createFilterControls();
    
    // Replace content
    container.innerHTML = '';
    container.appendChild(title);
    container.appendChild(filterControls);
    
    // Show all anime
    displayAnimeGrid(Object.keys(animeData), container);
    
    // Scroll to section
    section.scrollIntoView({ behavior: 'smooth' });
}

function showGenres() {
    currentView = 'genres';
    const section = document.querySelector('.section');
    const container = section.querySelector('.container');
    
    // Update section title
    const title = container.querySelector('.section-title');
    title.textContent = 'Выберите жанр';
    
    // Replace content
    container.innerHTML = '';
    container.appendChild(title);
    
    // Create genres grid
    const genresGrid = createGenresGrid();
    container.appendChild(genresGrid);
    
    // Scroll to section
    section.scrollIntoView({ behavior: 'smooth' });
}

function showGenreAnime(genre) {
    currentView = 'genre';
    currentGenre = genre;
    const section = document.querySelector('.section');
    const container = section.querySelector('.container');
    
    // Update section title
    const title = container.querySelector('.section-title');
    title.textContent = `Аниме в жанре: ${genre}`;
    
    // Create back button
    const backButton = document.createElement('button');
    backButton.className = 'btn btn-secondary back-to-genres';
    backButton.innerHTML = '<i class="fas fa-arrow-left"></i> Назад к жанрам';
    backButton.onclick = showGenres;
    
    // Filter anime by genre
    const genreAnime = Object.keys(animeData).filter(id => {
        const anime = animeData[id];
        return anime.genres && anime.genres.includes(genre);
    });
    
    // Replace content
    container.innerHTML = '';
    container.appendChild(title);
    container.appendChild(backButton);
    
    if (genreAnime.length > 0) {
        displayAnimeGrid(genreAnime, container);
    } else {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `
            <i class="fas fa-sad-tear"></i>
            <h3>Аниме в жанре "${genre}" не найдено</h3>
            <p>Попробуйте выбрать другой жанр</p>
        `;
        container.appendChild(noResults);
    }
    
    // Scroll to section
    section.scrollIntoView({ behavior: 'smooth' });
}

function createFilterControls() {
    const controls = document.createElement('div');
    controls.className = 'filter-controls';
    
    // Sort options
    const sortSelect = document.createElement('select');
    sortSelect.className = 'sort-select';
    sortSelect.innerHTML = `
        <option value="rating">По рейтингу</option>
        <option value="year">По году</option>
        <option value="title">По названию</option>
        <option value="episodes">По количеству эпизодов</option>
    `;
    
    sortSelect.addEventListener('change', (e) => {
        sortAndDisplayAnime(e.target.value);
    });
    
    // Genre filter
    const genreSelect = document.createElement('select');
    genreSelect.className = 'genre-select';
    genreSelect.innerHTML = '<option value="">Все жанры</option>';
    
    // Get all unique genres
    const allGenres = new Set();
    Object.values(animeData).forEach(anime => {
        if (anime.genres) {
            anime.genres.forEach(genre => allGenres.add(genre));
        }
    });
    
    Array.from(allGenres).sort().forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreSelect.appendChild(option);
    });
    
    genreSelect.addEventListener('change', (e) => {
        if (e.target.value) {
            showGenreAnime(e.target.value);
        } else {
            showCatalog();
        }
    });
    
    controls.appendChild(document.createTextNode('Сортировать: '));
    controls.appendChild(sortSelect);
    controls.appendChild(document.createTextNode(' Жанр: '));
    controls.appendChild(genreSelect);
    
    return controls;
}

function createGenresGrid() {
    const genresGrid = document.createElement('div');
    genresGrid.className = 'genres-grid-full';
    
    // Get all unique genres with counts
    const genreCounts = {};
    Object.values(animeData).forEach(anime => {
        if (anime.genres) {
            anime.genres.forEach(genre => {
                genreCounts[genre] = (genreCounts[genre] || 0) + 1;
            });
        }
    });
    
    // Genre icons mapping
    const genreIcons = {
        'Экшен': 'fas fa-fist-raised',
        'Приключения': 'fas fa-map',
        'Комедия': 'fas fa-laugh',
        'Драма': 'fas fa-theater-masks',
        'Фэнтези': 'fas fa-magic',
        'Романтика': 'fas fa-heart',
        'Школа': 'fas fa-graduation-cap',
        'Сверхъестественное': 'fas fa-ghost',
        'Ужасы': 'fas fa-skull',
        'Научная фантастика': 'fas fa-rocket',
        'Спорт': 'fas fa-running',
        'Военное': 'fas fa-shield-alt',
        'Меха': 'fas fa-robot',
        'Историческое': 'fas fa-landmark',
        'Психологическое': 'fas fa-brain',
        'Триллер': 'fas fa-eye',
        'Семейное': 'fas fa-home',
        'Космос': 'fas fa-satellite'
    };
    
    Object.entries(genreCounts)
        .sort(([,a], [,b]) => b - a) // Sort by count descending
        .forEach(([genre, count]) => {
            const genreCard = document.createElement('div');
            genreCard.className = 'genre-card-full';
            genreCard.onclick = () => showGenreAnime(genre);
            
            const icon = genreIcons[genre] || 'fas fa-tag';
            
            genreCard.innerHTML = `
                <i class="${icon} genre-icon"></i>
                <h3>${genre}</h3>
                <p>${count} аниме</p>
            `;
            
            genresGrid.appendChild(genreCard);
        });
    
    return genresGrid;
}

function displayAnimeGrid(animeIds, container) {
    const animeGrid = document.createElement('div');
    animeGrid.className = 'anime-grid';
    
    animeIds.forEach(id => {
        const anime = animeData[id];
        if (!anime) return;
        
        const animeCard = document.createElement('div');
        animeCard.className = 'anime-card';
        animeCard.onclick = () => openPlayer(id);
        
        animeCard.innerHTML = `
            <div class="anime-poster">
                <img src="${anime.cover}" alt="${anime.title}">
                <div class="anime-overlay">
                    <i class="fas fa-play play-icon"></i>
                </div>
                <div class="anime-rating">${anime.rating}</div>
            </div>
            <div class="anime-info">
                <h3 class="anime-title">${anime.title}</h3>
                <p class="anime-year">${anime.year} • ${anime.episodes} эп.</p>
                <div class="anime-genres">
                    ${anime.genres ? anime.genres.slice(0, 2).map(genre => 
                        `<span class="genre-tag">${genre}</span>`
                    ).join('') : ''}
                </div>
            </div>
        `;
        
        animeGrid.appendChild(animeCard);
    });
    
    container.appendChild(animeGrid);
}

function sortAndDisplayAnime(sortBy) {
    const container = document.querySelector('.section .container');
    const animeGrid = container.querySelector('.anime-grid');
    if (animeGrid) {
        animeGrid.remove();
    }
    
    let sortedIds = Object.keys(animeData);
    
    switch (sortBy) {
        case 'rating':
            sortedIds.sort((a, b) => animeData[b].rating - animeData[a].rating);
            break;
        case 'year':
            sortedIds.sort((a, b) => {
                const yearA = parseInt(animeData[a].year.split('-')[0]);
                const yearB = parseInt(animeData[b].year.split('-')[0]);
                return yearB - yearA;
            });
            break;
        case 'title':
            sortedIds.sort((a, b) => animeData[a].title.localeCompare(animeData[b].title));
            break;
        case 'episodes':
            sortedIds.sort((a, b) => animeData[b].episodes - animeData[a].episodes);
            break;
    }
    
    displayAnimeGrid(sortedIds, container);
}

function showPopular() {
    currentView = 'popular';
    location.reload(); // Simple way to reset to original state
}

// Update navigation function to handle new sections
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Handle different sections
            const targetId = this.getAttribute('href');
            
            switch (targetId) {
                case '#home':
                    showPopular();
                    break;
                case '#catalog':
                    showCatalog();
                    break;
                case '#genres':
                    showGenres();
                    break;
                case '#search':
                    document.querySelector('.search-input').focus();
                    break;
                default:
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(12, 12, 12, 0.98)';
        } else {
            header.style.background = 'rgba(12, 12, 12, 0.95)';
        }
    });
}