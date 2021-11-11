import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Article from "../types/article";

const useFetch = <T extends unknown>(url: string): [T[] | null, boolean, boolean, () => Promise<void>] => {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      setData(response.data);
      setIsLoading(false);
    } catch (e: any) {
      setIsError(true);
    }
  }, [url]);

  useEffect(()=> {
      fetch();
  }, [url]);

  return [data, isLoading, isError, fetch];
};

export default useFetch;
