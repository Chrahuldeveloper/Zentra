import Switch from "@mui/material/Switch";

export default function PopUp() {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <>
      <div className="bg-white shawdow-xl shawdow-gray-200 rounded-xl p-5 max-w-lg">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">🌀Zentra</h1>
          <p className="text-gray-500 font-semibold text-sm">
            Record your screen with smart zoom on clicks
          </p>
          <button className="bg-blue-600 text-white text-center w-full py-3 rounded-lg font-semibold hover:bg-blue-700 ease-in-out duration-400 cursor-pointer">
            Start Recording
          </button>
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
