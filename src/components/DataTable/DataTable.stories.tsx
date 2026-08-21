import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { DataTable } from './DataTable'
import type { ColumnDef, DataTableProps, PaginationState } from './DataTable.types'
import { UserIcon, SearchIcon, CheckIcon, SettingsIcon, SaveIcon } from '../Icons'
import { Badge } from '../Badge'
import { Button, IconButton } from '../Button'
import { InputField, Select, Autocomplete } from '../Form'
import type { SelectValue } from '../Form'

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
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
    },
  },
  args: {
    variant: 'default',
    color: 'primary',
  },
}

export default meta
type Story = StoryObj<typeof DataTable>

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

const columns: ColumnDef<UserData>[] = [
  {
    header: 'No.',
    width: '60px',
    align: 'center',
    cell: (_, index) => <span className="text-neutral-500 font-medium">{index + 1}</span>,
  },
  {
    header: 'User Profile',
    accessorKey: 'name',
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
  },
  {
    header: 'Role',
    align: 'center',
    cell: (row: UserData) => (
      <Badge variant="soft" color={row.role === 'Admin' ? 'primary' : 'neutral'}>
        {row.role}
      </Badge>
    ),
  },
  {
    header: 'Status',
    align: 'right',
    cell: (row: UserData) => {
      let badgeColor: 'success' | 'danger' | 'warning' = 'success'
      if (row.status === 'Inactive') badgeColor = 'danger'
      if (row.status === 'Pending') badgeColor = 'warning'
      return (
        <Badge variant="soft" color={badgeColor}>
          {row.status}
        </Badge>
      )
    },
  },
]

interface TableWrapperProps {
  toolbar?: DataTableProps<UserData>['toolbar']
  actionColumn?: DataTableProps<UserData>['actionColumn']
}

function TableWrapper({ toolbar, actionColumn }: TableWrapperProps) {
  const [page, setPage] = useState(1)
  const limit = 5

  return (
    <DataTable<UserData>
      data={mockData.slice((page - 1) * limit, page * limit)}
      columns={columns}
      rowKey={(row) => row.id}
      {...(toolbar ? { toolbar } : {})}
      {...(actionColumn ? { actionColumn } : {})}
      pagination={{
        page,
        limit,
        totalItems: mockData.length,
        totalPages: Math.ceil(mockData.length / limit),
        onPaginationChange: (s: PaginationState) => setPage(s.page),
      }}
    />
  )
}

export const WithToolbar: Story = {
  render: () => (
    <TableWrapper
      toolbar={{
        title: 'User List',
        description: 'Manage all registered users.',
        showAdd: true,
        showRefresh: true,
        showDeleteAll: true,
        showEditAll: true,
        onAdd: () => alert('Add clicked'),
        onRefresh: () => alert('Refresh clicked'),
      }}
    />
  ),
}

export const ToolbarVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(['filled', 'outlined', 'soft', 'text'] as const).map((variant) => (
        <div key={variant}>
          <p className="text-xs text-neutral-400 mb-2 font-mono">{variant}</p>
          <TableWrapper
            toolbar={{
              title: `Variant: ${variant}`,
              showAdd: true,
              showRefresh: true,
              variant,
            }}
          />
        </div>
      ))}
    </div>
  ),
}

export const SortOrderOnly: Story = {
  render: () => (
    <TableWrapper
      toolbar={{
        title: 'Reordered Built-in Buttons',
        description: 'deleteAll and editAll moved before search.',
        showAdd: true,
        showRefresh: true,
        showEditAll: true,
        showDeleteAll: true,
        sortOrder: ['deleteAll', 'editAll', 'refresh', 'add', 'search'],
      }}
    />
  ),
}

export const RichTitleAndDescription: Story = {
  render: () => (
    <TableWrapper
      toolbar={{
        title: (
          <div className="flex items-center gap-2">
            <span>Users Directory</span>
            <Badge variant="filled" color="success" size="sm" isPill>
              Live
            </Badge>
          </div>
        ),
        description: (
          <div className="flex items-center gap-1.5 text-sm text-neutral-500">
            <span>45 members across</span>
            <Badge variant="soft" color="primary" size="sm">Engineering</Badge>
            <span>and</span>
            <Badge variant="soft" color="secondary" size="sm">Design</Badge>
          </div>
        ),
        showAdd: true,
        showRefresh: true,
        showDeleteAll: true,
        showEditAll: true,
      }}
    />
  ),
}

