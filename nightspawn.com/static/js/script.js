

$(document).ready(function(){

  // show current gray navimage
  showCurrentNavGray();

  // render any picasa streams
  $(".picasaAlbum").picasaAlbum();

  // fancybox
  //$(document).on("click", "a.gallerylink", );
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

(function($) {

  $.fn.picasaAlbum = function(options) {
    var albumID = this.attr("data-albumid");
    var rel = "picasa_" + albumID;

    var dom = $(this);

    $.getJSON("https://picasaweb.google.com/data/feed/api/user/nightspawn.com/albumid/" + albumID + "?kind=photo&access=public&alt=json&thumbsize=220c", 'callback=?',
      function(data){
        for (var i = 0; i < data.feed.entry.length; i++) {
          var pic = data.feed.entry[i];

          var img = $("<img/>");
          img.attr("class", "picasaimg");
          img.attr("alt", pic.summary.$t);
          img.attr("src", pic.media$group.media$thumbnail[0].url);

          var a = $("<a/>");
          a.attr("href", pic.media$group.media$content[0].url);
          a.attr("class", "picasalink");
          a.attr("rel", rel);
          a.attr("alt", pic.summary.$t);
          a.append(img);

          dom.append(a);

        }
        console.log("penis " + $("a.picasalink[rel="+rel+"]").length);
        $("a.picasalink[rel="+rel+"]").fancybox();
      });


  };

}) (jQuery);

