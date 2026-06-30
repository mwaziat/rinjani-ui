import React from 'react'
import { InputField, Checkbox, Select } from '../Form'
import type { EditableCellProps } from './EditDataTable.types'

export function EditableCell<T>({ column, rowState, onChange }: EditableCellProps<T>) {
  const { accessorKey, type = 'string', editComponent } = column
  const cellValue = accessorKey ? rowState.edited[accessorKey] : undefined

  if (editComponent) {
    return (
      <>
        {editComponent(
          cellValue,
          (val) => accessorKey && onChange(accessorKey, val),
          rowState
        )}
      </>
    )
  }

  if (!accessorKey) {
    return null
  }

  if (type === 'boolean') {
    return (
      <Checkbox
        options={[{ value: 'true', label: '' }]}
        values={cellValue ? ['true'] : []}
        onChange={(vals) => onChange(accessorKey, vals.includes('true'))}
        showOptionLabel={false}
      />
    )
  }

  if (type === 'select') {
    return (
      <Select
        options={column.options || []}
        value={cellValue as string | number || ''}
        onChange={(val) => onChange(accessorKey, val)}
        size="sm"
      />
    )
  }

  const inputTypeMap: Record<string, string> = {
    string: 'text',
    number: 'number',
    date: 'date',
  }

  const inputType = inputTypeMap[type] || 'text'

  return (
    <InputField
      type={inputType}
      value={cellValue as string | number || ''}
      onChange={(e) => {
        let val: unknown = e.target.value
        if (type === 'number') {
          val = e.target.value === '' ? '' : Number(e.target.value)
        }
        onChange(accessorKey, val)
      }}
      size="sm"
    />
  )
}
