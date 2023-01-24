
const Withdraw = require('./withdraw')
describe(Withdraw, () => {
  it("Has an amount", () => {
    const withdraw = new Withdraw(1000);
    
    expect(withdraw.GetAmount()).toBe(1000)
  })
  it("Has a default date", () => {
    const withdraw = new Withdraw(1000);
    const date = (new Date).toLocaleDateString()
    expect(withdraw.GetDate()).toBe(date)
  })
  it("Has an entered date", () => {
    const withdraw = new Withdraw(1000, '01/01/2023');
    expect(withdraw.GetDate()).toBe('01/01/2023')
  })
  xit("Throws an error if an invalid date is entered", () => {
  })
  it("Only a number greater than 0 can be withdrawn", () => {
    
    expect(() => {new Withdraw(-1000)}).toThrow(Error)
    expect(() => {new Withdraw(-1000)}).toThrow("Number must be greater than 0")
    expect(() => {new Withdraw(0)}).toThrow(Error)
    expect(() => {new Withdraw(0)}).toThrow("Number must be greater than 0")

  })
  it("Withdraw amount has a maximum of 2 decimal places", () => {
    
    expect(() => {new Withdraw(30.555)}).toThrow(Error)
    expect(() => {new Withdraw(30.555)}).toThrow("Maximum of 2 decimal places")
  })
  
})