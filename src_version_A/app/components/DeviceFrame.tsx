import { ReactNode } from "react";

interface DeviceFrameProps {
  children: ReactNode;
}

export function DeviceFrame({ children }: DeviceFrameProps) {
  return (
    <div
      className="relative w-[390px] h-[844px] bg-[#1A1A1A] rounded-[48px] p-[3px] shadow-2xl"
      style={{
        transform: "scale(0.72)",
        transformOrigin: "top center"
      }}
    >
      {/* Side Buttons */}
      {/* Volume buttons - left side */}
      <div className="absolute left-0 top-[118px] w-[3px] h-[28px] bg-[#1A1A1A] rounded-l" />
      <div className="absolute left-0 top-[158px] w-[3px] h-[28px] bg-[#1A1A1A] rounded-l" />
      {/* Power button - right side */}
      <div className="absolute right-0 top-[158px] w-[3px] h-[80px] bg-[#1A1A1A] rounded-r" />

      {/* Inner bezel */}
      <div className="relative w-full h-full bg-black rounded-[45px] overflow-hidden">
        {/* Screen content area */}
        <div className="relative w-full h-full bg-white">
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-[54px] bg-transparent z-50 px-6">
            <div className="h-full flex items-center justify-between" style={{ paddingTop: '10px' }}>
              {/* Time */}
              <div className="text-white text-[15px]" style={{ fontWeight: 600 }}>9:41</div>

              {/* Dynamic Island Spacer */}
              <div className="flex-1" />

              {/* Status Icons */}
              <div className="flex items-center gap-1.5">
                {/* WiFi */}
                <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                  <path d="M7.5 0C3.36 0 0 3.36 0 7.5h2c0-3.04 2.46-5.5 5.5-5.5s5.5 2.46 5.5 5.5h2c0-4.14-3.36-7.5-7.5-7.5zm0 3C5.57 3 4 4.57 4 6.5h2c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5h2c0-1.93-1.57-3.5-3.5-3.5z" fill="white"/>
                </svg>
                {/* Battery */}
                <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                  <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="white" strokeOpacity="0.4"/>
                  <path d="M23 4V8C23.8 7.6 24 7 24 6C24 5 23.8 4.4 23 4Z" fill="white" fillOpacity="0.4"/>
                  <rect x="2" y="2" width="18" height="8" rx="1.5" fill="white"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Dynamic Island */}
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-50" />

          {/* Content with safe area */}
          <div className="absolute top-[54px] left-0 right-0 bottom-0 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
