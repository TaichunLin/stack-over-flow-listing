import React, { useState } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import useQuestionSearch from "../../../customhooks/useQuestionSearch";

export const Question = (props) => {
  console.log("props", props);
  return (
    <div className="Question">
      {" "}
      <div>
        <div>
          <a
            href={props.question.link}
            target="_blank"
            rel={props.question.title}
          >
            {props.question.title}
          </a>
        </div>
        <p>score:{props.question.score}</p>
        <p>answer:{props.question.answer_count}</p>
        <p>view_count:{props.question.view_count}</p>
        <div style={{ height: "100px", width: "100px" }}>
          <img
            alt={`${props.question.display_name}'s profile`}
            src={props.question.profile_image}
            width="100"
            height="100"
          />
        </div>
        <p>{props.question.display_name}</p>
        <p>{props.question.owner_link}</p>
      </div>
      <hr />
    </div>
  );
};
