import { Add } from "@mui/icons-material";
import { Paper, Typography, List, Divider, Button, Grid } from "@mui/material";
import { useState } from "react";
// import CardItem from "./ItemCard";
import DialogComponent from "./Dialog";
import { useSelector } from "react-redux";
import CardItem from "./ItemCard";
import { ColumnType, TaskType } from "../type";

const Column: React.FC<ColumnType> = ({ title, columnId, tasks }) => {
  console.log("🚀 ~ file: Column.tsx:11 ~ idColumn:", columnId);
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
          <Typography variant="h6">{title}</Typography>
          <Divider sx={{ py: "10px" }} />
          <List sx={{ pt: "16px" }}>
            {tasks.map((task: TaskType) => (
              <CardItem
                id={task.id}
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
