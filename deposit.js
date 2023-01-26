const Transaction = require('./transaction')

class Deposit extends Transaction{
  constructor(amount, date = (new Date).toLocaleDateString(),  type = "DEPOSIT"){
    super(amount, date, type)
  }
}

module.exports = Deposit