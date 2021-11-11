export default interface Article {
    _id: string,
    source: { id: string | null, name: string },
    author: string | null,
    title: string,
    description: string | null,
    url: string,
    urlToImage: string | null,
    publishedAt: string,
    content: string | null
}
