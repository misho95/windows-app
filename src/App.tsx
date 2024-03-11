import { createContext, useEffect, useState } from "react";
import AppScreen from "./components/screen";
import WindowsBar from "./components/windows.bar/windows.bar";

export const CoordsContext = createContext<any>(null);

function App() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

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
      <AppScreen>
        <WindowsBar />
      </AppScreen>
    </CoordsContext.Provider>
  );
}

export default App;
