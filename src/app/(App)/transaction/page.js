"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import FormInput from "@/components/common/FormInput";
import SearchBar from "@/components/common/SearchBar";

const transactionsMock = [
    { id: 1, transactionNumber: "123123ABCDQ", cardNumber: "1234 5678 9101 1121", type: "Thanh toán", amount: "500,000 VND", status: "Thành công" },
    { id: 2, transactionNumber: "123123ABDDQ", cardNumber: "5678 9101 1121 3141", type: "Rút tiền", amount: "1,000,000 VND", status: "Thất bại" },
    { id: 3, transactionNumber: "123123AB1DQ", cardNumber: "9101 1121 3141 5161", type: "Chuyển khoản", amount: "200,000 VND", status: "Đang xử lý" },
];

export default function TransactionPage() {
    const [search, setSearch] = useState("");
    const [filteredTransactions, setFilteredTransactions] = useState(transactionsMock);

    const handleSearch = () => {
        const filtered = transactionsMock.filter(t =>
            t.cardNumber.includes(search) || t.type.includes(search)
        );
        setFilteredTransactions(filtered);
    };

    return (
        <div className="p-2">
            <div className="container">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Lịch sử giao dịch</h2>
                    <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} onSearch={() => onSearch(search)} />
                </div>
                <table className="w-full border-collapse border mt-4">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Mã giao dịch</th>
                        <th className="border p-2">Số thẻ</th>
                        <th className="border p-2">Loại giao dịch</th>
                        <th className="border p-2">Số tiền</th>
                        <th className="border p-2">Trạng thái</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredTransactions.length > 0 ? filteredTransactions.map(t => (
                        <tr key={t.id} className="hover:bg-gray-50">
                            <td className="border p-2">{t.transactionNumber}</td>
                            <td className="border p-2">{t.cardNumber}</td>
                            <td className="border p-2">{t.type}</td>
                            <td className="border p-2">{t.amount}</td>
                            <td className={`border p-2 font-semibold ${t.status === "Thành công" ? "text-green-600" : t.status === "Thất bại" ? "text-red-600" : "text-yellow-600"}`}>{t.status}</td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="4" className="border p-2 text-center">Không có giao dịch</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
