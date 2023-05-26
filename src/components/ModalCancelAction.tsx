import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  open: boolean;
  handleClose(): void;
  handleSubmit(): void;
}

export default function ModalCancelAction({
  open,
  handleClose,
  handleSubmit,
}: Props) {
  //********* Labels *******/

  const LABELS = {
    titulo: "Estas seguro en cancelar la orden?",
    descripcion:
      "Al cancelar la orden, este proceso es irrevercible, por lo cual asegurate de estar totalmente seguro",
    button: {
      acuerdo: "En acuerdo",
      desacuerdo: "En desacuerdo",
    },
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{LABELS.titulo}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {LABELS.descripcion}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{LABELS.button.desacuerdo}</Button>
        <Button onClick={handleSubmit} autoFocus>
          {LABELS.button.acuerdo}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
