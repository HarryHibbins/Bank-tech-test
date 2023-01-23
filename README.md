# Bank Program

## How To Install
To install jest: 

`npm install --save-dev jest`

## How To Use
1. Run `node` in a terminal 
2. Require account file with: `const Account = require('./account')`
3. Create an instance of account: `account = new Account()`
4. Use the following functions to interact with the program
```JS
account.Deposit(amount)
account.Withdraw(amount)
account.PrintSatement()
``` 

## How To Run Tests
run `jest` in root folder
