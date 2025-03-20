const WebSocket = require("ws");
const fetch = require("node-fetch");

const token = "NzQzODY0NjU4OTUxMjc0NTI4.GpjKqR.E5b5pF8rmbcDqKQXQno5yqiVk2_Xmeyl6EzV_g";
const this_id = "743864658951274528";
const GATEWAY_URL = "wss://gateway.discord.gg/?v=9&encoding=json";
const STICKER_ID = "1351645006469005395";

async function handle_message(data, gatewayWs) {
    if (data.s !== undefined) {
        gatewayWs.lastS = data.s;
    }

    if (data.op === 0 && data.t === 'MESSAGE_CREATE') {
        const message = data.d;
        const mentioned = message.mentions.some(user => user.id === this_id);

        if (mentioned && (message.channel_id === "1002614491621638175" || message.channel_id === "1220430406466404502")) {
            send_sticker(message.channel_id);
        }
    }
}

async function send_sticker(channel_id) {
    try {
        const response = await fetch(`https://discord.com/api/v9/channels/${channel_id}/messages`, {
            method: "POST",
            headers: {
                "Authorization": `${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sticker_ids: [STICKER_ID]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Ошибка отправки стикера в ${channel_id}: ${response.status} - ${errorText}`);
        } else {
            console.log(`✅ Стикер ${STICKER_ID} отправлен в канал ${channel_id}`);
        }
    } catch (error) {
        console.error("Ошибка отправки стикера:", error);
    }
}

function connect_gateway() {
    const gatewayWs = new WebSocket(GATEWAY_URL);

    gatewayWs.on("open", () => {
        console.log("🔗 Подключено к Discord Gateway");
        const payload = {
            op: 2,
            d: {
                token: token,
                intents: 513,
                properties: { "$os": "linux", "$browser": "bot", "$device": "bot" }
            }
        };
        gatewayWs.send(JSON.stringify(payload));
    });

    gatewayWs.on("message", (data) => {
        const parsed = JSON.parse(data);
        handle_message(parsed, gatewayWs);
    });

    gatewayWs.on("close", () => {
        console.log("🔴 Отключено. Переподключение...");
        setTimeout(connect_gateway, 1000);
    });

    return gatewayWs;
}

connect_gateway();
