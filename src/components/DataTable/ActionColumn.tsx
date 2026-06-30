import React from 'react'
import { EyeIcon } from '../Icons/general'
import { PencilIcon, TrashIcon, MoreVerticalIcon } from '../Icons/action'
import { IconButton } from '../Button'
import { Dropdown, DropdownList, DropdownItem } from '../Dropdown'
import type { ActionColumnConfig } from './DataTable.types'

interface ActionColumnProps<T> {
  config: ActionColumnConfig<T>
  row: T
}

export function ActionColumn<T>({ config, row }: ActionColumnProps<T>) {
  const {
    type = 'inline',
    variant = 'soft',
    color = 'neutral',
    size = 'xs',
    onDetail,
    onEdit,
    onDelete,
    customActions,
    sortOrder = ['detail', 'edit', 'delete'],
  } = config

  if (type === 'custom' && customActions) {
    return <div className="flex items-center justify-center gap-2">{customActions(row)}</div>
  }

  const customActionsMap: Record<string, React.ReactNode> = {}
  if (customActions) {
    const customResult = customActions(row)
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
      if (key === 'detail') {
        return onDetail ? (
          <DropdownItem key="detail" leftIcon={<EyeIcon size={14} />} onClick={() => onDetail(row)}>
            Detail
          </DropdownItem>
        ) : null
      }
      if (key === 'edit') {
        return onEdit ? (
          <DropdownItem key="edit" leftIcon={<PencilIcon size={14} />} onClick={() => onEdit(row)}>
            Edit
          </DropdownItem>
        ) : null
      }
      if (key === 'delete') {
        return onDelete ? (
          <DropdownItem key="delete" leftIcon={<TrashIcon size={14} />} color="danger" onClick={() => onDelete(row)}>
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
    if (key === 'detail') {
      return onDetail ? (
        <IconButton
          key="detail"
          icon={<EyeIcon size={14} />}
          variant={variant}
          color={color}
          size={size}
          onClick={() => onDetail(row)}
          title="Detail"
        />
      ) : null
    }
    if (key === 'edit') {
      return onEdit ? (
        <IconButton
          key="edit"
          icon={<PencilIcon size={14} />}
          variant={variant}
          color={color}
          size={size}
          onClick={() => onEdit(row)}
          title="Edit"
        />
      ) : null
    }
    if (key === 'delete') {
      return onDelete ? (
        <IconButton
          key="delete"
          icon={<TrashIcon size={14} />}
          variant={variant}
          color="danger"
          size={size}
          onClick={() => onDelete(row)}
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
