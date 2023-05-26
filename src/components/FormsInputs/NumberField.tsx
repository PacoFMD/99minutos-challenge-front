import { Controller, useFormContext } from "react-hook-form";
// MUI
import { TextField, Grid } from "@mui/material";
// Interfaces
import { FieldProps } from "../../interfaces/field";

export default function NumberField(props: FieldProps) {
  const { name, label, readOnly, show = true, ...restProps } = props;

  /*************** useForm ***************/
  const { control } = useFormContext();

  if (show) {
    return (
      <Grid item {...restProps}>
        <Controller
          name={name}
          control={control}
          shouldUnregister
          render={({ field, fieldState: { error: errorField } }) => (
            <TextField
              {...field}
              value={field?.value || ""}
              label={label}
              id={name}
              error={!!errorField}
              helperText={errorField?.message}
              type="number"
              disabled={readOnly}
              fullWidth
            />
          )}
        />
      </Grid>
    );
  }
  return null;
}
