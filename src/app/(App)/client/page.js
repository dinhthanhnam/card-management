"use client";
import React, { useState, useEffect } from "react";
import SearchBar from "@/components/common/SearchBar";
import {BiDetail} from "react-icons/bi";
import {X} from "lucide-react";
import ReadModal from "@/components/modal/ReadModal";
import {fetchClient} from "@/utils/fetchclient";
import {fetchClientContracts} from "@/utils/fetchclientcontracts";
import {modalrequest} from "@/utils/modalrequest";
import {fetchContract} from "@/utils/fetchcontract";
import CommonButton from "@/components/common/CommonBottom";
import CreateModal from "@/components/modal/CreateModal";

export default function ClientPage() {
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedContract, setSelectedContract] = useState(null);
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [clientsData, setClientsData] = useState([]);
    const [contractsData,setContractsData] = useState([]);
    const [modalData,  setModalData] = useState([]);
    const [modalSubject, setModalSubject] = useState("");
    const [expandedContracts, setExpandedContracts] = useState({});
    const [issuedCardsData, setIssuedCardsData] = useState({}); // Lưu issuedCards theo contract ID

    const toggleContract = (contractNumber) => {
        setExpandedContracts(prevState => ({
            ...prevState,
            [contractNumber]: !prevState[contractNumber],
        }));
    };

    const fetchIssuedCards = async (contractId) => {
        toggleContract(contractId);

        if (!issuedCardsData[contractId]) {
            const data = await fetchContract(contractId);
            if (data) {
                setIssuedCardsData(prev => ({
                    ...prev,
                    [contractId]: data.issuedCards || []
                }));
            }
        }
    };

    const seeDetail = async (subject, id) => {
        return await modalrequest(subject, id);
    };

    const handleOpenModal = async (subject, id) => {
        setModalSubject(subject);
        const data = await seeDetail(subject, id);
        if (data) {
            setModalData(data);  // Cập nhật state trước khi mở modal
            setModal(true);
        }
    };

    useEffect(() => {
        const fetchClients = async () => {
            try {
                setClientsData(await fetchClient(null));
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        };
        fetchClients();
    }, []);

    useEffect(() => {
        if (selectedClient) {
            const fetchContracts = async () => {
                try {
                    setContractsData(await fetchClientContracts(selectedClient.id));
                } catch (error) {
                    console.error("Failed to fetch contracts", error);
                }
            };
            fetchContracts();
        }
    }, [selectedClient]);

    const filteredData = clientsData.filter((client) =>
        client.firstName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-2">
            <div className="flex flex-row w-full gap-2">
                <div className={`container transition-all duration-500 ${selectedClient ? "w-1/2" : "w-full"}`}>
                    <div className={`flex flex-row justify-between pb-4`}>
                        <h2 className="text-xl font-bold mb-3">Danh sách khách hàng</h2>
                        <CommonButton className={`!w-40`} onClick={() => {
                            setCreateModal(true);
                            setModalSubject("clients");
                        }}>
                            Thêm khách hàng
                        </CommonButton>
                    </div>
                    <SearchBar value={search} onChange={(e) => setSearch(e.target.value)}
                               onSearch={() => onSearch(search)}/>
                    <table className="w-full border-collapse border border-gray-300 mt-4">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Họ tên</th>
                            <th className={`border p-2 ${selectedClient ? "hidden" : ""}`}>Email</th>
                            <th className={`border p-2 ${selectedClient ? "hidden" : ""}`}>Số điện thoại</th>
                            <th className="border p-2">Định danh cá nhân</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredData.map((client) => (
                            <tr key={client.id}
                                className={`cursor-pointer hover:bg-gray-100 ${selectedClient?.id === client.id ? "bg-gray-300" : ""}`}
                                onClick={() => {
                                    setSelectedClient(client);
                                    setSelectedContract(null);
                                }}>
                                <td className="border p-2 text-center">{client.id}</td>
                                <td className="border p-2">
                                    <div className="flex items-center justify-start gap-2">
                                        <button onClick={async (e) => {
                                            e.stopPropagation();
                                            await handleOpenModal("clients", client.id);// Chờ dữ liệu từ API
                                        }}>
                                            <BiDetail className="text-sky-700 text-lg"/>
                                        </button>
                                        <span>{`${client.lastName} ${client.firstName}`}</span>
                                    </div>
                                </td>
                                <td className={`border p-2 ${selectedClient ? "hidden" : ""}`}>{client.email}</td>
                                <td className={`border p-2 ${selectedClient ? "hidden" : ""}`}>{client.phone}</td>
                                <td className="border p-2">{client.identityNumber}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {selectedClient && (
                    <div
                        className={`container w-1/2 relative h-full transform transition-transform duration-500 ease-in-out translate-x-0`}>
                        <button
                            onClick={() => setSelectedClient(null)}
                            className="absolute top-4 right-4 rounded-full hover:bg-gray-200"
                        >
                            <X className="cursor-pointer w-6 h-6"/>
                        </button>
                        <div>
                            <h2 className="text-xl font-bold">Danh sách hợp đồng - {selectedClient.firstName}</h2>
                        </div>
                        <table className="w-full border-collapse border my-3 border-gray-300">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Mã hợp đồng</th>
                                <th className="border p-2">Loại hợp đồng/thẻ</th>
                                <th className="border p-2">Trạng thái</th>
                            </tr>
                            </thead>
                            <tbody>
                            {contractsData?.length > 0 ? contractsData.map((contract) => (
                                <React.Fragment key={contract.id}>
                                    {/* Hiển thị hợp đồng cha (LIABILITY) */}
                                    {contract.contractType === 'LIABILITY' && (
                                        <tr
                                            className="cursor-pointer hover:bg-gray-100"
                                            onClick={() => toggleContract(contract.id)}
                                        >
                                            <td className="border p-2">
                                                <div className="flex items-center justify-start gap-2">
                                                    <button onClick={async (e) => {
                                                        e.stopPropagation();
                                                        await handleOpenModal("contracts", contract.id);
                                                    }}>
                                                        <BiDetail className="text-sky-700 text-lg"/>
                                                    </button>
                                                    <span className="whitespace-nowrap">{contract.contractNumber}</span>
                                                </div>
                                            </td>
                                            <td className="border p-2">{contract.contractType}</td>
                                            <td className="border p-2"></td>
                                        </tr>
                                    )}

                                    {/* Hiển thị hợp đồng con (ISSUING) */}
                                    {contract.contractType === 'LIABILITY' && expandedContracts[contract.id] && contract.children?.length > 0 && (
                                        contract.children.map((childContract) => (
                                            childContract.contractType === 'ISSUING' && (
                                                <React.Fragment key={childContract.id}>
                                                    <tr className="bg-gray-100 hover:bg-gray-300 cursor-pointer"
                                                        onClick={() => fetchIssuedCards(childContract.id)}>
                                                        <td className="border p-2 pl-8">
                                                            <div className="flex items-center justify-start gap-2">
                                                                <button onClick={async (e) => {
                                                                    e.stopPropagation();
                                                                    await handleOpenModal("contracts", childContract.id);
                                                                }}>
                                                                    <BiDetail className="text-sky-700 text-lg"/>
                                                                </button>
                                                                <span>{childContract.contractNumber}</span>
                                                            </div>
                                                        </td>
                                                        <td className="border p-2">{childContract.contractType}</td>
                                                        <td className="border p-2"></td>
                                                    </tr>

                                                    {/* Hiển thị danh sách thẻ phát hành (issuedCards) */}
                                                    {expandedContracts[childContract.id] && issuedCardsData[childContract.id]?.length > 0 && (
                                                        issuedCardsData[childContract.id].map((card) => (
                                                            <tr key={card.id} className="hover:bg-gray-300 cursor-pointer">
                                                                <td className="border p-2 pl-12">
                                                                    <div
                                                                        className="flex items-center justify-start gap-2">
                                                                        <button onClick={async (e) => {
                                                                            e.stopPropagation();
                                                                            await handleOpenModal("cards", card.id);
                                                                        }}>
                                                                            <BiDetail className="text-sky-700 text-lg"/>
                                                                        </button>
                                                                        <span>{card.cardNumber}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="border p-2">{card.cardType}</td>
                                                                <td className="border p-2">ISSUED CARD</td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </React.Fragment>
                                            )
                                        ))
                                    )}
                                </React.Fragment>
                            )) : (
                                <tr>
                                    <td colSpan="3" className="border p-2 text-center">Không có hợp đồng</td>
                                </tr>
                            )}
                            </tbody>

                        </table>
                    </div>
                )}

                {modal && (
                    <ReadModal onClose={() => {
                        setModal(false);
                    }} subject={modalSubject.toString()} data={modalData}/>
                )}
                {createModal && (
                <CreateModal onClose={() => {
                    setCreateModal(false);
                }} subject={modalSubject.toString()}/>
                )}
            </div>
        </div>
    );
}
