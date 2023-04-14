import Joi from "joi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ListToCreate } from "../models/List";
import { RootState } from "../store/configureStore";
import { addList, getCreationLoading, getListByLocalId } from "../store/list";

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
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            onChange={(e) => handleValue(e)}
            className="form-control"
            aria-describedby="title"
          ></input>
          <div className="form-text">{errors.title}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            name="description"
            onChange={(e) => handleValue(e)}
            className="form-control"
            aria-describedby="description"
          ></input>
          <div className="form-text">{errors.description}</div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !isFormValid()}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default CreateListForm;
