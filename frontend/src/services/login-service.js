import { api } from "./api";

export const loginHandler = async (number, password, setAlert) => {
  try {
    const {
      data: { accessToken, username, role },
    } = await api.post(
      "/api/auth/login",
      {
        number: number,
        password: password,
      }
    );
    console.log("Logged IN");
    console.log({ accessToken, username });
    localStorage.setItem("token", accessToken);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role || "user");
    setAlert({
      open: true,
      message: "Login Successful!",
      type: "success"
    });
    return { accessToken, username, role };
  } catch (err) {
    setAlert({
      open: true,
      message: err?.response?.data?.message || "Unable to login",
      type: "error",
    });
    return null;
  }
};
