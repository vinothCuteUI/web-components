
export const convertProps = (data) => {
    return Object.fromEntries([...data].map(item => [item.localName, item.value] ));
}
const contexTempate = document.createElement("template");
contexTempate.innerHTML = `
    <div>
        <slot></slot>
    </div>
`
const store = {state: ["one", "two"]};
class ContextProvider extends HTMLElement{
    constructor(){
        super();
        this.store = {state: ["one", "two"]};
    }
    get setStore(){
        return this.store;
    }
    set setStore(val){
        this.store = val;
    }
}
customElements.define("context-provider", ContextProvider)