import { STORAGE_DATA_KEY } from "../lib/storage-data-key";

import { ColumnType } from "@entities/column/@x";

let boardDataPromise: Promise<ColumnType[]> | null = null;

const boardApi = {
  get: (): Promise<ColumnType[]> => {
    boardDataPromise ??= new Promise((resolve, reject) => {
      try {
        const savedState = localStorage.getItem(STORAGE_DATA_KEY);

        resolve((savedState ? JSON.parse(savedState) : []) as ColumnType[]);
      } catch (e) {
        console.error(e);
        reject(new Error("Failed to fetch board data"));
      }
    });

    return boardDataPromise;
  },
};

export default boardApi;
