let budgetDisplay=document.getElementById('budget-display-amount');
let expenseDisplay=document.getElementById('budget-display-expense');
let savingsDisplay=document.getElementById('budget-display-saving');

let inputAmount=document.getElementById('budget-amount');
let inputDescription=document.getElementById('budget-description');
let inputExpense=document.getElementById('budget-expense');
let buttonSubmit=document.getElementById('budget-data-submit');

let displayDescription=document.getElementById('description');
let displayExpense=document.getElementById('expense');

var data=[];
var id=0;


buttonSubmit.onclick=function(){
    addExpenses(inputDescription.value,inputExpense.value,id)
    id++;
};


function addExpenses(description,amount,id){
    let exp=new ExpenseFactor(description,amount,id);
    data[id]=exp;
    
    function ExpenseFactor(description,amount,id){
        this.description=description;
        this.amount=amount;
        this.id=id;
    }
    displayDescription.innerHTML+=`
                                   <span  class="" value=${id}>
                                   <span class="desc" >${data[id].description}</span>
                                   <span class="amt" >${data[id].amount}</span>
                                   </span>
                                   <br>`;
}

function display(setAmount,element){
    element.innerText=setAmount;
}

function displayList(arr){
    for(let i=0;i<arr.length;i++){
    }
}


