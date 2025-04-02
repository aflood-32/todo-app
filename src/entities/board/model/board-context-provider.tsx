import { Dispatch, PropsWithChildren, use, useEffect, useReducer } from "react";
import { createContext } from "react";

import boardReducer from "../lib/board-reducer";
import { STORAGE_DATA_KEY } from "../lib/storage-data-key";
import {
  BoardActions,
  BoardStateContext as BoardStateContextType,
} from "../types/board-context";

import { boardApi } from "@entities/board";

const BoardStateContext = createContext<BoardStateContextType>([]);
const BoardDispatchContext = createContext<Dispatch<BoardActions>>(() => null);

const BoardContextProvider = ({ children }: PropsWithChildren) => {
  const boardData = use(boardApi.get());
  const [columns, dispatch] = useReducer(boardReducer, boardData);

  useEffect(() => {
    localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(columns));
  }, [columns]);

  return (
    <BoardStateContext.Provider value={columns}>
      <BoardDispatchContext.Provider value={dispatch}>
        {children}
      </BoardDispatchContext.Provider>
    </BoardStateContext.Provider>
  );
};

export { BoardContextProvider, BoardDispatchContext, BoardStateContext };
