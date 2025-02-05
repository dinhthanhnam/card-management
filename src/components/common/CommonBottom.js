export default function CommonBottom({ children, className, onClick }) {
    return (
        <button
            className={`button-primary border-2 border-b-fuchsia-300
                hover:bg-fuchsia-600 hover:text-white ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
