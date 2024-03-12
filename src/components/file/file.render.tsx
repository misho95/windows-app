import { Folder } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { CoordsContext, DesktopContext } from "../../App";

type PropsType = {
  data: fileType;
};

const FileRender = ({ data }: PropsType) => {
  const { coords } = useContext(CoordsContext);
  const { desktop, setDestkop } = useContext(DesktopContext);
  const [drag, setDrag] = useState(false);

  useEffect(() => {
    if (drag && desktop) {
      const update = desktop.map((f: fileType) => {
        if (f.id === data.id) {
          return {
            ...f,
            position: { x: coords.x, y: coords.y },
          };
        } else {
          return f;
        }
      });
      setDestkop(update);
    }
  }, [coords]);

  return (
    <div
      onMouseDown={() => setDrag(true)}
      onMouseUp={() => setDrag(false)}
      style={{ top: data.position.y, left: data.position.x }}
      className="p-5 border-[1px] border-transparent hover:border-white/50 hover:bg-white/20 absolute w-fit h-fit"
    >
      <div className="bg-yellow-500  p-1 rounded-lg text-white">
        {data.type === "folder" ? <Folder /> : null}
      </div>
    </div>
  );
};

export default FileRender;