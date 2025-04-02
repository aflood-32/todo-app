import { STORAGE_DATA_KEY } from "../lib/storage-data-key";

import { Column } from "@entities/column/@x";

let boardDataPromise: Promise<Column[]> | null = null;

const boardApi = {
  get: (): Promise<Column[]> => {
    boardDataPromise ??= new Promise((resolve, reject) => {
      try {
        const savedState = localStorage.getItem(STORAGE_DATA_KEY);

        resolve((savedState ? JSON.parse(savedState) : []) as Column[]);
      } catch (e) {
        console.error(e);
        reject(new Error("Failed to fetch board data"));
      }
    });

    return boardDataPromise;
  },
};

export default boardApi;
