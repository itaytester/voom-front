import { useCallback, useEffect, useState } from "react";
import ArticleItem from "./articleItem";
import ArticleApi from "../api/articleApi";
import useFetch from "./useFetch";
import Article from "../types/article";
import ArticleSearhBar from "./articleSearch";
import { debounce } from "lodash";
import ArticleQuery from "../types/articleQuery";
import ArticleGallery from "./articleGallery";

const Articles = () => {
  const {data, isLoading, isError} = useFetch<Article>(ArticleApi.url);
  const [articles, setArticles] = useState<Article[] | null>(null);

  useEffect(() => {
    if (data) setArticles(data);
  }, [data]);

  const debounceArticles = useCallback(debounce(async (query: ArticleQuery) => {
    const articles = await ArticleApi.getArticlesByQuery(query);
    setArticles(articles);
  }, 700), []);

  return (
    <div className="container">
      <ArticleSearhBar debounceArticles={debounceArticles} />
      <ArticleGallery articles={articles} isLoading={isLoading}/>
    </div>
  );
};

export default Articles;
