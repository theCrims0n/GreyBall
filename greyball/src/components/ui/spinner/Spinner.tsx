import { LoaderCircle } from "lucide-react"

interface Props {
    size: number
}

export const Spinner = ({ size }: Props) => {
    return (
        <div className="w-full h-full flex justify-center place-items-center">
            <LoaderCircle className="animate-spin"
                size={size}
                strokeWidth={2}
                aria-hidden="true" />
        </div>
    )
}