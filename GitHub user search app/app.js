// DOM Elements
const domRefs = {
  themeBtn: document.querySelector(".theme__pointer"),
  themeIndicator: document.querySelector(".theme__indicator"),
  gitName: document.querySelector(".git__name"),
  loginName: document.querySelector(".login__name"),
  joinDate: document.querySelector(".join__date"),
  bioText: document.querySelector("#bio__text"),
  repoText: document.querySelector(".repo__text"),
  followersText: document.querySelector("#followers"),
  followingText: document.querySelector("#following"),
  userLocation: document.querySelector("#location"),
  twitter: document.querySelector("#twitter__name"),
  webSite: document.querySelector("#link"),
  company: document.querySelector("#company"),
  gitAvatar: document.querySelector("#git__avatar"),
  formInput: document.querySelector(".input__form"),
  btn: document.querySelector("#btn"),
  errorMsg: document.querySelector(".error__smg"),
  formContainer: document.querySelector(".form__container"),
  mainContainer: document.querySelector(".content"),
};

const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
};

// Theme Configuration
const themeConfig = {
  dark: {
    icon: "./assets/icon-moon.svg",
    indicator: "DARK",
  },
  light: {
    icon: "./assets/icon-sun.svg",
    indicator: "LIGHT",
  },
};

// Date Formatter
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const showSkeleton = () => {
  document
    .querySelectorAll(".skeleton-loading")
    .forEach((el) => el.classList.remove("hidden"));
  document
    .querySelectorAll(
      "#git__avatar, .git__name, .login__name, .join__date, #bio__text, .repo__text, #followers, #following, #location, #twitter__name, #link, #company"
    )
    .forEach((el) => el.classList.add("hidden"));
};

const hideSkeleton = () => {
  document
    .querySelectorAll(".skeleton-loading")
    .forEach((el) => el.classList.add("hidden"));
  document
    .querySelectorAll(
      "#git__avatar, .git__name, .login__name, .join__date, #bio__text, .repo__text, #followers, #following, #location, #twitter__name, #link, #company"
    )
    .forEach((el) => el.classList.remove("hidden"));
};

// Theme Management
const updateTheme = (isDark) => {
  document.documentElement.classList.toggle("dark", isDark);
  domRefs.themeIndicator.textContent = isDark ? "LIGHT" : "DARK";
  domRefs.themeBtn.src = isDark
    ? "./assets/icon-sun.svg"
    : "./assets/icon-moon.svg";
};

// System Theme Detection
const handleSystemThemeChange = (e) => {
  if (!("theme" in localStorage)) {
    updateTheme(e.matches);
  }
};

// Initialize Theme
const initializeTheme = () => {
  const isDark =
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  updateTheme(isDark);
};

// Error Handling
const showError = (message) => {
  domRefs.errorMsg.textContent = message;
  domRefs.formContainer.classList.add("shake");
  setTimeout(() => domRefs.formContainer.classList.remove("shake"), 500);
  domRefs.mainContainer.classList.add("error_style");
};

// Reset Field Styles
const resetFieldStyles = (element) => {
  element.style.opacity = "1";
  element.style.cursor = "pointer";
  element.removeAttribute("title");
};

// Update User Data
const updateUserData = (data) => {
  const {
    avatar_url,
    name,
    login,
    created_at,
    bio,
    public_repos,
    followers,
    following,
    location,
    twitter_username,
    blog,
    company: userCompany,
  } = data;

  domRefs.gitAvatar.src = avatar_url || "./assets/image-user-placeholder.png";
  domRefs.gitName.textContent = name
    ? `The ${truncateText(name, 20)}`
    : `The ${login}`;
  domRefs.loginName.textContent = `@${login}`;
  domRefs.loginName.href = data.html_url;
  domRefs.joinDate.textContent = `Joined ${formatDate(created_at)}`;
  domRefs.bioText.textContent = bio
    ? truncateText(bio, 120)
    : "This profile has no bio";

  domRefs.repoText.textContent = `📦 ${public_repos || "0"}`;
  domRefs.followersText.textContent = `👥 ${followers || "0"}`;
  domRefs.followingText.textContent = `➡️ ${following || "0"}`;

  // Additional Info
  const updateField = (element, value, link) => {
    if (value) {
      element.textContent = value;
      if (link) element.href = link;
      resetFieldStyles(element.parentElement);
    } else {
      element.textContent = "Not Available";
      element.parentElement.style.opacity = "0.5";
      element.removeAttribute("href");
      element.style.cursor = "not-allowed";
    }
  };

  updateField(domRefs.userLocation, location);
  updateField(
    domRefs.twitter,
    twitter_username && `@${twitter_username}`,
    twitter_username && `https://x.com/${twitter_username}`
  );
  updateField(domRefs.company, userCompany);

  // Website Handling
  if (blog) {
    const link = blog.startsWith("http") ? blog : `https://${blog}`;
    domRefs.webSite.textContent = new URL(link).hostname;
    domRefs.webSite.href = link;
    domRefs.webSite.classList.add("truncate");
    resetFieldStyles(domRefs.webSite.parentElement);
  } else {
    domRefs.webSite.textContent = "Not Available";
    domRefs.webSite.parentElement.style.opacity = "0.5";
    domRefs.webSite.removeAttribute("href");
  }
};

// Fetch User Data
const fetchUserData = async (username) => {
  try {
    showSkeleton();
    domRefs.btn.disabled = true;
    domRefs.btn.textContent = "Searching...";

    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok)
      throw response.status === 404 ? "User Not Found" : "API Error";

    const data = await response.json();
    updateUserData(data);
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
  } catch (error) {
    showError(typeof error === "string" ? error : "Failed to fetch user data");
  } finally {
     hideSkeleton();
    domRefs.btn.disabled = false;
    domRefs.btn.textContent = "Search";
    domRefs.formInput.value = "";
  }
};

// Theme toggle handler
domRefs.themeBtn.addEventListener("click", () => {
  const isDark = !document.documentElement.classList.contains("dark");
  localStorage.theme = isDark ? "dark" : "light";
  updateTheme(isDark);
});

domRefs.formContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = domRefs.formInput.value.trim();
  if (!username) return showError("Please enter a username");
  fetchUserData(username);
});

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", handleSystemThemeChange);

// Initialization
initializeTheme();
fetchUserData("KaptainCS3");

domRefs.formInput.addEventListener("change", () => {
  domRefs.formInput.classList.add("input__form");
});
