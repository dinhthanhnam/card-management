export default function LoadingBar({ loading }) {
    return (
        <div
            className={`fixed top-0 left-0 h-1 bg-primary transition-all duration-300 ${
                loading ? "w-full" : "w-0"
            }`}
            style={{ zIndex: 1000 }}
        />
    );
}
