Deposit = require('./deposit')
class account {
  constructor(){
    this.balance = 0;
    this.transactions = []
  }

  GetBalance = () => {
    return this.balance;
  }

  Deposit = (deposit) => {
    this.balance += deposit.GetAmount();
    this.transactions.push(deposit)
    deposit.SetNewBalance(this.GetBalance())
    return deposit;

  }

  Withdraw = (withdraw) => {
    if (withdraw.GetAmount() > this.GetBalance()){
      throw new Error('Insufficient funds')
    }
    this.balance -= withdraw.GetAmount();
    this.transactions.push(withdraw)
    withdraw.SetNewBalance(this.GetBalance())
    return withdraw;

  }
  PrintStatement = () => {
    const transactions = this.GetTransactions();
    console.log("date || credit || debit || balance || type");
    for (let i = 0; i < transactions.length; i++) {
      const element = transactions[i];
      if (element.GetType() == "DEPOSIT"){
        console.log(`${element.GetDate()} || || ${element.GetAmount().toFixed(2)} || ${element.GetNewBalance().toFixed(2)} || ${element.GetType()}`);
      }
      else{
        console.log(`${element.GetDate()} || ${element.GetAmount().toFixed(2)} || || ${element.GetNewBalance().toFixed(2)} || ${element.GetType()}`);

      }
    }

 
  }
  GetTransactions = () => {
    return this.transactions;
  }
}

module.exports = account