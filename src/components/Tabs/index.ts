import { TabsRoot } from './Tabs'
import { TabsList } from './TabsList'
import { TabsItem } from './TabsItem'
import { TabsContent } from './TabsContent'
import { TabsFooter } from './TabsFooter'

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Item: TabsItem,
  Content: TabsContent,
  Footer: TabsFooter,
})

export type { 
  TabsProps, 
  TabsListProps, 
  TabsItemProps, 
  TabsContentProps, 
  TabsFooterProps,
  TabSize, 
  TabVariant, 
  TabColor, 
  TabAlign, 
  TabAlignLabel, 
  TabPlacement 
} from './Tabs.types'
