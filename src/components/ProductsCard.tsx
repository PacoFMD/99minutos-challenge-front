// MUI
import { Box, Typography, Grid } from "@mui/material";
//components
import LabelField from "./FormsInputs/LabelField";
//interfaces
import { DetailProducts } from "@/interfaces/product";
interface Props {
  products: DetailProducts[];
}

export default function ProductCard({ products }: Props) {
  const LABELS = {
    noData: "no hay productos",
    data: {
      number: "#",
      fecha: "Fecha de Creacion",
      peso: "Peso",
      orden: "Numero de orden",
    },
  };

  return (
    <Box width={"100%"}>
      {products?.length > 0 ? (
        products?.map((product, idx) => {
          return (
            <Grid container key={idx} paddingBottom={2} paddingLeft={5}>
              <Grid item xs={12} md={3}>
                <LabelField
                  label={LABELS.data.number}
                  value={idx.toString() || "-"}
                  alignType={"inherit"}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <LabelField
                  label={LABELS.data.fecha}
                  value={product?.CreatedAt || "-"}
                  alignType={"inherit"}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <LabelField
                  label={LABELS.data.peso}
                  value={product?.Weight.toString() + "Kg" || "-"}
                  alignType={"inherit"}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <LabelField
                  label={LABELS.data.orden}
                  value={product?.OrderID.toString() || "-"}
                  alignType={"inherit"}
                />
              </Grid>
            </Grid>
          );
        })
      ) : (
        <Grid item xs={12} md={12}>
          <Typography variant="h5" align="center" gutterBottom>
            {LABELS.noData}
          </Typography>
        </Grid>
      )}
    </Box>
  );
}
