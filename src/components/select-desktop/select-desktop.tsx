import { useEffect } from "react";
import {
  useCoords,
  useDesktopActiveFolder,
  useDestkopStore,
  useShowSelection,
} from "../../utils/global.store";

const SelectDesktop = () => {
  const { coords } = useCoords();
  const { desktop } = useDestkopStore();
  const { setActive } = useDesktopActiveFolder();

  const screenWith = window.innerWidth;
  const screenHeight = window.innerHeight;

  const { showSelection } = useShowSelection();

  useEffect(() => {
    if (!showSelection.select) {
      return;
    }

    const selection = showSelection.select;

    console.log(selection);

    const calculateExpandY = Math.abs(selection.start.y - selection.end.y) % 80;
    const calculateExpandX = Math.abs(selection.start.x - selection.end.x) % 80;

    const findSelectedFiles = desktop.filter((f) => {
      if (
        (selection.start.x < selection.end.x &&
          f.position.y < selection.end.y + calculateExpandY &&
          f.position.y > selection.start.y - calculateExpandY &&
          f.position.x < selection.end.x + calculateExpandX &&
          f.position.x > selection.start.x - calculateExpandX) ||
        (f.position.y > selection.end.y - calculateExpandY &&
          f.position.y < selection.start.y + calculateExpandY &&
          f.position.x < selection.end.x + calculateExpandX &&
          f.position.x > selection.start.x - calculateExpandX) ||
        (selection.start.x > selection.end.x &&
          f.position.y < selection.end.y + calculateExpandY &&
          f.position.y > selection.start.y - calculateExpandY &&
          f.position.x > selection.end.x - calculateExpandX &&
          f.position.x < selection.start.x + calculateExpandX) ||
        (f.position.y > selection.end.y + calculateExpandY &&
          f.position.y < selection.start.y - calculateExpandY &&
          f.position.x > selection.end.x - calculateExpandX &&
          f.position.x < selection.start.x + calculateExpandX)
      ) {
        return f;
      }
    });

    const returnOnlyIds = findSelectedFiles.map((f) => f.id);

    setActive(returnOnlyIds);
  }, [showSelection]);

  const returnWith = () => {
    if (!showSelection.coords) {
      return 0;
    }

    if (coords.x === showSelection.coords.x) {
      return 0;
    }

    if (coords.x > showSelection.coords.x) {
      return coords.x - showSelection.coords.x;
    }

    if (coords.x < showSelection.coords.x) {
      return showSelection.coords.x - coords.x;
    }
  };

  const returnHeight = () => {
    if (!showSelection.coords) {
      return 0;
    }

    if (coords.y === showSelection.coords.y) {
      return 0;
    }

    if (coords.y > showSelection.coords.y) {
      return coords.y - showSelection.coords.y;
    }

    if (coords.y < showSelection.coords.y) {
      return showSelection.coords.y - coords.y;
    }
  };

  return (
    showSelection.show &&
    showSelection.coords && (
      <div
        style={{
          top:
            coords.y < showSelection.coords.y ? "auto" : showSelection.coords.y,
          bottom:
            coords.y < showSelection.coords.y
              ? screenHeight - showSelection.coords.y
              : "auto",
          left:
            coords.x < showSelection.coords.x ? "auto" : showSelection.coords.x,
          right:
            coords.x < showSelection.coords.x
              ? screenWith - showSelection.coords.x
              : "auto",
          width: returnWith(),
          height: returnHeight(),
        }}
        className="bg-transparent absolute border-[1px] border-dotted"
      />
    )
  );
};

export default SelectDesktop;
