export function capitalizeFirstLetter(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function formatDate(dateString: string, locale: string) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return formattedDate;
}
