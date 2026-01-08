import { formatCurrency } from "../scripts/utils/money.js";


console.log("Test Suite : formatCurrency(amountInCents)");

console.log('Test against normal case')
if(formatCurrency(2095) === '20.95')
    console.log('Passed');
else
    console.log('Failed');


console.log('Test against 0 Cents')
if(formatCurrency(0) === '0.00')
    console.log('Passed');
else
    console.log('Failed');

console.log('Test against decimal cents')
if(formatCurrency(2000.5) === '20.01')
    console.log('Passed');
else
    console.log('Failed');