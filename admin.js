const adminPasswordInput = document.querySelector("#adminPasswordInput");
const adminUnlockButton = document.querySelector("#adminUnlockButton");
const adminMessage = document.querySelector("#adminMessage");
const adminLoginPanel = document.querySelector("#adminLoginPanel");
const addressPanel = document.querySelector("#addressPanel");
const addressList = document.querySelector("#addressList");

function getAccountsForAdmin() {
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

function showAddresses() {
  const accounts = getAccountsForAdmin();
  addressList.innerHTML = "";

  Object.entries(accounts).forEach(([name, account]) => {
    const item = document.createElement("div");
    item.className = "address-item";
    item.innerHTML = `<strong>${name}</strong><span>${account.email || "Aucune adresse"}</span>`;
    addressList.appendChild(item);
  });

  adminLoginPanel.hidden = true;
  addressPanel.hidden = false;
}

adminUnlockButton.addEventListener("click", () => {
  if (adminPasswordInput.value !== window.APP_CONFIG.ownerPassword) {
    adminMessage.textContent = "Mot de passe incorrect.";
    return;
  }

  showAddresses();
});

adminPasswordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    adminUnlockButton.click();
  }
});