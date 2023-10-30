import { Add } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Paper,
  Box,
  Typography,
  List,
  Divider,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import DialogComponent from "./Dialog";
import CardItem from "./ItemCard";
import { ColumnType, TaskType } from "../type";
import { deleteColumnById } from "../redux/columnSlice";
import { useDispatch } from "react-redux";
import useDragAndDrop from "../hooks/useDragAndDrop";

const Column: React.FC<ColumnType> = ({
  title,
  columnId,
  tasks: tasksProps,
  onDragEndColumn,
  onDragStart: onDragStartColumn,
  onDragEnter: onDragEnterColumn,
}) => {
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);

  const {
    positionStart,
    positionEnter,
    setPositionStart,
    setPositionEnter,
    onDragStart,
    onDragEnter,
  } = useDragAndDrop();

  const [tasks, setTasks] = useState(tasksProps);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const onDrop = () => {
    const copyTasks = [...tasks];

    const getItemByPositionStart = copyTasks[positionStart];
    const getItemByPositionEnter = copyTasks[positionEnter];

    if (!getItemByPositionStart || !getItemByPositionEnter) {
      return;
    }

    copyTasks[positionEnter] = getItemByPositionStart;
    copyTasks[positionStart] = getItemByPositionEnter;

    setTasks(copyTasks);
    setPositionStart(0);
    setPositionEnter(0);
  };

  return (
    <>
      <Grid
        item
        xs={4}
        key={columnId}
        onDragStart={onDragStartColumn}
        onDragEnter={onDragEnterColumn}
        onDragEnd={onDragEndColumn}
        draggable
      >
        <Paper elevation={3} sx={{ padding: "18px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">{title}</Typography>
            <IconButton
              aria-label="delete"
              onClick={() => dispatch(deleteColumnById(columnId))}
              sx={{ pr: 0 }}
            >
              <ClearIcon sx={{ color: "#9146D2" }} />
            </IconButton>
          </Box>
          <Divider sx={{ py: "10px" }} />

          <List sx={{ pt: "16px" }}>
            {tasks.map((task: TaskType, index: number) => (
              <CardItem
                onDragStart={() => onDragStart(index)}
                onDragEnter={() => onDragEnter(index)}
                onDragEnd={onDrop}
                taskId={task.id}
                key={task.id}
                title={task.title}
                description={task.description}
                columnId={columnId}
              />
            ))}
          </List>
          <Button
            startIcon={<Add />}
            variant="contained"
            fullWidth
            onClick={handleClickOpen}
          >
            Ajouter une tâche
          </Button>
        </Paper>
      </Grid>
      {openDialog && (
        <DialogComponent
          open={openDialog}
          onClose={handleClose}
          columnId={columnId}
        />
      )}
    </>
  );
};

export default Column;
