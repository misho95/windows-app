import BarButton from "./button";
import { Search, Gem } from "lucide-react";
import WindowsButton from "./windows.button";

const WindowsBar = () => {
  return (
    <div className="absolute bottom-0 w-full h-[50px] bg-black/40 flex">
      <WindowsButton />
      <BarButton>
        <Search />
      </BarButton>
      <BarButton open focus>
        <Gem />
      </BarButton>
    </div>
  );
};

export default WindowsBar;
