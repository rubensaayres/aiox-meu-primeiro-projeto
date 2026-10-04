import axios from 'axios';
import { CommemorativeDate } from '../services/scraper';

const OLLAMA_URL = 'http://localhost:11434/api/generate';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3';

export interface SemanticResult {
  date: string;
  event: string;
  relatedKeywords: string[];
}

export async function filterDatesSemantically(
  dates: CommemorativeDate[],
  keywords: string[]
): Promise<SemanticResult[]> {
  if (dates.length === 0) return [];

  const datesList = dates.map(d => `${d.day}: ${d.name}`).join('\n');
  const keywordsList = keywords.join(', ');

  const prompt = `
    Você é um motor de correlação semântica especializado em B2B e Cadeia Produtiva.
    Sua tarefa é analisar a lista de datas comemorativas abaixo e selecionar apenas aquelas que tenham relação semântica com as palavras-chave fornecidas.

    IMPORTANTE: Foque na cadeia produtiva de alimentos, hortifruti e indústria.
    Ignore datas que sejam focadas exclusivamente no consumidor final ou em restaurantes finalistas.
    Priorize datas ligadas a produtores, fornecedores, logística de alimentos e agroindústria.

    Palavras-chave: ${keywordsList}

    Lista de Datas:
    ${datesList}

    Para cada data relevante, retorne NO FORMATO JSON EXATO, sem texto adicional:
    [
      {
        "date": "dia",
        "event": "nome da data",
        "relatedKeywords": ["palavra-chave1", "palavra-chave2"]
      }
    ]
    Se não houver datas relevantes, retorne um array vazio [].
    NÃO escreva nada além do JSON.
  `;

  try {
    const response = await axios.post(OLLAMA_URL, {
      model: OLLAMA_MODEL,
      prompt: prompt,
      stream: false,
      format: 'json',
    });

    const text = response.data.response;
    const jsonString = text.replace(/```json|```/g, '').trim();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Erro na filtragem semântica com Ollama:', error);
    throw error;
  }
}
