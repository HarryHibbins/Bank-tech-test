const Display = require("./display")

describe(Display, () => {
  it("Display shows a deposit", () => {

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
        return 1000
      },
      getType: () => {
        return 'DEPOSIT'
      }
    }

    const mockedAccount = {
      GetBalace: () => {
        return 1000
      },
      Deposit: () => {
        return mockedTransaction
      },
      getTransactions: () => {
        return [mockedTransaction]
      }
    }
    mockedAccount.Deposit(mockedTransaction);

    
    const logSpy = jest.spyOn(global.console, 'log');

    const display = new Display(mockedAccount);
    display.printStatement();

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith("date || credit || debit || balance");
    expect(logSpy).toHaveBeenCalledWith(`${'01/01/2023'} || || 1000.00 || 1000.00`);
    logSpy.mockRestore();
  })
  it("Display shows deposits and withdrawals", () => {

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
        return 1000
      },
      getType: () => {
        return 'DEPOSIT'
      },
      setType: () => {
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
      }
    }
    const mockedAccount = {
      GetBalace: () => {
        return 1000
      },
      Deposit: () => {
        return mockedTransaction
      },
      Withdraw: () => {
        return mockedTransaction1
      },
      getTransactions: () => {
        return [mockedTransaction, mockedTransaction1]
      }
    }
    mockedAccount.Deposit(mockedTransaction);
    mockedAccount.Withdraw(mockedTransaction1);

    const logSpy = jest.spyOn(console, 'log');

    const display = new Display(mockedAccount);
    display.printStatement();

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenCalledWith("date || credit || debit || balance");
    expect(logSpy).toHaveBeenCalledWith(`${'01/01/2023'} || || 1000.00 || 1000.00`);
    expect(logSpy).toHaveBeenCalledWith(`${'01/01/2023'} || 250.00 || || 750.00`);

    logSpy.mockRestore();
  })
})