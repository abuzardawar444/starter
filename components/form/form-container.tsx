"use client";

import { actionFunction } from "@/lib/types";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState = {
  message: "",
  status: "idle",
};

const FormContainer = ({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) => {
  const [state, formAction] = useActionState(action, initialState);
  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    }
    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state.message, state.status]);
  return <form action={formAction}>{children}</form>;
};
export default FormContainer;
