import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";

import LocalShipping from "@mui/icons-material/LocalShipping";

export const NavBar = () => {
  const router = useRouter();

  return (
    <AppBar position="static" style={{ background: "#85c440" }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <LocalShipping />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit" onClick={() => router.push("/")}>
            Inicio
          </Button>
          <Button
            color="inherit"
            onClick={() =>
              (window.location.href =
                "https://99minutosworkspace.atlassian.net/wiki/spaces/PT/pages/1371308076/99Minutos+-+Prueba+T+cnica")
            }
          >
            Info Challenge
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
