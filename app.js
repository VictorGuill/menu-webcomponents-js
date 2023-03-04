import { PRIMERS, SEGONS, POSTRES, BEGUDES } from "./bd/info.js";

let addBtns;

// #region NAVBAR INTERACTIVO
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
    plat.setAttribute("base", meals[meal].precio);

    plats_container.appendChild(plat);
  }
}
//#endregion

//#region AFEGIR PLAT
const ticket = document.querySelector("client-ticket");

export function addFood(newItem) {
  const allTicketItems = ticket.shadowRoot.querySelectorAll(
    "section ticket-item"
  );

  let addInDom = true;
  let totalPrice = 0;

  for (const item of allTicketItems) {
    if (item.getAttribute("nombre") === newItem.getAttribute("nombre")) {
      addInDom = false;

      const nuevaCantidad = parseInt(item.getAttribute("cantidad")) + 1;
      item.setAttribute("cantidad", nuevaCantidad);

      const precioBase = parseFloat(newItem.getAttribute("base"));
      item.setAttribute("precio", precioBase * nuevaCantidad);
    }

    totalPrice += parseFloat(item.getAttribute("precio"));
  }

  if (addInDom) {
    const plat = document.createElement("ticket-item");

    plat.setAttribute("nombre", newItem.getAttribute("nombre"));
    plat.setAttribute("precio", newItem.getAttribute("precio"));
    plat.setAttribute("imgPath", newItem.getAttribute("imgPath"));
    plat.setAttribute("cantidad", 1);

    ticket.shadowRoot.querySelector("section").appendChild(plat);

    totalPrice += parseFloat(newItem.getAttribute("precio"));
  }

  ticket.setAttribute("precio", totalPrice.toFixed(2));
}

//#endregion
