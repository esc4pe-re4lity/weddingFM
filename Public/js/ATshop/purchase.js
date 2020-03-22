/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function(){
    var idShippingAddress = $('.shipping-address-container').data('shipping-address-id'),
        idBillingAddress = $('.billing-address-container').data('billing-address-id'),
        url = "index.php?redirect=ATshop&action=";
    $.ajax({
        url: url+"getAddress",
        type: 'POST',
        data: {
            'idAddress': idShippingAddress
        },
        datatype: 'php',
        success: function (data) {
            $('.shipping-address-nameAddress').html(data.nameAddress);
            $('.shipping-address-fullName').html(data.fullName+'<br>');
            $('.shipping-address-line1').html(data.line1+'<br>');
            if(data.line2 !== ""){
                $('.shipping-address-line2').html(data.line2+'<br>');
            }
            $('.shipping-address-postcode').html(data.postcode);
            $('.shipping-address-city').html(data.city+'<br>');
            $('.shipping-address-country').html(data.country);
            $('.shipping-address-container').css('display', 'flex');
        }
    });
    $.ajax({
        url: url+"getAddress",
        type: 'POST',
        data: {
            'idAddress': idBillingAddress
        },
        datatype: 'php',
        success: function (data) {
            $('.billing-address-nameAddress').html(data.nameAddress);
            $('.billing-address-fullName').html(data.fullName+'<br>');
            $('.billing-address-line1').html(data.line1+'<br>');
            if(data.line2 !== ""){
                $('.billing-address-line2').html(data.line2+'<br>');
            }
            $('.billing-address-postcode').html(data.postcode);
            $('.billing-address-city').html(data.city+'<br>');
            $('.billing-address-country').html(data.country);
            $('.billing-address-container').css('display', 'flex');
        }
    });
});