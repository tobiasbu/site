
window.addEventListener("load", () => {
  const activeClass = "tob-menu-active";

  const siteBody = document.body;
  const menuButton = document.getElementById("tob-mobile-menu");
  // const navElement = document.getElementsByTagName("nav")[0];
  menuButton.addEventListener("click", () => {
    if (siteBody.classList.contains(activeClass)) {
      siteBody.classList.remove(activeClass);
    } else {
      siteBody.classList.add(activeClass);
    }
  });
}, false);