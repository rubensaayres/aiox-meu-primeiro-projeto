const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const DOCKER_EXECUTABLE = 'C:\\Program Files\\Docker\\Docker\\resources\\bin\\docker.exe';
const OPENWA_SESSION_ID = 'af17a2e5-8663-4ce7-97f1-a1028235153a';

const ENDPOINTS = {
    naoLidas: '/messages/unread',
    conversas: '/chats',
    mensagens: '/messages',
    contatos: '/contacts',
    grupos: '/groups',
    anexos: '/media',
    enviarTexto: '/api/sessions/{{sessionId}}/messages/send-text',
    enviarArquivo: '/api/sessions/{{sessionId}}/messages/send-file'
};

function morrer(msg, code = 1) {
    console.error(JSON.stringify({ ok: false, error: msg }));
    process.exit(code);
}

async function carregarConfig() {
    const configPath = path.join(__dirname, '..', 'config.json');
    if (!fs.existsSync(configPath)) {
        morrer("Arquivo config.json não encontrado.");
    }
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

async function chamar(cfg, endpoint, { metodo = 'GET', corpo = null, params = {} }) {
    const resolvedEndpoint = endpoint.replace('{{sessionId}}', cfg.sessionId || 'default');
    const url = new URL(cfg.baseUrl + resolvedEndpoint);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const response = await fetch(url, {
        method: metodo,
        headers: {
            'Authorization': `Bearer ${cfg.token}`,
            'Content-Type': 'application/json'
        },
        body: corpo ? JSON.stringify(corpo) : null
    });

    if (!response.ok) {
        throw new Error(`Erro na API (${response.status}): ${await response.text()}`);
    }

    return response.json();
}

function enviarTextoPeloContainer(endpoint, corpo) {
    const script = [
        "const fs = require('fs');",
        "const apiKey = fs.readFileSync('/app/data/.api-key', 'utf8').trim();",
        'const endpoint = process.argv[1];',
        'const body = process.argv[2];',
        '(async () => {',
        "    const response = await fetch('http://localhost:2785' + endpoint, {",
        "        method: 'POST',",
        "        headers: { 'X-API-Key': apiKey, 'Content-Type': 'application/json' },",
        '        body,',
        '    });',
        '    const responseBody = await response.text();',
        '    process.stdout.write(JSON.stringify({ status: response.status, body: responseBody }));',
        '})().catch((error) => {',
        '    process.stdout.write(JSON.stringify({ error: error?.message ?? String(error) }));',
        '});',
    ].join('\n');

    const output = execFileSync(DOCKER_EXECUTABLE, [
        'exec',
        'openwa-api',
        'node',
        '-e',
        script,
        endpoint,
        JSON.stringify(corpo),
    ], { encoding: 'utf8', windowsHide: true });
    const result = JSON.parse(output);

    if (result.error) throw new Error(result.error);
    if (result.status < 200 || result.status >= 300) {
        throw new Error(`Erro na API (${result.status}): ${result.body}`);
    }

    return JSON.parse(result.body);
}

function registrarEnvio(para, conteudo) {
    const logPath = path.join(__dirname, '..', 'envios.log');
    const entry = `[${new Date().toISOString()}] Para: ${para} | Conteudo: ${conteudo.substring(0, 50)}...\n`;
    fs.appendFileSync(logPath, entry);
}

async function main() {
    const cfg = await carregarConfig();
    const args = process.argv.slice(2);
    const comando = args[0];

    if (!comando) morrer("Comando não fornecido.");

    const flags = {};
    args.forEach((arg, i) => {
        if (arg.startsWith('--')) {
            const key = arg.slice(2);
            const val = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true;
            flags[key] = val;
        }
    });

    switch (comando) {
        case 'nao-lidas':
            const unread = await chamar(cfg, ENDPOINTS.naoLidas);
            console.log(JSON.stringify({ ok: true, data: unread }, null, 2));
            break;
        case 'conversas':
            const chats = await chamar(cfg, ENDPOINTS.conversas, { params: { limite: flags.limite || 30 } });
            console.log(JSON.stringify({ ok: true, data: chats }, null, 2));
            break;
        case 'mensagens':
            if (!flags.chat) morrer("A flag --chat <id> é obrigatória.");
            const msgs = await chamar(cfg, ENDPOINTS.mensagens, { params: { chat: flags.chat, limite: flags.limite || 50 } });
            console.log(JSON.stringify({ ok: true, data: msgs }, null, 2));
            break;
        case 'contatos':
            if (!flags.busca) morrer("A flag --busca <nome> é obrigatória.");
            const contacts = await chamar(cfg, ENDPOINTS.contatos, { params: { busca: flags.busca } });
            console.log(JSON.stringify({ ok: true, data: contacts }, null, 2));
            break;
        case 'grupos':
            const groups = await chamar(cfg, ENDPOINTS.grupos);
            console.log(JSON.stringify({ ok: true, data: groups }, null, 2));
            break;
        case 'anexos':
            if (!flags.chat) morrer("A flag --chat <id> é obrigatória.");
            const attachments = await chamar(cfg, ENDPOINTS.anexos, { params: { chat: flags.chat } });
            console.log(JSON.stringify({ ok: true, data: attachments }, null, 2));
            break;
        case 'enviar':
            const para = flags.para;
            const texto = flags.texto;
            const arquivo = flags.arquivo;
            if (!para) morrer("A flag --para <numero> é obrigatória.");
            if (!flags.confirmado) morrer("Envio bloqueado por falta de confirmação.");
            
            let resposta;
            const chatId = String(para).endsWith('@c.us') ? String(para) : `${para}@c.us`;
            const corpoEnvio = {
                chatId,
                text: texto
            };
            if (arquivo) {
                corpoEnvio.file = arquivo;
            }

            const endpointEnvio = ENDPOINTS.enviarTexto.replace('{{sessionId}}', OPENWA_SESSION_ID);
            resposta = enviarTextoPeloContainer(endpointEnvio, corpoEnvio);
            registrarEnvio(para, texto || '[arquivo]');
            console.log(JSON.stringify({ ok: true, enviadoPara: para, resposta }, null, 2));
            break;
        default:
            morrer(`comando desconhecido: ${comando}`);
    }
}
main().catch(e => morrer(e?.message ?? String(e), 9));
