const Display = require("./display")

describe(Display, () => {
  it("Display shows a deposit", () => {

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
        return 1000
      },
      GetType: () => {
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
      GetTransactions: () => {
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
      GetAmount: () => {
        return 1000
      },
      GetDate: () => {
        return '01/01/2023';
      },
      SetNewBalance: () => {
      },
      GetNewBalance: () => {
        return 1000
      },
      GetType: () => {
        return 'DEPOSIT'
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
      GetTransactions: () => {
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