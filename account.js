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

  Deposit = (deposit) => {
    const newAmount = this.getBalance() + deposit.getAmount();
    this.transactions.push(deposit)
    deposit.setNewBalance(newAmount)
    return deposit;

  }

  Withdraw = (withdraw) => {
    if (withdraw.getAmount() > this.getBalance()){
      throw new Error('Insufficient funds')
    }
    const newAmount = this.getBalance() - withdraw.getAmount();
    this.transactions.push(withdraw)
    withdraw.setNewBalance(newAmount)
    return withdraw;

  }

  getTransactions = () => {
    return this.transactions;
  }
}

module.exports = Account