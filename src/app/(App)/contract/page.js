"use client";
import {useEffect, useState} from "react";
import {Search, LockKeyhole, LockKeyholeOpen, Filter, DollarSign, ListCollapse, X} from "lucide-react";
import FormInput from "@/components/common/FormInput";
import {FormSelect} from "@/components/common/FormSelect";
import CommonButton from "@/components/common/CommonBottom";
import {BiDetail} from "react-icons/bi";
import ReadModal from "@/components/modal/ReadModal";
import { modalrequest } from "@/utils/modalrequest";
import {fetchContract} from "@/utils/fetchcontract";
import SearchBar from "@/components/common/SearchBar";

export default function ContractPage() {

    const [searchType, setSearchType] = useState("");
    const [searchText, setSearchText] = useState("");
    const [lockedContracts, setLockedContracts] = useState({});
    const [seeContractRelation, setSeeContractRelation] = useState(false);
    const [selectedContract, setSelectedContract] = useState(null)
    const [modal, setModal] = useState(false);
    const [contractsData, setContractsData] = useState({})
    const [modalData, setModalData] = useState({})
    const [toggleSearch, setToggleSearch] = useState(false)

    const toggleLock = (contractNumber) => {
        setLockedContracts((prev) => ({
            ...prev,
            [contractNumber]: !prev[contractNumber],
        }));
    };
    const openSearch = () => {
        setToggleSearch(true);
    }

    useEffect(() => {
        const fetchContracts = async () => {
            try {
                setContractsData(await fetchContract(null));
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        };
        fetchContracts();
    }, []);

    const handleOpenModal = async (id) => {
        const data = await seeDetail(id);
        if (data) {
            setModalData(data);
            setModal(true);
        }
    };

    const handleSeeContractRelation = async(contractId) => {
        setSelectedContract(await fetchContract(contractId))
        setSeeContractRelation(true)
    }

    const seeDetail = async (id) => {
        return await modalrequest("contracts", id);
    };

    return (
        <div className="p-2">
            <div className="container relative p-4 border border-gray-300 rounded-lg shadow-md bg-white">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-600">Danh sách hợp đồng</h2>
                    <button
                        onClick={() => setToggleSearch(!toggleSearch)}
                        className={`flex items-center gap-1 px-3 py-1 border rounded-md transition ${
                            setToggleSearch === true ? "bg-gray-200 border-gray-400" : "bg-gray-100 hover:bg-gray-200"
                        }`}
                    >
                        <Search size={16}/>
                        Tìm kiếm đơn giản
                    </button>
                </div>

                {/* Khối tìm kiếm */}
                <div
                    className={`overflow-hidden transition-all duration-300 ${
                        toggleSearch ? "mt-4 p-4 border-t border-gray-300 bg-gray-50 rounded-b-md" : "h-0"
                    }`}>
                    <FormSelect
                        label="Loại hợp đồng"
                        name="type"
                        options={["LIABILITY", "ISSUING"]}
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                    />
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Tìm kiếm theo mã hợp đồng hoặc số định
                            danh</label>
                        <SearchBar
                            value={searchText}
                            onSearch={() => {
                            }}
                            onChange={(e) => setSearchType(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className={`flex flex-row gap-2 mt-2`}>
                <div className="container h-full">
                    {/* <h2 className="text-lg font-bold text-gray-600 mb-2">Kết quả tìm kiếm</h2> */}
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Mã hợp đồng</th>
                            <th className="border p-2">Loại hợp đồng</th>
                            <th className="border p-2">Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {contractsData.length > 0 ? (
                            contractsData.map((contract) => (
                                <tr key={contract.id} className={`cursor-pointer hover:bg-gray-100`}>
                                    <td className="border p-2">
                                        <div className="flex items-center justify-center gap-2">
                                        <button onClick={async () => {
                                                await handleOpenModal(contract.id); // Chờ dữ liệu từ API
                                            }}>
                                            <BiDetail className="text-sky-700 text-lg"/>
                                        </button>
                                            <span>{contract.contractNumber}</span>
                                        </div>
                                    </td>
                                    <td className="border p-2">{contract.contractType}</td>
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
                                                onClick={(e) =>
                                                    handleSeeContractRelation(contract.id)
                                                }>
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
                {seeContractRelation && (
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
                                <th className="border p-3" colSpan="2">Khách hàng</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* Hiển thị khách hàng liên kết */}
                            {selectedContract?.contractType === "LIABILITY" && selectedContract.client? (
                                <tr className="hover:bg-gray-100">
                                    <td className="border p-3">
                                        {selectedContract.client.lastName + " " + selectedContract.client.firstName}
                                    </td>
                                    <td className="border p-3">
                                        {selectedContract.client.identityNumber}
                                    </td>
                                </tr>
                            ) : selectedContract?.contractType === "LIABILITY" ? (
                                <tr>
                                    <td className="border p-3 text-center" colSpan="2">
                                        <p className="text-gray-500">Hợp đồng này chưa được liên kết</p>
                                        <CommonButton>Liên kết khách hàng</CommonButton>
                                    </td>
                                </tr>
                            ) : null}

                            {/* Hiển thị thẻ liên kết */}
                            {selectedContract?.contractType ==="LIABILITY" && (
                                <tr className="bg-gray-100">
                                    <th className="border p-3" colSpan="2">Hợp đồng liên kết</th>
                                </tr>
                            )}

                            {selectedContract?.contractType === "LIABILITY" && selectedContract.children?.length > 0 ? (
                                selectedContract.children.map((childContract) => (
                                    <tr key={childContract.contractNumber} className="hover:bg-gray-100">
                                        <td className="border p-3">{childContract.contractNumber}</td>
                                        <td className="border p-3">{childContract.contractType}</td>
                                    </tr>
                                ))
                            ) : selectedContract?.contractType === "LIABILITY" ? (
                                <tr>
                                    <td className="border p-3 text-center" colSpan={2}>
                                        <p className="text-gray-500">Hợp đồng này chưa có issuing</p>
                                        <CommonButton>Liên kết hợp đồng</CommonButton>
                                    </td>
                                </tr>
                            ) : null}

                            {selectedContract?.contractType === "ISSUING" && selectedContract.client? (
                                <tr className="hover:bg-gray-100">
                                    <td className="border p-3">
                                        {selectedContract.client.lastName + " " + selectedContract.client.firstName}
                                    </td>
                                    <td className="border p-3">
                                        {selectedContract.client.identityNumber}
                                    </td>
                                </tr>
                            ) : selectedContract?.contractType === "ISSUING" ? (
                                <tr>
                                    <td className="border p-3 text-center" colSpan="2">
                                        <p className="text-gray-500">Hợp đồng này chưa được liên kết</p>
                                        <CommonButton>Liên kết khách hàng</CommonButton>
                                    </td>
                                </tr>
                            ) : null}

                            {/* Hiển thị thẻ liên kết */}
                            {selectedContract?.contractType === "ISSUING" && (
                                <tr className="bg-gray-100">
                                    <th className="border p-3" colSpan={2}>Thẻ liên kết</th>
                                </tr>
                            )}
                            {selectedContract?.contractType === "ISSUING" && selectedContract.issuedCards ? (
                                selectedContract.issuedCards.map((card) => (
                                    <tr key={card.cardNumber} className="hover:bg-gray-100">
                                        <td className="border p-3">{card.cardNumber}</td>
                                        <td className="border p-3">ISSUED CARD</td>
                                    </tr>
                                ))
                            ) : selectedContract?.contractType === "ISSUING" ? (
                                <tr>
                                    <td className="border p-3 text-center">
                                        <p className="text-gray-500">Hợp đồng này chưa được liên kết thẻ</p>
                                        <CommonButton>Liên kết thẻ</CommonButton>
                                    </td>
                                </tr>
                            ) : null}
                            </tbody>
                        </table>
                    </div>
                )}


            </div>
            {modal && (
                <ReadModal onClose={() => {
                    setModal(false);
                }} subject={"contracts"} data={modalData}/>
            )}
        </div>
    );
}