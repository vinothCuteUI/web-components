export const convertProps = (data) => {
    return Object.fromEntries([...data].map(item => [item.localName, item.value] ));
}
export class Component extends HTMLElement{
    constructor(){
        super();
        this.props = convertProps(this.attributes);
        this.state = {};
        this.childrensNode = {};
    }
    stateChange(){
        console.log(this.state);
    }
    contextApi(data){
        this.state.data = data;
    }
    setState(newState){
        this.state = newState;
        this.stateChange();
        this.render();
    }
    // useState = (initialVal) => {
    //     let val = initialVal;
    //     let getValue = val;      
    //     let setValue = (newVal) => val = newVal;
        
    //     return [getValue, setValue];
    // }

    render(){
        
    }
}


