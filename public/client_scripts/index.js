const loginBtn = document.getElementById('buyerBtnClicked')

if (loginBtn) {

    loginBtn.addEventListener('click', (e) => {
        e.preventDefault()
        const buyerEmail = document.getElementById('buyerEmail').value
        const buyerPassword = document.getElementById('buyerPassword').value
        const errorMsg = document.getElementById('errorMsgId')

        async function postData(url, data) {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            return response.json();

        }

        const option = {
            email: buyerEmail,
            password: buyerPassword
        }

        postData('/buyer/login', option)
            .then((data) => {
                console.log(data)
                window.location.replace("/buyer_act");
            }).catch((e) => {
                errorMsg.classList.remove('errorMsg')
            })



    })

}

const loginBtn2 = document.getElementById('sellerBtnClicked')

if (loginBtn2) {

    loginBtn2.addEventListener('click', (e) => {
        e.preventDefault()
        const sellerEmail = document.getElementById('sellerEmail').value
        const sellerPassword = document.getElementById('sellerPassword').value
        const errorMsg = document.getElementById('errorMsgId')

        async function postData(url, data) {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            return response.json();

        }

        const option = {
            email: sellerEmail,
            password: sellerPassword
        }

        postData('/seller/login', option)
            .then((data) => {
                console.log(data)
                window.location.replace("/seller_act");
            }).catch((e) => {
                errorMsg.classList.remove('errorMsg')
            })



    })

}

const createBtn = document.getElementById('createBuyerBtn')

if (createBtn) {
    createBtn.addEventListener('click', (e) => {
        e.preventDefault()
        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const comfirmPassword = document.getElementById('comfirmPassword').value
        const phoneNumber = document.getElementById('phoneNumber').value
        const location = document.getElementById('location').value
        const errorMsg = document.getElementById('errorMsgId')

        if (comfirmPassword === password) {

            async function postData(url, data) {

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })

                return response.json();

            }

            const option = {
                name,
                email,
                password,
                phoneNumber,
                location
            }

            postData('/buyer/signup', option)
                .then((data) => {
                    console.log(data)
                    window.location.replace("/buyer_act");
                }).catch((e) => {
                    errorMsg.innerText = 'Something Went Wrong. Please try again'
                    errorMsg.classList.remove('errorMsg')
                })

        } else {
            errorMsg.innerText = 'password does not match'
            errorMsg.classList.remove('errorMsg')
        }


    })
}


const sellerFormDisplayBtn = document.getElementById('sellerActBtnId')

if (sellerFormDisplayBtn) {
    sellerFormDisplayBtn.addEventListener('click', () => {
        const sellerSignUpForm = document.getElementById('sellerForm')
        sellerSignUpForm.classList.remove("signUpSellerForm")
    })
}

const createBtn2 = document.getElementById('createSellerBtn')

if (createBtn2) {
    createBtn2.addEventListener('click', (e) => {
        e.preventDefault()
        const shopName = document.getElementById('shopName').value
        const email = document.getElementById('email2').value
        const password = document.getElementById('password2').value
        const comfirmPassword = document.getElementById('comfirmPassword2').value
        const phoneNumber = document.getElementById('phoneNumber2').value
        const errorMsg = document.getElementById('errorMsgId')

        if (comfirmPassword === password) {

            async function postData(url, data) {

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })

                return response.json();

            }

            const option = {
                shopName,
                email,
                password,
                phoneNumber
            }

            postData('/seller/signup', option)
                .then((data) => {
                    console.log(data)
                    window.location.replace("/seller_act");
                }).catch((e) => {
                    errorMsg.innerText = 'Something Went Wrong. Please try again'
                    errorMsg.classList.remove('errorMsg')
                })

        } else {
            errorMsg.innerText = 'password does not match'
            errorMsg.classList.remove('errorMsg')
        }


    })
}

const updateSellerProfileBtn = document.getElementById('updateSellerProfile')

