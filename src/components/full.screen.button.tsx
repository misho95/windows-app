import { useState } from "react";

const FullScreenButton = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullScreen(true);
        })
        .catch((err) => {
          console.error("Failed to enter fullscreen mode: ", err);
        });
    } else {
      if (document.exitFullscreen) {
        document
          .exitFullscreen()
          .then(() => {
            setIsFullScreen(false);
          })
          .catch((err) => {
            console.error("Failed to exit fullscreen mode: ", err);
          });
      }
    }
  };

  return (
    <button
      onClick={toggleFullScreen}
      className="absolute right-[5px] top-[5px] bg-white/50 rounded-md p-[5px]"
    >
      {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
    </button>
  );
};

export default FullScreenButton;
