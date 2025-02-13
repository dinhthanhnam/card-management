"use client";
import { useState } from "react";
import {Search, LockKeyhole, LockKeyholeOpen, Filter, DollarSign, ListCollapse, X} from "lucide-react";
import FormInput from "@/components/common/FormInput";
import {FormSelect} from "@/components/common/FormSelect";
import CommonBottom from "@/components/common/CommonBottom";
import CommonButton from "@/components/common/CommonBottom";
import {BiDetail} from "react-icons/bi";
import CommonModal from "@/components/common/CommonModal";

export default function ContractPage() {
    const contractData = [
        { contractNumber: "CT001", type: "Loan", payment_network: "Visa", amount: 50000000, status: "approved", locked: false, term: "12 months",
            contractHolder: { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com", phone: "0912312312", identityNumber: "09809123129837" },
            linkedCards: [
                {
                    cardNumber: "1234 5678 9101 1121",
                },
                {
                    cardNumber: "1234 5678 9101 2221",
                }
            ],
            associatedCustomer: { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com"}
        },
        { contractNumber: "CT002", type: "Mortgage", payment_network: "Visa", amount: 200000000, status: "approved", locked: true, term: "24 months" },
        { contractNumber: "CT003", type: "Personal Loan", payment_network: "Visa", amount: 75000000, status: "approved", locked: false, term: "18 months" },
        { contractNumber: "CT004", type: "Auto Loan", payment_network: "JCB", amount: 120000000, status: "approved", locked: true, term: "36 months" },
    ];


    const [searchType, setSearchType] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [lockedContracts, setLockedContracts] = useState({});
    const [selectedContract, setSelectedContract] = useState(null);
    const [seeContractRelation, setSeeContractRelation] = useState(false);
    const [modal, setModal] = useState(false);

    const toggleLock = (contractNumber) => {
        setLockedContracts((prev) => ({
            ...prev,
            [contractNumber]: !prev[contractNumber],
        }));
    };

    const filteredContracts = contractData.filter((contract) => {
        if (searchType === "simple") {
            return contract.contractNumber.includes(searchText) || contract.type.toLowerCase().includes(searchText.toLowerCase());
        }
        return true;
    });

    return (
        <div className="p-2">
            <div className="container relative p-4 border border-gray-300 rounded-lg shadow-md bg-white">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-600">Danh sách hợp đồng</h2>
                </div>

                {/* Khối tìm kiếm */}
                <div className={`overflow-hidden transition-all duration-300 mt-4 p-4 border-t border-gray-300 bg-gray-50 rounded-b-md grid grid-cols-2 gap-4`}>
                    <FormInput
                        label="Nhập mã hợp đồng hoặc căn cước công dân"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <FormSelect
                        label="Loại hợp đồng"
                        name="type"
                        options={["LOAN", "CREDITCARD", "MORTGAGE"]}
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                    />
                </div>
            </div>
            <div className={`flex flex-row gap-2 mt-2`}>
                <div className="container h-full">
                    <h2 className="text-lg font-bold text-gray-600 mb-2">Kết quả tìm kiếm</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Mã hợp đồng</th>
                            <th className="border p-2">Loại hợp đồng</th>
                            <th className="border p-2">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredContracts.length > 0 ? (
                            filteredContracts.map((contract) => (
                                <tr key={contract.contractNumber}
                                    className={`cursor-pointer hover:bg-gray-100 
                                    ${selectedContract?.contractNumber === contract.contractNumber && !seeContractRelation ? "bg-gray-300" : ""}`}
                                >
                                    <td className="border p-2">
                                        <div className="flex items-center justify-center gap-2">
                                            <button onClick={() => {
                                                setSelectedContract(contract);
                                                setModal(true);
                                            }}>
                                                <BiDetail className="text-sky-700 text-lg"/>
                                            </button>
                                            <span>{contract.contractNumber}</span>
                                        </div>
                                    </td>
                                    <td className="border p-2">{contract.type}</td>
                                    <th className="border">
                                    <div className={`flex items-center justify-center gap-4`}>
                                            <button
                                                className={`hover:bg-gray-300 text-gray-600 rounded-full duration-100 p-1`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleLock(contract.contractNumber);
                                                }}>
                                                {lockedContracts[contract.contractNumber] ?? contract.locked ? (
                                                    <LockKeyhole size={`20`}/>
                                                ) : (
                                                    <LockKeyholeOpen size={`20`}/>
                                                )}
                                            </button>
                                            <button
                                                className={`hover:bg-gray-300 text-gray-600 rounded-full duration-100 p-1`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedContract(contract);
                                                    setSeeContractRelation(true);
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
                {seeContractRelation && selectedContract && (
                    <div className="container w-2/3 relative h-full">
                        {/* Close Button */}
                        <button
                            onClick={() => setSeeContractRelation(false)}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
                        >
                            <X className="cursor-pointer w-6 h-6" />
                        </button>

                        {/* Title */}
                        <h2 className="text-xl font-bold mb-4">Quan hệ</h2>

                        {/* Table */}
                        <table className="w-full border border-gray-300">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-3">Khách hàng</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* Hiển thị khách hàng liên kết */}
                            {selectedContract?.associatedCustomer ? (
                                <tr className="hover:bg-gray-100">
                                    <td className="border p-3">
                                        {selectedContract.associatedCustomer.name}
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="border p-3 text-center">
                                        <p className="text-gray-500">Hợp đồng này chưa được liên kết</p>
                                        <CommonButton>Liên kết khách hàng</CommonButton>
                                    </td>
                                </tr>
                            )}

                            {/* Hiển thị thẻ liên kết */}
                            <tr className="bg-gray-100">
                                <th className="border p-3">Thẻ liên kết</th>
                            </tr>
                            {selectedContract?.linkedCards?.length ? (
                                selectedContract.linkedCards.map((card) => (
                                    <tr key={card.cardNumber} className="hover:bg-gray-100">
                                        <td className="border p-3">{card.cardNumber}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border p-3 text-center">
                                        <p className="text-gray-500">Hợp đồng này chưa được liên kết thẻ</p>
                                        <CommonButton>Liên kết thẻ</CommonButton>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                )}


            </div>
            {modal && selectedContract && (
                <CommonModal onClose={() => {
                    setModal(false);
                    setSelectedContract(null);
                }}>
                    <div className={`p-layout`}>
                        <div>
                            <h2 className="text-xl font-bold mb-4">Chi tiết hợp đồng</h2>
                        </div>
                        <div className={`grid gap-4 grid-cols-4`}>
                            <FormInput label="Mã hợp đồng" value={selectedContract.contractNumber} disabled/>
                            <FormInput label="Loại" value={selectedContract.type} disabled/>
                            <FormInput label="Giá trị" value={selectedContract.amount} disabled/>
                            <FormInput label="Thời hạn" value={selectedContract.term} disabled/>
                            <FormInput label="Trạng thái" value={selectedContract.status} disabled/>
                        </div>
                        <div className={`grid gap-4 grid-cols-2`}>
                            <CommonBottom>Sửa</CommonBottom>
                            <CommonBottom>Lưu</CommonBottom>
                        </div>
                    </div>
                    <div>

                    </div>
                </CommonModal>
            )}
            {/*{isLimitModalOpen && selectedcontract && (*/}
            {/*    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">*/}
            {/*        <div className="bg-white p-6 rounded-lg w-96">*/}
            {/*            <h2 className="text-lg font-bold mb-4">Chỉnh sửa hạn mức</h2>*/}
            {/*            <p className="text-gray-700 mb-2">Số thẻ: {selectedcontract.contractNumber}</p>*/}
            {/*            <p className="text-gray-700 mb-2">Hạn mức hiện tại: {selectedcontract.limit}</p>*/}
            {/*            <label className="block text-gray-600 font-medium">Hạn mức mới:</label>*/}
            {/*            <input*/}
            {/*                type="text"*/}
            {/*                className="w-full border p-2 rounded-lg focus:ring focus:ring-fuchsia-300"*/}
            {/*                placeholder="Nhập hạn mức mới"*/}
            {/*            />*/}

            {/*            <div className="flex justify-end gap-2 mt-4">*/}
            {/*                <button*/}
            {/*                    className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"*/}
            {/*                    onClick={() => setIsLimitModalOpen(false)}*/}
            {/*                >*/}
            {/*                    Hủy*/}
            {/*                </button>*/}
            {/*                <button*/}
            {/*                    className="bg-fuchsia-500 text-white px-4 py-2 rounded-lg hover:bg-fuchsia-600"*/}
            {/*                >*/}
            {/*                    Lưu*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}

        </div>
    );
}