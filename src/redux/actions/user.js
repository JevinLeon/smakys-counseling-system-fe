import axios from "axios";
import { toast } from "sonner";
import { setUsers, setUser, setIsLoading } from "../reducers/user";

export const getUsers = () => async (dispatch, getState) => {
  const { token } = getState().auth;
  dispatch(setIsLoading(true));

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/users`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { data } = res.data;

    dispatch(setUsers(data));
  } catch (error) {
    toast(error?.response?.data?.message || "Error occured!");
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const getUser = (id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  dispatch(setIsLoading(true));

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/users/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { data } = res.data;

    dispatch(setUser(data));
  } catch (error) {
    toast(error?.response.data.message);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const addUser = (setOpen, data) => async (dispatch, getState) => {
  const { token } = getState().auth;

  dispatch(setIsLoading(true));

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_API}/api/users`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const UserRes = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/users`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const { data: UserData } = UserRes.data;
    const { message } = res.data;
    toast(message);
    dispatch(setUsers(UserData));
  } catch (error) {
    toast(error?.response.data.message);
  } finally {
    dispatch(setIsLoading(false));
    setOpen(false);
  }
};

export const editUser = (setOpen, data, id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  dispatch(setIsLoading(true));

  try {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_API}/api/users/${id}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const UserRes = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/users/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { data: UserData } = UserRes.data;
    const { message } = res.data;
    toast(message);
    dispatch(setUser(UserData));
  } catch (error) {
    toast(error?.response.data.message);
  } finally {
    dispatch(setIsLoading(false));
    setOpen(false);
  }
};

export const deleteUser =
  (navigate, setOpen, id) => async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch(setIsLoading(true));

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/api/users/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { message } = res.data;
      toast(message);
    } catch (error) {
      toast(error?.response.data.message);
    } finally {
      dispatch(setIsLoading(false));
      setOpen(false);
      navigate("/users");
    }
  };
