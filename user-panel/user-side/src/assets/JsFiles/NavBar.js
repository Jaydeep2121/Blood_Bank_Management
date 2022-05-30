$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
  // Navbar js 
  $(function () {
    var navbar = $(".header-inner");
    $(window).scroll(function () {
      if ($(window).scrollTop() <= 40) {
        navbar.removeClass("navbar-scroll");
      } else {
        navbar.addClass("navbar-scroll");
      }
    });
  });