import Image from "next/image";

export default function OpenwayLogo() {
    return (
        <div>
            <Image
                src="/img/logo.png"
                alt="Logo"
                width={200}
                height={100}
                className="object-cover max-w-full"
            />
        </div>
    );
}