if (updateSellerProfileBtn) {
    updateSellerProfileBtn.addEventListener('click', (e) => {
        e.preventDefault()
        newShopName = document.getElementById('shopName').value
        newEmail = document.getElementById('email').value
        newPhoneNumber = document.getElementById('phoneNumber').value
        statusMsgInput = document.getElementById('statusMsg')

        async function postData(url, data) {

            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            return response.json();

        }

        const option = {
            shopName: newShopName,
            email: newEmail,
            phoneNumber: newPhoneNumber
        }

        postData('/sellerprofile/update', option)
            .then((data) => {
                console.log(data)
                statusMsgInput.innerText = 'Profile Updated Successfully'
                statusMsgInput.style.backgroundColor = 'green'
            }).catch((e) => {
                statusMsgInput.innerText = 'Something Went Wrong. Please try again'
                statusMsgInput.style.backgroundColor = 'red'
            })
    })
}

const uploadProductBtn = document.getElementById('uploadProduct')

if (uploadProductBtn) {
    uploadProductBtn.addEventListener('click', (e) => {
        e.preventDefault()
        statusMsgInput = document.getElementById('statusMsg')

        const availableSize1 = document.getElementById('availableSize1').value
        const availableSize2 = document.getElementById('availableSize2').value
        const availableSize3 = document.getElementById('availableSize3').value

        const availablecolor1 = document.getElementById('availableColor1').value
        const availableColor2 = document.getElementById('availableColor2').value
        const availableColor3 = document.getElementById('availableColor3').value

        const productName = document.getElementById('productName').value
        const availableColor = [availablecolor1, availableColor2, availableColor3]
        const availableSize = [availableSize1, availableSize2, availableSize3]
        const price = document.getElementById('price').value
        const category = document.getElementById('category').value
        const description = document.getElementById('description').value
        const inStock = document.getElementById('inStock').value

        async function postData(url, data) {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            return response.json();

        }

        const option = {
            productName,
            availableColor,
            availableSize,
            price,
            category,
            description,
            inStock
        }

        postData('/products', option)
            .then((data) => {
                localStorage.setItem("productId", data._id)
                statusMsgInput.innerText = 'Details uploaded, Kindly upload an image for the product below'
                statusMsgInput.style.backgroundColor = 'green'
            }).catch((e) => {
                statusMsgInput.innerText = 'Something Went Wrong. Please try again'
                statusMsgInput.style.backgroundColor = 'red'
            })
    })
}


const uploadProductImgBtn = document.getElementById('uploadProductImg')

