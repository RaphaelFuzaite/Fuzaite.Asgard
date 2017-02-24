(function () {
    'use strict';

    angular
        .module('starter')
        .controller('VendasController', VendasController);

    VendasController.$inject = ['$scope', '$timeout', '$interval', 'UtilFactory'];

    function VendasController($scope, $timeout, $interval, UtilFactory) {

        var vm = this;
        vm.DataUltimaAtualizacao = new Date();

        vm.Graficos = {
            Donut: {
                D3: function (data, id, pantone, leg) {

                    var margin = { left: 20, bottom: 20, top: 20, right: 20 },
                        width = angular.element("#svg-d3-donut").width(),
                        height = angular.element("#svg-d3-donut").width() * 0.6,
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

                    var color = ["#A05EBE", "#6EBEDC", "#00C7B1", "#00A9CE"];
                    //var color = ["#960061", "#D50032", "#FF5C39", "#FF9600", "#FFC800"];

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
            },
            Radial: {
                D3: function (data, id, pantone) {

                    var margin = { left: 20, bottom: 20, top: 20, right: 20 },
                        width = angular.element("#svg-d3-radial").width(),
                        height = angular.element("#svg-d3-radial").width() * 0.7,
                        radius = Math.min(width, height) / 2,
                        color = '#00C7B1',
                        colorBackground = '#EFEFEF';

                    var arc = d3.arc()
                                .innerRadius(radius)
                                .outerRadius(radius - 30)
                                .cornerRadius(20)
                                .startAngle(-160 * (Math.PI / 180));

                    var svg = d3.select(id).append("svg")
                      .attr("width", width)
                      .attr("height", height);

                    var scale = d3.scaleLinear()
                              .domain(d3.extent([0, data.Total], function (d) { return d; }))
                              .range([-160, 160]);

                    var angle = scale(data.Valor);

                    var g = svg.append("g")
                               .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
                               .attr("class", "svg-radial");

                    var background = g.append("path")
                      .datum({
                          startAngle: -160 * (Math.PI) / 180,
                          endAngle: 160 * (Math.PI) / 180
                      })
                      .style("fill", colorBackground)
                      .attr("d", arc);

                    var foreground = g.append("path")
                      .datum({
                          endAngle: -160 * (Math.PI) / 180
                      })
                      .style("fill", "url(#gradient)")
                      .attr("d", arc);

                    foreground.transition()
                      .duration(750)
                      .call(arcTween, angle * (Math.PI) / 180);

                    d3.formatDefaultLocale({
                        "decimal": ",",
                        "thousands": ".",
                        "grouping": [3],
                        "currency": ["R$ ", ""]
                    });

                    var gradient = svg.append("svg:defs")
                                      .append("svg:linearGradient")
                                      .attr("id", "gradient")
                                      .attr("x1", "0%")
                                      .attr("y1", "100%")
                                      .attr("x2", "100%")
                                      .attr("y2", "100%")
                                      .attr("spreadMethod", "pad");

                    gradient.append("svg:stop")
                            .attr("offset", "0%")
                            .attr("stop-color", "#00A9CE")
                            .attr("stop-opacity", 1);

                    gradient.append("svg:stop")
                            .attr("offset", "100%")
                            .attr("stop-color", "#00C7B1")
                            .attr("stop-opacity", 1);

                    var text = svg.append("text")
                                   .text(d3.format("$,.0f")(data.Valor))
                                   .style("font-size", function () { return this.getComputedTextLength() * 0.3 + "px"; })
                                   .attr("x", function () { return ((width / 2)) - (this.getComputedTextLength() / 2); })
                                   .attr("y", height / 2);

                    var percent = svg.append("text")
                                   .text(d3.format(".0%")(Math.abs(data.Valor / data.Total)))
                                   .style("font-size", function () { return this.getComputedTextLength() * 0.4 + "px"; })
                                   .attr("x", function () { return ((width / 2)) - (this.getComputedTextLength() / 2); })
                                   .attr("y", (height / 2) + 30)
                                   .style("fill", "#AAA");

                    var icon = svg.append("text")
                                   .attr("class", "icon")
                                   .attr("x", (width / 2) - 10)
                                   .attr("y", height - 50)
                                   .style("fill", "#FFC800")
                                   .text("\uf091");

                    var meta = svg.append("text")
                                  .attr("class", "font-small")
                                  .text(d3.format("$,.0f")(data.Total))
                                  .attr("x", function () { return ((width / 2)) - (this.getComputedTextLength() / 2); })
                                  .attr("y", height - 30);

                    function arcTween(transition, newAngle) {
                        transition.attrTween("d", function (d) {
                            var interpolate = d3.interpolate(d.endAngle, newAngle);

                            return function (t) {
                                d.endAngle = interpolate(t);
                                return arc(d);
                            };
                        });
                    }
                }
            }
        };

        vm.TotalEmVendas = {
            Data: {
                Total: 358669.55,
                Ecommerce: 19902.02,
                Empresa: 468767.53
            }
        };

        vm.VendasPorOrigem = {
            Init: function () {
                var data = [
                    { Valor: "Empresa", Total: 468767.53, Percent: 95.92 },
                    { Valor: "E-commerce", Total: 19902.02, Percent: 4.03 }
                ];
                vm.Graficos.Donut.D3(data, '#donut-sales-source', 'second', '.sales-source-legend');
            }
        };

        vm.ProximaMeta = {
            Data: {},
            Init: function () {

                vm.ProximaMeta.Data.Valor = vm.TotalEmVendas.Data.Total;
                var proximaMeta = vm.MetaDiaria.Data[vm.MetaDiaria.Data.length - 1].Meta;

                if (vm.MetaDiaria.Data.some(function (t) { return t.Meta > vm.ProximaMeta.Data.Valor })) {
                    proximaMeta = vm.MetaDiaria.Data.filter(function (t) { return t.Meta > vm.ProximaMeta.Data.Valor })[0].Meta;
                }

                vm.ProximaMeta.Data.Total = proximaMeta;

                vm.Graficos.Radial.D3(vm.ProximaMeta.Data, '#donut-diary-goal', 'second');
            }
        };

        vm.MetaDiaria = {
            Data: [],
            PercentualAtual: 0,
            HoraAtual: new Date().getHours(),
            Init: function () {

                for (var i = 8; i <= 21; i += 1 ) {
                    vm.MetaDiaria.Data.push({
                        id: i,
                        Titulo: i,
                        Meta: (vm.MetaDiaria.Data.length + 1) * 38000
                    });
                }

                vm.MetaDiaria.PercentualAtual = Math.ceil( vm.TotalEmVendas.Data.Total / vm.MetaDiaria.Data[vm.MetaDiaria.Data.length - 1].Meta * 100);
                angular.element('.progress').progress({ value: vm.MetaDiaria.PercentualAtual });

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

        vm.options = {
            speed: 700,
            autoplay: 10000,
            autoplayDisableOnInteraction: false
        };

        $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
            $scope.slider = data.slider;

            vm.VendasPorOrigem.Init();
            vm.MetaDiaria.Init();
            vm.ProximaMeta.Init();

        });

        $scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {
            $scope.activeIndex = data.slider.activeIndex;
            $scope.previousIndex = data.slider.previousIndex;
        });

    };

})();