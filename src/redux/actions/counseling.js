import axios from "axios";
import { toast } from "sonner";
import {
  setCounselings,
  setCounseling,
  setIsLoading,
} from "../reducers/counseling";
import { setLogs } from "../reducers/log";

export const getCounselings = () => async (dispatch, getState) => {
  const { token } = getState().auth;
  dispatch(setIsLoading(true));

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/counselings`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { data } = res.data;

    dispatch(setCounselings(data));
  } catch (error) {
    toast(error?.response?.data?.message || "Error occured!");
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const getCounseling = (id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  dispatch(setIsLoading(true));

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/counselings/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { data } = res.data;

    dispatch(setCounseling(data));
  } catch (error) {
    toast(error?.response.data.message);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const addCounseling = (setOpen, data) => async (dispatch, getState) => {
  const { token, user } = getState().auth;

  dispatch(setIsLoading(true));

  data = { ...data, counselorId: user.id };

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_API}/api/counselings`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const CounselingRes = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/counselings`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const { data: CounselingData } = CounselingRes.data;
    const { message } = res.data;

    // Posting it to the log
    const counselingId = res.data.data.id;

    const logRes = await axios.post(
      `${import.meta.env.VITE_BACKEND_API}/api/counseling-logs`,
      { userId: user.id, activity: "created", counselingId: counselingId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { data: logsData } = logRes.data;

    toast(message);
    dispatch(setCounselings(CounselingData));
    dispatch(setLogs(logsData));
  } catch (error) {
    toast(error?.response.data.message);
  } finally {
    dispatch(setIsLoading(false));
    setOpen(false);
  }
};

export const editCounseling =
  (setOpen, data, id) => async (dispatch, getState) => {
    const { token, user } = getState().auth;

    dispatch(setIsLoading(true));

    data = { ...data, counselorId: user.id };

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/api/counselings/${id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const CounselingRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/counselings/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { data: CounselingData } = CounselingRes.data;
      const { message } = res.data;

      // Posting it to the log
      const counselingId = res.data.data.id;

      const logRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/counseling-logs`,
        { userId: user.id, activity: "updated", counselingId: counselingId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { data: logsData } = logRes.data;

      toast(message);
      dispatch(setCounseling(CounselingData));
      dispatch(setLogs(logsData));
    } catch (error) {
      toast(error?.response.data.message);
    } finally {
      dispatch(setIsLoading(false));
      setOpen(false);
    }
  };

export const deleteCounseling =
  (navigate, setOpen, id) => async (dispatch, getState) => {
    const { token, user } = getState().auth;
    dispatch(setIsLoading(true));

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/api/counselings/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { message } = res.data;

      // Posting it to the log
      const counselingId = res.data.data.id;

      const logRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/counseling-logs`,
        { userId: user.id, activity: "deleted", counselingId: counselingId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { data: logsData } = logRes.data;

      toast(message);
      dispatch(setLogs(logsData));
    } catch (error) {
      toast(error?.response.data.message);
    } finally {
      dispatch(setIsLoading(false));
      setOpen(false);
      navigate("/counselings");
    }
  };
