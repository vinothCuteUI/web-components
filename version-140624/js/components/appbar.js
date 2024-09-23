
class AppBar extends HTMLElement{
    constructor(){
        super();
        this.props = Object.fromEntries([...this.attributes].map(item => [item.localName, item.value] ));
        if(this.props.ref) {
            window[this.props.ref] = this;
        }; 
        Object.entries({...this.props}).forEach(([key, val])=>{
            if(key !== "onclick"){
                this[key] = val;
            }
        })
        this.render();
    }

    static get observedAttributes(){
        return [""] 
    }

    connectedCallback(){
        
    }

    disconnectedCallback(){

    }

    attributeChangedCallback(name, oldVal, newVal){
        console.log(name, oldVal, newVal);
    }

    appBarData(data){
        const appContainer = this.querySelector(".app-bar-container");
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
    render(){
        this.innerHTML = `<div class="app-bar-container"></div>`;
    }

}
customElements.define("app-bar", AppBar);