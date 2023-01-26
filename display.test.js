const Display = require("./display")

describe(Display, () => {
  it("Display shows a deposit", () => {

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
        return mockedDeposit
      },
      getTransactions: () => {
        return [mockedDeposit]
      }
    }
    mockedAccount.Deposit(mockedDeposit);

    
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
        return 1000
      },
      getType: () => {
        return 'DEPOSIT'
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
      getType: () => {
        return 'WITHDRAW'
      }
    }
    const mockedAccount = {
      GetBalace: () => {
        return 1000
      },
      Deposit: () => {
        return mockedDeposit
      },
      Withdraw: () => {
        return mockedWithdraw
      },
      getTransactions: () => {
        return [mockedDeposit, mockedWithdraw]
      }
    }
    mockedAccount.Deposit(mockedDeposit);
    mockedAccount.Withdraw(mockedWithdraw);

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