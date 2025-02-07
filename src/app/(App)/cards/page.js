import CommonBottom from "@/components/common/CommonBottom";

export default function CardPage() {
    return (
        <>
            <div className="flex-grow flex-col h-full">
                {/* Phần header với các button */}
                <div className="m-2 p-2 md:ml-4 border-gray-300 border rounded flex flex-row-reverse gap-2">
                    <div className="mr-2">
                        <CommonBottom className="mx-2">Thêm thẻ</CommonBottom>
                    </div>
                    <div>
                        <CommonBottom className="mx-2">abc</CommonBottom>
                    </div>
                </div>

                {/* Phần content bên dưới, tự động chiếm phần còn lại của màn hình */}
                <div className="m-2 p-2 md:ml-4 border-gray-300 border rounded flex-grow overflow-auto flex flex-row gap-2">
                    <div className="w-1/3 bg-white p-4 shadow-md">Content 1</div>
                    <div className="w-1/3 bg-white p-4 shadow-md">Content 2</div>
                    <div className="w-1/3 bg-white p-4 shadow-md">Content 3</div>
                </div>
            </div>
        </>
    );
}
