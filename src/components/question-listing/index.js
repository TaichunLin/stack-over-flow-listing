import React from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useQuestionSearch from "../../customhooks/useQuestionSearch";
import { addPage } from "../../features/stackoverflow/searchingSlice";
import { Question } from "./question";

import Loading from "../Loading/Loading";

export const QuestionListing = () => {
  const base = "https://api.stackexchange.com";
  const pathURL = `/2.3/questions?order=desc&sort=activity&site=stackoverflow`;

  const PageState = useSelector((state) => state.searching.page);

  const dispatch = useDispatch();
  const { questions, hasMore, loading, error } = useQuestionSearch(
    base + pathURL,
    20,
    PageState
  );
  const observer = useRef();

  const lastQuestionElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(addPage(PageState + 1));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, PageState, dispatch]
  );

  return (
    <div className="questionListing">
      <div className="questionListing__container">
        {loading ? (
          <div>
            {error && "Error"}
            <Loading type="questions" />
          </div>
        ) : (
          <div className="questionListing__loading">
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
            <div>{loading || hasMore || "No more data."}</div>
          </div>
        )}
      </div>
    </div>
  );
};
