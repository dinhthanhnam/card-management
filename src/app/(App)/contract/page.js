"use client";
import { useState } from "react";
import {Search, LockKeyhole, LockKeyholeOpen, Filter, DollarSign, ListCollapse, X} from "lucide-react";
import FormInput from "@/components/common/FormInput";
import {FormSelect} from "@/components/common/FormSelect";
import CommonBottom from "@/components/common/CommonBottom";
import CommonButton from "@/components/common/CommonBottom";

export default function ContractPage() {
    const contractData = [
        { contractNumber: "CT001", type: "Loan", bank: "Vietcombank", amount: 50000000, status: "approved", locked: false, term: "12 months",
            contractHolder: { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com", phone: "0912312312", identityNumber: "09809123129837" },
            associatedCustomer: { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com"}
        },
        { contractNumber: "CT002", type: "Mortgage", bank: "Techcombank", amount: 200000000, status: "approved", locked: true, term: "24 months" },
        { contractNumber: "CT003", type: "Personal Loan", bank: "Vietinbank", amount: 75000000, status: "approved", locked: false, term: "18 months" },
        { contractNumber: "CT004", type: "Auto Loan", bank: "BIDV", amount: 120000000, status: "approved", locked: true, term: "36 months" },
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
                <div className={`overflow-hidden transition-all duration-300 mt-4 p-4 border-t border-gray-300 bg-gray-50 rounded-b-md`}>
                    <FormInput
                        label="Nhập mã hợp đồng hoặc căn cước công dân"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
            </div>
            <div className={`flex flex-row gap-2 mt-2`}>
                <div className="container">
                    <h2 className="text-lg font-bold text-gray-600 mb-2">Kết quả tìm kiếm</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Mã hợp đồng</th>
                            <th className="border p-2">Loại hợp đồng</th>
                            <th className="border p-2">Ngân hàng</th>
                            <th className="border p-2">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredContracts.length > 0 ? (
                            filteredContracts.map((contract) => (
                                <tr key={contract.contractNumber}
                                    className={`cursor-pointer hover:bg-fuchsia-100 ${selectedContract?.contractNumber === contract.contractNumber && !seeContractRelation ? "bg-fuchsia-300" : ""}`}
                                    onClick={() => {
                                        setSelectedContract(contract);
                                        setModal(true);
                                    }}
                                >
                                    <td className="border p-2">{contract.contractNumber}</td>
                                    <td className="border p-2">{contract.type}</td>
                                    <td className="border p-2">{contract.bank}</td>
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
                        <button
                            onClick={() => setSeeContractRelation(false)}
                            className="absolute top-4 right-4 rounded-full hover:bg-gray-200"
                        >
                            <X className="cursor-pointer w-6 h-6"/>
                        </button>
                        <div>
                            <h2 className="text-xl font-bold">Liên kết khách hàng</h2>
                        </div>
                        <table className="w-full border-collapse border my-3 border-gray-300">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Khách hàng</th>
                            </tr>
                            </thead>
                            <tbody>
                            {selectedContract.associatedCustomer ? (
                                <tr key={selectedContract.contractNumber}
                                    className={`cursor-pointer hover:bg-gray-100`}>
                                    <td className="border p-2">{selectedContract.associatedCustomer.name} | {selectedContract.associatedCustomer.email}</td>
                                </tr>
                            ) : (
                                <tr>
                                    <td colSpan="5" className="border p-2 text-center">
                                        <p>Hợp đồng này chưa được liên kết</p>
                                        <CommonButton>Liên kết hợp đồng</CommonButton>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
            {modal && selectedContract && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold">Thông tin hợp đồng</h2>
                        <p><strong>Mã hợp đồng:</strong> {selectedContract.contractNumber}</p>
                        <p><strong>Loại:</strong> {selectedContract.type}</p>
                        <p><strong>Ngân hàng:</strong> {selectedContract.bank}</p>
                        <p><strong>Thời hạn:</strong> {selectedContract.term}</p>
                        {selectedContract.contractHolder ? (
                            <>
                                <h2 className="text-xl font-bold">Thông tin Contract Holder</h2>
                                <p><strong>Tên:</strong> {selectedContract.contractHolder.name}</p>
                                <p><strong>Số CMND/CCCD:</strong> {selectedContract.contractHolder.identityNumber}</p>
                            </>
                        ) : (
                            <p className="text-red-500">Không có thông tin Contract Holder</p>
                        )}

                        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => setModal(false)}>Đóng
                        </button>
                    </div>
                </div>
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