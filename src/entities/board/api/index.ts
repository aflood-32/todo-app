import { Column } from "@entities/column/@x";
import { Task } from "@entities/task/@x";

const boardApi = {
  get: () => {
    const getTasks = (() => {
      let count = 0;

      return function getTasks(amount: number): Task[] {
        return Array.from({ length: amount }, (): Task => {
          const id = count++;
          return {
            id: `task ${id.toString()}`,
            title: `Task ${id.toString()}`,
          };
        });
      };
    })();

    const columns: Column[] = [
      { id: "a", title: "Column A", tasks: getTasks(60) },
      { id: "b", title: "Column B", tasks: getTasks(4) },
      { id: "c", title: "Column C", tasks: getTasks(30) },
      { id: "d", title: "Column D", tasks: getTasks(12) },
      { id: "e", title: "Column E", tasks: getTasks(0) },
      { id: "f", title: "Column F", tasks: getTasks(44) },
      { id: "g", title: "Column G", tasks: getTasks(4) },
      { id: "h", title: "Column H", tasks: getTasks(8) },
      { id: "i", title: "Column I", tasks: getTasks(30) },
    ];

    return columns;
  },
};

export default boardApi;
