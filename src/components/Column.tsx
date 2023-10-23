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

const Column: React.FC<ColumnType> = ({ title, columnId, tasks }) => {
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <Grid item xs={4} key={columnId}>
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
            {tasks.map((task: TaskType) => (
              <CardItem
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