if (uploadProductImgBtn) {
    uploadProductImgBtn.addEventListener('click', (e) => {
        e.preventDefault()
        const productPic = document.getElementById('productPic').files[0]
        statusMsgInput = document.getElementById('statusMsg2')
        const formData = new FormData()
        formData.append('productPic', productPic)

        const productId = localStorage.getItem('productId')

        fetch('/seller/product/picture/' + productId, {
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then((result) => {
                if (result) {
                    statusMsgInput.innerText = 'Product Succefully Uploaded'
                    statusMsgInput.style.backgroundColor = 'green'
                }
            })
            .catch((e) => {
                if (e) {
                    statusMsgInput.innerText = 'Something Went Wrong. Please try again'
                    statusMsgInput.style.backgroundColor = 'red'
                }
            });

        localStorage.removeItem("productId")
    })



}


const welcomeSellerHandler = document.getElementById('welcomeSeller')
if (welcomeSellerHandler) {
    fetch('/seller/profile')
        .then((response) => response.json())
        .then((data) => {
            welcomeSellerHandler.innerText = data.shopName
        })
}


const displayForm = (value) => {
    document.querySelector('#' + value).classList.remove('updateDisplay')
}


const updateOperation = (val) => {

    const updateIndex = document.querySelector('#' + val).value
    const allowedUpdates = ['productName', 'price', 'category', 'inStock', 'description']
    const clientUpdate = allowedUpdates.filter((allowedUpdate) => {
        return allowedUpdate === val
    })

    const updateValue = clientUpdate[0]

    option = {
        [updateValue]: updateIndex
    }

    statusMsgInput = document.getElementById('statusMsg')

    async function postData(url, data) {

        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return response.json();

    }

    const productId = localStorage.getItem('productId')

    postData('/product/' + productId, option)
        .then((data) => {
            console.log(data)
            statusMsgInput.innerText = 'Profile Updated Successfully'
            statusMsgInput.style.backgroundColor = 'green'
        }).catch((e) => {
            console.log(e)
            statusMsgInput.innerText = 'Something Went Wrong. Please try again'
            statusMsgInput.style.backgroundColor = 'red'
        })
}

const updateOperationColor = (val1, val2, val3) => {
    const updateIndex1 = document.querySelector('#' + val1).value
    const updateIndex2 = document.querySelector('#' + val2).value
    const updateIndex3 = document.querySelector('#' + val3).value
    statusMsgInput = document.getElementById('statusMsg')

    const updateIndex = [updateIndex1, updateIndex2, updateIndex3]

    async function postData(url, data) {

        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return response.json();

    }

    const productId = localStorage.getItem('productId')
    const option = {
        availableColor: updateIndex
    }

    postData('/product/' + productId, option)
        .then((data) => {
            console.log(data)
            statusMsgInput.innerText = 'Profile Updated Successfully'
            statusMsgInput.style.backgroundColor = 'green'
        }).catch((e) => {
            console.log(e)
            statusMsgInput.innerText = 'Something Went Wrong. Please try again'
            statusMsgInput.style.backgroundColor = 'red'
        })


}


const updateOperationSize = (val1, val2, val3) => {
    const updateIndex1 = document.querySelector('#' + val1).value
    const updateIndex2 = document.querySelector('#' + val2).value
    const updateIndex3 = document.querySelector('#' + val3).value
    statusMsgInput = document.getElementById('statusMsg')

    const updateIndex = [updateIndex1, updateIndex2, updateIndex3]

    async function postData(url, data) {

        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return response.json();

    }

    const productId = localStorage.getItem('productId')
    const option = {
        availableSize: updateIndex
    }

    postData('/product/' + productId, option)
        .then((data) => {
            console.log(data)
            statusMsgInput.innerText = 'Profile Updated Successfully'
            statusMsgInput.style.backgroundColor = 'green'
        }).catch((e) => {
            console.log(e)
            statusMsgInput.innerText = 'Something Went Wrong. Please try again'
            statusMsgInput.style.backgroundColor = 'red'
        })


}

const logoutBtn = document.getElementById('logout')

if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault()
        async function postData(url) {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response.json()
        }

        postData('/seller/logout')
            .then((data) => {
                console.log(data)
                window.location.replace("http://localhost:3000")
            }).catch((e) => {
                console.log(e)
            })

    })
}

const logoutAllBtn = document.getElementById('logoutAll')

if (logoutAllBtn) {
    logoutAllBtn.addEventListener('click', (e) => {
        e.preventDefault()
        async function postData(url) {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response.json()
        }

        postData('/seller/logoutAll')
            .then((data) => {
                console.log(data)
                window.location.replace("http://localhost:3000")
            }).catch((e) => {
                console.log(e)
            })

    })
}

const closeActBtn = document.getElementById('closeAct')

if (closeActBtn) {
    closeActBtn.addEventListener('click', (e) => {
        e.preventDefault()
        async function postData(url) {

            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response.json()
        }

        postData('/seller/profile')
            .then((data) => {
                console.log(data)
                window.location.replace("http://localhost:3000")
            }).catch((e) => {
                console.log(e)
            })
    })
}

const goToCategory = (category) => {
    sessionStorage.setItem('category', category)
}

const categoryDivHandler = document.getElementById('categoryDiv')

if (categoryDivHandler) {
    const categorySign = document.getElementById('categorySign')
    categorySign.innerText = sessionStorage.getItem('category')
    fetch('/products/api/' + sessionStorage.getItem('category'))
        .then((response) => response.json())
        .then((data) => {
            data.forEach((datun) => {
                categoryDivHandler.innerHTML += `
                <div class="col-lg-3 col-md-3 col-sm-6 col-6 myCol">
                    <div class="product-img-div">
                        <p> <button class="productBtn" onClick="productDetails('${datun._id}')"> <img src="/product/${datun._id}/productpic" alt="product"
                                    class="img-fluid product"> </button> </p>
                    </div>
                    <div class="prod-details">
                        <p class="avail"> Available Sizes</p>
                        <ul class="productList">
                            <li> ${datun.availableSize} </li>
                        </ul>
                    </div>
    
                    <div class="prod-details">
                        <p class="avail"> Available Colors </p>
                        <ul class="productList">
                            <li>
                            ${datun.availableColor}
                            </li>
                        </ul>
                    </div>
    
                    <p class="price"> <span>#<span> ${datun.price} </p>
                </div>
                `
            })

        })
}

