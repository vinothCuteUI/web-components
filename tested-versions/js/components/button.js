
export default class Button extends HTMLElement{
    #funName; 
    #funArg;
    #funEvent;
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
        return ["variant", "type", "color", "disabled", "type", "method", "classname",]
    }

    set method(val){
        const {fName, fArg, fEvent} = this.props?.method ? JSON.parse(this.props?.method) : {fName: null, fArg: null, fEvent: null};
        this.#funName = fName;
        this.#funArg = fArg;
        this.#funEvent = fEvent;
    }
    connectedCallback(){

    }

    disconnectedCallback(){
        this.querySelector("button").removeEventListener(fEvent, eval(fName))
    }

    attributeChangedCallback(attr, oldVal, newVal){
        // console.log(attr, oldVal, newVal);
        if(attr == "disabled"){
            this.querySelector("button").setAttribute("disabled", newVal)
        }
    }
   

    render(){
        
        this.innerHTML = `
            <button class="btn ${this.color ? "btn-"+this.color : ''} ${this.variant ? "btn-"+this.variant : ''} ${this.type ? "btn-"+this.type : ''} ${this.props?.classname ? this.props?.classname : ''}">
                ${this.textContent}
            </button>
        `;
        if(this.#funName && !this.#funArg){
            this.querySelector("button").addEventListener(this.#funEvent, eval(this.#funName))
        }else{
            this.querySelector("button").addEventListener(this.#funEvent, ()=>{
                eval(this.#funName)(...this.#funArg)
            })
        }
        
    }

}

