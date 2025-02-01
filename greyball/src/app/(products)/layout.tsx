import { auth } from "@/auth.config";
import { Protected } from "@/components/protected/Protected";
import { Footer } from "@/components/ui/footer/Footer";
import { NavBar } from "@/components/ui/navbar/NavBar";
import { Sidebar } from "@/components/ui/sidebar/SideBar";
import { redirect } from "next/navigation";

export default async function ShopLayout({ children }: {
    children: React.ReactNode;
}) {

    const session = await auth();

    if (!session?.user) {
        redirect("/auth/login");
    }

    return (
        <main className="min-h-screen">
            <Protected>
                <NavBar />
                <Sidebar />
                <div className="px-0 sm:px-10 min-h-[90dvh]">
                    {children}
                </div>
                <Footer />
            </Protected>
        </main>
    );
}