const productDetails = (productId) => {
    sessionStorage.setItem('productId', productId)
    sessionStorage.setItem('prq_' + productId, 1)
    window.location.href = '/product_details'
}

const productInfoHandler = document.getElementById('productInfo')

if (productInfoHandler) {
    const productId = sessionStorage.getItem('productId')
    const quantity = sessionStorage.getItem('prq_' + productId)

    fetch('/product/api/' + productId)
        .then((response) => response.json())
        .then((data) => {
            const price = (data.price).toLocaleString()
            const colors = data.availableColor
            const sizes = data.availableSize

            productInfoHandler.innerHTML = `
            <div class="col-lg-7 col-md-7">
            <div class="trendingDiv">
                <a href="">
                    <p> <img src="/product/${data._id}/productpic"
                    id="productImg" alt="tranding product" class="img-fluid trnding"> </p>
                </a>
            </div>
        </div>

        <div class="col-lg-5 col-md-5">
            <h1 id="productName"> ${data.productName} </h1> <br>
            <h4> Decription </h4>
            <p id="description"> ${data.description} </p>

            <div>
                <button class="incBtn" type="button" onClick="decreaseQuantity('${data._id}')"><i class="fa-solid fa-square-minus quantityStyleInc"></i></button>
                 <span class="quantityStyle" id="quantity"> ${quantity} </span> 
                 <button class="incBtn" type="submit" onClick="increaseQuantity('${data.inStock}', '${data._id}' )"> <i class="fa-solid fa-square-plus quantityStyleInc"></i></button>
                <P id="price"> <span>#</span> ${(price)}</P>
            </div>

            <h4> Availble Colors </h4>
            <ul class="prodList"> 
                <li id="1" onclick="clickedColor('${colors[0]}', '${data._id}')"> ${colors[0]} </li>
                <li id="2" onclick="clickedColor('${colors[1]}', '${data._id}')"> ${colors[1]} </li>
                <li id="3" onclick="clickedColor('${colors[2]}', '${data._id}')"> ${colors[2]} </li>
            </ul>

            <h4> Availble Sizes </h4>
            <ul class="prodList"> 
                <li id="4" onclick="clickedSize('${sizes[0]}', '${data._id}')"> ${sizes[0]} </li>
                <li id="5" onclick="clickedSize('${sizes[1]}', '${data._id}')"> ${sizes[1]} </li>
                <li id="6" onclick="clickedSize('${sizes[2]}', '${data._id}')"> ${sizes[2]} </li>
            </ul>
            <button class=".check-out-btn-productInfo" type="button" onClick="addToCart('${data._id}', '${data.inStock}')">ADD TO CART</button>
        </div>
            `
        })
}

const clickedColor = (val, productId) => {
    const elementos = event.target
    sessionStorage.setItem('prc_' + productId, val)
    elementos.classList.add('clicked')
}

const clickedSize = (val, productId) => {
    const elementos = event.target
    sessionStorage.setItem('prs_' + productId, val)
    elementos.classList.add('clicked')
}


const increaseQuantity = (inStock, productId) => {

    var quantity = sessionStorage.getItem('prq_' + productId)

    if (quantity === inStock) {
        return alert('only ' + inStock + ' pieces of this product is available')
    }
    quantity++
    sessionStorage.setItem('prq_' + productId, quantity)

    location.reload()
}

const decreaseQuantity = (productId) => {

    var quantity = sessionStorage.getItem('prq_' + productId)

    if (quantity > 1) {
        quantity--
        sessionStorage.setItem('prq_' + productId, quantity)
    } else {
        return alert('you can not buy zero quantity of this product')
    }


    location.reload()
}


