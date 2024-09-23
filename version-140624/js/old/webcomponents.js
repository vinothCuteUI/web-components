import { Component } from "./component.js";
// import { Navbar } from "./childecomponent.js";

// customElements.define("nav-bar", Navbar);

const appTemplate = document.createElement("template");
appTemplate.innerHTML = `
<style>
    @import url("./css/font-awesome.min.css");
    @import url("./css/custom.css");
    @import url("./css/style.css");

</style>
<div class="app-bar-container">
</div>
`;

export class AppBar extends Component{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(appTemplate.content.cloneNode(true));
        console.log(this.props)
    }

    static get observedAttributes(){
        return [""] 
    }

    connectedCallback(){
        let appBarContainer = this.shadowRoot.querySelector(".app-bar-container");
        if(this.getAttribute("data-css")){
            appBarContainer.classList.add(this.getAttribute("data-css"));
        }
    }

    disconnectedCallback(){

    }

    attributeChangedCallback(name, oldVal, newVal){
        console.log(name, oldVal, newVal);
    }

    set appData(data){
        const appContainer = this.shadowRoot.querySelector(".app-bar-container");
        appContainer.innerHTML = "";
        if(data){
            let appBars = data.map((item, inx) => {
                return `<div class="app-bar">
                            <a href="${item.url}" class="app-link"></a>
                            <div class="app-icon">
                                <i class="fa ${item.icon}" aria-hidden="true" id="icon"></i>
                            </div>
                            <div class="app-text">${item.title}</div>
                        </div>`
            }).join("");
            
            appContainer.innerHTML = appBars;
        }else{
            appContainer.innerHTML = "No app data";
        }
    }

}
customElements.define("app-bar", AppBar);


//Header component ------------------------------------------->
const headerTemplate = document.createElement("template");
headerTemplate.innerHTML = `
<style>
</style>

`;

export class HeaderComponent extends Component{
    template = () => {
        return `<div>
                    <h4>${this.state.name}</h4> 
                    <p>${this.state.count}</p>
                    <button id="eventBtn">click</button>
                </div>`
    }
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.state = {
            name: "Apple",
            count: 0
        }
        this.render();
    }

    static get observedAttributes(){
        return [];
    }
 
    connectedCallback(){
        
    }

    disconnectedCallback(){

    }

    attributeChangedCallback(name, oldVal, newVal){

    }
    
    render(){
        this.shadowRoot.innerHTML = this.template().trim();
        
        this.shadowRoot.querySelector("#eventBtn").addEventListener("click", ()=>{
            this.setState({...this.state, name: "orange"});
            this.dispatchEvent(new CustomEvent("header-event", {detail: {state: this.state}}))
        })
    }
}
customElements.define("header-component", HeaderComponent);


export class Provider extends Component{
    constructor(){
        super();
        this.state = {

        }
    }
}