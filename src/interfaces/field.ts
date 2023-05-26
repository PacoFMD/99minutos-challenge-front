import { GridProps } from "@mui/material/Grid";

export interface FieldProps {
  name: string;
  label: string;
  readOnly?: boolean;
  show?: boolean;
  xs?: GridProps["xs"];
  sm?: GridProps["sm"];
  md?: GridProps["md"];
  lg?: GridProps["lg"];
  xl?: GridProps["xl"];
}
