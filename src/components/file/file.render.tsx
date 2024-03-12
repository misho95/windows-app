import { Folder } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { CoordsContext, DesktopContext } from "../../App";

type PropsType = {
  data: fileType;
};

const FileRender = ({ data }: PropsType) => {
  const [saveCoords, setSaveCoords] = useState<null | { x: number; y: number }>(
    null
  );
  const { coords } = useContext(CoordsContext);
  const { desktop, setDestkop } = useContext(DesktopContext);
  const [drag, setDrag] = useState(false);

  useEffect(() => {
    if (drag && desktop) {
      if (!saveCoords) {
        return;
      }
      const update = desktop.map((f: fileType) => {
        if (f.id === data.id) {
          return {
            ...f,
            position: {
              x: coords.x - saveCoords.x,
              y: coords.y - saveCoords.y,
            },
          };
        } else {
          return f;
        }
      });
      setDestkop(update);
    }
  }, [coords]);

  const saveCoorsHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickDistanceLeft =
      e.clientX - e.currentTarget.getBoundingClientRect().left;
    const clickDistanceTop =
      e.clientY - e.currentTarget.getBoundingClientRect().top;
    setSaveCoords({ x: clickDistanceLeft, y: clickDistanceTop });
  };

  return (
    <div
      onMouseDown={(e) => {
        setDrag(true), saveCoorsHandler(e);
      }}
      onMouseUp={() => setDrag(false)}
      style={{ top: data.position.y, left: data.position.x }}
      className="p-5 border-[1px] border-transparent hover:border-white/50 hover:bg-white/20 absolute w-fit h-fit flex flex-col items-center gap-1"
    >
      <div className="bg-yellow-500  p-1 rounded-lg text-white w-fit h-fit">
        {data.type === "folder" ? <Folder /> : null}
      </div>
      <h3 className="text-xs text-white">{data.title}</h3>
    </div>
  );
};

export default FileRender;
