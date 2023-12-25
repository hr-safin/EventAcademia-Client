import React, { createContext, useEffect, useState } from "react";
import { app } from "../../Firebase/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";
export const AuthProvider = createContext(null);

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  let [loading, setLoading] = useState("loading");
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  const createUser = (email, password) => {
    setLoading(true);
    console.log(loading);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    setLoading(true);
    console.log(loading);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    console.log(loading);
    return signOut(auth);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    console.log(loading);
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const userInfo = {
    user,
    setUser,
    createUser,
    logIn,
    logOut,
    loading,

    signInWithGoogle,
  };
  return (
    <AuthProvider.Provider value={userInfo}>{children}</AuthProvider.Provider>
  );
};

export default AuthContext;
