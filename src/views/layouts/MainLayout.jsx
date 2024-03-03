import React, { useEffect } from "react";
import Header from "../extension/Header";
import { useAuthState, useFetchUserData } from "../../features/hooks/useAuth";
import MainLayoutSkelenton from "../skelenton/MainLayoutSkelenton";

const MainLayout = ({ children }) => {
  const fetching = useFetchUserData();

  const { user } = useAuthState();

  useEffect(() => {
    if (!user) {
      fetching();
    }
  }, [user]);

  if (!user) {
    return <MainLayoutSkelenton />;
  }

  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
