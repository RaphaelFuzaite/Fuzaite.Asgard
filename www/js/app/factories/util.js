(function () {

    'use strict';

    angular
        .module('starter')
        .factory('UtilFactory', UtilFactory);

    UtilFactory.$inject = [];

    function UtilFactory() {

        var util = {
            StringFormat: StringFormat
        };

        Array.prototype.max = function () {
            return Math.max.apply(null, this);
        };

        Array.prototype.min = function () {
            return Math.min.apply(null, this);
        };

        return util;

        function StringFormat() {
            var s = arguments[0];
            for (var i = 0; i < arguments.length - 1; i++) {
                var reg = new RegExp("\\{" + i + "\\}", "gm");
                s = s.replace(reg, arguments[i + 1]);
            }
            return s;
        }
    }
})();