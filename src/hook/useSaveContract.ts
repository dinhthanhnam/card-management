// hooks/useSaveContract.ts
import { useState, useCallback } from "react";
import api from "@/utils/axiosinstance";
import { Contract } from "@/type/Contract";

interface SaveContractResult {
    isSaving: boolean;
    message: string;
    success: boolean | null;
    saveContract: (originalContract: Contract | null, editedContract: Contract) => Promise<void>;
}

export function useSaveContract(): SaveContractResult {
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState<boolean | null>(null);

    const saveContract = useCallback(
        async (originalContract: Contract | null, editedContract: Contract) => {
            const payload = {
                contractSearchMethod: "CONTRACT_NUMBER",
                contractIdentifier: originalContract?.contractNumber,
                reason: "Update contract details",
                editContractInObject: {
                    branch: editedContract.branch,
                    serviceGroup: editedContract.serviceGroup || "",
                    contractNumber: editedContract.contractNumber,
                    contractName: editedContract.contractName,
                    cbsID: editedContract.cbsID || "",
                    cbsNumber: editedContract.cbsNumber,
                    closeDate: editedContract.closeDate || "",
                },
                setCustomDataInObjects: [
                    {
                        addInfoType: "AddInfo01",
                        tagName: "PrevID_01",
                        tagValue: "A1",
                    },
                ],
            };

            setIsSaving(true);
            try {
                const res = await api.put("/contracts/edit", payload);
                if (res.status === 200) {
                    setMessage(res.data.message || "Lưu hợp đồng thành công.");
                    setSuccess(true);
                } else if (res.status === 400) {
                    setMessage(res.data.message || "Dữ liệu đầu vào không hợp lệ.");
                    setSuccess(false);
                } else {
                    setMessage(res.data.message || "Không thể lưu hợp đồng.");
                    setSuccess(false);
                }
            } catch (error) {
                console.error("Error saving contract:", error);
                setMessage("Lỗi hệ thống khi lưu hợp đồng.");
                setSuccess(false);
            } finally {
                setIsSaving(false);
            }
        },
        []
    );

    return { isSaving, message, success, saveContract };
}