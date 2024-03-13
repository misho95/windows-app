import { useEffect } from "react";
import AppScreen from "./components/screen";
import WindowsBar from "./components/windows.bar/windows.bar";
import {
  useCoords,
  useDesktopView,
  useDestkopStore,
} from "./utils/global.store";
import FullScreenButton from "./components/full.screen.button";

function App() {
  const screenHeight = window.innerHeight - 50;
  const { desktop, setDesktop } = useDestkopStore();
  const { options } = useDesktopView();
  const returnSize = () => {
    switch (options.iconSize) {
      case "large":
        return 100;
      case "medium":
        return 80;
      case "small":
        return 40;
    }
  };

  useEffect(() => {
    if (options.auto) {
      const updatePositions = desktop.reverse().map((f, index) => {
        const itemSize = returnSize();

        const maxItemsPerColumn = Math.floor(screenHeight / itemSize);

        const row = Math.floor(index / maxItemsPerColumn);
        const col = index % maxItemsPerColumn;
        const x = row * itemSize;
        const y = col * itemSize;

        return {
          ...f,
          position: { x, y },
        };
      });
      setDesktop(updatePositions);
    }
  }, [options]);

  const { setCoords } = useCoords();

  useEffect(() => {
    const handleWindowMouseMove = (event: any) => {
      setCoords({
        x: event.clientX,
        y: event.clientY,
      });
    };
    window.addEventListener("mousemove", handleWindowMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, []);

  return (
    <AppScreen>
      <WindowsBar />
      <FullScreenButton />
    </AppScreen>
  );
}

export default App;
