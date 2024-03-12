import { useEffect } from "react";
import AppScreen from "./components/screen";
import WindowsBar from "./components/windows.bar/windows.bar";
import { useCoords } from "./utils/global.store";
import FullScreenButton from "./components/full.screen.button";

function App() {
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
