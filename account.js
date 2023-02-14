Transaction = require('./transaction')

class Account {
  constructor(){
    this.transactions = []
  }

  getBalance = () => {
    if (this.getTransactions().length >= 1){
      const lastElement = this.getTransactions().at(-1);
      return lastElement.getNewBalance();
    }
    else{
      return 0;
    }
  }

  Deposit = (transaction) => {
    if (transaction.getType() != "DEPOSIT"){
      transaction.setType("DEPOSIT")
    }
    const newAmount = this.getBalance() + transaction.getAmount();
    this.transactions.push(transaction)
    transaction.setNewBalance(newAmount)
    return transaction;

  }

  Withdraw = (transaction) => {
    if (transaction.getType() != "WITHDRAW"){
      transaction.setType("WITHDRAW")
    }
    if (transaction.getAmount() > this.getBalance()){
      throw new Error('Insufficient funds')
    }
    const newAmount = this.getBalance() - transaction.getAmount();
    this.transactions.push(transaction)
    transaction.setNewBalance(newAmount)
    return transaction;

  }

  getTransactions = () => {
    return this.transactions;
  }
}

module.exports = Account