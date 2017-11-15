"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Project_model_1 = require("./Project.model");
var RemoteProject = /** @class */ (function (_super) {
    __extends(RemoteProject, _super);
    function RemoteProject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RemoteProject.prototype.isLocal = function () {
        return false;
    };
    RemoteProject.prototype.isRemote = function () {
        return true;
    };
    return RemoteProject;
}(Project_model_1.Project));
exports.RemoteProject = RemoteProject;
//# sourceMappingURL=RemoteProject.model.js.map