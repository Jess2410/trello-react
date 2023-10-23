import { useState } from "react";
import Column from "./Column";
import TextField from "@mui/material/TextField";
import { Add } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ColumnType } from "../type";
import { addColumn } from "../redux/columnSlice";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../redux/store";

const Board = () => {
  const initColumn: ColumnType = {
    columnId: "",
    title: "",
    tasks: [],
  };
  const { columns } = useSelector((state: RootState) => state.columns);

  const dispatch = useDispatch();
  const [newColumn, setNewColumn] = useState(initColumn);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewColumn({ ...newColumn, [name]: value });
  };
  const createColumn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (newColumn.title.trim() === "") {
      alert("Veuillez saisir un titre de colonne !");
    } else {
      const key = uuidv4();
      dispatch(addColumn({ ...newColumn, id: key }));
    }
  };

  return (
    <div style={{ padding: "16px", maxWidth: 1280, margin: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          background: "#fff",
          maxHeight: "0.8 rem",
        }}
      >
        <TextField
          autoFocus
          id="title"
          name="title"
          label="Nouvelle colonne"
          onChange={handleChange}
          type="text"
          sx={{ m: 1 }}
        />
        <Button variant="contained" sx={{ m: 1 }} onClick={createColumn}>
          <Add />
        </Button>
      </Box>
      <Grid container spacing={2}>
        {columns.map((column: ColumnType) => (
          <Column
            key={column.columnId}
            columnId={column.columnId}
            title={column.title}
            tasks={column.tasks}
          />
        ))}
      </Grid>
    </div>
  );
};

export default Board;
