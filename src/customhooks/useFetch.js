import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url, query, pagesize, pageNumber) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: url,
      params: { tagged: query, page: pageNumber, pagesize: pagesize },
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  const refetch = () => {
    setLoading(true);
    axios({
      method: "GET",
      url: url,
      params: { tagged: query, page: pageNumber, pagesize: pagesize },
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { data, loading, error, refetch };
}

export default useFetch;
