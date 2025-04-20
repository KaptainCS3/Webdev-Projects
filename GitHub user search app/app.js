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
const webSite = document.querySelector("#link");
const company = document.querySelector("#company");
const gitProfile = document.querySelector(".img__profile");
const gitAvatar = document.querySelector("#git__avatar");
const formInput = document.querySelector(".input__form");
const btn = document.querySelector("#btn");
const nav = document.querySelector(".nav");
const boiProfile = document.querySelector(".profile__boi");
const profileDetail = document.querySelector(".profile__detail");
const formSubmit = document.querySelector(".form__container");
const image = document.querySelector(".theme__pointer");
const formContainer = document.querySelector(".wrapper");
const mainContainer = document.querySelector(".content");
const statsContainer = document.querySelector(".git__stats");
const monthArray = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
themeBtn.addEventListener("click", () => {
  image.getAttribute("src") == "./assets/icon-sun.svg"
    ? image.setAttribute("src", "./assets/icon-moon.svg")
    : image.setAttribute("src", "./assets/icon-sun.svg");
  if (themeIndicator.innerText === "light".toLocaleUpperCase()) {
    themeIndicator.innerText = "dark".toLocaleUpperCase();
    document.querySelector("#root").style.background = "#f6f8ff";
    formContainer.style.background = "#fefefe";
    mainContainer.style.background = "#fefefe";
    statsContainer.style.background = "#f6f8ff";
    formInput.style.color = "#4b6a9b";
    document.querySelector(".svg__location").setAttribute("fill", "#4b6a9b");
    document.querySelector(".svg__twitter").setAttribute("fill", "#4b6a9b");
    document.querySelector(".svg__blog").setAttribute("fill", "#4b6a9b");
    document.querySelector(".svg__company").setAttribute("fill", "#4b6a9b");
    repoText.style.color = "#000";
    followersText.style.color = "#000";
    followingText.style.color = "#000";
  } else {
    repoText.style.color = "#f6f8ff";
    followersText.style.color = "#f6f8ff";
    followingText.style.color = "#f6f8ff";
    formInput.style.color = "#f6f8ff";
    themeIndicator.innerText = "light".toLocaleUpperCase();
    formContainer.style.background = "#1E2A47";
    document.querySelector("#root").style.background = "#141d2f";
    mainContainer.style.background = "#1E2A47";
    statsContainer.style.background = "#141d2f";
    document.querySelector(".svg__location").setAttribute("fill", "#f6f8ff");
    document.querySelector(".svg__twitter").setAttribute("fill", "#f6f8ff");
    document.querySelector(".svg__blog").setAttribute("fill", "#f6f8ff");
    document.querySelector(".svg__company").setAttribute("fill", "#f6f8ff");
  }
  gitName.classList.toggle("text-white");
  joinDate.classList.toggle("dark");
  nav.classList.toggle("text-white");
  boiProfile.classList.toggle("text");
  profileDetail.classList.toggle("dark");
  // stats.classList.toggle("value");
});

function launchConfetti() {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  });
}


formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
  formInput.value === ""
    ? document.querySelector(".error__smg").innerText = "Input fill is blank"
    : (document.querySelector(".error__smg").innerText = "");
});
const getResponse = async (gitUserName) => {
  const response = await fetch(`https://api.github.com/users/${gitUserName}`);

  //! check for search result
  if (response.status === 404) {
    document.querySelector(".error__smg").innerText = "User Not Found";
    document.querySelector(".form__container").classList.add("shake");
    setTimeout(() => {
      document.querySelector(".form__container").classList.remove("shake");
    }, 500);
    return;
  } 
  if (!response.ok) {
    throw new Error(response.error);
  } else {
    const data = await response.json();
    formInput.value = "";
    launchConfetti();
    //!get github avarta img
    data.avatar_url
      ? gitAvatar.setAttribute("src", data.avatar_url)
      : gitAvatar.setAttribute("src", "./assets/image-user-placeholder.png");

    //!get github userName
    data.name
      ? (gitName.innerText = `The ${data.name}`)
      : (gitName.innerText = `The ${data.login}`);

    //!get github login name
    loginName.innerText = `@${data.login}`;
    loginName.setAttribute("href", data.html_url);

    //!get github date join
    joinDate.innerText = `Joined on ${data.created_at.slice(8, 10)} ${
      monthArray[data.created_at.slice(5, 7) - 1]
    }  ${data.created_at.slice(0, 4)}`;

    //!get github user bio
    data.bio
      ? (bioText.innerText = data.bio)
      : (bioText.innerText = "This profile has no bio");

    //!get github public repo
    data.public_repos
      ? (repoText.innerText = data.public_repos)
      : (repoText.innerText = "0");

    //!get github followers
    data.followers
      ? (followersText.innerText = data.followers)
      : (followersText.innerText = "0");

    //!get github following
    data.following
      ? (followingText.innerText = data.following)
      : (followingText.innerText = "0");

    //!get github user location
    if (data.location) userLocation.innerText = data.location;
    else {
      userLocation.innerText = "Not Available";
      document.querySelector(".location").style.opacity = "0.5";
    }

    //!get github user twitter name
    if (data.twitter_username) {
      twitter.innerText = `@${data.twitter_username}`;
      twitter.setAttribute(
        "href",
        `https://x.com/${data.twitter_username}`
      );
      twitter.setAttribute("target", "_blank");
    } else {
      twitter.innerText = "Not Available";
      document.querySelector(".twitter").style.opacity = "0.5";
      twitter.removeAttribute("href");
      twitter.style.cursor = "not-allowed";
    }

    //!get github user company
    if (data.company) company.innerText = data.company;
    else {
      company.innerText = "Not Available";
      company.style.cursor = "not-allowed";
      company.removeAttribute("href");
      document.querySelector(".company").style.opacity = "0.5";
    }

    //!get github user blog
    if (data.blog) {
      const link = data.blog.split("/")[2];
      webSite.innerText = link;
      webSite.setAttribute("href", data.blog);
      webSite.setAttribute("target", "_blank");
      webSite.classList.add("truncate"); // add truncate class
    } else {
      webSite.innerText = "Not Available";
      document.querySelector(".blog").style.opacity = "0.5";
      webSite.removeAttribute("href");
      webSite.style.cursor = "not-allowed";
    }
  }
  //!fill svg path
  document.querySelector(".svg__location").setAttribute("fill", "#f6f8ff");
  document.querySelector(".svg__twitter").setAttribute("fill", "#f6f8ff");
  document.querySelector(".svg__blog").setAttribute("fill", "#f6f8ff");
  document.querySelector(".svg__company").setAttribute("fill", "#f6f8ff");
};
btn.addEventListener("click", () => {
  const gitUserName = formInput.value;
  getResponse(gitUserName);
});

//!Default user
getResponse("KaptainCS3");
