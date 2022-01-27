
let view={
    setDisplay:function(elementId,value){
        let text=document.getElementById(elementId);
        text.innerHTML=value;
    },
    getValue:function(elementId){
        let text=document.getElementById(elementId);
        return text;
    },
    displayMessage:function(message){
        this.setDisplay('message',message);
    },
    displayItems:function(data,divElement){
        divElement.innerHTML='';
        data.forEach((i,n)=> {
            divElement.innerHTML+=(
            `<div id="${n}">
            <li>${i.item}</li>
             <li>${i.amount}</li>
            <i class="btn-close" onclick=model.deleteExpense(${n})>
        </i>
        <hr>
        </div>`);
          });
    }
}



let model={
    data:[],
    budget:0,
    CreateObj:function(item,amount){
        this.item=item;
        this.amount=amount;
    },
    addObject:function(item,amount){
        let obj=new this.CreateObj(item,amount);
        this.data.push(obj);
        view.displayItems(this.data,document.getElementById('display-data'));
    },
    calculateTotal:function(arr){
        let newArr=arr;
        let total=0;
        for(let i=0;i<newArr.length;i++){
            total+=parseFloat(newArr[i].amount);
        }
        return total;
    },
    calculateSavings:function(expense){
        return this.budget-expense;
    },
    deleteExpense:function(id){
        this.data.splice(id,1);
        let deleteElement=view.getValue(`${id}`);
        deleteElement.parentNode.removeChild(deleteElement);
        let total=model.calculateTotal(model.data);
        let saving=model.calculateSavings(total);
        view.setDisplay('budget-display-saving',saving);
        view.setDisplay('budget-display-expense',total);
    }
}


let controller={
    addExpenseToSpan:function(){
        let item=view.getValue('budget-description');
        let amount=view.getValue('budget-expense');
        if(item.value!=''||amount.value!=''){
        model.addObject(item.value,amount.value);
        let total=model.calculateTotal(model.data);
        let saving=model.calculateSavings(total);
        view.setDisplay('budget-display-saving',saving);
        view.setDisplay('budget-display-expense',total);
        item.value='';
        amount.value='';
        }else{
            return view.displayMessage("You need to enter all the information!");
        }
    },
    updateBudget:function(value){
        view.setDisplay('budget-display-amount',value);
    },
    updateExpense:function(){
        let expense=model.calculateTotal(data);
        view.setDisplay('budget-display-expense',expense);
    },
}


// Handling user interaction on btn clicked and calculating the expense
// and displaying the savings
function btnClicked(){
    view.displayMessage('');
    view.setDisplay('budget-display-saving',0);
    controller.addExpenseToSpan();
}


// Taking user budget and making necessary updates to the UI
document.getElementById('budget-amount').onchange=manageBudget;
function manageBudget(){
    let budget=view.getValue('budget-amount');
    controller.updateBudget(budget.value);
    model.budget=budget.value;
    view.getValue('budget-amount').disabled=true;
    view.getValue('budget-amount').style.visibility='hidden';
}