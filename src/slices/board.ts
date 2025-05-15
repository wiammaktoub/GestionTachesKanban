import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import checkEnvironment from '@/util/check-environment';
import { BoardSlice } from '@/src/types/boards';

const initialState = {
  board: {
    _id: '',
    name: '',
    columns: [],
    createdBy: '',
    dateCreated: ''
  },
  status: 'idle',
  doneFetching: true,
  error: ''
};

const host = checkEnvironment();

export const createBoard = createAsyncThunk('board/create', async (obj, { getState }) => {
  const { board } = getState() as { board: BoardSlice };

  const data = {
    _id: board.board._id,
    name: board.board.name,
    dateCreated: board.board.dateCreated,
    createdBy: board.board.createdBy,
    columns: []
  };

  const url = `${host}/api/boards`;

  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });

  const inJSON = await response.json();
  return inJSON;
});

export const boardSlice = createSlice({
  name: 'board',
  initialState: initialState,
  reducers: {
    updateBoardDetail: (state, { payload }) => {
      state.board[payload.type] = payload.value;
    },
    resetBoard: () => initialState
  },
  extraReducers: {
    [createBoard.pending.toString()]: (state) => {
      state.status = 'pending';
    },
    [createBoard.fulfilled.toString()]: (state) => {
      state.status = 'success';
    },
    [createBoard.rejected.toString()]: (state) => {
      state.status = 'failed';
    }
  }
});

export const { updateBoardDetail, resetBoard } = boardSlice.actions;

export default boardSlice.reducer;
