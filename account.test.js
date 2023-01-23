const Account = require('./account')

describe(Account, () => {
  it("Has a balance", () => {
    account = new Account;

    expect(account.GetBalance()).toBe(0)
  })
})