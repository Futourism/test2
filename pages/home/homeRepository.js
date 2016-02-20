/*jslint node: true */
"use strict";

var MemoryCache = require("../../common/memoryCache");
var ConfigDummyData = require("../../apiDummy/config");

var getConfigFromDB = function (req, callback) {
    var docs = ConfigDummyData.fetch();
    
    callback(docs);
};

var repository = {
    getConfig: function (req, callback) {
        MemoryCache.dbWrapper("db-config", getConfigFromDB, req, callback);
    }
};

module.exports = repository;