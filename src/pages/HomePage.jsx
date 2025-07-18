import { useEffect, useState } from 'react';
import { fetchArticles } from '../services/api';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchArticles(page).then((res) => {
      setArticles(res.articles);
    });
  }, [page]);

  const tags = ['tamil', 'spanish', 'chinese', 'english', 'french']; // you can replace with live tags if needed

  return (
    <main>
      {/* Hero Banner */}
      <section className="hero">
        <h1>Realworld Blog</h1>
        <p>A place to share your knowledge.</p>
      </section>

      {/* Popular Tags */}
      <section className="tags">
        <p>Popular tags</p>
        <div className="tag-list">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Articles Feed */}
      <section className="feed">
        {articles.map((article) => (
          <article className="card" key={article.slug}>
            <div className="card-header">
              <div>
                <span className="author">{article.author.username}</span>
                <span className="date">
                  {new Date(article.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="likes">💚 {article.favoritesCount}</div>
            </div>

            <h2>{article.title}</h2>
            <p>{article.description}</p>

            <div className="tag-list">
              {article.tagList.map((tag, i) => (
                <span className="tag" key={i}>{tag}</span>
              ))}
            </div>

            <Link to={`/article/${article.slug}`}>Read more</Link>
          </article>
        ))}
      </section>

      {/* Pagination */}
      <footer className="pagination">
        {[...Array(7)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            style={{
              backgroundColor: page === i ? '#20c997' : '',
            }}
          >
            {i + 1}
          </button>
        ))}
      </footer>
    </main>
  );
}
