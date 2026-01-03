export function exportCurrency(amountInCents){
    return (amountInCents / 100).toFixed(2);
}