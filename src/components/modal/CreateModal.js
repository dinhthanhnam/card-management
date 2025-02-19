import { X } from "lucide-react";
import {useEffect, useRef, useState} from "react";
import FormInput from "@/components/common/FormInput";
import CommonBottom from "@/components/common/CommonBottom";

export default function CreateModal({ onClose, subject}) {
    const modalRef = useRef();
    const [createParams, setCreateParams] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        identityNumber: "",
        dateOfBirth: "", // Nếu dùng Date, có thể để null hoặc new Date()
        address: {
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: ""
        },
        reasonCode: "",
        reason: "",
        clientTypeCode: "",
        institutionCode: "",
        branch: "",
        clientCategory: "",
        productCategory: "",
        companyName: "",
        shortName: "",
        clientNumber: ""
    });


    useEffect(() => {
        // Close the modal when clicking outside of it
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        // Add event listener for click outside
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup event listener on unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div
                ref={modalRef}
                className="bg-white p-6 rounded-2xl w-full md:w-2/3 md:h-auto relative"
            >
                {/* Close button (X) at the top right corner */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
                >
                    <X className="w-6 h-6 text-gray-500" />
                </button>

                <div className={`p-layout`}>
                    {subject === "clients" && (
                        <div>
                            <div>
                                <h2 className="text-xl font-bold mb-4">Thêm khách hàng</h2>
                            </div>
                            <div className={`grid gap-4 grid-cols-4`}>
                                <FormInput label="Họ" value={createParams.firstName} onChange={(e) => setCreateParams({...createParams, firstName: e.target.value})} />
                                <FormInput label="Tên" value={createParams.lastName} onChange={(e) => setCreateParams({...createParams, lastName: e.target.value})} />
                                <FormInput label="Email" value={createParams.email} onChange={(e) => setCreateParams({...createParams, email: e.target.value})} />
                                <FormInput label="Số điện thoại" value={createParams.phone} onChange={(e) => setCreateParams({...createParams, phone: e.target.value})} />
                                <FormInput label="Số định danh" value={createParams.identityNumber} onChange={(e) => setCreateParams({...createParams, identityNumber: e.target.value})} />
                                <FormInput label="Năm sinh" value={createParams.dateOfBirth} onChange={(e) => setCreateParams({...createParams, dateOfBirth: e.target.value})} />
                                <FormInput label="Thành phố" value={createParams.address.city} onChange={(e) => setCreateParams({...createParams, address: {...createParams.address, city: e.target.value}})} />
                                <FormInput label="Đường" value={createParams.address.street} onChange={(e) => setCreateParams({...createParams, address: {...createParams.address, street: e.target.value}})} />
                                <FormInput label="Quốc gia" value={createParams.address.country} onChange={(e) => setCreateParams({...createParams, address: {...createParams.address, country: e.target.value}})} />
                                <FormInput label="Mã lý do" value={createParams.reasonCode} onChange={(e) => setCreateParams({...createParams, reasonCode: e.target.value})} />
                                <FormInput label="Lý do" value={createParams.reason} onChange={(e) => setCreateParams({...createParams, reason: e.target.value})} />
                                <FormInput label="Mã loại khách hàng" value={createParams.clientTypeCode} onChange={(e) => setCreateParams({...createParams, clientTypeCode: e.target.value})} />
                                <FormInput label="Mã tổ chức" value={createParams.institutionCode} onChange={(e) => setCreateParams({...createParams, institutionCode: e.target.value})} />
                                <FormInput label="Chi nhánh" value={createParams.branch} onChange={(e) => setCreateParams({...createParams, branch: e.target.value})} />
                                <FormInput label="Loại khách hàng" value={createParams.clientCategory} onChange={(e) => setCreateParams({...createParams, clientCategory: e.target.value})} />
                                <FormInput label="Danh mục sản phẩm" value={createParams.productCategory} onChange={(e) => setCreateParams({...createParams, productCategory: e.target.value})} />
                                <FormInput label="Tên công ty" value={createParams.companyName} onChange={(e) => setCreateParams({...createParams, companyName: e.target.value})} />
                                <FormInput label="Tên viết tắt" value={createParams.shortName} onChange={(e) => setCreateParams({...createParams, shortName: e.target.value})} />
                                <FormInput label="Mã khách hàng" value={createParams.clientNumber} onChange={(e) => setCreateParams({...createParams, clientNumber: e.target.value})} />
                            </div>
                        </div>
                    )}

                    <div className={`flex flex-row-reverse justify-between`}>
                        <CommonBottom className={`w-40`}>Thêm</CommonBottom>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
}
