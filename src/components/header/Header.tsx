import type { ChildrenProps } from "@/types"
import type React from "react"

const Header: React.FC<ChildrenProps> = ({ children }) => {
    return (
        <header
            className=" wrapper mt-6 bg-white/95 border shadow-light border-neutral-700/30 pr-2 backdrop-blur rounded-full  "
        >
            {
                children
            }
        </header>
    )
}

export default Header