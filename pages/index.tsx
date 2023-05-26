import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/order/create");
    // eslint-disable-next-line
  }, []);

  return null;
}
