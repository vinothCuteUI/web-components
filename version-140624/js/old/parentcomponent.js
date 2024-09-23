import { Component } from "./component.js";
import { ChildeComponent } from "./childecomponent.js";
//Parent component ------------------------------------------->
export class ParentComponent extends Component{
  
  
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
        this.shadowRoot.innerHTML = `
            <div>
                <h4>${this.state.name}</h4> 
                <p>${this.state.count}</p>
                <child-node menus='["Home","About"]' id="child" ></child-node>
                <button id="eventBtn">click</button>
            </div>`;
        
        this.shadowRoot.querySelector("#child").addEventListener("child-event", ({detail: e})=>{
            console.log(e)
            this.state.count = e.state.count;
            this.dispatchEvent(new CustomEvent("child", {detail: {childData: e.state}}))
            // this.setState({...this.state, count: e.state.count});
        })
        this.shadowRoot.querySelector("#eventBtn").addEventListener("click", ()=>{
            this.setState({...this.state, name: "Orange"});
            this.dispatchEvent(new CustomEvent("parent-event", {detail: {state: this.state}}))
        })
    }
}
customElements.define("parent-node", ParentComponent);

export class Provider extends HTMLElement{
    constructor(){
        super();
    }
}