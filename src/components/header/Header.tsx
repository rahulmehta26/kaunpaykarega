import type { ChildrenProps } from "@/types"
import type React from "react"

const Header: React.FC<ChildrenProps> = ({ children }) => {
    return (
        <header
            className=" mt-6 bg-white/95 border-[.1rem] shadow-light border-neutral-700 w-[75rem] pr-2 backdrop-blur rounded-full mx-auto "
        >
            {
                children
            }
        </header>
    )
}

export default Header