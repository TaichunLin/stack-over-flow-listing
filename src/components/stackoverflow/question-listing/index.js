import React, { useState } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useQuestionSearch from "../../../customhooks/useQuestionSearch";
import { addPage } from "../../../features/stackoverflow/searchingSlice";
import { Question } from "./question";

export const QuestionListing = () => {
  const base = "https://api.stackexchange.com";
  const pathURL = `/2.3/questions?order=desc&sort=activity&site=stackoverflow`;
  const SearchState = useSelector((state) => state.searching.value);
  const PageState = useSelector((state) => state.searching.page);
  console.log("PageState", PageState);

  console.log("SearchState", SearchState);
  const dispatch = useDispatch();
  const { questions, hasMore, loading, error } = useQuestionSearch(
    base + pathURL,
    10,
    PageState
  );
  const observer = useRef();

  const lastQuestionElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("a-PageState", PageState);
          dispatch(addPage(PageState + 1));
          console.log("b-PageState", PageState);
          // console.log("a-prevPage", prevPage);
          // dispatch(addPage((prevPage) => prevPage + 1));
          // console.log("b-prevPage", prevPage);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  console.log("questions???:", questions);
  return (
    <div>
      Question
      <div>
        <div>
          {questions &&
            questions.map((question, index) => {
              if (questions.length === index + 1) {
                return (
                  <div ref={lastQuestionElementRef} key={index}>
                    <Question question={question} />
                  </div>
                );
              } else {
                return (
                  <div key={index}>
                    <Question question={question} />
                  </div>
                );
              }
            })}
          <div>
            hasMore:{hasMore}:{hasMore || "it's the end"}
          </div>
          <div>{loading && "Loading..."}</div>
          <div>{error && "Error"}</div>
        </div>
      </div>
    </div>
  );
};
