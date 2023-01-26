class Transaction{
  constructor(amount, date, type){
    this.AmountValidation(amount)
    this.amount = amount;
    this.type = type;
    this.date = date;
    this.newBalance = 0;
  }

  GetAmount(){
    return this.amount;
  }

  GetDate(){
    return this.date;
  }

  SetNewBalance(balance){
    this.newBalance = balance;
  }

  GetNewBalance(){
    return this.newBalance;
  }

  GetType(){
    return this.type;
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

}

module.exports = Transaction