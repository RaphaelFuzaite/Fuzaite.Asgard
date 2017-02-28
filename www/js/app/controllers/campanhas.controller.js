(function () {
    'use strict';

    angular
        .module('starter')
        .controller('CampanhasController', CampanhasController);

    CampanhasController.$inject = ['$scope', '$timeout', '$interval', 'UtilFactory'];

    function CampanhasController($scope, $timeout, $interval, UtilFactory) {

        var vm = this;
        vm.DataUltimaAtualizacao = new Date();

        vm.Graficos = {
            Donut: {
                D3: function (data, id, pantone, leg) {

                    var margin = { left: 20, bottom: 20, top: 20, right: 20 },
                        width = angular.element("#svg-d3-donut-campaign").width(),
                        height = angular.element("#svg-d3-donut-campaign").width(),
                        radius = Math.min(width, height) / 2;

                    switch (pantone) {
                        case 'first':
                            var color = ["#960061", "#D50032", "#FF5C39", "#FF9600", "#FFC800"];
                            break;
                        case 'second':
                        default:
                            var color = ["#97D700", "#A05EBE", "#6EBEDC", "#00C7B1", "#00A9CE"];
                            break;
                    }

                    //var color = ["#A05EBE", "#6EBEDC", "#00C7B1", "#00A9CE"];
                    var color = ["#960061", "#D50032", "#FF5C39", "#FF9600", "#FFC800"];

                    var domain = data.map(function (t) { return t.Valor });
                    var colorScale = d3.scaleOrdinal(color).domain(domain);

                    var arc = d3.arc()
                                .outerRadius(radius)
                                .innerRadius(radius - 60);

                    var pie = d3.pie()
                                .sort(null)
                                .value(function (d) { return d.Percent; });

                    d3.selectAll(id + " > *").remove();

                    var svg = d3.selectAll(id).append("svg")
                                .attr("width", width)
                                .attr("height", height)
                              .append("g")
                                .attr("transform", "translate(" + (width) / 2 + "," + (height) / 2 + ")");

                    var g = svg.selectAll(".arc")
                              .data(pie(data))
                            .enter().append("g")
                              .attr("class", "arc");

                    g.append("path")
                        .attr("d", arc)
                        .style("fill", function (d, i) { return color[i]; });

                    g.append("text")
                        .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
                        .attr("dy", ".4em")
                        .attr("text-anchor", "middle")
                        .attr("stroke", "#FFF")
                        .text(function (d) { return d.data.Percent + "%"; })
                        .style('font-size', '12px');

                    var legendRectSize = 10;
                    var legendSpacing = 7;
                    var legendHeight = 20;
                    var yScale = domain.length * 8;
                    var maxLength = domain.map(function (t) { return t.length }).max();
                    var xScale = maxLength * -4.3;

                    var legend = d3.selectAll(leg).append("svg")
                                   .attr("width", width)
                                   .attr("height", domain.length * 30)
                                   .append("g")
                                   .attr("transform", "translate(" + 0 + "," + 10 + ")");

                    var label = legend.selectAll(".label")
                                      .data(colorScale.domain())
                                      .enter().append('g')
                                      .attr("class", 'legend')
                                      .attr("transform", function (d, i) { return 'translate(' + 0 + ',' + i * legendHeight + ')'; });

                    label.append('rect')
                          .attr("width", legendRectSize)
                          .attr("height", legendRectSize)
                          .attr("rx", 20)
                          .attr("ry", 20)
                          .style("fill", colorScale)
                          .style("stroke", colorScale);

                    label.append('text')
                        .attr("x", 15)
                        .attr("y", 10)
                        .text(function (d) { return d; })
                        .style("fill", '#929DAF')
                        .style('font-size', '11px');

                }
            }
        };

        vm.Origens = {
            Data: [{
                Valor: 'Dia da Mulher',
                Descricao: 'Descontos de até 20% na indicação de uma amiga.',
                Periodo: '1 a 10 de Março',
                Percent: 28
            },{
                Valor: 'Febre Amarela',
                Descricao: 'Foco R1. Aluno ganha o Atualização em Infectologia 2016.',
                Periodo: '20 a 28 de Fevereiro',
                Percent: 22
            },{
                Valor: 'Wearables',
                Descricao: 'Foco R1 e R3.',
                Periodo: '10 a 20 de Fevereiro',
                Percent: 35
            }, {
                Valor: 'IBM Watson',
                Descricao: 'Foco Revalida.',
                Periodo: '05 a 10 de Fevereiro',
                Percent: 15
            }],
            Init: function () {
                vm.Graficos.Donut.D3(vm.Origens.Data, '#donut-campaign-leads', 'second', '.campaign-leads-legend');
            }
        };

        vm.options = {
            speed: 700,
            autoplay: 8000,
            autoplayDisableOnInteraction: false
        };

        $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
            $scope.slider = data.slider;

            vm.Origens.Init();
        });

        $scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {
            $scope.activeIndex = data.slider.activeIndex;
            $scope.previousIndex = data.slider.previousIndex;
        });
    };

})();