const addToCart = (productId, sellerStock) => {

    fetch('/product/api/' + productId)
        .then((response) => response.json())
        .then((productData) => {


            async function postData(url, data) {

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })

                return response.json();

            }

            const option = {
                productName: productData.productName,
                price: productData.price,
                color: sessionStorage.getItem('prc_' + productId),
                size: sessionStorage.getItem('prs_' + productId),
                quantity: parseInt(sessionStorage.getItem('prq_' + productId)),
                productId,
                sellerStock
            }

            postData('/orders', option)
                .then((data) => {
                    if (data.error) {
                        return window.location.href = '/sign_in_buyer'
                    }

                    window.location.href = '/cart'
                }).catch((e) => {
                    console.log(e)
                })



        })

}



const cartDivHandler = document.getElementById('cartDiv')

const nunberInCartHandler = document.getElementById('nunberInCart')



const updateCartIndex = () => {
    const totalQuantity = localStorage.getItem('numbOfCart')

    if (!totalQuantity) {
        nunberInCartHandler.innerText = ''
    } else { nunberInCartHandler.innerText = totalQuantity }
}

if (nunberInCartHandler) {
    updateCartIndex()
}


if (cartDivHandler) {
    fetch('/orders')
        .then((response) => response.json())
        .then((data) => {
            const cartQuantity = data.map((x) => x.quantity).reduce((x, y) => x + y, 0)
            localStorage.setItem('numbOfCart', cartQuantity)
            updateCartIndex()




            if (data.length === 0 || !data) {
                cartDivHandler.innerHTML = `
                <div class="noCartItem">
                 <h4> NO PRODUCT IN YOUR CART </h4>
                 <a href="/"> Start Shopping Now </a>
                 </div>
                `
            }

            data.forEach((datun) => {
                const totalPrice = datun.quantity * datun.price
                cartDivHandler.innerHTML += `
        <div class="eBg" id="eachCartRow">
        <div class="setHeight">
            <div class="row myRow">
                <div class="col-lg-4 col-md-4 col-sm-4 col-4">
                    <div class="productImgStyles">
                        <img src="/product/${datun.productId}/productpic" alt="product" width="100px" class="img-fluuid ">
                    </div>
                </div>
                <div class="col-md-4 col-lg-4 col-sm-4 col-4">
                    <h4>
                        ${datun.productName}
                    </h4>

                    <div class="sizeAndColor">
            <div class="sizeAndColor2">
                <h6> Colour;</h6>
                <p id="cartColor"> ${datun.color} </p>
            </div>
            <div class="sizeAndColor2">
                <h6> Size; </h6>
                <p id="cartSize"> ${datun.size}</p>
            </div>

        </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-4">
                    <h4> <span>#</span>${(totalPrice).toLocaleString()} </h4>
                    <button class="incBtn" type="submit"
                        onClick="decreaseCartQuantity('${datun._id}', ${datun.quantity})"><i
                            class="fa-solid fa-square-minus quantityStyleInc"></i></button> <span
                        class="quantityStyle" id="quantity"> ${datun.quantity} </span> <button
                        class="incBtn" type="submit"
                        onClick="increaseCartQuantity('${datun._id}', '${datun.quantity}', '${datun.sellerStock}')"> <i
                            class="fa-solid fa-square-plus quantityStyleInc"></i></button>
                    <br> <br>
                    <button class="btn btn-outline-danger"  onClick="deleteProductInCart('${datun._id}')"><i
                            class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
        </div>

    </div>
        `
            })

            const subtotal = data.map((x) => x.price * x.quantity).reduce((x, y) => x + y, 0)


            const summaryDivHandler = document.getElementById('summaryDivId')

            summaryDivHandler.innerHTML = `
            <p> Cart Summary</p>
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                    <h6 class="subTotalClass"> Sub Total</h6>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                    <h6 id="subTotal" class="subTotalClass"> # ${(subtotal).toLocaleString()} </h6>
                </div>
            </div> <br>
            <button class="check-out-btn" onclick="checkoutBtnFlutterwave('${subtotal}')"> Checkout with <img src="img/flutterwave.png" width="100px" class="img-fluid"></button> <br> <br>
            <button class="check-out-btn" onclick="checkoutBtnPaypal('${subtotal}')"> Checkout with <img src="img/paypal.png" width="100px" class="img-fluid"></button> 
            `
        })
}


