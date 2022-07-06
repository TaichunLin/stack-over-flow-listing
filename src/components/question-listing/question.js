import React from "react";
import styled from "styled-components";

const Title = styled.div`
  color: #994242;
  margin-top: 1rem;
`;

export const Question = (props) => {
  return (
    <div className="questionCard">
      {" "}
      <div className="questionCard">
        <div>
          <a href={props.question.link} target="_blank" rel="noreferrer">
            {props.question.title}
          </a>
        </div>
        <div className="questionCard__items">
          <div className="questionCard__item">
            <Title>Score</Title>

            <div
              className={
                `${props.question.score}` < 0
                  ? "questionCard__item_score-red"
                  : "questionCard__item_score"
              }
            >
              {props.question.score}
            </div>
          </div>
          <div className="questionCard__item">
            <Title>Answers</Title>
            <div
              className={
                `${props.question.answer_count}` > 0
                  ? `${props.question.accepted}` === "true"
                    ? "questionCard__item_count"
                    : "questionCard__item_count-border"
                  : ""
              }
            >
              {props.question.answer_count}
            </div>
          </div>
          <div className="questionCard__item">
            <Title>Viewed</Title>
            <div>{props.question.view_count}</div>
          </div>
          <div className="questionCard__item">
            <img
              alt={`${props.question.display_name}'s profile`}
              src={props.question.profile_image}
              width="100"
              height="100"
            />
            <a
              href={props.question.owner_link}
              target="_blank"
              rel="noreferrer"
            >
              {props.question.display_name}
            </a>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};
