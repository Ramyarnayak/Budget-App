class Budget{

    constructor(state){
      console.log(state)
      this.state = state
      this.add = this.add()               
      this.display = this.showDisp()
      console.log(this.display)
    }
  
    setState(newState) {
      this.state = { ...this.state, ...newState }
    }
   
    // function to submit amount, desciption and income/expense
    add(){
      btnSubmit.addEventListener('click', ()=>{
        let dVal = desc.value
        let aVal = Number(amount.value)
        if(aVal === ''){
          alert("Enter Amount")
        }
        if(dVal === '') {
         alert("Enter description")
        }
        desc.value = ''
        amount.value = ''
        //checking selected value to call respective function
        if(option.value === 'income') {this.calculator('income', dVal, aVal)}
        else if(option.value === 'expense'){
          this.calculator('expense', dVal, aVal)
        } else
        {
          alert("Choose any option");
        }   
         option.value= null
      })
    }
  
    // To delete particular income/expense list on "close" icon clicked
    deleteList(){
      const listClicked = document.querySelectorAll('.close')
       
      listClicked.forEach(li => {
        li.addEventListener('click', () =>{
          let listName = li.parentElement.classList.value
          let liName = li.parentElement.firstElementChild.textContent
          this.removeList(listName, liName)
        })
      })
    }
   
    //Checks the list to be removed is from ExpenseList or IncomeList
    removeList(name, liDesc){
      let state;
      let stateName;
      if(name == 'listIncome'){
        state = this.state.income
        stateName = 'income'
      } else  if(name == 'listExpenses'){
        state = this.state.expense
        stateName = 'expense'
      }
      this.remove(state, liDesc, stateName)
    }
     
    //Removes the list
    remove(liState, name, stateName){
      if(stateName == 'income'){
        let s1 = liState.list.filter(li => li.desc != name )
        this.stateCalc(s1, totalCalc(0, s1), stateName )
      } else if (stateName == 'expense'){
        let s1 = liState.list.filter(li => li.desc != name )
        this.stateCalc(s1, totalCalc(0, s1), 'expense')
        this.stateCalc(s1, totalCalc(0, s1), stateName )
      }
      this.balanceCalc()                                                
      this.showDisp()
    }
  
    // Function to calculate income, expense and balance
    calculator(title, desc, amount){
      let lists;
      title === 'income' ? lists = this.state.income.list : title === 'expense' ?
        lists = this.state.expense.list : null
      if(lists.length == 0){
        let list = []
        list.push(this.listCreate(amount, desc, title))                 
        this.stateCalc(list, amount, title)
        this.bPerCalc()
      } else {
        let total = totalCalc(amount, lists);
        let newList = lists
        let list = this.listCreate(amount, desc, title)
        newList.push(list)
        this.stateCalc(newList, total, title)
        console.log(title, total, newList)
        this.bPerCalc()
      }
    }
  
    //Creating list seperately for income and expense entered 
    listCreate(amount, desc, title){
      let list;
        if(title === 'income'){
          list = {
            amount: amount,
            desc: desc
          }
        } else {
          list = {
            amount: amount,
            desc: desc
          }
        }
      return list
    }
  
    bPerCalc(){
      this.balanceCalc()
      this.showDisp()
    }
    
    // Sets the state to income or expense 
    stateCalc(lists, total, title){
      let state = {
        total: total,
        list: lists,
        length: lists.length 
      }
      if(title === 'income') this.setState({income: state})
      if(title === 'expense') this.setState({expense: state})
    }

    // calculates balance amount
    balanceCalc(){
      let inTotal = this.state.income.total
      let exTotal = this.state.expense.total
      const balanceInfo =   document.querySelector('.bar')

         let balance = {
        balance: inTotal - exTotal,
        percent: percentCalc(inTotal, inTotal - exTotal),
      }

      // Updating balanceInfo based on balance percentage
      if((balance['percent']) >= 50 && (balance['percent'])<100)
      {
       balanceInfo.innerHTML="<h2>Super Saver!!!</h2>"
       balanceInfo.style.color="#A2CA07"
      } else if((balance['percent'])<50 && (balance['percent'])>=30 )
      { 
        
        balanceInfo.innerHTML="<h2> Saver!!</h2>"
        balanceInfo.style.color="#A2CA07"

      } else if((balance['percent'])<30 && (balance['percent'])>=15 )
      { 
        balanceInfo.innerHTML="<h2> You have to watch on your expences..</h2>"
        balanceInfo.style.color="red"

      } else if((balance['percent'])<15){
        balanceInfo.innerHTML="<h2> SAVE MONEY !!! MONEY WILL SAVE YOU !!</h2>"  
        balanceInfo.style.color="red"
      } 
      this.setState({balance: balance})
    }

// Displays state 
    showDisp(){
      console.log(this.state)
      display(this.state)
      this.deleteList()
    }
  }
  
  // Calculates total amount of expense and income
  const totalCalc = (amount, lists) => {
    let t = 0
    lists.map(list => {
      t += list.amount;
    })
    return t + amount
  }
  
  // Percentage Calculator
  const percentCalc = (total, amount) => {
    console.log(total, amount)
    let n = Number(amount / total * 100)
    return Number(n.toFixed(2))
  }
  
  class Income{
    constructor(income, expense, balance){
      this.income = income
      this.expense = expense
      this.balance = balance
    }
   // initail value of income
    static income(){
      return {
        total: 0,
        list: [],
        length: 0
      }
    }
   // initail value of expense
    static expense() {
      return {
        total: 0,
        list: [],
        length: 0
      }
    }
  // initail value of balance
    static balance(){
      return {
        percent: 0,
        balance: 0
      }
    }
 
    static ready(){
      return new Income(this.income(), this.expense(), this.balance())
    }
  }
  
  const start = new Budget(Income.ready())

