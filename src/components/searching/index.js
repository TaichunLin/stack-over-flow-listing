import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import useTagSearch from "../../customhooks/useTagSearch";
import {
  addPage,
  addSearching,
  addSearchingRefValue,
} from "../../features/stackoverflow/searchingSlice";

import TagCard from "../trending-tags/tagCard";
import axios from "axios";
import Loading from "../Loading/Loading";

export const Seaching = () => {
  const base = "https://api.stackexchange.com";
  const pathURL = "/2.3/tags?order=desc&sort=popular&site=stackoverflow";
  const [searchingInput, setSearchingInput] = useState("");
  const [initloading, setLoading] = useState(true);
  const [initerror, setError] = useState(false);
  const inputSearchRef = useRef(null);

  const dispatch = useDispatch();
  const fetchData = async () => {
    const res = await axios
      .get(
        base +
          "/2.3/tags?page=1&pagesize=10&order=desc&sort=popular&site=stackoverflow&filter=!T.BkwE7kN)xmhL)Xnz"
      )
      .then((res) => {
        const name = res.data.items[0].name;
        dispatch(addSearching(name));
        dispatch(addSearchingRefValue(name));
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return res, initloading, initerror;
  };

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchData();
  }, []);

  const { tags, loading, error } = useTagSearch(
    searchingInput,
    base + pathURL,
    10,
    "!T.BkwE7kN)xmhL)Xnz"
  );

  const handleSearch = () => {
    if (searchingInput === "") {
      fetchData();
    } else {
      dispatch(addSearchingRefValue(inputSearchRef.current.value));
      dispatch(addSearching(searchingInput));
      dispatch(addPage(1));
    }
  };

  const handleTagSearch = (e) => {
    setSearchingInput(e.target.value);
    dispatch(addSearching(inputSearchRef.current.value));
    dispatch(addSearchingRefValue(inputSearchRef.current.value));
    if (inputSearchRef.current.value === "") fetchData();
  };

  return (
    <div className="search">
      <div className="search__container">
        <div className="search__input_container">
          <input
            type="text"
            value={searchingInput}
            placeholder="Tag"
            onChange={handleTagSearch}
            ref={inputSearchRef}
          />
          <button type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className="trendingTags">
        <div className="trendingTags__container">
          <div>
            <h4>Trending</h4>
          </div>
          <div className="trendingTags__cardWrapper">
            {!initloading && !loading ? (
              <div className="trendingTags__cards">
                {tags.map((tag, index) => {
                  if (index === 0) {
                    return (
                      <TagCard
                        name={tag}
                        key={tag}
                        className="trendingTags__card trendingTags__card--focus"
                        setSearchingInput={setSearchingInput}
                      />
                    );
                  } else {
                    return (
                      <TagCard
                        name={tag}
                        key={tag}
                        className="trendingTags__card"
                        setSearchingInput={setSearchingInput}
                      />
                    );
                  }
                })}
              </div>
            ) : (
              <div className="trendingTags__cards">
                {" "}
                <Loading type="tags" />
                {initerror && `Error:${initerror}`}
                {error && `Error:${error}`}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
