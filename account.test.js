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
    
    expect(account.GetBalance()).toBe(0)
  })
  it("Balance can be increased by depositing", () => {
    const account = new Account;
    
    const mockedDeposit = {
      GetAmount: () => {
        return 1000
      },
      GetDate: () => {
        return '01/01/2023';
      },
      SetNewBalance: () => {
      },
      GetNewBalance: () => {
        return 1000;
      }
    }
    account.Deposit(mockedDeposit);

    expect(account.GetBalance()).toBe(1000)
  })
  it("Balance can be decreased by withdrawing", () => {
    const account = new Account();

    const mockedDeposit = {
      GetAmount: () => {
        return 1000
      },
      GetDate: () => {
        return '01/01/2023';
      },
      SetNewBalance: () => {
      },
      GetNewBalance: () => {
        return 1000;
      }
    }

    const mockedWithdraw = {
      GetAmount: () => {
        return 500
      },
      GetDate: () => {
        return '01/01/2023';
      },
      SetNewBalance: () => {
      },
      GetNewBalance: () => {
        return 500;
      }
    }
    
    account.Deposit(mockedDeposit)
    account.Withdraw(mockedWithdraw)
    expect(account.GetBalance()).toBe(500)
  })
  it("Amount must be greater than balance to be withdrawn", () => {
    const account = new Account;

    const mockedWithdraw = {
      GetAmount: () => {
        return 500
      },
      GetDate: () => {
        return '01/01/2023';
      },
      SetNewBalance: () => {
      }
    }
    
    expect(() => {account.Withdraw(mockedWithdraw)}).toThrow(Error)
    expect(() => {account.Withdraw(mockedWithdraw)}).toThrow("Insufficient funds")
    
    expect(account.GetBalance()).toBe(0)
  })
  it("Adds deposits to a list of transactions", () => {
    const account = new Account;

    const mockedDeposit = {
      GetAmount: () => {
        return 1000
      },
      GetDate: () => {
        return '01/01/2023';
      },
      GetType: () => {
        return 'DEPOSIT';
      },
      SetNewBalance: () => {
      }
    }
    account.Deposit(mockedDeposit)

    expect(account.GetTransactions()).toEqual([mockedDeposit])
    expect(account.GetTransactions()[0].GetAmount()).toBe(1000)
    expect(account.GetTransactions()[0].GetType()).toBe("DEPOSIT")

  })
  it("Adds deposits and withdrawals to a list of transactions", () => {
    const account = new Account;


    const mockedDeposit = {
      GetAmount: () => {
        return 1000
      },
      GetDate: () => {
        return '01/01/2023';
      },
      SetNewBalance: () => {
      },
      GetNewBalance: () => {
        return 1000;
      }
    }

    const mockedWithdraw = {
      GetAmount: () => {
        return 250
      },
      GetDate: () => {
        return '01/01/2023';
      },
      SetNewBalance: () => {
      },
      GetNewBalance: () => {
        return 750
      },
      GetType: () => {
        return 'WITHDRAW'
      }
    }
    account.Deposit(mockedDeposit)
    account.Withdraw(mockedWithdraw)

    expect(account.GetTransactions()).toEqual([mockedDeposit, mockedWithdraw])
    expect(account.GetTransactions()[1].GetAmount()).toBe(250)
    expect(account.GetTransactions()[1].GetNewBalance()).toBe(750)
    expect(account.GetTransactions()[1].GetDate()).toBe('01/01/2023')
    expect(account.GetTransactions()[1].GetType()).toBe("WITHDRAW")

  })
})