import nodemailer from 'nodemailer';
import { SemanticResult } from '../core/semantic-engine';

export async function sendReportEmail(results: SemanticResult[]) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const recipients = process.env.REPORT_RECIPIENTS || process.env.GMAIL_USER;

  const reportLines = results.map(r => `- ${r.date}: ${r.event} (Relacionado a: ${r.relatedKeywords.join(', ')})`).join('\n');

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: recipients,
    subject: '📅 Relatório de Datas Comemorativas Semânticas',
    text: `Olá!\n\nAqui estão as datas comemorativas filtradas para este mês:\n\n${reportLines || 'Nenhuma data relevante encontrada.'}\n\nAtenciosamente,\nMotor Semântico AIOX`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Relatório enviado com sucesso para: ${recipients}`);
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw error;
  }
}
