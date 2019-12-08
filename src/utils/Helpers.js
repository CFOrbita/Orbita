export function formatDate(date) {
  const monthNames = [
    "Января", "Февраля", "Марта",
    "Апреля", "Мая", "Июня", "Июля",
    "Августа", "Сентября", "Октября",
    "Ноября", "Декабря"
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year} г.`;
}

export function getDateByTimestamp(timestamp) {
  return new Date(timestamp)
}

export function dateSortAsc(a, b) {
  return a[1].training.date - b[1].training.date
}

export function dateSortDesc(a, b) {
  return b[1].training.date -a[1].training.date
}
