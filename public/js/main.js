// Utility functions
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Add new alert
    const container = document.querySelector('.main-content');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
}

function showLoading(button) {
    const originalText = button.textContent;
    button.innerHTML = '<span class="loading"></span> Загрузка...';
    button.disabled = true;
    
    return () => {
        button.textContent = originalText;
        button.disabled = false;
    };
}

// Auth status management
let currentUser = null;

async function checkAuthStatus() {
    try {
        const response = await fetch('/api/auth-status');
        const data = await response.json();
        
        if (data.authenticated) {
            currentUser = data.username;
            updateNavigation(true);
        } else {
            currentUser = null;
            updateNavigation(false);
        }
    } catch (error) {
        console.error('Error checking auth status:', error);
    }
}

function updateNavigation(isAuthenticated) {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    
    if (isAuthenticated) {
        navLinks.innerHTML = `
            <li><a href="/">Главная</a></li>
            <li><a href="/portfolio">Портфолио</a></li>
            <li><a href="/order">Заказать</a></li>
            <li><a href="/profile">Профиль</a></li>
            <li><button class="btn btn-secondary" onclick="logout()">Выйти</button></li>
        `;
    } else {
        navLinks.innerHTML = `
            <li><a href="/">Главная</a></li>
            <li><a href="/portfolio">Портфолио</a></li>
            <li><a href="/login" class="btn">Войти</a></li>
            <li><a href="/register" class="btn btn-secondary">Регистрация</a></li>
        `;
    }
}

// Registration form
async function handleRegister(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    };
    
    // Validation
    if (data.password !== data.confirmPassword) {
        showAlert('Пароли не совпадают', 'error');
        return;
    }
    
    if (data.password.length < 6) {
        showAlert('Пароль должен содержать минимум 6 символов', 'error');
        return;
    }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const hideLoading = showLoading(submitBtn);
    
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('Регистрация успешна! Теперь вы можете войти в систему.', 'success');
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } else {
            showAlert(result.error || 'Ошибка регистрации', 'error');
        }
    } catch (error) {
        showAlert('Ошибка сети. Попробуйте позже.', 'error');
    } finally {
        hideLoading();
    }
}

// Login form
async function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = {
        username: formData.get('username'),
        password: formData.get('password')
    };
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const hideLoading = showLoading(submitBtn);
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('Вход выполнен успешно!', 'success');
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        } else {
            showAlert(result.error || 'Ошибка входа', 'error');
        }
    } catch (error) {
        showAlert('Ошибка сети. Попробуйте позже.', 'error');
    } finally {
        hideLoading();
    }
}

// Logout
async function logout() {
    try {
        const response = await fetch('/api/logout', {
            method: 'POST',
        });
        
        if (response.ok) {
            showAlert('Вы успешно вышли из системы', 'success');
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        }
    } catch (error) {
        showAlert('Ошибка при выходе', 'error');
    }
}

// Order form handling
let selectedOptions = {
    style: '',
    type: '',
    height: ''
};

function selectOption(category, value, element) {
    selectedOptions[category] = value;
    
    // Update visual selection
    const siblings = element.parentNode.querySelectorAll('.option-card');
    siblings.forEach(card => card.classList.remove('selected'));
    element.classList.add('selected');
    
    // Update hidden input
    const hiddenInput = document.querySelector(`input[name="${category}"]`);
    if (hiddenInput) {
        hiddenInput.value = value;
    }
}

async function handleOrder(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = {
        style: formData.get('style'),
        type: formData.get('type'),
        height: formData.get('height'),
        description: formData.get('description')
    };
    
    // Validation
    if (!data.style || !data.type || !data.height) {
        showAlert('Пожалуйста, выберите все параметры заказа', 'error');
        return;
    }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const hideLoading = showLoading(submitBtn);
    
    try {
        const response = await fetch('/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('Заказ успешно создан! Скоро с вами свяжутся.', 'success');
            form.reset();
            // Reset selected options
            document.querySelectorAll('.option-card').forEach(card => {
                card.classList.remove('selected');
            });
            selectedOptions = { style: '', type: '', height: '' };
            
            // Show Telegram contact info
            setTimeout(() => {
                showTelegramContact();
            }, 2000);
        } else {
            showAlert(result.error || 'Ошибка создания заказа', 'error');
        }
    } catch (error) {
        showAlert('Ошибка сети. Попробуйте позже.', 'error');
    } finally {
        hideLoading();
    }
}

