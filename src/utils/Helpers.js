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
