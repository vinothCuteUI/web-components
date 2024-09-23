const DEFAULT_OPTIONS = {
    autoClose: 3000,
    canClose: true,
    showProgress: true
}
export default class ToastContainer extends HTMLElement{
  
    constructor(){
        super();
       
        this.props = convertProps(this.attributes);
        if(this.props.ref) {
            window[this.props.ref] = this;
        }; 
        this.setProgress = null;
        this.autoTimeOut = null;
        this.render();
    }

    static get observedAttributes(){
        return ["ref", "position"];
    }
    
    connectedCallback(){
        
    }

    disconnectedCallback(){

    }

    attributeChangedCallback(name, oldVal, newVal){
        console.log(name, oldVal, newVal)
        // if(name == "ref") {
        //     window[newVal] = this;
        // };
    }

   
    createToast(option){
        
        Object.entries({...DEFAULT_OPTIONS, ...option}).forEach(([key, val])=>{
            this[key] = val;
        })
        let visibleTime = new Date();
        let toastElm = document.createElement("div");
        toastElm.classList.add("toast");
        requestAnimationFrame(()=>{
            toastElm.classList.add("show");
        })
        toastElm.textContent = this.text;
        if(this.canClose){
            toastElm.classList.add("can-close");
            toastElm.addEventListener("click", this.removeToast);
        }else{
            toastElm.classList.remove("can-close");
            toastElm.removeEventListener("click", this.removeToast);
        }
        
        if(this.autoClose){
            this.autoTimeOut = setTimeout(()=>{
                                    toastElm.remove();
                                }, this.autoClose)
            
            this.setProgress = setInterval(()=>{
                                    let timeVisible = new Date() - visibleTime;
                                    toastElm.style.setProperty("--progress", 1 - timeVisible / this.autoClose)
                                }, 10)
        }
        if(this.showProgress){
            toastElm.classList.toggle("progress");
        }
        this.querySelector(".toast-content").appendChild(toastElm);
       
    }

    removeToast(e){
        const childElm = e.target;
        childElm.remove();
        clearInterval(this.setProgress);
        clearTimeout(this.autoTimeOut);
    }

    render(){
        this.innerHTML = `
            <div class="toast-content"></div>
        `;
        
    }
}

const convertProps = (data) => {
    return Object.fromEntries([...data].map(item => [item.localName, item.value] ));
}

