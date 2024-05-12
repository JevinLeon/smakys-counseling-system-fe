import axios from "axios";
import { setIsLoading, setToken, setUser } from "../reducers/auth";
import { toast } from "sonner";

export const login = (navigate, username, password) => async (dispatch) => {
  dispatch(setIsLoading(true));

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_API}/api/auth/login`,
      { username, password }
    );

    const {
      data: { token, user },
    } = res.data;

    dispatch(setToken(token));
    dispatch(setUser(user));

    return navigate("/");
  } catch (error) {
    toast.error(error?.response?.data?.message || "Error occured!");
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const getProfile =
  (navigate, successRedirect, errorRedirect) => async (dispatch, getState) => {
    const { token } = getState().auth;

    if (!token) {
      if (navigate) {
        if (errorRedirect) {
          navigate(errorRedirect);
        }
      }
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/auth/profile`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { data } = res.data;

      dispatch(setUser(data));

      if (navigate) {
        if (successRedirect) {
          navigate(successRedirect);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error occured!");
      dispatch(logout());

      if (navigate) {
        if (errorRedirect) {
          navigate(errorRedirect);
        }
      }
    }
  };

export const logout = (navigate) => async (dispatch) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
  return navigate("/login");
};
