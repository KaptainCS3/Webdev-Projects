import React from "react";
const Resource = ({ result }) => {
  return (
    <div className="border-t-[1px] mt-6 pt-4 pb-6 dark:text-white">
      {result.map((el) => {
        return (
          <a href={el.sourceUrls} target="_blank" className="flex flex-wrap">
            <span className="px-2">Source:</span>
            <span>{el.sourceUrls}</span>
          </a>
        );
      })}
    </div>
  );
};

export default Resource;
