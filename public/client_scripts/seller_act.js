const tableBodySellerHandler = document.getElementById('tableBodySeller')
const totalSoldHandler = document.getElementById('totalSold')
const totalInStockHandler = document.getElementById('totalOrders')
const totalProductHandler = document.getElementById('totalProduct')

fetch('/products')
    .then((response) => response.json())
    .then((data) => {
        totalProductHandler.innerText = data.length
        var totalSoldProduct = 0
        var totalInStockProduct = 0
        

        data.forEach((datun) => {
            totalSoldProduct += datun.buyerRequest
            totalInStockProduct += datun.inStock
            tableBodySellerHandler.innerHTML += `
            <tr>
            <th scope="row"> <img src="/product/${datun._id}/productpic" alt="product" width="50rem"> </th>
            <td> ${datun.productName} </td>
            <td> ${datun.category} </td>
            <td> <span>#<span> ${datun.price} </td>
            <td> ${datun.description} </td>
            <td>  ${datun.inStock} </td>
            <td>  ${datun.availableColor} </td>
            <td>  ${datun.availableSize} </td>
            <td> <button class="btn btn-outline-danger" id="deleteProduct" onClick="deleteProduct('${datun._id}')"><i class="fa-solid fa-trash-can"></i></button>  </td>
            <td><button class="btn btn-outline-success" id="editProduct" onClick="editProduct('${datun._id}')"><i class="fa-solid fa-pen"></i></button></td>
          </tr>
            `
        })
        totalSoldHandler.innerText = totalSoldProduct
        totalInStockHandler.innerText = totalInStockProduct

    })


function deleteProduct(sellerId) {
    console.log(sellerId)
    async function postData(url) {

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return response.json();

    }

    postData('/product/' + sellerId)
        .then((data) => {
            console.log(data)
        }).catch((e) => {
            console.log(e)
        })

   location.reload()
}

const editProduct = (sellerId) => {
    localStorage.setItem('productId', sellerId)
    window.location.href = "/editproduct"
}

