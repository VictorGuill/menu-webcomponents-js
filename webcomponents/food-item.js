class FoodItem extends HTMLElement {
  nombre = "";
  descripcion = "";
  precio = "";
  imgpath = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.render();
  }

  //   connectedCallback() {}

  static get observedAttributes() {
    return ["nombre", "precio", "descripcion", "imgpath"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "nombre":
        this.nombreElement.textContent = newValue || "";
        break;
      case "precio":
        this.precioElement.textContent = newValue + "€" || "";
        break;
      case "descripcion":
        this.descElement.textContent = newValue || "";
        break;
      case "imgpath":
        this.imgElement.setAttribute("src", "./assets/" + newValue || "");
        break;
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>

        .wrapper {
          display: flex;
          border:1px solid #242444;
          border-radius: 8px;
          margin: 15px 0px;
          position: relative;
         } 

          .wrapper div:nth-child(2) {
              margin:  0px 20px;
              display:flex;
              justify-content: center;
              align-items: flex-start;

              flex-direction: column;
          }

          img{
            height: 100%;
            object-fit: cover;
            width:150px;
          }

          h2,h5,p,button{
            /* Margin reset */
            margin:0;
          }

          h2{
            margin-bottom: 5px;
          }

          h5{
            font-size: 1.4rem;
            margin-bottom: 10px;
          }

          p{
            margin-bottom: 15px;
          }

          button{
            padding: 10px;
            position: absolute;
            bottom:10px;
            right: 10px;
            cursor: pointer;
            border-radius: 8px;
            background: none;
            font-family: "Plus Jakarta Sans", sans-serif;
            font-weight: bold;
          }

        </style>

        <div class="wrapper">
          <div>
            <img src="${this.imgpath}">
          </div>
          <div>
            <h2>${this.nombre}</h2>
            <p>${this.descripcion}</p>
            <h5>${this.precio}</h5>
            <button>AFEGIR PLAT</button>
          </div>
        </div>
      `;

    this.nombreElement = this.shadowRoot.querySelector("h2");
    this.descElement = this.shadowRoot.querySelector("p");
    this.precioElement = this.shadowRoot.querySelector("h5");
    this.imgElement = this.shadowRoot.querySelector("img");
  }
}

customElements.define("food-item", FoodItem);
