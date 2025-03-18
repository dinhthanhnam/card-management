import React from 'react';

interface CommonButtonProps {
    onClick?: () => void,
    className?: string,
    type?: 'button' | 'submit' | 'reset',
    children?: React.ReactNode,
    disabled?: boolean
}

export function CommonButton({
                                 children,
                                 className = '',
                                 onClick,
                                 type = 'button',
                                 disabled
                             }: CommonButtonProps) {
    return (
        <button
            className={`button-primary border-2 border-b-primary ${className}`}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
}