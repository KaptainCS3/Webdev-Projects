import React, { useState, useRef, useEffect } from "react";

const KeyWord = ({ result }) => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const audioRef = useRef(null);

  const toggleAudio = (audioSrc) => {
    if (audioSrc === currentAudio) {
      // Pause the current audio element if it's already playing
      audioRef.current.pause();
      setCurrentAudio(null);
    } else {
      // Play the new audio element and update the current audio state
      audioRef.current.src = audioSrc;
      audioRef.current.play();
      setCurrentAudio(audioSrc);
    }
  };

  const handleAudioEnded = () => {
    // Reset the current audio state when the audio finishes playing
    setCurrentAudio(null);
  };

  useEffect(() => {
    // Pause the current audio element when the component unmounts or the result changes
    return () => {
      if (currentAudio) {
        audioRef.current.pause();
        setCurrentAudio(null);
      }
    };
  }, [result]);

  return (
    <div>
      {result.map((el) => (
        <div key={el.word}>
          <h1 className="text-[#2D2D2D] dark:text-white text-3xl capitalize">
            {el.word}
          </h1>
          <div>
            {el.phonetics.map((list, index) => {
              if (!list.audio) {
                return null;
              }

              const audioSrc = list.audio;

              return (
                <div key={index}>
                  <p className="text-[#A641F5] py-3">{list.text}</p>
                  <div
                    onClick={() => toggleAudio(audioSrc)}
                    className={`cursor-pointer w-10 h-10 rounded-full bg-[#E9D0FA] flex justify-center items-center`}
                  >
                    <audio
                      src={audioSrc}
                      ref={audioRef}
                      onEnded={handleAudioEnded}
                    />
                    <div
                      className={
                        audioSrc === currentAudio
                          ? "button"
                          : "border-t-8 border-b-8 border-l-[12px] border-t-transparent border-b-transparent border-r-0 border-l-[#A641F5]"
                      }
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KeyWord;
