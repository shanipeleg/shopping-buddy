import Joi from "joi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Item } from "../../../models/Item";
import { fetchCategories, getCategories } from "../../../store/categories";
import { RootState } from "../../../store/configureStore";
import {
  fetchItem,
  getItemById,
  getLoadingFetching,
  updateItem,
} from "../../../store/item";
import { isStringNumeric } from "../../../utils/isStringNumeric";
import Button from "../../common/Button";
import FormInput from "../../common/FormInput";
import FormSelectInput from "../../common/FormSelectInput";
import Spinner from "../../common/Spinner";

const ItemPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const fetchItemSelector = useSelector((state: RootState) =>
    getItemById(state, Number(id))
  );

  const categories = useSelector((state: RootState) => getCategories(state));

  const isLoading = useSelector((state: RootState) =>
    getLoadingFetching(state)
  );

  useEffect(() => {
    if (id && isStringNumeric(id)) {
      dispatch(fetchItem(Number(id)));
      dispatch(fetchCategories());
    }
  }, [dispatch, id]);

  useEffect(() => {
    setItem(fetchItemSelector);
  }, [fetchItemSelector]);

  interface formInterface {
    title: string;
    description: string;
  }

  const [item, setItem] = useState<Item | null>(null);

  const [errors, setErrors] = useState<formInterface>({
    title: "",
    description: "",
  });

  const schema = Joi.object({
    title: Joi.string().min(5).label("Title"),
    description: Joi.string().min(5).optional().allow("").label("Description"),
  });

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errors = schema.validate({ [name]: value });
    setErrors((previousData: formInterface) => ({
      ...previousData,
      [name]: errors.error ? errors.error.message : "",
    }));
    setItem((previousData: Item | null) => {
      if (!previousData) return null;
      return {
        ...previousData,
        [name]: value,
      };
    });
  };

  const isFormValid = () => {
    let isValid = true;
    Object.values(errors).forEach((error) => {
      if (error) {
        isValid = false;
      }
    });
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid()) return;
    if (item) dispatch(updateItem(Number(id), item));
  };

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setItem((previousData: Item | null) => {
      if (!previousData) return null;
      return {
        ...previousData,
        categoryId: Number(value),
      };
    });
  };

  return (
    <>
      <div className="w-full">
        {item ? (
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="px-8 pt-6 pb-8 mb-4"
          >
            <FormInput
              title="Title"
              elementName="title"
              value={item.title}
              onChange={handleValue}
              warning={errors.title}
            />
            <FormInput
              title="Description"
              onChange={handleValue}
              value={item.description}
              elementName="description"
              warning={errors.description}
            />

            <FormSelectInput
              options={categories}
              label="Category"
              selectedValue={item.categoryId ?? undefined}
              onChange={handleSelectCategory}
              elementName="category"
              optionKey="id"
              optionLabel="title"
            />

            <div className="flex items-center justify-end">
              <Button
                type="submit"
                disabled={isLoading || !isFormValid()}
                label="Submit"
              />
            </div>
          </form>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default ItemPage;
