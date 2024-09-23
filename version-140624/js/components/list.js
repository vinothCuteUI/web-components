import Components from "../lib/component.js";
// import store from "../store/index.js";

export default class ListItem extends Components{
    constructor(){
        super();
        // this.state = { name: "Product Item"}
        this.store;
        this.render();
    }
   
    connectedCallback(){

    }

    disconnectedCallback(){
        
    }

    set setrStore(data){
        this.store = data;
        this.store.events.subscribe("stateChange", ()=> this.render())
        this.render();
    }

    render(){
        let self = this;
        self.innerHTML = `
        <div>
            
            <div class="card-item d-flex gp-1 mb-5">
                ${
                    this.store ? this.store.state.items.map((item) =>{
                        return `<div class="card">
                                    <div class="card-body">
                                        <h5>${item} </h5>
                                    </div>
                                    <div class="card-action">
                                        <button class="btn btn-delete mt-3">delete</button>
                                    </div>
                                </div>`
                    }).join("") : "Loadin..."
                }
            </div>
          
         </div>`;
        
        self.querySelectorAll(".btn-delete").forEach((btn, inx)=>{
            btn.addEventListener("click", ()=>{
                this.store.dispatch('clearItem', { index: inx });
                this.dispatchEvent(new CustomEvent("item-event", {detail: {data: this.store.state.items}}))
            })
        })
        
    }
}

