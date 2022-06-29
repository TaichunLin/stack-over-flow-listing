import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSearching } from "../../../features/stackoverflow/searchingSlice";

// interface ReservationCardType {
//   name: string;
//   index: number;
// }

function TagCard({ name, className, setSearchingInput }) {
  const dispatch = useDispatch();

  return (
    <div
      className={className}
      onClick={() => {
        dispatch(addSearching(name));
        setSearchingInput(name);
      }}
    >
      <p>{name}</p>
    </div>
  );
}

export default TagCard;
