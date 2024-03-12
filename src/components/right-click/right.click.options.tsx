import { useClickAway } from "@uidotdev/usehooks";
import RightClickButtons from "./right.click.buttons";
import ButtonSeparator from "./button.separator";

type PropsType = {
  coords: { x: number; y: number };
  setOpenRightClick: (arg: boolean) => void;
};

const RightClickOptions = ({ coords, setOpenRightClick }: PropsType) => {
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

  const ref: any = useClickAway(() => {
    setOpenRightClick(false);
  });

  return (
    <div
      ref={ref}
      className="w-[150px] h-[250px] bg-neutral-100 absolute border-[1px] border-black/20 p-1 flex flex-col gap-1"
      style={{ top: top, left: left }}
    >
      <RightClickButtons>View</RightClickButtons>
      <RightClickButtons>Sort by</RightClickButtons>
      <RightClickButtons>Refresh</RightClickButtons>
      <ButtonSeparator />
      <RightClickButtons>Paste</RightClickButtons>
      <RightClickButtons>Paste shortcut</RightClickButtons>
      <ButtonSeparator />
      <RightClickButtons>New</RightClickButtons>
      <ButtonSeparator />
      <RightClickButtons>Display settings</RightClickButtons>
      <RightClickButtons>Personalize</RightClickButtons>
    </div>
  );
};

export default RightClickOptions;
