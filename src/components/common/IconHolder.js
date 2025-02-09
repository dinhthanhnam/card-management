export default function IconHolder({ children, active, onClick }) {
    return (
        <div
            onClick={() => onClick()}
            className={`border rounded-xl p-2 duration-100 flex flex-row cursor-pointer
                ${active ? "border-fuchsia-600 bg-fuchsia-300" : "border-gray-400 bg-white hover:bg-gray-100"}
            `}
        >
            {children}
        </div>
    );
}
