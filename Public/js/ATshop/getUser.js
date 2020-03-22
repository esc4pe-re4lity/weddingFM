/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function () {
    var regexName = /^[a-zA-Z-]+$/,
        regexEmail = /^[a-z0-9._-]+@[a-z0-9._-]{2,}.[a-z]{2,4}$/,
        regexLowPassword = /^(?=.*[a-z])|(?=.*[A-Z])|(?=.*[0-9])|(?=.*[-_*\#!$?+@])/,
        regexMediumPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_*\#!$?+@])/,
        regexHighPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9].{2,})(?=.*[-_*\/\#!$?+@].{2,}).{8,}/;
        
    var verifyFirstName = function(){
        if(!regexName.test($('#firstName').val())){
            $('#info-details-form').text("Your name can only contain letters and dashes");
            $('#firstName').removeClass('correct').addClass('incorrect');
            return false;
        }else{
            $('#info-details-form').text("");
            $('#firstName').removeClass('incorrect').addClass('correct');
            return true;
        }
    };
    var verifyLastName = function(){
        if(!regexName.test($('#lastName').val())){
            $('#info-details-form').text("Your name can only contain letters and dashes");
            $('#lastName').removeClass('correct').addClass('incorrect');
            return false;
        }else{
            $('#info-details-form').text("");
            $('#lastName').removeClass('incorrect').addClass('correct');
            return true;
        }
    };
    var verifyEmail = function(){
        if(!regexEmail.test($('#email').val())){
            $('#info-details-form').text("This email address is not valid. Make sure it's something like finn@landofooo.com");
            $('#email').removeClass('correct').addClass('incorrect');
            return false;
        }else{
            $('#info-details-form').text("");
            $('#email').removeClass('incorrect').addClass('correct');
            return true;
        }
    };
    var verifyPassword = function(){
        if($('#newPassword').val().length >= 6){
            if(regexHighPassword.test($('#newPassword').val())){
                $('#info-password-form').text("That's it! The answer was so simple, I was too smart to see it!");
                $('#newPassword').removeClass('correct').addClass('incorrect');
                return true;
            }else if(regexMediumPassword.test($('#newPassword').val())) {
                $('#info-password-form').text("I never said you had to be perfect!");
                $('#newPassword').removeClass('incorrect').addClass('correct');
                return true;
            } else if(regexLowPassword.test($('#newPassword').val())) {
                $('#info-password-form').text("Uhhh, okay, I guess that will be alright");
                $('#newPassword').removeClass('incorrect').addClass('correct');
                return true;
            }
        } else {
            $('#info-password-form').text("No, this is wrong. Your password need to have at least 6 characters");
            $('#newPassword').removeClass('incorrect').addClass('correct');
            return false;
        }
    };
    function verifyDetailsForm(){
        var firstNameOK = verifyFirstName(),
            lastNameOK = verifyLastName(),
            emailOK = verifyEmail();
        if(firstNameOK && lastNameOK && emailOK){
            return true;
        }else{
            return false;
        }
    }
    function verifyPasswordForm(){
        var passwordOK = verifyPassword();
        if(passwordOK){
            return true;
        }else{
            return false;
        }
    }
    function detailsFormNOK(){
        $('#info-details-form').text("One or more fields have been incorrectly filed");
    }
    function passwordFormNOK(){
        $('#info-password-form').text("Your password must be 6 character long at least");
    }
    $('#firstName').change(verifyFirstName);
    $('#lastName').change(verifyLastName);
    $('#email').change(verifyEmail);
    $('#newPassword').keyup(verifyPassword);
    $('#updateUserForm').submit(function(e){
        var formOK = verifyDetailsForm();
        if(formOK === false){
            e.preventDefault();
            detailsFormNOK();
        }
    });
    $('#updatePasswordForm').submit(function(e){
        var formOK = verifyPasswordForm();
        if(formOK === false){
            e.preventDefault();
            passwordFormNOK();
        }
    });
    $(document).click(function (e) {
        if (e.which === 1) {
            
            var idAddress = $(e.target).closest('.user-address-text').attr('data-address-id'),
                nameAddress = $('.user-address-text[data-address-id="' + idAddress + '"] .shipping-address-nameAddress').text(),
                fullName = $('.user-address-text[data-address-id="' + idAddress + '"] .shipping-address-fullName').text(),
                line1 = $('.user-address-text[data-address-id="' + idAddress + '"] .shipping-address-line1').text(),
                line2 = $('.user-address-text[data-address-id="' + idAddress + '"] .shipping-address-line2').text(),
                postcode = $('.user-address-text[data-address-id="' + idAddress + '"] .shipping-address-postcode').text(),
                city = $('.user-address-text[data-address-id="' + idAddress + '"] .shipping-address-city').text(),
                country = $('.user-address-text[data-address-id="' + idAddress + '"] .shipping-address-country').text(),
                url = "index.php?redirect=ATshop&action=";
                
            if ($(e.target).is('#addAddressButton')){
                $('#addAddressButton').css('display','none');
                $(e.target).siblings('.button-hide-form').css('display','inline-block');
                $('.user-address-content').css('display', 'none');
                if($('#addAddressForm').length === 1){
                    $('#addAddressForm').css('display', 'block');
                } else {
                    $('#updateAddressForm').css('display', 'block');
                    $('#updateAddressForm').attr('id', 'addAddressForm');
                    $('#addAddressForm').attr('action', 'index.php?redirect=ATshop&action=addAddress');
                    $('#nameAddress').val('');
                    $('#fullName').val('');
                    $('#line1').val('');
                    $('#line2').val('');
                    $('#postcode').val('');
                    $('#city').val('');
                    $('#country').val('');
                }
            } else if ($(e.target).is('#updateUserButton')) {
                $('#updateUserButton').css('display','none');
                $(e.target).siblings('.button-hide-form').css('display','inline-block');
                $('.user-details-text').css('display', 'none');
                $('.user-details-form').css('display', 'flex');
            } else if ($(e.target).is('#updatePasswordButton')) {
                $('#updatePasswordButton').css('display','none');
                $(e.target).siblings('.button-hide-form').css('display','inline-block');
                $('.user-password-text').css('display', 'none');
                $('.user-password-form').css('display', 'flex');
            } else if ($(e.target).is('#closeAddressForm') || $(e.target).is('#closeAddressForm *')) {
                if($(e.target).is('.button-hide-form')){
                    $(e.target).css('display','none');
                } else {
                    $(e.target).closest('.button-hide-form').css('display','none');
                }
                $('#addAddressForm').css('display', 'none');
                $('#addAddressButton').css('display', 'block');
                $('.user-address-content').css('display', 'flex');
            } else if ($(e.target).is('#closeUserForm') || $(e.target).is('#closeUserForm *')) {
                if($(e.target).is('.button-hide-form')){
                    $(e.target).css('display','none');
                } else {
                    $(e.target).closest('.button-hide-form').css('display','none');
                }
                $('.user-details-form').css('display', 'none');
                $('#updateUserButton').css('display', 'block');
                $('.user-details-text').css('display', 'block');
            } else if ($(e.target).is('#closePasswordForm') || $(e.target).is('#closePasswordForm *')) {
                if($(e.target).is('.button-hide-form')){
                    $(e.target).css('display','none');
                } else {
                    $(e.target).closest('.button-hide-form').css('display','none');
                }
                $('.user-password-form').css('display', 'none');
                $('#updatePasswordButton').css('display', 'block');
                $('.user-password-text').css('display', 'flex');
            } else if ($(e.target).is('.deleteAddress') || $(e.target).is('.deleteAddress *')) {
                $.ajax({
                    url: url+"deleteAddress",
                    type: 'POST',
                    data: {
                        'idAddress': idAddress
                    },
                    datatype: 'php',
                    success: function () {
                        $('.user-address-text[data-address-id="' + idAddress + '"]').remove();
                    }
                });
                $('#itemAddedToBasket').css('top', '-100px');
                $('#itemAddedToBasket').css('opacity', 1);
                $('#itemAddedToBasket').css('animation', 'bannerAnimation 5s');
                $('#itemAddedToBasket').css('-webkit-animation', 'bannerAnimation 5s');
            } else if ($(e.target).is('.updateAddress') || $(e.target).is('.updateAddress *')) {
                $('#addAddressForm').css('display', 'block');
                $('#addAddressForm').attr('id', 'updateAddressForm');
                $('#updateAddressForm').attr('action', 'index.php?redirect=ATshop&action=updateAddress&idAddress='+idAddress);
                $('.user-address-content').css('display', 'none');
                $('#nameAddress').val(nameAddress);
                $('#fullName').val(fullName);
                $('#line1').val(line1);
                $('#line2').val(line2);
                $('#postcode').val(postcode);
                $('#city').val(city);
                $('#country').val(country);
            }
        }
    });
});