"use client";
import React, { useReducer, useEffect } from "react";
import { fetchClient } from "@/utils/fetchclient";
import CommonButton from "@/components/common/CommonButton";
import EditModal from "@/components/modal/EditModal";
import CreateClientModal from "@/components/modal/CreateClientModal";
import ClientList from "@/components/CLientList";
import {Client, Contract} from "@/types/client"
import CreateLiabContractModal from "@/components/modal/CreateLiabContractModal";
import CreateIssuingContractModal from "@/components/modal/CreateIssuingContractModal";

// Define state interface
interface State {
    clientsData: Client[];
    currentPage: number;
    totalPages: number;
    editClientModal: boolean;
    createClientModal: boolean;
    createLiabContractModal: boolean;
    createIssuingContractModal: boolean;
    createCardContractModal: boolean;
    selectedClient: Client | null;
    clientsPerPage: number;
}

// Define action types
type Action =
    | { type: "FETCH_CLIENTS_SUCCESS"; payload: { clients: Client[]; totalPages: number } }
    | { type: "SET_CURRENT_PAGE"; payload: number }
    | { type: "OPEN_EDIT_MODAL"; payload: Client }
    | { type: "CLOSE_EDIT_MODAL" }
    | { type: "OPEN_CREATE_CLIENT_MODAL" }
    | { type: "CLOSE_CREATE_CLIENT_MODAL" }
    | { type: "OPEN_CREATE_LIAB_CONTRACT_MODAL", payload: Client}
    | { type: "CLOSE_CREATE_LIAB_CONTRACT_MODAL" }
    | { type: "OPEN_CREATE_ISSUING_CONTRACT_MODAL", payload: Client}
    | { type: "CLOSE_CREATE_ISSUING_CONTRACT_MODAL" }
    | { type: "OPEN_CREATE_CARD_CONTRACT_MODAL" }
    | { type: "CLOSE_CREATE_CARD_CONTRACT_MODAL" }
    ;

// Initial state
const initialState: State = {
    clientsData: [],
    currentPage: 0,
    totalPages: 0,
    editClientModal: false,
    createClientModal: false,
    createLiabContractModal: false,
    createIssuingContractModal: false,
    createCardContractModal: false,
    selectedClient: null,
    clientsPerPage: 10,
};

// Reducer function
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "FETCH_CLIENTS_SUCCESS":
            return {
                ...state,
                clientsData: action.payload.clients,
                totalPages: action.payload.totalPages,
            };
        case "SET_CURRENT_PAGE":
            return { ...state, currentPage: action.payload };
        case "OPEN_EDIT_MODAL":
            return { ...state, editClientModal: true, selectedClient: action.payload };
        case "CLOSE_EDIT_MODAL":
            return { ...state, editClientModal: false, selectedClient: null };
        case "OPEN_CREATE_CLIENT_MODAL":
            return { ...state, createClientModal: true };
        case "CLOSE_CREATE_CLIENT_MODAL":
            return { ...state, createClientModal: false };
        case "OPEN_CREATE_LIAB_CONTRACT_MODAL":
            return { ...state, createLiabContractModal: true, selectedClient: action.payload };
        case "CLOSE_CREATE_LIAB_CONTRACT_MODAL":
            return { ...state, createLiabContractModal: false, selectedClient: null };
        case "OPEN_CREATE_ISSUING_CONTRACT_MODAL":
            return { ...state, createIssuingContractModal: true, selectedClient: action.payload };
        case "CLOSE_CREATE_ISSUING_CONTRACT_MODAL":
            return { ...state, createIssuingContractModal: false, selectedClient: null };
        default:
            return state;
    }
};

export default function ClientPage() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { clientsData, currentPage, totalPages, editClientModal, createClientModal, createLiabContractModal, createIssuingContractModal, createCardContractModal, selectedClient, clientsPerPage } = state;

    // Fetch clients data with pagination
    useEffect(() => {
        const fetchClientsData = async () => {
            try {
                const data = await fetchClient(currentPage, clientsPerPage);
                dispatch({
                    type: "FETCH_CLIENTS_SUCCESS",
                    payload: {
                        clients: data.clients || [],
                        totalPages: data.totalPages || 0,
                    },
                });
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        };
        fetchClientsData();
    }, [currentPage, clientsPerPage]);

    // Handle page change
    const handlePageChangeClients = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            dispatch({ type: "SET_CURRENT_PAGE", payload: newPage });
        }
    };

    // Handle opening edit modal
    const handleOpenEditModal = (client: Client) => {
        dispatch({ type: "OPEN_EDIT_MODAL", payload: client });
    };

    // Handle opening create modal
    const handleOpenCreateModal = () => {
        dispatch({ type: "OPEN_CREATE_CLIENT_MODAL" });
    };

    // Handle creating liability contract (placeholder)
    const handleCreateLiabilityContract = (client: Client) => {
        dispatch({ type: "OPEN_CREATE_LIAB_CONTRACT_MODAL", payload: client});
    };

    // Handle creating issuing contract (placeholder)
    const handleCreateIssuingContract = (client: Client) => {
        dispatch({ type: "OPEN_CREATE_ISSUING_CONTRACT_MODAL", payload: client});
    };

    // Handle creating card contract (placeholder)
    const handleCreateCardContract = (issuingContractId: string) => {
        console.log(`Tạo hợp đồng thẻ cho hợp đồng phát hành ${issuingContractId}`);
        // Logic tạo hợp đồng thẻ ở đây
    };

    return (
        <div className="p-2">
            <div className="container w-full">
                <div className="flex flex-row justify-between pb-4">
                    <h2 className="text-xl font-bold mb-3">Danh sách khách hàng</h2>
                    <CommonButton className="!w-40" onClick={handleOpenCreateModal}>
                        Thêm khách hàng
                    </CommonButton>
                </div>

                {/* Client List */}
                <ClientList
                    clients={clientsData}
                    onEditClient={handleOpenEditModal}
                    onCreateLiabilityContract={handleCreateLiabilityContract}
                    onCreateIssuingContract={handleCreateIssuingContract}
                    onCreateCardContract={handleCreateCardContract}
                />

                {/* Pagination */}
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={() => handlePageChangeClients(currentPage - 1)}
                        disabled={currentPage === 0}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Quay lại
                    </button>
                    <span className="flex items-center">
                        Trang {currentPage + 1} / {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChangeClients(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Trang tiếp
                    </button>
                </div>
            </div>

            {/* EditModal */}
            {editClientModal && (
                <EditModal
                    onClose={() => dispatch({ type: "CLOSE_EDIT_MODAL" })}
                    subject="clients"
                    client={selectedClient}
                />
            )}

            {/* CreateModal */}
            {createClientModal && (
                <CreateClientModal onClose={() => dispatch({ type: "CLOSE_CREATE_CLIENT_MODAL" })} />
            )}
            {createLiabContractModal && (
                <CreateLiabContractModal
                    onClose={() => dispatch({ type: "CLOSE_CREATE_LIAB_CONTRACT_MODAL" })}
                    client={selectedClient}
                />
            )}
            {createIssuingContractModal && (
                <CreateIssuingContractModal
                    onClose={() => dispatch({ type: "CLOSE_CREATE_ISSUING_CONTRACT_MODAL" })}
                    client={selectedClient}
                />
            )}
        </div>
    );
}