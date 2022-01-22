
let data=[];



let view={
    setDisplay:function(elementId,value){
        let text=document.getElementById(elementId);
        text.innerHTML=value;
    },
    getValue:function(elementId){
        let text=document.getElementById(elementId);
        return text.value;
    },
    displayMessage:function(message){
        this.setDisplay('message',message);
    }
}


let model={
    newObj:function CreateObj(item,amount){
        this.item=item;
        this.amount=amount;
    },
    addObject:function(item,amount){
        let obj=new this.newObj(item,amount);
        data.push(obj);
    },
    calculateTotal:function(arr){
        let total=0;
        for(let i=0;i<arr.length;i++){
            total+=arr[i].amount;
        }
    },
    deleteExpense:function(id){
        delete data[i];
    }
}

let controller={
    addExpenseToSpan:function(){
        let item=view.getValue('budget-description');
        let amount=view.getValue('budget-expense');
        if(item!=''||amount!=''){
        model.addObject(item,amount);
        }else{
            view.displayMessage("You need to enter all the information!");
        }
    }
}



