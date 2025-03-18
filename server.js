require('dotenv').config();
const express = require('express');
const session = require('express-session');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

// Настраиваем EJS как шаблонизатор
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Подключаем сессии
app.use(session({
    secret: 'some-secret-key', // смените на свой секрет
    resave: false,
    saveUninitialized: true
}));

// Читаем переменные окружения
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI || `http://localhost:${port}/callback`;

// Главная страница: проверяем, авторизован ли пользователь
app.get('/', (req, res) => {
    if (!req.session.accessToken) {
        // Не авторизован — показываем кнопку входа
        return res.render('index', { isLoggedIn: false });
    }
    // Уже авторизован — переходим сразу на список серверов
    return res.redirect('/servers');
});

// Маршрут для авторизации: отправляем пользователя на Discord
app.get('/login', (req, res) => {
    // Скоупы: identify + guilds, чтобы получить информацию о пользователе и серверах
    const scope = encodeURIComponent('identify guilds');
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${scope}`;
    res.redirect(authUrl);
});

// Маршрут колбэка от Discord
app.get('/callback', async (req, res) => {
    const code = req.query.code;
    if (!code) {
        return res.send('Не получен параметр code от Discord');
    }

    // Готовим данные для обмена кода на токен
    const data = new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        scope: 'identify guilds'
    });

    try {
        // Обмениваем код на токен
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', data.toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        // Сохраняем токен в сессии
        req.session.accessToken = tokenResponse.data.access_token;

        // Перенаправляем на список серверов
        res.redirect('/servers');
    } catch (error) {
        console.error('Ошибка при обмене кода на токен:', error);
        res.send('Ошибка при авторизации');
    }
});

// Маршрут отображения серверов
app.get('/servers', async (req, res) => {
    // Если нет токена в сессии — отправляем на авторизацию
    if (!req.session.accessToken) {
        return res.redirect('/');
    }

    try {
        // Запрашиваем у Discord список серверов, где состоит пользователь
        const guildsRes = await axios.get('https://discord.com/api/users/@me/guilds', {
            headers: {
                Authorization: `Bearer ${req.session.accessToken}`
            }
        });

        const guilds = guildsRes.data;

        // Фильтруем только те, где пользователь — администратор (бит 0x8)
        const adminGuilds = guilds.filter(g => (g.permissions & 0x8) === 0x8);

        // Подготавливаем данные для отображения (ссылка на иконку, название и т.п.)
        const guildData = adminGuilds.map(g => {
            // Проверяем, не анимированная ли иконка (начинается с a_)
            const isAnimated = g.icon && g.icon.startsWith('a_');
            const extension = isAnimated ? 'gif' : 'png';
            const iconUrl = g.icon
                ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.${extension}?size=128`
                : 'https://cdn.discordapp.com/embed/avatars/0.png'; // fallback-иконка

            return {
                id: g.id,
                name: g.name,
                iconUrl
            };
        });

        // Рендерим шаблон EJS, передавая список серверов
        res.render('servers', { guilds: guildData });
    } catch (error) {
        console.error('Ошибка при получении серверов:', error);
        res.send('Ошибка при получении серверов');
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен: http://localhost:${port}`);
});
