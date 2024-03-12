import RightClickButtons from "./right.click.buttons";

type PropsType = {
  coords: { x: number; y: number };
};

const RightClickOptions = ({ coords }: PropsType) => {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  const returnTopStyle = () => {
    if (windowHeight / 2 > coords.y) {
      return { top: coords.y };
    }
    if (windowHeight / 2 < coords.y) {
      return { top: coords.y - 250 };
    }
    return { top: 0 };
  };

  const returnLeftStyle = () => {
    if (windowWidth / 2 > coords.x) {
      return { left: coords.x };
    }
    if (windowWidth / 2 < coords.x) {
      return { left: coords.x - 150 };
    }
    return { left: 0 };
  };

  const { top } = returnTopStyle();
  const { left } = returnLeftStyle();

  return (
    <div
      className="w-[150px] h-[250px] bg-neutral-100 absolute border-[1px] border-black/20 p-1 flex flex-col gap-1"
      style={{ top: top, left: left }}
    >
      <RightClickButtons>View</RightClickButtons>
      <RightClickButtons>Sort by</RightClickButtons>
      <RightClickButtons>Refresh</RightClickButtons>
      <div className="w-full h-[1px] bg-black/20" />
      <RightClickButtons>Paste</RightClickButtons>
      <RightClickButtons>Paste shortcut</RightClickButtons>
      <div className="w-full h-[1px] bg-black/20" />
      <RightClickButtons>New</RightClickButtons>
      <div className="w-full h-[1px] bg-black/20" />
      <RightClickButtons>Display settings</RightClickButtons>
      <RightClickButtons>Personalize</RightClickButtons>
    </div>
  );
};

export default RightClickOptions;