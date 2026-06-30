import { useState } from "react";
import ModelTitle from "../../../ui/modelsTitle";

const SingleNewsModel12 = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = data?.content || [];
  return (
    <div>
      <ModelTitle title={data?.title} />

      {/* Tabs Header */}
      <div className="mt-[1rem] flex flex-wrap gap-2 border-b border-[#C4C4C4]">
        {tabs?.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`pb-2 px-4 text-sm transition-colors cursor-pointer ${
              activeTab === index
                ? "text-secondary font-bold border-b-2 border-secondary"
                : "text-[#959595] font-[400]"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tabs?.length > 0 && (
        <div className="mt-[1rem]">
          <h2 className="text-[#000000] font-bold text-lg mb-4">
            {tabs[activeTab]?.title}
          </h2>
          <p className="text-[#000000] text-md leading-relaxed">
            {tabs[activeTab]?.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default SingleNewsModel12;
