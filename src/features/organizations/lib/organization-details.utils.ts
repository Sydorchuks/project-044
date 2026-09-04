const dateFormatter = new Intl.DateTimeFormat("uk-UA", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatOrganizationObjectDate(value: string) {
  return dateFormatter.format(new Date(value));
}

export function formatWorkingHours(start?: number | null, end?: number | null) {
  if (start == null || end == null || end <= start) return "Вихідний";
  if (start === 0 && end === 24) return "Цілодобово";

  const formatHour = (hour: number) => `${String(hour).padStart(2, "0")}:00`;

  return `${formatHour(start)} – ${formatHour(end)}`;
}
