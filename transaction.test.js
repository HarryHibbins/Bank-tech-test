const Transaction = require('./transaction')

describe(Transaction, () => {
  it("Sets the type", () => {
    const transaction = new Transaction(100,new Date(),"hello");
    transaction.setType("deposit")  
    expect(transaction.getType()).toBe("DEPOSIT")
  })
  it("Has an amount", () => {
    const transaction = new Transaction(1000);
    
    expect(transaction.getAmount()).toBe(1000)
  })
  it("Has a default date", () => {
    const transaction = new Transaction(1000);
    const date = (new Date).toLocaleDateString()
    expect(transaction.getDate()).toBe(date)
  })
  it("Has an entered date", () => {
    const transaction = new Transaction(1000, '01/01/2023');
    expect(transaction.getDate()).toBe('01/01/2023')
  })
  it("Only a number greater than 0 can be entered", () => {
    
    expect(() => {new Transaction(-1000)}).toThrow(Error)
    expect(() => {new Transaction(-1000)}).toThrow("Number must be greater than 0")
    expect(() => {new Transaction(0)}).toThrow(Error)
    expect(() => {new Transaction(0)}).toThrow("Number must be greater than 0")

  })
  it("Deposit amount has a maximum of 2 decimal places", () => {
    
    expect(() => {new Transaction(30.555)}).toThrow(Error)
    expect(() => {new Transaction(30.555)}).toThrow("Maximum of 2 decimal places")
  })
})