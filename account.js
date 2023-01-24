class account {
  constructor(){
    this.balance = 0;
    this.transactions = []
  }

  GetBalance = () => {
    return this.balance;
  }

  Deposit = (amount) => {
    this.AmountValidation(amount)
    const date = this.formatDate(new Date)

    this.balance += amount;

    const deposit = {amount: amount, date: date, balance: this.GetBalance(), type: "DEPOSIT"}
    this.transactions.push(deposit)
    return deposit

  }
  Withdraw = (amount) => {
    this.AmountValidation(amount)

    if (amount > this.GetBalance()){
      throw new Error('Insufficient funds')
    }
    const date = this.formatDate(new Date)
    this.balance -= amount;
    const withdraw = {amount: amount, date: date, balance: this.GetBalance(), type: "WITHDRAW"};
    this.transactions.push(withdraw)
    return withdraw;

  }

  PrintStatement = () => {
    const transactions = this.GetTransactions();
    console.log("date || credit || debit || balance || type");
    for (let i = 0; i < transactions.length; i++) {
      const element = transactions[i];
      if (element.type == "DEPOSIT"){
        console.log(`${element.date} || || ${element.amount.toFixed(2)} || ${element.balance.toFixed(2)} || ${element.type}`);
      }
      else{
        console.log(`${element.date} || ${element.amount.toFixed(2)} || || ${element.balance.toFixed(2)} || ${element.type}`);

      }
    }

  }
  GetTransactions = () => {
    return this.transactions;
  }

  AmountValidation = (amount) => {
    if (amount <= 0){
      throw new Error('Number must be greater than 0')
    }
    const amount_string = amount.toString()
    if (amount_string.includes(".")){
      const array = amount_string.split(".")
      if (array[1].length > 2){
        throw new Error('Maximum of 2 decimal places')
      }
    }
  }

  formatDate = (date) => {
    const day = date.getDate()
    let month = date.getMonth() +1
    const year = date.getFullYear()
    if (month < 10){
      month = "0"+month
    }

    const date_ = `${day}/${month}/${year}`;
    return date_;
  }
}

module.exports = account