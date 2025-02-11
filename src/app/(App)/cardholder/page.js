"use client";
import { useState } from "react";
import MultiLevelList from "@/components/ListView/MultiLevelList";

export default function CardholderPage() {
    const [search1, setSearch1] = useState("");
    const [focused, setFocused] = useState(false);
    const [selectedUsers, setSelectedCards] = useState(null);
    // Dữ liệu giả lập
    const allData = [
        { id: 1, name: "Nguyễn Văn A", email: "a@email.com", phone: "0901234567", address: "Hà Nội", dob: "01/01/1990" },
        { id: 2, name: "Trần Thị B", email: "b@email.com", phone: "0912345678" , address: "Hà Nội", dob: "01/01/1990"  },
        { id: 3, name: "Lê Văn C", email: "c@email.com", phone: "0923456789" , address: "Hà Nội", dob: "01/01/1990"  },
        { id: 4, name: "Phạm Thị D", email: "d@email.com", phone: "0934567890" , address: "Hà Nội", dob: "01/01/1990" },
    ];

    // Lọc danh sách theo từ khóa tìm kiếm
    const filteredData = allData.filter((user) =>
        user.name.toLowerCase().includes(search1.toLowerCase())
    );

    return (
        <div>
            <div className="mt-2">
                <MultiLevelList
                    title={"Danh sách chủ thẻ"}
                    data={filteredData}
                    searchValue={search1}
                    onSearchChange={(e) => setSearch1(e.target.value)}
                    onSearch={() => console.log("Tìm kiếm:", search1)}
                />
            </div>
        </div>
    );
}
