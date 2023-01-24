const Deposit = require('./deposit')
describe(Deposit, () => {
  it("Has an amount", () => {
    const deposit = new Deposit(1000);
    
    expect(deposit.GetAmount()).toBe(1000)
  })
  it("Has a default date", () => {
    const deposit = new Deposit(1000);
    const date = (new Date).toLocaleDateString()
    expect(deposit.GetDate()).toBe(date)
  })
  it("Has an entered date", () => {
    const deposit = new Deposit(1000, '01/01/2023');
    expect(deposit.GetDate()).toBe('01/01/2023')
  })
  it("Only a number greater than 0 can be deposited", () => {
    
    expect(() => {new Deposit(-1000)}).toThrow(Error)
    expect(() => {new Deposit(-1000)}).toThrow("Number must be greater than 0")
    expect(() => {new Deposit(0)}).toThrow(Error)
    expect(() => {new Deposit(0)}).toThrow("Number must be greater than 0")

  })
  it("Deposit amount has a maximum of 2 decimal places", () => {
    
    expect(() => {new Deposit(30.555)}).toThrow(Error)
    expect(() => {new Deposit(30.555)}).toThrow("Maximum of 2 decimal places")
  })
})