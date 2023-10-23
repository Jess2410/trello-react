export type ColumnType = {
  columnId: number | string;
  title: string;
  tasks: TaskType[];
};

export type TaskType = {
  id: number | string;
  title: string;
  description: string;
};
