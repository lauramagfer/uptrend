if (document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', inicio)
} else {
    inicio()
}

let totalAmount = "0,00"

function inicio() {

    // removendo produtos
    const removeProductsButtons = document.getElementsByClassName('remove-product-button')

    for (i = 0; i < removeProductsButtons.length; i++){
        removeProductsButtons[i].addEventListener("click", removeProduct)
    }

    // adicionando quantidade

    const quantityInputs = document.getElementsByClassName("product-qtd-input")

    for (i = 0; i < quantityInputs.length; i++){
       quantityInputs[i].addEventListener("change", checkIfInputIsNull) 
    }


    // adicionando novos produtos

    const addToCartButtons = document.getElementsByClassName("btn-default")
    for (i = 0; i < addToCartButtons.length; i++){
        addToCartButtons[i].addEventListener("click", adddProductToCart)
    }

    const purchaseButton = document.getElementsByClassName("purchase-button")[0]
    purchaseButton.addEventListener("click", makePurchase)
}

function makePurchase() {
    updateTotal()
    if (totalAmount === "0,00") {
        alert(`Seu carrinho está vazio. Para finalizar a compra, insira algum item do catálogo`)
    } else {
        alert(
            `
            Agradecemos pela sua confiança!
            Total do pedido: R$ ${totalAmount}
            Volte Sempre!
            `
        )
    }

    document.querySelector(".cart-table tbody").innerHTML = " "
    updateTotal()
}

function removeProduct(event) {
    event.target.parentElement.parentElement.remove()
    updateTotal()
}

function checkIfInputIsNull(event) {
    if (event.target.value === "0") {
        event.target.parentElement.parentElement.remove()
    } 

    updateTotal()
}


function adddProductToCart(event) {
    const button = event.target
    const productInfos = button.parentElement.parentElement
    const productImage = productInfos.getElementsByClassName("product-image")[ 0 ].src
    const productTitle = productInfos.getElementsByClassName("clothe-title")[0].innerText
    const productCartPrice = productInfos.getElementsByClassName("clothe-price")[0].innerText


    const productCartName= document.getElementsByClassName("cart-product-title")
    for (i = 0; i < productCartName.length; i++){
        if (productCartName[i].innerText === productTitle) {
            productCartName[ i ].parentElement.parentElement.getElementsByClassName("product-qtd-input")[ 0 ].value++
            updateTotal()
            return
        }
    }

    let newCartProduct = document.createElement("tr")
    newCartProduct.classList.add("cart-product")

    newCartProduct.innerHTML = 
        `<td class="product-identification">
            <img src= ${productImage} alt="" class="cart-product-image">
            <strong class="cart-product-title">
                ${productTitle}
            </strong>
        </td>
        <td>
            <span class="cart-product-price">${productCartPrice}</span>
        </td>
        <td>
            <input type="number" value="1" min="0" class="product-qtd-input">
            <button type="button" class="remove-product-button">
                Remover
            </button>
        </td>
        
        `
    
    const tableBody= document.querySelector(".cart-table tbody")
    tableBody.append(newCartProduct)
    updateTotal()

    newCartProduct.getElementsByClassName("product-qtd-input")[ 0 ].addEventListener("change", checkIfInputIsNull)
    
    newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct)

}

function updateTotal() {
    totalAmount = 0
    const cartProduct= document.getElementsByClassName("cart-product")

    for (i = 0; i < cartProduct.length; i++){
        const productPrice = cartProduct[ i ].getElementsByClassName("cart-product-price")[ 0 ].innerText.replace("R$", "").replace(",", ".")
        const productQuantity = cartProduct[ i ].getElementsByClassName("product-qtd-input")[0].value
        totalAmount = totalAmount + (productPrice * productQuantity)
    }

    totalAmount = totalAmount.toFixed(2)
    totalAmount = totalAmount.replace(".", ",")
    document.querySelector(".cart-total-container span").innerText = "R$" + totalAmount
}

updateTotal()