$(() => {
  const postsRequest = $.ajax({
    url: "https://jsonplaceholder.typicode.com/posts",
    type: "GET",
  });

  const commentsRequest = $.ajax({
    url: "https://jsonplaceholder.typicode.com/comments",
    type: "GET",
  });

  $.when(postsRequest, commentsRequest)
    .done(function (postsReponse, commentsResponse) {
      let posts = [];
      console.log(postsReponse[0]);
      postsReponse[0].forEach((post) => {
        let comments = commentsResponse[0].filter((comment) => {
          return post.id === comment.postId;
        });
        post["comments"] = comments;
        posts.push(post);
      });

      // console.log(posts.length);

      posts.forEach((post) => {
        let postTitle = post.title;
        let postBody = post.body;
        console.log(post.comments);

        let commentBody = post.comments.map((comment) => {
          return comment.body;
        });
        console.log(commentBody);

        let h3PostTitle = $("<h3>").html(postTitle);

        let pPostBody = $("<p>").html(postBody);

        /* let pCommentBody = $("<p>").html(commentBody) */

        let divPost = $("<div>", {
          class: "post",
        }).append(h3PostTitle, pPostBody);

        $("#posts").append(divPost);
      });
    })
    .fail(function (error) {
      console.error("Error:", error);
    });
});
