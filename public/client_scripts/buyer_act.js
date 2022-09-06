const tbodyGenerelHandler = document.getElementById('tbodyGenerel')
const compOrdersHandler = document.getElementById('compOrders')
const totalOrdersHandler = document.getElementById('totalOrders')
const noInCartHandler = document.getElementById('noInCart')


fetch('/orders')
    .then((response) => response.json())
    .then((data) => {
        console.log(data)

        const completedOrders = data.filter((x) => x.inCart === false)
        const noOfcompletedOrders = completedOrders.length
        const noOfTotalOrders = data.length
        const ordersInCart = data.filter((x) => x.inCart === true)
        const noOfordersInCart = ordersInCart.length
        
        data.forEach((datun) => {
            const totalPrice = datun.price * datun.quantity
            tbodyGenerelHandler.innerHTML += `
            <tr>
            <th scope="row"> <img src="/product/${datun.productId}/productpic" alt="product" width="50rem"> </th>
            <td> ${datun.productName} </td>
            <td> ${datun.quantity} </td>
            <td> # ${(datun.price.toLocaleString())}</td>
            <td>${datun.color}</td>
            <td> ${datun.size}</td>
            <td># ${(totalPrice).toLocaleString()}</td>
          </tr>
            `
        })

        compOrdersHandler.innerText = noOfcompletedOrders
        totalOrdersHandler.innerText = noOfTotalOrders
        noInCartHandler.innerText = noOfordersInCart
    })

   