import React from "react";

import { SyncLoader } from "react-spinners";

export default function Loading({ type }) {
  const TagsSkeleton = () => <div className="trendingTags__cardSK" />;

  const QuesSkeleton = () => (
    <div className="quesSkCard">
      <div className="quesSkCard__title" />
      <div className="quesSkCard__items">
        <div className="quesSkCard__item" />
        <div className="quesSkCard__item" />
        <div className="quesSkCard__item" />
        <div className="quesSkCard__img" />
      </div>
      <hr />
    </div>
  );

  const Loader = () => (
    <div className="loader">
      <SyncLoader color={"#b7d8e3"} size={150} />
    </div>
  );

  if (type === "tags") return Array(10).fill(<TagsSkeleton />);
  if (type === "questions") return Array(20).fill(<QuesSkeleton />);
  if (type === "syncLoader") return <Loader />;
}
