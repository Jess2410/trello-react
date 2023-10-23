import { createSlice } from "@reduxjs/toolkit";
import { TaskType } from "../type";

interface TasksState {
  tasks: TaskType[];
}

const initialState: TasksState = {
  tasks: [
    {
      id: 1,
      title: "Salut",
      description: "c'est moi la card",
    },
  ],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      return state;
    },
    updateTaskById: (state, action) => {
      const { id, title, description } = action.payload;
      const taskUpdated = state.tasks.find((task) => task.id === id);

      if (taskUpdated) {
        taskUpdated.title = title;
        taskUpdated.description = description;
      }
    },
    deleteTaskById: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      return state;
    },
  },
});

export const { addTask, updateTaskById, deleteTaskById } = tasksSlice.actions;

export default tasksSlice.reducer;
