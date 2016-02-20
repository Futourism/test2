/*jslint node: true */
"use strict";

var data = [{
        title: "TCOM"
    }];

var configDummyData = {
    fetch: function () {
        return data;
    }
};

module.exports = configDummyData;