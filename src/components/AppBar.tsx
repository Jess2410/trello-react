import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box, Typography } from "@mui/material";

export default function AppBarComponent() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              flexGrow: 1,
              textTransform: "uppercase",
              letterSpacing: 1,
              textAlign: "center",
            }}
          >
            Trello Project
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
