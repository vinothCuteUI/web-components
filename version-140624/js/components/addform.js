import Components from "../lib/component.js";
import store from "../store/index.js";

export default class AddForm extends HTMLElement{
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
            <div class="mb-5 ">
                <div class="col-3 mb-2">
                    <label class="d-inline-block mb-1">Name:</label> 
                    <input type="text" class="form-control" />
                </div>
                <button class="btn btn-primary add-btn">Add Item</button>
            </div>
        `;
        this.querySelector(".add-btn").addEventListener("click", ()=>{
            const val = this.querySelector("input").value.trim();
            if(val.length){
                this.store.dispatch("addItem", val);
            }
        })

    }
}
