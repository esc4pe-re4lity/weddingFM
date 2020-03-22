/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function () {
    $(document).click(function (e) {
        if (e.which === 1) {
            var idSession = $(e.target).closest('.basket-item').data('session-id'),
                imageItem = $('.basket-item[data-session-id="' + idSession + '"] .basket-item-image img').attr('src'),
                nameItem = $('.basket-item[data-session-id="' + idSession + '"] .basket-item-image h4').html(),
                quantityItem = parseInt($('.quantity-item-text[data-session-id="' + idSession + '"]').html()),
                itemPrice = parseFloat($('.item-price[data-session-id="' + idSession + '"]').html()),
                sumPrice = parseFloat($('.sum-price[data-session-id="' + idSession + '"]').html()),
                totalItemsWishlist = parseInt($('.total-items-wishlist').html()),
                totalItemsBasket = parseInt($('.total-items-basket').html()),
                priceItemsBasket = parseFloat($('.price-items-basket').html()),
                url = "index.php?redirect=ATshop&action=";
            if ($(e.target).is('.deleteBasketItem') || $(e.target).is('.deleteBasketItem *')) {
                $.ajax({
                    url: url+"deleteBasketItem",
                    type: 'POST',
                    data: {
                        'idSession': idSession,
                        'quantityItem': quantityItem,
                        'priceItem': itemPrice
                    },
                    datatype: 'php',
                    success: function () {
                        var newtotalItems = parseInt(totalItemsBasket - quantityItem),
                            newPriceItemsBasket = parseFloat(priceItemsBasket - (itemPrice * quantityItem));
                        $('.total-items-basket').html(newtotalItems);
                        $('.price-items-basket').html(newPriceItemsBasket);
                        $('.itemAddedToBasket-image').attr("src", "");
                        $('.itemAddedToBasket-name').css('display','none');
                        $('.itemAddedToBasket-name').html("");
                        $('.itemAddedToBasket-quantity').html("");
                        $('.itemAddedToBasket-price').css('display','none');
                        $('.itemAddedToBasket-price').html("");
                        $('.itemAddedToBasket-text').html('The item(s) has been removed from your basket !');
                        $('.basket-item[data-session-id="' + idSession + '"]').remove();
                    }
                });
                $('#itemAddedToBasket').css('top', '-100px');
                $('#itemAddedToBasket').css('opacity', 1);
                $('#itemAddedToBasket').css('animation', 'bannerAnimation 5s');
                $('#itemAddedToBasket').css('-webkit-animation', 'bannerAnimation 5s');
            } else if ($(e.target).is('.updateBasketItem') || $(e.target).is('.updateBasketItem *')) {
                $('.basket-item-buttons[data-session-id="' + idSession + '"]').css('display', 'none');
                $('.basket-item-save[data-session-id="' + idSession + '"]').css('display', 'flex');
            } else if($(e.target).is('.addToWishlist') || $(e.target).is('.addToWishlist *')){
                if($(e.target).is('.addToWishlist')){
                    var idItem = $(e.target).data('item-id');
                } else {
                    var idItem = $(e.target).closest('.addToWishlist').data('item-id');
                }
                $.ajax({
                    url: url+"addToWishlist",
                    type: 'POST',
                    data: {
                        'idItem': idItem
                    },
                    datatype: 'php',
                    success: function (data) {
                        if(data === ""){
                            var newtotalItems = parseInt(totalItemsWishlist + 1);
                            $('.itemAddedToWishlist-image').attr("src", imageItem);
                            $('.itemAddedToWishlist-name').css('display','inline-block');
                            $('.itemAddedToWishlist-name').html(nameItem);
                            $('.itemAddedToWishlist-text').html('has been added to your wishlist !');
                            $('.total-items-wishlist').html(newtotalItems);
                            $('.AT-detail-item').addClass('hidden');
                        } else {
                            $('.itemAddedToWishlist-image').attr("src", "");
                            $('.itemAddedToWishlist-name').css('display','none');
                            $('.itemAddedToWishlist-name').html("");
                            $('.itemAddedToWishlist-text').html(data);
                            $('.AT-detail-item').addClass('hidden');
                        }
                    }
                });
                $('#itemAddedToWishlist').toggle();
                /*
                $('#itemAddedToWishlist').css('animation', 'none');
                $('#itemAddedToWishlist').css('-webkit-animation', 'none');
                $('#itemAddedToWishlist').css('top', '-100px');
                $('#itemAddedToWishlist').css('opacity', 1);
                $('#itemAddedToWishlist').css('animation', 'bannerAnimation 3s ease-in-out');
                $('#itemAddedToWishlist').css('-webkit-animation', 'bannerAnimation 3s ease-in-out');*/
            } else if ($(e.target).is('button')) {
                var quantity = parseInt($(e.target).siblings('.quantity-item').html());
                if ($(e.target).is('#minus-quantity')) {
                    if (quantity <= 1) {
                    } else {
                        quantity--;
                        $(e.target).siblings('.quantity-item').html(quantity);
                        $('.quantity-item-text[data-session-id="' + idSession + '"]').html(quantity);
                        $('.sum-price[data-session-id="' + idSession + '"]').html(parseFloat(quantity * itemPrice));
                    }
                } else if ($(e.target).is('#plus-quantity')) {
                    if (quantity >= 10) {
                    } else {
                        quantity++;
                        $(e.target).siblings('.quantity-item').html(quantity);
                        $('.quantity-item-text[data-session-id="' + idSession + '"]').html(quantity);
                        $('.sum-price[data-session-id="' + idSession + '"]').html(parseFloat(quantity * itemPrice));
                    }
                } else if ($(e.target).is('.saveBasketItem')) {
                    $.ajax({
                        url: url+"saveBasketItem",
                        type: 'POST',
                        data: {
                            'idSession': idSession,
                            'quantityItem': quantityItem,
                            'priceItem': itemPrice
                        },
                        datatype: 'php',
                        success: function (data) {
                            $('.basket-item-buttons[data-session-id="' + idSession + '"]').css('display', 'flex');
                            $('.basket-item-save[data-session-id="' + idSession + '"]').css('display', 'none');
                            $('.total-items-basket').html(data.totalItem);
                            $('.price-items-basket').html(data.totalPrice);
                            $('.itemAddedToBasket-image').attr("src", "");
                            $('.itemAddedToBasket-name').css('display','none');
                            $('.itemAddedToBasket-name').html("");
                            $('.itemAddedToBasket-quantity').html("");
                            $('.itemAddedToBasket-price').html("");
                            $('.itemAddedToBasket-text').html('Your basket has been updated !');
                        }
                    });
                $('#itemAddedToBasket').css('animation', 'none');
                $('#itemAddedToBasket').css('-webkit-animation', 'none');
                $('#itemAddedToBasket').css('top', '-100px');
                $('#itemAddedToBasket').css('opacity', 1);
                $('#itemAddedToBasket').css('animation', 'bannerAnimation 5s');
                $('#itemAddedToBasket').css('-webkit-animation', 'bannerAnimation 5s');
                }
            }
        }
    });
});




/*

setInterval("getCommande()", 1000);
function getCommande() { 
    $.ajax({ 
        url: "URL_ICI",
        dataType: 'html',
        data: "",
        type: 'GET',
        success: function (data) {
            $('.commande').html(data);
        }
    });
}
getCommande();

 */