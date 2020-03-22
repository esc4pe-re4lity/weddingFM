/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function(){
    var regexName = /^[a-zA-Z-]+$/,
        regexEmail = /^[a-z0-9._-]+@[a-z0-9._-]{2,}.[a-z]{2,4}$/,
        regexLowPassword = /^(?=.*[a-z])|(?=.*[A-Z])|(?=.*[0-9])|(?=.*[-_*\#!$?+@])/,
        regexMediumPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_*\#!$?+@])/,
        regexHighPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9].{2,})(?=.*[-_*\/\#!$?+@].{2,}).{8,}/;
        
    var verifyFirstName = function(){
        if(!regexName.test($('#firstName').val())){
            $('#info-form').text("Your name can only contain letters and dashes");
            $('#firstName').removeClass('correct').addClass('incorrect');
            return false;
        }else{
            $('#info-form').text("");
            $('#firstName').removeClass('incorrect').addClass('correct');
            return true;
        }
    };
    var verifyLastName = function(){
        if(!regexName.test($('#lastName').val())){
            $('#info-form').text("Your name can only contain letters and dashes");
            $('#lastName').removeClass('correct').addClass('incorrect');
            return false;
        }else{
            $('#info-form').text("");
            $('#lastName').removeClass('incorrect').addClass('correct');
            return true;
        }
    };
    var verifyEmail = function(){
        if(!regexEmail.test($('#email').val())){
            $('#info-form').text("This email address is not valid. Make sure it's something like finn@landofooo.com");
            $('#email').removeClass('correct').addClass('incorrect');
            return false;
        }else{
            $.ajax({
                url: "index.php?redirect=ATshop&action=isEmailValid",
                type: 'POST',
                data: {
                    'email': $('#email').val()
                },
                datatype: 'php',
                success: function (data) {
                    console.log(data);
                    if(data === 'false'){
                        $('#info-form').text("This email has already an account linked. Have you forgot your password ?");
                        $('#email').removeClass('correct').addClass('incorrect');
                    }
                }
            });
            if($('#info-form').text()==="This email has already an account linked. Have you forgot your password ?"){
                return false;
            } else {
                $('#info-form').text("");
                $('#email').removeClass('incorrect').addClass('correct');
                return true;
            }
        }
    };
    var verifyPassword = function(){
        if($('#password').val().length >= 6){
            if(regexHighPassword.test($('#password').val())){
                $('#info-form').text("That's it! The answer was so simple, I was too smart to see it!");
                $('#password').removeClass('correct').addClass('incorrect');
                return true;
            }else if(regexMediumPassword.test($('#password').val())) {
                $('#info-form').text("I never said you had to be perfect!");
                $('#password').removeClass('incorrect').addClass('correct');
                return true;
            } else if(regexLowPassword.test($('#password').val())) {
                $('#info-form').text("Uhhh, okay, I guess that will be alright");
                $('#password').removeClass('incorrect').addClass('correct');
                return true;
            }
        } else {
            $('#info-form').text("No, this is wrong. Your password need to have at least 6 characters");
            $('#password').removeClass('correct').addClass('incorrect');
            return false;
        }
    };
    var verifyConfirmPassword = function(){
        if($('#password').val() !== $('#confirmPassword').val()){
            $('#info-form').text("The two passwords need to be the same. Don't worry. Just try to relax.");
            $('#confirmPassword').removeClass('correct').addClass('incorrect');
            return false;
        }else{
            $('#info-form').text("");
            $('#confirmPassword').removeClass('incorrect').addClass('correct');
            return true;
        }
    }
    function verifyForm(){
        var firstNameOK = verifyFirstName(),
            lastNameOK = verifyLastName(),
            emailOK = verifyEmail(),
            passwordOK = verifyPassword(),
            confirmPasswordOK = verifyConfirmPassword();
        if(firstNameOK && lastNameOK && emailOK && passwordOK && confirmPasswordOK){
            return true;
        }else{
            return false;
        }
    }
    function formNOK(){
        $('#info-form').text("One or more fields have been incorrectly filed");
    }
    $('#firstName').change(verifyFirstName);
    $('#lastName').change(verifyLastName);
    $('#email').change(verifyEmail);
    $('#password').keyup(verifyPassword);
    $('#confirmPassword').change(verifyConfirmPassword);
    $('form').submit(function(e){
        var formOK = verifyForm();
        if(formOK === false){
            e.preventDefault();
            formNOK();
        }
    });
});