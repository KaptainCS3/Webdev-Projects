import React from "react";

interface Definition {
  definition: string;
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  antonyms: string[];
  synonyms: string[];
}

interface ResultItem {
  meanings: Meaning[];
}

interface NounsProps {
  result: ResultItem[];
  font: string;
}

const Nouns: React.FC<NounsProps> = ({ result, font }) => {
  return (
    <div>
      {result.map((el, index) => {
        return el.meanings.map((e, meaningIndex) => {
          return (
            <div key={`${index}-${meaningIndex}`}>
              <div className="flex justify-between items-center py-3">
                <p className="list dark:text-white sm:text-xl capitalize">
                  {e.partOfSpeech}
                </p>
                <span className="border-t-[1px] w-[70%] block mt-[0.25rem]"></span>
              </div>
              <p className="text-[#A0A0A0] text-[1rem]">Meaning</p>
              {e.definitions.map((list, listIndex) => {
                return (
                  <ul key={listIndex} className="list-none">
                    <li
                      className={`py-3 sm:text-[0.95rem] list_items px-7 dark:text-white ${
                        font === "monospace" ? "list_itemsmono" : ""
                      }`}
                    >
                      <span className={font === "monospace" ? "mono" : ""}>
                        {list.definition}
                      </span>
                    </li>
                    {list.example ? (
                      <small className="dark:text-[#A0A0A0] text-sm pl-6 -mt-2 block">
                        "{list.example}"
                      </small>
                    ) : null}
                  </ul>
                );
              })}
              {e.antonyms.length === 0 ? (
                ""
              ) : (
                <span className="dark:text-white text-xl border-b-[1px] block py-3">
                  Antonyms
                </span>
              )}
              <div className="px-2 sm:flex flex-wrap justify-evenly items-center py-3">
                {e.antonyms.map((antonym, antonymIndex) => {
                  return (
                    <React.Fragment key={antonymIndex}>
                      {antonym ? (
                        <span className="text-[#A641F5] font-medium px-2 cursor-pointer">
                          {antonym}
                        </span>
                      ) : (
                        ""
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
              {e.synonyms.length === 0 ? (
                ""
              ) : (
                <span className="dark:text-white text-xl border-b-[1px] block py-3">
                  Synonyms
                </span>
              )}
              <div className="px-2 sm:flex flex-wrap justify-evenly items-center py-3">
                {e.synonyms.map((synonym, synonymIndex) => {
                  return (
                    <React.Fragment key={synonymIndex}>
                      {synonym ? (
                        <span className="text-[#A641F5] font-medium px-2 cursor-pointer">
                          {synonym}
                        </span>
                      ) : (
                        ""
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          );
        });
      })}
    </div>
  );
};

export default Nouns;
