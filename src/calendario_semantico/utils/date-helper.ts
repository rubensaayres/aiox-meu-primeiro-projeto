export function getCurrentMonthYearUrl(): string {
  const now = new Date();
  const year = now.getFullYear();

  const months = [
    "janeiro", "fevereiro", "marco", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ];

  const month = months[now.getMonth()];

  return `https://www.calendarr.com/brasil/calendario-${month}-${year}/`;
}
