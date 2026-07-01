export const paddingClasses = {
  compact: 'p-2 text-xs',
  comfortable: 'p-4 text-sm',
  spacious: 'p-6 text-base',
}

export const hoverColorClasses: Record<string, string> = {
  primary: 'hover:bg-primary-100',
  secondary: 'hover:bg-secondary-100',
  success: 'hover:bg-success-100',
  warning: 'hover:bg-warning-100',
  danger: 'hover:bg-danger-100',
  info: 'hover:bg-info-100',
  neutral: 'hover:bg-neutral-200',
}

export const stripedColorClasses: Record<string, string> = {
  primary: 'bg-primary-50',
  secondary: 'bg-secondary-50',
  success: 'bg-success-50',
  warning: 'bg-warning-50',
  danger: 'bg-danger-50',
  info: 'bg-info-50',
  neutral: 'bg-neutral-100',
}

export const checkboxColorClasses: Record<string, string> = {
  primary: 'border-primary-500 bg-primary-500 text-white',
  secondary: 'border-secondary-500 bg-secondary-500 text-white',
  success: 'border-success-500 bg-success-500 text-white',
  warning: 'border-warning-500 bg-warning-500 text-white',
  danger: 'border-danger-500 bg-danger-500 text-white',
  info: 'border-info-500 bg-info-500 text-white',
  neutral: 'border-neutral-900 bg-neutral-900 text-white',
}

export const alignClasses: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

export const sizeClasses = {
  xxs: "min-w-7 h-7 text-[10px] px-1",
  xs: "min-w-8 h-8 text-xs px-1",
  sm: "min-w-9 h-9 text-sm px-1.5",
  md: "min-w-11 h-11 text-base px-2",
  lg: "min-w-[52px] h-[52px] text-lg px-2",
  xl: "min-w-14 h-14 text-xl px-2"
}

export const selectSizeClasses = {
  xxs: "h-7 text-[10px] pl-2 pr-6",
  xs: "h-8 text-xs pl-2 pr-6",
  sm: "h-9 text-sm pl-2.5 pr-7",
  md: "h-11 text-base pl-3 pr-8",
  lg: "h-[52px] text-lg pl-4 pr-10",
  xl: "h-14 text-xl pl-4 pr-10",
}

export const radiusBySize = {
  xxs: 'rounded-md',
  xs: 'rounded-md',
  sm: 'rounded-lg',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-xl',
}

export const activeVariants: Record<string, Record<string, string>> = {
  filled: {
    primary: "bg-primary-500 text-white hover:bg-primary-600 shadow-sm",
    secondary: "bg-secondary-500 text-white hover:bg-secondary-600 shadow-sm",
    success: "bg-success-500 text-white hover:bg-success-600 shadow-sm",
    warning: "bg-warning-500 text-white hover:bg-warning-600 shadow-sm",
    danger: "bg-danger-500 text-white hover:bg-danger-600 shadow-sm",
    info: "bg-info-500 text-white hover:bg-info-600 shadow-sm",
    neutral: "bg-neutral-800 text-white hover:bg-neutral-900 shadow-sm",
  },
  outlined: {
    primary: "border-2 border-primary-500 text-primary-600 hover:bg-primary-50",
    secondary: "border-2 border-secondary-500 text-secondary-600 hover:bg-secondary-50",
    success: "border-2 border-success-500 text-success-600 hover:bg-success-50",
    warning: "border-2 border-warning-500 text-warning-600 hover:bg-warning-50",
    danger: "border-2 border-danger-500 text-danger-600 hover:bg-danger-50",
    info: "border-2 border-info-500 text-info-600 hover:bg-info-50",
    neutral: "border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-50",
  },
  soft: {
    primary: "bg-primary-50 text-primary-600 hover:bg-primary-100",
    secondary: "bg-secondary-50 text-secondary-600 hover:bg-secondary-100",
    success: "bg-success-50 text-success-600 hover:bg-success-100",
    warning: "bg-warning-50 text-warning-600 hover:bg-warning-100",
    danger: "bg-danger-50 text-danger-600 hover:bg-danger-100",
    info: "bg-info-50 text-info-600 hover:bg-info-100",
    neutral: "bg-neutral-100 text-neutral-700 hover:bg-neutral-200",
  },
  text: {
    primary: "bg-transparent text-primary-600 hover:bg-primary-50",
    secondary: "bg-transparent text-secondary-600 hover:bg-secondary-50",
    success: "bg-transparent text-success-600 hover:bg-success-50",
    warning: "bg-transparent text-warning-600 hover:bg-warning-50",
    danger: "bg-transparent text-danger-600 hover:bg-danger-50",
    info: "bg-transparent text-info-600 hover:bg-info-50",
    neutral: "bg-transparent text-neutral-600 hover:bg-neutral-50",
  }
}

export const selectColorMap: Record<string, string> = {
  primary: "focus:ring-primary-500/20 focus:border-primary-500",
  secondary: "focus:ring-secondary-500/20 focus:border-secondary-500",
  success: "focus:ring-success-500/20 focus:border-success-500",
  warning: "focus:ring-warning-500/20 focus:border-warning-500",
  danger: "focus:ring-danger-500/20 focus:border-danger-500",
  info: "focus:ring-info-500/20 focus:border-info-500",
  neutral: "focus:ring-neutral-500/20 focus:border-neutral-500",
}

export const inputSizeClasses = {
  xxs: "h-7 text-[10px] pl-7 pr-2",
  xs: "h-8 text-xs pl-8 pr-2.5",
  sm: "h-9 text-sm pl-9 pr-3",
  md: "h-11 text-base pl-10 pr-4",
  lg: "h-[52px] text-lg pl-11 pr-5",
  xl: "h-14 text-xl pl-12 pr-6"
}

export const iconSizeClasses: Record<string, number> = {
  xxs: 12,
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24
}
