import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configureStore";
import { fetchItems, getItems } from "../../../store/item";
import { addItemToList } from "../../../store/itemList";

interface AddItemToListInterface {
  listId: number;
}

interface DropdownOptions {
  label: string;
}

const AddItemToList = ({ listId }: AddItemToListInterface) => {
  const [selectedItem] = useState("");
  const [typedValue, setTypedValue] = useState("");
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => getItems(state));

  const handleAddItem = (
    _: React.SyntheticEvent,
    newValue: string | null | DropdownOptions
  ) => {
    setTypedValue("");
    if (newValue) {
      const title = typeof newValue === "string" ? newValue : newValue.label;
      dispatch(addItemToList(title, listId));
    }
  };

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const getOptions = () => {
    const realOptions = [...items].map((item) => {
      return item.title;
    });

    const optionsLowercase = realOptions.map((option) => option.toLowerCase());
    if (typedValue && !optionsLowercase.includes(typedValue.toLowerCase())) {
      realOptions.unshift(typedValue);
    }

    return realOptions;
  };
  return (
    <>
      <Autocomplete
        freeSolo
        onChange={handleAddItem}
        value={selectedItem}
        inputValue={typedValue}
        clearIcon={false}
        // disabled={true}
        onInputChange={(event, newInputValue) => {
          setTypedValue(newInputValue);
        }}
        options={getOptions()}
        renderInput={(params) => (
          <TextField {...params} label="Add Item To List" />
        )}
      />
    </>
  );
};

export default AddItemToList;
