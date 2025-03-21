"use client";
import React, { useReducer, useEffect } from "react";
import { fetchClient } from "@/utils/fetchclient";
import CommonButton from "@/components/common/CommonButton";
import CreateClientModal from "@/components/modal/CreateClientModal";
import ClientList from "@/components/CLientList";
import { Client } from "@/types/client";
import EditClientModal from "@/components/modal/EditClientModal";

interface State {
    clientsData: Client[];
    currentPage: number;
    totalPages: number;
    editClientModal: boolean;
    createClientModal: boolean;
    selectedClient: Client | null;
    clientsPerPage: number;
}

type Action =
    | { type: "FETCH_CLIENTS_SUCCESS"; payload: { clients: Client[]; totalPages: number } }
    | { type: "SET_CURRENT_PAGE"; payload: number }
    | { type: "OPEN_EDIT_MODAL"; payload: Client }
    | { type: "CLOSE_EDIT_MODAL" }
    | { type: "OPEN_CREATE_CLIENT_MODAL" }
    | { type: "CLOSE_CREATE_CLIENT_MODAL" }
    | { type: "ADD_NEW_CLIENT"; payload: Client };

const initialState: State = {
    clientsData: [],
    currentPage: 0,
    totalPages: 0,
    editClientModal: false,
    createClientModal: false,
    selectedClient: null,
    clientsPerPage: 8,
};

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
        case "ADD_NEW_CLIENT":
            return { ...state, clientsData: [action.payload, ...state.clientsData] };
        default:
            return state;
    }
};

export default function ClientPage() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { clientsData, currentPage, totalPages, editClientModal, createClientModal, selectedClient, clientsPerPage } =
        state;

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

    const handlePageChangeClients = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            dispatch({ type: "SET_CURRENT_PAGE", payload: newPage });
        }
    };

    const handleOpenEditModal = (client: Client) => {
        dispatch({ type: "OPEN_EDIT_MODAL", payload: client });
    };

    const handleOpenCreateModal = () => {
        dispatch({ type: "OPEN_CREATE_CLIENT_MODAL" });
    };

    const handleClientCreated = (newClient: Client) => {
        dispatch({ type: "ADD_NEW_CLIENT", payload: newClient });
        dispatch({ type: "CLOSE_CREATE_CLIENT_MODAL" });
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

                <ClientList
                    clients={clientsData}
                    onEditClient={handleOpenEditModal}
                    onCreateLiabilityContract={() => {}} // Placeholder, không dùng ở đây
                    onCreateIssuingContract={() => {}} // Placeholder, không dùng ở đây
                    onCreateCardContract={() => {}} // Placeholder, không dùng ở đây
                />

                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={() => handlePageChangeClients(currentPage - 1)}
                        disabled={currentPage === 0}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Quay lại
                    </button>
                    <span className="flex items-center">Trang {currentPage + 1} / {totalPages}</span>
                    <button
                        onClick={() => handlePageChangeClients(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Trang tiếp
                    </button>
                </div>
            </div>

            {editClientModal && (
                <EditClientModal
                    onClose={() => dispatch({type: "CLOSE_EDIT_MODAL"})}
                    client={selectedClient}
                    onEditClient={function (client: Client): void {
                    throw new Error("Function not implemented.");
                }}
                />
            )}
            {createClientModal && (
                <CreateClientModal
                    onClose={() => dispatch({ type: "CLOSE_CREATE_CLIENT_MODAL" })}
                    onClientCreated={handleClientCreated}
                />
            )}
        </div>
    );
}