// This Context provides Sign in with google functionality and the details of the user is available through the Webapp.
import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

// Create Context
const AuthContext = createContext();

// Provider Component
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // Sign-in/Log-in with Google
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        localStorage.setItem("User-Token", token);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = "Error: " + error.code + " please refresh";
        alert(errorCode)
      });
  };

  // Sign-Out/Log-Out current user
  const logOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("User-Token");
      navigate("/")
    }).catch((error) => {
      alert(error);
    });
  };

  // Check whether the user has loged-in/sign-in or loged-out/sign-out
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      navigate("/app");
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Provide data to all components (children)
  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
