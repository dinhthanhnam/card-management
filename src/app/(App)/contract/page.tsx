"use client";
import React, { useReducer, useCallback, ChangeEvent } from "react";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { FormSelect } from "@/components/common/FormSelect";
import { CommonButton } from "@/components/common/CommonButton";
import SearchBar from "@/components/common/SearchBar";
import CreateModal from "@/components/modal/CreateModal";
import { ContractFields } from "@/components/ContractFields";
import {useSaveContract} from "@/hook/useSaveContract";
import {useFetchContracts} from "@/hook/useFetchContracts";
import { Contract } from "@/types/Contract";

interface State {
        searchType: "contractNumber" | "client";
        searchText: string;
        toggleSearch: boolean;
        selectedContractIndex: number;
        editedContract: Contract | null;
        createModal: boolean;
        subject: string;
}

type Action =
    | { type: "SET_SEARCH_TYPE"; payload: "contractNumber" | "client" }
    | { type: "SET_SEARCH_TEXT"; payload: string }
    | { type: "TOGGLE_SEARCH"; payload: boolean }
    | { type: "SET_SELECTED_INDEX"; payload: number }
    | { type: "SET_EDITED_CONTRACT"; payload: Contract | null }
    | { type: "SET_CREATE_MODAL"; payload: boolean }
    | { type: "SET_SUBJECT"; payload: string };

const initialState: State = {
        searchType: "contractNumber",
        searchText: "",
        toggleSearch: false,
        selectedContractIndex: -1,
        editedContract: null,
        createModal: false,
        subject: "",
};

const reducer = (state: State, action: Action): State => {
        switch (action.type) {
                case "SET_SEARCH_TYPE":
                        return { ...state, searchType: action.payload };
                case "SET_SEARCH_TEXT":
                        return { ...state, searchText: action.payload };
                case "TOGGLE_SEARCH":
                        return { ...state, toggleSearch: action.payload };
                case "SET_SELECTED_INDEX":
                        return { ...state, selectedContractIndex: action.payload };
                case "SET_EDITED_CONTRACT":
                        return { ...state, editedContract: action.payload };
                case "SET_CREATE_MODAL":
                        return { ...state, createModal: action.payload };
                case "SET_SUBJECT":
                        return { ...state, subject: action.payload };
                default:
                        return state;
        }
};

