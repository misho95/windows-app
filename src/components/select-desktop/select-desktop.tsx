import { useCoords, useShowSelection } from "../../utils/global.store";

const SelectDesktop = () => {
  const { coords } = useCoords();

  const screenWith = window.innerWidth;
  const screenHeight = window.innerHeight;

  const { showSelection } = useShowSelection();

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
