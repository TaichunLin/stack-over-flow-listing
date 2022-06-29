import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addTags } from "../features/stackoverflow/tagsSlice";

export default function useTagSearch(query, url, pagesize, filter) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tags, setTags] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    setTags([]);
    console.log("useEffect 1111");
  }, [query]);

  useEffect(() => {
    console.log("useEffect 222");
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: url,
      // params: { inname: query, pagesize: pagesize, filter: filter },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setTags(() => {
          return [...new Set([...res.data.items.map((item) => item.name)])];
        });
        console.log([...res.data.items]);

        console.log(res.data.items.map((item) => item.name));
        console.log("tags in Slice", tags);
        dispatch(addTags(tags));
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query]);
  console.log("tags in Slice", tags);
  return { loading, error, tags };
}
