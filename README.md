# Bank Program

## How To Install
To install jest: 

`npm install --save-dev jest`

## How To Use
1. Run `node` in a terminal 
2. Require account, deposit, and withdraw class with:
```JS
Account = require('./account');
Transaction = require('./transaction');
Display = require('./display');
```
3. Create an instance of account and display:
 ```JS
 const account = new Account()
 const display = new Display(account);
 ```
4. Use the following functions to interact with the program
```JS
account.Deposit(new Deposit(amount));
account.Withdraw(new Withdraw(amount));

``` 

5. Repeat deposit and withdraw steps to add and remove money.
6. Use the following function to show transactions.
```JS
display.printStatement()
```


## How To Run Tests
run `jest` in root folder
