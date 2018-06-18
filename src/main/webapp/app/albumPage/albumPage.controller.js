(function() {
    'use strict';

    angular
        .module('dubionApp')
        .controller('albumPageController', albumPageController);

    albumPageController.$inject = ['$scope', 'Principal', 'LoginService', '$state','Album','$stateParams','FavouriteAlbum','RatingAlbum'];

    function albumPageController ($scope, Principal, LoginService, $state, Album,$stateParams,FavouriteAlbum,RatingAlbum) {

        var vm = this;
        vm.songByName = songByName;
        vm.albumActual;

        vm.likeUpDown="r";
        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        vm.favouriteAlbum={};
        vm.contador=0;
        //vm.favouriteAlbum.liked=true;

        vm.albumId;
        vm.ratingAlbums = [];
        vm.ratingAlbum= {};


        //kelvin paginacion//
        vm.page = 0;
        vm.songsPageble = songsPageable;

        vm.songsInAlbum = 0;
        vm.paginasAlbum = 0;

        vm.minPaginas = 0;
        vm.maxPaginas = 0;


        //---//
        vm.next = false;
        vm.back = true;
        //================//

        vm.mediaRating = 0;
        vm.contadorRating = 0;

        //---------------//

        Album.get({id : $stateParams.id}, function(data) {

            vm.albumActual = data;
            getRatingAlbum(data.id);
            getFavoriteAlbum(data.id);

            vm.albumName = vm.albumActual.name;
            vm.albumId = vm.albumActual.id;
            songByName();
            songsPageable();
            vm.imatgeAlbum = '<img  src="data:image/jpg;base64, '+vm.albumActual.photo+'" />';
            // $scope.apply();

            //getMediaRating(data.id);
            //getCounterRating(data.id);

        });

        vm.likeDislike=function(){
            if(vm.likeUpDown=="s"){
                vm.favouriteAlbum.liked=false;
                vm.likeUpDown="r";
            }else{
                vm.favouriteAlbum.liked=true;
                vm.likeUpDown="s";
            }

            save();
            function save () {
                vm.isSaving = true;

                if(vm.favouriteAlbum.id){
                    vm.favouriteAlbum.album=vm.albumActual;
                    FavouriteAlbum.update(vm.favouriteAlbum, onSaveSuccess, onSaveError);
                } else {
                    vm.favouriteAlbum.album=vm.albumActual;
                    FavouriteAlbum.save(vm.favouriteAlbum, onSaveSuccess, onSaveError);
                }
            }
            function onSaveSuccess (result) {
                $scope.$emit('dubionApp:favouriteAlbumUpdate', result);
                vm.isSaving = false;
            }

            function onSaveError () {
                vm.isSaving = false;
            }

        }

        vm.setSong= function(song) {
            document.getElementById("audioplayer").src = song.url;
        }

        function getFavoriteAlbum(id) {
           FavouriteAlbum.favoriteByAlbum({id : id}, function (data){
                vm.favouriteAlbum = data;
                if(vm.favouriteAlbum.liked){
                    vm.likeUpDown="s";
                }else{
                    vm.likeUpDown="r";
                }
            }, function(data){
            });
        }
        $('#input-1').on('rating:change', function(event, value, caption) {
            save();
            function save () {

                vm.isSaving = true;
                if(vm.ratingAlbum.id){
                    vm.ratingAlbum.album=vm.albumActual;
                    vm.ratingAlbum.rating=value;
                    RatingAlbum.update(vm.ratingAlbum, onSaveSuccess, onSaveError);
                } else {
                    vm.ratingAlbum={album:null,user:null,rating:null,date:null,id:null}
                    vm.ratingAlbum.album=vm.albumActual;
                    vm.ratingAlbum.rating=value;
                    RatingAlbum.save(vm.ratingAlbum, onSaveSuccess, onSaveError);
                }
            }
            function onSaveSuccess (result) {
                $scope.$emit('dubionApp:ratingAlbumUpdate', result);
                vm.isSaving = false;
            }

            function onSaveError () {
                vm.isSaving = false;
            }
        });
        function getRatingAlbum(id) {
            RatingAlbum.ratingByAlbum({id : id}, function (data){
                vm.ratingAlbum = data;
                $("#input-1").val(vm.ratingAlbum.rating);
                $("#input-1").rating({min:1, max:10, step:2, size:'xs'});

            }, function(data){
                vm.ratingAlbum= 0;
                $("#input-1").rating({min:1, max:10, step:2, size:'xs'});
            });

        }

        function getCounterRating(id) {
            RatingAlbum.getContador({id : id}, function (data) {
                vm.contadorRating= data;
            });
        }

        function getMediaRating(id) {
            RatingAlbum.getMedia({id : id}, function (data) {
                vm.mediaRating= data;
            });
        }

        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;

            });
        }

        function register () {
            $state.go('register');
        }
        vm.salbums=[];

        function songByName(){
            console.log("-------------------------------------------------------------------------------------------: "+vm.albumId);
            RatingAlbum.getContador({id : vm.albumId}, function (data) {
                vm.contadorRating = data.value;
                console.dir(data);
            });
            RatingAlbum.getMedia({id : vm.albumId}, function (data) {
                vm.mediaRating = data.value;
                console.dir(data);
            });

            Album.getSongsByName({idAlbum : vm.albumId}, function (data) {
                vm.songsInAlbum = data.length;
                vm.paginasAlbum = Math.ceil(vm.songsInAlbum/10);

                vm.maxPaginas = vm.paginasAlbum-1;

                //console.log("=====================================================");
                //console.log("Numero de songs en album",vm.songsInAlbum);
                // console.log("Numero de paginas",vm.paginasAlbum);
                // console.log("Max paginas(segun java)",vm.maxPaginas);
                // console.log("Pagina Actual",vm.page);
                // console.log("=====================================================");
                vm.checkPagina();
            });
        };



        function songsPageable(){
            Album.getSongsByIdPageble({idAlbum : vm.albumId,page : vm.page}, function (data){
                vm.songs = data;
                //console.log('songs',vm.songs);
            })
            // console.log("songsByNamePageable");
            // console.log(vm.page);
            vm.checkPagina();
        };

        vm.nextPage=function () {
            // console.log("===========");
            // console.log("Next Page");
            vm.page++;

            Album.getSongsByIdPageble({idAlbum : vm.albumId,page : vm.page}, function (data){
                vm.songs = data;
            })

            // console.log("nextPage");
            // console.log(vm.page);
            vm.checkPagina();
        }

        vm.anteriorPage=function () {
            // console.log("===========");
            // console.log("Anterior Page");
                vm.page--;

            Album.getSongsByIdPageble({idAlbum : vm.albumId,page : vm.page}, function (data){
                vm.songs = data;
            })
            // console.log("anteriorPage");
            // console.log(vm.page);
            vm.checkPagina();
        }

        vm.checkPagina=function () {
            // console.log("checkpage");
            if(vm.page==vm.minPaginas){
                vm.back = true;
                // console.log("1");
                // console.log("next", vm.next);
                // console.log("back",vm.back);
                // console.log(vm.page);
            }
            if(vm.page==vm.maxPaginas){
                vm.next = true;
                // console.log("2");
                // console.log("next", vm.next);
                // console.log("back",vm.back);
                // console.log(vm.page);
            }
            if(vm.page>vm.minPaginas){
                vm.back = false;
                // console.log("3");
                // console.log("next", vm.next);
                // console.log("back",vm.back);
                // console.log(vm.page);
            }
            if(vm.page<vm.maxPaginas){
                vm.next = false;
                // console.log("4");
                // console.log("next", vm.next);
                // console.log("back",vm.back);
                // console.log(vm.page);
            }
            // console.log("=========================");
            // console.log("check paginacion:");
            // console.log("status page",vm.page);
            // console.log("paginas maximas",vm.maxPaginas);
            // console.log("paginas minimas",vm.minPaginas);
            // console.log("status next",vm.next);
            // console.log("status back",vm.back);
            // console.log("=========================");
        }

        loadAll();

        function loadAll() {
            vm.albumsLoaded=false;

            Album.query(function(result) {
                vm.salbums = result;
                vm.searchQuery = null;

                vm.slickConfig = {
                    enabled: true,
                    autoplay: true,
                    draggable: false,
                    autoplaySpeed: 2000,
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    responsive: [
                        {
                            breakpoint: 1200,
                            settings: {
                                dots: false,
                                slidesToShow: 4,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                dots: false,
                                slidesToShow: 3,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                arrows: false,
                                slidesToShow: 1,
                                slidesToScroll: 1

                            }
                        }

                    ],
                    method: {},
                    event: {
                        //beforeChange: function (event, slick, currentSlide, nextSlide){},
                        //  afterChange: function (event, slick, currentSlide, nextSlide) {              }
                    }
                };
                vm.albumsLoaded=true;
            });
        }


    }
})();
