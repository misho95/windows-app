import { Folder } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { CoordsContext, DesktopContext } from "../../App";
import {
  useCoords,
  useDesktopActiveFolder,
  useDestkopStore,
} from "../../utils/global.store";
import clsx from "clsx";
import { useClickAway } from "@uidotdev/usehooks";

type PropsType = {
  data: fileType;
};

const FileRender = ({ data }: PropsType) => {
  const [saveCoords, setSaveCoords] = useState<null | { x: number; y: number }>(
    null
  );
  const [edit, setEdit] = useState(false);
  const [editTitle, setEditTitle] = useState<string>(data.title);
  const { coords } = useCoords();
  const { desktop, setDesktop } = useDestkopStore();
  const [drag, setDrag] = useState(false);
  const { active, setActive, clear } = useDesktopActiveFolder();

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
      setDesktop(update);
    }
  }, [coords]);

  const saveCoorsHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickDistanceLeft =
      e.clientX - e.currentTarget.getBoundingClientRect().left;
    const clickDistanceTop =
      e.clientY - e.currentTarget.getBoundingClientRect().top;
    setSaveCoords({ x: clickDistanceLeft, y: clickDistanceTop });
  };

  const handleClick = () => {
    if (active !== data.id) {
      setActive(data.id);
      return;
    }

    if (active === data.id) {
      setEdit(true);
      return;
    }
  };

  const ref: any = useClickAway(() => {
    if (active === data.id) {
      if (data.title !== editTitle) {
        handleTitleChange();
      }
      clear();
      setEdit(false);
    }
  });

  const handleTitleChange = () => {
    const update = desktop.map((f) => {
      if (f.id === data.id) {
        return {
          ...f,
          title: editTitle,
        };
      } else {
        return f;
      }
    });
    setDesktop(update);
    setEdit(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") {
      e.preventDefault();
      handleTitleChange();
    }
  };

  return (
    <div
      ref={ref}
      onClick={handleClick}
      onMouseDown={(e) => {
        setDrag(true), saveCoorsHandler(e);
      }}
      onMouseUp={() => setDrag(false)}
      style={{ top: data.position.y, left: data.position.x }}
      className={clsx(
        "w-[80px] h-fit p-[5px] m-[1px] border-[1px] border-transparent hover:border-white/50 hover:bg-white/20 absolute flex flex-col items-center gap-[5px]",
        {
          "bg-white/30": active === data.id,
        }
      )}
    >
      <div className="bg-yellow-500  p-1 rounded-lg text-white w-fit h-fit">
        {data.type === "folder" ? <Folder /> : null}
      </div>
      <h3 className="text-xs text-white select-none">
        {!edit && (
          <div className="text-center overflow-hidden">
            {data.title.length > 20
              ? data.title.slice(0, 20).concat("...")
              : data.title}
          </div>
        )}
        {edit && (
          <textarea
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full resize-none text-center text-black focus:outline-none overflow-hidden"
            onKeyDown={handleKeyPress}
          />
        )}
      </h3>
    </div>
  );
};

export default FileRender;
