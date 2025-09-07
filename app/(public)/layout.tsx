import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactElement, ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (session?.user) redirect(`/home`);

  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default Layout;
