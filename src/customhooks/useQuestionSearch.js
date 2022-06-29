import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function useQuestionSearch(url, pagesize, page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const SearchState = useSelector((state) => state.searching.refValue);
  // const SearchState = useSelector((state) => state.searching.value);
  console.log("SearchState", SearchState);
  useEffect(() => {
    setQuestions([]);
  }, [SearchState]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: url + `&tagged=${SearchState}`,
      params: { page: page, pagesize: pagesize },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setQuestions((prevQuestions) => {
          return [
            ...new Set([
              ...prevQuestions,
              ...res.data.items.map((item) => ({
                owner_link: item.owner.link,
                account_id: item.owner.account_id,
                display_name: item.owner.display_name,
                profile_image: item.owner.profile_image,
                title: item.title,
                link: item.link,
                score: item.score,
                answer_count: item.answer_count,
                view_count: item.view_count,
                accepted: item.is_answered,
                tags: item.tags,
              })),
            ]),
          ];
        });
        setHasMore(res.data.items.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [SearchState, page]); // eslint-disable-line react-hooks/exhaustive-deps

  return { loading, error, questions, hasMore };
}
