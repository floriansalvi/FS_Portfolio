export function formatYearMonth(dateString) {
    if (!dateString) return;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
}

export function formatProjectDate(date, locale = 'fr') {
  if (!date) return '';
  const parsedDate = new Date(date);
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(parsedDate);
}