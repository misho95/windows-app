import { ReactNode, useState } from "react";
import RightClickOptions from "./right-click/right.click.options";
import FileRender from "./file/file.render";
import {
  useCoords,
  useDesktopView,
  useDestkopStore,
  useMultiSelect,
  useOpenRightClick,
  useShowSelection,
} from "../utils/global.store";
import { fileType } from "../interfaces/desktop";

type PropsType = {
  children: ReactNode;
};

const AppScreen = ({ children }: PropsType) => {
  const { desktop } = useDestkopStore();
  const { coords } = useCoords();
  const { openRightClick, setOpenRightClick } = useOpenRightClick();
  const [coordsSaved, setCoordsSaved] = useState<any>(null);
  const { options } = useDesktopView();
  const { showSelection, setShowSelection } = useShowSelection();

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOpenRightClick(true);
    setCoordsSaved({ x: coords.x, y: coords.y });
  };

  const handleMouseDown = () => {
    if (openRightClick) {
      return;
    }

    setCoordsSaved(coords);
    setShowSelection({ select: null, coords: coords, show: true });
  };

  const handleMouseUp = () => {
    setShowSelection({
      ...showSelection,
      show: false,
      select: {
        start: coordsSaved,
        end: coords,
      },
    });
  };

  return (
    <div
      onContextMenu={handleRightClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ backgroundImage: "url(/desktop.jpg)" }}
      className={`w-full h-screen overflow-hidden relative ${
        options.auto ? "flex flex-col flex-wrap content-start pb-[50px]" : ""
      }`}
    >
      {options.showDesktopIcons &&
        desktop.map((f: fileType, index) => {
          return <FileRender key={f.id} data={f} index={index} />;
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
