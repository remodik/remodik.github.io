require('dotenv').config();
const express = require('express');
const session = require('express-session');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: 'some-secret-key',
    resave: false,
    saveUninitialized: true
}));

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI || `http://localhost:${port}/callback`;

app.get('/', (req, res) => {
    if (!req.session.accessToken) {
        return res.render('index', { isLoggedIn: false });
    }
    return res.redirect('/servers');
});

app.get('/login', (req, res) => {
    const scope = encodeURIComponent('identify guilds');
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${scope}`;
    res.redirect(authUrl);
});

app.get('/callback', async (req, res) => {
    const code = req.query.code;
    if (!code) {
        return res.send('Не получен параметр code от Discord');
    }

    const data = new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        scope: 'identify guilds'
    });

    try {
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', data.toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        req.session.accessToken = tokenResponse.data.access_token;

        res.redirect('/servers');
    } catch (error) {
        console.error('Ошибка при обмене кода на токен:', error);
        res.send('Ошибка при авторизации');
    }
});

app.get('/servers', async (req, res) => {
    if (!req.session.accessToken) {
        return res.redirect('/');
    }

    try {
        const guildsRes = await axios.get('https://discord.com/api/users/@me/guilds', {
            headers: {
                Authorization: `Bearer ${req.session.accessToken}`
            }
        });

        const guilds = guildsRes.data;

        const adminGuilds = guilds.filter(g => (g.permissions & 0x8) === 0x8);

        const guildData = adminGuilds.map(g => {
            const isAnimated = g.icon && g.icon.startsWith('a_');
            const extension = isAnimated ? 'gif' : 'png';
            const iconUrl = g.icon
                ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.${extension}?size=128`
                : 'https://cdn.discordapp.com/embed/avatars/0.png';

            return {
                id: g.id,
                name: g.name,
                iconUrl
            };
        });

        res.render('servers', { guilds: guildData });
    } catch (error) {
        console.error('Ошибка при получении серверов:', error);
        res.send('Ошибка при получении серверов');
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен: http://localhost:${port}`);
});
