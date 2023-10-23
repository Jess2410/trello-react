import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useDispatch } from "react-redux";
import { addTask, updateTaskById } from "../redux/taskSlice";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { TaskType } from "../type";
import { addTaskToColumn } from "../redux/columnSlice";

type DialogComponentProps = {
  open: boolean;
  onClose: () => void;
  edit?: boolean;
  title?: string;
  description?: string;
  id?: number | string;
  columnId?: number | string;
};

const DialogComponent: React.FC<DialogComponentProps> = ({
  open,
  onClose,
  title,
  description,
  edit,
  id,
  columnId,
}) => {
  const initCard: TaskType = {
    id: "",
    title: "",
    description: "",
  };
  const dispatch = useDispatch();
  const [newCard, setNewCard] = useState(initCard);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };
  const createTask = (e) => {
    e.preventDefault();
    const key = uuidv4();
    const newTask = { ...newCard, id: key };

    dispatch(addTask(newTask));

    dispatch(addTaskToColumn({ columnId: columnId, task: newTask }));

    onClose();
  };

  const editTask = (e) => {
    e.preventDefault;
    dispatch(
      updateTaskById({
        id: id,
        title: newCard.title,
        description: newCard.description,
      })
    );
    onClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <DialogContentText>{newCard.title}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Titre"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={title || newCard.title}
            onChange={handleChange}
          />

          <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={description || newCard.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Annuler</Button>
          {edit ? (
            <Button onClick={editTask}>Modifier</Button>
          ) : (
            <Button onClick={createTask}>Créer</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DialogComponent;
