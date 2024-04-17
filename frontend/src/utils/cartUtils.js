export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

export const updataCart = (state) => {
    //items price 
    state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );


    //shipping price (above 100 free , $10 as default)

    state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 10)

    //tax price (15%)

    state.taxPrice = addDecimals(
        Number((0.15 * state.itemsPrice).toFixed(2))
    );


    //Total price 
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state))
    return state
}