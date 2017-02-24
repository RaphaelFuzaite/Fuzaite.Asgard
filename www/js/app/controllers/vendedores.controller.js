(function () {
    'use strict';

    angular
        .module('starter')
        .controller('VendedoresController', VendedoresController);

    VendedoresController.$inject = ['$scope', '$timeout', '$interval', 'UtilFactory'];

    function VendedoresController($scope, $timeout, $interval, UtilFactory) {

        var vm = this;
        vm.DataUltimaAtualizacao = new Date();
        
        vm.TotalEmVendas = {
            Data: {
                Total: 358669.55,
                Ecommerce: 19902.02,
                Empresa: 468767.53
            }
        };

        vm.Vendedores = {
            Data: [
                {
                    Nome: 'David Silva',
                    Contratos: 9,
                    Total: 45277.59
                },
                {
                    Nome: 'Camila R. V. Felix da Silva',
                    Contratos: 6,
                    Total: 40059.98
                }, {
                    Nome: 'Debora Matias',
                    Contratos: 6,
                    Total: 39617.02,
                }, {
                    Nome: 'Adriana Caetano',
                    Contratos: 4,
                    Total: 30697,
                }, {
                    Nome: 'Juliana de Oliveira',
                    Contratos: 3,
                    Total: 26616.90,
                }, {
                    Nome: 'Leonardo Cortez',
                    Contratos: 3,
                    Total: 25096.88,
                }, {
                    Nome: 'Fabiana Fonseca Carlet',
                    Contratos: 4,
                    Total: 24883.39,
                }, {
                    Nome: 'Rodrigo Nicolino',
                    Contratos: 3,
                    Total: 22444.90,
                }, {
                    Nome: 'Ecommerce',
                    Contratos: 4,
                    Total: 19902.02
                }, {
                    Nome: 'Aline d Santi',
                    Contratos: 2,
                    Total: 17806
                }, {
                    Nome: 'Mércia Santos Campo',
                    Contratos: 2,
                    Total: 17798.00
                }, {
                    Nome: 'Ana Oliveira',
                    Contratos: 2,
                    Total: 17717.90
                }, {
                    Nome: 'Paulo Henrique',
                    Contratos: 3,
                    Total: 17417.00
                }, {
                    Nome: 'Claudia Alencar',
                    Contratos: 2,
                    Total: 17299.00
                }, {
                    Nome: 'Isa Jaqueline Honória Santos',
                    Contratos: 1,
                    Total: 12500.00
                }, {
                    Nome: 'Patricia Basoli',
                    Contratos: 2,
                    Total: 12224.02
                }, {
                    Nome: 'Mariana Alves',
                    Contratos: 2,
                    Total: 12018.00
                }, {
                    Nome: 'Thiago May',
                    Contratos: 3,
                    Total: 11779.12
                }, {
                    Nome: 'Laerte Bueno',
                    Contratos: 2,
                    Total: 11597.95
                }, {
                    Nome: 'Lucas Xavier',
                    Contratos: 2,
                    Total: 11355.00
                }, {
                    Nome: 'Priscila Hipólito Pereira',
                    Contratos: 1,
                    Total: 11299.00
                }, {
                    Nome: 'Adriana Galdino Marinho',
                    Contratos: 1,
                    Total: 10448.00
                }, {
                    Nome: 'Adalla Cristina de Souza',
                    Contratos: 1,
                    Total: 9397.96
                }, {
                    Nome: 'Amanda Marques',
                    Contratos: 1,
                    Total: 8899.00
                }, {
                    Nome: 'André Almeida',
                    Contratos: 1,
                    Total: 7298.92
                }, {
                    Nome: 'Rosangela Martins',
                    Contratos: 1,
                    Total: 7219.00
                }
            ]
        };
    };

})();