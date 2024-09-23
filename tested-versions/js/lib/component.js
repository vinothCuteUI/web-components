import Store from "../store/store.js";
export const convertProps = (data) => {
    return Object.fromEntries([...data].map(item => [item.localName, item.value] ));
}
export default class Components extends HTMLElement{
    constructor(store){
        super();
        this.props = convertProps(this.attributes);
        let self = this;
        this.state = {};
        // this.render = this.render() || function(){};
        if(store instanceof Store){
            store.events.subscribe("stateChange", ()=> self.render())
        }
        // this.dispatchEvent(new CustomEvent("data", {detail: {state: store.state}}))
    }
    setState(data){
        this.state = data;
        this.render();
    }
    render(){

    }
}