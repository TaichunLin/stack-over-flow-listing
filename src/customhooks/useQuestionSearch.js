import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function useQuestionSearch(url, pagesize, page) {
  url = "http://localhost:8000/questions";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([
    {
      owner_link: "item.owner.link",
      account_id: 11,
      display_name: "item.owner.display_name",
      profile_image: "item.owner.profile_image",
      title: "item.title",
      link: "item.link",
      score: 0,
      answer_count: 2,
      view_count: 3,
      tags: ["⛰", "🧘🏻‍♀️", "🤓"],
    },
  ]);
  const [hasMore, setHasMore] = useState(false);
  const SearchState = useSelector((state) => state.searching.refValue);
  useEffect(() => {
    setQuestions([]);
    console.log("useQuestionSearch:清空上個搜尋");
  }, [SearchState]);

  useEffect(() => {
    console.log("useQuestionSearch:fetch data & infinite searching");
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: url,
      // params: { tagged: SearchState, page: page, pagesize: pagesize },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        console.log("!!!!!!!!!!!", res.data);

        setQuestions((prevQuestions) => {
          return [
            // ...new Set([
            //   ...prevQuestions,
            //   ...res.data.map((item) => ({
            //     owner_link: item.owner.link,
            //     account_id: item.owner.account_id,
            //     display_name: item.owner.display_name,
            //     profile_image: item.owner.profile_image,
            //     title: item.title,
            //     link: item.link,
            //     score: item.score,
            //     answer_count: item.answer_count,
            //     view_count: item.view_count,
            //     tags: item.tags,
            //   })),
            // ]),
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
                tags: item.tags,
              })),
            ]),
          ];
        });
        setHasMore(res.data.items.length > 0);
        setLoading(false);
        console.log("questions in hook", questions);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [SearchState, page]);

  return { loading, error, questions, hasMore };
}
