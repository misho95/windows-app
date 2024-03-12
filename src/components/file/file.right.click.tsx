import { useClickAway } from "@uidotdev/usehooks";
import RightClickButtons from "../right-click/right.click.buttons";
import ButtonSeparator from "../right-click/button.separator";

type PropsType = {
  setOptions: (arg: boolean) => void;
};

const FileRightClick = ({ setOptions }: PropsType) => {
  const ref: any = useClickAway(() => {
    setOptions(false);
  });

  return (
    <div
      ref={ref}
      onClick={(e) => e.stopPropagation()}
      className="w-[150px] h-fit bg-neutral-100 absolute border-[1px] border-black/20 p-1 flex flex-col gap-1 z-20 top-[20px] left-1/2"
    >
      <RightClickButtons>
        <span className="font-semibold">Open</span>
      </RightClickButtons>
      <ButtonSeparator />
      <RightClickButtons>Copy</RightClickButtons>
      <RightClickButtons>Cut</RightClickButtons>
      <RightClickButtons>Rename</RightClickButtons>
      <RightClickButtons>Delete</RightClickButtons>
    </div>
  );
};

export default FileRightClick;
