function getSavedSiteForUser(userName) {
  if (!userName) return null;
  return JSON.parse(localStorage.getItem(`savedSite:${userName}`) || "null");
}

const savedSite = getSavedSiteForUser(localStorage.getItem("currentUser") || "");

const state = {
  label: window.APP_CONFIG.label,
  title: savedSite?.title || window.APP_CONFIG.title,
  homeTitle: savedSite?.homeTitle || window.APP_CONFIG.homeTitle,
  loginText: savedSite?.loginText || window.APP_CONFIG.loginText,
  color: savedSite?.color || window.APP_CONFIG.color,
  ownerPassword: window.APP_CONFIG.ownerPassword,
  accountMode: "login",
  currentUser: localStorage.getItem("currentUser") || "",
  isOwner: false,
  hasUnsavedChanges: false,
  activeSection: null,
  sections: savedSite?.sections || window.APP_CONFIG.sections.map((section) => ({ ...section })),
  cards: savedSite?.cards || window.APP_CONFIG.cards.map((card) => ({ ...card }))
};

const root = document.documentElement;
const appLabel = document.querySelector("#appLabel");
const appTitle = document.querySelector("#appTitle");
const connectedWelcome = document.querySelector("#connectedWelcome");
const sessionInfo = document.querySelector("#sessionInfo");
const titleInput = document.querySelector("#titleInput");
const colorInput = document.querySelector("#colorInput");
const homeTitle = document.querySelector("#homeTitle");
const homeTitleInput = document.querySelector("#homeTitleInput");
const loginIntroText = document.querySelector("#loginIntroText");
const loginTextInput = document.querySelector("#loginTextInput");
const welcomePanel = document.querySelector("#welcomePanel");
const sectionLinks = document.querySelector("#sectionLinks");
const contentPanel = document.querySelector("#contentPanel");
const contentTitle = document.querySelector("#contentTitle");
const contentText = document.querySelector("#contentText");
const contentVideo = document.querySelector("#contentVideo");
const backHomeButton = document.querySelector("#backHomeButton");
const sectionTitleInput = document.querySelector("#sectionTitleInput");
const sectionDescriptionInput = document.querySelector("#sectionDescriptionInput");
const sectionVideoInput = document.querySelector("#sectionVideoInput");
const sectionTextInput = document.querySelector("#sectionTextInput");
const cardsElement = document.querySelector("#cards");
const cardTemplate = document.querySelector("#cardTemplate");
const accountButton = document.querySelector("#accountButton");
const accountPanel = document.querySelector("#accountPanel");
const loginTab = document.querySelector("#loginTab");
const signupTab = document.querySelector("#signupTab");
const accountNameInput = document.querySelector("#accountNameInput");
const accountEmailLabel = document.querySelector("#accountEmailLabel");
const accountEmailInput = document.querySelector("#accountEmailInput");
const accountPasswordInput = document.querySelector("#accountPasswordInput");
const submitAccountButton = document.querySelector("#submitAccountButton");
const logoutButton = document.querySelector("#logoutButton");
const accountMessage = document.querySelector("#accountMessage");
const editButton = document.querySelector("#editButton");
const adminButton = document.querySelector("#adminButton");
const saveButton = document.querySelector("#saveButton");
const loginPanel = document.querySelector("#loginPanel");
const passwordInput = document.querySelector("#passwordInput");
const unlockButton = document.querySelector("#unlockButton");
const loginMessage = document.querySelector("#loginMessage");
const editorPanel = document.querySelector(".editor-panel");

function getAccounts() {
  const accounts = JSON.parse(localStorage.getItem("appAccounts") || "{}");
  Object.keys(accounts).forEach((name) => {
    if (typeof accounts[name] === "string") {
      accounts[name] = {
        password: accounts[name],
        email: ""
      };
    }
  });
  accounts["Le créateur"] = {
    password: "@CraftStudio456",
    email: "louis.magron.1214@outlook.fr"
  };
  return accounts;
}

function saveAccounts(accounts) {
  localStorage.setItem("appAccounts", JSON.stringify(accounts));
}

function saveSite() {
  if (!state.currentUser) return;

  localStorage.setItem(`savedSite:${state.currentUser}`, JSON.stringify({
    title: state.title,
    homeTitle: state.homeTitle,
    loginText: state.loginText,
    color: state.color,
    sections: state.sections,
    cards: state.cards
  }));
  state.hasUnsavedChanges = false;
  saveButton.textContent = "Enregistre";
}

function loadSiteForCurrentUser() {
  const userSite = getSavedSiteForUser(state.currentUser);
  state.title = userSite?.title || window.APP_CONFIG.title;
  state.homeTitle = userSite?.homeTitle || window.APP_CONFIG.homeTitle;
  state.loginText = userSite?.loginText || window.APP_CONFIG.loginText;
  state.color = userSite?.color || window.APP_CONFIG.color;
  state.sections = userSite?.sections || window.APP_CONFIG.sections.map((section) => ({ ...section }));
  state.cards = userSite?.cards || window.APP_CONFIG.cards.map((card) => ({ ...card }));
  state.hasUnsavedChanges = false;
}

