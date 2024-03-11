import { ReactNode, useContext, useState } from "react";
import { CoordsContext } from "../App";
import RightClickOptions from "./right-click/right.click.options";

type PropsType = {
  children: ReactNode;
};

const AppScreen = ({ children }: PropsType) => {
  const { coords } = useContext(CoordsContext);
  const [openRightClick, setOpenRightClick] = useState(false);
  const [coordsSaved, setCoordsSaved] = useState<any>(null);

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOpenRightClick(!openRightClick);
    setCoordsSaved({ x: coords.x, y: coords.y });
  };

  return (
    <div
      onContextMenu={handleRightClick}
      onClick={() => setOpenRightClick(false)}
      style={{ backgroundImage: "url(/desktop.jpg)" }}
      className="w-full h-screen overflow-hidden relative"
    >
      {children}
      {openRightClick && <RightClickOptions coords={coordsSaved} />}
    </div>
  );
};

export default AppScreen;
