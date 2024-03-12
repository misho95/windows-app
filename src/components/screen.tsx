import { ReactNode, useContext, useState } from "react";
import { CoordsContext, DesktopContext } from "../App";
import RightClickOptions from "./right-click/right.click.options";
import FileRender from "./file/file.render";

type PropsType = {
  children: ReactNode;
};

const AppScreen = ({ children }: PropsType) => {
  const { desktop } = useContext(DesktopContext);
  const { coords } = useContext(CoordsContext);
  const [openRightClick, setOpenRightClick] = useState(false);
  const [coordsSaved, setCoordsSaved] = useState<any>(null);

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOpenRightClick(true);
    setCoordsSaved({ x: coords.x, y: coords.y });
  };

  return (
    <div
      onContextMenu={handleRightClick}
      onClick={() => setOpenRightClick(false)}
      style={{ backgroundImage: "url(/desktop.jpg)" }}
      className="w-full h-screen overflow-hidden relative"
    >
      {desktop.map((f: fileType) => {
        return <FileRender key={f.id} data={f} />;
      })}
      {children}
      {openRightClick && <RightClickOptions coords={coordsSaved} />}
    </div>
  );
};

export default AppScreen;
