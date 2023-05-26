import { useRouter } from "next/router";
// MUI
import { Container, Alert, Snackbar } from "@mui/material";
import Paper from "@mui/material/Paper";
import CreateOrderForm from "@/components/CreateOrderForm";
//interface
import { CreateOrder } from "@/interfaces/product";
//hoook
import useSubmit from "@/hooks/useSubmit";
//service
import { createOrder } from "@/services/api/order";
import { useState } from "react";

export default function CreateOrder() {
  const router = useRouter();

  //*********LABELS *************/
  const LABELS = {
    actions: {
      success: "Success",
      error: "Un error ocurrio, favor de comunicarse con el administrador",
    },
  };

  //********* States *************/
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [openError, setOpenError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  //*********Functions *************/

  const handleOnError = (error: any) => {
    setError(error.request.response);
    setOpenError(true);
  };

  const handleOnSucces = (data: any) => {
    if (data?.Order) {
      setOpenSuccess(true);
      router.push(`/order/${data.Order.ID}`);
    } else {
      setError(data.Message);
      setOpenError(true);
    }
  };

  const { handleSubmit } = useSubmit<CreateOrder>({
    api: createOrder,
    onSuccess: (data) => handleOnSucces(data),
    onError: handleOnError,
  });

  return (
    <Container maxWidth="xl">
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mt: 3,
          maxWidth: "100%",
        }}
      >
        <CreateOrderForm onSubmit={handleSubmit} />
      </Paper>
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={() => setOpenSuccess(false)}
      >
        <Alert
          onClose={() => setOpenSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {LABELS.actions.success}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={() => setOpenError(false)}
      >
        <Alert
          onClose={() => setOpenError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error === null ? LABELS.actions.error : error}
        </Alert>
      </Snackbar>
    </Container>
  );
}
