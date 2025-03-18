import React from "react";

interface ChevronProps {
    children?: React.ReactNode;
}
export function ChevronHolder({ children }: ChevronProps) {
    return (
        <div className="my-auto">
            {children}
        </div>
    );
}
