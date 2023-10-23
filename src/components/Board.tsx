import { useEffect, useState } from "react";
import Column from "./Column";
import TextField from "@mui/material/TextField";
import { Add } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ColumnType } from "../type";
import { addColumn } from "../redux/columnSlice";
import { v4 as uuidv4 } from "uuid";

const Board = () => {
  const initColumn: ColumnType = {
    id: "",
    title: "",
    tasks: [],
  };
  const { columns } = useSelector((state) => state.columns);
  console.log("🚀 ~ file: Board.tsx:19 ~ Board ~ columns:", columns);
  const dispatch = useDispatch();
  const [newColumn, setNewColumn] = useState(initColumn);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewColumn({ ...newColumn, [name]: value });
  };
  const createColumn = (e: any) => {
    e.preventDefault();
    const key = uuidv4();
    dispatch(addColumn({ ...newColumn, id: key }));
    // onClose();
  };
  console.log("🚀 ~ file: Board.tsx:9 ~ Board ~ columns:", columns);

  return (
    <div style={{ padding: "16px" }}>
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
          <Add onClick={createColumn} />
        </Button>
      </Box>
      <Grid container spacing={2}>
        {columns.map((column) => (
          <Column
            key={column.id}
            columnId={column.id}
            title={column.title}
            tasks={column.tasks}
          />
        ))}
      </Grid>
    </div>
  );
};

export default Board;