function markChanged() {
  state.hasUnsavedChanges = true;
  saveButton.textContent = "Enregistrer";
}

function updateAccountPanel() {
  const isLogin = state.accountMode === "login";
  const isConnected = Boolean(state.currentUser);
  document.body.classList.toggle("logged-in", isConnected);
  connectedWelcome.hidden = !isConnected;
  loginTab.classList.toggle("active", isLogin);
  signupTab.classList.toggle("active", !isLogin);
  accountEmailLabel.hidden = isLogin;
  submitAccountButton.textContent = isLogin ? "Se connecter" : "Creer le compte";
  logoutButton.hidden = !isConnected;
  welcomePanel.hidden = !isConnected || state.activeSection !== null;
  contentPanel.hidden = !isConnected || state.activeSection === null;
  cardsElement.hidden = true;
  editButton.hidden = !isConnected;
  adminButton.hidden = !isConnected || !state.isOwner;
  saveButton.hidden = !isConnected || !state.isOwner;
  accountButton.textContent = isConnected ? "Compte" : "Connexion";
  sessionInfo.textContent = state.currentUser
    ? `Connecte : ${state.currentUser}`
    : "Connecte-toi pour accéder au site";

  if (!isConnected) {
    accountPanel.hidden = false;
    loginPanel.hidden = true;
    contentPanel.hidden = true;
    welcomePanel.hidden = true;
    state.isOwner = false;
  }
}

function updateMode() {
  if (!state.currentUser) {
    document.body.classList.remove("owner-mode");
    editorPanel.hidden = true;
    saveButton.hidden = true;
    adminButton.hidden = true;
    editButton.hidden = true;
    loginPanel.hidden = true;
    return;
  }

  document.body.classList.toggle("owner-mode", state.isOwner);
  editorPanel.hidden = !state.isOwner;
  saveButton.hidden = !state.isOwner;
  adminButton.hidden = !state.isOwner;
  if (state.isOwner) {
    loginPanel.hidden = true;
  }
  editButton.textContent = state.isOwner ? "Verrouiller" : "Modifier";
}

function renderHeader() {
  root.style.setProperty("--accent", state.color);
  appLabel.textContent = state.label;
  appTitle.textContent = state.title;
  homeTitle.textContent = state.homeTitle;
  loginIntroText.textContent = state.loginText;
  updateAccountPanel();
  titleInput.value = state.title;
  colorInput.value = state.color;
  homeTitleInput.value = state.homeTitle;
  loginTextInput.value = state.loginText;
  renderSections();
}

function getVideoEmbed(url) {
  if (!url) return "";
  if (url.includes("youtube.com/embed/")) return url;

  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

  return url;
}

function renderSections() {
  sectionLinks.innerHTML = "";

  state.sections.forEach((section, index) => {
    const button = document.createElement("button");
    button.className = "section-card";
    button.type = "button";
    button.innerHTML = `<strong>${section.title}</strong><span>${section.description}</span>`;
    button.addEventListener("click", () => {
      state.activeSection = index;
      renderSectionContent();
      updateAccountPanel();
    });
    sectionLinks.appendChild(button);
  });

  renderSectionEditor();
}

