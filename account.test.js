const Account = require('./account')

formatDate = (date) => {

  const day = date.getDate()
  let month = date.getMonth() +1
  const year = date.getFullYear()
  if (month < 10){
    month = "0"+month
  }

  const date_ = `${day}/${month}/${year}`;
  return date_;
}

describe(Account, () => {

  it("Has a balance", () => {
    const account = new Account;
    
    expect(account.getBalance()).toBe(0)
  })
  it("Balance can be increased by depositing", () => {
    const account = new Account;
    
    const mockedDeposit = {
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
      }
    }
    account.Deposit(mockedDeposit);

    expect(account.getBalance()).toBe(1000)
  })
  it("Balance can be decreased by withdrawing", () => {
    const account = new Account();

    const mockedDeposit = {
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
      }
    }

    const mockedWithdraw = {
      getAmount: () => {
        return 500
      },
      getDate: () => {
        return '01/01/2023';
      },
      setNewBalance: () => {
      },
      getNewBalance: () => {
        return 500;
      }
    }
    
    account.Deposit(mockedDeposit)
    account.Withdraw(mockedWithdraw)
    expect(account.getBalance()).toBe(500)
  })
  it("Amount must be greater than balance to be withdrawn", () => {
    const account = new Account;

    const mockedWithdraw = {
      getAmount: () => {
        return 500
      },
      getDate: () => {
        return '01/01/2023';
      },
      setNewBalance: () => {
      }
    }
    
    expect(() => {account.Withdraw(mockedWithdraw)}).toThrow(Error)
    expect(() => {account.Withdraw(mockedWithdraw)}).toThrow("Insufficient funds")
    
    expect(account.getBalance()).toBe(0)
  })
  it("Adds deposits to a list of transactions", () => {
    const account = new Account;

    const mockedDeposit = {
      getAmount: () => {
        return 1000
      },
      getDate: () => {
        return '01/01/2023';
      },
      GetType: () => {
        return 'DEPOSIT';
      },
      setNewBalance: () => {
      }
    }
    account.Deposit(mockedDeposit)

    expect(account.getTransactions()).toEqual([mockedDeposit])
    expect(account.getTransactions()[0].getAmount()).toBe(1000)
    expect(account.getTransactions()[0].GetType()).toBe("DEPOSIT")

  })
  it("Adds deposits and withdrawals to a list of transactions", () => {
    const account = new Account;


    const mockedDeposit = {
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
      }
    }

    const mockedWithdraw = {
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
      GetType: () => {
        return 'WITHDRAW'
      }
    }
    account.Deposit(mockedDeposit)
    account.Withdraw(mockedWithdraw)

    expect(account.getTransactions()).toEqual([mockedDeposit, mockedWithdraw])
    expect(account.getTransactions()[1].getAmount()).toBe(250)
    expect(account.getTransactions()[1].getNewBalance()).toBe(750)
    expect(account.getTransactions()[1].getDate()).toBe('01/01/2023')
    expect(account.getTransactions()[1].GetType()).toBe("WITHDRAW")

  })
})