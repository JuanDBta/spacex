import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/qiKtD5mkwRN26fLwBUzY/books/';

export const getBooks = createAsyncThunk('books/getBooks',
  async (_, thunkAPI) => {
    try {
      const res = await axios(url);
      const resp = res.data;
      const array = Object.values(resp);
      const id = Object.keys(resp);
      const newArray = array.map((ele, i) => ({
        ...ele[0],
        item_id: id[i],
      }));
      return newArray;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });

export const addBooks = createAsyncThunk('books/addBooks',
  async (newBook, thunkAPI) => {
    try {
      const res = await axios.post(url, newBook);
      const addedBook = {
        ...newBook,
        item_id: res.data.name, // Assuming the response contains the item_id
      };
      thunkAPI.dispatch(getBooks());
      return addedBook;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });

export const deleteBook = createAsyncThunk('books/deleteBook',
  async (item_id, thunkAPI) => {// eslint-disable-line
    try {
      await axios.delete(`${url}${item_id}`);// eslint-disable-line
      thunkAPI.dispatch(getBooks());
      return item_id;// eslint-disable-line
    } catch (error) {
      const {
        message, name, code, config, request,
      } = error;
      return thunkAPI.rejectWithValue({
        message, name, code, config, request,
      });
    }
  });

const initialState = {
  books: [],
  isLoading: false,
  error: undefined,
  addNew: false,
  deleted: false,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooks.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.books = payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.name;
      })
      .addCase(addBooks.pending, (state) => {
        state.addNew = undefined;
      })
      .addCase(addBooks.fulfilled, (state) => {
        state.addNew = true;
      })
      .addCase(addBooks.rejected, (state) => {
        state.addNew = false;
      })
      .addCase(deleteBook.pending, (state) => {
        state.deleted = false;
      })
      .addCase(deleteBook.fulfilled, (state) => {
        state.deleted = true;
      })
      .addCase(deleteBook.rejected, (state) => {
        state.deleted = false;
      });
  },
});

export default bookSlice.reducer;
