Account = require('./account')
class Display{
  constructor(account){
    this.account = account
  }

  printStatement = () => {
    const transactions = this.account.GetTransactions();
    console.log("date || credit || debit || balance");
    for (let i = 0; i < transactions.length; i++) {
      const element = transactions[i];
      this.printRow(element)
    }
  };

  printRow = (element) => {
    if (element.GetType() == "DEPOSIT") {
      console.log(`${element.GetDate()} || || ${element.GetAmount().toFixed(2)} || ${element.GetNewBalance().toFixed(2)}`);
    }
    else {
      console.log(`${element.GetDate()} || ${element.GetAmount().toFixed(2)} || || ${element.GetNewBalance().toFixed(2)}`);
    }
  }
}

module.exports = Display;