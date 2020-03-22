/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function () {
    $('div').filter('[class="AT-text"]').hover(
        function(){
            $(this).css("opacity",1);
        },
        function(){
            $(this).css("opacity",0);
        }
    );
    $(document).click(function(e) { 
        if($(e.target).is(".AT-text") || $(e.target).is(".AT-text *")){
            if($(e.target).is(".AT-text")){
                var idInstagramPost = $(e.target).data('ig-id');
            } else {
                var idInstagramPost = $(e.target).closest('.AT-text').data('ig-id');
            }
            var url = "index.php?redirect=ATshop&action=getItem&idInstagramPost="+idInstagramPost;
            console.log(url);
            $.ajax({
                url: url,
                type: 'GET',
                datatype: 'php',            
                success: function(data){
                    $('#addItem').html(data);
                }
            });
        }
    });
});