export const CustomElementSingle: Story = {
  name: 'Custom Toolbar / Single Element',
  render: () => (
    <TableWrapper
      toolbar={{
        title: 'Single Custom Element',
        description: 'ReactNode without a key is appended after all sorted buttons.',
        showAdd: true,
        showRefresh: true,
        sortOrder: ['search', 'refresh', 'add'],
        customElements: (
          <Button leftIcon={<SaveIcon size={14} />} variant="outlined" color="neutral" size="sm">
            Export
          </Button>
        ),
      }}
    />
  ),
}

/** Demo: custom elements keyed as `filter` and `export` placed at explicit positions via `sortOrder`. */
function CustomElementArrayDemo() {
  const [isFiltered, setIsFiltered] = useState(false)

  return (
    <TableWrapper
      toolbar={{
        title: 'Positioned Custom Elements',
        description: 'Keys "filter" and "export" are inserted between Search and Refresh via sortOrder.',
        showAdd: true,
        showRefresh: true,
        showEditAll: true,
        showDeleteAll: true,
        sortOrder: ['search', 'filter', 'export', 'refresh', 'add', 'editAll', 'deleteAll'],
        customElements: [
          <Button
            key="filter"
            leftIcon={<SearchIcon size={14} />}
            variant={isFiltered ? 'filled' : 'outlined'}
            color={isFiltered ? 'primary' : 'neutral'}
            size="sm"
            onClick={() => setIsFiltered((prev) => !prev)}
          >
            {isFiltered ? 'Filtered' : 'Filter'}
          </Button>,
          <Button
            key="export"
            leftIcon={<SaveIcon size={14} />}
            variant="outlined"
            color="neutral"
            size="sm"
            onClick={() => alert('Exporting...')}
          >
            Export
          </Button>,
        ],
      }}
    />
  )
}

export const CustomElementArray: Story = {
  name: 'Custom Toolbar / Array + sortOrder',
  render: () => <CustomElementArrayDemo />,
}

export const CustomElementAppendFallback: Story = {
  name: 'Custom Toolbar / Append Fallback',
  render: () => (
    <TableWrapper
      toolbar={{
        title: 'Append Fallback',
        description: '"export" is in sortOrder; "settings" is not, so it appends at the end automatically.',
        showAdd: true,
        showRefresh: true,
        sortOrder: ['search', 'export', 'refresh', 'add'],
        customElements: [
          <Button
            key="export"
            leftIcon={<SaveIcon size={14} />}
            variant="outlined"
            color="neutral"
            size="sm"
            onClick={() => alert('Exporting...')}
          >
            Export
          </Button>,
          <IconButton
            key="settings"
            icon={<SettingsIcon size={16} />}
            variant="soft"
            color="neutral"
            size="sm"
            title="Table Settings"
            onClick={() => alert('Settings')}
          />,
        ],
      }}
    />
  ),
}

/** Demo: InputField date-range injected into the toolbar via customElements. */
function CustomToolbarWithInputDemo() {
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  return (
    <TableWrapper
      toolbar={{
        title: 'Filter by Date Range',
        description: 'InputField components injected as custom toolbar elements.',
        showRefresh: true,
        showAdd: true,
        sortOrder: ['dateFrom', 'dateTo', 'search', 'refresh', 'add'],
        customElements: [
          <InputField
            key="dateFrom"
            type="date"
            placeholder="From"
            size="sm"
            variant="outlined"
            value={dateFrom}
            onChange={(e) => setDateFrom((e.target as HTMLInputElement).value)}
          />,
          <InputField
            key="dateTo"
            type="date"
            placeholder="To"
            size="sm"
            variant="outlined"
            value={dateTo}
            onChange={(e) => setDateTo((e.target as HTMLInputElement).value)}
          />,
        ],
      }}
    />
  )
}

export const CustomToolbarWithInput: Story = {
  name: 'Custom Toolbar / With InputField',
  render: () => <CustomToolbarWithInputDemo />,
}

/** Demo: Select dropdowns for role and department filtering in the toolbar. */
function CustomToolbarWithSelectDemo() {
  const [role, setRole] = useState<SelectValue>('')
  const [department, setDepartment] = useState<SelectValue>('')

  const roleOptions = [
    { label: 'All Roles', value: '' },
    { label: 'Admin', value: 'Admin' },
    { label: 'Editor', value: 'Editor' },
    { label: 'Viewer', value: 'Viewer' },
  ]

  const departmentOptions = [
    { label: 'All Departments', value: '' },
    { label: 'Engineering', value: 'Engineering' },
    { label: 'Design', value: 'Design' },
  ]

  return (
    <TableWrapper
      toolbar={{
        title: 'Filter by Role & Department',
        description: 'Select components injected as custom toolbar elements.',
        showRefresh: true,
        showAdd: true,
        sortOrder: ['roleFilter', 'deptFilter', 'search', 'refresh', 'add'],
        customElements: [
          <Select
            key="roleFilter"
            options={roleOptions}
            value={role}
            onChange={setRole}
            placeholder="Role"
            size="sm"
            variant="outlined"
            isClearable
          />,
          <Select
            key="deptFilter"
            options={departmentOptions}
            value={department}
            onChange={setDepartment}
            placeholder="Department"
            size="sm"
            variant="outlined"
            isClearable
          />,
        ],
      }}
    />
  )
}

