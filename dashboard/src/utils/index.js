export const getPrice = (price) => {
    return `R$${parseFloat(price).toFixed(2).replace('.', ',')}`
}