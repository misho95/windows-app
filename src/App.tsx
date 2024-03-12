import { createContext, useEffect, useState } from "react";
import AppScreen from "./components/screen";
import WindowsBar from "./components/windows.bar/windows.bar";

export const CoordsContext = createContext<any>(null);
export const DesktopContext = createContext<any>(null);

function App() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [desktop, setDestkop] = useState<fileType[]>([
    {
      id: 0,
      title: "new folder",
      type: "folder",
      position: { x: 0, y: 0 },
    },
  ]);

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
    <CoordsContext.Provider value={{ coords }}>
      <DesktopContext.Provider value={{ desktop, setDestkop }}>
        <AppScreen>
          <WindowsBar />
        </AppScreen>
      </DesktopContext.Provider>
    </CoordsContext.Provider>
  );
}

export default App;
