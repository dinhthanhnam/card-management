// components/ContractFields.tsx
import React from "react";
import {FormInput} from "@/components/common/FormInput";
import {Contract} from "@/type/Contract";

interface ContractFieldsProps {
    contract: Contract;
    onChange: (field: keyof Contract, value: string) => void;
}

export function ContractFields({contract, onChange}: ContractFieldsProps) {
    return (
        <div className="grid grid-cols-4 gap-4">
            <FormInput label="Institution" value={contract.institution || "N/A"} disabled/>
            <FormInput label="Branch" value={contract.branch || ""}
                       onChange={(e) => onChange("branch", e.target.value)}/>
            <FormInput label="Client Category" value={contract.clientCategory || "N/A"} disabled/>
            <FormInput label="Client Type" value={contract.clientType || "N/A"} disabled/>
            <FormInput label="Product Category" value={contract.productCategory || "N/A"} disabled/>
            <FormInput label="Redefined Product Category" value={contract.redefinedProductCategory || "N/A"} disabled/>
            <FormInput label="Contract Category" value={contract.contractCategory || "N/A"} disabled/>
            <FormInput label="Main Product Corrected" value={contract.mainProductCorrected || "N/A"} disabled/>
            <FormInput label="Main Product ITD" value={contract.mainProductITD || "N/A"} disabled/>
            <FormInput label="Product" value={contract.product || "N/A"} disabled/>
            <FormInput label="Contract Subtype" value={contract.contractSubtype || "N/A"} disabled/>
            <FormInput label="Report Type" value={contract.reportType || "N/A"} disabled/>
            <FormInput label="Role" value={contract.role || "N/A"} disabled/>
            <FormInput label="Icon" value={contract.icon || "N/A"} disabled/>
            <FormInput label="Leaf" value={contract.leaf || "N/A"} disabled/>
            <FormInput label="Currency" value={contract.currency || "N/A"} disabled/>
            <FormInput label="Available" value={contract.available || "N/A"} disabled/>
            <FormInput label="Balance" value={contract.balance || "N/A"} disabled/>
            <FormInput label="Credit Limit" value={contract.creditLimit || "N/A"} disabled/>
            <FormInput label="Add Limit" value={contract.addLimit || "N/A"} disabled/>
            <FormInput label="Blocked" value={contract.blocked || "N/A"} disabled/>
            <FormInput label="Total Due" value={contract.totalDue || "N/A"} disabled/>
            <FormInput label="Past Due" value={contract.pastDue || "N/A"} disabled/>
            <FormInput label="Shadow Auth Limit" value={contract.shadowAuthLimit || "N/A"} disabled/>
            <FormInput label="Client" value={contract.client || "N/A"} disabled/>
            <FormInput
                label="Contract Number"
                value={contract.contractNumber || ""}
                onChange={(e) => onChange("contractNumber", e.target.value)}
            />
            <FormInput label="Safe Contract Number" value={contract.safeContractNumber || "N/A"} disabled/>
            <FormInput
                label="Contract Name"
                value={contract.contractName || ""}
                onChange={(e) => onChange("contractName", e.target.value)}
            />
            <FormInput label="Contract Level" value={contract.contractLevel || "N/A"} disabled/>
            <FormInput label="Billing Contact" value={contract.billingContact || "N/A"} disabled/>
            <FormInput label="Top Contract" value={contract.topContract || "N/A"} disabled/>
            <FormInput
                label="CBS Number"
                value={contract.cbsNumber || ""}
                onChange={(e) => onChange("cbsNumber", e.target.value)}
            />
            <FormInput label="Open Date" value={contract.openDate || "N/A"} disabled/>
            <FormInput label="Check Usage" value={contract.checkUsage || "N/A"} disabled/>
            <FormInput label="Last Billing Date" value={contract.lastBillingDate || "N/A"} disabled/>
            <FormInput label="Next Billing Date" value={contract.nextBillingDate || "N/A"} disabled/>
            <FormInput label="Past Due Days" value={contract.pastDueDays || "N/A"} disabled/>
            <FormInput label="Add Parm String" value={contract.addParmString || "N/A"} disabled/>
            <FormInput label="Status" value={contract.status || "N/A"} disabled/>
            <FormInput label="Status Code" value={contract.statusCode || "N/A"} disabled/>
            <FormInput label="External Code" value={contract.externalCode || "N/A"} disabled/>
            <FormInput label="Last Application Date" value={contract.lastApplicationDate || "N/A"} disabled/>
            <FormInput label="Last Application Officer" value={contract.lastApplicationOfficer || "N/A"} disabled/>
            <FormInput label="Last Application Status" value={contract.lastApplicationStatus || "N/A"} disabled/>
            <FormInput label="Last Activity Date" value={contract.lastActivityDate || "N/A"} disabled/>
            <FormInput label="Ready" value={contract.ready || "N/A"} disabled/>
            <FormInput label="Amendment Date" value={contract.amendmentDate || "N/A"} disabled/>
            <FormInput label="Amendment Officer" value={contract.amendmentOfficer || "N/A"} disabled/>
            <FormInput label="ID" value={contract.id || "N/A"} disabled/>
            <FormInput label="Client Full Name" value={contract.clientFullName || "N/A"} disabled/>
            <FormInput label="Product Code" value={contract.productCode || "N/A"} disabled/>
            <FormInput label="Main Product Code" value={contract.mainProductCode || "N/A"} disabled/>
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