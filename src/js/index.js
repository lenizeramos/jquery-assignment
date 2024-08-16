$(() => {
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/posts",
    type: "GET",
    success: function (response) {
      console.log(response);
      response.forEach((post) => {
        
        $("#posts").append(`<div> Title: ${post.title},<br> Body: ${post.body}.</div>`);
      });
    },
    error: function (error) {
      console.error(error);
    },
  });
});
