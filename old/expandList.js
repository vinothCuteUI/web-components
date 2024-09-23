class ExpandList extends HTMLUListElement{
    constructor(){
        super();
        this.style.position = "relative";
        this.toggleBtn = document.createElement("button");
        this.toggleBtn.style.position = "absolute";
        this.toggleBtn.style.border = "none";
        this.toggleBtn.style.background = "none";
        this.toggleBtn.style.top = "0";
        this.toggleBtn.style.left = "0";
        this.toggleBtn.style.cursor = "ponter";
        this.toggleBtn.innerText = ">";
        this.toggleBtn.addEventListener("click", () => {
            this.dataset.expand = !this.isExpand;
        })
        this.appendChild(this.toggleBtn)
    }

    get isExpand(){
        return this.dataset.expand !== "false" && this.dataset.expand !== null;
    }

    static get observedAttributes(){
        return ["data-expand"];
    }

    attributeChangedCallback(name, oldVal, newVal){
        this.updateStyles();
    }
    updateStyles(){
        const transform = this.isExpand ? "rotate(90deg)" : "";
        this.toggleBtn.style.transform = transform;
        [...this.children].forEach(child => {
            if(child !== this.toggleBtn){
                child.style.display = this.isExpand ? "" : "none";
            }
        })
    }
}

customElements.define("expanded-list", ExpandList, {extends: "ul"})