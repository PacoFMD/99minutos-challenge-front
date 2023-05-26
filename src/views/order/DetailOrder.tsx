import React, { useState, useEffect } from "react";
import api from "@/config/axios";
import { useRouter } from "next/router";
// MUI
import {
  Container,
  Alert,
  Snackbar,
  Typography,
  Box,
  Skeleton,
  Tooltip,
  Toolbar,
  IconButton,
  Paper
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/CancelScheduleSendTwoTone";
//interface
import { CreateOrder, DetailOrder } from "@/interfaces/product";
//hoook
import useSubmit from "@/hooks/useSubmit";
//service
import { cancelOrder } from "@/services/api/order";
// components
import DetailCard from "@/components/DetailCard";
import ModalCancelAction from "@/components/ModalCancelAction";

export default function CreateOrder() {
  const {
    query: { id },
  } = useRouter();

  //********* LABELS *************/

  const LABELS = {
    title: 'Seguimiento del Producto: ',
    actions:{
      success: 'Success',
      error: 'Un error ocurrio, favor de comunicarse con el administrador'
    }
  }

  //********* States *************/
  const [data, setData] = useState<DetailOrder>();
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [openError, setOpenError] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);

  //*********Functions *************/
  const handleOnError = (error: any) => {
    setOpenError(true);
    console.log(error);
  };
  const handleOnSucces = (id: number) => {
    setOpenSuccess(true);
  };
  const handleSubmitActionModal = () => {
    handleSubmit(id);
    setOpenModal(false);
  };

  const { handleSubmit, isSubmitting } = useSubmit({
    api: () => cancelOrder(id),
    onSuccess: (data) => handleOnSucces(data.Order.ID),
    onError: handleOnError,
  });

  //*** Fetcha Data ****/
  const fetchData = async (url: string) => {
    try {
      setIsFetching(true);
      const response = await api.get(url);
      setData(response.data);
    } catch (error) {
      // errores de solicitud aquí
      console.error("Error al obtener los datos:", error);
    } finally {
      setIsFetching(false);
    }
  };

  //*********lifeCycle *************/

  useEffect(() => {
    if (id) {
      fetchData(`/orders/${id}`);
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (isSubmitting) {
      fetchData(`/orders/${id}`);
    }
    // eslint-disable-next-line
  }, [isSubmitting]);

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
        {isFetching ? (
          <Box>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        ) : (
          <>
            <Toolbar>
              <Typography
                variant="h5"
                style={{ flex: 1, textAlign: "center" }}
                gutterBottom
              >{LABELS.title + id}</Typography>
              {data && data?.Order.Status !== "cancelado" && (
                <Tooltip title="cancelar orden">
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => setOpenModal(true)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Toolbar>
            <DetailCard data={data} />
          </>
        )}
      </Paper>
      <ModalCancelAction
        open={openModal}
        handleSubmit={handleSubmitActionModal}
        handleClose={() => setOpenModal(false)}
      />
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
          {LABELS.actions.error}
        </Alert>
      </Snackbar>
    </Container>
  );
}
