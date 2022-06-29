import { useEffect, useState } from "react";
import axios from "axios";

export default function useSearch(query, pageNumber, url, pagesize) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setQuestions([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: url,
      params: { tagged: query, page: pageNumber, pagesize: pagesize },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setQuestions((prevQuestionss) => {
          console.log(res.data);
          console.log(res.data.items);
          return [
            ...new Set([
              ...prevQuestionss,
              ...res.data.items.map((item, index) => (
                <div>
                  <div key={item.owner.account_id}>
                    {" "}
                    <h1>{index + 1}</h1>
                    <div key={item.owner.account_id}>
                      {item.title}
                      <p>
                        {" "}
                        {item.tags.map((tag, index) => (
                          <strong>
                            <span key={index}> {tag} </span>
                          </strong>
                        ))}
                      </p>
                      <p>score:{item.score}</p>
                      <p>answer:{item.answer_count}</p>
                      <p>view_count:{item.view_count}</p>
                      <div style={{ height: "100px", width: "100px" }}>
                        <img
                          alt={`${item.owner.display_name}'s profile`}
                          src={item.owner.profile_image}
                          width="100"
                          height="100"
                        />
                      </div>
                      <p>{item.owner.display_name}</p>
                    </div>
                    <hr />
                  </div>
                  {/* <p>
                    {" "}
                    {item.tags.map((tag, index) => (
                      <strong>
                        <span key={index + 1}> {tag} </span>
                      </strong>
                    ))}
                  </p>
                  <p> {item.title}</p> */}
                </div>
              )),
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
  }, [url, pageNumber]);

  return { loading, error, questions, hasMore };
}
