import { firebaseAdmin } from "../../../services/firebase/admin";

/**
 * @name withAuth
 * @description Firebase authentication middleware, can optionally check user custom claim role
 * @param handler
 * @param role
 */
const withAuth = (handler, role = null) => {
  return async (req, res) => {
    let decodedToken;
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Bad or missing auth header." });
    }

    const token = authHeader.split(" ")[1];

    try {
      decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
      req.uid = decodedToken.uid;
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Could not verify user auth token." });
    }

    if (role && decodedToken.role !== role) {
      return res
        .status(401)
        .json({ error: `Must be '${role}' to access this endpoint.` });
    }

    return handler(req, res);
  };
};

export default withAuth;
