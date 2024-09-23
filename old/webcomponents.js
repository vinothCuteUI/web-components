var css = new CSSStyleSheet()
css.replaceSync( "@import url( style.css )" )

const template = document.createElement("template");
template.innerHTML = `
    <style>
        @import url('./style.css');

    </style> 
    <h3 class='title'>
        <slot></slot>
    </h3>`;

class Heading extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({mode: "open"});
        shadow.append(template.content.cloneNode(true));
        console.log()
        let h3Elm = this.shadowRoot.querySelector("h3");
        let oldClass = h3Elm.getAttribute("class");

        h3Elm.setAttribute("class", oldClass+" "+this.getAttribute("class"))

    }
}

customElements.define("heading-elm", Heading);

//Checkbox
const checkboxTemplate = document.createElement("template");
checkboxTemplate.innerHTML = `
    <style>
        .detail{
            font-size:.5rem;
            color:red;
        }
    </style> 
    <label>
        <input type='checkbox' />
        <slot></slot>
        <span class='detail'>
            <slot name='detail'></slot>
        </span>
    </label>`;

class CheckboxElm extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({mode: "open"});
        shadow.append(checkboxTemplate.content.cloneNode(true));
    }   

    static get observedAttributes(){
        return ["checked"]
    }
    connectedCallback() {
        console.log("Custom element added to page.");
    }

    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }

    attributeChangedCallback(name, oldVal, newVal){
        console.log(name, oldVal, newVal)
    }

    
}

customElements.define("checkbox-elm", CheckboxElm);

