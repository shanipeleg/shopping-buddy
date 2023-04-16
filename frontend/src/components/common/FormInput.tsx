interface FormInputProps {
  title: string;
  onChange: Function;
  warning: string;
  elementName: string;
  value?: string;
}
const FormInput = ({
  title,
  onChange,
  warning,
  elementName,
  value,
}: FormInputProps) => {
  return (
    <div className="mb-3 p-3">
      <label className="mb-2 tracking-wide text-sm text-indigo-500 font-semibold">
        {title}
      </label>
      <input
        className="shadow appearance-none bg-transparent border-indigo-500 border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        value={value}
        name={elementName}
        onChange={(e) => onChange(e)}
      ></input>
      <p className="text-red-500 text-xs italic mt-2">{warning}</p>
    </div>
  );
};

export default FormInput;
