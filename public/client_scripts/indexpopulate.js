const shirtCategoryHandler = document.getElementById('shirtCategory')

fetch('/products/api/shirts')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((datun) => {
        shirtCategoryHandler.innerHTML += `
        <div class="col-lg-3 col-md-3 col-sm-6 col-6 myCol">
                        <div class="product-img-div">
                            <p> <button class="productBtn" onClick="productDetails('${datun._id}')"> <img src="http://localhost:3000/product/${datun._id}/productpic" alt="product"
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


  const shoesCategoryHandler = document.getElementById('shoesCategory')

fetch('/products/api/footwears')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((datun) => {
        shoesCategoryHandler.innerHTML += `
        <div class="col-lg-3 col-md-3 col-sm-6 col-6 myCol">
                        <div class="product-img-div">
                            <p> <button class="productBtn" onClick="productDetails('${datun._id}')"> <img src="http://localhost:3000/product/${datun._id}/productpic" alt="product"
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

  const bagCategoryHandler = document.getElementById('bagCategory')

fetch('/products/api/bags')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((datun) => {
        bagCategoryHandler.innerHTML += `
        <div class="col-lg-3 col-md-3 col-sm-6 col-6 myCol">
                        <div class="product-img-div">
                            <p> <button class="productBtn" onClick="productDetails('${datun._id}')"> <img src="http://localhost:3000/product/${datun._id}/productpic" alt="product"
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

  const trouserCategoryHandler = document.getElementById('trouserCategory')

  fetch('/products/api/trousers')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((datun) => {
        trouserCategoryHandler.innerHTML += `
          <div class="col-lg-3 col-md-3 col-sm-6 col-6 myCol">
                          <div class="product-img-div" onClick="productDetails('${datun._id}')">
                              <p> <button class="productBtn"> <img src="http://localhost:3000/product/${datun._id}/productpic" alt="product"
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


    const capCategoryHandler = document.getElementById('capCategory')

  fetch('/products/api/caps')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((datun) => {
        capCategoryHandler.innerHTML += `
          <div class="col-lg-3 col-md-3 col-sm-6 col-6 myCol">
                          <div class="product-img-div">
                              <p> <button class="productBtn" onClick="productDetails('${datun._id}')"> <img src="http://localhost:3000/product/${datun._id}/productpic" alt="product"
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
  