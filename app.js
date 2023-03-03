import { PRIMERS, SEGONS, POSTRES, BEGUDES } from "./bd/info.js";

const plats_container = document.getElementById("plats-container");

let navItems = document.querySelectorAll("#navigation ul li");

navItems.forEach((navLink) =>
  navLink.addEventListener("click", setActiveNavLink)
);

function setActiveNavLink(newSelection) {
  for (const item in navItems) {
    if (Object.hasOwnProperty.call(navItems, item)) {
      const navLink = navItems[item];
      navLink.removeAttribute("class", "link-active");

      if (navLink === newSelection.target) {
        newSelection.target.setAttribute("class", "link-active");
        loadMeals(newSelection.target.innerHTML);
      }
    }
  }
}

function loadMeals(number) {
  let meals;

  switch (number) {
    case "Primers🥗":
      meals = PRIMERS;
      break;
    case "Segons🍜":
      meals = SEGONS;
      break;
    case "Postres🍰":
      meals = POSTRES;
      break;
    case "Begudes🥤":
      meals = BEGUDES;
      break;
    default:
      meals = PRIMERS;
      break;
  }

  while (plats_container.firstChild) {
    plats_container.removeChild(plats_container.lastChild);
  }

  for (const meal in meals) {
    const plat = document.createElement("food-item");

    plat.setAttribute("nombre", meals[meal].nombre);
    plat.setAttribute("precio", meals[meal].precio);
    plat.setAttribute("descripcion", meals[meal].descripcion);
    plat.setAttribute("imgPath", meals[meal].img);

    plats_container.appendChild(plat);
  }
}
