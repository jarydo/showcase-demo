"use client";

import { useAbly } from "../../lib/useAbly";

export default function ButtonPage() {
  const { status, connected, click } = useAbly();

  const handleClick = () => {
    if (status.completed) {
      // Redirect to channel when completed
      window.open('https://channel.jaryddiamond.com', '_blank');
      return;
    }
    
    if (navigator.vibrate) {
      navigator.vibrate(50); // Haptic feedback
    }
    click();
  };

  return (
    <div className="min-h-screen w-screen overflow-hidden flex flex-col items-center justify-center gap-4" style={{ minHeight: '-webkit-fill-available' }}>
      <h2 className="text-3xl font-bold mb-8">Complete the mosaic!</h2>

      {/* Progress Display */}
      <div className="text-center mb-8">
        <div className="text-2xl mb-2">
          {status.clicks} / {status.maxClicks}
        </div>
        <div className="w-64 bg-gray-700 rounded-full h-4">
          <div
            className={`h-4 rounded-full transition-all duration-300 ${
              status.completed ? "bg-green-500" : "bg-blue-500"
            }`}
            style={{ width: `${status.progress}%` }}
          />
        </div>
      </div>

      {/* 3D Skeumorphic Click Button */}
      <div className="relative">
        <button
          onClick={handleClick}
          disabled={!connected}
          className={`
            relative w-48 h-48 rounded-full font-bold select-none
            ${status.completed ? 'text-lg px-4' : 'text-2xl'}
            transition-all duration-150 ease-out transform
            ${
              status.completed
                ? `bg-gradient-to-br from-green-400 to-green-600 text-white cursor-pointer
                 shadow-[0_0_0_4px_rgba(34,197,94,0.2),0_0_0_8px_rgba(34,197,94,0.1),inset_0_3px_0_rgba(255,255,255,0.3),inset_0_-3px_0_rgba(0,0,0,0.2),0_8px_15px_rgba(0,0,0,0.3)]
                 hover:shadow-[0_0_0_4px_rgba(34,197,94,0.4),0_0_0_8px_rgba(34,197,94,0.2),inset_0_3px_0_rgba(255,255,255,0.4),inset_0_-3px_0_rgba(0,0,0,0.2),0_10px_20px_rgba(0,0,0,0.4)]
                 hover:translate-y-[-2px] hover:scale-105
                 active:shadow-[0_0_0_4px_rgba(34,197,94,0.3),0_0_0_8px_rgba(34,197,94,0.1),inset_0_2px_0_rgba(255,255,255,0.2),inset_0_-2px_0_rgba(0,0,0,0.3),0_6px_12px_rgba(0,0,0,0.3)]
                 active:translate-y-[2px] active:scale-98`
                : connected
                ? `bg-gradient-to-br from-red-400 to-red-600 text-white cursor-pointer
                 shadow-[0_0_0_4px_rgba(239,68,68,0.3),0_0_0_8px_rgba(239,68,68,0.1),inset_0_4px_0_rgba(255,255,255,0.4),inset_0_-4px_0_rgba(0,0,0,0.3),0_12px_20px_rgba(0,0,0,0.4)]
                 hover:shadow-[0_0_0_4px_rgba(239,68,68,0.4),0_0_0_8px_rgba(239,68,68,0.2),inset_0_4px_0_rgba(255,255,255,0.5),inset_0_-4px_0_rgba(0,0,0,0.3),0_15px_25px_rgba(0,0,0,0.5)]
                 hover:translate-y-[-2px] hover:scale-105
                 active:shadow-[0_0_0_4px_rgba(239,68,68,0.3),0_0_0_8px_rgba(239,68,68,0.1),inset_0_2px_0_rgba(255,255,255,0.2),inset_0_-2px_0_rgba(0,0,0,0.4),0_6px_10px_rgba(0,0,0,0.3)]
                 active:translate-y-[2px] active:scale-98`
                : `bg-gradient-to-br from-gray-400 to-gray-600 text-gray-300 cursor-not-allowed
                 shadow-[0_0_0_4px_rgba(107,114,128,0.2),0_0_0_8px_rgba(107,114,128,0.1),inset_0_3px_0_rgba(255,255,255,0.2),inset_0_-3px_0_rgba(0,0,0,0.2),0_8px_15px_rgba(0,0,0,0.2)]`
            }
          `}
        >
          <span className="relative z-10 drop-shadow-lg text-center leading-tight">
            {status.completed
              ? "DONE! CLICK FOR MORE PROJECTS"
              : connected
              ? "CLICK!"
              : "CONNECTING..."}
          </span>

          {/* Inner glow effect */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

          {/* Subtle texture overlay */}
          <div className="absolute inset-0 rounded-full opacity-20 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-black/10" />
        </button>

        {/* Button base/shadow */}
        <div
          className={`
          absolute top-0 left-0 w-48 h-48 rounded-full -z-10 blur-sm
          ${
            status.completed
              ? "bg-gradient-to-br from-green-500 to-green-700"
              : connected
              ? "bg-gradient-to-br from-red-500 to-red-700"
              : "bg-gradient-to-br from-gray-500 to-gray-700"
          }
        `}
        />
      </div>

      {/* Status */}
      <div className="mt-8 text-center">
        {status.completed
          ? "🎉 Mosaic is full! Great job!"
          : `${status.maxClicks - status.clicks} more clicks needed`}
      </div>

      {/* Connection Indicator */}
      <div className="mt-4 text-sm text-gray-400">
        {connected ? "Connected" : "Connecting..."}
      </div>
    </div>
  );
}
