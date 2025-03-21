import React, { useState } from "react";
import CommonButton from "@/components/common/CommonButton";
import { Client, Contract } from "@/types/client";
import { fetchBasicClientContracts } from "@/utils/fetchbasicclientcontracts";
import CreateLiabContractModal from "@/components/modal/CreateLiabContractModal";
import CreateIssuingContractModal from "@/components/modal/CreateIssuingContractModal";
import CreateCardContractModal from "@/components/modal/CreateCardContractModal";

interface ClientListProps {
    clients: Client[];
    onEditClient: (client: Client) => void;
    onCreateLiabilityContract: (client: Client) => void;
    onCreateIssuingContract: (client: Client, contract: Contract) => void;
    onCreateCardContract: (issuingContractId: string) => void;
}

export default function ClientList({
                                       clients,
                                       onEditClient,
                                       onCreateLiabilityContract,
                                       onCreateIssuingContract,
                                       onCreateCardContract,
                                   }: ClientListProps) {
    const [expandedClient, setExpandedClient] = useState<Client | null>(null);
    const [clientContracts, setClientContracts] = useState<Map<string, Contract[]>>(new Map());
    const [showLiabModal, setShowLiabModal] = useState<Client | null>(null);
    const [showIssuingModal, setShowIssuingModal] = useState<{ client: Client; parentContract: Contract } | null>(null);
    const [showCardModal, setShowCardModal] = useState<Contract | null>(null); // issuingContractId

    const toggleClient = async (client: Client) => {
        if (expandedClient === client) {
            setExpandedClient(null);
        } else {
            setExpandedClient(client);
            try {
                const contracts = await fetchBasicClientContracts(client);
                setClientContracts((prev) => new Map(prev).set(client.id, contracts));
            } catch (error) {
                console.error("Error fetching contracts:", error);
            }
        }
    };

    const handleButtonClick = (e: React.MouseEvent, action: () => void) => {
        e.stopPropagation();
        action();
    };

    const renderContracts = (contracts: Contract[], level: number = 0, client: Client) => {
        return contracts.map((contract) => (
            <div key={contract.contractNumber} className={`pl-${level * 8} bg-gray-${50 + level * 50}`}>
                <div className="grid grid-cols-4 gap-4 p-2 pl-8 border-t border-gray-200">
                    <div>{contract.contractNumber}</div>
                    <div>{contract.contractType}</div>
                    <div />
                    <div className="flex justify-center">
                        {contract.contractType === "Liability" && (
                            <div className="w-1/2">
                                <CommonButton
                                    className="!text-sm"
                                    onClick={(e) =>
                                        handleButtonClick(e, () =>
                                            setShowIssuingModal({ client, parentContract: contract })
                                        )
                                    }
                                >
                                    Tạo HĐPH
                                </CommonButton>
                            </div>
                        )}
                        {contract.contractType === "Issuing" && (
                            <div className="w-1/2">
                                <CommonButton
                                    className="!text-sm"
                                    onClick={(e) =>
                                        handleButtonClick(e, () => setShowCardModal(contract))
                                    }
                                >
                                    Tạo HĐ thẻ
                                </CommonButton>
                            </div>
                        )}
                    </div>
                </div>
                {contract.subContracts?.length > 0 && renderContracts(contract.subContracts, level +1, client)}
            </div>
        ));
    };

    return (
        <div className="w-full border border-gray-300 rounded-lg mt-4">
            <div className="grid grid-cols-5 gap-4 bg-gray-100 p-2 font-semibold">
                <div className="text-center">Mã khách hàng</div>
                <div className="text-center">Tên ngắn</div>
                <div className="text-center">Số khách hàng</div>
                <div className="text-center">Số đăng ký</div>
                <div className="text-center">Hành động</div>
            </div>

            {clients.length > 0 ? (
                clients.map((client) => (
                    <div key={client.id} className="border-t border-gray-300">
                        <div
                            className="grid grid-cols-5 gap-4 p-2 hover:bg-gray-100 cursor-pointer items-center"
                            onClick={() => toggleClient(client)}
                        >
                            <div className="text-center">{client.id}</div>
                            <div className="text-center">{client.shortName || "Không tìm thấy tên!"}</div>
                            <div className="text-center">{client.clientNumber || "Không tìm thấy số khách hàng!"}</div>
                            <div className="text-center">{client.regNumber || "Không tìm thấy số đăng ký!"}</div>
                            <div className="grid grid-cols-2 justify-center gap-2 flex-wrap">
                                <CommonButton
                                    className="text-sm"
                                    onClick={(e) => handleButtonClick(e, () => onEditClient(client))}
                                >
                                    Sửa
                                </CommonButton>
                                <CommonButton
                                    className="text-sm"
                                    onClick={(e) => handleButtonClick(e, () => setShowLiabModal(client))}
                                >
                                    Thêm HĐDB
                                </CommonButton>
                            </div>
                        </div>

                        {expandedClient === client && (
                            <div className="pl-8 bg-gray-50">
                                {clientContracts.has(client.id) && clientContracts.get(client.id)!.length > 0 ? (
                                    renderContracts(clientContracts.get(client.id)!, 0, client)
                                ) : client.contracts?.length > 0 ? (
                                    renderContracts(client.contracts, 0, client)
                                ) : (
                                    <div className="p-2 text-center text-gray-500">Chưa có hợp đồng đảm bảo</div>
                                )}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className="p-2 text-center text-gray-500">Không có dữ liệu</div>
            )}

            {showLiabModal && (
                <CreateLiabContractModal
                    onClose={() => setShowLiabModal(null)}
                    client={showLiabModal}
                />
            )}
            {showIssuingModal && (
                <CreateIssuingContractModal
                    onClose={() => setShowIssuingModal(null)}
                    client={showIssuingModal.client}
                    parentContract={showIssuingModal.parentContract}
                />
            )}
            {showCardModal && (
                <CreateCardContractModal
                    onClose={() => setShowCardModal(null)}
                    parentContract={showCardModal}
                />
            )}
        </div>
    );
}