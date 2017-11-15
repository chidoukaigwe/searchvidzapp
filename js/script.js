// Search Bar Handler
$(function(){
    $('#search-form').submit(function(e){
      e.preventDefault();
    });
});

function search() {

  $('#results').html('');
  $('#buttons').html('');

  q = $('#query').val();

  $.get(
    "https://www.googleapis.com/youtube/v3/search",{
      part: 'snippet, id',
      q: q,
      type: 'video',
      maxResults: 30,
      key: 'AIzaSyAEGwYI5xfMEdDpVMF5mR8v6Mn__iM_zy8'},
      function(data){
         var nextPageToken = data.nextPageToken;
         var prevPageToken = data.prevPageToken;

         console.log(data);

         $.each(data.items, function(i , item){
           var output = getOutput(item);

           //Display Results
         $('#results').append(output);
         });

         var buttons = getButtons(prevPageToken, nextPageToken);

         //Display buttons
         $('#buttons').append(buttons);
      }
    );
  }

  //Next Page Function
  function nextPage(){


    var token = $('#next-button').data('token');
    var q = $('#next-button').data('query');

    //Set Results Div & Button Div To Empty (clear results)
    $('#results').html('');
    $('#buttons').html('');

    //Get Form Input
    q = $('#query').val();

    //Run GET request on API
    $.get(
      "https://www.googleapis.com/youtube/v3/search",{
        part: 'snippet, id',
        q: q,
        pageToken: token,
        type: 'video',
        maxResults: 30,
        key: 'AIzaSyAEGwYI5xfMEdDpVMF5mR8v6Mn__iM_zy8'},
        function(data){
           var nextPageToken = data.nextPageToken;
           var prevPageToken = data.prevPageToken;

           //Logging Data to Console
           console.log(data);

           $.each(data.items, function(i , item){
             var output = getOutput(item);

             //Display Results
             $('#results').append(output);
           });

           var buttons = getButtons(prevPageToken, nextPageToken);

           //Display buttons
           $('#buttons').append(buttons);
        }
      );
  }

  //Prev Page Function
  function prevPage(){

    var token = $('#prev-button').data('token');
    var q = $('#prev-button').data('query');

    //Set Results Div & Button Div To Empty (clear results)
    $('#results').html('');
    $('#buttons').html('');

    //Get Form Input
    q = $('#query').val();

    //Run GET request on API
    $.get(
      "https://www.googleapis.com/youtube/v3/search",{
        part: 'snippet, id',
        q: q,
        pageToken: token,
        type: 'video',
        maxResults: 30,
        key: 'AIzaSyAEGwYI5xfMEdDpVMF5mR8v6Mn__iM_zy8'},
        //what to do now that the server has successfully recieved and answered our data request.
        function(data){
           var nextPageToken = data.nextPageToken;
           var prevPageToken = data.prevPageToken;

           //Logging Data to Console
           console.log(data);

           $.each(data.items, function(i , item){
             var output = getOutput(item);

             //Display Results
             $('#results').append(output);
           });

           var buttons = getButtons(prevPageToken, nextPageToken);

           //Display buttons
           $('#buttons').append(buttons);
        } // callback function ends
      );
  }

//Build output
function getOutput(item){
  var videoId = item.id.videoId;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumb = item.snippet.thumbnails.medium.url;
  var channelTitle = item.snippet.channelTitle;
  var videoDate = item.snippet.publishedAt;

  //Build Output String
  var output = '<li class="grid-box">' +
  '<span>' +
  '<img src="'+ thumb +'">' +
  '</span>' +
  '<h3 class="grid-title"><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+ videoId +'">' + title + '</a></h3>' +
  '<small>By <span class="cTitle">' + channelTitle + '</span> on ' + videoDate + '</small>' +
  '<p>'+ description + '</p>' +
  '</li>' +
  '<div class="clearfix"></div>' +
  '' ;
  return output;
}

//Build the buttons
function getButtons(prevPageToken, nextPageToken) {
  if(!prevPageToken){
    var btnoutput = '<div class="button-container">' +
                    '<button id="next-button" class="paging-button" data-token="'+ nextPageToken +'" data-query="'+ q +'" ' +
                    'onclick="nextPage();">Next Page</button></div>';
  } else {
    //basically saying if it does include the previous page
    var btnoutput = '<div class="button-container">' +
                    '<button id="prev-button" class="paging-button" data-token="'+ prevPageToken +'" data-query="'+ q +'"' +
                    'onclick="prevPage();">Prev Page</button></div>';

                    '<div class="button-container">' +
                    '<button id="next-button" class="paging-button" data-token="'+ nextPageToken +'" data-query="'+ q +'"' +
                    'onclick="nextPage();">Next Page</button></div>';
  }
  return btnoutput;
}
