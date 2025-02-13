export default function IconHolder({ children, active, onClick }) {
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
