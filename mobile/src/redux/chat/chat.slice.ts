import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Socket, io} from 'socket.io-client';
import {ConstantVariable} from '../../config/constant';
import {Room} from './interfaces/room';
import {FetchStatus} from '../../enum/FetchStatus.enum';

interface ChatStateType {
  socket?: Socket;
  rooms: Room[];
  roomSelected?: Room;
  loadRoomStatus: FetchStatus;
}
const initialState: ChatStateType = {
  loadRoomStatus: FetchStatus.INITIAL,
  rooms: [
    {
      roomId: '154ybydb',
      type: 'NORMAL',
      users: [
        {
          id: '1542 jbds hagdc iu',
          name: 'Anh Anh',
        },
      ],
      lastMessage: {
        content: 'hello',
        time: new Date(1161234332212),
        userId: 'snvbansfb ',
      },
      messages: [],
    },
    {
      roomId: '154ybydbhjj;',
      type: 'NORMAL',
      users: [
        {
          id: '1542 jbds hagdc iu',
          name: 'Anh Anh',
        },
      ],
      lastMessage: {
        content: 'hello',
        time: new Date(1161234332212),
        userId: 'snvbansfb ',
      },
      messages: [],
    },
  ],
};

export const chooseRoomChat = createAsyncThunk<Room, string>(
  'chat/choose_room',
  roomId => {
    return {
      roomId: roomId,
      type: 'NORMAL',
      users: [
        {
          id: '1542 jbds hagdc iu',
          name: 'Anh Anh',
        },
      ],
      lastMessage: {
        content: 'hello',
        time: new Date(1161234332212),
        userId: 'snvbansfb ',
      },
      messages: [
        {
          content: 'hello',
          time: new Date(1361234332212),
          userId: 'snvbansfb ',
        },
        {
          content: 'hellok',
          time: new Date(1161234332212),
          userId: 'snvbanshnkb ',
        },
      ],
    };
  },
);

const chatSlice = createSlice<ChatStateType, any>({
  name: 'chat',
  initialState,
  reducers: {
    initSocket: (state: ChatStateType, action: PayloadAction<Socket>) => {
      state.socket = action.payload;
    },
  },
  extraReducers: build => {
    build.addCase(chooseRoomChat.pending, state => {
      state.loadRoomStatus = FetchStatus.SUBMIT_LOADING;
    });
    build.addCase(chooseRoomChat.rejected, state => {
      state.loadRoomStatus = FetchStatus.SUBMIT_FAIL;
    });
    build.addCase(chooseRoomChat.fulfilled, (state, {payload}) => {
      state.loadRoomStatus = FetchStatus.SUBMIT_SUCCESS;
      state.roomSelected = payload;
    });
  },
});

export const chatReducer = chatSlice.reducer;
export const {initSocket} = chatSlice.actions;
