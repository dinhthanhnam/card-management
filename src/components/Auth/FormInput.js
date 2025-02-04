export default function FormInput({ label, type }) {
    return (
        <div>
            <label className="block text-gray-700 font-medium">{label}</label>
            <input type={type} className="input-field" />
        </div>
    );
}
