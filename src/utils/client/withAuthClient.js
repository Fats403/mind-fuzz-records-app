import { Box, CircularProgress } from "@mui/material";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserProvider";
import router from "next/router";
import PageLoader from "../../components/PageLoader";

export default function withAuthClient(Component, role) {
  return function () {
    const { user, customClaims, isAuthLoading } = useContext(UserContext);

    useEffect(() => {
      if (isAuthLoading) return;
      if ((customClaims && customClaims?.role !== role) || !user) {
        router.push("/");
      }
    }, [user, router, customClaims, isAuthLoading]);

    if (isAuthLoading || !user || !customClaims || !customClaims.role) {
      return (
        <Box sx={{ display: "flex", height: "100vh" }}>
          <Box sx={{ m: "auto" }}>
            <PageLoader />
          </Box>
        </Box>
      );
    }

    return <Component />;
  };
}
