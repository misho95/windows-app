import { Dessert } from "lucide-react";
import BarButton from "./button";
import { useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";

const WindowsButton = () => {
  const [open, setOpen] = useState(false);
  const ref = useClickAway(() => {
    setTimeout(() => {
      if (open) {
        setOpen(false);
      }
    }, 100);
  });

  return (
    <BarButton handler={() => setOpen(!open)}>
      <>
        <Dessert />
        {open && (
          <div
            ref={ref}
            onClick={(e) => e.stopPropagation()}
            className="absolute left-0 bottom-[50px] h-[500px] w-[300px] bg-neutral-900"
          >
            helloo
          </div>
        )}
      </>
    </BarButton>
  );
};

export default WindowsButton;
