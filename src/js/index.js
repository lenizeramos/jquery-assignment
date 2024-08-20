$(() => {
  const postsRequest = $.ajax({
    url: "https://jsonplaceholder.typicode.com/posts",
    type: "GET",
  });

  const commentsRequest = $.ajax({
    url: "https://jsonplaceholder.typicode.com/comments",
    type: "GET",
  });

  const usersRequest = $.ajax({
    url: "https://jsonplaceholder.typicode.com/users",
    type: "GET",
  });

  $.when(postsRequest, commentsRequest, usersRequest)
    .done(function (postsReponse, commentsResponse, usersResponse) {
      let posts = buildPosts(
        postsReponse[0],
        commentsResponse[0],
        usersResponse[0]
      );

      buildHTML(posts);
    })
    .fail(function (error) {
      console.error("Error:", error);
    });

  function buildPosts(postsData, commentsData, usersData) {
    let posts = [];
    postsData.forEach((post) => {
      let comments = commentsData.filter((comment) => {
        return post.id === comment.postId;
      });
      post["comments"] = comments;

      let user = usersData.find((user) => user.id === post.userId);
      post["user"] = user;

      posts.push(post);
    });

    return posts;
  }

  function buildHTML(posts) {
    posts.forEach((post) => {
      let postUser = post.user.name;
      let postTitle = post.title;
      let postBody = post.body;

      let h3PostUser = $("<h3>").html(`Posted by: ${postUser}`);
      let h4PostTitle = $("<h4>").html(`Title: ${postTitle}`);
      let pPostBody = $("<p>").html(`Body: ${postBody}`);

      let divComment = $("<div>", { style: "display: none" });
      let divParagraphComments = $("<div>");
      let commentButton = $("<button>", {
        class: "toggleCommentsButton",
        text: "Comments",
      });

      for (const comment of post.comments) {
        let pCommentBody = $("<p>", { class: "comments " }).html(comment.body);

        divParagraphComments.append(pCommentBody);
      }

      divComment.append(divParagraphComments);

      let addCommentButton = $("<button>", {
        class: "addCommentButton",
        text: "Add a comment",
      });
      divComment.append(addCommentButton);

      let form = $("<form>", {
        style: "display: none",
      });
      let textArea = $("<textarea>", {
        placeholder: "Type your comment here. Max 150 characters",
        maxlength: 150,
      });
      let submitButton = $("<button>", {
        type: "submit",
        text: "Submit",
      });
      form.append(textArea);
      form.append(submitButton);

      divComment.append(form);

      let divPost = $("<div>", {
        class: "post",
      })
        .append(h3PostUser, h4PostTitle, pPostBody)
        .append(commentButton)
        .append(divComment);

      $("#posts").append(divPost);

      commentButton.on("click", function () {
        divComment.slideToggle();
      });

      addCommentButton.on("click", function () {
        form.slideToggle();
        form.on("submit", function (event) {
          event.preventDefault();

          let msgValue = textArea.val().trim();
          let pCommentBody = $("<p>", { class: "comments " }).html(msgValue);
          if (msgValue != "") {
            divParagraphComments.append(pCommentBody);
          }

          textArea.val("");
        });
      });
    });
  }
});
