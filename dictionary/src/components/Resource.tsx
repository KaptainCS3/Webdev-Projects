import React from "react";

interface DictionaryResult {
  sourceUrls: string[];
}

interface ResourceProps {
  result: DictionaryResult[];
}

const Resource: React.FC<ResourceProps> = ({ result }) => {
  return (
    <div className="border-t-[1px] mt-6 pt-4 pb-6 dark:text-white">
      {result.map((el, index) => (
        <div key={index} className="flex flex-wrap">
          <span className="px-2">Source:</span>
          {el.sourceUrls.map((url, urlIdx) => (
            <a
              key={urlIdx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 underline"
            >
              {url}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Resource;
