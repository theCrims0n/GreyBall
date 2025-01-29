import { Footer } from "@/components/ui/footer/Footer";
import { NavBar } from "@/components/ui/navbar/NavBar";

export default function ShopLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen">
            <NavBar />
            <div className="px-0 sm:px-10 min-h-[90dvh]">
                {children}
            </div>
            <Footer />
        </main>
    );
}