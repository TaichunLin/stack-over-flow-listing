import React from "react";
import { QuestionListing } from "./question-listing";
import { Seaching } from "./searching";
import { TrendingTags } from "./trending-tags";
import "../../assets/styles/Bass.sass";

export const StackOverFlow = () => {
  return (
    <div>
      StackOverFlow
      <Seaching />
      <hr />
      <TrendingTags />
      <hr />
      <QuestionListing />
    </div>
  );
};
