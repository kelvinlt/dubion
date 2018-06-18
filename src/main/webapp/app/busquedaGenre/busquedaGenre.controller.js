(function() {
    'use strict';

    angular
        .module('dubionApp')
        .controller('busquedaGenreController', busquedaGenreController);

    busquedaGenreController.$inject = ['$scope', 'Principal', 'LoginService', '$state', 'Genre','Album'];

    function busquedaGenreController($scope, Principal, LoginService, $state,Genre,Album) {

        var vm = this;

        vm.genres = [];

        loadAll();

        function loadAll() {
            //Sex.query(function(result) {
            //    vm.sexes = result;
            //    vm.searchQuery = null;
            //});
        }

    }
})();
