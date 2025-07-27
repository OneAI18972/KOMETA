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
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        episodes_list: [
            { number: 1, title: 'Человечеству - 2000 лет спустя', duration: '24:10' },
            { number: 2, title: 'В тот день', duration: '24:10' },
            { number: 3, title: 'Тусклый свет среди отчаяния', duration: '24:10' }
        ]
    },
    'naruto': {
        title: 'Наруто',
        episodes: 720,
        year: '2002-2017',
        rating: 8.4,
        description: 'Приключения молодого ниндзя, мечтающего стать Хокаге своей деревни.',
        cover: 'https://cdn.myanimelist.net/images/anime/13/17405.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        episodes_list: [
            { number: 1, title: 'Узумаки Наруто появляется!', duration: '23:05' },
            { number: 2, title: 'Меня зовут Коноха-мару!', duration: '23:05' },
            { number: 3, title: 'Соперники? Сасуке и Сакура', duration: '23:05' }
        ]
    },
    'demon-slayer': {
        title: 'Клинок, рассекающий демонов',
        episodes: 44,
        year: '2019-2023',
        rating: 8.7,
        description: 'История о мальчике, который стал охотником на демонов, чтобы спасти свою сестру.',
        cover: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        episodes_list: [
            { number: 1, title: 'Жестокость', duration: '23:40' },
            { number: 2, title: 'Учитель Саконджи Урокодаки', duration: '23:40' },
            { number: 3, title: 'Сабито и Макомо', duration: '23:40' }
        ]
    },
    'jujutsu-kaisen': {
        title: 'Магическая битва',
        episodes: 24,
        year: '2020-2021',
        rating: 8.5,
        description: 'Юноша попадает в мир магии и проклятий, чтобы спасти своих друзей.',
        cover: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        episodes_list: [
            { number: 1, title: 'Рёмен Сукуна', duration: '23:42' },
            { number: 2, title: 'Для меня самого', duration: '23:42' },
            { number: 3, title: 'Девочка из стали', duration: '23:42' }
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
        episodes_list: [
            { number: 1, title: 'Стальной алхимик', duration: '24:50' },
            { number: 2, title: 'Первый день', duration: '24:50' },
            { number: 3, title: 'Город еретиков', duration: '24:50' }
        ]
    }
};

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeSlider();
    initializeSearch();
    initializeNavigation();
    setBackgroundImages();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

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

// Navigation Functions
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#search') {
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
    
    // Set video source
    video.src = anime.videoUrl;
    
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
    
    // Change video source (for demo, we'll just restart the same video)
    const video = document.getElementById('tridnyah-player');
    video.currentTime = 0;
    video.play();
    
    showNotification(`Эпизод ${episodeNumber} загружен`, 'success');
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