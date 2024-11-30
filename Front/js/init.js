const url = "http://localhost:3000/"
const CATEGORIES_URL = {url} + "cats/cat";
const PUBLISH_PRODUCT_URL = {url} + "sell/publish.json";
const PRODUCTS_URL = {url} + "cats_products/";
const PRODUCT_INFO_URL = {url} + "products/";
const PRODUCT_INFO_COMMENTS_URL = {url} + "products_comments/";
const CART_INFO_URL = {url} + "user_cart/";
const CART_BUY_URL = {url} + "cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}