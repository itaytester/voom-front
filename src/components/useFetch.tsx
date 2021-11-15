import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Article from "../types/article";

const useFetch = <T extends unknown>(url: string) => {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      setData(response.data);
    } catch (e: any) {
      setIsError(true);
    }
    finally{
      setIsLoading(false);
    }
  }, [url]);

  useEffect(()=> {
      fetch();
  }, [url]);

  return {data, isLoading, isError, fetch};
};

export default useFetch;
