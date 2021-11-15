import ArticleItem from "./articleItem";
import Article from "../types/article";

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
