"use client";
import { useState } from "react";
import {Search, Filter, LockIcon, LockKeyhole, LockKeyholeOpen, DollarSign, ListCollapse, X} from "lucide-react";
import FormInput from "@/components/common/FormInput";
import { FormSelect } from "@/components/common/FormSelect";

export default function CardPage() {
    const cardData = [
        { cardNumber: "1234 5678 9101 1121", type: "Visa", bank: "Vietcombank", balance: 10000000, locked: false, limit: 20000000,
            cardholder:
                {
                    id: 1,
                    name: "Nguyễn Văn A",
                    email: "a@gmail.com",}
        },
        { cardNumber: "1111 2222 3333 4444", type: "MasterCard", bank: "Techcombank", balance: 5000000, locked: false, limit: 2000000 },
        { cardNumber: "5555 6666 7777 8888", type: "Visa", bank: "Vietinbank", balance: 12000000, locked: true, limit: 200000},
        { cardNumber: "9999 0000 1111 2222", type: "JCB", bank: "BIDV", balance: 8000000, locked: true, limit: 1000000 },
    ];

    const [searchType, setSearchType] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [filter, setFilter] = useState({
        cardNumber: "",
        type: "",
        bank: "",
        minBalance: "",
        maxBalance: "",
    });
    const [lockedCards, setLockedCards] = useState({});

    const toggleLock = (cardNumber) => {
        setLockedCards((prev) => ({
            ...prev,
            [cardNumber]: !prev[cardNumber],
        }));
    };

    const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const [seeCardRelation, setSeeCardRelation] = useState(false);


    const filteredCards = cardData.filter((card) => {
        if (searchType === "simple") {
            return card.cardNumber.includes(searchText) || card.type.toLowerCase().includes(searchText.toLowerCase());
        } else if (searchType === "advanced") {
            return (
                (filter.cardNumber === "" || card.cardNumber.includes(filter.cardNumber)) &&
                (filter.type === "" || card.type === filter.type) &&
                (filter.bank === "" || card.bank === filter.bank) &&
                (filter.minBalance === "" || card.balance >= parseInt(filter.minBalance)) &&
                (filter.maxBalance === "" || card.balance <= parseInt(filter.maxBalance))
            );
        }
        return true;
    });

    return (
        <div className="p-2">
            <div className="container relative p-4 border border-gray-300 rounded-lg shadow-md bg-white">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-600">Danh sách thẻ</h2>
                    <div className="flex flex-row-reverse gap-2">
                        <button
                            onClick={() => setSearchType(searchType === "advanced" ? null : "advanced")}
                            className={`flex items-center gap-1 px-3 py-1 border rounded-md transition ${
                                searchType === "advanced" ? "bg-gray-200 border-gray-400" : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        >
                            <Filter size={16} />
                            Tìm kiếm chi tiết
                        </button>

                        <button
                            onClick={() => setSearchType(searchType === "simple" ? null : "simple")}
                            className={`flex items-center gap-1 px-3 py-1 border rounded-md transition ${
                                searchType === "simple" ? "bg-gray-200 border-gray-400" : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        >
                            <Search size={16} />
                            Tìm kiếm đơn giản
                        </button>
                    </div>
                </div>

                {/* Khối tìm kiếm */}
                <div className={`overflow-hidden transition-all duration-300 ${
                    searchType ? "mt-4 p-4 border-t border-gray-300 bg-gray-50 rounded-b-md" : "h-0"
                }`}>
                    {searchType === "simple" && (
                        <FormInput
                            label="Nhập số thẻ hoặc loại thẻ"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    )}

                    {searchType === "advanced" && (
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput
                                label="Số thẻ"
                                name="cardNumber"
                                value={filter.cardNumber}
                                onChange={(e) => setFilter({ ...filter, cardNumber: e.target.value })}
                            />
                            <FormSelect
                                label="Loại thẻ"
                                name="type"
                                options={["Visa", "MasterCard", "JCB"]}
                                value={filter.type}
                                onChange={(e) => setFilter({ ...filter, type: e.target.value })}
                            />
                            <FormSelect
                                label="Ngân hàng"
                                name="bank"
                                options={["Vietcombank", "Techcombank", "Vietinbank", "BIDV"]}
                                value={filter.bank}
                                onChange={(e) => setFilter({ ...filter, bank: e.target.value })}
                            />
                            <FormInput
                                label="Số dư từ"
                                type="number"
                                name="minBalance"
                                value={filter.minBalance}
                                onChange={(e) => setFilter({ ...filter, minBalance: e.target.value })}
                            />
                            <FormInput
                                label="Số dư đến"
                                type="number"
                                name="maxBalance"
                                value={filter.maxBalance}
                                onChange={(e) => setFilter({ ...filter, maxBalance: e.target.value })}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className={`flex flex-row gap-2 mt-2`}>
                <div className="container">
                    <h2 className="text-lg font-bold text-gray-600 mb-2">Kết quả tìm kiếm</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Số thẻ</th>
                            <th className="border p-2">Loại thẻ</th>
                            <th className="border p-2">Ngân hàng</th>
                            <th className="border p-2">Số dư</th>
                            <th className="border p-2">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredCards.length > 0 ? (
                            filteredCards.map((card) => (
                                <tr key={card.cardNumber} className="hover:bg-gray-100">
                                    <td className="border p-2">{card.cardNumber}</td>
                                    <td className="border p-2">{card.type}</td>
                                    <td className="border p-2">{card.bank}</td>
                                    <td className="border p-1">{card.balance.toLocaleString()} VND</td>
                                    <th className="border">
                                        <div className={`flex items-center justify-center gap-4`}>
                                            <button
                                                className={`hover:bg-gray-300 text-gray-600 rounded-full duration-100 p-1`}
                                                onClick={() => toggleLock(card.cardNumber)}>
                                                {lockedCards[card.cardNumber] ?? card.locked ? (
                                                    <LockKeyhole size={`20`}/>
                                                ) : (
                                                    <LockKeyholeOpen size={`20`}/>
                                                )}
                                            </button>
                                            <button
                                                className={`hover:bg-gray-300 text-gray-600 rounded-full duration-100 p-1`}
                                                onClick={() => {
                                                    setSelectedCard(card);
                                                    setIsLimitModalOpen(true);
                                                }}>
                                                <DollarSign size={`20`}/>
                                            </button>
                                            <button
                                                className={`hover:bg-gray-300 text-gray-600 rounded-full duration-100 p-1`}
                                                onClick={() => {
                                                    setSelectedCard(card);
                                                    setSeeCardRelation(true);
                                                }}>
                                                <ListCollapse size={`20`}/>
                                            </button>
                                        </div>
                                    </th>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="border p-2 text-center">Không có kết quả</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                {seeCardRelation && selectedCard && (
                    <div className="container w-2/3 relative h-full">
                        <button
                            onClick={() => setSeeCardRelation(false)}
                            className="absolute top-4 right-4 rounded-full hover:bg-gray-200"
                        >
                            <X className="cursor-pointer w-6 h-6"/>
                        </button>
                        <div>
                            <h2 className="text-xl font-bold">Quan hệ</h2>
                        </div>
                        <table className="w-full border-collapse border my-3 border-gray-300">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Chủ thẻ</th>
                            </tr>
                            </thead>
                            <tbody>
                            {selectedCard.cardholder ? (
                                <tr key={selectedCard.cardNumber}
                                    className={`cursor-pointer hover:bg-gray-100`}>
                                    <td className="border p-2">{selectedCard.cardholder.name} | {selectedCard.cardholder.email}</td>
                                </tr>
                            ) : (
                                <tr>
                                    <td colSpan="5" className="border p-2 text-center">Không có quan hệ chủ thẻ</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>

            {isLimitModalOpen && selectedCard && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Chỉnh sửa hạn mức</h2>
                        <p className="text-gray-700 mb-2">Số thẻ: {selectedCard.cardNumber}</p>
                        <p className="text-gray-700 mb-2">Hạn mức hiện tại: {selectedCard.limit}</p>
                        <label className="block text-gray-600 font-medium">Hạn mức mới:</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded-lg focus:ring focus:ring-fuchsia-300"
                            placeholder="Nhập hạn mức mới"
                        />

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                                onClick={() => setIsLimitModalOpen(false)}
                            >
                                Hủy
                            </button>
                            <button
                                className="bg-fuchsia-500 text-white px-4 py-2 rounded-lg hover:bg-fuchsia-600"
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
