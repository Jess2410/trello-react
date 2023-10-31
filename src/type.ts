export type ColumnType = {
  columnId: number | string;
  title: string;
  tasks: TaskType[];
  onDragStart?: () => void;
  onDragEnter?: () => void;
  onDragEndColumn?: () => void;
};

export type TaskType = {
  id: number | string;
  title: string;
  description: string;
  columnId: number | string;
};
