(function () {
    'use strict';

    angular
        .module('starter')
        .controller('MetasController', MetasController);

    MetasController.$inject = ['$scope', '$timeout', '$interval', 'UtilFactory'];

    function MetasController($scope, $timeout, $interval, UtilFactory) {

        var vm = this;
        vm.DataUltimaAtualizacao = new Date();

        vm.Graficos = {
            Radial: {
                D3: function (data, id, pantone) {

                    var margin = { left: 20, bottom: 20, top: 20, right: 20 },
                        width = angular.element("#svg-d3-radial").width(),
                        height = angular.element("#svg-d3-radial").width() * 0.8,
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
		
        vm.ProximaMeta = {
            Data: {},
            Init: function () {

                vm.ProximaMeta.Data.Valor = vm.TotalEmVendas.Data.Total;
                var proximaMeta = vm.MetaDiaria.Data[vm.MetaDiaria.Data.length - 1].Meta;

                if (vm.MetaDiaria.Data.some(function (t) { return t.Meta > vm.ProximaMeta.Data.Valor })) {
                    proximaMeta = vm.MetaDiaria.Data.filter(function (t) { return t.Meta > vm.ProximaMeta.Data.Valor })[0].Meta;
                }

                vm.ProximaMeta.Data.Total = proximaMeta;

                //vm.Graficos.Radial.D3(vm.ProximaMeta.Data, '#donut-diary-goal', 'second');
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

        vm.MetaDiaria.Init();
        vm.ProximaMeta.Init();

    };

})();