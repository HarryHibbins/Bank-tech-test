Account = require('./account')
class Display{
  constructor(account){
    this.account = account
  }

  printStatement = () => {
    const transactions = this.account.getTransactions();
    console.log("date || credit || debit || balance");
    for (let i = 0; i < transactions.length; i++) {
      const element = transactions[i];
      this.printRow(element)
    }
  };

  printRow = (element) => {
    if (element.getType() == "DEPOSIT") {
      console.log(`${element.getDate()} || || ${element.getAmount().toFixed(2)} || ${element.getNewBalance().toFixed(2)}`);
    }
    else {
      console.log(`${element.getDate()} || ${element.getAmount().toFixed(2)} || || ${element.getNewBalance().toFixed(2)}`);
    }
  }
}

module.exports = Display;