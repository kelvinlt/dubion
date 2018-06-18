(function() {
    'use strict';

    angular
        .module('dubionApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('busquedaGenre', {
                parent: 'entity',
                url: '/busquedaGenre/',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'dubionApp.bandPage.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/busquedaGenre/busquedaGenre.html',
                        controller: 'busquedaGenreController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('bandPage');
                        $translatePartialLoader.addPart('status');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
    }
})();
