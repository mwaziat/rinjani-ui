"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { PanelLayout } from "rinjani-ui";
import {
  LuMessageSquare,
  LuBadge,
  LuMenu,
  LuMousePointerClick,
  LuLayoutTemplate,
  LuListTree,
  LuImage,
  LuAppWindow,
  LuFolderOpen,
  LuMessageCircle
} from "react-icons/lu";
import { FiLayout, FiFileText, FiBookOpen } from "react-icons/fi";

const MenuItems = [
  {
    id: 1,
    label: "Getting Started",
    href: "/rinjani/getting-started",
    icon: <FiBookOpen className="w-5 h-5" />,
    children: [
      { id: 2, label: "Overview", href: "/rinjani/getting-started/overview" },
      { id: 3, label: "Installation", href: "/rinjani/getting-started/installation" },
      { id: 4, label: "Theming", href: "/rinjani/getting-started/theming" },
      { id: 5, label: "Changelog", href: "/rinjani/getting-started/changelog" },
    ],
  },
  {
    id: 6,
    label: "Feedback",
    href: "/rinjani/components/feedback",
    icon: <LuMessageSquare className="w-5 h-5" />,
    children: [
      { id: 7, label: "Alert", href: "/rinjani/components/feedback/alert" },
      { id: 8, label: "Dialog", href: "/rinjani/components/feedback/dialog" },
      { id: 9, label: "Toast", href: "/rinjani/components/feedback/toast" },
    ],
  },
  {
    id: 10,
    label: "Badge",
    href: "/rinjani/components/badge",
    icon: <LuBadge className="w-5 h-5" />,
  },
  {
    id: 11,
    label: "Breadcrumb",
    href: "/rinjani/components/breadcrumb",
    icon: <LuMenu className="w-5 h-5" />,
  },
  {
    id: 12,
    label: "Button",
    href: "/rinjani/components/button",
    icon: <LuMousePointerClick className="w-5 h-5" />,
  },
  {
    id: 13,
    label: "Card",
    href: "/rinjani/components/card",
    icon: <LuLayoutTemplate className="w-5 h-5" />,
  },
  {
    id: 14,
    label: "Drawer",
    href: "/rinjani/components/drawer",
    icon: <FiLayout className="w-5 h-5" />,
  },
  {
    id: 15,
    label: "Dropdown",
    href: "/rinjani/components/dropdown",
    icon: <LuListTree className="w-5 h-5" />,
  },
  {
    id: 16,
    label: "Form",
    href: "/rinjani/components/form",
    icon: <FiFileText className="w-5 h-5" />,
    children: [
      { id: 17, label: "Autocomplete", href: "/rinjani/components/form/autocomplete" },
      { id: 18, label: "Checkbox", href: "/rinjani/components/form/checkbox" },
      { id: 19, label: "InputField", href: "/rinjani/components/form/input-field" },
      { id: 20, label: "Radio", href: "/rinjani/components/form/radio" },
      { id: 21, label: "Select", href: "/rinjani/components/form/select" },
      { id: 22, label: "Switch", href: "/rinjani/components/form/switch" },
    ],
  },
  {
    id: 23,
    label: "Lightbox",
    href: "/rinjani/components/lightbox",
    icon: <LuImage className="w-5 h-5" />,
  },
  {
    id: 24,
    label: "Modal",
    href: "/rinjani/components/modal",
    icon: <LuAppWindow className="w-5 h-5" />,
  },
  {
    id: 25,
    label: "Tabs",
    href: "/rinjani/components/tabs",
    icon: <LuFolderOpen className="w-5 h-5" />,
  },
  {
    id: 26,
    label: "Tooltip",
    href: "/rinjani/components/tooltip",
    icon: <LuMessageCircle className="w-5 h-5" />,
  },
];

const RinjaniLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const activeIds = React.useMemo(() => {
    const newActiveIds = new Set<number>();

    // Auto-detect active menu based on current URL path
    MenuItems.forEach((item) => {
      // Check if parent matches
      if (item.href && pathname.startsWith(item.href)) {
        newActiveIds.add(item.id);
      }

      // Check if children matches
      if (item.children) {
        item.children.forEach((child) => {
          if (child.href && pathname.startsWith(child.href)) {
            newActiveIds.add(item.id); // Expand the parent folder
            newActiveIds.add(child.id); // Highlight the child menu
          }
        });
      }
    });

    // Fallback if none matched
    if (newActiveIds.size === 0) {
      newActiveIds.add(1); // Default to Dashboard or first menu
    }

    return newActiveIds;
  }, [pathname]);

  return (
    <PanelLayout
      sidebar={{
        menuItems: MenuItems,
        activeMenuIds: activeIds
      }}>
      {children}
    </PanelLayout>
  )
}

export default RinjaniLayout