import { Folder } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  useCoords,
  useDesktopActiveFolder,
  useDesktopView,
  useDestkopStore,
} from "../../utils/global.store";
import clsx from "clsx";
import { useClickAway } from "@uidotdev/usehooks";
import FileRightClick from "./file.right.click";
import { fileType } from "../../interfaces/desktop";

type PropsType = {
  data: fileType;
  index: any;
};

const FileRender = ({ data, index }: PropsType) => {
  const [undeline, setUnderline] = useState(false);
  const [saveCoords, setSaveCoords] = useState<null | { x: number; y: number }>(
    null
  );
  const [editable, setEditable] = useState(false);
  const [localOptions, setLocalOptions] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editTitle, setEditTitle] = useState<string>(data.title);
  const { coords } = useCoords();
  const { desktop, setDesktop } = useDestkopStore();
  const [localDrag, setLocalDrag] = useState(false);
  const { active, setActive, clear } = useDesktopActiveFolder();
  const { options } = useDesktopView();
  const editInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    clear();
  }, [options.auto]);

  useEffect(() => {
    if (localDrag && desktop) {
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
    if (options.auto) {
      return;
    }

    if (active !== data.id) {
      setActive(data.id);
      setEditable(true);
      setTimeout(() => {
        setEditable(false);
      }, 1000);
      return;
    }

    if (active === data.id && editable) {
      setEdit(true);
      setTimeout(() => {
        editInputRef.current?.focus();
        editInputRef.current?.select();
      }, 100);
      return;
    }
  };

  const ref: any = useClickAway(() => {
    if (active === data.id) {
      if (data.title !== editTitle) {
        handleTitleChange();
      }
      clear();
    }
    setEdit(false);
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

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setLocalOptions(true);
  };

  const handleEditInRename = () => {
    setLocalOptions(false);
    setEdit(true);
    setTimeout(() => {
      editInputRef.current?.focus();
      editInputRef.current?.select();
    }, 100);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("index", index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setUnderline(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setUnderline(false);
  };

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const dragData = e.dataTransfer.getData("index");
    const newItems = [...desktop];
    const item = newItems.splice(+dragData, 1)[0];
    newItems.splice(index, 0, item);
    setDesktop(newItems);
    setUnderline(false);
  };

  return (
    <div
      className={`${options.auto ? "relative" : "absolute"} ${
        undeline ? "border-b-[1px] border-white" : ""
      }  w-[80px] h-[80px]`}
      style={
        options.auto ? {} : { top: data.position.y, left: data.position.x }
      }
      draggable={options.auto}
      onDragStart={(e) => handleDragStart(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDrop={handleDragDrop}
    >
      <div
        onContextMenu={handleRightClick}
        ref={ref}
        onClick={handleClick}
        onMouseDown={(e) => {
          !options.auto && setLocalDrag(true), saveCoorsHandler(e);
        }}
        onMouseUp={() => !options.auto && setLocalDrag(false)}
        className={clsx(
          "w-full h-fit p-[5px] m-[1px] border-[1px] border-transparent hover:border-white/50 hover:bg-white/20 absolute flex flex-col items-center gap-[5px]",
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
              ref={editInputRef}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full resize-none text-center text-black focus:outline-none overflow-hidden"
              onKeyDown={handleKeyPress}
            />
          )}
        </h3>
      </div>
      {localOptions && (
        <FileRightClick
          setOptions={setLocalOptions}
          setEdit={handleEditInRename}
        />
      )}
    </div>
  );
};

export default FileRender;
