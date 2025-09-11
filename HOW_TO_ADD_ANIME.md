# 📚 Как добавить новое аниме на TRIDNYAHEY

## 🎯 Быстрый старт

Чтобы добавить новое аниме, нужно отредактировать файл `script.js` и при желании `index.html`.

## 📝 Шаг 1: Добавление данных аниме

Откройте файл `script.js` и найдите объект `animeData`. Добавьте новое аниме по этому шаблону:

```javascript
'anime-id': {
    title: 'Название аниме',
    episodes: 24,
    year: '2023',
    rating: 8.5,
    description: 'Описание аниме...',
    cover: 'https://cdn.myanimelist.net/images/anime/xxx/xxx.jpg',
    videoUrl: 'https://ссылка-на-видео.mp4',
    episodes_list: [
        { number: 1, title: 'Название первого эпизода', duration: '23:40' },
        { number: 2, title: 'Название второго эпизода', duration: '23:40' },
        { number: 3, title: 'Название третьего эпизода', duration: '23:40' }
    ]
}
```

### 🔍 Где взять обложки?

**MyAnimeList** - лучший источник качественных обложек:
1. Идите на [myanimelist.net](https://myanimelist.net)
2. Найдите нужное аниме
3. Кликните правой кнопкой на обложку → "Копировать адрес изображения"
4. Используйте эту ссылку в поле `cover`

**Пример хороших источников обложек:**
- `https://cdn.myanimelist.net/images/anime/1171/109222.jpg` (Jujutsu Kaisen)
- `https://cdn.myanimelist.net/images/anime/10/47347.jpg` (Attack on Titan)
- `https://cdn.myanimelist.net/images/anime/1286/99889.jpg` (Demon Slayer)

## 🎬 Шаг 2: Добавление видео

### Демо-видео (для тестирования):
```javascript
videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
```

### Реальные источники видео:
- **YouTube** (через embed): `https://www.youtube.com/embed/VIDEO_ID`
- **Vimeo**: `https://player.vimeo.com/video/VIDEO_ID`
- **Прямые ссылки**: `https://example.com/video.mp4`

**⚠️ Важно:** Убедитесь, что у вас есть права на использование видео!

## 🖼️ Шаг 3: Добавление карточки на главную

Откройте `index.html` и найдите секцию с классом `anime-grid`. Добавьте новую карточку:

```html
<div class="anime-card" onclick="openPlayer('anime-id')">
    <div class="anime-poster">
        <img src="https://cdn.myanimelist.net/images/anime/xxx/xxx.jpg" alt="Название аниме">
        <div class="anime-overlay">
            <i class="fas fa-play play-icon"></i>
        </div>
        <div class="anime-rating">8.5</div>
    </div>
    <div class="anime-info">
        <h3 class="anime-title">Название аниме</h3>
        <p class="anime-year">2023 • 24 эп.</p>
    </div>
</div>
```

## 🎨 Шаг 4: Добавление в слайдер (опционально)

Чтобы добавить аниме в главный слайдер, отредактируйте секцию `hero-slider` в `index.html`:

```html
<div class="hero-slide" data-bg="https://wallpaper-link.jpg">
    <div class="hero-content">
        <h2 class="hero-title">Название аниме</h2>
        <p class="hero-description">Описание аниме...</p>
        <div class="hero-buttons">
            <button class="btn btn-primary" onclick="openPlayer('anime-id')">
                <i class="fas fa-play"></i> Смотреть
            </button>
            <button class="btn btn-secondary">
                <i class="fas fa-plus"></i> В избранное
            </button>
        </div>
    </div>
</div>
```

И добавьте индикатор:
```html
<span class="indicator" onclick="goToSlide(3)"></span>
```

## 📋 Полный пример добавления аниме

### 1. В script.js добавляем:

```javascript
'chainsaw-man': {
    title: 'Человек-бензопила',
    episodes: 12,
    year: '2022',
    rating: 8.9,
    description: 'Подросток Дэндзи живёт в нищете и мечтает о простых радостях жизни.',
    cover: 'https://cdn.myanimelist.net/images/anime/1806/126216.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    episodes_list: [
        { number: 1, title: 'Собака и бензопила', duration: '23:15' },
        { number: 2, title: 'Приход дьявола мускулов', duration: '23:15' },
        { number: 3, title: 'Мечты и реальность', duration: '23:15' }
    ]
}
```

### 2. В index.html добавляем карточку:

```html
<div class="anime-card" onclick="openPlayer('chainsaw-man')">
    <div class="anime-poster">
        <img src="https://cdn.myanimelist.net/images/anime/1806/126216.jpg" alt="Человек-бензопила">
        <div class="anime-overlay">
            <i class="fas fa-play play-icon"></i>
        </div>
        <div class="anime-rating">8.9</div>
    </div>
    <div class="anime-info">
        <h3 class="anime-title">Человек-бензопила</h3>
        <p class="anime-year">2022 • 12 эп.</p>
    </div>
</div>
```

## 🔧 Дополнительные настройки

### Изменение количества эпизодов в списке
По умолчанию показываются первые 3 эпизода. Чтобы показать больше, просто добавьте их в `episodes_list`.

### Добавление жанров
Жанры пока статичные, но вы можете добавить поле `genres` в данные аниме для будущего функционала:

```javascript
genres: ['Экшен', 'Сверхъестественное', 'Школа']
```

## 🎉 Готово!

После добавления всех данных:
1. Сохраните файлы
2. Обновите страницу в браузере
3. Ваше новое аниме появится на сайте!

## 💡 Советы

- **Качество обложек**: Используйте изображения размером минимум 300x400px
- **Названия эпизодов**: Делайте их информативными и интересными
- **Описания**: Пишите краткие, но захватывающие описания (1-2 предложения)
- **Рейтинги**: Используйте реальные рейтинги с MyAnimeList или других источников

## 🚨 Важные замечания

- **ID аниме** должен быть уникальным и содержать только буквы, цифры и дефисы
- **Обложки** должны быть доступны по прямой ссылке
- **Видео** должны поддерживать CORS для воспроизведения
- Всегда проверяйте, что у вас есть права на использование контента

---

**Готово!** Теперь вы знаете, как легко добавлять новые аниме на TRIDNYAHEY! 🎌