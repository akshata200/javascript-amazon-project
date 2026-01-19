export const orders = JSON.parse(localStorage.getItem('Orders')) || [];

export function addOrder(order){
    orders.unshift(order);
    saveToStorage();
}


function saveToStorage(){
    localStorage.setItem('Orders',JSON.stringify(orders));
}

export function getOrderById(orderId){
    const [order] = orders.filter(order=> order.id === orderId)
    return order;
}