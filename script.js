var BookLookApp = function () {

  var newBook = function () {
    var search = $('.search').val();
    var book = { 
        search: search,
      }
  };

  var handlebarIt = function (book) {
    // var book = newBook();

    var source = $('#result-template').html();

    var template = Handlebars.compile(source);

    var newHTML = template(book);

    $('.book-look').append(newHTML);

  };

  var parse = function (data) {
    var book = {
      title: data.items[0].volumeInfo.title,
      author: data.items[0].volumeInfo.authors[0],
      description: data.items[0].volumeInfo.description,
      image: data.items[0].volumeInfo.imageLinks.thumbnail,
      pages: data.items[0].volumeInfo.pageCount
    } 
      handlebarIt(book);
      return book;
  }



  var fetch = function () {
    $.ajax({
      method: "GET",
      url: 'https://www.googleapis.com/books/v1/volumes?q=0439023521',
      dataType: "json",
      success: function(data) {
        var book = parse(data);
        console.log(book);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    }); 
  };

  return {
    newBook: newBook,
    handlebarIt: handlebarIt,
    fetch: fetch
  }

}

var app = BookLookApp();

$('#search-btn').click( function (e) {
  e.preventDefault();


  // creates an object so we can handlebar it
  // app.newBook();
  // now we get it handled!
  // app.handlebarIt();
  app.fetch();

});
