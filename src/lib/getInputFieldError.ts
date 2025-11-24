export type TInputFieldError = {
  success: boolean;
  errors: {
    field: string;
    message: string;
  }[];
};

export const getInputFieldError = (
  fieldValue: string,
  state: TInputFieldError
) => {
  if (state && state.errors) {
    const error = state.errors.find((err) => err.field === fieldValue);
    return error ? error.message : null;
  }
  return null;
};