const increaseCartQuantity = (productId, quantity, sellerStock) => {

    if (quantity === sellerStock) {
        return alert('seller only has ' + sellerStock + ' of this product in stock')
    }

    quantity++

    async function postData(url, data) {

        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return response.json();

    }

    const option = {
        quantity
    }

    postData('/order/' + productId, option)
        .then((data) => {
            console.log(data)
            location.reload()
        }).catch((e) => {
            console.log(e)
        })

}

const decreaseCartQuantity = (productId, quantity) => {

    if (quantity === 1) {
        return alert('you can not buy zero unit if this product')
    }

    quantity--

    async function postData(url, data) {

        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return response.json();

    }

    const option = {
        quantity
    }

    postData('/order/' + productId, option)
        .then((data) => {
            console.log(data)
            location.reload()
        }).catch((e) => {
            console.log(e)
        })

}

const deleteProductInCart = (productId) => {
    async function postData(url) {

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return response.json();

    }

    postData('/order/' + productId)
        .then((data) => {
            location.reload()
        }).catch((e) => {
            console.log(e)
        })
}

const logoutBtn2 = document.getElementById('logout2')

if (logoutBtn2) {
    logoutBtn2.addEventListener('click', (e) => {
        e.preventDefault()
        async function postData(url) {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response.json()
        }

        postData('/buyer/logout')
            .then((data) => {
                console.log(data)
                window.location.replace("/")
            }).catch((e) => {
                console.log(e)
            })

    })
}

const logoutAllBtn2 = document.getElementById('logoutAll2')

if (logoutAllBtn2) {
    logoutAllBtn2.addEventListener('click', (e) => {
        e.preventDefault()
        async function postData(url) {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response.json()
        }

        postData('/buyer/logoutAll')
            .then((data) => {
                console.log(data)
                window.location.replace("/")
            }).catch((e) => {
                console.log(e)
            })

    })
}

const closeActBtn2 = document.getElementById('closeAct2')

if (closeActBtn2) {
    closeActBtn2.addEventListener('click', (e) => {
        e.preventDefault()
        async function postData(url) {

            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response.json()
        }

        postData('/buyer/profile')
            .then((data) => {
                console.log(data)
                window.location.replace("/")
            }).catch((e) => {
                console.log(e)
            })
    })
}


const searchProduct = () => {
    const productSearch = document.getElementById('productSearch')
    const searchedProduct = productSearch.value
    sessionStorage.setItem('searchedProduct', searchedProduct)

    window.location.href = 'http://localhost:3000/search_result'
}

const resultDivHandler = document.getElementById('resultDiv')

if (resultDivHandler) {
    const searchResult = sessionStorage.getItem('searchedProduct')
    fetch('/products/api/search/' + searchResult)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            data.forEach((datun) => {
                resultDivHandler.innerHTML = `
                <div class="col-lg-3 col-md-3 col-sm-6 col-6 myCol">
                <div class="product-img-div">
                    <p> <button class="productBtn" onClick="productDetails('${datun._id}')"> <img src="/product/${datun._id}/productpic" alt="product"
                                class="img-fluid product"> </button> </p>
                </div>
                <div class="prod-details">
                    <p class="avail"> Available Sizes</p>
                    <ul class="productList">
                        <li> ${datun.availableSize} </li>
                    </ul>
                </div>

                <div class="prod-details">
                    <p class="avail"> Available Colors </p>
                    <ul class="productList">
                        <li>
                        ${datun.availableColor}
                        </li>
                    </ul>
                </div>

                <p class="price"> <span>#<span> ${datun.price} </p>
            </div>
                `
            })
        })
}



const checkoutBtnFlutterwave = (val) => {


    fetch('/buyer/profile')
        .then((response) => response.json())
        .then((data) => {

            async function postData(url, data) {

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })

                return response.json();

            }

            const option = {
                email: data.email,
                phoneNumber: data.phoneNumber,
                name: data.name,
                price: val
            }

            postData('/checkout', option)
                .then((data) => {
                    const url = data.data.link
                    window.location.href = url
                }).catch((e) => {
                    console.log(e)
                })

        })
}






