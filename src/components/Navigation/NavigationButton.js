import Link from "next/link";

export default function NavigationButton({ children, active, onClick, href }) {
    return (
        <Link href={href} passHref legacyBehavior>
            <a
                onClick={onClick}
                className={`w-full flex gap-2 items-center p-4 px-6 text-gray-500 hover:bg-primary transition-colors duration-200 ease-in-out 
                ${active ? "bg-primary !text-secondary" : ""}`}
            >
                {children}
            </a>
        </Link>
    );
}
