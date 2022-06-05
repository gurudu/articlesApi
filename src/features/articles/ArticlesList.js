import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Spinner } from "../../components/Spinner";

import { fetchAllArticles, getArticles } from "./articlesSlice";

const ArticleExcerpt = ({ article }) => {
  const {
    _id,
    headline: { main }
  } = article;
  return (
    <article className="article-excerpt" key={article.id}>
      <h3>{article.title}</h3>
      <div>{main}</div>
      <p className="article-content">{article.content.substring(0, 100)}</p>

      <Link to={`/article/${_id}`} className="button muted-button">
        View Article
      </Link>
    </article>
  );
};

export const ArticlesList = () => {
  const dispatch = useDispatch();

  const status = useSelector((state) => state);

  const error = useSelector((state) => state.error);

  dispatch(getArticles("test"));

  const articles = useSelector(fetchAllArticles);
  console.log("articles", articles);
  let content;

  if (status === "loading") {
    content = <Spinner text="Loading..." />;
  } else if (status === "succeeded") {
    // Sort articles in reverse chronological order by datetime string

    content = articles.map((article) => (
      <ArticleExcerpt key={article.id} article={article} />
    ));
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }
  console.log("content", content);
  return (
    <section className="articles-list">
      <h2>Articles</h2>
      {content}
    </section>
  );
};
