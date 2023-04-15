import Joi from "joi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ListToCreate } from "../../models/List";
import { RootState } from "../../store/configureStore";
import {
  addList,
  getCreationLoading,
  getListByLocalId,
} from "../../store/list";
import FormInput from "./FormInput";

const CreateListForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state: RootState) =>
    getCreationLoading(state)
  );

  const [list, setList] = useState({ title: "", description: "" });
  const [localId, setLocalId] = useState(0);

  const listCreatedInDB = useSelector((state: RootState) =>
    getListByLocalId(state, localId)
  );

  const [errors, setErrors] = useState({
    title: "Title is required",
    description: "Description is required",
  });

  const schema = Joi.object({
    title: Joi.string().min(5).label("Title"),
    description: Joi.string().min(5).label("Description"),
  });

  useEffect(() => {
    if (listCreatedInDB) {
      navigate(`/list/${listCreatedInDB.id}`);
    }
  }, [navigate, listCreatedInDB]);

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errors = schema.validate({ [name]: value });

    setErrors((previousData: ListToCreate) => ({
      ...previousData,
      [name]: errors.error ? errors.error.message : "",
    }));
    setList((previousData: ListToCreate) => ({
      ...previousData,
      [name]: value,
    }));
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
    const localId = Date.now();
    const listWithLocalId = { ...list, localId };
    dispatch(addList(listWithLocalId));
    setLocalId(localId);
  };

  return (
    <>
      <div className="w-full">
        <form onSubmit={(e) => handleSubmit(e)} className="px-8 pt-6 pb-8 mb-4">
          <FormInput
            title="Title"
            elementName="title"
            onChange={handleValue}
            warning={errors.title}
          />
          <FormInput
            title="Description"
            onChange={handleValue}
            elementName="description"
            warning={errors.description}
          />
          <div className="flex items-center justify-between">
            <button
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none"
              type="submit"
              disabled={isLoading || !isFormValid()}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateListForm;
