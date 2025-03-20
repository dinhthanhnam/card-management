// hooks/useFetchContracts.ts
import { useState, useCallback } from "react";
import { fetchContractByNumber, fetchContractsByClient } from "@/utils/fetchcontract";
import debounce from "lodash/debounce";
import { Contract } from "@/types/Contract";

interface FetchContractsResult {
    contracts: Contract[];
    isLoading: boolean;
    message: string;
    success: boolean | null;
    fetchContracts: (searchText: string, searchType: "contractNumber" | "client") => void;
}

export function useFetchContracts(): FetchContractsResult {
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState<boolean | null>(null);

    const fetchContracts = useCallback(
        debounce(async (searchText: string, searchType: "contractNumber" | "client") => {
            if (!searchText) {
                setContracts([]);
                setMessage("Vui lòng nhập thông tin tìm kiếm.");
                setSuccess(null);
                return;
            }

            setIsLoading(true);
            try {
                const data =
                    searchType === "contractNumber"
                        ? await fetchContractByNumber(searchText)
                        : await fetchContractsByClient(searchText);
                setContracts(data.contracts);
                setMessage(data.message);
                setSuccess(data.success);
            } catch (error) {
                console.error("Error fetching contracts:", error);
                setContracts([]);
                setMessage("Lỗi hệ thống khi tìm kiếm hợp đồng.");
                setSuccess(false);
            } finally {
                setIsLoading(false);
            }
        }, 300),
        []
    );

    return { contracts, isLoading, message, success, fetchContracts };
}