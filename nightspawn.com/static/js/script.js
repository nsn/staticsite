

$(document).ready(function(){

  // show current gray navimage
  showCurrentNavGray();

  // render any picasa streams
  fetchAlbums();
  $(".picasaAlbum").picasaAlbum();

  // fancybox
  $("a.gallerylink").fancybox();


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

(function($) {

  $.fn.picasaAlbum = function(options) {
    var albumID = this.attr("data-albumid");
    var rel = "picasa_" + albumID;

    var dom = $(this);

    $.getJSON("https://picasaweb.google.com/data/feed/api/user/108363071077152262865/albumid/" + albumID + "?kind=photo&access=public&alt=json&thumbsize=220c", 'callback=?',
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
          a.attr("title", pic.summary.$t);
          a.append(img);

          dom.append(a);

        }
        console.log("penis " + $("a.picasalink[rel="+rel+"]").length);
        $("a.picasalink[rel="+rel+"]").fancybox();
      });


  };

}) (jQuery);

(function($) {

  $.fn.picasaAlbumTeaser = function(data) {
    var albumID = this.attr("data-albumid");

    //    var album = $.picasAlbums.feed.entry
    console.log("ficken : " + albumID + " " + data.feed.entry.length);
    for (var j = 0; j < data.feed.entry.length; j++) {
      if (data.feed.entry[j].gphoto$id.$t == albumID) {
        alb = data.feed.entry[j];

        var img = $("<img/>");
        img.attr("class", "picasaimg");
        img.attr("src", alb.media$group.media$thumbnail[0].url);
      
        $(this).append(img); 
      }
    }

  };

}) (jQuery);

function fetchAlbums() {
  $.getJSON("https://picasaweb.google.com/data/feed/api/user/108363071077152262865/?kind=album&access=public&alt=json&thumbsize=220c", 'callback=?',
    function(data){
      //$(".picasaAlbumTeaser").picasaAlbumTeaser(data);
      for (var i =0; i < $(".picasaAlbumTeaser").length; i++) {
        $($(".picasaAlbumTeaser")[i]).picasaAlbumTeaser(data);
      }
      /*
      for (var i =0; i < $(".picasaAlbumTeaser").length; i++) {
        var albumID = $(".picasaAlbumTeaser")[i].getAttribute("data-albumid");
        for (var j = 0; j < data.feed.entry.length; j++) {
          if (data.feed.entry[j].gphoto$id.$t == albumID) {
            pic = data.feed.entry[j].media$group.media$thumbnail[0].url;
            $(".picasaAlbumTeaser")[i].appendChild("ficken");
          }
        }
      }
      */
    });
}
