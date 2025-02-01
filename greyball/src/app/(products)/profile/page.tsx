import { auth } from "@/auth.config";
import { Title } from "@/components/ui/title/Title";
import { redirect } from "next/navigation";

export default async function Profile() {
    const session = await auth();

    if (!session?.user) {
        redirect("/");
    }

    return (
        <div className="flex flex-col pb-52 justify-center items-center min-h-screen w-full ">
            <div className="flex flex-col pl-4 justify-start items-start  w-[500px] h-[400px] box-shadow space-y-1">
                <Title title="Perfil" />
                <label className="font-bold">Name</label>
                <p className="text-sm">{session.user.name}</p>
                <label className="font-bold">Email</label>
                <p className="text-sm">{session.user.email}</p>
                <label className="font-bold">Role</label>
                <p className="text-sm">{session.user.role}</p>

            </div>

        </div>
    );
}
