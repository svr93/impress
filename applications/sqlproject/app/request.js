// /home/vladimir/impress_server/applications/sqlproject/app/request.js
module.exports = function(client, callback) {

	client.context.data = {
		title: "Главная страница сервера Impress",
		links: [
                    "<a onclick=forumCreate();>Forum.create</a>",
                    "<a onclick=forumDetails();>Forum.details</a>",
                    "<a onclick=forumListPosts();>Forum.listPosts</a>",
                    "<a onclick=forumListThreads();>Forum.listThreads</a>",
                    "<a onclick=forumListUsers();>Forum.listUsers</a>",
                    " ",
                    "<a onclick=postCreate();>Post.create</a>",
                    "<a onclick=postDetails();>Post.details</a>",
                    "<a onclick=postList();>Post.list</a>",
                    "<a onclick=postRemove();>Post.remove</a>",
                    "<a onclick=postRestore();>Post.restore</a>",
                    "<a onclick=postUpdate();>Post.update</a>",
                    "<a onclick=postVote();>Post.vote</a>",
                    " ",
                    "<a onclick=userCreate();>User.create</a>",
                    "<a onclick=userDetails();>User.details</a>",
                    "<a onclick=userFollow();>User.follow</a>",
                    "<a onclick=userListFollowers();>User.listFollowers</a>",
                    "<a onclick=userListFollowing();>User.listFollowing</a>",
                    "<a onclick=userListPosts();>User.listPosts</a>",
                    "<a onclick=userUnfollow();>User.unfollow</a>",
                    "<a onclick=userUpdateProfile();>User.updateProfile</a>",
                    " ",
                    "<a onclick=threadClose();>Thread.close</a>",
                    "<a onclick=threadCreate();>Thread.create</a>",
                    "<a onclick=threadDetails();>Thread.details</a>",
                    "<a onclick=threadList();>Thread.list</a>",
                    "<a onclick=threadListPosts();>Thread.listPosts</a>",
                    "<a onclick=threadOpen();>Thread.open</a>",
                    "<a onclick=threadRemove();>Thread.remove</a>",
                    "<a onclick=threadRestore();>Thread.restore</a>",
                    "<a onclick=threadSubscribe();>Thread.subscribe</a>",
                    "<a onclick=threadUnsubscribe();>Thread.unsubscribe</a>",
                    "<a onclick=threadUpdate();>Thread.update</a>",
                    "<a onclick=threadVote();>Thread.vote</a>",
                    "<a onclick=clearDatabase();>CLEAR</a>"
		],
		session: client.session
	};

	callback();
}

