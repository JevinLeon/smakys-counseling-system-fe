import axios from "axios";
import { toast } from "sonner";
import { setClasses, setClass, setIsLoading } from "../reducers/class";

export const getClasses = () => async (dispatch, getState) => {
  const { token } = getState().auth;
  dispatch(setIsLoading(true));

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/classes`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { data } = res.data;

    dispatch(setClasses(data));
  } catch (error) {
    toast(error?.response?.data?.message || "Error occured!");
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const getClass = (id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  dispatch(setIsLoading(true));

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/classes/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { data } = res.data;

    dispatch(setClass(data));
  } catch (error) {
    toast(error?.response.data.message);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const addClass = (setOpen, data) => async (dispatch, getState) => {
  const { token } = getState().auth;

  dispatch(setIsLoading(true));

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_API}/api/classes`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const ClassRes = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/classes`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const { data: ClassData } = ClassRes.data;
    const { message } = res.data;
    toast(message);
    dispatch(setClasses(ClassData));
  } catch (error) {
    toast(error?.response.data.message);
  } finally {
    dispatch(setIsLoading(false));
    setOpen(false);
  }
};

export const editClass = (setOpen, data, id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  dispatch(setIsLoading(true));

  try {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_API}/api/classes/${id}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const ClassRes = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/classes/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { data: ClassData } = ClassRes.data;
    const { message } = res.data;
    toast(message);
    dispatch(setClass(ClassData));
  } catch (error) {
    toast(error?.response.data.message);
  } finally {
    dispatch(setIsLoading(false));
    setOpen(false);
  }
};

export const deleteClass =
  (navigate, setOpen, id) => async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch(setIsLoading(true));

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/api/classes/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { message } = res.data;
      toast(message);
    } catch (error) {
      toast(error?.response.data.message);
    } finally {
      dispatch(setIsLoading(false));
      setOpen(false);
      navigate("/classes");
    }
  };
