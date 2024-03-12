import { ReactNode, useState } from "react";
import RightClickOptions from "./right-click/right.click.options";
import FileRender from "./file/file.render";
import { useCoords, useDestkopStore } from "../utils/global.store";
import { useClickAway } from "@uidotdev/usehooks";

type PropsType = {
  children: ReactNode;
};

const AppScreen = ({ children }: PropsType) => {
  const { desktop } = useDestkopStore();
  const { coords } = useCoords();
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
      style={{ backgroundImage: "url(/desktop.jpg)" }}
      className="w-full h-screen overflow-hidden relative"
    >
      {desktop.map((f: fileType) => {
        return <FileRender key={f.id} data={f} />;
      })}
      {children}
      {openRightClick && (
        <RightClickOptions
          coords={coordsSaved}
          setOpenRightClick={setOpenRightClick}
        />
      )}
    </div>
  );
};

export default AppScreen;
