import Components from "../lib/component.js";
// import store from "../store/index.js";

export default class Count extends HTMLElement{
    
    constructor(){
        super();
        this.store;
        this.render();
    }

    set setrStore(data){
        this.store = data;
        this.store.events.subscribe("stateChange", ()=> this.render())
        this.render();
    }

    render(){
        
        this.innerHTML = `
            <div>
                Count: ${this.store ? this.store.state.items.length : "Loadin..."}
            </div>
        `;
        
    }
}

