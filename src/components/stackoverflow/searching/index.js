import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useTagSearch from "../../../customhooks/useTagSearch";
import {
  addPage,
  addSearching,
  addSearchingRefValue,
} from "../../../features/stackoverflow/searchingSlice";

import { Question } from "../question-listing/question";
import { TrendingTags } from "../trending-tags";
import TagCard from "../trending-tags/tagCard";

//searchinput store到 searchState

export const Seaching = () => {
  const base = "https://api.stackexchange.com";
  const pathURL = "/2.3/tags?order=desc&sort=popular&site=stackoverflow";
  const tagsState = useSelector((state) => state.tags.value);
  const inputSearchRef = useRef(null);
  const [searchingInput, setSearchingInput] = useState(tagsState[0]);

  const { tags, loading, error } = useTagSearch(
    searchingInput,
    "http://localhost:8001/tags",
    10,
    "!T.BkwE7kN)xmhL)Xnz"
  );

  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchingInput == "") return;
    dispatch(addSearching(searchingInput));
    dispatch(addPage(1));
    dispatch(addSearchingRefValue(inputSearchRef.current.value));
  };

  const handleTagSearch = (e) => {
    setSearchingInput(e.target.value);
    dispatch(addSearching(searchingInput));
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchingInput}
          placeholder="Tag"
          onChange={handleTagSearch}
          ref={inputSearchRef}
        />
        <button type="button" onClick={handleSearch}>
          search
        </button>
      </div>
      <div className="trendingTags">
        <div className="trendingTags__container">
          <div>
            <h5 className="">TrendingTags</h5>
          </div>
          <div className="trendingTags__cardWrapper">
            {tags.map((tag, index) => {
              if (index === 0) {
                return (
                  <TagCard
                    name={tag}
                    key={index}
                    className="trendingTags__card trendingTags__card--focus"
                  />
                );
              } else {
                return (
                  <TagCard
                    name={tag}
                    key={index}
                    className="trendingTags__card"
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
      <div>{loading && "LOADING TAGS..."}</div>
      <div>{error && `Error:${error}`}</div>
    </div>
  );
};
