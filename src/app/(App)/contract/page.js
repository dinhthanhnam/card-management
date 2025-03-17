"use client";
import React, { useState } from "react";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import FormInput from "@/components/common/FormInput";
import { FormSelect } from "@/components/common/FormSelect";
import CommonButton from "@/components/common/CommonBottom";
import SearchBar from "@/components/common/SearchBar";
import CreateModal from "@/components/modal/CreateModal";
import { fetchContractByNumber, fetchContractsByClient } from "@/utils/fetchcontract";
import api from "@/utils/axiosinstance";

export default function ContractPage() {
    const [searchType, setSearchType] = useState("contractNumber");
    const [searchText, setSearchText] = useState("");
    const [toggleSearch, setToggleSearch] = useState(false);
    const [contractsData, setContractsData] = useState([]);
    const [selectedContractIndex, setSelectedContractIndex] = useState(-1);
    const [createModal, setCreateModal] = useState(false);
    const [subject, setSubject] = useState("");
    const [editedContract, setEditedContract] = useState(null); // Lưu trạng thái chỉnh sửa
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(null);
    const handleSearch = async () => {
        if (!searchText) {
            setContractsData([]);
            setSelectedContractIndex(-1);
            setEditedContract(null);
            return;
        }

        try {
            if (searchType === "contractNumber") {
                const data = await fetchContractByNumber(searchText);
                const contracts = data?.contracts || [];
                setContractsData(contracts);
                setSelectedContractIndex(contracts.length > 0 ? 0 : -1);
                setEditedContract(contracts.length > 0 ? { ...contracts[0] } : null);
            } else if (searchType === "client") {
                const data = await fetchContractsByClient(searchText);
                const contracts = data?.contracts || [];
                setContractsData(contracts);
                setSelectedContractIndex(contracts.length > 0 ? 0 : -1);
                setEditedContract(contracts.length > 0 ? { ...contracts[0] } : null);
            }
        } catch (error) {
            console.error("Error fetching contracts:", error);
            setContractsData([]);
            setSelectedContractIndex(-1);
            setEditedContract(null);
        }
    };

    const handlePrevContract = () => {
        if (selectedContractIndex > 0) {
            setSelectedContractIndex(selectedContractIndex - 1);
            setEditedContract({ ...contractsData[selectedContractIndex - 1] });
        }
    };

    const handleNextContract = () => {
        if (selectedContractIndex < contractsData.length - 1) {
            setSelectedContractIndex(selectedContractIndex + 1);
            setEditedContract({ ...contractsData[selectedContractIndex + 1] });
        }
    };

    const handleInputChange = (field, value) => {
        setEditedContract((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        if (!editedContract) return;

        const payload = {
            contractSearchMethod: "CONTRACT_NUMBER",
            contractIdentifier: editedContract.contractNumber,
            reason: "Update contract details",
            editContractInObject: {
                branch: editedContract.branch,
                contractNumber: editedContract.contractNumber,
                contractName: editedContract.contractName,
                cbsNumber: editedContract.cbsNumber,
                // Các trường khác như serviceGroup, cbsID, closeDate nếu cần thì thêm
            },
            setCustomDataInObjects: [
                {
                    addInfoType: "AddInfo01",
                    tagName: "PrevID_01",
                    tagValue: "A1",
                }
            ], // Nếu cần thêm custom data thì xử lý sau
        };

        try {
            const res = await api.put("/contracts/edit", payload);

            if (!res.data.success) {
                setSuccess(false);
                setMessage(res.data.message);
            }
            // Cập nhật contractsData với dữ liệu đã chỉnh sửa
            const updatedContracts = contractsData.map((contract, index) =>
                index === selectedContractIndex ? { ...editedContract } : contract
            );
            setContractsData(updatedContracts);
            setSuccess(true);
            setMessage(res.data.message);
        } catch (error) {
            console.log(error);
        } finally {
            setSuccess(false);
            setMessage("Lỗi");
        }
    };

    const selectedContract = selectedContractIndex >= 0 ? contractsData[selectedContractIndex] : null;

    return (
        <div className="p-2">
            <div className="container relative p-4 border border-gray-300 rounded-lg shadow-md bg-white">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-600">Danh sách hợp đồng</h2>
                    <button
                        onClick={() => setToggleSearch(!toggleSearch)}
                        className={`flex items-center gap-1 px-3 py-1 border rounded-md transition ${
                            toggleSearch ? "bg-gray-200 border-gray-400" : "bg-gray-100 hover:bg-gray-200"
                        }`}
                    >
                        <Search size={16} />
                        Tìm kiếm
                    </button>
                </div>

                <div
                    className={`overflow-hidden transition-all duration-300 ${
                        toggleSearch ? "mt-4 p-4 border-t border-gray-300 bg-gray-50 rounded-b-md" : "h-0"
                    }`}
                >
                    <FormSelect
                        label="Tìm kiếm theo"
                        name="searchType"
                        options={[
                            { value: "contractNumber", label: "Mã hợp đồng" },
                            { value: "client", label: "Khách hàng" },
                        ]}
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                    />
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            {searchType === "contractNumber" ? "Mã hợp đồng" : "Số định danh khách hàng"}
                        </label>
                        <SearchBar
                            value={searchText}
                            onSearch={handleSearch}
                            onChange={(e) => setSearchText(e.target.value)}
                            showButton={true}
                        />
                    </div>
                </div>
            </div>

            <div className="container flex flex-row-reverse gap-2 mt-2">
                <CommonButton
                    className="px-2 mx-2"
                    onClick={() => {
                        setSubject("contracts");
                        setCreateModal(true);
                    }}
                >
                    Create Contract
                </CommonButton>
                <CommonButton
                    className="px-2 mx-2"
                    onClick={() => {
                        setSubject("issuingContract");
                        setCreateModal(true);
                    }}
                >
                    Create Issuing Contract with Liability
                </CommonButton>
            </div>

            {selectedContract && (
                <div className="container mt-2 border border-gray-300 rounded-lg p-4 bg-white relative">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-600">Chi tiết hợp đồng</h2>
                        <div className="flex gap-2">
                            {contractsData.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrevContract}
                                        disabled={selectedContractIndex === 0}
                                        className="p-2 bg-gray-200 rounded disabled:opacity-50"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button
                                        onClick={handleNextContract}
                                        disabled={selectedContractIndex === contractsData.length - 1}
                                        className="p-2 bg-gray-200 rounded disabled:opacity-50"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </>
                            )}
                            <button
                                onClick={() => {
                                    setSelectedContractIndex(-1);
                                    setEditedContract(null);
                                }}
                                className="p-2 rounded-full hover:bg-gray-200"
                            >
                                <X className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <FormInput label="Institution" value={editedContract?.institution || "N/A"} disabled />
                        <FormInput
                            label="Branch"
                            value={editedContract?.branch || ""}
                            onChange={(e) => handleInputChange("branch", e.target.value)}
                        />
                        <FormInput label="Client Category" value={editedContract?.clientCategory || "N/A"} disabled />
                        <FormInput label="Client Type" value={editedContract?.clientType || "N/A"} disabled />
                        <FormInput label="Product Category" value={editedContract?.productCategory || "N/A"} disabled />
                        <FormInput label="Redefined Product Category" value={editedContract?.redefinedProductCategory || "N/A"} disabled />
                        <FormInput label="Contract Category" value={editedContract?.contractCategory || "N/A"} disabled />
                        <FormInput label="Main Product Corrected" value={editedContract?.mainProductCorrected || "N/A"} disabled />
                        <FormInput label="Main Product ITD" value={editedContract?.mainProductITD || "N/A"} disabled />
                        <FormInput label="Product" value={editedContract?.product || "N/A"} disabled />
                        <FormInput label="Contract Subtype" value={editedContract?.contractSubtype || "N/A"} disabled />
                        <FormInput label="Report Type" value={editedContract?.reportType || "N/A"} disabled />
                        <FormInput label="Role" value={editedContract?.role || "N/A"} disabled />
                        <FormInput label="Icon" value={editedContract?.icon || "N/A"} disabled />
                        <FormInput label="Leaf" value={editedContract?.leaf || "N/A"} disabled />
                        <FormInput label="Currency" value={editedContract?.currency || "N/A"} disabled />
                        <FormInput label="Available" value={editedContract?.available || "N/A"} disabled />
                        <FormInput label="Balance" value={editedContract?.balance || "N/A"} disabled />
                        <FormInput label="Credit Limit" value={editedContract?.creditLimit || "N/A"} disabled />
                        <FormInput label="Add Limit" value={editedContract?.addLimit || "N/A"} disabled />
                        <FormInput label="Blocked" value={editedContract?.blocked || "N/A"} disabled />
                        <FormInput label="Total Due" value={editedContract?.totalDue || "N/A"} disabled />
                        <FormInput label="Past Due" value={editedContract?.pastDue || "N/A"} disabled />
                        <FormInput label="Shadow Auth Limit" value={editedContract?.shadowAuthLimit || "N/A"} disabled />
                        <FormInput label="Client" value={editedContract?.client || "N/A"} disabled />
                        <FormInput label="Contract Number" value={editedContract?.contractNumber || "N/A"} disabled />
                        <FormInput label="Safe Contract Number" value={editedContract?.safeContractNumber || "N/A"} disabled />
                        <FormInput
                            label="Contract Name"
                            value={editedContract?.contractName || ""}
                            onChange={(e) => handleInputChange("contractName", e.target.value)}
                        />
                        <FormInput label="Contract Level" value={editedContract?.contractLevel || "N/A"} disabled />
                        <FormInput label="Billing Contact" value={editedContract?.billingContact || "N/A"} disabled />
                        <FormInput label="Top Contract" value={editedContract?.topContract || "N/A"} disabled />
                        <FormInput
                            label="CBS Number"
                            value={editedContract?.cbsNumber || ""}
                            onChange={(e) => handleInputChange("cbsNumber", e.target.value)}
                        />
                        <FormInput label="Open Date" value={editedContract?.openDate || "N/A"} disabled />
                        <FormInput label="Check Usage" value={editedContract?.checkUsage || "N/A"} disabled />
                        <FormInput label="Last Billing Date" value={editedContract?.lastBillingDate || "N/A"} disabled />
                        <FormInput label="Next Billing Date" value={editedContract?.nextBillingDate || "N/A"} disabled />
                        <FormInput label="Past Due Days" value={editedContract?.pastDueDays || "N/A"} disabled />
                        <FormInput label="Add Parm String" value={editedContract?.addParmString || "N/A"} disabled />
                        <FormInput label="Status" value={editedContract?.status || "N/A"} disabled />
                        <FormInput label="Status Code" value={editedContract?.statusCode || "N/A"} disabled />
                        <FormInput label="External Code" value={editedContract?.externalCode || "N/A"} disabled />
                        <FormInput label="Last Application Date" value={editedContract?.lastApplicationDate || "N/A"} disabled />
                        <FormInput label="Last Application Officer" value={editedContract?.lastApplicationOfficer || "N/A"} disabled />
                        <FormInput label="Last Application Status" value={editedContract?.lastApplicationStatus || "N/A"} disabled />
                        <FormInput label="Last Activity Date" value={editedContract?.lastActivityDate || "N/A"} disabled />
                        <FormInput label="Ready" value={editedContract?.ready || "N/A"} disabled />
                        <FormInput label="Amendment Date" value={editedContract?.amendmentDate || "N/A"} disabled />
                        <FormInput label="Amendment Officer" value={editedContract?.amendmentOfficer || "N/A"} disabled />
                        <FormInput label="ID" value={editedContract?.id || "N/A"} disabled />
                        <FormInput label="Client Full Name" value={editedContract?.clientFullName || "N/A"} disabled />
                        <FormInput label="Product Code" value={editedContract?.productCode || "N/A"} disabled />
                        <FormInput label="Main Product Code" value={editedContract?.mainProductCode || "N/A"} disabled />
                    </div>
                    {message && (
                        <div className={`p-2 border rounded-md  ${success ? `text-green-700 bg-green-300 border-green-500 ` : `text-red-700 bg-red-300 border-red-500 `} `}>
                            {message}
                        </div>
                    )}

                    <div className="flex justify-start mt-4">
                        <CommonButton
                            className="w-20 bg-blue-500 hover:bg-blue-600 text-white"
                            onClick={handleSave}
                        >
                            Lưu
                        </CommonButton>
                    </div>
                </div>
            )}

            {createModal && (
                <CreateModal
                    onClose={() => {
                        setCreateModal(false);
                        setSubject("");
                    }}
                    subject={subject}
                />
            )}
        </div>
    );
}