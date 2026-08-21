import type { PropRow } from "@/components/docs/PropsTable"

export const datePickerProps: PropRow[] = [
  {
    name: "value",
    type: "T | null",
    default: "—",
    description: "Currently selected date.",
  },
  {
    name: "onChange",
    type: "(value: T | null) => void",
    default: "—",
    description: "Callback fired when the date changes.",
  },
  {
    name: "label",
    type: "ReactNode",
    default: "—",
    description: "Label text.",
  },
  {
    name: "format",
    type: "string",
    default: "—",
    description: "Display format string (e.g. MM/dd/yyyy).",
  },
  {
    name: "views",
    type: '("year" | "month" | "day")[]',
    default: '["year", "month", "day"]',
    description: "Available selection views.",
  },
  {
    name: "adapter",
    type: "DateAdapter<T>",
    default: "NativeDateAdapter",
    description: "Date adapter for Day.js, Moment, date-fns, or native Date.",
  },
  {
    name: "floating",
    type: "boolean",
    default: "false",
    description: "Floating label design.",
  },
  {
    name: "isClearable",
    type: "boolean",
    default: "false",
    description: "Shows an X icon to clear the date.",
  },
  {
    name: "minDate",
    type: "T",
    default: "—",
    description: "Earliest selectable date.",
  },
  {
    name: "maxDate",
    type: "T",
    default: "—",
    description: "Latest selectable date.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the input.",
  },
  {
    name: "error",
    type: "string",
    default: "—",
    description: "Error message below the input.",
  },
  {
    name: "variant",
    type: '"outlined" | "filled" | "line"',
    default: '"outlined"',
    description: "Visual style of the input.",
  },
  {
    name: "size",
    type: '"xxs" | "xs" | "sm" | "md" | "lg" | "xl"',
    default: '"sm"',
    description: "Input size.",
  },
]
