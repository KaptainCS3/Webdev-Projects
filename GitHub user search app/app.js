const themeBtn = document.querySelector(".theme__pointer");
const themeIndicator = document.querySelector(".theme__indicator");
const gitName = document.querySelector(".git__name");
const loginName = document.querySelector(".login__name");
const joinDate = document.querySelector(".join__date");
const profileBio = document.querySelector(".profile__boi");
const bioText = document.querySelector("#bio__text");
const repoText = document.querySelector(".repo__text");
const followersText = document.querySelector("#followers");
const followingText = document.querySelector("#following");
const userLocation = document.querySelector("#location");
const twitter = document.querySelector("#twitter__name");
const website = document.querySelector("#website");
const company = document.querySelector("#company");
const gitProfile = document.querySelector(".img__profile");
const gitAvatar = document.querySelector("#git__avatar");
const formInput = document.querySelector(".input__form");
const btn = document.querySelector("#btn");
const nav = document.querySelector(".nav");
// const stats = document.querySelectorAll(".value");
const boiProfile = document.querySelector(".profile__boi");
const profileDetail = document.querySelector(".profile__detail");
const formSubmit = document.querySelector(".form__container");
const image = document.querySelector(".theme__pointer");
const formContainer = document.querySelector(".wrapper");
const mainContainer = document.querySelector(".content");
const statsContainer = document.querySelector(".git__stats");

themeBtn.addEventListener("click", () => {
  image.getAttribute("src") == "./assets/icon-sun.svg"
    ? image.setAttribute("src", "./assets/icon-moon.svg")
    : image.setAttribute("src", "./assets/icon-sun.svg");
  if (themeIndicator.innerHTML === "light".toLocaleUpperCase()) {
    themeIndicator.innerHTML = "dark".toLocaleUpperCase();
    document.querySelector("#root").style.background = "#f6f8ff";
    formContainer.style.background = "#fefefe";
    mainContainer.style.background = "#fefefe";
    statsContainer.style.background = "#f6f8ff";
  } else {
    themeIndicator.innerHTML = "light".toLocaleUpperCase();
    formContainer.style.background = "#1E2A47";
    document.querySelector("#root").style.background = "#141d2f";
    mainContainer.style.background = "#1E2A47";
    statsContainer.style.background = "#141d2f";
  }
  gitName.classList.toggle("text-white");
  joinDate.classList.toggle("dark");
  nav.classList.toggle("text-white");
  boiProfile.classList.toggle("text");
  profileDetail.classList.toggle("dark");
  // stats.classList.toggle("value");
});

formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
});
const getResponse = async () => {
  const response = await fetch(
    `https://api.github.com/users/${formInput.value}`
  );
  if (!response.ok) {
    throw new Error(response.error);
  } else {
    const data = await response.json();
    console.log(data);
    //!get github avarta img
    data.avatar_url
      ? gitAvatar.setAttribute("src", data.avatar_url)
      : gitAvatar.setAttribute("src", "./assets/image-user-placeholder.png");

    //!get github userName
    data.name
      ? (gitName.innerHTML = `The ${data.name}`)
      : (gitName.innerHTML = ``);

    //!get github login name
    data.login
      ? (loginName.innerHTML = `@${data.login}`)
      : (loginName.innerHTML = "");

    //!get github date join
    data.created_at
      ? (joinDate.innerHTML = `Joined ${
          data.created_at.split("T")[0]
        } ${data.created_at.slice(0, 4)}`)
      : (joinDate.innerHTML = "");
  }
};
btn.addEventListener("click", () => {
  getResponse();
});

//   "name": "The Octocat",
//   "login": "octocat",
//   "created_at": "2011-01-25T18:44:36Z",
//   "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=4",
//   "bio": null,
//  "public_repos": 8,
//   "followers": 8320,
//   "following": 9,
//   "location": "San Francisco",
//   "twitter_username": null,
//   "blog": "https://github.blog",
//   "company": "@github",
