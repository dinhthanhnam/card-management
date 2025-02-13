"use client";
import { useState } from "react";
import MultiLevelList from "@/components/ListView/MultiLevelList";

export default function CardholderPage() {
    const [search1, setSearch1] = useState("");
    const [focused, setFocused] = useState(false);
    const [selectedUsers, setSelectedCards] = useState(null);

    return (
        <div className="p-2">
            <MultiLevelList/>
        </div>
    );
}
