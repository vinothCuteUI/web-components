const appTemplate = document.createElement("template");
appTemplate.innerHTML = `
    <style>
        @import url('./css/font-awesome.min.css');
        @import url('./custom.css');
    </style>
    <div class="app-bar">
        <a class="app-link"></a>
        <div class="app-icon">
            <i class="fa" aria-hidden="true" id="icon"></i>
        </div>
        <div class="app-text"></div>
    </div>
`;

class AppBar extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({mode: "open"});
        shadow.appendChild(appTemplate.content.cloneNode(true));
        //link
        const linkTag = shadow.querySelector(".app-link");
        linkTag.href = this.getAttribute("link");
        //icon
        const iconTag = shadow.querySelector("#icon");
        iconTag.classList.add(this.getAttribute("icon"));
        //text
        const textTag = shadow.querySelector(".app-text");
        textTag.innerHTML = this.getAttribute("text");

    }

    static get observedAttributes(){
        return ["link", "icon", "text"];
    }

    attributeChangedCallback(name, oldVal, newVal){

    }

    connectedCallback(){

    }

    disconnectedCallback(){

    }

}
customElements.define("app-bar", AppBar);


let appBarData = [
    {
        id:1,
        name: "Configurator",
        icon: "fa-phone",
        url: "https://app-tinkerblox-dev.azurewebsites.net/Visualizer"
    },
    {
        id:2,
        name: "Visualizer",
        icon: "fa-desktop",
        url: "https://app-tinkerblox-dev.azurewebsites.net/Visualizer"
    },
    {
        id:1,
        name: "Configurator",
        icon: "fa-phone",
        url: "https://app-tinkerblox-dev.azurewebsites.net/Visualizer"
    },
    {
        id:2,
        name: "Visualizer",
        icon: "fa-desktop",
        url: "https://app-tinkerblox-dev.azurewebsites.net/Visualizer"
    }

]

let appContainer = document.getElementById("appbar");
function loadAppBar(data){
    appContainer.innerHTML = "";
    let appBarItem = data.map((item, inx) => {
                        const appbar = `
                                        <app-bar 
                                            link="${item.url}" 
                                            icon="${item.icon}" 
                                            text="${item.name}"
                                        ></app-bar>`;
                        return appbar;
                    }).join("");
    appContainer.innerHTML = appBarItem;
}
loadAppBar(appBarData);