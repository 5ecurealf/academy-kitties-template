$(document).ready(function(){
    $('.tabcontents:first').show();
    $('.tab_navigation li:first').addClass('active');

    $('.tab_navigation li').click(function(event){
        index = $(this).index();
        $('.tab_navigation li').removeClass('active');
        $(this).addClass('active');
        $('.tabcontents').hide();
        $('.tabcontents').eq(index).show()
    });
});