import { Folder } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  useCoords,
  useDesktopActiveFolder,
  useDesktopView,
  useDestkopStore,
  useShowSelection,
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
  const { setShowSelection } = useShowSelection();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    clear();
  }, [options.auto]);

  useEffect(() => {
    if (active) {
      setIsActive(active.includes(data.id));
    }
    if (!active) {
      setIsActive(false);
    }
  }, [active]);

  useEffect(() => {
    if (localDrag) {
      setShowSelection({ coords: null, show: false, select: null });
    }
  }, [localDrag]);

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
        } else if (f.id !== data.id && active?.includes(f.id)) {
          return {
            ...f,
            position: {
              x:
                data.position.x > f.position.x
                  ? coords.x -
                    saveCoords.x -
                    (f.position.x > data.position.x
                      ? f.position.x - data.position.x
                      : data.position.x - f.position.x)
                  : coords.x -
                    saveCoords.x +
                    (f.position.x > data.position.x
                      ? f.position.x - data.position.x
                      : data.position.x - f.position.x),
              y:
                data.position.y > f.position.y
                  ? coords.y -
                    saveCoords.y -
                    (f.position.y > data.position.y
                      ? f.position.y - data.position.y
                      : data.position.y - f.position.y)
                  : coords.y -
                    saveCoords.y +
                    (f.position.y > data.position.y
                      ? f.position.y - data.position.y
                      : data.position.y - f.position.y),
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

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.ctrlKey) {
      if (active) {
        const isIncludes = active.includes(data.id);
        if (isIncludes) {
          const update = active.filter((f) => f !== data.id);
          setActive(update);
        } else {
          setActive([...active, data.id]);
        }
      } else {
        setActive([data.id]);
      }
      return;
    }

    if (!isActive) {
      setActive([data.id]);
      setEditable(true);
      setTimeout(() => {
        setEditable(false);
      }, 1000);
      return;
    }

    if (isActive && editable) {
      setEdit(true);
      setTimeout(() => {
        editInputRef.current?.focus();
        editInputRef.current?.select();
      }, 100);
      return;
    }
  };

  const ref: any = useClickAway((e: any) => {
    if (!e.ctrlKey) {
      if (isActive) {
        if (data.title !== editTitle) {
          handleTitleChange();
        }
        clear();
      }
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
    setShowSelection({ coords: null, show: false, select: null });
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
      }  w-[80px] h-[80px] z-40`}
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
        onClick={(e) => handleClick(e)}
        onMouseDown={(e) => {
          !options.auto && setLocalDrag(true), saveCoorsHandler(e);
        }}
        onMouseUp={() => !options.auto && setLocalDrag(false)}
        className={clsx(
          "w-full h-fit p-[5px] m-[1px] border-[1px] border-transparent hover:border-white/50 hover:bg-white/20 absolute flex flex-col items-center gap-[5px]",
          {
            "bg-white/30": isActive,
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
