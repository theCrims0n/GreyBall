import { LoaderCircle } from "lucide-react"

export const Spinner = () => {
    return (
        <div className="w-full h-full flex justify-center place-items-center">
            <LoaderCircle className="animate-spin"
                size={20}
                strokeWidth={2}
                aria-hidden="true" />
        </div>
    )
}