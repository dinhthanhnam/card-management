import { useState } from "react";
import SearchBar from "@/components/common/SearchBar";
import CommonModal from "@/components/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import { X } from "lucide-react";
import CommonBottom from "@/components/common/CommonBottom";
import {BiDetail} from "react-icons/bi";

export default function MultiLevelList() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState(false);

    const data = [
        { id: 1, name: "Nguyễn Văn A", email: "a@email.com", phone: "0901234567", address: "Hà Nội", dob: "01/01/1990",
            cards: [
                { cardNumber: "1234 5678 9101 1121", type: "Visa", balance: "10,000,000 VND",
                    transactions: [
                        { id: 1, code: "123213DAD", date: "01/01/2021", amount: "1,000,000 VND", description: "Mua sắm" },
                        { id: 2, code: "123213DDD", date: "02/01/2021", amount: "2,000,000 VND", description: "Mua sắm" }
                    ]
                },
                { cardNumber: "4321 8765 1011 2112", type: "Mastercard", balance: "5,000,000 VND", transactions: [] }
            ]
        },
        { id: 2, name: "Trần Thị B", email: "b@email.com", phone: "0912345678" , address: "Hà Nội", dob: "01/01/1989"  },
        { id: 3, name: "Lê Văn C", email: "c@email.com", phone: "0923456789" , address: "Hà Nội", dob: "01/01/1991"  },
        { id: 4, name: "Phạm Thị D", email: "d@email.com", phone: "0934567890" , address: "Hà Nội", dob: "01/01/1992" },
    ];

    const filteredData = data.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-row w-full gap-2">
            <div className="container">
                <h2 className="text-xl font-bold mb-3">Danh sách chủ thẻ</h2>
                <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} onSearch={() => onSearch(search)} />
                <table className="w-full border-collapse border border-gray-300 mt-4">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Họ tên</th>
                        <th className={`border p-2 ${selectedUser ? "hidden" : ""}`}>Email</th>
                        <th className="border p-2">Số điện thoại</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.map((user) => (
                        <tr key={user.id} className={`cursor-pointer hover:bg-gray-100 ${selectedUser?.id === user.id ? "bg-gray-300" : ""}`}
                            onClick={() => {
                                if (!modal) {
                                    setSelectedUser(user);
                                }
                                setSelectedUser(user);
                                setSelectedCard(null)
                                setModal(false);
                            }}>
                            <td className="border p-2 text-center">{user.id}</td>
                            <td className="border p-2">
                                <div className={`flex items-center justify-start gap-2`}>
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedUser(user);
                                        setModal(true);
                                    }}>
                                        <BiDetail className="text-sky-700 text-lg"/>
                                    </button>
                                    <span>{user.name}</span>
                                </div>
                            </td>
                            <td className={`border p-2 ${selectedUser ? "hidden" : ""}`}>{user.email}</td>
                            <td className="border p-2">{user.phone}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {selectedUser?.cards && (
                <div className="container relative h-full">
                    <button
                        onClick={() => setSelectedUser(null)}
                        className="absolute top-4 right-4 rounded-full hover:bg-gray-200"
                    >
                        <X className="cursor-pointer w-6 h-6"/>
                    </button>
                    <div>
                        <h2 className="text-xl font-bold">Danh sách thẻ</h2>
                    </div>
                    <table className="w-full border-collapse border my-3 border-gray-300">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Số thẻ</th>
                            <th className="border p-2">Loại thẻ</th>
                            <th className="border p-2">Số dư</th>
                        </tr>
                        </thead>
                        <tbody>
                        {selectedUser.cards.length > 0 ? selectedUser.cards.map((card) => (
                            <tr key={card.cardNumber}
                                className={`cursor-pointer hover:bg-gray-100 ${selectedCard?.cardNumber === card.cardNumber ? "bg-gray-300" : ""}`}
                                onClick={() => setSelectedCard(card)}>
                                <td className="border p-2">
                                    <div className={`flex items-center justify-start gap-2`}>
                                        <button>
                                            <BiDetail className="text-sky-700 text-lg"/>
                                        </button>
                                        <span className={`whitespace-nowrap`}>{card.cardNumber}</span>
                                    </div>
                                </td>
                                <td className="border p-2">{card.type}</td>
                                <td className="border p-2">{card.balance}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="border p-2 text-center">Không có thẻ</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedUser && selectedCard && selectedCard.transactions && (
                <div className="container relative h-full">
                    <button
                        onClick={() => setSelectedCard(null)}
                        className="absolute top-4 right-4 rounded-full hover:bg-gray-200"
                    >
                        <X className="cursor-pointer w-6 h-6"/>
                    </button>
                    <div>
                        <h2 className="text-xl font-bold">Lịch sử giao dịch</h2>
                    </div>
                    <div className={`my-3`}>
                        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)}
                                   onSearch={() => onSearch(search)}/>
                    </div>

                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Ngày</th>
                            <th className="border p-2">Mã giao dịch</th>
                            <th className="border p-2">Số tiền</th>
                            <th className="border p-2">Mô tả</th>
                        </tr>
                        </thead>
                        <tbody>
                        {selectedCard.transactions.length > 0 ? selectedCard.transactions.map((transaction) => (
                            <tr key={transaction.id} className="border p-2">
                                <td className="border p-2">{transaction.date}</td>
                                <td className="border p-2">
                                    <div className={`flex items-center justify-start gap-2`}>
                                        <button>
                                            <BiDetail className="text-sky-700 text-lg"/>
                                        </button>
                                        <span className={`whitespace-nowrap`}>{transaction.code}</span>
                                    </div>
                                </td>
                                <td className="border p-2">{transaction.amount}</td>
                                <td className="border p-2">{transaction.description}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="border p-2 text-center">Không có giao dịch</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}
            {/* Modal chi tiết chủ thẻ */}
            {modal && selectedUser && (
                <CommonModal onClose={() => {
                    setModal(false);
                }}>
                    <div className={`p-layout`}>
                        <div>
                        <h2 className="text-xl font-bold mb-4">Chi tiết chủ thẻ</h2>
                        </div>
                        <div className={`flex gap-4 flex-wrap`}>
                            <FormInput className={`w-50`} label="Họ tên" value={selectedUser.name} disabled/>
                            <FormInput label="Email" value={selectedUser.email} disabled/>
                            <FormInput label="Số điện thoại" value={selectedUser.phone} disabled/>
                            <FormInput label="Địa chỉ" value={selectedUser.address} disabled/>
                            <FormInput label="Năm sinh" value={selectedUser.dob} disabled/>
                        </div>
                        <div className={`flex flex-row justify-between`}>
                            <CommonBottom>Sửa</CommonBottom>
                            <CommonBottom>Lưu</CommonBottom>
                        </div>
                    </div>
                    <div>

                    </div>
                </CommonModal>
            )}
        </div>
    );
}
