import { useFormContext, useFieldArray } from "react-hook-form";
// MUI
import { Grid, Typography, Button, Stack } from "@mui/material";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
//components
import NumberField from "../components/FormsInputs/NumberField";

interface Props {
  kgValue: number;
}

export default function ProductsFields({ kgValue }: Props) {
  //**** Labels *****/

  const LABELS = {
    title: "Agregar productos",
    button: {
      add: "Agregar",
      remove: "Remover",
    },
    peso: "Peso",
    noData: "Sin productos",
  };

  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control: control,
    keyName: "Products",
    name: "Products",
  });

  const handleAddProduct = () => {
    append({
      Weight: null,
    });
  };

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction={"row"} spacing={1}>
          <Typography variant="h6">{LABELS.title}</Typography>
          <Typography
            variant="h6"
            color={kgValue >= 25 ? "red" : "black"}
          >{`[${kgValue}/25kg]`}</Typography>
        </Stack>
        <Button
          onClick={handleAddProduct}
          variant="outlined"
          color="info"
          startIcon={<Add />}
        >
          {LABELS.button.add}
        </Button>
      </Grid>
      <Grid item xs={12} pl={0.5}>
        {fields.length <= 0 ? (
          <Typography color="text.secondary">{LABELS.noData} </Typography>
        ) : (
          fields.map((field, index) => {
            return (
              <Grid
                key={index}
                container
                item
                xs={12}
                mt={index > 0 ? 2 : undefined}
              >
                <Grid key={index} container item xs={12} spacing={2} mt={2}>
                  <Grid container>
                    <NumberField
                      name={`Products.${index}.Weight`}
                      label={LABELS.peso}
                      xs={12}
                    />
                  </Grid>
                  <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <Button
                      onClick={() => remove(index)}
                      color="error"
                      startIcon={<Remove />}
                    >
                      {LABELS.button.remove}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            );
          })
        )}
      </Grid>
    </Grid>
  );
}