function renderSectionContent() {
  const section = state.sections[state.activeSection];
  if (!section) return;

  contentTitle.textContent = section.title;
  contentText.textContent = section.text;
  contentVideo.innerHTML = "";

  const videoUrl = getVideoEmbed(section.videoUrl);
  contentVideo.hidden = !videoUrl;

  if (!videoUrl) return;

  if (videoUrl.endsWith(".mp4")) {
    const video = document.createElement("video");
    video.controls = true;
    video.src = videoUrl;
    contentVideo.appendChild(video);
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.src = videoUrl;
  iframe.title = section.title;
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;
  contentVideo.appendChild(iframe);
}

function renderSectionEditor() {
  const section = state.sections[state.activeSection ?? 0];
  if (!section) return;

  sectionTitleInput.value = section.title;
  sectionDescriptionInput.value = section.description;
  sectionVideoInput.value = section.videoUrl;
  sectionTextInput.value = section.text;
}

function renderCards() {
  cardsElement.innerHTML = "";

  state.cards.forEach((card, index) => {
    const fragment = cardTemplate.content.cloneNode(true);
    const article = fragment.querySelector(".card");
    const title = fragment.querySelector(".card-title");
    const text = fragment.querySelector(".card-text");
    const readTitle = fragment.querySelector(".read-title");
    const readText = fragment.querySelector(".read-text");
    const deleteButton = fragment.querySelector(".delete-button");

    title.value = card.title;
    text.value = card.text;
    readTitle.textContent = card.title;
    readText.textContent = card.text;

    title.addEventListener("input", () => {
      state.cards[index].title = title.value;
      readTitle.textContent = title.value;
      markChanged();
    });

    text.addEventListener("input", () => {
      state.cards[index].text = text.value;
      readText.textContent = text.value;
      markChanged();
    });

    deleteButton.addEventListener("click", () => {
      state.cards.splice(index, 1);
      markChanged();
      renderCards();
    });

    article.style.animationDelay = `${index * 60}ms`;
    cardsElement.appendChild(fragment);
  });
}

titleInput.addEventListener("input", () => {
  state.title = titleInput.value;
  appTitle.textContent = state.title;
  markChanged();
});

colorInput.addEventListener("input", () => {
  state.color = colorInput.value;
  root.style.setProperty("--accent", state.color);
  markChanged();
});

loginTextInput.addEventListener("input", () => {
  state.loginText = loginTextInput.value;
  loginIntroText.textContent = state.loginText;
  markChanged();
});

homeTitleInput.addEventListener("input", () => {
  state.homeTitle = homeTitleInput.value;
  homeTitle.textContent = state.homeTitle;
  markChanged();
});

sectionTitleInput.addEventListener("input", () => {
  const section = state.sections[state.activeSection ?? 0];
  section.title = sectionTitleInput.value;
  markChanged();
  renderSections();
  renderSectionContent();
});

sectionDescriptionInput.addEventListener("input", () => {
  const section = state.sections[state.activeSection ?? 0];
  section.description = sectionDescriptionInput.value;
  markChanged();
  renderSections();
});

sectionVideoInput.addEventListener("input", () => {
  const section = state.sections[state.activeSection ?? 0];
  section.videoUrl = sectionVideoInput.value;
  markChanged();
  renderSectionContent();
});

sectionTextInput.addEventListener("input", () => {
  const section = state.sections[state.activeSection ?? 0];
  section.text = sectionTextInput.value;
  markChanged();
  renderSectionContent();
});

backHomeButton.addEventListener("click", () => {
  state.activeSection = null;
  updateAccountPanel();
  renderSectionEditor();
});

saveButton.addEventListener("click", () => {
  if (!state.isOwner) return;
  saveSite();
});

editButton.addEventListener("click", () => {
  if (state.isOwner) {
    state.isOwner = false;
    loginPanel.hidden = true;
    loginMessage.textContent = "";
    passwordInput.value = "";
    updateMode();
    renderCards();
    return;
  }

  loginPanel.hidden = !loginPanel.hidden;
  passwordInput.focus();
});

unlockButton.addEventListener("click", () => {
  if (passwordInput.value === state.ownerPassword) {
    state.isOwner = true;
    loginPanel.hidden = true;
    loginMessage.textContent = "";
    updateMode();
    renderCards();
    return;
  }

  loginMessage.textContent = "Mot de passe incorrect.";
});

passwordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    unlockButton.click();
  }
});

accountButton.addEventListener("click", () => {
  if (!state.currentUser) {
    accountPanel.hidden = false;
    accountMessage.textContent = "";
    accountNameInput.focus();
    return;
  }

  accountPanel.hidden = !accountPanel.hidden;
  accountMessage.textContent = "";
  accountNameInput.focus();
});

loginTab.addEventListener("click", () => {
  state.accountMode = "login";
  accountMessage.textContent = "";
  updateAccountPanel();
});

signupTab.addEventListener("click", () => {
  state.accountMode = "signup";
  accountMessage.textContent = "";
  updateAccountPanel();
});

submitAccountButton.addEventListener("click", () => {
  const name = accountNameInput.value.trim();
  const email = accountEmailInput.value.trim();
  const password = accountPasswordInput.value;
  const accounts = getAccounts();

  if (!name || !password || (state.accountMode === "signup" && !email)) {
    accountMessage.textContent = "Ecris un identifiant et un mot de passe.";
    return;
  }

  if (state.accountMode === "signup") {
    if (accounts[name]) {
      accountMessage.textContent = "Ce compte existe deja.";
      return;
    }

    accounts[name] = {
      email,
      password
    };
    saveAccounts(accounts);
    state.currentUser = name;
    state.activeSection = null;
    localStorage.setItem("currentUser", name);
    loadSiteForCurrentUser();
    accountMessage.textContent = "Bienvenue sur le cite Le cite pour Youtubeur";
    accountPanel.hidden = true;
    renderHeader();
    renderCards();
    updateAccountPanel();
    updateMode();
    return;
  }

  if (!accounts[name] || accounts[name].password !== password) {
    accountMessage.textContent = "Identifiant ou mot de passe incorrect.";
    return;
  }

  state.currentUser = name;
  state.activeSection = null;
  localStorage.setItem("currentUser", name);
  loadSiteForCurrentUser();
  accountMessage.textContent = "Tu es connecte.";
  accountPanel.hidden = true;
  renderHeader();
  renderCards();
  updateAccountPanel();
  updateMode();
});

logoutButton.addEventListener("click", () => {
  state.currentUser = "";
  state.isOwner = false;
  state.activeSection = null;
  localStorage.removeItem("currentUser");
  loadSiteForCurrentUser();
  accountPasswordInput.value = "";
  accountMessage.textContent = "Tu es deconnecte.";
  accountPanel.hidden = false;
  renderHeader();
  renderCards();
  updateAccountPanel();
  updateMode();
});

accountPasswordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    submitAccountButton.click();
  }
});

renderHeader();
updateMode();
renderCards();