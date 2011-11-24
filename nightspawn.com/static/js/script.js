

$(document).ready(function(){

  // show current gray navimage
  showCurrentNavGray();

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

$("nav").mouseleave(
  function() {
    showCurrentNavGray();
  }
);

function showNavImage(name) {
  hideCurrentNavGray();
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

function showCurrentNavGray() {
  $("#nav_" + currentNav + "-gray").show();
}

function hideCurrentNavGray() {
  $("#nav_" + currentNav + "-gray").hide();
}