function showTelegramContact() {
    const contactDiv = document.createElement('div');
    contactDiv.className = 'card';
    contactDiv.style.marginTop = '2rem';
    contactDiv.innerHTML = `
        <h3 style="margin-bottom: 1rem;">🎉 Заказ оформлен!</h3>
        <p style="margin-bottom: 1rem;">Для обсуждения деталей и процесса работы свяжитесь со мной в Telegram:</p>
        <a href="https://t.me/yourusername" class="btn telegram-btn" target="_blank">
            📱 Написать в Telegram
        </a>
        <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-light);">
            Замените "yourusername" на ваш реальный Telegram username
        </p>
    `;
    
    const container = document.querySelector('.form-container');
    if (container) {
        container.appendChild(contactDiv);
    }
}

// Portfolio loading
async function loadPortfolio() {
    try {
        const response = await fetch('/api/portfolio');
        const portfolioItems = await response.json();
        
        const grid = document.querySelector('.portfolio-grid');
        if (!grid) return;
        
        if (portfolioItems.length === 0) {
            grid.innerHTML = `
                <div class="card" style="grid-column: 1 / -1; text-align: center;">
                    <h3>🎨 Портфолио скоро будет заполнено</h3>
                    <p>Здесь будут размещены примеры работ</p>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = portfolioItems.map(item => `
            <div class="portfolio-item">
                <img src="${item.image_path}" alt="${item.title}" loading="lazy">
                <div class="portfolio-overlay">
                    <h4>${item.title}</h4>
                    <p>${item.description || ''}</p>
                    <small>${item.category || 'Roblox Art'}</small>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading portfolio:', error);
        const grid = document.querySelector('.portfolio-grid');
        if (grid) {
            grid.innerHTML = `
                <div class="card" style="grid-column: 1 / -1; text-align: center;">
                    <h3>❌ Ошибка загрузки</h3>
                    <p>Не удалось загрузить портфолио. Попробуйте обновить страницу.</p>
                </div>
            `;
        }
    }
}

// Profile page - load user orders
async function loadUserOrders() {
    try {
        const response = await fetch('/api/my-orders');
        const orders = await response.json();
        
        const ordersList = document.querySelector('.orders-list');
        if (!ordersList) return;
        
        if (orders.length === 0) {
            ordersList.innerHTML = `
                <div class="card" style="text-align: center;">
                    <h3>📝 У вас пока нет заказов</h3>
                    <p>Создайте свой первый заказ!</p>
                    <a href="/order" class="btn" style="margin-top: 1rem;">Создать заказ</a>
                </div>
            `;
            return;
        }
        
        ordersList.innerHTML = orders.map(order => `
            <div class="order-item">
                <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 1rem;">
                    <h4>Заказ #${order.id}</h4>
                    <span class="order-status status-${order.status}">
                        ${getStatusText(order.status)}
                    </span>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                    <div>
                        <strong>Стиль:</strong> ${order.style}
                    </div>
                    <div>
                        <strong>Тип:</strong> ${order.type}
                    </div>
                    <div>
                        <strong>Рост:</strong> ${order.height}
                    </div>
                </div>
                ${order.description ? `
                    <div style="margin-bottom: 1rem;">
                        <strong>Описание:</strong>
                        <p style="margin-top: 0.5rem;">${order.description}</p>
                    </div>
                ` : ''}
                <small style="color: var(--text-light);">
                    Создан: ${new Date(order.created_at).toLocaleDateString('ru-RU')}
                </small>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading orders:', error);
    }
}

function getStatusText(status) {
    const statusMap = {
        'pending': 'Ожидает',
        'progress': 'В работе',
        'completed': 'Завершен'
    };
    return statusMap[status] || status;
}

// Sakura petals animation
function createSakuraPetals() {
    const petalsContainer = document.createElement('div');
    petalsContainer.className = 'sakura-petals';
    
    for (let i = 0; i < 9; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petalsContainer.appendChild(petal);
    }
    
    document.body.appendChild(petalsContainer);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Create sakura petals animation
    createSakuraPetals();
    
    // Check authentication status
    checkAuthStatus();
    
    // Page-specific initialization
    const currentPage = window.location.pathname;
    
    if (currentPage === '/portfolio') {
        loadPortfolio();
    }
    
    if (currentPage === '/profile') {
        loadUserOrders();
    }
    
    // Form handlers
    const registerForm = document.querySelector('#registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    const loginForm = document.querySelector('#loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const orderForm = document.querySelector('#orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrder);
    }
});

// Smooth scrolling for navigation links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
});