app.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$http', '$scope'];

function MainCtrl($http, $scope) {
	var vm = this;
	vm.objectToEdit = null;
	vm.current_page = 1;
	vm.pages = []
	vm.all_pages = []
	vm.count;
	vm.all_pages_count;

	$http.get('/api/post/home/' + vm.current_page)
		.success(function(response) {
			vm.posts = response.posts;
			vm.count = response.count;
			vm.all_pages_count = Math.ceil(vm.count / 5);
			vm.all_pages = new Array(vm.all_pages_count);
			for(var i = 0; i < vm.all_pages.length; i++) {
				vm.all_pages[i] = i;
			}

			vm.pages = vm.all_pages.slice(0, 5);

		})
		.error(function(err) {
			console.log(err);
		});

	vm.nextPage = function() {
		if(vm.current_page % 5 == 0 && vm.current_page < vm.all_pages_count) {
			vm.pages = vm.all_pages.slice(vm.current_page, vm.current_page + 5);
			vm.current_page ++;
			vm.getPosts();
		} else if(vm.current_page < vm.all_pages_count) {
			vm.current_page ++;
			vm.getPosts();
		}
	}

	vm.backPage = function() {
		if((vm.current_page-1) % 5 == 0 && vm.current_page > 1) {
			vm.current_page --;
			vm.pages = vm.all_pages.slice(vm.current_page - 5, vm.current_page);
			vm.getPosts();
		} else if(vm.current_page > 1) {
			vm.current_page --;
			vm.getPosts();
		}
	}

	vm.setPage = function(page) {
		vm.current_page = page;
		vm.getPosts();
	}

	vm.getPosts = function() {
		$http.get('/api/post/home/' + vm.current_page)
			.success(function(response) {
				vm.posts = response.posts;
			}) .error(function(err) {
				console.log(err);
			})
	}

	vm.savePost = function() {
		console.log(vm.file);
		var data = new FormData();

		data.append('title', vm.title);
		data.append('content', vm.content);
		data.append('author', vm.author);
		data.append('file', vm.file);

		$http.post('/api/post', data, 
			{
				headers: {'Content-Type': undefined},
				transformRequest: angular.identity
			})
			.success(function(response) {
				console.log(response)
				vm.posts.push(response);
			})
			.error(function(err) {
				console.log(err);
			})	
		// var data = {
		// 	title: vm.title,
		// 	content: vm.content,
		// 	author: vm.author
		// }

		// $http.post('/api/post', data)
		// 	.success(function(response) {
		// 		vm.posts.push(response);
		// 	})
		// 	.error(function(err) {
		// 		console.log(err);
		// 	})
	}

	vm.deletePost = function(post) {

		$http.delete('/api/post/' + post._id)
			.success(function(response) {
				var index = vm.posts.findIndex(function(item) {
					return item._id === post._id
				});

				vm.posts.splice(index, 1);
			})
			.error(function(err) {
				console.log(err);
			});
	}
	
	vm.makeEditable = function(post) {
		vm.objectToEdit = post;
	}
	
	vm.closeModal = function() {
		vm.objectToEdit = null;
	}
	
	vm.editPost = function() {
		$http.put('/api/post', vm.objectToEdit)
			.success(function(response) {
				console.log(response);
				vm.closeModal();
			}).error(function(error) {
				console.log(error);
			});
	}

	vm.setLike = function(id, index) {
		$http.put('/api/post/like/' + id)
			.success(function(response){
				vm.posts[index] = response
			})
			.error(function(err){
				console.log(err)
			})
	}
}