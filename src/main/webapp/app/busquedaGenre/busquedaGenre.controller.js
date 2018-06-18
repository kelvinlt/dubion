(function() {
    'use strict';

    angular
        .module('dubionApp')
        .controller('busquedaGenreController', busquedaGenreController);

    busquedaGenreController.$inject = ['$scope', 'Principal', 'LoginService', '$state', 'Genre','Album'];

    function busquedaGenreController($scope, Principal, LoginService, $state, Genre ,Album) {

        var vm = this;

        vm.genres = [];
        vm.albumes = [];
        vm.option = 0;
        vm.count = 0;

        loadAll();

        function loadAll() {
            Genre.getAllGenresK(function (result) {
                vm.genres = result;
            });
            console.log("----------------------:"+vm.genres);
        }



        vm.changeAlbumes = function (option){
            vm.option = option;
            Album.getAlbumsByGenreId({id : vm.option},function (result) {
                vm.albumes = result;
            })
            console.log("----------------------:"+vm.albumes);
        }

        function test() {
            vm.count = vm.count+1;
            console.log(vm.count);
        }
    }
})();
