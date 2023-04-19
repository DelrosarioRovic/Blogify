import React from "react";
import NotAuthenticated from "./authentication/notAuthenticated";

const Navigation: React.FC = () => {

  return (
    <div className="flex items-center gap-x-2">
      <a href="">Compose</a>
      <NotAuthenticated />
    </div>
  );
};

export default Navigation;
