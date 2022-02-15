
let view={
    //update the display with id
    setDisplay:function(elementId,value){
        let text=document.getElementById(elementId);
        text.innerHTML=value;
    },
    //helps to retrive the value 
    getValue:function(elementId){
        let text=document.getElementById(elementId);
        return text;
    },
    //displays error message
    displayMessage:function(message){
        this.setDisplay('message',message);
    },
    //display all the expense
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
    //avoid mutation added array into object
    data:[],
    //total budget
    budget:0,
    //constructor to create object
    CreateObj:function(item,amount){
        this.item=item;
        this.amount=amount;
    },
    //method to add objects to array 
    addObject:function(item,amount){
        let obj=new this.CreateObj(item,amount);
        this.data.push(obj);
        view.displayItems(this.data,document.getElementById('display-data'));
    },
    //calculate total whenever array is changed
    calculateTotal:function(arr){
        let newArr=arr;
        let total=0;
        for(let i=0;i<newArr.length;i++){
            total+=parseFloat(newArr[i].amount);
        }
        return total;
    },
    //total savings by subtracting expense from income
    calculateSavings:function(expense){
        return this.budget-expense;
    },
    //deletes element from an array
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
    //method adds the expense to the list view
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
    //method updates the budget
    updateBudget:function(value){
        view.setDisplay('budget-display-amount',value);
    },
    //method to update the expense
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