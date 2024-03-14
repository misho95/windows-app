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
        "text-white flex justify-center items-center size-[50px] cursor-pointer hover:bg-white/10 relative group",
        {
          "bg-white/30 hover:bg-white/40": focus,
        }
      )}
    >
      {open && (
        <div
          className={`${
            focus ? "w-full" : "w-11/12 group-hover:w-full duration-50"
          } h-[2px] bg-sky-500 absolute bottom-0`}
        />
      )}
      {children}
    </div>
  );
};

export default BarButton;
