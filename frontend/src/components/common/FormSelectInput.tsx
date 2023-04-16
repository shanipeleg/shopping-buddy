import { Select, MenuItem, FormControl } from "@mui/material";

interface FormSelectInputProps {
  options: any[]; //TODO fix
  label: string;
  optionLabel: string;
  elementName: string;
  optionKey: string;
  onChange: Function;
  selectedValue?: number;
}
const FormSelectInput = ({
  options,
  label,
  optionLabel,
  onChange,
  selectedValue,
  optionKey,
}: FormSelectInputProps) => {
  return (
    <div className="mb-3 p-3">
      <label className="mb-2 tracking-wide text-sm text-indigo-500 font-semibold">
        {label}
      </label>
      <FormControl fullWidth>
        <Select value={selectedValue ?? ""} onChange={(e) => onChange(e)}>
          {options.map((option) => (
            <MenuItem key={option[optionKey]} value={option[optionKey]}>
              {option[optionLabel]}
              {option.icon && (
                <i className={`mx-2 fa-solid ${option.icon}`}></i>
              )}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default FormSelectInput;
