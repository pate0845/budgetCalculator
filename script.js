let budgetDisplay=document.getElementById('budget-display-amount');
let expenseDisplay=document.getElementById('budget-display-expense');
let savingsDisplay=document.getElementById('budget-display-saving');
let data=[];

function addExpenses(description,amount,id){

}

function ExpenseFactor(description,amount,id){
    this.id=id;
    this.description=description;
    this.amount=amount;
}


display(40,budgetDisplay);
display(23,expenseDisplay);
display(25,savingsDisplay);


function display(setAmount,element){
    element.innerText=setAmount;
}



