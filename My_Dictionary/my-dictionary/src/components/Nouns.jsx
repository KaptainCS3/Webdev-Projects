import React from "react";
const Nouns = ({ result, font }) => {
  return (
    <div>
      {result.map((el) => {
        return el.meanings.map((e) => {
          return (
            <div>
              <div className="flex justify-between items-center py-3">
                <p className="list dark:text-white sm:text-xl capitalize">
                  {e.partOfSpeech}
                </p>
                <span className="border-t-[1px] w-[70%] block mt-[0.25rem]"></span>
              </div>
              <p className="text-[#A0A0A0] text-[1rem]">Meaning</p>
              {e.definitions.map((list) => {
                return (
                  <ul className="list-none">
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
                {e.antonyms.map((e) => {
                  return (
                    <>
                      {e ? (
                        <span className="text-[#A641F5] font-medium px-2 cursor-pointer">
                          {e}
                        </span>
                      ) : (
                        ""
                      )}
                    </>
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
                {e.synonyms.map((e) => {
                  return (
                    <>
                      {e ? (
                        <span className="text-[#A641F5] font-medium px-2 cursor-pointer">
                          {e}
                        </span>
                      ) : (
                        ""
                      )}
                    </>
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
