import { api } from "./api";

export const signupHandler = async (username, number, email, password, setAlert) => {
  try {
    await api.post(
      "/api/auth/register",
      {
        username: username,
        number: number,
        email: email,
        password: password,
      }
    );
    setAlert({
      open: true,
      message: `Account Created:: username - ${username}`,
      type: "success"
    });
    return true;
  } catch (err) {
    setAlert({
      open: true,
      message: err?.response?.data?.message || "Unable to create account",
      type: "error",
    });
    return false;
  }
};
