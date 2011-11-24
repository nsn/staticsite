

$(document).ready(function(){

  // show current gray navimage
  showCurrentNavGray();

  // fancybox
  $("a.gallerylink").fancybox();

  // render any picasa streams
  $(".picasaStream").picasaStream();
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

$.fn.picasaStream = function() {
  this.append("stream! ");
  var albumID = this.attr("data-albumid");
  // https://github.com/alanhamlett/jQuery-Picasa-Gallery
  $.getJSON("https://picasaweb.google.com/data/feed/api/user/nightspawn.com/albumid/" + albumID + "?kind=photo&access=public&alt=json&thumbsize=220c
    function(data){
      for (var i = 0; i < data.feed.entry.length; i++) {
        var pic = data.feed.entry[i];

        var img = $("<img/>");
        img.attr("class", "picasaimg");
        img.attr("alt", pic.summary.$t);
        img.attr("src", pic.media$group.media$thumbnail[0].url);

        var a = $("<a/>");
        a.attr("href", pic.media$group.media$content[0].url);
        a.attr("class", "gallerylink");
        a.attr("rel", "picasa_" + albumID);
        a.attr("alt", pic.summary.$t);
        a.append(img);
        a.appendTo(this);
      }
    });

}
