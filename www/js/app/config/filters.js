(function () {
    'use strict';

    angular
        .module('starter')
        .filter('byteNotation', byteNotation)
        .filter('cut', cut)
        .filter('initials', initials);

    function byteNotation() {
        return function (bytes, precision, prefix) {
            if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
            if (typeof precision === 'undefined') precision = 1;
            var units = ['', 'K', 'M', 'G', 'T', 'P'],
                number = Math.floor(Math.log(bytes) / Math.log(1000));
            return (prefix || '') + (bytes / Math.pow(1000, Math.floor(number))).toFixed(precision) + ' ' + units[number];
        };
    }

    function cut() {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }

                var lastdash = value.lastIndexOf('-');
                if (lastdash != -1) {
                    value = value.substr(0, lastdash);
                }
            }

            return value + (tail || '…');
        };
    };

    function initials() {
        return function (input) {
            var name = input;
            var inls = name.match(/\b\w/g) || [];
            inls = ((inls.shift() || '') + (inls.pop() || '')).toUpperCase();
            return inls;
        };
    };

})();