export const CustomToolbarWithSelectStory: Story = {
  name: 'Custom Toolbar / With Select',
  render: () => <CustomToolbarWithSelectDemo />,
}

/** Demo: Autocomplete for user search injected directly into the toolbar. */
function CustomToolbarWithAutocompleteDemo() {
  const [selectedUser, setSelectedUser] = useState<SelectValue>('')

  const userOptions = mockData.slice(0, 15).map((u) => ({
    label: u.name,
    value: u.id,
    data: u,
  }))

  return (
    <TableWrapper
      toolbar={{
        title: 'Quick User Lookup',
        description: 'Autocomplete injected as a custom toolbar element.',
        showRefresh: true,
        showAdd: true,
        sortOrder: ['userSearch', 'search', 'refresh', 'add'],
        customElements: [
          <Autocomplete
            key="userSearch"
            options={userOptions}
            value={selectedUser}
            onChange={setSelectedUser}
            placeholder="Find user..."
            size="sm"
            variant="outlined"
            isClearable
            className="w-52"
          />,
        ],
      }}
    />
  )
}

export const CustomToolbarWithAutocomplete: Story = {
  name: 'Custom Toolbar / With Autocomplete',
  render: () => <CustomToolbarWithAutocompleteDemo />,
}

/** Demo: all features combined — rich title, Select + Autocomplete in toolbar, inline actions. */
function KitchenSinkDemo() {
  const [role, setRole] = useState<SelectValue>('')
  const [selectedUser, setSelectedUser] = useState<SelectValue>('')

  const roleOptions = [
    { label: 'All Roles', value: '' },
    { label: 'Admin', value: 'Admin' },
    { label: 'Editor', value: 'Editor' },
    { label: 'Viewer', value: 'Viewer' },
  ]

  const userOptions = mockData.slice(0, 15).map((u) => ({
    label: u.name,
    value: u.id,
  }))

  return (
    <TableWrapper
      toolbar={{
        title: (
          <div className="flex items-center gap-2">
            <span>User Management</span>
            <Badge variant="soft" color="primary" size="sm">45 records</Badge>
          </div>
        ),
        description: 'Kitchen sink: rich title, Select, Autocomplete, and inline actions.',
        showAdd: true,
        showRefresh: true,
        showDeleteAll: true,
        showEditAll: true,
        variant: 'soft',
        sortOrder: ['roleFilter', 'userSearch', 'search', 'refresh', 'add', 'editAll', 'deleteAll'],
        customElements: [
          <Select
            key="roleFilter"
            options={roleOptions}
            value={role}
            onChange={setRole}
            placeholder="Role"
            size="sm"
            variant="outlined"
            isClearable
          />,
          <Autocomplete
            key="userSearch"
            options={userOptions}
            value={selectedUser}
            onChange={setSelectedUser}
            placeholder="Find user..."
            size="sm"
            variant="outlined"
            isClearable
          />,
        ],
      }}
      actionColumn={{
        type: 'inline',
        variant: 'soft',
        size: 'sm',
        onDetail: (row: UserData) => alert(`Detail: ${row.name}`),
        onEdit: (row: UserData) => alert(`Edit: ${row.name}`),
        onDelete: (row: UserData) => alert(`Delete: ${row.name}`),
        customActions: (row: UserData) =>
          row.status === 'Pending'
            ? [
                <IconButton
                  key="approve"
                  icon={<CheckIcon size={14} />}
                  onClick={() => alert(`Approved: ${row.name}`)}
                  variant="soft"
                  color="success"
                  size="sm"
                  title="Approve"
                />,
              ]
            : [],
        sortOrder: ['custom', 'detail', 'edit', 'delete'],
      }}
    />
  )
}

export const KitchenSink: Story = {
  name: 'Custom Toolbar / Kitchen Sink',
  render: () => <KitchenSinkDemo />,
}

export const Playground: Story = {
  render: (args) => (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-200">
      <DataTable<UserData>
        {...args}
        data={mockData.slice(0, 5)}
        columns={columns}
        contained={false}
        rowKey={(row) => row.id}
      />
    </div>
  ),
}
