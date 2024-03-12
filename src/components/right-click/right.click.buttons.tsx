import { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
};

const RightClickButtons = ({ children }: PropsType) => {
  return (
    <button className="w-full hover:bg-white text-left">{children}</button>
  );
};

export default RightClickButtons;
