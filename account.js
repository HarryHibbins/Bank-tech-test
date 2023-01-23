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

    this.balance += amount;
    const date = this.formatDate(new Date)
    const deposit = {amount: amount, date: date, balance: this.balance, type: "DEPOSIT"}
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
    const withdraw = {amount: amount, date: date, balance: this.balance, type: "WITHDRAW"};
    this.transactions.push(withdraw)
    return withdraw;

  }

  GetTransactions(){
    return this.transactions;
  }
  



  AmountValidation = (amount) => {
    if (amount <= 0){
      throw new Error('Number must be greater than 0')
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