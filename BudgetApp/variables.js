// Variables around the applications
const option = document.getElementById('option')
const desc = document.getElementById('desc')
const amount = document.getElementById('amount')
const btnSubmit = document.querySelector('.submit')
const btnPlus = document.querySelector('.btnIncome')
const btnMinus = document.querySelector('.btnExpense')

// income
const iTotl = document.querySelector('.incTotal')
const iSum = document.querySelector('.incSum')

// expense
const exTotl = document.querySelector('.expTotal')
const exSum = document.querySelector('.expSum')

// balance
const balTotl = document.querySelector('.balSum')
const balPercnt = document.querySelector('.balPercent')

// list
const incomeList = document.querySelector('.incomeSummary')
const expenseList = document.querySelector('.expenseSummary')

// list children
const xList = document.querySelectorAll('.expenseSummary > li')

// label
const aLabel = document.querySelector('.amountLabel')
const dLabel = document.querySelector('.descLabel')

// bar
const balanceInfo =   document.querySelector('.bar')

//Function to display current income, expense and remaining amount
const display = (state) => {
  let i = state.income
  let x = state.expense
  let b = state.balance

  // Text contents for income, expense and balance
  iTotl.textContent = i.total === 0 ? ` 0.00` : ` ${fNum(i.total)}`
  iSum.textContent = i.length == 0 ? 'No Income Yet' : `${i.length} Income Sources`

  exTotl.textContent = x.total === 0 ? ` 0.00` : `  ${fNum(x.total)}`
  exSum.textContent = x.length == 0 ? 'No Income Yet' : `${x.length} Expense Items`

  balTotl.textContent = b.balance === 0 ? ` 0.00` : ` ${fNum(b.balance)}`

  if( b.percent === 0 ){
    balPercnt.textContent= `No savings yet`
  } else if(b.percent > 0) {
    balPercnt.textContent=`${b.percent}% Savings`
  } else{
    balPercnt.textContent= `No savings yet`
  }

   //Listing income amount
  if(i.list.length === 0){
    incomeList.innerHTML = `<li class='listIncome'>
                              <p class='empty'>No Income</p>
                            </li> `
  } else {
    incomeList.innerHTML = i.list.map(li => `
      <li class='listIncome'>
        <p class='desc'>${li.desc}</p>
        <p class='amount'> ${fNum(li.amount)}</p>
        <p class='close' style="float:right">x</p>
      </li>
    `).join('')

  }
 
  if(x.list.length == 0){
    expenseList.innerHTML = `<li class='listExpenses'>
                              <p class='empty'>No Expenses</p>
                            </li>`
  } else {
    expenseList.innerHTML = x.list.map(ex => `
    <li class='listExpenses'>
    <p class='desc'>${ex.desc}</p>
    <p class='amount'> ${fNum(ex.amount)}</p>
    <p class='close' style="float:right">x</p>
    </li>
    `).join('')
  }
}

// To convert number to string type
const fNum = (n) => {
  return n.toLocaleString()
}


