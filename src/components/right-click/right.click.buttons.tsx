import { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
  handler?: () => void;
};

const RightClickButtons = ({ children, handler }: PropsType) => {
  return (
    <button onClick={handler} className="w-full hover:bg-white text-left">
      {children}
    </button>
  );
};

export default RightClickButtons;
