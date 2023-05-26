import { useRouter } from "next/router";
// MUI
import { Box, Grid, Button, Typography } from "@mui/material";
// components
import ProductCard from "./ProductsCard";
import LabelField from "../components/FormsInputs/LabelField";
//interfaces
import { DetailOrder } from "@/interfaces/product";
interface DetailOrderProp {
  data: DetailOrder | undefined;
}

export default function DetailCard({ data }: DetailOrderProp) {
  const router = useRouter();
  //*********Labels ***********/
  const LABELS = {
    noData: "No data disponible",
    card: {
      fechaCreacion: "Fecha de Creacion",
      tamanioPaquete: "Tamaño del paquete",
      estatus: "Estatus",
      address: {
        title: "Direccion del destino",
        nombre: "Nombre",
        apellido: "Apellido",
        numeroOrden: "Numero de orden",
        calle: "Calle",
        codigoPostal: "Codigo Postal",
        estado: "Estado",
        ciudad: "Ciudad",
        colonia: "Colonia",
        extNum: "Numero Exterior",
        intNum: "Numero interior",
        telefono: "Telefono",
      },
      productos: {
        title: "Productos",
      },
    },
    boton: "Crear nueva orden",
  };

  return (
    <Box>
      {data === undefined || !data ? (
        <Typography variant="h6" align="center">
          {LABELS.noData}
        </Typography>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <LabelField
              label={LABELS.card.fechaCreacion}
              value={data?.Order?.CreatedAt || "-"}
              alignType={"inherit"}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelField
              label={LABELS.card.tamanioPaquete}
              value={data?.Order?.PackageSize || "-"}
              alignType={"inherit"}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelField
              label="Estatus"
              value={data?.Order?.Status || "-"}
              alignType={"inherit"}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h5" align="center" gutterBottom>
              {LABELS.card.address.title}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelField
              label={LABELS.card.address.nombre}
              value={data?.Order?.DestinationAddress?.FirstName || "-"}
              alignType={"inherit"}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelField
              label={LABELS.card.address.apellido}
              value={data?.Order?.DestinationAddress?.LastName || "-"}
              alignType={"inherit"}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelField
              label={LABELS.card.address.numeroOrden}
              value={data?.Order?.DestinationAddress?.OrderID.toString() || "-"}
              alignType={"inherit"}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelField
              label={LABELS.card.address.calle}
              value={data?.Order?.DestinationAddress?.Street || "-"}
              alignType={"inherit"}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelField
              label={LABELS.card.address.codigoPostal}
              value={data?.Order?.DestinationAddress?.ZipCode || "-"}
              alignType={"inherit"}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelField
              label={LABELS.card.address.estado}
              value={data?.Order?.DestinationAddress?.State || "-"}
              alignType={"inherit"}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelField
              label={LABELS.card.address.ciudad}
              value={data?.Order?.DestinationAddress?.City || "-"}
              alignType={"inherit"}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelField
              label={LABELS.card.address.colonia}
              value={data?.Order?.DestinationAddress?.Neighbourhood || "-"}
              alignType={"inherit"}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelField
              label={LABELS.card.address.extNum}
              value={data?.Order?.DestinationAddress?.ExNumber || "-"}
              alignType={"inherit"}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelField
              label={LABELS.card.address.intNum}
              value={data?.Order?.DestinationAddress?.InNumber || "-"}
              alignType={"inherit"}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelField
              label={LABELS.card.address.telefono}
              value={data?.Order?.DestinationAddress?.PhoneNumber || "-"}
              alignType={"inherit"}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h5" align="center" gutterBottom>
              {LABELS.card.productos.title}
            </Typography>
          </Grid>
          <ProductCard products={data?.Order?.Products} />
          <Grid
            item
            xs={12}
            md={6}
            mt={-2}
            display="flex"
            justifyContent="flex-end"
            minWidth="100%"
          >
            <Button
              variant="contained"
              color="warning"
              sx={{ mt: 5 }}
              onClick={() => router.push("/order/create")}
            >
              {LABELS.boton}
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
