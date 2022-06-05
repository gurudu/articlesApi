import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";
const axios = require("axios");
const API_URL =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json?&api-key=CpveeaLyggF34PU7nIyCmSx59BNWGi8L";

const initialState = {
  articles: [],
  status: "idle",
  error: null
};

/*export const fetchArticles = async () => {
  const response = await axios.get(
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?&api-key=CpveeaLyggF34PU7nIyCmSx59BNWGi8L"
  );
  return response.data.response.docs;
};*/

const articlesSlice = createSlice({
  name: "allArticles",
  initialState,
  reducers: {
    addArticles(state, action) {
      state.push(action.payload);
    }
  }
});
export const { addArticles } = articlesSlice.actions;

export const getArticles = (data) => async (dispatch) => {
  try {
    // console.log(data);
    const response = await axios.get(`${API_URL}`); // {API_URL}/${data}
    console.log("response", response);
    dispatch(addArticles(response.articles));
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllArticles = (state) => state.allArticles;

export const fetchArticleById = (state, articleId) =>
  state.allArticles.articles.find((article) => article.id === articleId);

export default articlesSlice.reducer;
