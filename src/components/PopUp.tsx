import Switch from "@mui/material/Switch";
import { useState } from "react";

export default function PopUp() {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const [toggle, settoggle] = useState<boolean>();

  const handleRecord = async () => {
    try {
      settoggle(true);
      chrome.tabCapture.capture({ audio: true, video: true }, (stream) => {
        if (!stream) {
          console.error("Failed to capture tab:", chrome.runtime.lastError);
          return;
        }

        const options = { mimeType: "video/webm; codecs=vp9" };
        const mimeType = MediaRecorder.isTypeSupported(options.mimeType)
          ? options.mimeType
          : "video/webm; codecs=vp8";

        const recordedChunks: BlobPart[] = [];

        const mediaRecorder = new MediaRecorder(stream, { mimeType });

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunks.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunks, { type: mimeType });
          const url = URL.createObjectURL(blob);

          chrome.tabs.create({
            url: `chrome-extension://${chrome.runtime.id}/dashboard.html`,
          });

          const a = document.createElement("a");
          a.href = url;
          a.download = "recording.webm";
          a.click();
        };

        mediaRecorder.start();

        setTimeout(() => {
          mediaRecorder.stop();
          stream.getTracks().forEach((track) => track.stop());
        }, 5000);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-white shawdow-2xl  shawdow-gray-800 rounded-xl p-5 w-[90vw]">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">🌀Zentra</h1>
          <p className="text-gray-500 font-semibold text-sm">
            Record your screen with smart zoom on clicks
          </p>
          {toggle ? (
            <button
              onClick={handleRecord}
              className="bg-blue-600 text-white text-center w-full py-3 rounded-lg font-semibold hover:bg-blue-700 ease-in-out duration-400 cursor-pointer"
            >
              Start Recording
            </button>
          ) : (
            <button
              onClick={handleRecord}
              className="bg-blue-600 text-white text-center w-full py-3 rounded-lg font-semibold hover:bg-blue-700 ease-in-out duration-400 cursor-pointer"
            >
              Start Recording
            </button>
          )}
        </div>

        <div className="space-y-1.5  my-5">
          <h1 className="text-gray-600 font-semibold">Recording Options</h1>
          <div className="border-b-[1px] border-gray-800"></div>
        </div>

        <div className="">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold  ">Record current tab</h1>
            <Switch {...label} />
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-semibold  ">Record Microphone</h1>
            <Switch {...label} />
          </div>
        </div>
      </div>
    </>
  );
}
