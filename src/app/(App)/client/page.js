"use client";
import React, { useState, useEffect } from "react";
import { fetchClient } from "@/utils/fetchclient"; // Giả định đây là hàm gọi API
import CommonButton from "@/components/common/CommonBottom"; // Sửa tên import nếu cần (CommonBottom -> CommonButton)
import EditModal from "@/components/modal/EditModal"; // Import EditModal (sẽ làm sau)

export default function ClientPage() {
    const [clientsData, setClientsData] = useState([]);
    const [currentPageClients, setCurrentPageClients] = useState(0);
    const [totalPagesClients, setTotalPagesClients] = useState(0);
    const [editModal, setEditModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const clientsPerPage = 10;

    // Fetch dữ liệu client từ backend với phân trang
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const data = await fetchClient(currentPageClients, clientsPerPage);
                setClientsData(data.clients || []); // Dữ liệu từ API trả về dạng { clients, page, size, totalElements, totalPages }
                setTotalPagesClients(data.totalPages || 0);
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        };
        fetchClients();
    }, [currentPageClients]);

    // Xử lý chuyển trang
    const handlePageChangeClients = (newPage) => {
        if (newPage >= 0 && newPage < totalPagesClients) {
            setCurrentPageClients(newPage);
        }
    };

    // Mở EditModal khi nhấn nút "Sửa"
    const handleOpenEditModal = (client) => {
        setSelectedClient(client);
        setEditModal(true);
    };

    return (
        <div className="p-2">
            <div className="container w-full">
                <div className="flex flex-row justify-between pb-4">
                    <h2 className="text-xl font-bold mb-3">Danh sách khách hàng</h2>
                    <CommonButton
                        className="!w-40"
                        onClick={() => {
                            // Logic tạo client mới có thể thêm sau nếu cần
                            console.log("Tạo khách hàng mới");
                        }}
                    >
                        Thêm khách hàng
                    </CommonButton>
                </div>

                {/* Bảng hiển thị dữ liệu */}
                <table className="w-full container border-collapse border border-gray-300 mt-4">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Short Name</th>
                        <th className="border p-2">Client Number</th>
                        <th className="border p-2">Reg Number</th>
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
                                        className="!w-20 bg-blue-500 hover:bg-blue-600 text-white"
                                        onClick={() => handleOpenEditModal(client)}
                                    >
                                        Sửa
                                    </CommonButton>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="border p-2 text-center">
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>

                {/* Nút phân trang */}
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={() => handlePageChangeClients(currentPageClients - 1)}
                        disabled={currentPageClients === 0}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="flex items-center">
                        Trang {currentPageClients + 1} / {totalPagesClients}
                    </span>
                    <button
                        onClick={() => handlePageChangeClients(currentPageClients + 1)}
                        disabled={currentPageClients === totalPagesClients - 1}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* EditModal */}
            {editModal && (
                <EditModal
                    onClose={() => setEditModal(false)}
                    client={selectedClient}
                />
            )}
        </div>
    );
}