"use client"

import * as React from "react"
import { LogoImage } from "./logo-image"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Loans",
      url: "#",
      items: [
        {
          title: "My Loans",
          url: "/loans",
        },
        {
          title: "Apply for Loan",
          url: "/loans/apply",
        },
        {
          title: "Loan Status",
          url: "#",
        },
        {
          title: "Repayments",
          url: "#",
        }
      ],
    },
    {
      title: "Tools",
      url: "#",
      items: [
        {
          title: "Loan Calculator",
          url: "#",
        },
        {
          title: "EMI Schedule",
          url: "#",
        },
        {
          title: "Eligibility Check",
          url: "#",
        }
      ],
    },
    {
      title: "Account",
      url: "#",
      items: [
        {
          title: "Profile",
          url: "/profile",
        },
        {
          title: "Settings",
          url: "#",
        },
        // {
        //   title: "Logout",
        //   url: "#",
        // }
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/* <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm /> */}
        <LogoImage />

      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
