document.addEventListener("DOMContentLoaded", function() {
  let link = document.querySelector("link[rel='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }

  // Меняем иконку в зависимости от страницы
  if (window.location.pathname.includes("about")) {
    link.href = "/images/favicon-about.png";
  } else if (window.location.pathname.includes("contact")) {
    link.href = "/images/favicon-contact.png";
  } else {
    link.href = "../favicon.ico"; // Иконка по умолчанию
  }
});
