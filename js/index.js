let ulProductsList = document.getElementsByClassName("produtos")
let carrinho =[]

//função LISTAR PRODUTOS NA VITRINE
function listProducts(showcaseProducts){
    //limpando a lista(ul), para recarregar os produtos
    ulProductsList.innerHTML = ""
    
    //percorrendo o array de produtos disponibilizado em database.js (data)
    for(let i = 0; i < showcaseProducts.length; i++){
        //acessando cada produto e declarando-o numa variável
        let product = showcaseProducts[i]
        
        //criando card produto (return LI)
        let productCard = createProductCard(product)
        ulProductsList[0].appendChild(productCard)
    }
}
listProducts(data)

//função CRIAR CARD PRODUTOS
function createProductCard(product){
    //recuperando informações do produto da vitrine
    let imageProduct       = product.img
    let tagProduct         = product.tag
    let nameProduct        = product.nameItem
    let descriptionProduct = product.description
    let priceProduct       = product.value
    let btnId              = product.id
    
    //criando elementos para o card produto e adicionando classes a eles
    let tagLi          = document.createElement("li")
    tagLi.classList.add("item-vitrine")

    let tagFigure      = document.createElement("fig")
    tagFigure.classList.add("figure-vitrine")

    let tagImage       = document.createElement("img")
    tagImage.classList.add("img-vitrine")

    let tagSection     = document.createElement("section")
    tagSection.classList.add("texts-vitrine")

    let tagT           = document.createElement("p")
    tagT.classList.add("tag")

    let tagProductName = document.createElement("p")
    tagProductName.classList.add("product-name")

    let tagDescription = document.createElement("p")
    tagDescription.classList.add("description")

    let tagPrice       = document.createElement("p")
    tagPrice.classList.add("price")

    let tagBtn         = document.createElement("button")
    tagBtn.classList.add("btn-add-carrinho")

    //adicionar as informações nas tags criadas
    tagImage.src              = imageProduct
    tagImage.alt              = nameProduct
    tagT.innerHTML            = tagProduct
    tagProductName.innerHTML  = `<strong>${nameProduct}</strong>`
    tagDescription.innerText  = descriptionProduct
    tagPrice.innerHTML        = `<strong>R$ ${priceProduct}.00</strong>`
    tagBtn.innerHTML          = "Adicionar ao carrinho"
    tagBtn.id                 = btnId
    
    //interceptando evento
    tagBtn.addEventListener("click", onClickFunction)

    //montar o template card    
    tagFigure.appendChild(tagImage)
    tagSection.append(tagT, tagProductName, tagDescription, tagPrice, tagBtn)
    tagLi.append(tagFigure, tagSection)
  
    //retornar card criado
    return tagLi
}

//função que ADICIONA ITENS NO CARRINHO (EVENTO)
function onClickFunction(e){
    let tagUlCar = document.getElementById("lista-produtos-carrinho")
    let aux      = data.find((item)=>{
        return item.id == e.target.id
    })
    carrinho.push(aux)
    sumCar(carrinho)
    
    let LIaux = createProductCar(aux)

    tagUlCar.appendChild(LIaux)
  
}

//CRIAR CARD PRODUTOS NO CARRINHO
function createProductCar(productC){
   //criando tags do carrinho e adicionando classes
    let tagLiCar           = document.createElement("li")
    tagLiCar.classList.add("item-carrinho")
    
    let tagFigureCar       = document.createElement("figure")
    tagFigureCar.classList.add("figure-carrinho")
    
    let tagImageCar        = document.createElement("img")
    tagImageCar.classList.add("img-carrinho")
    
    let tagSectionCar      = document.createElement("section")
    tagSectionCar.classList.add("section-carrinho")

    let tagSectionNameCar  = document.createElement("p")
    tagSectionNameCar.classList.add("product-name-car")

    let tagSectionPriceCar = document.createElement("p")
    tagSectionPriceCar.classList.add("price-car")
    
    let tagBtnCar          = document.createElement("button")
    tagBtnCar.classList.add("btn-remove")
    
    //inserindo as informações do produto nas tags criadas
    tagImageCar.src              = productC.img
    tagImageCar.alt              = productC.nameItem
    tagSectionNameCar.innerHTML  = `<strong> ${productC.nameItem}</strong>`
    tagSectionPriceCar.innerHTML = `<strong>R$ ${productC.value}.00</strong>`
    
    tagBtnCar.innerText          = "Remover produto"
    tagBtnCar.id                 = productC.id
        
    //interceptando evento
    tagBtnCar.addEventListener("click", removeItemCar)
    
    //montando o template do produto no carrinho
    tagFigureCar.appendChild(tagImageCar)
    tagSectionCar.append(tagSectionNameCar, tagSectionPriceCar, tagBtnCar)
    tagLiCar.append(tagFigureCar, tagSectionCar)
      
    return tagLiCar
}


//função REMOVER PRODUTOS DO CARRINHO  
function removeItemCar(e){
    
    let aux1 = carrinho.filter((item) => {
        return item.id != e.target.id
    })
    carrinho = aux1
    listCarrinho(carrinho)
    sumCar(carrinho)
} 

//função LIMPAR CARRINHO e listar os produtos novamente
function listCarrinho(array){
    //limpando a lista(ul), para listar novamente os produtos
    let tagUlCar       = document.getElementById("lista-produtos-carrinho")
    tagUlCar.innerHTML = ""
    
    //percorrendo o array de produtos
    for(let i = 0; i < array.length; i++){
        //acessando cada produto
        let productC = array[i]
        
        //criando card produto (return LI)
        let productCarrinho = createProductCar(productC)
        tagUlCar.appendChild(productCarrinho)
    }
}

//retornando quantidade e valores dos produtos do carrinho
function sumCar(arr){
    let total = 0
    
    for(let i = 0; i < arr.length; i++){
        total += arr[i].value
    }

    let tagQuantity   = document.getElementById("quantidade-total")
    let tagTotalPrice = document.getElementById("preço-total")
    
    tagQuantity.innerText   = arr.length
    tagTotalPrice.innerHTML = `R$ ${total}.00`
}
