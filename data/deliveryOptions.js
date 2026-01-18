import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [
    {
        id: '1',
        deliveryDays: 7,
        priceCents: 0
    },
    {
        id: '2',
        deliveryDays: 3,
        priceCents: 499
    },
    {
        id: '3',
        deliveryDays: 1,
        priceCents: 999
    }
];

export function getDeliveryOptionsById(deliveryOptionId) {
    const [productDeliveryDetails] = deliveryOptions.filter(deliveryOption => deliveryOption.id === deliveryOptionId);
    return productDeliveryDetails || deliveryOptions[0];
}

export function generateFormattedDate(daysCount) {
    let today = dayjs();
    let deliveryDate = today.add(daysCount, 'days');
    while(isWeekend(deliveryDate)){
        deliveryDate = deliveryDate.add(1,'days');
    }
    const formattedDeliveryDate = deliveryDate.format('dddd, MMMM D')
    return formattedDeliveryDate;
}

function isWeekend(date){
    const day = date.format('dddd');
    if( day === 'Saturday' || day === 'Sunday')
        return true;
    return false;
}