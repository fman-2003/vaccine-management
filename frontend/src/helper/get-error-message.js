// Turns any error thrown by an axios request into a message that is safe to show.
//
// The server's error bodies aren't all the same shape:
//   401/404/409/429/500 -> { message: "..." }
//   422 (validation)    -> { errors: [{ msg, path, ... }] }   (no `message`)
// and when no response arrives at all (CORS rejection, server down/asleep,
// offline) `error.response` is undefined. Reading `error.response.data.message`
// directly gives `undefined` in the 422 case and throws in the no-response case.
export function getErrorMessage(error) {
  const data = error?.response?.data;

  if (data?.message) return data.message;
  if (data?.errors?.length) return data.errors[0].msg;
  if (error?.response) return `Request failed (${error.response.status})`;
  if (error?.request) {
    return "Can't reach the server. Check your connection and try again.";
  }
  return error?.message || "Something went wrong";
}

// Field-level validation errors from a 422 response, or undefined.
export function getValidationErrors(error) {
  return error?.response?.status === 422
    ? error.response.data?.errors
    : undefined;
}
