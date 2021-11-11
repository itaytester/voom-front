import axios from "axios";
import Article from "../types/article";
import ArticleQuery from "../types/articleQuery";

class ArticleApi {
    static url:string = "http://localhost:8080/api/article"
    static async getArticlesByQuery(query:ArticleQuery):Promise<Article[]> {
        const queryParams = `${this.url}?${query.words?`words=${query.words}`:""}${query.from?`&from=${query.from.toISOString()}`:""}${query.to?`&to=${query.to.toISOString()}`:""}`;
        const result = await axios.get(queryParams);
        return result.data;
    }
}

export default ArticleApi;