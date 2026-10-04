import axios from 'axios';
import * as cheerio from 'cheerio';
import { getCurrentMonthYearUrl } from '../utils/date-helper';

export interface CommemorativeDate {
  day: string;
  name: string;
}

export async function scrapeCommemorativeDates(): Promise<CommemorativeDate[]> {
  const url = getCurrentMonthYearUrl();
  console.log(`Minerando datas em: ${url}`);

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const dates: CommemorativeDate[] = [];

    // O Calendarr geralmente lista datas em elementos de lista ou tabelas.
    // Vamos buscar por padrões comuns de datas comemorativas na página.
    // Nota: Em produção, faremos um ajuste fino no seletor após a primeira execução.
    $('.event-list, .calendar-events, .date-item').each((_, element) => {
      const text = $(element).text().trim();
      if (text) {
        // Tentativa simples de separar dia do nome: "12 - Dia do Programador"
        const parts = text.split(/[:\s-]+/);
        const day = parts[0];
        const name = parts.slice(1).join(' ').trim();

        if (!isNaN(Number(day)) && name) {
          dates.push({ day, name });
        }
      }
    });

    // Fallback: Buscar em qualquer elemento que pareça ser um evento se os seletores específicos falharem
    if (dates.length === 0) {
      $('li, div.event').each((_, element) => {
        const text = $(element).text().trim();
        const match = text.match(/^(\d{1,2})\s*[-:]?\s*(.*)$/);
        if (match) {
          dates.push({ day: match[1], name: match[2].trim() });
        }
      });
    }

    return dates;
  } catch (error) {
    console.error('Erro ao fazer scraping do Calendarr:', error);
    throw error;
  }
}
