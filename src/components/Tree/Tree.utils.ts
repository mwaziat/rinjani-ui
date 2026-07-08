export const NUMBERING_START_LEVEL = 8

export const getNextNumberingPath = (level: number, parentNumberingPath: number[], childIndex: number) => {
  const childLevel = level + 1

  if (childLevel < NUMBERING_START_LEVEL) return []
  if (level < NUMBERING_START_LEVEL) return [childIndex + 1]

  return [...parentNumberingPath, childIndex + 1]
}
