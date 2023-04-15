interface FormInputProps {
  title: string;
  onChange: Function;
  warning: string;
  elementName: string;
}
const FormInput = ({
  title,
  onChange,
  warning,
  elementName,
}: FormInputProps) => {
  return (
    <div className="mb-4  p-6 rounded-lg shadow bg-gray-700">
      <label className="mb-2 tracking-wide text-sm text-indigo-500 font-semibold">
        {title}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name={elementName}
        onChange={(e) => onChange(e)}
      ></input>
      <p className="text-red-500 text-xs italic mt-2">{warning}</p>
    </div>
  );
};

export default FormInput;
