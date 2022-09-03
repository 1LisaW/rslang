function getSimplifiedDate(date: Date): string {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const monthDay = date.getDate().toString().padStart(2, '0');
  const stringifiedDate = `${date.getFullYear()}-${month}-${monthDay}`;

  return stringifiedDate;
}

export default {
  getSimplifiedDate,
};
