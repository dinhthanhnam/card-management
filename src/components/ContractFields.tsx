// components/ContractFields.tsx
import React from "react";
import FormInput from "@/components/common/FormInput";
import {Contract} from "@/types/Contract";

interface ContractFieldsProps {
    contract: Contract;
    onChange: (field: keyof Contract, value: string) => void;
}

export function ContractFields({contract, onChange}: ContractFieldsProps) {
    return (
        <div className="grid grid-cols-4 gap-4">
            <FormInput label="Institution" value={contract.institution || "N/A"} disable/>
            <FormInput label="Branch" value={contract.branch || ""}
                       onChange={(e) => onChange("branch", e.target.value)}/>
            <FormInput label="GetClient Category" value={contract.clientCategory || "N/A"} disable/>
            <FormInput label="GetClient Type" value={contract.clientType || "N/A"} disable/>
            <FormInput label="Product Category" value={contract.productCategory || "N/A"} disable/>
            <FormInput label="Redefined Product Category" value={contract.redefinedProductCategory || "N/A"} disable/>
            <FormInput label="Contract Category" value={contract.contractCategory || "N/A"} disable/>
            <FormInput label="Main Product Corrected" value={contract.mainProductCorrected || "N/A"} disable/>
            <FormInput label="Main Product ITD" value={contract.mainProductITD || "N/A"} disable/>
            <FormInput label="Product" value={contract.product || "N/A"} disable/>
            <FormInput label="Contract Subtype" value={contract.contractSubtype || "N/A"} disable/>
            <FormInput label="Report Type" value={contract.reportType || "N/A"} disable/>
            <FormInput label="Role" value={contract.role || "N/A"} disable/>
            <FormInput label="Icon" value={contract.icon || "N/A"} disable/>
            <FormInput label="Leaf" value={contract.leaf || "N/A"} disable/>
            <FormInput label="Currency" value={contract.currency || "N/A"} disable/>
            <FormInput label="Available" value={contract.available || "N/A"} disable/>
            <FormInput label="Balance" value={contract.balance || "N/A"} disable/>
            <FormInput label="Credit Limit" value={contract.creditLimit || "N/A"} disable/>
            <FormInput label="Add Limit" value={contract.addLimit || "N/A"} disable/>
            <FormInput label="Blocked" value={contract.blocked || "N/A"} disable/>
            <FormInput label="Total Due" value={contract.totalDue || "N/A"} disable/>
            <FormInput label="Past Due" value={contract.pastDue || "N/A"} disable/>
            <FormInput label="Shadow Auth Limit" value={contract.shadowAuthLimit || "N/A"} disable/>
            <FormInput label="GetClient" value={contract.client || "N/A"} disable/>
            <FormInput
                label="Contract Number"
                value={contract.contractNumber || ""}
                onChange={(e) => onChange("contractNumber", e.target.value)}
            />
            <FormInput label="Safe Contract Number" value={contract.safeContractNumber || "N/A"} disable/>
            <FormInput
                label="Contract Name"
                value={contract.contractName || ""}
                onChange={(e) => onChange("contractName", e.target.value)}
            />
            <FormInput label="Contract Level" value={contract.contractLevel || "N/A"} disable/>
            <FormInput label="Billing Contact" value={contract.billingContact || "N/A"} disable/>
            <FormInput label="Top Contract" value={contract.topContract || "N/A"} disable/>
            <FormInput
                label="CBS Number"
                value={contract.cbsNumber || ""}
                onChange={(e) => onChange("cbsNumber", e.target.value)}
            />
            <FormInput label="Open Date" value={contract.openDate || "N/A"} disable/>
            <FormInput label="Check Usage" value={contract.checkUsage || "N/A"} disable/>
            <FormInput label="Last Billing Date" value={contract.lastBillingDate || "N/A"} disable/>
            <FormInput label="Next Billing Date" value={contract.nextBillingDate || "N/A"} disable/>
            <FormInput label="Past Due Days" value={contract.pastDueDays || "N/A"} disable/>
            <FormInput label="Add Parm String" value={contract.addParmString || "N/A"} disable/>
            <FormInput label="Status" value={contract.status || "N/A"} disable/>
            <FormInput label="Status Code" value={contract.statusCode || "N/A"} disable/>
            <FormInput label="External Code" value={contract.externalCode || "N/A"} disable/>
            <FormInput label="Last Application Date" value={contract.lastApplicationDate || "N/A"} disable/>
            <FormInput label="Last Application Officer" value={contract.lastApplicationOfficer || "N/A"} disable/>
            <FormInput label="Last Application Status" value={contract.lastApplicationStatus || "N/A"} disable/>
            <FormInput label="Last Activity Date" value={contract.lastActivityDate || "N/A"} disable/>
            <FormInput label="Ready" value={contract.ready || "N/A"} disable/>
            <FormInput label="Amendment Date" value={contract.amendmentDate || "N/A"} disable/>
            <FormInput label="Amendment Officer" value={contract.amendmentOfficer || "N/A"} disable/>
            <FormInput label="ID" value={contract.id || "N/A"} disable/>
            <FormInput label="GetClient Full Name" value={contract.clientFullName || "N/A"} disable/>
            <FormInput label="Product Code" value={contract.productCode || "N/A"} disable/>
            <FormInput label="Main Product Code" value={contract.mainProductCode || "N/A"} disable/>
            <FormInput
                label="Service Group"
                value={contract.serviceGroup || ""}
                onChange={(e) => onChange("serviceGroup", e.target.value)}
            />
            <FormInput label="CBS ID" value={contract.cbsID || ""} onChange={(e) => onChange("cbsID", e.target.value)}/>
            <FormInput
                label="Close Date"
                value={contract.closeDate || ""}
                onChange={(e) => onChange("closeDate", e.target.value)}
            />
        </div>
    );
}