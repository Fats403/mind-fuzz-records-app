import PropTypes from "prop-types";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, firestore } from "../utils/firebase";
import { useEffect, useState, createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const UserContext = createContext({ user: null, authRecord: null });

function UserProvider({ children }) {
  const [authRecord] = useAuthState(auth);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = doc(firestore, "users", user.uid);
      unsubscribe = onSnapshot(ref, (doc) => {
        setUser(doc.data());
      });
    } else {
      setUser(null);
    }

    return unsubscribe;
  }, [user]);

  return (
    <UserContext.Provider value={{ authRecord, user }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserProvider, UserContext };
