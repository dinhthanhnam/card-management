import { Search } from "lucide-react";

export default function SearchBar({ children }) {
    return (
        <div className="flex flex-row items-center space-x-2 mx-2">
            <input
                type="text"
                className="input-field pl-3 pr-4 md:w-full"
                placeholder="Search"
            />
            <div className="border border-r-fuchsia-300 border-b-fuchsia-300 rounded bg-white p-2 hover:bg-gray-100 duration-100">
                <Search className="w-6 h-6 text-gray-500" />
            </div>
        </div>
    );
}
