export default function CommonButton({ children, className, onClick, type}) {
    return (
        <button
            className={`button-primary border-2 border-b-primary ${className}`}
            onClick={onClick} type={type}
        >
            {children}
        </button>
    );
}