export default function ContractPage() {
        const [state, dispatch] = useReducer(reducer, initialState);
        const { searchType, searchText, toggleSearch, selectedContractIndex, editedContract, createModal, subject } = state;

        const { contracts, isLoading, message: fetchMessage, success: fetchSuccess, fetchContracts } = useFetchContracts();
        const { isSaving, message: saveMessage, success: saveSuccess, saveContract } = useSaveContract();

        const handleSearchResult = useCallback(() => {
                if (contracts.length > 0) {
                        dispatch({ type: "SET_SELECTED_INDEX", payload: 0 });
                        dispatch({ type: "SET_EDITED_CONTRACT", payload: { ...contracts[0] } });
                } else {
                        dispatch({ type: "SET_SELECTED_INDEX", payload: -1 });
                        dispatch({ type: "SET_EDITED_CONTRACT", payload: null });
                }
        }, [contracts]);

        const handleSearch = useCallback(() => {
                fetchContracts(searchText, searchType);
                handleSearchResult();
        }, [searchText, searchType, fetchContracts, handleSearchResult]);

        const handleInputChange = (field: keyof Contract, value: string) => {
                dispatch({
                        type: "SET_EDITED_CONTRACT",
                        payload: editedContract ? { ...editedContract, [field]: value } : null,
                });
        };

        const handleSave = () => {
                if (!editedContract) return;
                saveContract(selectedContract, editedContract);
        };

        const selectedContract = selectedContractIndex >= 0 ? contracts[selectedContractIndex] : null;

        return (
            <div className="p-2">
                    <div className="container relative p-4 border border-gray-300 rounded-lg shadow-md bg-white">
                            <div className="flex flex-row justify-between items-center">
                                    <h2 className="text-xl font-bold text-gray-600">Danh sách hợp đồng</h2>
                                    <button
                                        onClick={() => dispatch({ type: "TOGGLE_SEARCH", payload: !toggleSearch })}
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
                                        onChange={(e) =>
                                            dispatch({ type: "SET_SEARCH_TYPE", payload: e.target.value as "contractNumber" | "client" })
                                        }
                                    />
                                    <div>
                                            <label className="block text-gray-700 font-medium mb-1">
                                                    {searchType === "contractNumber" ? "Mã hợp đồng" : "Số định danh khách hàng"}
                                            </label>
                                            <SearchBar
                                                value={searchText}
                                                onSearch={handleSearch}
                                                onChange={(e) => dispatch({ type: "SET_SEARCH_TEXT", payload: e.target.value })}
                                            />
                                    </div>
                                    {fetchMessage && fetchSuccess !== null && (
                                        <div
                                            className={`mt-2 p-2 border rounded-md ${
                                                fetchSuccess
                                                    ? "text-green-700 bg-green-100 border-green-500"
                                                    : "text-red-700 bg-red-100 border-red-500"
                                            }`}
                                        >
                                                {fetchMessage}
                                        </div>
                                    )}
                            </div>
                    </div>

                    <div className="container flex flex-row-reverse gap-2 mt-2">
                            <CommonButton
                                className="px-2 mx-2"
                                onClick={() => {
                                        dispatch({ type: "SET_SUBJECT", payload: "contracts" });
                                        dispatch({ type: "SET_CREATE_MODAL", payload: true });
                                }}
                            >
                                    Create Contract
                            </CommonButton>
                            <CommonButton
                                className="px-2 mx-2"
                                onClick={() => {
                                        dispatch({ type: "SET_SUBJECT", payload: "issuingContract" });
                                        dispatch({ type: "SET_CREATE_MODAL", payload: true });
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
                                                {contracts.length > 1 && (
                                                    <>
                                                            <button
                                                                onClick={() =>
                                                                    dispatch({ type: "SET_SELECTED_INDEX", payload: selectedContractIndex - 1 })
                                                                }
                                                                disabled={selectedContractIndex === 0}
                                                                className="p-2 bg-gray-200 rounded disabled:opacity-50"
                                                            >
                                                                    <ChevronLeft size={20} />
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    dispatch({ type: "SET_SELECTED_INDEX", payload: selectedContractIndex + 1 })
                                                                }
                                                                disabled={selectedContractIndex === contracts.length - 1}
                                                                className="p-2 bg-gray-200 rounded disabled:opacity-50"
                                                            >
                                                                    <ChevronRight size={20} />
                                                            </button>
                                                    </>
                                                )}
                                                <button
                                                    onClick={() => {
                                                            dispatch({ type: "SET_SELECTED_INDEX", payload: -1 });
                                                            dispatch({ type: "SET_EDITED_CONTRACT", payload: null });
                                                    }}
                                                    className="p-2 rounded-full hover:bg-gray-200"
                                                >
                                                        <X className="w-6 h-6 text-gray-500" />
                                                </button>
                                        </div>
                                </div>
                                {(isLoading || isSaving) && <div className="text-center">Loading...</div>}
                                <ContractFields contract={editedContract} onChange={handleInputChange} />
                                {saveMessage && saveSuccess !== null && (
                                    <div
                                        className={`mt-4 p-2 border rounded-md ${
                                            saveSuccess
                                                ? "text-green-700 bg-green-100 border-green-500"
                                                : "text-red-700 bg-red-100 border-red-500"
                                        }`}
                                    >
                                            {saveMessage}
                                    </div>
                                )}
                                <div className="flex justify-start mt-4">
                                        <CommonButton
                                            className="w-20 bg-blue-500 hover:bg-blue-600 text-white"
                                            onClick={handleSave}
                                            disabled={isSaving}
                                        >
                                                {isSaving ? "Đang lưu..." : "Lưu"}
                                        </CommonButton>
                                </div>
                        </div>
                    )}

                    {createModal && (
                        <CreateModal
                            onClose={() => {
                                    dispatch({ type: "SET_CREATE_MODAL", payload: false });
                                    dispatch({ type: "SET_SUBJECT", payload: "" });
                            }}
                            subject={subject}
                        />
                    )}
            </div>
        );
}