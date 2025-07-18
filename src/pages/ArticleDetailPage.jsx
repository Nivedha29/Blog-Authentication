import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticle } from '../services/api';
import ReactMarkdown from 'react-markdown';

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticle(slug).then((res) => setArticle(res.article));
  }, [slug]);

  if (!article) return <p>Loading...</p>;

  return (
    <main>
      <article className="article-detail">
        <h1>{article.title}</h1>
        <div className="meta">
          <span className="author">{article.author.username}</span>
          <span className="date">{new Date(article.createdAt).toLocaleDateString()}</span>
          <span className="likes">❤️ {article.favoritesCount}</span>
        </div>
        <ReactMarkdown>{article.body}</ReactMarkdown>
        <div className="tag-list">
          {article.tagList.map((tag, i) => (
            <span className="tag" key={i}>{tag}</span>
          ))}
        </div>
      </article>
    </main>
  );
}