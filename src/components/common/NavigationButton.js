export default function NavigationButton({ children }) {
    return (
        <button className="button-primary border-2 border-b-fuchsia-300
             hover:bg-fuchsia-600 hover:text-white">
            {children}
        </button>
    );
}
