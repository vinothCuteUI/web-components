import Components from "../lib/component.js";
import store from "../store/index.js";

export default class Count extends Components{
    
    constructor(){
        super(store);
        this.render();
    }

    // set setrStore(data){
    //     this.store = data;
    //     this.store.events.subscribe("stateChange", ()=> this.render())
    //     this.render();
    // }

    render(){
        
        this.innerHTML = `
            <div>
                Count: ${store ? store.state.items.length : "Loadin..."}
            </div>
        `;
        
    }
}

