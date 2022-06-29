import React from "react";
import { QuestionListing } from "./question-listing";
import { Seaching } from "./searching";

import "../../assets/styles/Bass.sass";

export const StackOverFlow = () => {
  return (
    <div className="App__container">
      <Seaching />
      <QuestionListing />
    </div>
  );
};
