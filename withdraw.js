const Transaction = require("./transaction");

class Withdraw extends Transaction{
  constructor(amount, date = (new Date).toLocaleDateString(),  type = "WITHDRAW"){
    super(amount, date, type)
  }

}

module.exports = Withdraw