import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "../features/posts/postsSlice";
import articlesReducer from "../features/articles/articlesSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
    articles: articlesReducer
  }
});
