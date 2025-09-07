import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactElement } from "react";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Footer";
const Layout = async ({ children }: { children: ReactElement }) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect(`/`);

  return (
    <div>
      <Toaster />
      {children}
      <div className="h-12"></div>
      <Footer />
    </div>
  );
};

export default Layout;
