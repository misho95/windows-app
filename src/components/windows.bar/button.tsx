import { ReactNode } from "react";
import clsx from "clsx";

type PropsType = {
  children: ReactNode;
  open?: boolean;
  focus?: boolean;
  handler?: () => void;
};

const BarButton = ({
  children,
  handler,
  open = false,
  focus = false,
}: PropsType) => {
  return (
    <div
      onClick={handler}
      className={clsx(
        "text-white flex justify-center items-center size-[50px] cursor-pointer hover:bg-white/10 relative",
        {
          "border-b-[2px] border-sky-500": open,
          "bg-white/30 hover:bg-white/40": focus,
        }
      )}
    >
      {children}
    </div>
  );
};

export default BarButton;
