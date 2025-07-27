// Global variables
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.indicator');
let slideInterval;

// Anime data for demo
const animeData = {
    'attack-on-titan': {
        title: 'Атака титанов',
        episodes: 75,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    'naruto': {
        title: 'Наруто',
        episodes: 720,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    },
    'demon-slayer': {
        title: 'Демон Слайер',
        episodes: 44,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    },
    'jujutsu-kaisen': {
        title: 'Магическая битва',
        episodes: 24,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    'one-piece': {
        title: 'Ван Пис',
        episodes: 1000,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    },
    'spirited-away': {
        title: 'Унесённые призраками',
        episodes: 1,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    },
    'your-name': {
        title: 'Твоё имя',
        episodes: 1,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    'death-note': {
        title: 'Тетрадь смерти',
        episodes: 37,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    },
    'one-punch-man': {
        title: 'Ванпанчмен',
        episodes: 24,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
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
    generateEpisodes(anime.episodes, episodesGrid);
    
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

function generateEpisodes(episodeCount, container) {
    container.innerHTML = '';
    
    const maxEpisodes = Math.min(episodeCount, 50); // Limit for demo
    
    for (let i = 1; i <= maxEpisodes; i++) {
        const episodeBtn = document.createElement('button');
        episodeBtn.className = 'episode-btn';
        episodeBtn.textContent = i;
        episodeBtn.onclick = () => selectEpisode(i, episodeBtn);
        
        if (i === 1) {
            episodeBtn.classList.add('active');
        }
        
        container.appendChild(episodeBtn);
    }
    
    if (episodeCount > 50) {
        const moreBtn = document.createElement('button');
        moreBtn.className = 'episode-btn';
        moreBtn.textContent = '...';
        moreBtn.style.cursor = 'default';
        container.appendChild(moreBtn);
    }
}

function selectEpisode(episodeNumber, buttonElement) {
    // Remove active class from all episode buttons
    document.querySelectorAll('.episode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to selected button
    buttonElement.classList.add('active');
    
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