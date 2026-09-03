export const WEEKDAYS = [
  { key: "monday", label: "Пн" },
  { key: "tuesday", label: "Вт" },
  { key: "wednesday", label: "Ср" },
  { key: "thursday", label: "Чт" },
  { key: "friday", label: "Пт" },
  { key: "saturday", label: "Сб" },
  { key: "sunday", label: "Нд" },
] as const;

export type Weekday = (typeof WEEKDAYS)[number]["key"];

export const START_TIME_OPTIONS = Array.from({ length: 24 }, (_, hour) => hour);
export const END_TIME_OPTIONS = Array.from({ length: 24 }, (_, index) => index + 1);

export const ORGANIZATION_DIALOGS = {
  save: {
    message: "Ви хочете зберегти зміни?",
    description: "Дані організації та зміни зображення буде збережено.",
    confirmLabel: "Зберегти",
  },
  discard: {
    message: "Вийти без збереження змін?",
    description: "Незбережені зміни організації та зображення буде втрачено.",
    confirmLabel: "Вийти",
    cancelLabel: "Залишитися",
  },
  delete: {
    message: "Ви впевнені, що хочете видалити організацію?",
    description: "Організацію буде позначено як видалену та прибрано зі списку.",
    confirmLabel: "Видалити",
  },
  removeImage: {
    message: "Видалити зображення організації?",
    description: "Зображення буде видалено після збереження форми.",
    confirmLabel: "Видалити",
  },
} as const;
