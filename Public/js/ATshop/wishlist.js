/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    $(document).click(function (e) {
        if (e.which === 1) {
            
            var idSession = $(e.target).closest('.wishlist-item').data('session-id'),
                imageItem = $('.wishlist-item[data-session-id="' + idSession + '"] .wishlist-item-image img').attr('src'),
                nameItem = $('.wishlist-item[data-session-id="' + idSession + '"] .wishlist-item-image h4').html(),
                itemPrice = parseFloat($('.item-price[data-session-id="' + idSession + '"]').html()),
                totalItemsWishlist = parseInt($('.total-items-wishlist').html()),
                totalItemsBasket = parseInt($('.total-items-basket').html()),
                priceItemsBasket = parseFloat($('.price-items-basket').html()),
                url = "index.php?redirect=ATshop&action=";
            
            if ($(e.target).is('.deleteWishlistItem') || $(e.target).is('.deleteWishlistItem *')) {
                $.ajax({
                    url: url+"deleteWishlistItem",
                    type: 'POST',
                    data: {
                        'idSession': idSession
                    },
                    datatype: 'php',
                    success: function (data) {
                        var newtotalItems = parseInt(totalItemsWishlist - 1);
                        $('.total-items-wishlist').html(newtotalItems);
                        $('.itemAddedToWishlist-image').attr("src", "");
                        $('.itemAddedToWishlist-name').css('display','none');
                        $('.itemAddedToWishlist-name').html("");
                        $('.itemAddedToWishlist-text').html('The item has been removed from your wishlist !');
                        $('.wishlist-item[data-session-id="' + idSession + '"]').remove();
                        console.log(data);
                    }
                });
                $('#itemAddedToBasket').css('top', '-100px');
                $('#itemAddedToBasket').css('opacity', 1);
                $('#itemAddedToBasket').css('animation', 'bannerAnimation 5s');
                $('#itemAddedToBasket').css('-webkit-animation', 'bannerAnimation 5s');
            } else if ($(e.target).is('.addToBasket') || $(e.target).is('.addToBasket *')) {
                if ($(e.target).is(".addToBasket")) {
                    var idItem = $(e.target).data('item-id');
                } else {
                    var idItem = $(e.target).closest('.addToBasket').data('item-id');
                }
                $.ajax({
                    url: url+"addToBasket",
                    type: 'POST',
                    data: {
                        'idItem': idItem,
                        'quantityItem': 1,
                        'priceItem': itemPrice
                    },
                    datatype: 'php',
                    success: function () {
                        var newtotalItems = parseInt(totalItemsBasket + 1),
                            newPriceItemsBasket = parseFloat(priceItemsBasket + itemPrice);
                        $('.itemAddedToBasket-image').attr("src", imageItem);
                        $('.itemAddedToBasket-name').css('display','inline-block');
                        $('.itemAddedToBasket-name').html(nameItem);
                        $('.itemAddedToBasket-quantity').html('(' + 1 + ')');
                        $('.itemAddedToBasket-price').html(itemPrice + '€');
                        $('.total-items-basket').html(newtotalItems);
                        $('.price-items-basket').html(newPriceItemsBasket);
                        $('.AT-detail-item').addClass('hidden');
                    }
                });
                $('#itemAddedToBasket').css('top', '-100px');
                $('#itemAddedToBasket').css('opacity', 1);
                $('#itemAddedToBasket').css('animation', 'bannerAnimation 5s');
                $('#itemAddedToBasket').css('-webkit-animation', 'bannerAnimation 5s');
            }
        }
    });
});