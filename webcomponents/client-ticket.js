class ClientTicket extends HTMLElement {
  precio = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.render();
  }

  //   connectedCallback() {}

  static get observedAttributes() {
    return ["precio"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, newValue);
    switch (name) {
      case "precio":
        this.precioElement.textContent = "PAGAR: " + newValue + "€" || "";
        break;
    }
  }

  render() {
    this.shadowRoot.innerHTML =
      `
        <style>
        * {
            margin: 0;
            box-sizing: border-box;
            font-family: "Plus Jakarta Sans", sans-serif;
          }

          div{
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          
            flex-direction:column;
          }

          p:nth-child(1){
            font-size: 2rem;
            color:white;
            background-color: black;
            padding:20px;
            width:100%;
          }

          button{
            font-size: 1.4rem;
            width:90%;
            height:70px;
            cursor:pointer;
            border-radius:8px;
            margin-bottom:10px;
          }
        </style>

        <div>
         <p>TICKET</p>
        
      ` +
      `
      <p>TICKET</p>
      
        <button>${this.precio}</button>
      </div>
      `;

    this.precioElement = this.shadowRoot.querySelector("button");
  }
}

customElements.define("client-ticket", ClientTicket);
