import { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
};

const AppScreen = ({ children }: PropsType) => {
  return (
    <div
      style={{ backgroundImage: "url(/desktop.jpg)" }}
      className="w-full h-screen overflow-hidden relative"
    >
      {children}
    </div>
  );
};

export default AppScreen;
