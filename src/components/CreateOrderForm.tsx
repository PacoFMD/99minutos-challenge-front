import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
// MUI
import { Box, Grid, Typography, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
//components
import TextField from "../components/FormsInputs/TextField";
import NumberField from "../components/FormsInputs/NumberField";
import ProductsFields from "./ProductsFields";
//interfaces
import { ProductsI } from "@/interfaces/product";

interface CreateOrderProp {
  onSubmit(data: any): void;
}

export default function CreateOrderForm(props: CreateOrderProp) {
  /*************** props ***************/
  const { onSubmit } = props;
  /*************** Labels ***************/
  const LABELS = {
    title: "Crear una orden",
    form: {
      destinationAddress: {
        name: "Nombre",
        apellido: "Apellido",
        calle: "Calle",
        codigoPostal: "Codigo Postal",
        estado: "Estado",
        ciudad: "Ciudad",
        colonia: "Colonia",
        extNum: "Numero Exterior",
        intNum: "Numero interior",
        telefono: "Telefono",
      },
      warning: "El peso total de los productos no debera exceder los 25Kg ",
      button: "Crear",
    },
  };

  /*************** Form Validation ***************/

  const ProductsSchema = yup.object().shape({
    Weight: yup.string().required("campo requerido"),
  });

  const DestinationAddressSchema = yup.object().shape({
    FirstName: yup.string().required("nombre requerido"),
    LastName: yup.string().required("apellido requerido"),
    Street: yup.string().required("calle requerida"),
    ZipCode: yup.string().required("codigo postal requerido"),
    State: yup.string().required("calle requerido"),
    City: yup.string().required("ciudad requerido"),
    Neighbourhood: yup.string().required("colonia requerido"),
    ExNumber: yup.string().required("numero exterior requerido"),
    PhoneNumber: yup.string().required("telefono requerido"),
  });

  const schema = yup.object().shape({
    DestinationAddress: DestinationAddressSchema,
    Products: yup.array().of(ProductsSchema),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const {
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const productsWeight = watch("Products");

  /*************** Functions ***************/

  const calculateTotalWeight = () => {
    if (productsWeight) {
      const totalWeight = productsWeight.reduce(
        (sum: any, product: ProductsI) => {
          const weight = parseFloat(product.Weight);
          if (!isNaN(weight)) {
            return sum + weight;
          }
          return sum;
        },
        0
      );
      return totalWeight;
    }
    return 0;
  };

  return (
    <FormProvider {...methods}>
      <Typography variant="h5" align="center" gutterBottom>
        {LABELS.title}
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label={LABELS.form.destinationAddress.name}
              name={"DestinationAddress.FirstName"}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label={LABELS.form.destinationAddress.apellido}
              name={"DestinationAddress.LastName"}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label={LABELS.form.destinationAddress.calle}
              name={"DestinationAddress.Street"}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberField
              label={LABELS.form.destinationAddress.codigoPostal}
              name={"DestinationAddress.ZipCode"}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label={LABELS.form.destinationAddress.estado}
              name={"DestinationAddress.State"}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label={LABELS.form.destinationAddress.ciudad}
              name={"DestinationAddress.City"}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label={LABELS.form.destinationAddress.colonia}
              name={"DestinationAddress.Neighbourhood"}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberField
              label={LABELS.form.destinationAddress.extNum}
              name={"DestinationAddress.ExNumber"}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label={LABELS.form.destinationAddress.intNum}
              name={"DestinationAddress.InNumber"}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberField
              label={LABELS.form.destinationAddress.telefono}
              name={"DestinationAddress.PhoneNumber"}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Alert severity="warning">{LABELS.form.warning}</Alert>
          </Grid>
          <Grid item xs={12} md={12}>
            <ProductsFields kgValue={calculateTotalWeight()} />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            mt={-2}
            display="flex"
            justifyContent="flex-end"
            minWidth="100%"
          >
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ mt: 5 }}
            >
              {LABELS.form.button}
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
}
