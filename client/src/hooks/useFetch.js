import { useEffect, useState } from "react";
import axios from "axios";
const useFetch = (url, method, body) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  // console.log(url);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: method,
          url: url,
          data: body,
        });
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios(
        {
          method: method,
          url: url,
          data: body,
        },
        {
          withCredentials: true,
        }
      );
      setData(res);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  console.log(data);
  console.log("loaded data");
  return { data, loading, error, reFetch };
};

export default useFetch;
