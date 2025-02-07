export default function IconHolder({ children }) {
    return (
        <div className="border border-gray-400 rounded-xl bg-white p-2 hover:bg-gray-100 duration-100 flex flex-row">
            {children}
        </div>
    );
}
