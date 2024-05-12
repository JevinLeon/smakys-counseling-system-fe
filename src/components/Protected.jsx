import { getProfile } from "@/redux/actions/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedPage = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile(navigate, null, "/login"));
  }, [dispatch, navigate, token]);

  return children;
};

export default ProtectedPage;
