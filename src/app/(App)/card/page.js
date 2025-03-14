"use client";
import React, {useEffect, useState} from "react";
import {Search, Filter, LockIcon, LockKeyhole, LockKeyholeOpen, DollarSign, ListCollapse, X} from "lucide-react";
import FormInput from "@/components/common/FormInput";
import { FormSelect } from "@/components/common/FormSelect";
import { BiDetail } from "react-icons/bi";
import SearchBar from "@/components/common/SearchBar";
import {fetchClient} from "@/utils/fetchclient";
import {fetchCard} from "@/utils/fetchcard";
import CommonButton from "@/components/common/CommonBottom";
import CreateModal from "@/components/modal/CreateModal";

export default function CardPage() {
    const [searchType, setSearchType] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [searchParams, setSearchParams] = useState({
        cardNumber: "",
        cardType: "",
        contractNumber: "",
    });
    const [lockedCards, setLockedCards] = useState({});
    const [cardsData, setCardsData] = useState({});
    const [createModal, setCreateModal] = useState(false);

    // useEffect(() => {
    //     const fetchCards = async() => {
    //         try {
    //             setCardsData(await fetchCard(null));
    //         } catch (error) {
    //             console.error("Error fetching cards:", error);
    //         }
    //     }
    //     fetchCards();
    // }, []);

    const toggleLock = (cardNumber) => {
        setLockedCards((prev) => ({
            ...prev,
            [cardNumber]: !prev[cardNumber],
        }));
    };

    const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const [seeCardRelation, setSeeCardRelation] = useState(false);


    return (
        <div className="p-2">
            <div className="container relative p-4 border border-gray-300 rounded-lg shadow-md bg-white">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-600">Danh sách thẻ</h2>
                    <div className="flex flex-row-reverse gap-2">
                        <button
                            onClick={() => setSearchType(searchType === "advanced" ? null : "advanced")}
                            className={`flex items-center gap-1 px-3 py-1 border rounded-md transition ${
                                searchType === "advanced" ? "bg-gray-200 border-gray-400" : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        >
                            <Filter size={16} />
                            Tìm kiếm chi tiết
                        </button>

                        <button
                            onClick={() => setSearchType(searchType === "simple" ? null : "simple")}
                            className={`flex items-center gap-1 px-3 py-1 border rounded-md transition ${
                                searchType === "simple" ? "bg-gray-200 border-gray-400" : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        >
                            <Search size={16} />
                            Tìm kiếm đơn giản
                        </button>
                    </div>
                </div>

                {/* Khối tìm kiếm */}
                <div className={`overflow-hidden transition-all duration-300 ${
                    searchType ? "mt-4 p-4 border-t border-gray-300 bg-gray-50 rounded-b-md" : "h-0"
                }`}>
                    {searchType === "simple" && (
                        <>
                            <label className="block text-gray-700 font-medium mb-1">Tìm theo số thẻ hoặc chủ thẻ</label>
                            <SearchBar
                                value={searchParams.cardNumber}
                                onSearch={() =>{}}
                                onChange={(e) => setSearchParams({ ...searchParams, cardNumber: e.target.value })}
                            />
                        </>
                    )}

                    {searchType === "advanced" && (
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput
                                label="Mã hợp đồng"
                                name="contractNumber"
                                value={searchParams.contractNumber}
                                onChange={(e) => setSearchParams({ ...searchParams, contractNumber: e.target.value })}
                            />
                            <FormSelect
                                label="Loại thẻ"
                                name="type"
                                options={["Visa", "MasterCard", "JCB"]}
                                value={searchParams.cardType}
                                onChange={(e) => setSearchParams({ ...searchParams, type: e.target.value })}
                            />
                            <div className={`col-span-2`}>
                                <label className="block text-gray-700 font-medium mb-1">Tìm theo số thẻ hoặc chủ
                                    thẻ</label>
                                <SearchBar
                                    value={searchParams.cardNumber}
                                    onChange={(e) => setSearchParams({ ...searchParams, cardNumber: e.target.value })}
                                    onSearch={() => {
                                    }}
                                />
                            </div>

                        </div>
                    )}
                </div>
            </div>
            <div className={`container flex flex-row-reverse gap-2 mt-2`}>
                <div>
                    <CommonButton className={`px-2 mx-2`}
                                  onClick={() => setCreateModal(true)}
                    >
                        Create Card
                    </CommonButton>
                </div>
            </div>
            <div className={`flex flex-row gap-2 mt-2`}>
                <div className="container">
                    <h2 className="text-lg font-bold text-gray-600 mb-2">Kết quả tìm kiếm</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Số thẻ</th>
                            <th className="border p-2">Loại thẻ</th>
                            <th className="border p-2">Hệ thống thanh toán</th>
                            <th className="border p-2">Số dư</th>
                            <th className="border p-2">Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cardsData.length > 0 ? (
                            cardsData.map((card) => (
                                <tr key={card.cardNumber} className="hover:bg-gray-100 cursor-pointer">
                                    <td className="border p-2 w-1/3">
                                        <div className="flex items-center justify-center gap-2">
                                            <BiDetail className="text-sky-700 text-lg"/>
                                            <span>{card.cardNumber}</span>
                                        </div>
                                    </td>
                                    <td className="border p-2">{card.cardType}</td>
                                    <td className="border p-2">{card.cardScope}</td>
                                    <td className="border p-1">{card.cardBalance}</td>
                                    <th className="border">
                                        <div className={`flex items-center justify-center gap-4`}>
                                            <button
                                                className={`hover:bg-gray-300 text-gray-600 rounded-full duration-100 p-1`}
                                                onClick={() => toggleLock(card.cardNumber)}>
                                                {lockedCards[card.cardNumber] ?? card.locked ? (
                                                    <LockKeyhole size={`20`}/>
                                                ) : (
                                                    <LockKeyholeOpen size={`20`}/>
                                                )}
                                            </button>
                                            <button
                                                className={`hover:bg-gray-300 text-gray-600 rounded-full duration-100 p-1`}
                                                onClick={() => {
                                                    setSelectedCard(card);
                                                    setIsLimitModalOpen(true);
                                                }}>
                                                <DollarSign size={`20`}/>
                                            </button>
                                            <button
                                                className={`hover:bg-gray-300 text-gray-600 rounded-full duration-100 p-1`}
                                                onClick={() => {
                                                    setSelectedCard(card);
                                                    setSeeCardRelation(true);
                                                }}>
                                                <ListCollapse size={20}/>
                                            </button>
                                        </div>
                                    </th>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="border p-2 text-center">Không có kết quả</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                {/*{seeCardRelation && selectedCard && (*/}
                {/*    <div className="container w-2/3 relative h-full">*/}
                {/*        <button*/}
                {/*            onClick={() => setSeeCardRelation(false)}*/}
                {/*            className="absolute top-4 right-4 rounded-full hover:bg-gray-200"*/}
                {/*        >*/}
                {/*            <X className="cursor-pointer w-6 h-6"/>*/}
                {/*        </button>*/}
                {/*        <div>*/}
                {/*            <h2 className="text-xl font-bold">Quan hệ</h2>*/}
                {/*        </div>*/}
                {/*        <table className="w-full border-collapse border my-3 border-gray-300">*/}
                {/*            <thead>*/}
                {/*            <tr className="bg-gray-100">*/}
                {/*                <th className="border p-2">Chủ thẻ</th>*/}
                {/*            </tr>*/}
                {/*            </thead>*/}
                {/*            <tbody>*/}
                {/*            {selectedCard.cardholder ? (*/}
                {/*                <tr key={selectedCard.cardNumber}*/}
                {/*                    className={`cursor-pointer hover:bg-gray-100 text-center`}>*/}
                {/*                    <td className="border p-2">{selectedCard.cardholder.name} | {selectedCard.cardholder.email}</td>*/}
                {/*                </tr>*/}
                {/*            ) : (*/}
                {/*                <tr>*/}
                {/*                    <td colSpan="5" className="border p-2 text-center">Không có quan hệ chủ thẻ</td>*/}
                {/*                </tr>*/}
                {/*            )}*/}
                {/*            </tbody>*/}
                {/*        </table>*/}
                {/*    </div>*/}
                {/*)}*/}

            </div>

            {isLimitModalOpen && selectedCard && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Chỉnh sửa hạn mức</h2>
                        <p className="text-gray-700 mb-2">Số thẻ: {selectedCard.cardNumber}</p>
                        <p className="text-gray-700 mb-2">Hạn mức hiện tại: {selectedCard.limit}</p>
                        <label className="block text-gray-600 font-medium">Hạn mức mới:</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded-lg focus:ring focus:ring-fuchsia-300"
                            placeholder="Nhập hạn mức mới"
                        />

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                                onClick={() => setIsLimitModalOpen(false)}
                            >
                                Hủy
                            </button>
                            <button
                                className="bg-fuchsia-500 text-white px-4 py-2 rounded-lg hover:bg-fuchsia-600"
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {createModal && (
                <CreateModal
                    onClose={() => setCreateModal(false)}
                    subject={"cards"}
                />
            )}
        </div>

    );
}
