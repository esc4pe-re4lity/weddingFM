/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    $('div').filter('[class="AT-text"]').hover(
            function () {
                $(this).css("opacity", 1);
            },
            function () {
                $(this).css("opacity", 0);
            }
    );
    if($('.itemAddedToBasket-text').html() !== ""){
        $('#itemAddedToBasket').css('top', '-100px');
        $('#itemAddedToBasket').css('opacity', 1);
        $('#itemAddedToBasket').css('animation', 'bannerAnimation 5s');
        $('#itemAddedToBasket').css('-webkit-animation', 'bannerAnimation 5s');
    }
    $(document).click(function (e) {
        if (e.which === 1) {
            
        var quantityItem = parseInt($('.quantity-item').html()),
            imageItem = $('.detail-item-image').attr('src'),
            nameItem = $('.detail-item-name').html(),
            priceItem = parseFloat($('.detail-item-price').html()),
            totalItemsWishlist = parseInt($('.total-items-wishlist').html()),
            totalItemsBasket = parseInt($('.total-items-basket').html()),
            priceItemsBasket = parseFloat($('.price-items-basket').html()),
            url = "index.php?redirect=ATshop&action=";
            
            if ($(e.target).is(".AT-text") || $(e.target).is(".AT-text *")) {
                if ($(e.target).is(".AT-text")) {
                    var idItem = $(e.target).data('item-id');
                } else if ($(e.target).is(".FA-icon-eye")) {
                    var idItem = $(e.target).parent().data('item-id');
                } else {
                    var idItem = $(e.target).closest('.AT-text').data('item-id');
                }
                $('.AT-detail-item').removeClass('hidden');
                $.ajax({
                    url: url+"getItem&idItem=" + idItem,
                    type: 'GET',
                    datatype: 'php',
                    success: function (data) {
                        $('#detail-container').html(data);
                        clean(document.body);
                    }
                });
            } else if ($(e.target).is('button')) {
                if ($(e.target).is('#minus-quantity')) {
                    if (quantityItem <= 1) {
                    } else {
                        quantityItem--;
                        $('.quantity-item').html(quantityItem);
                    }
                } else if ($(e.target).is('#plus-quantity')) {
                    if (quantityItem >= 10) {
                    } else {
                        quantityItem++;
                        $('.quantity-item').html(quantityItem);
                    }
                }
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
                        'quantityItem': quantityItem,
                        'priceItem': priceItem
                    },
                    datatype: 'php',
                    success: function (data) {
                        var newtotalItems = parseInt(totalItemsBasket + quantityItem),
                            newPriceItemsBasket = parseFloat(priceItemsBasket + (priceItem * quantityItem));
                        $('.itemAddedToBasket-image').attr("src", imageItem);
                        $('.itemAddedToBasket-name').css('display','inline-block');
                        $('.itemAddedToBasket-name').html(nameItem);
                        $('.itemAddedToBasket-quantity').html('(' + quantityItem + ')');
                        $('.itemAddedToBasket-price').html(priceItem + '€');
                        $('.total-items-basket').html(newtotalItems);
                        $('.price-items-basket').html(newPriceItemsBasket);
                        $('.AT-detail-item').addClass('hidden');
                    }
                });
                $('#itemAddedToBasket').css('top', '-100px');
                $('#itemAddedToBasket').css('opacity', 1);
                $('#itemAddedToBasket').css('animation', 'bannerAnimation 5s');
                $('#itemAddedToBasket').css('-webkit-animation', 'bannerAnimation 5s');
            } else if ($(e.target).is('.addToWishlist') || $(e.target).is('.addToWishlist *')) {
                if ($(e.target).is(".addToWishlist")) {
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
                        if (data === "") {
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
                $('#itemAddedToWishlist').css('top', '-100px');
                $('#itemAddedToWishlist').css('opacity', 1);
                $('#itemAddedToWishlist').css('animation', 'bannerAnimation 5s');
                $('#itemAddedToWishlist').css('-webkit-animation', 'bannerAnimation 5s');
            } else if ($(e.target).is('.AT-detail-item')) {
                if (!$('.AT-detail-item').hasClass('hidden')) {
                    $('.AT-detail-item').addClass('hidden');
                }
            }
        }
    });
});