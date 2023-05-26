import { useState } from "react";
import { AxiosResponse } from "axios";

interface interfaceSubmit<Params = any, Response = any> {
  api(data: Params): Promise<AxiosResponse>;
  onSuccess?(dataResponse: Response): void;
  onError?(dataError: any): void;
  onFinally?(): void;
}

interface ReturnProps<Params = any, Response = any> {
  handleSubmit(data: Params): Promise<void>;
  isSubmitting: boolean;
  dataResponse: Response | null;
}

const useSubmit = <Params = any, Response = any>({
  api,
  onSuccess,
  onError,
  onFinally,
}: interfaceSubmit<Params, Response>): ReturnProps<Params, Response> => {
  /*************** States ***************/
  const [dataResponse, setDataResponse] = useState<Response | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /*************** Functions ***************/
  const handleSubmit = async (dataRequest: Params) => {
    let dataResponse = null;
    try {
      setIsSubmitting(true);
      // to recieve any type of requests put/post/delete
      const { data } = await api(dataRequest);
      dataResponse = data;
      setDataResponse(data);
      onSuccess && onSuccess(data);
    } catch (error: any) {
      onError && onError(error);
    } finally {
      setIsSubmitting(false);
      onFinally && onFinally();
      return dataResponse;
    }
  };

  return {
    handleSubmit,
    isSubmitting,
    dataResponse,
  };
};

export default useSubmit;
