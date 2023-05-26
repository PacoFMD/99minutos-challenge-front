// MUI
import { Box, Typography, Grid, Tooltip } from "@mui/material";
interface Props {
  label: string;
  value: string;
  alignType: string;
}

export default function LabelField({ label, value, alignType }: Props) {
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" alignItems="center">
        <Tooltip title={value}>
          <Typography
            sx={{ textAlign: alignType }}
            variant="h6"
            noWrap
            mr={0.5}
          >
            {label}
          </Typography>
        </Tooltip>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={6} md={6}>
          <Box>
            <Typography color="GrayText" mt={-0.5} noWrap>
              {value}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
