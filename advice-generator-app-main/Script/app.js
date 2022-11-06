const id = document.querySelector("#id");
const advices = document.querySelector(".description");
const btn = document.querySelector(".btn");

const getResponse = async () =>{
    const response = await fetch("https://api.adviceslip.com/advice");
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        else{
            const data = await response.json(); // Extracting data as a JSON Object from the response
            id.innerHTML = data.slip.id;
            advices.innerHTML = `“${data.slip.advice}”`;
        }   
    };

btn.addEventListener("click", getResponse)
getResponse()