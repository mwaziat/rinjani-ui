export type ChangeType = "added" | "changed" | "fixed"

export interface ChangeEntry {
  type: ChangeType
  text: string
}

export interface ReleaseNote {
  version: string
  date: string
  summary: string
  entries: ChangeEntry[]
}

export const currentReleaseVersion = "1.0.1"

export const releases: ReleaseNote[] = [
  {
    version: currentReleaseVersion,
    date: "Unreleased",
    summary: "The first public documentation release of Rinjani UI.",
    entries: [
      {
        type: "added",
        text: "A complete set of React components for forms, feedback, navigation, data display, and layout.",
      },
      {
        type: "added",
        text: "DataTable and EditDataTable with sorting, pagination, row selection, expandable rows, and inline editing.",
      },
      {
        type: "added",
        text: "Tree with lazy loading, keyboard navigation, drag-and-drop support, and node actions.",
      },
      {
        type: "added",
        text: "Form controls including InputField, Select, Autocomplete, DatePicker, Dropzone, Checkbox, Radio, and Switch.",
      },
      {
        type: "added",
        text: "Optional English and Indonesian component messages through RinjaniLocaleProvider.",
      },
      {
        type: "changed",
        text: "Tailwind CSS v4 support with semantic design tokens and a public theme.css entry point.",
      },
      {
        type: "changed",
        text: "Responsive PanelLayout navigation with a collapsible sidebar and top navbar.",
      },
      {
        type: "changed",
        text: "Documentation examples now include syntax highlighting, language labels, and copy actions.",
      },
      {
        type: "fixed",
        text: "Improved package CSS export conditions so styles load correctly in consumer applications.",
      },
      {
        type: "fixed",
        text: "Improved DataTable and EditDataTable toolbar styling and column wrapping behavior.",
      },
    ],
  },
]
