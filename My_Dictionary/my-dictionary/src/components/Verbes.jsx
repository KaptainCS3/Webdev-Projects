import React from "react";
import keyboard from "../keyboard.json";
const Verbes = () => {
  const example = keyboard.map((el) => {
    return el.meanings[1].definitions[0].example;
  });
  console.log(example);
  return (
    <div>
      {keyboard.map((el) => {
        return (
          <div>
            <div className="flex justify-between items-center py-3">
              <ul className="dark:text-white sm:text-xl">
                {el.meanings[1].partOfSpeech}
              </ul>
              <span className="border-t-[1px] w-[82%] block mt-2"></span>
            </div>
            <p className="text-[#A0A0A0]">Meaning</p>
            {el.meanings[1].definitions.map((list) => {
              return (
                <ul className="list-none">
                  <li className="py-3 sm:text-[0.95rem] list_items px-7 dark:text-white">
                    <span>{list.definition}</span>
                    <br />
                  </li>
                  <span className="px-7">{example}</span>
                </ul>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Verbes;
