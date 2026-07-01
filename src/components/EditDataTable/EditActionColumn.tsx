import React, { useState } from 'react'
import { EyeIcon, PencilIcon, TrashIcon, CheckIcon, XIcon, MoreVerticalIcon } from '../Icons'
import { IconButton } from '../Button'
import { Dropdown, DropdownList, DropdownItem } from '../Dropdown'
import type { EditActionColumnConfig, EditTableRowState } from './EditDataTable.types'

interface EditActionColumnProps<T> {
  config: EditActionColumnConfig<T>
  rowState: EditTableRowState<T>
  onStateChange: (newState: EditTableRowState<T>) => void
}

export function EditActionColumn<T>({ config, rowState, onStateChange }: EditActionColumnProps<T>) {
  const [isSaving, setIsSaving] = useState(false)
  const {
    type = 'inline',
    variant = 'soft',
    color = 'neutral',
    size = 'xs',
    onDetail,
    onEdit,
    onDelete,
    onSave,
    onCancel,
    customActions,
    sortOrder = ['detail', 'edit', 'delete'],
  } = config

  const isEditing = rowState.action.mode === 'edit' || rowState.action.mode === 'new'

  const handleEditClick = () => {
    onStateChange({
      ...rowState,
      action: { ...rowState.action, mode: 'edit' }
    })
    if (onEdit) onEdit(rowState.original)
  }

  const handleCancelClick = () => {
    if (onCancel) onCancel(rowState.original)
    onStateChange({
      ...rowState,
      edited: { ...rowState.original },
      action: { ...rowState.action, mode: 'view' }
    })
  }

  const handleSaveClick = async () => {
    setIsSaving(true)
    try {
      if (onSave) {
        await onSave(rowState.edited, rowState.original)
      }
      onStateChange({
        ...rowState,
        original: { ...rowState.edited },
        action: { ...rowState.action, mode: 'view' }
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (type === 'custom' && customActions) {
    return <div className="flex items-center justify-center gap-2">{customActions(rowState)}</div>
  }

  const customActionsMap: Record<string, React.ReactNode> = {}
  if (customActions) {
    const customResult = customActions(rowState)
    if (Array.isArray(customResult)) {
      customResult.forEach((el, index) => {
        if (React.isValidElement(el) && el.key != null) {
          const keyStr = String(el.key).replace(/^\.\$/, '')
          customActionsMap[keyStr] = el
        } else {
          customActionsMap[`custom-${index}`] = el
        }
      })
    } else if (React.isValidElement(customResult) && customResult.key != null) {
      const keyStr = String(customResult.key).replace(/^\.\$/, '')
      customActionsMap[keyStr] = customResult
    } else {
      customActionsMap['customActions'] = customResult as React.ReactNode
    }
  }

  if (type === 'dropdown') {
    const activeItems = sortOrder.map(key => {
      if (key === 'detail' && !isEditing) {
        return onDetail ? (
          <DropdownItem key="detail" leftIcon={<EyeIcon size={14} />} onClick={() => onDetail(rowState.original)}>
            Detail
          </DropdownItem>
        ) : null
      }
      if (key === 'edit') {
        if (isEditing) {
          return (
            <React.Fragment key="edit-actions">
                <DropdownItem key="save" leftIcon={<CheckIcon size={14} />} onClick={handleSaveClick}>
                {isSaving ? 'Saving...' : 'Save'}
              </DropdownItem>
                <DropdownItem key="cancel" leftIcon={<XIcon size={14} />} color="danger" onClick={handleCancelClick}>
                Cancel
              </DropdownItem>
            </React.Fragment>
          )
        } else {
          return (
            <DropdownItem key="edit" leftIcon={<PencilIcon size={14} />} onClick={handleEditClick}>
              Edit
            </DropdownItem>
          )
        }
      }
      if (key === 'delete' && !isEditing) {
        return onDelete ? (
          <DropdownItem key="delete" leftIcon={<TrashIcon size={14} />} color="danger" onClick={() => onDelete(rowState.original)}>
            Delete
          </DropdownItem>
        ) : null
      }
      if (customActionsMap[key]) {
        return <React.Fragment key={key}>{customActionsMap[key]}</React.Fragment>
      }
      return null
    }).filter(Boolean)

    Object.keys(customActionsMap).forEach(key => {
      if (!sortOrder.includes(key) && customActionsMap[key]) {
        activeItems.push(<React.Fragment key={key}>{customActionsMap[key]}</React.Fragment>)
      }
    })

    return (
      <div className="flex items-center justify-center">
        <Dropdown
          icon={<MoreVerticalIcon size={16} />}
          showArrow={false}
          variant={variant}
          color={color}
          size={size}
          placement="bottom-end"
        >
          <DropdownList>
            {activeItems.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <div className="my-1 border-t border-neutral-100" />}
                {item}
              </React.Fragment>
            ))}
          </DropdownList>
        </Dropdown>
      </div>
    )
  }

  const inlineItems = sortOrder.map(key => {
    if (key === 'detail' && !isEditing) {
      return onDetail ? (
        <IconButton
          key="detail"
          icon={<EyeIcon size={14} />}
          variant={variant}
          color={color}
          size={size}
          onClick={() => onDetail(rowState.original)}
          title="Detail"
        />
      ) : null
    }
    if (key === 'edit') {
      if (isEditing) {
        return (
          <React.Fragment key="edit-actions">
            <IconButton
              key="save"
              icon={<CheckIcon size={14} />}
              variant="filled"
              color="primary"
              size={size}
              onClick={handleSaveClick}
              title="Save"
              disabled={isSaving}
            />
            <IconButton
              key="cancel"
              icon={<XIcon size={14} />}
              variant="soft"
              color="danger"
              size={size}
              onClick={handleCancelClick}
              title="Cancel"
            />
          </React.Fragment>
        )
      } else {
        return (
          <IconButton
            key="edit"
            icon={<PencilIcon size={14} />}
            variant={variant}
            color={color}
            size={size}
            onClick={handleEditClick}
            title="Edit"
          />
        )
      }
    }
    if (key === 'delete' && !isEditing) {
      return onDelete ? (
        <IconButton
          key="delete"
          icon={<TrashIcon size={14} />}
          variant={variant}
          color="danger"
          size={size}
          onClick={() => onDelete(rowState.original)}
          title="Delete"
        />
      ) : null
    }
    if (customActionsMap[key]) {
      return <React.Fragment key={key}>{customActionsMap[key]}</React.Fragment>
    }
    return null
  }).filter(Boolean)

  Object.keys(customActionsMap).forEach(key => {
    if (!sortOrder.includes(key) && customActionsMap[key]) {
      inlineItems.push(<React.Fragment key={key}>{customActionsMap[key]}</React.Fragment>)
    }
  })

  return (
    <div className="flex items-center justify-center gap-2">
      {inlineItems}
    </div>
  )
}
