import React from "react";
import { QuestionListing } from "./question-listing";
import { Seaching } from "./searching";

import "../../assets/styles/Bass.sass";

export const StackOverFlow = () => {
  return (
    <div>
      StackOverFlow
      <Seaching />
      <hr />
      <QuestionListing />
    </div>
  );
};
