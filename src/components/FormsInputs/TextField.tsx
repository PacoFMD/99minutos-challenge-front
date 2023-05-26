import { Controller, useFormContext } from "react-hook-form";
// MUI
import { TextField as MuiTextField, Grid } from "@mui/material";
// Interfaces
import { FieldProps } from "../../interfaces/field";

export default function TextField(props: FieldProps) {
  const { name, label, readOnly, show = true, ...restProps } = props;

  /*************** useForm ***************/
  const { control } = useFormContext();

  if (show) {
    return (
      <Grid item {...restProps}>
        <Controller
          name={name}
          control={control}
          defaultValue={""}
          shouldUnregister
          render={({ field, fieldState: { error: errorField } }) => (
            <MuiTextField
              {...field}
              label={label}
              id={name}
              error={!!errorField}
              helperText={errorField?.message}
              type="text"
              fullWidth
              required={true}
              disabled={readOnly}
            />
          )}
        />
      </Grid>
    );
  }
  return null;
}
