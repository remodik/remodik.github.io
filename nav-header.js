(function() {
    const styles = `
        <style id="nav-header-styles">
            .nav-header * {
                margin: 0 !important;
                padding: 0 !important;
                box-sizing: border-box !important;
            }

            .nav-header {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                z-index: 10000 !important;
                background: rgba(15, 15, 35, 0.95) !important;
                backdrop-filter: blur(10px) !important;
                border-bottom: 1px solid rgba(0, 212, 255, 0.2) !important;
                box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3) !important;
            }

            .nav-container {
                max-width: 1400px !important;
                margin: 0 auto !important;
                padding: 15px 20px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                gap: 20px !important;
            }

            .nav-logo {
                font-size: 1.3em !important;
                font-weight: bold !important;
                background: linear-gradient(135deg, #00d4ff, #7b2cbf) !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
                background-clip: text !important;
                text-decoration: none !important;
                display: flex !important;
                align-items: center !important;
                gap: 10px !important;
                transition: all 0.3s ease !important;
            }

            .nav-logo:hover {
                transform: scale(1.05) !important;
            }

            .burger-btn {
                display: flex !important;
                flex-direction: column !important;
                justify-content: center !important;
                align-items: center !important;
                width: 45px !important;
                height: 45px !important;
                background: rgba(0, 212, 255, 0.1) !important;
                border: 1px solid rgba(0, 212, 255, 0.3) !important;
                border-radius: 12px !important;
                cursor: pointer !important;
                transition: all 0.3s ease !important;
                position: relative !important;
                gap: 5px !important;
            }

            .burger-btn:hover {
                background: rgba(0, 212, 255, 0.2) !important;
                border-color: rgba(0, 212, 255, 0.5) !important;
                transform: scale(1.05) !important;
            }

            .burger-btn span {
                display: block !important;
                width: 22px !important;
                height: 2px !important;
                background: #00d4ff !important;
                border-radius: 2px !important;
                transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
            }

            .burger-btn.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px) !important;
            }

            .burger-btn.active span:nth-child(2) {
                opacity: 0 !important;
                transform: translateX(-10px) !important;
            }

            .burger-btn.active span:nth-child(3) {
                transform: rotate(-45deg) translate(5px, -5px) !important;
            }

            .nav-dropdown {
                position: absolute !important;
                top: 100% !important;
                right: 20px !important;
                width: 320px !important;
                max-height: 0 !important;
                overflow: hidden !important;
                background: rgba(15, 15, 35, 0.98) !important;
                backdrop-filter: blur(20px) !important;
                border: 1px solid rgba(0, 212, 255, 0.2) !important;
                border-radius: 16px !important;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 212, 255, 0.1) !important;
                transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
                opacity: 0 !important;
                transform: translateY(-10px) !important;
                margin-top: 10px !important;
            }

            .nav-dropdown.active {
                max-height: 500px !important;
                opacity: 1 !important;
                transform: translateY(0) !important;
            }

            .nav-dropdown-header {
                padding: 18px 20px !important;
                border-bottom: 1px solid rgba(0, 212, 255, 0.15) !important;
                font-size: 0.75em !important;
                text-transform: uppercase !important;
                letter-spacing: 2px !important;
                color: #666 !important;
            }

            .nav-menu {
                list-style: none !important;
                padding: 10px !important;
                margin: 0 !important;
            }

            .nav-menu li {
                margin: 0 !important;
                padding: 0 !important;
            }

            .nav-menu li::before,
            .nav-menu li::after,
            .nav-menu a::before,
            .nav-menu a::after {
                content: none !important;
                display: none !important;
            }

            .nav-menu a {
                display: flex !important;
                align-items: center !important;
                gap: 12px !important;
                padding: 14px 16px !important;
                color: #a0a0a0 !important;
                text-decoration: none !important;
                border-radius: 12px !important;
                transition: all 0.3s ease !important;
                font-size: 0.95em !important;
                border: 1px solid transparent !important;
                position: relative !important;
                overflow: hidden !important;
            }

            .nav-menu a .nav-icon {
                font-size: 1.3em !important;
                width: 35px !important;
                height: 35px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                background: rgba(0, 212, 255, 0.1) !important;
                border-radius: 8px !important;
                transition: all 0.3s ease !important;
            }

            .nav-menu a .nav-text {
                flex: 1 !important;
            }

            .nav-menu a .nav-arrow {
                opacity: 0 !important;
                transform: translateX(-10px) !important;
                transition: all 0.3s ease !important;
                color: #00d4ff !important;
            }

            .nav-menu a:hover {
                color: #00d4ff !important;
                background: rgba(0, 212, 255, 0.1) !important;
                border-color: rgba(0, 212, 255, 0.2) !important;
                transform: translateX(5px) !important;
            }

            .nav-menu a:hover .nav-icon {
                background: rgba(0, 212, 255, 0.2) !important;
                transform: scale(1.1) !important;
            }

            .nav-menu a:hover .nav-arrow {
                opacity: 1 !important;
                transform: translateX(0) !important;
            }

            .nav-menu a.active {
                background: rgba(0, 212, 255, 0.15) !important;
                border-color: rgba(0, 212, 255, 0.3) !important;
                color: #00d4ff !important;
            }

            .nav-menu a.active .nav-icon {
                background: linear-gradient(135deg, #00d4ff, #7b2cbf) !important;
            }

            .nav-menu .nav-divider {
                height: 1px !important;
                background: rgba(0, 212, 255, 0.1) !important;
                margin: 8px 16px !important;
            }

            .nav-menu .nav-section-title {
                padding: 10px 16px 5px !important;
                font-size: 0.7em !important;
                text-transform: uppercase !important;
                letter-spacing: 1.5px !important;
                color: #555 !important;
            }

            .nav-overlay {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                background: rgba(0, 0, 0, 0.5) !important;
                opacity: 0 !important;
                visibility: hidden !important;
                transition: all 0.3s ease !important;
                z-index: 9998 !important;
            }

            .nav-overlay.active {
                opacity: 1 !important;
                visibility: visible !important;
            }

            body {
                padding-top: 75px !important;
            }

            @media (max-width: 480px) {
                .nav-dropdown {
                    right: 10px !important;
                    left: 10px !important;
                    width: auto !important;
                }

                .nav-logo span:last-child {
                    display: none !important;
                }
            }
        </style>
    `;

    function getBasePath() {
        const path = globalThis.location.pathname;
        if (path.includes('/12-3-2025/') ||
            path.includes('/12-10-2025/') ||
            path.includes('/12-24-2025/') ||
            path.includes('/01-12-2026/')) {
            return '..';
        }
        return '.';
    }

    const basePath = getBasePath();

    const headerHTML = `
        <div class="nav-overlay" id="navOverlay"></div>
        <nav class="nav-header">
            <div class="nav-container">
                <a href="${basePath}/index.html" class="nav-logo">
                    <span>💼</span>
                    <span>Портфолио работ</span>
                </a>
                
                <button class="burger-btn" id="burgerBtn" aria-label="Меню">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div class="nav-dropdown" id="navDropdown">
                    <div class="nav-dropdown-header">📂 Навигация по проектам</div>
                    <ul class="nav-menu" id="navMenu">
                        <li>
                            <a href="${basePath}/index.html" data-page="home">
                                <span class="nav-icon">🏠</span>
                                <span class="nav-text">Главная</span>
                                <span class="nav-arrow">→</span>
                            </a>
                        </li>
                        <li class="nav-divider"></li>
                        <li class="nav-section-title">Практические работы</li>
                        <li>
                            <a href="${basePath}/12-3-2025/main.html" data-page="work1">
                                <span class="nav-icon">📊</span>
                                <span class="nav-text">Корпоративная доска</span>
                                <span class="nav-arrow">→</span>
                            </a>
                        </li>
                        <li>
                            <a href="${basePath}/12-10-2025/main.html" data-page="work2">
                                <span class="nav-icon">🔧</span>
                                <span class="nav-text">Оценка трудоемкости</span>
                                <span class="nav-arrow">→</span>
                            </a>
                        </li>
                        <li>
                            <a href="${basePath}/12-24-2025/main.html" data-page="work3">
                                <span class="nav-icon">🛠️</span>
                                <span class="nav-text">Устав EduTrack</span>
                                <span class="nav-arrow">→</span>
                            </a>
                        </li>
                        <li>
                            <a href="${basePath}/01-12-2026/main.html" data-page="work4">
                                <span class="nav-icon">🏦</span>
                                <span class="nav-text">План коммуникаций</span>
                                <span class="nav-arrow">→</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;

    function setActivePage() {
        const currentPath = globalThis.location.pathname;
        const links = document.querySelectorAll('.nav-menu a');

        links.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (currentPath.endsWith(href.replace(basePath, '')) ||
                (href.includes('index.html') && (currentPath === '/' || currentPath.endsWith('/index.html')))) {
                link.classList.add('active');
            }
        });
    }

    function initNavHeader() {
        if (document.querySelector('.nav-header')) {
            console.log('Navigation header already exists');
            return;
        }

        if (!document.getElementById('nav-header-styles')) {
            document.head.insertAdjacentHTML('beforeend', styles);
        }

        document.body.insertAdjacentHTML('afterbegin', headerHTML);

        setActivePage();

        const burgerBtn = document.getElementById('burgerBtn');
        const navDropdown = document.getElementById('navDropdown');
        const navOverlay = document.getElementById('navOverlay');

        function toggleMenu() {
            burgerBtn.classList.toggle('active');
            navDropdown.classList.toggle('active');
            navOverlay.classList.toggle('active');
        }

        function closeMenu() {
            burgerBtn.classList.remove('active');
            navDropdown.classList.remove('active');
            navOverlay.classList.remove('active');
        }

        if (burgerBtn && navDropdown) {
            burgerBtn.addEventListener('click', toggleMenu);
            navOverlay.addEventListener('click', closeMenu);

            navDropdown.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', closeMenu);
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeMenu();
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavHeader);
    } else {
        initNavHeader();
    }
})();