import React from "react";
import { useDispatch } from "react-redux";
import { addCustomer } from "../../../features/restaurant/customerSlice";
import { removeReservation } from "../../../features/restaurant/reservationSlice";
import { v4 as uuid } from "uuid";

// interface ReservationCardType {
//   name: string;
//   index: number;
// }

function ReservationCard({ name, index }) {
  const dispatch = useDispatch();
  return (
    <div
      className="reservation-card-container"
      onClick={() => {
        dispatch(removeReservation(index));
        dispatch(
          addCustomer({
            id: uuid(),
            name,
            food: [],
          })
        );
      }}
    >
      <p>{name}</p>
    </div>
  );
}

export default ReservationCard;
