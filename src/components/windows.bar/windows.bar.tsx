import BarButton from "./button";
import { Search, Gem, Folder, Baby } from "lucide-react";
import WindowsButton from "./windows.button";
import {
  useActiveBarFile,
  useOpenFilesAndPined,
} from "../../utils/global.store";

const WindowsBar = () => {
  const { openFiles, pinnedFiles } = useOpenFilesAndPined();
  const { activeFile } = useActiveBarFile();

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div
      onContextMenu={handleRightClick}
      className="absolute bottom-0 w-full h-[50px] bg-black/40 flex gap-[1px] z-50"
    >
      <WindowsButton />
      <BarButton>
        <Search />
      </BarButton>
      {pinnedFiles.map((f, index) => {
        return (
          <BarButton key={index} open={f.open} focus={f.type === activeFile}>
            {f.type === "baby" ? <Baby /> : null}
          </BarButton>
        );
      })}
      {openFiles.map((f, index) => {
        return (
          <BarButton key={index} open focus={f.type === activeFile}>
            {f.type === "folder" ? (
              <Folder />
            ) : f.type === "gem" ? (
              <Gem />
            ) : null}
          </BarButton>
        );
      })}
    </div>
  );
};

export default WindowsBar;
