import { Component } from "./component.js";
export class ChildeComponent extends Component{
   template = () =>{
        return `
            <h4>
                Child Node ${this.state.count}
                <button id="btn">click me</button>
            </h4>
        `;
   } 
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        console.log(this.props)
        this.state = {
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
        this.shadowRoot.querySelector("#btn").removeEventListener("click", this.incrementCount.bind(this));
    }

    attributeChangedCallback(name, oldVal, newVal){

    }

    incrementCount(){
        this.setState({
            ...this.state,
            count: this.state.count+1,
        })
        this.dispatchEvent(new CustomEvent('child-event', {detail: {state: this.state, message: "child state change"}}))
    }

    render(){
        this.shadowRoot.innerHTML = this.template().trim();
        this.shadowRoot.querySelector("#btn").addEventListener("click", this.incrementCount.bind(this))
    }

}

customElements.define("child-node", ChildeComponent);
