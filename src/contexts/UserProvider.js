import PropTypes from "prop-types";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState, createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../services/firebase/client";

const UserContext = createContext({
  user: null,
  userData: null,
  customClaims: null,
  isAuthLoading: false,
});

function UserProvider({ children }) {
  const [user, isAuthLoading] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [customClaims, setCustomClaims] = useState({});

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = doc(firestore, "users", user.uid);
      unsubscribe = onSnapshot(ref, (doc) => {
        setUserData(doc.data());
      });
    } else {
      setUserData(null);
    }

    return () => unsubscribe && unsubscribe();
  }, [user]);

  useEffect(() => {
    if (user) {
      auth.currentUser.getIdTokenResult(true).then((result) => {
        setCustomClaims(result.claims);
      });
    } else {
      setCustomClaims(null);
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{ userData, user, customClaims, isAuthLoading }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserProvider, UserContext };
