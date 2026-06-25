// components/ui/mobileHistoryTimeline.jsx
import React from "react";

const OurHistoryComponent = ({ aboutusData }) => {
  return (
    <div>
      {aboutusData?.data?.stations_in_our_history.map((item, index) => (
         <div key={index} className="flex gap-x-3 mt-[2rem] items-center">
              <div className="h-auto w-full border rounded-md p-[1.5rem] border-[#BBCEE4] bg-white relative">
                <div className="absolute w-[1rem] h-[1rem] top-[-0.1rem] right-[-0.5rem] rounded-full bg-white flex justify-center items-center">
                  <div className="w-[0.5rem] h-[0.5rem] bg-secondary rounded-full"></div>
                </div>
                <h1 className="font-bold text-[#1B1C1C] md:text-xl text-md">{item.title}</h1>
                <p className="text-[#5F5E5E] md:text-lg text-md mt-2">{item.description}</p>
              </div>
              <p className="text-secondary font-bold md:text-lg text-md whitespace-nowrap">{item.year}</p>
            </div>
      ))}
    </div>
  );
};

export default OurHistoryComponent;