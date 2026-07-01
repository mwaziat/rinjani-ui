import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { DataTable } from './DataTable'
import type { ColumnDef, DataTableProps, PaginationState, PaginationConfig } from './DataTable.types'
import { UserIcon, SearchIcon, CheckIcon } from '../Icons'
import { Badge } from '../Badge'
import { Button, IconButton } from '../Button'

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
    }
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
    )
  },
  {
    header: 'Status',
    align: 'right',
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

interface TableWrapperProps extends Omit<DataTableProps<UserData>, 'data' | 'pagination' | 'columns'> {
  initialLimit?: number
  withPagination?: boolean
  pagination?: Partial<PaginationConfig>
  columns?: ColumnDef<UserData>[]
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
  const [isRefreshing, setIsRefreshing] = useState(false)

  const filteredData = mockData.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.email.toLowerCase().includes(search.toLowerCase())
  )

  const displayData = withPagination
    ? filteredData.slice((page - 1) * limit, page * limit)
    : filteredData.slice(0, 5) // Just show a few for non-paginated

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-200">
      <DataTable<UserData>
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
          title: 'Users Directory',
          description: 'Manage your team members and permissions.',
          showSearch: true,
          searchPlaceholder: 'Search by name or email...',
          onSearchChange: (val) => {
            setSearch(val)
            setPage(1)
          },
          showAdd: true,
          onAdd: () => alert('Add new user'),
          showRefresh: true,
          onRefresh: async () => {
            setIsRefreshing(true)
            setTimeout(() => {
              setIsRefreshing(false)
              alert('Data refreshed!')
            }, 800)
          },
          showDeleteAll: true,
          showEditAll: true,
          ...props.toolbar
        }}
        actionColumn={{
          type: 'dropdown',
          onDetail: (row: UserData) => alert(`Detail for ${row.name}`),
          onEdit: (row: UserData) => alert(`Edit ${row.name}`),
          onDelete: (row: UserData) => alert(`Delete ${row.name}`),
          ...props.actionColumn
        }}
        {...(withPagination ? {
          pagination: {
            page,
            limit,
            totalItems: filteredData.length,
            totalPages: Math.ceil(filteredData.length / limit),
            pageSizeOptions: [5, 10, 20, 50],
            onPaginationChange: (state: PaginationState) => {
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
      <DataTable
        data={[]}
        columns={columns}
        contained={false}
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

export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-8">
      <TableWrapper loading={true} loadingVariant="spinner" toolbar={{ title: 'Loading Spinner' }} />
      <TableWrapper loading={true} loadingVariant="skeleton" toolbar={{ title: 'Loading Skeleton' }} />
    </div>
  ),
}

export const ExpandableRows: Story = {
  render: () => (
    <TableWrapper
      toolbar={{ title: 'Expandable Rows' }}
      expandable={{
        rowExpandable: (row: UserData) => row.status !== 'Inactive',
        expandedRowRender: (row: UserData) => (
          <div className="p-6 bg-neutral-50 border-t border-neutral-200">
            <h4 className="font-semibold text-neutral-800 mb-4">Additional Details for {row.name}</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-neutral-500 font-medium">User ID:</span> {row.id}</div>
              <div><span className="text-neutral-500 font-medium">Department:</span> {row.department}</div>
              <div><span className="text-neutral-500 font-medium">Email:</span> {row.email}</div>
              <div>
                <span className="text-neutral-500 font-medium">Active Status:</span>
                {' '}
                {row.status === 'Active' ? <span className="text-success-600 font-medium">Yes</span> : 'No'}
              </div>
            </div>
          </div>
        )
      }}
    />
  ),
}

export const GroupedHeaders: Story = {
  render: () => {
    const groupedColumns: ColumnDef<UserData>[] = [
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
          }
        ]
      },
      {
        header: 'Work Information',
        align: 'center',
        columns: [
          { header: 'Department', accessorKey: 'department', align: 'center' },
          { header: 'Role', accessorKey: 'role', align: 'center' },
        ]
      },
      {
        header: 'Status',
        accessorKey: 'status',
        align: 'center',
        cell: (row) => <Badge variant="soft" color={row.status === 'Active' ? 'success' : 'neutral'}>{row.status}</Badge>
      }
    ]

    return (
      <TableWrapper
        columns={groupedColumns}
        toolbar={{ title: 'Grouped Headers (ColSpan)' }}
      />
    )
  }
}

export const CustomToolbarAndInlineActions: Story = {
  render: () => (
    <TableWrapper
      toolbar={{
        title: 'Custom Layout',
        sortOrder: ['search', 'refresh', 'add'],
        customElements: [
          <Button key="filter" variant="outlined" color="neutral" size="sm">
            Filter
          </Button>
        ]
      }}
      actionColumn={{
        type: 'inline',
        variant: 'soft',
        size: 'sm',
        onDetail: (row: UserData) => alert(`Detail for ${row.name}`),
        onEdit: (row: UserData) => alert(`Edit ${row.name}`),
        onDelete: (row: UserData) => alert(`Delete ${row.name}`),
        customActions: (row: UserData) => [
          row.status === 'Pending' ? (
            <IconButton
              key="approve"
              icon={<CheckIcon size={14} />}
              onClick={() => alert('Approved')}
              variant="soft"
              color="success"
              size="sm"
              title="Approve"
            />
          ) : null
        ],
        sortOrder: ['custom', 'edit', 'delete']
      }}
    />
  ),
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
