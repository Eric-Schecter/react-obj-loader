"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoaderHandler = void 0;
var three_1 = require("three");
var gltf_1 = require("./gltf");
var obj_1 = require("./obj");
var stl_1 = require("./stl");
var LoaderHandler = (function () {
    function LoaderHandler(fileList) {
        var _this = this;
        this.loaders = {};
        this.getRenderObjs = function (files) {
            return Promise.all(files.map(function (file) {
                var key = Object.keys(_this.loaders)
                    .filter(function (key) { return file.endsWith("." + key); })[0];
                return key ? _this.loaders[key].load(file) : null;
            }));
        };
        var manager = new three_1.LoadingManager();
        manager.setURLModifier(function (url) {
            var baseURL = three_1.LoaderUtils.extractUrlBase(url);
            var path = url.replace(baseURL, '');
            return fileList.has(path)
                ? fileList.get(path)
                : url;
        });
        this.loaders['gltf'] = new gltf_1.LoaderGLTF(manager);
        this.loaders['obj'] = new obj_1.LoaderObj(manager, fileList);
        this.loaders['stl'] = new stl_1.LoaderSTL(manager);
    }
    return LoaderHandler;
}());
exports.LoaderHandler = LoaderHandler;
