"use client";
import React, { useReducer, useEffect } from "react";
import { fetchClient } from "@/utils/fetchclient";
import CommonButton from "@/components/common/CommonButton";
import EditModal from "@/components/modal/EditModal";
import CreateClientModal from "@/components/modal/CreateClientModal";


// Define state interface
interface State {
    clientsData: Client[];
    currentPage: number;
    totalPages: number;
    editModal: boolean;
    createModal: boolean;
    selectedClient: Client | null;
    clientsPerPage: number;
}

// Define action types
type Action =
| { type: 'FETCH_CLIENTS_SUCCESS'; payload: { clients: Client[]; totalPages: number } }
| { type: 'SET_CURRENT_PAGE'; payload: number }
| { type: 'OPEN_EDIT_MODAL'; payload: Client }
| { type: 'CLOSE_EDIT_MODAL' }
| { type: 'OPEN_CREATE_CLIENT_MODAL' }
| { type: 'CLOSE_CREATE_CLIENT_MODAL' };

// Initial state
const initialState: State = {
    clientsData: [],
    currentPage: 0,
    totalPages: 0,
    editModal: false,
    createModal: false,
    selectedClient: null,
    clientsPerPage: 10,
};

// Reducer function
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'FETCH_CLIENTS_SUCCESS':
            return {
                ...state, clientsData: action.payload.clients, totalPages: action.payload.totalPages,
            };
        case 'SET_CURRENT_PAGE':
            return {
                ...state, currentPage: action.payload,
            };
        case 'OPEN_EDIT_MODAL':
            return {
                ...state, editModal: true, selectedClient: action.payload,
            };
        case 'CLOSE_EDIT_MODAL':
            return {
                ...state, editModal: false, selectedClient: null,
            };
        case 'OPEN_CREATE_CLIENT_MODAL':
            return {
                ...state, createModal: true,
            };
        case 'CLOSE_CREATE_CLIENT_MODAL':
            return {
                ...state, createModal: false,
            };
        default:
            return state;
    }
};

export default function ClientPage() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        clientsData,
        currentPage,
        totalPages,
        editModal,
        createModal,
        selectedClient,
        clientsPerPage,
    } = state;

    // Fetch clients data with pagination
    useEffect(() => {
        const fetchClientsData = async () => {
            try {
                const data = await fetchClient(currentPage, clientsPerPage);
                dispatch({
                    type: 'FETCH_CLIENTS_SUCCESS',
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
            dispatch({ type: 'SET_CURRENT_PAGE', payload: newPage });
        }
    };

    // Handle opening edit modal
    const handleOpenEditModal = (client: Client) => {
        dispatch({ type: 'OPEN_EDIT_MODAL', payload: client });
    };

    // Handle opening create modal
    const handleOpenCreateModal = () => {
        dispatch({ type: 'OPEN_CREATE_CLIENT_MODAL' });
    };

    return (
        <div className="p-2">
            <div className="container w-full">
                <div className="flex flex-row justify-between pb-4">
                    <h2 className="text-xl font-bold mb-3">Danh sách khách hàng</h2>
                    <CommonButton
                        className="!w-40"
                        onClick={handleOpenCreateModal}
                    >
                        Thêm khách hàng
                    </CommonButton>
                </div>

                {/* Data table */}
                <table className="w-full container border-collapse border border-gray-300 mt-4">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Mã khách hàng</th>
                        <th className="border p-2">Tên ngắn</th>
                        <th className="border p-2">Số khách hàng</th>
                        <th className="border p-2">Số đăng ký</th>
                        <th className="border p-2">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clientsData.length > 0 ? (
                        clientsData.map((client) => (
                            <tr key={client.id} className="hover:bg-gray-100">
                                <td className="border p-2 text-center">{client.id}</td>
                                <td className="border p-2">{client.shortName || "No name"}</td>
                                <td className="border p-2">{client.clientNumber || "No client number"}</td>
                                <td className="border p-2">{client.regNumber || "No reg number"}</td>
                                <td className="border p-2 text-center">
                                    <CommonButton
                                        onClick={() => handleOpenEditModal(client)}
                                    >
                                        Sửa
                                    </CommonButton>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="border p-2 text-center">
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>

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
            {editModal && (
                <EditModal
                    onClose={() => dispatch({ type: 'CLOSE_EDIT_MODAL' })}
                    subject="clients"
                    client={selectedClient}
                />
            )}

            {/* CreateModal */}
            {createModal && (
                <CreateClientModal
                    onClose={() => dispatch({ type: 'CLOSE_CREATE_CLIENT_MODAL' })}
                />
            )}
        </div>
    );
}