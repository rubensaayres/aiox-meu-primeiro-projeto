import 'dotenv/config';
import cron from 'node-cron';
import { scrapeCommemorativeDates } from './services/scraper';
import { filterDatesSemantically } from './core/semantic-engine';
import { sendReportEmail } from './services/email-service';
import { SEMANTIC_KEYWORDS } from './config';

async function runJob() {
  try {
    console.log(`[${new Date().toISOString()}] Iniciando ciclo do Calendário Semântico...`);

    // 1. Scraping
    const rawDates = await scrapeCommemorativeDates();
    console.log(`Foram encontradas ${rawDates.length} datas brutas.`);

    // 2. Filtragem Semântica
    const filteredDates = await filterDatesSemantically(rawDates, SEMANTIC_KEYWORDS);
    console.log(`Filtragem concluída. ${filteredDates.length} datas relevantes encontradas.`);

    // 3. Envio de Relatório
    if (filteredDates.length > 0) {
      await sendReportEmail(filteredDates);
    } else {
      console.log('Nenhuma data relevante para enviar.');
    }
  } catch (error) {
    console.error('Erro fatal na execução do job:', error);
  }
}

// Agendamento: Todo dia às 08:00 da manhã
// Cron expression: '0 8 * * *'
cron.schedule('0 8 * * *', () => {
  console.log('Executando agendamento diário das 08:00...');
  runJob();
});

console.log('📅 Servidor do Calendário Semântico iniciado.');
console.log('Agendamento ativo: Todo dia às 08:00.');
console.log('Pressione Ctrl+C para encerrar.');

// Execução imediata ao iniciar para teste (opcional, pode ser removido)
runJob();
