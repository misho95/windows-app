import { useState } from "react";
import RightClickButtons from "../right.click.buttons";
import ButtonSeparator from "../button.separator";
import { Check, Dot } from "lucide-react";
import { useDesktopView } from "../../../utils/global.store";

const ViewButton = () => {
  const [show, setShow] = useState(false);
  const { options, setType } = useDesktopView();

  const handleShowIcons = () => {
    setType({
      ...options,
      showDesktopIcons: options.showDesktopIcons ? false : true,
    });
  };

  const handleAutoArange = () => {
    setType({
      ...options,
      auto: options.auto ? false : true,
    });
  };

  return (
    <RightClickButtons>
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="relative"
      >
        View
        {show && (
          <div className="left-full top-[-5px] absolute min-w-[150px] w-fit h-fit bg-neutral-100 border-[1px] border-black/20 p-1 flex flex-col gap-1">
            <RightClickButtons>
              <div className="w-full relative pl-[16px]">
                <div className="text-sm">Large icons</div>
              </div>
            </RightClickButtons>
            <RightClickButtons>
              <div className="w-full relative pl-[16px]">
                <Dot className="size-[14px] absolute left-0 top-1/2 -translate-y-1/2" />
                <div className="text-sm">Medium icons</div>
              </div>
            </RightClickButtons>
            <RightClickButtons>
              <div className="w-full relative pl-[16px]">
                <div className="text-sm">Small icons</div>
              </div>
            </RightClickButtons>
            <ButtonSeparator />
            <RightClickButtons handler={handleAutoArange}>
              <div className="w-full relative pl-[16px]">
                {options.auto && (
                  <Check className="size-[14px] absolute left-0 top-1/2 -translate-y-1/2" />
                )}
                <div className="text-sm">Auto arrange icons</div>
              </div>
            </RightClickButtons>
            <ButtonSeparator />
            <RightClickButtons handler={handleShowIcons}>
              <div className="w-full relative pl-[16px]">
                {options.showDesktopIcons && (
                  <Check className="size-[14px] absolute left-0 top-1/2 -translate-y-1/2" />
                )}
                <div className="text-sm">Show desktop icons</div>
              </div>
            </RightClickButtons>
          </div>
        )}
      </div>
    </RightClickButtons>
  );
};

export default ViewButton;
