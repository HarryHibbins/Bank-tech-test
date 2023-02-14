const Account = require('./account')

// formatDate = (date) => {

//   const day = date.getDate()
//   let month = date.getMonth() +1
//   const year = date.getFullYear()
//   if (month < 10){
//     month = "0"+month
//   }

//   const date_ = `${day}/${month}/${year}`;
//   return date_;
// }

describe(Account, () => {

  it("Has a balance", () => {
    const account = new Account;
    
    expect(account.getBalance()).toBe(0)
  })
  it("Balance can be increased by depositing", () => {
    const account = new Account;
    
    const mockedTransaction = {
      getAmount: () => {
        return 1000
      },
      getDate: () => {
        return '01/01/2023';
      },
      setNewBalance: () => {
      },
      getType: () => {
        return 'DEPOSIT';
      },
      setType: () => {
      },
      getNewBalance: () => {
        return 1000;
      }
    }
    account.Deposit(mockedTransaction);

    expect(account.getBalance()).toBe(1000)
  })
  it("Balance can be decreased by withdrawing", () => {
    const account = new Account();

    const mockedTransaction = {
      getAmount: () => {
        return 1000
      },
      getDate: () => {
        return '01/01/2023';
      },
      setNewBalance: () => {
      },
      getType: () => {
        return 'DEPOSIT';
      },
      setType: () => {
      },
      getNewBalance: () => {
        return 1000;
      }
    }

    const mockedTransaction1 = {
      getAmount: () => {
        return 500
      },
      getDate: () => {
        return '01/01/2023';
      },
      setNewBalance: () => {
      },
      getType: () => {
        return 'WITHDRAW';
      },
      setType: () => {
      },
      getNewBalance: () => {
        return 500;
      }
    }
    
    account.Deposit(mockedTransaction)
    account.Withdraw(mockedTransaction1)
    expect(account.getBalance()).toBe(500)
  })
  it("Amount must be greater than balance to be withdrawn", () => {
    const account = new Account;

    const mockedTransaction = {
      getAmount: () => {
        return 500
      },
      getDate: () => {
        return '01/01/2023';
      },
      getType: () => {
        return 'WITHDRAW';
      },
      setType: () => {
      },
      setNewBalance: () => {
      }
    }
    
    expect(() => {account.Withdraw(mockedTransaction)}).toThrow(Error)
    expect(() => {account.Withdraw(mockedTransaction)}).toThrow("Insufficient funds")
    
    expect(account.getBalance()).toBe(0)
  })
  it("Adds deposits to a list of transactions", () => {
    const account = new Account;

    const mockedTransaction = {
      getAmount: () => {
        return 1000
      },
      getDate: () => {
        return '01/01/2023';
      },
      getType: () => {
        return 'DEPOSIT';
      },
      setType: () => {
      },
      setNewBalance: () => {
      }
    }
    account.Deposit(mockedTransaction)

    expect(account.getTransactions()).toEqual([mockedTransaction])
    expect(account.getTransactions()[0].getAmount()).toBe(1000)
    expect(account.getTransactions()[0].getType()).toBe("DEPOSIT")

  })
  it("Adds deposits and withdrawals to a list of transactions", () => {
    const account = new Account;


    const mockedTransaction = {
      getAmount: () => {
        return 1000
      },
      getDate: () => {
        return '01/01/2023';
      },
      setNewBalance: () => {
      },
      getType: () => {
        return 'DEPOSIT';
      },
      setType: () => {
      },
      getNewBalance: () => {
        return 1000;
      }
    }

    const mockedTransaction1 = {
      getAmount: () => {
        return 250
      },
      getDate: () => {
        return '01/01/2023';
      },
      setNewBalance: () => {
      },
      getNewBalance: () => {
        return 750
      },
      getType: () => {
        return 'WITHDRAW'
      },
      setType: () => {
      },
    }
    account.Deposit(mockedTransaction)
    account.Withdraw(mockedTransaction1)

    expect(account.getTransactions()).toEqual([mockedTransaction, mockedTransaction1])
    expect(account.getTransactions()[1].getAmount()).toBe(250)
    expect(account.getTransactions()[1].getNewBalance()).toBe(750)
    expect(account.getTransactions()[1].getDate()).toBe('01/01/2023')
    expect(account.getTransactions()[1].getType()).toBe("WITHDRAW")

  })
  it("A Transaction can be used to deposit money into the account", () => {
    const account = new Account;
    
    const mockedTransaction = {
      getAmount: () => {
        return 1000
      },
      getDate: () => {
        return '01/01/2023';
      },
      setNewBalance: () => {
      },
      getNewBalance: () => {
        return 1000;
      },
      getType: () => {
        return "DEPOSIT"
      },
    }
    account.Deposit(mockedTransaction);

    expect(account.getBalance()).toBe(1000)
  })
})