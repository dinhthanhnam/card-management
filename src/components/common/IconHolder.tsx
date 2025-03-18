import React from "react";

interface IconHolderProps {
    children?: React.ReactNode,
    active?: boolean,
    onClick?: () => void,
}

export function IconHolder({ children, active = false, onClick } : IconHolderProps) {
    return (
        <div
            onClick={onClick}
            className={`border rounded-xl p-2 duration-100 flex flex-row cursor-pointer
                ${active ? "border-secondary bg-primary" : "border-gray-400 bg-white hover:bg-gray-100"}
            `}
        >
            {children}
        </div>
    );
}
