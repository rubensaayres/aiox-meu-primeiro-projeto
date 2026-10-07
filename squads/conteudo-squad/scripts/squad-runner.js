/**
 * Squad Runner - Conteúdo Squad
 * Orquestrador e Dispatcher de Tarefas da Squad
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONFIG = {
    squadDir: './squads/conteudo-squad',
    outputDir: './squads/conteudo-squad/output',
    tasksDir: './squads/conteudo-squad/tasks',
    whatsappCli: 'skills/whatsapp/scripts/whatsapp-cli.js'
};

class SquadDispatcher {
    /**
     * Executa um comando de WhatsApp através da CLI
     * @param {string} number - Número do destino
     * @param {string} text - Texto da mensagem
     * @param {boolean} autoConfirm - Se deve pular a confirmação humana (true para automações)
     */
    static async sendWhatsApp(number, text, autoConfirm = false) {
        console.log(`📲 Dispatching WhatsApp message to ${number}...`);

        const confirmFlag = autoConfirm ? '--confirmado' : '';
        // Using a template literal and escaping double quotes for the shell command
        const command = `node ${CONFIG.whatsappCli} enviar --para ${number} --texto "${text.replace(/"/g, '\\"')}" ${confirmFlag}`;

        try {
            const output = execSync(command, { encoding: 'utf8' });
            console.log(`✅ Success: ${output}`);
            return JSON.parse(output);
        } catch (error) {
            // Log the actual stderr from the CLI instead of the generic error message
            const stderr = error.stderr ? error.stderr.toString() : error.message;
            console.error(`❌ Dispatch Error: ${stderr}`);
            throw error;
        }
    }

    /**
     * Orquestra o fluxo de conteúdo
     */
    static async runContentCycle(topic, targetNumber) {
        console.log(`🚀 Starting Content Cycle for: ${topic}`);

        // Aqui entrariam as chamadas para a Luna, Leo e Vera
        // Simulando o fluxo de saída:
        const finalContent = "⚡ Oferta Relâmpago: Desconto exclusivo de 24h para nossa lista VIP! 🎁 Cadastre-se agora para garantir o seu desconto: https://docs.google.com/forms/d/1Y3ml5a2OJyZokn3ka3-zCGWdPHMmxgz06K6ZX3jH5uE/edit";

        await this.sendWhatsApp(targetNumber, finalContent, true);
    }
}

// Example execution for the loop
if (require.main === module) {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.log("Usage: node squad-runner.js <topic> <number>");
        process.exit(1);
    }
    SquadDispatcher.runContentCycle(args[0], args[1]).catch(console.error);
}

module.exports = { SquadDispatcher };
