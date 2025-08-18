"use client";

import { useAbly } from "../lib/useAbly";
import { useEffect, useState } from "react";
import QRCodeComponent from "../components/QRCode";
import ProgressiveMosaic from "../components/ProgressiveMosaic";

export default function HomePage() {
  const { status, connected, reset, maxClicks } = useAbly();
  const [buttonUrl, setButtonUrl] = useState("");

  useEffect(() => {
    // Set the button URL when component mounts
    const isRewriteDomain =
      window.location.hostname === "channel.jaryddiamond.com";
    const basePath = isRewriteDomain ? "/showcase" : "";
    setButtonUrl(`${window.location.origin}${basePath}/button`);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "r" || e.key === "R") {
        reset();
      } else if (e.key === "f" || e.key === "F") {
        maxClicks();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [reset, maxClicks]);

  return (
    <div className="h-screen w-screen overflow-hidden relative p-10 flex flex-col items-center gap-10">
      <div className="flex justify-between items-center w-full">
        <div className="border rounded-lg p-1 bg-white">
          {buttonUrl ? (
            <QRCodeComponent value={buttonUrl} size={120} />
          ) : (
            <div className="w-20 h-20 bg-gray-300 flex items-center justify-center">
              ...
            </div>
          )}
        </div>

        <div className="w-[40%] h-fit">
          <div className="flex justify-between mb-2 text-sm">
            <span>Progress</span>
            <span>
              {status.clicks} / {status.maxClicks}
            </span>
          </div>
          <div className="w-full bg-black rounded-full h-6">
            <div
              className={`h-6 rounded-full transition-all duration-500 ${
                status.completed ? "bg-green-500" : "bg-blue-500"
              }`}
              style={{ width: `${status.progress}%` }}
            />
          </div>
          <div className="text-center mt-2 text-sm">
            {status.completed
              ? "🎉 Complete!"
              : `${Math.round(status.progress)}% filled`}
          </div>
        </div>

        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full mr-2 ${
              connected ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="text-sm">
            {connected ? "Connected" : "Disconnected"}
          </span>
        </div>
      </div>

      <div className="flex-1 flex items-center">
        <ProgressiveMosaic
          progress={status.progress}
          className="rounded-lg max-w-full max-h-full"
        />
      </div>

      {/* Reset Instructions - Bottom Center */}
      <div className="text-xs text-gray-400">
        Press R to reset, Press F to reveal
      </div>
    </div>
  );
}
