import React from "react";
import { useDispatch } from "react-redux";
import {
  addSearching,
  addSearchingRefValue,
} from "../../features/stackoverflow/searchingSlice";

function TagCard({ name, className, setSearchingInput }) {
  const dispatch = useDispatch();

  return (
    <div
      className={className}
      onClick={() => {
        dispatch(addSearching(name));
        dispatch(addSearchingRefValue(name));
        setSearchingInput(name);
      }}
    >
      <p>{name}</p>
    </div>
  );
}

export default TagCard;
