import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/(protected)/AppSidebar";

export const AdminLayout = () => {
  return (
    <div>
      {/* <Header /> */}
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
        </main>
      </SidebarProvider>
    </div>
  );
};
