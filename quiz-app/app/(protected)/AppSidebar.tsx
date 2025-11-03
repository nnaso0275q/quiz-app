import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const items = [
    "Genghis Khan",

    "Figma ашиглах заавар",

    "Санхүүгийн шийдвэрүүд",

    "Figma-д загвар зохион бүтээх аргачлалууд",

    "Санхүүгийн технологи 2023",

    "Хэрэглэгчийн интерфейс дизайны шилдэг туршлага",

    "Архитектур загварчлалын хөтөлбөрүүд",

    "Эрүүл амьдралын хэв маяг",

    "Технологийн салбарт хийгдэж буй инноваци",
  ];
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent className="mt-[60px]" />

      <div className="text-black font-semibold pl-6 ">History</div>
      <SidebarGroupContent>
        <SidebarMenu className="px-4 ">
          {items.map((item) => (
            <SidebarMenuItem key={item}>
              <SidebarMenuButton asChild>
                <span className="text-black font-medium h-fit py-2 text-base">
                  {item}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>

      <SidebarFooter />
    </Sidebar>
  );
}
