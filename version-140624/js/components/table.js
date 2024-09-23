class Table extends HTMLElement{
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
        this.sn = this.tbsn ? JSON.parse(this.tbsn) : null;
        this.render();
    }
    setTableContent(data){
        const tableElm = this.querySelector("table");
        if(data){
            const tbBody = document.createElement("tbody");
            data.forEach((item,inx) =>{
                const tbRow = document.createElement("tr");
                if(this.sn){
                    const tbSn = document.createElement("td");
                    tbSn.textContent = inx+1;
                    tbRow.append(tbSn)
                }
                item.forEach((text)=>{
                    const tbContent = document.createElement("td");
                    tbContent.innerText = text;
                    tbRow.appendChild(tbContent);
                })
                tbBody.appendChild(tbRow);
            })
            tableElm.appendChild(tbBody);
        }

    }
    render(){
        this.innerHTML =  `<table class="tb-table ${this.classname ? this.classname : ''}">
                                <thead>
                                    <tr>
                                        ${this.sn ? '<th>S.no</th>' : ""}
                                        ${this.thead ? this.thead.split(",").map((item, inx) =>{
                                            return (
                                                `<th>${item.trim()}</th>`
                                            )
                                        }).join(""): "No table head defined"}
                                    </tr>
                                </thead>
                            </table>`;
    }
}

customElements.define("app-table", Table);
