

$(document).ready(function(){

  // fancybox
  $("a.gallerylink").fancybox();


});


$(".navlink").hover(
  function(e) {
    showNavImage(e.target.id);
  }, 
  function(e) {
    hideNavImage(e.target.id);
  }
);

function showNavImage(name) {
  sel = "#" + name + "-";
  $(sel + "gray").show();
  $(sel + "color").show();
  $("#nav_block-color").show();
}

function hideNavImage(name) {
  sel = "#" + name + "-";
  $(sel + "gray").hide();
  $(sel + "color").hide();
  $("#nav_block-color").hide();
}
