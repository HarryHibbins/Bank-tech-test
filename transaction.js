class Transaction{
  constructor(amount, date = (new Date).toLocaleDateString()){
    this.amountValidation(amount)
    this.amount = amount;
    this.date = date;
    this.newBalance = 0;
  }

  getAmount(){
    return this.amount;
  }

  getDate(){
    return this.date;
  }

  setNewBalance(balance){
    this.newBalance = balance;
  }

  getNewBalance(){
    return this.newBalance;
  }

  getType(){
    return this.type;
  }

  setType(string){
    this.type = string.toUpperCase();
  }
  amountValidation = (amount) => {
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