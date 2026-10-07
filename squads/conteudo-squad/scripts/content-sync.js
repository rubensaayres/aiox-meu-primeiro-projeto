/**
 * Content Sync - Conteúdo Squad
 * Organiza os artefatos produzidos entre as fases da squad.
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_PATH = './squads/conteudo-squad/output';

function syncArtifacts(topic, phase, content) {
    if (!fs.existsSync(OUTPUT_PATH)) fs.mkdirSync(OUTPUT_PATH, { recursive: true });
    
    const topicDir = path.join(OUTPUT_PATH, topic.replace(/\s+/g, '_').toLowerCase());
    if (!fs.existsSync(topicDir)) fs.mkdirSync(topicDir, { recursive: true });
    
    const fileName = `${phase}.md`;
    fs.writeFileSync(path.join(topicDir, fileName), content);
    
    console.log(`📦 Artefato de ${phase} salvo em ${topicDir}/${fileName}`);
}

module.exports = { syncArtifacts };
