if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    // alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal();
    var name2 = document.getElementById('pname').value;
    var email2 = document.getElementById('email').value;
    var contact2 = document.getElementById('contact').value;
    var address2 = document.getElementById('address').value;
    if(name2.trim()==''|| email2.trim()=='' || contact2.trim()=='' || address2.trim()==''){
      alert("Fill The Detail's");

      $(".hidden1").addClass("hidden");
      $("#ordernotplaced").fadeIn(8000);
      $("#ordernotplaced").removeClass("hidden");
      return false;
    }
    else{
    orderSummary();
    $(".hidden1").addClass("hidden");
    $(".orderplaced").fadeIn(8000);
    $(".orderplaced").removeClass("hidden");
    // $("#orderplaced").fadeIn(3000);
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {

    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('Rs', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = 'Rs' + total
}


// -------------------------------------form Validation-----------------------------------------
function validation1() {
  var email = document.getElementById('email');
  var emailVal = email.value;
  var pattern = /^[A-Za-z0-9.]{2,}@[a-z]{2,}[.]{1}[a-z]{2,3}[.]{0,1}[a-z]{0,3}$/;
  // test function test value.
  if(pattern.test(emailVal)){
    email.style.backgroundColor='green';
  }
  else{
    email.style.backgroundColor='red';
  }
  // body...
}

function validation12() {
  var con = document.getElementById('contact');
  var conVal = con.value;
  var pattern = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
  // test function test value.
  if(pattern.test(conVal)){
    con.style.backgroundColor='green';
  }
  else{
    con.style.backgroundColor='red';
  }
  // body...
}

function validation123() {
  var pname = document.getElementById('pname');
  var pnameVal = pname.value;
  var pattern = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
  // test function test value.
  if(pattern.test(pnameVal)){
    pname.style.backgroundColor='green';
  }
  else{
    pname.style.backgroundColor='red';
  }
  // body...
}

function validation1234() {
  var address = document.getElementById('address');
  var addressVal = address.value;
  var pattern = /^[#.0-9a-zA-Z\s,-]+$/;
  // test function test value.
  if(pattern.test(addressVal)){
    address.style.backgroundColor='green';
  }
  else{
    address.style.backgroundColor='red';
  }
  // body...
}

// ---------------------order Summary------------------------------------------
function orderSummary(){
  var name = document.getElementById('pname').value;
  var email = document.getElementById('email').value;
  var contact = document.getElementById('contact').value;
  var address = document.getElementById('address').value;

  console.log(name);
  console.log(email);
  console.log(contact);
  console.log(address)

  document.getElementById('name1').innerHTML=name;
  document.getElementById('email1').innerHTML=email;
  document.getElementById('contact1').innerHTML=contact;
  document.getElementById('address1').innerHTML=address;
}
// -----------------------------------------------orderTable-----------------------------------------------
function orderTable(){
  $(".hidden2").addClass("hidden");
  $("#orderplaced1").fadeIn(8000);
  $("#orderplaced1").removeClass("hidden");
}
