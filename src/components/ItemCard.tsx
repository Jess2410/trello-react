import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { deleteTaskById } from "../redux/taskSlice";
import { useState } from "react";
import DialogComponent from "./Dialog";
import { deleteTaskToColumn } from "../redux/columnSlice";

type CardProps = {
  title: string;
  description: string;
  taskId?: number | string;
  columnId: number | string;
};

const CardItem: React.FC<CardProps> = ({
  title,
  description,
  taskId,
  columnId,
}) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  const handleClose = () => {
    setEdit(false);
  };

  const deleteTask = (taskId: number | string, columnId: number | string) => {
    dispatch(deleteTaskById(taskId));
    dispatch(deleteTaskToColumn({ columnId, taskId }));
  };

  const updateTask = () => {
    setEdit(!edit);
  };

  return (
    <>
      <Card variant="outlined" sx={{ marginBottom: 2 }}>
        <CardContent
          sx={{
            marginBottom: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography component="h6" variant="h6" sx={{ textAlign: "left" }}>
              {title}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              sx={{ textAlign: "left" }}
            >
              {description}
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={() => updateTask()}>
              <Edit sx={{ color: "#1976D2" }} />
            </IconButton>
            {taskId && (
              <IconButton
                onClick={() => deleteTask(taskId, columnId)}
                sx={{ pr: 0 }}
              >
                <Delete sx={{ color: "#9146D2" }} />
              </IconButton>
            )}
          </Box>
        </CardContent>
      </Card>
      {edit && (
        <DialogComponent
          open={edit}
          onClose={handleClose}
          title={title}
          id={taskId}
          edit={edit}
          description={description}
          columnId={columnId}
        />
      )}
    </>
  );
};

export default CardItem;
