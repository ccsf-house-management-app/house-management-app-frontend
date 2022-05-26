/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
import { createContext, useState, useEffect } from "react";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import { useNavigate, Navigate } from "react-router-dom";
// import { format } from "date-fns";

const AuthContext = createContext();
export default AuthContext;
// export AuthContext;

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")) : null
  );
  const [loading, setLoading] = useState(true);

  // const history = useNavigate();

  const loginUser = async (username, password) => {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      // history.push("/");
      // history("/home");
      <Navigate to="/records" />;
    } else {
      // eslint-disable-next-line no-alert
      alert("Something went wrong!");
    }
  };

  function getCurrentDate(separator = "-") {
    const newDate = new Date();
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    // return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`;
    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`;
  }

  const createRoom = async (formData) => {
    // eslint-disable-next-line prefer-const
    let submittedFormData = JSON.parse(JSON.stringify(formData));
    submittedFormData.capacity = parseInt(submittedFormData.capacity, 10);
    console.log(JSON.stringify(submittedFormData));
    const today = new Date();
    // const date = `${today.getDate()}-${parseInt(today.getMonth() + 1, 10)}-${today.getFullYear()}`;
    submittedFormData.dateCreated = getCurrentDate();

    const response = await fetch("http://127.0.0.1:8000/api/rooms/", {
      method: "POST",
      headers: {
        authorization: authTokens,
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId: submittedFormData.roomId,
        roomName: submittedFormData.roomName,
        roomDescription: submittedFormData.roomDescription,
        rent: submittedFormData.rent,
        capacity: submittedFormData.capacity,
        date_created: submittedFormData.dateCreated,
      }),
    }).catch((err) => {
      // handle error
      console.log(err.response.data);
    });
    console.log(response);
  };

  const registerUser = async (username, password, password2) => {
    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password2,
      }),
    });
    if (response.status === 201) {
      // history.push("/login");
      <Navigate to="/login" />;
    } else {
      alert("Something went wrong!");
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    // history.push("/");
    <Navigate to="/login" />;
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,
    createRoom,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>{loading ? null : children}</AuthContext.Provider>
  );
}

// export default AuthProvider;
