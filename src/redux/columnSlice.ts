import { createSlice } from "@reduxjs/toolkit";
import { ColumnType } from "../type";

interface ColumnsState {
  columns: ColumnType[];
}

const initialState: ColumnsState = {
  columns: [
    {
      columnId: 1,
      title: "Colonne1",
      tasks: [
        {
          id: 1,
          title: "Salut",
          description: "c'est moi la card",
          columnId: 1,
        },
        {
          id: 2,
          title: "Re salut",
          description: "Re c'est moi la card",
          columnId: 1,
        },
      ],
    },
    {
      columnId: 2,
      title: "Colonne2",
      tasks: [
        {
          id: 1,
          title: "Hola",
          description: "c'est moi la card",
          columnId: 2,
        },
        {
          id: 2,
          title: "Hello",
          description: "Re c'est moi la card",
          columnId: 2,
        },
        {
          id: 3,
          title: "Hey",
          description: "Re c'est moi la card",
          columnId: 2,
        },
      ],
    },
  ],
};

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    addColumn: (state, action) => {
      state.columns.push(action.payload);
      return state;
    },

    addTaskToColumn: (state, action) => {
      const { columnId, task } = action.payload;
      const column = state.columns.find((col) => col.columnId === columnId);
      if (column) {
        column.tasks.push(task);
      }
    },
    updateTaskToColumn: (state, action) => {
      const { columnId, taskId, title, description } = action.payload;
      const column = state.columns.find((col) => col.columnId === columnId);
      if (column) {
        const taskUpdated = column.tasks.find((task) => task.id === taskId);

        if (taskUpdated) {
          taskUpdated.title = title;
          taskUpdated.description = description;
        }
      }
    },

    deleteColumnById: (state, action) => {
      state.columns = state.columns.filter(
        (column) => column.columnId !== action.payload
      );
      return state;
    },
    deleteTaskToColumn: (state, action) => {
      const { columnId, taskId } = action.payload;
      const column = state.columns.find((col) => col.columnId === columnId);
      if (column) {
        column.tasks = column.tasks.filter((task) => task.id !== taskId);
      }
    },
  },
});

export const {
  addColumn,
  addTaskToColumn,
  updateTaskToColumn,
  deleteColumnById,
  deleteTaskToColumn,
} = columnsSlice.actions;

export default columnsSlice.reducer;
