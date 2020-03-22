/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function(){
    $('#shippingAddress').change(function(){
        var idShippingAddress = $('#shippingAddress').val(),
            url = "index.php?redirect=ATshop&action=";
        $.ajax({
            url: url+"getAddress",
            type: 'POST',
            data: {
                'idAddress': idShippingAddress
            },
            datatype: 'php',
            success: function (data) {
                $('.shipping-address-container').css('display', 'flex');
                $('.shipping-address-nameAddress').html(data.nameAddress);
                $('.shipping-address-fullName').html(data.fullName+'<br>');
                $('.shipping-address-line1').html(data.line1+'<br>');
                if(data.line2 !== ""){
                    $('.shipping-address-line2').html(data.line2+'<br>');
                }
                $('.shipping-address-postcode').html(data.postcode);
                $('.shipping-address-city').html(data.city+'<br>');
                $('.shipping-address-country').html(data.country);
            }
        });
    });
    $('#billingAddress').change(function(){
        var idBillingAddress = $('#billingAddress').val(),
            url = "index.php?redirect=ATshop&action=";
        $.ajax({
            url: url+"getAddress",
            type: 'POST',
            data: {
                'idAddress': idBillingAddress
            },
            datatype: 'php',
            success: function (data) {
                $('.billing-address-container').css('display', 'flex');
                $('.billing-address-nameAddress').html(data.nameAddress);
                $('.billing-address-fullName').html(data.fullName+'<br>');
                $('.billing-address-line1').html(data.line1+'<br>');
                if(data.line2 !== ""){
                    $('.billing-address-line2').html(data.line2+'<br>');
                }
                $('.billing-address-postcode').html(data.postcode);
                $('.billing-address-city').html(data.city+'<br>');
                $('.billing-address-country').html(data.country);
            }
        });
    });
    $('#shippingMethod').change(function(){
        var idShippingMethod = $('#shippingMethod').val(),
            subtotalPrice = parseFloat($('.subtotal-price').text()),
            shippingPrice = parseFloat($('.shipping-price').text());
        switch(idShippingMethod){
            case '1':
                if(subtotalPrice>=50){
                    $('.shipping-price').html('0');
                }else{
                    $('.shipping-price').html('2');
                    $('.total-price').html(subtotalPrice + parseFloat($('.shipping-price').text()));
                }
                break;
            case '2':
                $('.shipping-price').html('7');
                $('.total-price').html(subtotalPrice + parseFloat($('.shipping-price').text()));
                break;
            case '3':
                $('.shipping-price').html('12');
                $('.total-price').html(subtotalPrice + parseFloat($('.shipping-price').text()));
                break;
        }
    });
    
    $(document).click(function (e) {
        if (e.which === 1) {
            var shippingForm = $('#shipping-options'),
                idShippingAddress = $('#shippingAddress').val();
                url = "index.php?redirect=ATshop&action=";
        }
    });
});