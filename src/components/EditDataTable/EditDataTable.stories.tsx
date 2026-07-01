import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { EditDataTable } from './EditDataTable'
import type { EditColumnDef, EditDataTableProps, EditPaginationState, EditPaginationConfig } from './EditDataTable.types'
import { UserIcon, SearchIcon } from '../Icons'
import { Badge } from '../Badge'
import { InputField } from '../Form'
import { Dialog, DialogContainer } from '../Dialog'

const meta: Meta<typeof EditDataTable> = {
  title: 'Components/EditDataTable',
  component: EditDataTable,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'borderless', 'striped', 'hover', 'compact', 'comfortable', 'spacious'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
    },
    loading: { control: 'boolean' },
    loadingVariant: {
      control: 'select',
      options: ['spinner', 'skeleton'],
    }
  },
  args: {
    variant: 'default',
    color: 'primary',
  },
}

export default meta
type Story = StoryObj<typeof EditDataTable>

interface UserData {
  id: string
  name: string
  email: string
  role: string
  status: 'Active' | 'Inactive' | 'Pending'
  department: string
}

const mockData: UserData[] = Array.from({ length: 45 }).map((_, i) => ({
  id: `USR-${1000 + i}`,
  name: `User Name ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? 'Admin' : i % 2 === 0 ? 'Editor' : 'Viewer',
  status: i % 4 === 0 ? 'Inactive' : i % 5 === 0 ? 'Pending' : 'Active',
  department: i % 2 === 0 ? 'Engineering' : 'Design',
}))

const columns: EditColumnDef<UserData>[] = [
  {
    header: 'No.',
    width: '60px',
    align: 'center',
    cell: (_, index) => <span className="text-neutral-500 font-medium">{index + 1}</span>,
  },
  {
    header: 'User Profile',
    accessorKey: 'name',
    editable: true,
    editComponent: (value, onChange) => (
      <InputField
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        size="sm"
        placeholder="Enter name"
      />
    ),
    cell: (row: UserData) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 shrink-0">
          <UserIcon size={18} />
        </div>
        <div>
          <div className="font-semibold text-neutral-900">{row.name}</div>
          <div className="text-neutral-500 text-xs">{row.email}</div>
        </div>
      </div>
    ),
  },
  {
    header: 'Department',
    accessorKey: 'department',
    align: 'center',
    editable: true,
    editComponent: (value, onChange) => (
      <InputField
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        size="sm"
        placeholder="Enter department"
      />
    ),
  },
  {
    header: 'Role',
    accessorKey: 'role',
    align: 'center',
    editable: true,
    type: 'select',
    options: [
      { value: 'Admin', label: 'Admin' },
      { value: 'Editor', label: 'Editor' },
      { value: 'Viewer', label: 'Viewer' },
    ],
    cell: (row: UserData) => (
      <Badge variant="soft" color={row.role === 'Admin' ? 'primary' : 'neutral'}>
        {row.role}
      </Badge>
    )
  },
  {
    header: 'Status',
    accessorKey: 'status',
    align: 'right',
    editable: true,
    type: 'select',
    options: [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' },
      { value: 'Pending', label: 'Pending' },
    ],
    cell: (row: UserData) => {
      let badgeColor: 'success' | 'danger' | 'warning' = 'success'
      if (row.status === 'Inactive') badgeColor = 'danger'
      if (row.status === 'Pending') badgeColor = 'warning'
      return (
        <Badge variant="filled" color={badgeColor} size="sm" isPill>
          {row.status}
        </Badge>
      )
    },
  },
]

interface TableWrapperProps extends Omit<EditDataTableProps<UserData>, 'data' | 'pagination' | 'columns' | 'rowKey'> {
  initialLimit?: number
  withPagination?: boolean
  pagination?: Partial<EditPaginationConfig>
  columns?: EditColumnDef<UserData>[]
}

// Base wrapper for pagination and state management
const TableWrapper = ({
  initialLimit = 10,
  withPagination = true,
  contained = false,
  pagination,
  columns: customColumns,
  loading: externalLoading,
  ...props
}: TableWrapperProps) => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(initialLimit)
  const [search, setSearch] = useState('')
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([])
  const [data, setData] = useState(mockData)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.email.toLowerCase().includes(search.toLowerCase())
  )

  const displayData = withPagination
    ? filteredData.slice((page - 1) * limit, page * limit)
    : filteredData.slice(0, 5)

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-200">
      <DialogContainer />
      <EditDataTable<UserData>
        loading={externalLoading || isRefreshing}
        data={displayData}
        columns={customColumns || columns}
        contained={contained}
        rowKey={(row) => row.id}
        rowSelection={{
          selectedRowKeys: selectedKeys,
          onSelectionChange: setSelectedKeys,
        }}
        toolbar={{
          title: 'Users Directory (Editable)',
          description: 'Manage your team members and permissions.',
          showSearch: true,
          searchPlaceholder: 'Search by name or email...',
          onSearchChange: (val) => {
            setSearch(val)
            setPage(1)
          },
          showAdd: true,
          onAdd: () => {
            const newId = `new-${Math.random().toString(36).substring(7)}`
            const newUser: UserData = {
              id: newId,
              name: '',
              email: '',
              role: 'User',
              department: '',
              status: 'Active'
            }
            setData(prev => [newUser, ...prev])
          },
          showRefresh: true,
          onRefresh: async () => {
            setIsRefreshing(true)
            setTimeout(() => {
              setData(mockData)
              setIsRefreshing(false)
              Dialog.success('Data refreshed!')
            }, 800)
          },
          showDeleteAll: true,
          showEditAll: true,
          showSaveAll: true,
          onDeleteAll: async (keys) => {
            Dialog.confirm({
              title: 'Confirm Bulk Deletion',
              message: `Are you sure you want to delete ${keys.length} selected items? This action cannot be undone.`,
              confirmText: 'Yes, Delete All',
              cancelText: 'Cancel',
              onConfirm: () => {
                setData(prev => prev.filter(r => !keys.includes(r.id)))
                Dialog.success(`Successfully deleted ${keys.length} items.`)
              }
            })
          },
          onSaveAll: async (rows) => {
            Dialog.success(`Successfully saved ${rows.length} users.`)
          },
          ...props.toolbar
        }}
        actionColumn={{
          type: 'inline',
          onDetail: (row: UserData) => Dialog.info(`Profile details: ${row.name}`),
          onEdit: () => undefined,
          onDelete: (row: UserData) => {
            Dialog.confirm({
              title: 'Confirm Deletion',
              message: `Are you sure you want to delete ${row.name}? This action cannot be undone.`,
              confirmText: 'Yes, Delete',
              cancelText: 'Cancel',
              onConfirm: () => {
                setData(prev => prev.filter(r => r.id !== row.id))
                Dialog.success(`${row.name} successfully deleted.`)
              }
            })
          },
          onSave: async (row: UserData) => {
            setData(prev => prev.map(r => r.id === row.id ? row : r))
            Dialog.success(`${row.name} successfully saved.`)
          },
          ...props.actionColumn
        }}
        {...(withPagination ? {
          pagination: {
            page,
            limit,
            totalItems: filteredData.length,
            totalPages: Math.ceil(filteredData.length / limit),
            pageSizeOptions: [5, 10, 20, 50],
            onPaginationChange: (state: EditPaginationState) => {
              setPage(state.page)
              setLimit(state.limit)
            },
            ...pagination
          }
        } : {})}
        {...props}
      />
    </div>
  )
}

export const Showcase: Story = {
  render: () => <TableWrapper />,
}

export const TableVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <TableWrapper variant="bordered" toolbar={{ title: 'Bordered Variant' }} />
      <TableWrapper variant="striped" toolbar={{ title: 'Striped Variant' }} />
      <TableWrapper variant="compact" toolbar={{ title: 'Compact Variant' }} />
    </div>
  ),
}

export const TableColors: Story = {
  render: () => (
    <div className="space-y-8">
      <TableWrapper color="primary" toolbar={{ title: 'Primary Color' }} />
      <TableWrapper color="success" toolbar={{ title: 'Success Color' }} />
      <TableWrapper color="danger" toolbar={{ title: 'Danger Color' }} />
    </div>
  ),
}

export const ComponentVariantsAndSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <TableWrapper
        toolbar={{ title: 'Soft Variant / MD Size', variant: 'soft', size: 'md' }}
        actionColumn={{ variant: 'soft', size: 'md' }}
        pagination={{ variant: 'soft', size: 'md' }}
      />
      <TableWrapper
        toolbar={{ title: 'Outlined Variant / SM Size', variant: 'outlined', size: 'sm' }}
        actionColumn={{ variant: 'outlined', size: 'sm' }}
        pagination={{ variant: 'outlined', size: 'sm' }}
      />
    </div>
  ),
}

export const WithoutPagination: Story = {
  render: () => <TableWrapper withPagination={false} toolbar={{ title: 'Without Pagination' }} />,
}

export const EmptyState: Story = {
  render: () => (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-200">
      <EditDataTable
        data={[]}
        columns={columns}
        contained={false}
        rowKey={(row) => row.id}
        emptyDisplay={
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4 text-neutral-400">
              <SearchIcon size={32} />
            </div>
            <h3 className="text-neutral-900 font-semibold mb-1">No Data Available</h3>
            <p className="text-neutral-500 text-sm">There are no records to display at this moment.</p>
          </div>
        }
      />
    </div>
  ),
}

export const GroupedHeaders: Story = {
  render: () => {
    const groupedColumns: EditColumnDef<UserData>[] = [
      {
        header: 'Identity',
        align: 'center',
        columns: [
          {
            header: 'No.',
            width: '60px',
            align: 'center',
            cell: (_, index) => <span className="text-neutral-500 font-medium">{index + 1}</span>,
          },
          {
            header: 'Profile',
            accessorKey: 'name',
            editable: true,
            editComponent: (value, onChange) => (
              <InputField
                value={value as string}
                onChange={(e) => onChange(e.target.value)}
                size="sm"
                placeholder="Enter name"
              />
            ),
          }
        ]
      },
      {
        header: 'Work Information',
        align: 'center',
        columns: [
          { 
            header: 'Department', 
            accessorKey: 'department', 
            align: 'center',
            editable: true,
            editComponent: (value, onChange) => (
              <InputField
                value={value as string}
                onChange={(e) => onChange(e.target.value)}
                size="sm"
                placeholder="Enter department"
              />
            ),
          },
          { 
            header: 'Role', 
            accessorKey: 'role', 
            align: 'center',
            editable: true,
            type: 'select',
            options: [
              { value: 'Admin', label: 'Admin' },
              { value: 'Editor', label: 'Editor' },
              { value: 'Viewer', label: 'Viewer' },
            ],
            cell: (row: UserData) => <Badge variant="soft" color={row.role === 'Admin' ? 'primary' : 'neutral'}>{row.role}</Badge>
          },
        ]
      },
      {
        header: 'Status',
        accessorKey: 'status',
        align: 'center',
        editable: true,
        type: 'select',
        options: [
          { value: 'Active', label: 'Active' },
          { value: 'Inactive', label: 'Inactive' },
          { value: 'Pending', label: 'Pending' },
        ],
        cell: (row: UserData) => {
          let badgeColor: 'success' | 'danger' | 'warning' = 'success'
          if (row.status === 'Inactive') badgeColor = 'danger'
          if (row.status === 'Pending') badgeColor = 'warning'
          return (
            <Badge variant="filled" color={badgeColor} size="sm" isPill>
              {row.status}
            </Badge>
          )
        }
      }
    ]

    return (
      <TableWrapper
        columns={groupedColumns}
        toolbar={{ 
          title: 'Grouped Headers (ColSpan) Editable',
          showAdd: true,
          showEditAll: true,
          showSaveAll: true,
          showDeleteAll: true,
          showRefresh: true
        }}
      />
    )
  }
}

