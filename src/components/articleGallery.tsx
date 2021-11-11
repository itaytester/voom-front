import { useCallback, useEffect, useState } from "react";
import ArticleItem from "./articleItem";
import ArticleApi from "../api/articleApi";
import useFetch from "./useFetch";
import Article from "../types/article";
import ArticleSearhBar from "./articleSearch";
import { debounce } from "lodash";
import ArticleQuery from "../types/articleQuery";

interface IGalleryProps {
  articles: Article[] | null;
  isLoading: boolean;
}

const ArticleGallery: React.FC<IGalleryProps> = ({ articles, isLoading }) => {
  const renderArticles = () => {
    return articles ? (
      articles.map((article: Article) => (
        <ArticleItem key={article._id} isLoading={isLoading} article={article} />
      ))
    ) : (
      <>
        <ArticleItem isLoading={isLoading} article={undefined} />
        <ArticleItem isLoading={isLoading} article={undefined} />
        <ArticleItem isLoading={isLoading} article={undefined} />
        <ArticleItem isLoading={isLoading} article={undefined} />
        <ArticleItem isLoading={isLoading} article={undefined} />
      </>
    );
  };

  return <div className="news-container">{renderArticles()}</div>;
};

export default ArticleGallery;
