app.controller('FilterCtrl', FilterCtrl);

FilterCtrl.$inject = ['$http', '$scope'];

function FilterCtrl($http, $scope){
	var vm = this;

	vm.employes = [
		{
			name: 'Artyom',
			surname: 'Fyodorov',
			age: 13,
			position: 'Web developer',
			date: new Date()
		},
		{
			name: 'Alex',
			surname: 'Devonber',
			age: 24,
			position: 'Designer',
			date: new Date()
		},
		{
			name: 'David',
			surname: 'Tsoy',
			age: 31,
			position: 'Programist',
			date: new Date()
		},
		{
			name: 'Alexandr',
			surname: 'Ambanov',
			age: 33,
			position: 'Police',
			date: new Date()
		},
		{
			name: 'Tanya',
			surname: 'Centra',
			age: 40,
			position: 'Doctor',
			date: new Date()
		},
		{
			name: 'Amir',
			surname: 'Kapsalyamov',
			age: 16,
			position: 'apprentice',
			date: new Date()
		},
		{
			name: 'Timyr',
			surname: 'Sadykov',
			age: 22,
			position: 'Cooker',
			date: new Date()
		},
		{
			name: 'Almat',
			surname: 'Zhumabaev',
			age: 28,
			position: 'Security',
			date: new Date()
		},
		{
			name: 'Edward',
			surname: 'Linch',
			age: 52,
			position: 'Film director',
			date: new Date()
		},
		{
			name: 'Jackson',
			surname: 'Statham',
			age: 46,
			position: 'Producer',
			date: new Date()
		},
	];

	vm.setFilter = function(filter) {
		if(!vm.filter){
			vm.filter = filter ;
			return;
		}

		if (vm.filter.includes(filter) && vm.filter[0] != '-') {
			vm.filter = '-' + filter;
		} else{
			vm.filter = filter
		}
	}
}


