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
            }

            .nav-menu {
                display: flex !important;
                gap: 10px !important;
                list-style: none !important;
                flex-wrap: wrap !important;
                margin: 0 !important;
                padding: 0 !important;
            }

            .nav-menu li {
                position: relative !important;
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
                gap: 8px !important;
                padding: 10px 18px !important;
                color: #a0a0a0 !important;
                text-decoration: none !important;
                border-radius: 10px !important;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
                font-size: 0.95em !important;
                border: 1px solid transparent !important;
                position: relative !important;
                overflow: hidden !important;
            }

            .nav-menu a:hover::before {
                content: '' !important;
                display: block !important;
                position: absolute !important;
                top: 0 !important;
                left: -100% !important;
                width: 100% !important;
                height: 100% !important;
                background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.3), transparent) !important;
                transition: left 0.6s ease !important;
            }

            .nav-menu a:hover::before { left: 100% !important; }

            .nav-menu a::after {
                content: '▹' !important;
                position: absolute !important;
                left: -15px !important;
                opacity: 0 !important;
                transition: all 0.3s ease !important;
                color: #00d4ff !important;
                font-size: 1.2em !important;
                display: block !important;
            }

            .nav-menu a:hover::after {
                left: 8px !important;
                opacity: 1 !important;
            }

            .nav-menu a:hover {
                padding-left: 30px !important;
                transform: translateY(-3px) !important;
                color: #00d4ff !important;
                background: rgba(0, 212, 255, 0.15) !important;
                border-color: rgba(0, 212, 255, 0.4) !important;
                box-shadow: 0 5px 15px rgba(0, 212, 255, 0.2) !important;
            }

            .nav-menu a.active {
                animation: pulse-menu 2s ease-in-out infinite !important;
                background: rgba(0, 212, 255, 0.15) !important;
                border-color: rgba(0, 212, 255, 0.4) !important;
                color: #00d4ff !important;
                font-weight: 600 !important;
            }

            @keyframes pulse-menu {
                0%, 100% {
                    box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.4) !important;
                }
                50% {
                    box-shadow: 0 0 0 8px rgba(0, 212, 255, 0) !important;
                }
            }

            .mobile-menu-btn {
                display: none !important;
                background: none !important;
                border: none !important;
                color: #00d4ff !important;
                font-size: 1.5em !important;
                cursor: pointer !important;
                padding: 5px !important;
            }

            body { padding-top: 70px !important; }

            @media (max-width: 768px) {
                .nav-menu {
                    position: absolute !important;
                    top: 100% !important;
                    left: 0 !important;
                    right: 0 !important;
                    background: rgba(15, 15, 35, 0.98) !important;
                    flex-direction: column !important;
                    padding: 20px !important;
                    border-bottom: 1px solid rgba(0, 212, 255, 0.2) !important;
                    display: none !important;
                }

                .nav-menu.active { display: flex !important; }
                .mobile-menu-btn { display: block !important; }
                .nav-menu a { width: 100% !important; }
            }
        </style>
    `;

    function getBasePath() {
        const path = globalThis.location.pathname;

        if (path.includes('/12-3-2025/') || path.includes('/12-10-2025/')) {
            return '..';
        }

        return '.';
    }

    const basePath = getBasePath();

    const headerHTML = `
        <nav class="nav-header">
            <div class="nav-container">
                <a href="${basePath}/index.html" class="nav-logo">
                    <span>💼</span>
                    <span>Портфолио</span>
                </a>
                
                <ul class="nav-menu" id="navMenu">
                    <li><a href="${basePath}/index.html" data-page="home">Главная</a></li>
                    <li><a href="${basePath}/12-3-2025/main.html" data-page="work1">Корпоративная доска заметок</a></li>
                    <li><a href="${basePath}/12-10-2025/main.html" data-page="work2">Оценка трудоемкости</a></li>
                </ul>

                <button class="mobile-menu-btn" id="mobileMenuBtn">☰</button>
            </div>
        </nav>
    `;

    function setActivePage() {
        const currentPath = globalThis.location.pathname;
        const links = document.querySelectorAll('.nav-menu a');

        links.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');

            if (currentPath === href || (href !== '/' && currentPath.includes(href))) {
                link.classList.add('active');
            }
        });

        if (currentPath === '/' || currentPath === '/index.html') {
            const homeLink = document.querySelector('.nav-menu a[data-page="home"]');
            if (homeLink) homeLink.classList.add('active');
        }
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

        const mobileBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');

        if (mobileBtn && navMenu) {
            mobileBtn.addEventListener('click', function() {
                navMenu.classList.toggle('active');
            });

            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                });
            });

            document.addEventListener('click', function(e) {
                if (!navMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
                    navMenu.classList.remove('active');
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavHeader);
    } else {
        initNavHeader();
    }
})();

globalThis.addNavItem = function(icon, text, href, dataPage) {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${href}" data-page="${dataPage}">${icon} ${text}</a>`;
        navMenu.appendChild(li);
    }
};