

$(document).ready(function(){

  // show current gray navimage
  showCurrentNavGray();

  // render any picasa streams
  $(".picasaAlbum").picasaAlbum({
    "thumbsize" : "220c",
    "imageStyleClass" : "picasaimg",
    "linkStyleClass" : "picasaAlbumLink",
    "callback"  : function(elements) {
      $(".picasaAlbumLink").fancybox();
    }
  });
  $(".picasaAlbumTeaser").picasaTeaser({
    "thumbsize" : "220c",
    "imageStyleClass" : "picasaimg"
  });

  $(".twitpicstream").twitpicUserGallery({"imageStyleClass" : "picasaimg"});

  // syntaxhighlighter
  SyntaxHighlighter.all()
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


