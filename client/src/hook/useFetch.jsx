/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

const useFetch = ({url, bodyData}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          enctype: "multipart/form-data",
          body: bodyData,
        });
        const data = await response.json();
      } catch (error) {
        setError(error);
      } finally{
        setLoading(false)
      }
    };
  }, [url]);

  return <div>useFetch</div>;
};

export default useFetch;
