class Account {
  constructor(){
    this.transactions = []
  }

  GetBalance = () => {
    if (this.GetTransactions().length >= 1){
      const lastElement = this.GetTransactions().at(-1);
      return lastElement.GetNewBalance();
    }
    else{
      return 0;
    }
  }

  Deposit = (deposit) => {
    const newAmount = this.GetBalance() + deposit.GetAmount();
    this.transactions.push(deposit)
    deposit.SetNewBalance(newAmount)
    return deposit;

  }

  Withdraw = (withdraw) => {
    if (withdraw.GetAmount() > this.GetBalance()){
      throw new Error('Insufficient funds')
    }
    const newAmount = this.GetBalance() - withdraw.GetAmount();
    this.transactions.push(withdraw)
    withdraw.SetNewBalance(newAmount)
    return withdraw;

  }

  GetTransactions = () => {
    return this.transactions;
  }
}

module.exports = Account