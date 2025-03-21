import { useState, useCallback } from "react";
import { debounce } from "lodash"; // Giả định bạn dùng lodash cho debounce
import { Contract } from "@/types/Contract";
import {fetchContractByNumber, fetchContractsByClient} from "@/utils/fetchcontract"; // Giả định kiểu Contract

interface FetchContractsResult {
    contracts: Contract[];
    isLoading: boolean;
    message: string;
    success: boolean | null;
    fetchContracts: (searchText: string, searchType: "contractNumber" | "client") => void;
}

export function useFetchContracts(): FetchContractsResult {
    const [contracts, setContracts] = useState<Contract[]>([]); // Luôn là mảng
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
                // Chuẩn hóa: luôn trả về mảng, kể cả khi API trả về một Contract
                const contractsArray = Array.isArray(data.contracts)
                    ? data.contracts
                    : [data.contracts];
                setContracts(contractsArray);
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