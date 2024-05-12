import axios from "axios";
import { toast } from "sonner";
import { setStudents, setStudent, setIsLoading } from "../reducers/student";

export const getStudents = () => async (dispatch, getState) => {
  const { token } = getState().auth;
  dispatch(setIsLoading(true));

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/students`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { data } = res.data;

    dispatch(setStudents(data));
  } catch (error) {
    toast(error?.response?.data?.message || "Error occured!");
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const getStudent = (id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  dispatch(setIsLoading(true));

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/students/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { data } = res.data;

    dispatch(setStudent(data));
  } catch (error) {
    toast(error?.response.data.message);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const addStudent = (setOpen, data) => async (dispatch, getState) => {
  const { token } = getState().auth;

  dispatch(setIsLoading(true));

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_API}/api/students`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const StudentRes = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/students`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const { data: StudentData } = StudentRes.data;
    const { message } = res.data;
    toast(message);
    dispatch(setStudents(StudentData));
  } catch (error) {
    toast(error?.response.data.message);
  } finally {
    dispatch(setIsLoading(false));
    setOpen(false);
  }
};

export const editStudent =
  (setOpen, data, id) => async (dispatch, getState) => {
    const { token } = getState().auth;

    dispatch(setIsLoading(true));

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/api/students/${id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const StudentRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/students/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { data: StudentData } = StudentRes.data;
      const { message } = res.data;
      toast(message);
      dispatch(setStudent(StudentData));
    } catch (error) {
      toast(error?.response.data.message);
    } finally {
      dispatch(setIsLoading(false));
      setOpen(false);
    }
  };

export const deleteStudent =
  (navigate, setOpen, id) => async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch(setIsLoading(true));

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/api/students/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { message } = res.data;
      toast(message);
    } catch (error) {
      toast(error?.response.data.message);
    } finally {
      dispatch(setIsLoading(false));
      setOpen(false);
      navigate("/students");
    }
  };
