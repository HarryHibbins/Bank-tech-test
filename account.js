class account {
  constructor(){
    this.balance = 0;
  }

  GetBalance = () => {
    return this.balance;
  }

  Deposit = (amount) => {
    if (amount <= 0){
      throw new Error('Number must be greater than 0')
    }
    
    this.balance += amount;
  }
}

module.exports = account