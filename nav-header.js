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
                color: #00d4ff !important;
                text-decoration: none !important;
                display: flex !important;
                align-items: center !important;
                gap: 10px !important;
                transition: all 0.3s ease !important;
            }

            .nav-logo .nav-logo-icon {
                width: 24px !important;
                height: 24px !important;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                flex: 0 0 auto !important;
            }

            .nav-logo .nav-logo-text {
                font-size: 1.3em !important;
                font-weight: bold !important;
                background: linear-gradient(135deg, #00d4ff, #7b2cbf) !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
                background-clip: text !important;
            }

            .nav-logo .nav-logo-icon svg {
                width: 100% !important;
                height: 100% !important;
                stroke: currentColor !important;
                stroke-width: 2 !important;
                fill: none !important;
                stroke-linecap: round !important;
                stroke-linejoin: round !important;
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
                max-height: calc(100vh - 110px) !important;
                overflow-y: auto !important;
                overscroll-behavior: contain !important;
                -webkit-overflow-scrolling: touch !important;
                opacity: 1 !important;
                transform: translateY(0) !important;
            }

            .nav-dropdown::-webkit-scrollbar {
                width: 8px !important;
            }

            .nav-dropdown::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.03) !important;
            }

            .nav-dropdown::-webkit-scrollbar-thumb {
                background: rgba(0, 212, 255, 0.35) !important;
                border-radius: 999px !important;
            }

            .nav-dropdown-header {
                padding: 18px 20px !important;
                border-bottom: 1px solid rgba(0, 212, 255, 0.15) !important;
                font-size: 0.75em !important;
                text-transform: uppercase !important;
                letter-spacing: 2px !important;
                color: #666 !important;
                display: flex !important;
                align-items: center !important;
                gap: 8px !important;
            }

            .nav-dropdown-header .nav-header-icon {
                width: 14px !important;
                height: 14px !important;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                flex: 0 0 auto !important;
            }

            .nav-dropdown-header .nav-header-icon svg {
                width: 100% !important;
                height: 100% !important;
                stroke: currentColor !important;
                stroke-width: 2 !important;
                fill: none !important;
                stroke-linecap: round !important;
                stroke-linejoin: round !important;
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
                width: 35px !important;
                height: 35px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                background: rgba(0, 212, 255, 0.1) !important;
                border-radius: 8px !important;
                transition: all 0.3s ease !important;
            }

            .nav-menu a .nav-icon svg {
                width: 18px !important;
                height: 18px !important;
                stroke: currentColor !important;
                stroke-width: 2 !important;
                fill: none !important;
                stroke-linecap: round !important;
                stroke-linejoin: round !important;
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
            path.includes('/quality-systems/') ||
            path.includes('/4-17-2026') ||
            path.includes('/4-23-2026/')) {
            return '..';
        }
        return '.';
    }

    const basePath = getBasePath();

    const iconSvg = {
        home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>',
        portfolio: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/></svg>',
        folder: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"/></svg>',
        flask: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 2h4"/><path d="M12 2v6l5.5 9.5A2.5 2.5 0 0 1 15.4 21H8.6a2.5 2.5 0 0 1-2.1-3.5L12 8"/><path d="M8.5 14h7"/></svg>',
        building: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="10" width="18" height="10" rx="1"/><path d="M6 10V6l6-3 6 3v4"/><path d="M8 14h.01M12 14h.01M16 14h.01"/></svg>',
        fileText: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z"/><path d="M14 2v5h5"/><path d="M9 13h6M9 17h6M9 9h2"/></svg>',
        wrench: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.2 2.2-2.6-.5-.5-2.6z"/></svg>',
        chart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3v18h18"/><path d="m7 14 3-3 3 2 4-5"/></svg>',
        bug: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3 3 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c-2 .2-3.53 1.9-3.53 3.8"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/></svg>'
    };

    function renderIcon(name) {
        return iconSvg[name] || iconSvg.folder;
    }

    const navWorks = [
        {
            url: '4-23-2026/main.html',
            icon: 'bug',
            title: 'Отчёт о тестировании',
            subject: 'Обеспечение качества функционирования компьютерных систем'
        },
        {
            url: 'quality-systems/operator_manual_practice_work_2.html',
            icon: 'flask',
            title: 'Руководство оператора (ПР №2)',
            subject: 'Обеспечение качества функционирования компьютерных систем'
        },
        {
            url: 'practical_doc_manual.html',
            icon: 'fileText',
            title: 'Руководство пользователя',
            subject: 'Внедрение и поддержка компьютерных систем'
        },
        {
            url: '12-10-2025/main-2.html',
            icon: 'building',
            title: 'План коммуникаций',
            subject: 'Управление программными проектами'
        },
        {
            url: '4-17-2026/main.html',
            icon: 'bug',
            title: 'Тестирование ПО',
            subject: 'Обеспечение качества функционирования компьютерных систем'
        },
        {
            url: '12-24-2025/main.html',
            icon: 'fileText',
            title: 'Устав EduTrack',
            subject: 'Управление программными проектами'
        },
        {
            url: '12-10-2025/main.html',
            icon: 'wrench',
            title: 'Оценка трудоемкости',
            subject: 'Управление программными проектами'
        },
        {
            url: '12-3-2025/main.html',
            icon: 'chart',
            title: 'Корпоративная доска',
            subject: 'Управление программными проектами'
        }
    ];

    function buildNavMenu() {
        const groupedWorks = new Map();

        navWorks.forEach((work) => {
            const existingWorks = groupedWorks.get(work.subject) || [];
            existingWorks.push(work);
            groupedWorks.set(work.subject, existingWorks);
        });

        const subjectSections = Array.from(groupedWorks.entries()).map(([subject, works]) => `
            <li class="nav-section-title">${subject}</li>
            ${works.map((work) => `
                <li>
                    <a href="${basePath}/${work.url}" data-page="${work.url}">
                        <span class="nav-icon">${renderIcon(work.icon)}</span>
                        <span class="nav-text">${work.title}</span>
                        <span class="nav-arrow">→</span>
                    </a>
                </li>
            `).join('')}
        `).join('');

        return `
            <li>
                <a href="${basePath}/index.html" data-page="home">
                    <span class="nav-icon">${renderIcon('home')}</span>
                    <span class="nav-text">Главная</span>
                    <span class="nav-arrow">→</span>
                </a>
            </li>
            <li class="nav-divider"></li>
            <li class="nav-section-title">Предметы и практические</li>
            ${subjectSections}
        `;
    }

    const headerHTML = `
        <div class="nav-overlay" id="navOverlay"></div>
        <nav class="nav-header">
            <div class="nav-container">
                <a href="${basePath}/index.html" class="nav-logo">
                    <span class="nav-logo-icon">${renderIcon('portfolio')}</span>
                    <span class="nav-logo-text">Практические по предметам</span>
                </a>
                
                <button class="burger-btn" id="burgerBtn" aria-label="Меню">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div class="nav-dropdown" id="navDropdown">
                    <div class="nav-dropdown-header">
                        <span class="nav-header-icon">${renderIcon('folder')}</span>
                        <span>Навигация по предметам</span>
                    </div>
                    <ul class="nav-menu" id="navMenu">
                        ${buildNavMenu()}
                    </ul>
                </div>
            </div>
        </nav>
    `;

    function normalizePath(path) {
        return path.replace(/\/+$/, '') || '/';
    }

    function setActivePage() {
        const currentPath = normalizePath(globalThis.location.pathname);
        const links = document.querySelectorAll('.nav-menu a');

        links.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            const targetPath = normalizePath(new URL(href, globalThis.location.href).pathname);
            const isIndexPage = targetPath.endsWith('/index.html');
            const indexDirectory = isIndexPage
                ? normalizePath(targetPath.replace(/\/index\.html$/, ''))
                : '';

            if (currentPath === targetPath ||
                (isIndexPage && (currentPath === '/' || currentPath === indexDirectory))) {
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
