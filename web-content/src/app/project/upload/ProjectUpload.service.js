"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BackendAPI_service_1 = require("../../util/BackendAPI.service");
var Observable_1 = require("rxjs/Observable");
var Object_util_1 = require("../../util/Object.util");
var RemoteProject_model_1 = require("../model/RemoteProject.model");
var ProjectUploadService = /** @class */ (function () {
    function ProjectUploadService(backendAPIService) {
        this.backendAPIService = backendAPIService;
    }
    ProjectUploadService.prototype.pushFileToStorage = function (projectToUpload) {
        var _this = this;
        var reachId = projectToUpload.reachFile
            .filter(Object_util_1.isDefined)
            .map(function (reachFile) {
            var formData = new FormData();
            formData.append('reach', reachFile);
            return formData;
        }).flatMap(function (formData) {
            return _this.backendAPIService.postImage(formData);
        });
        this.backendAPIService.postProject(projectToUpload)
            .subscribe();
        return Observable_1.Observable.of(new RemoteProject_model_1.RemoteProject());
    };
    ProjectUploadService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [BackendAPI_service_1.BackendAPIService])
    ], ProjectUploadService);
    return ProjectUploadService;
}());
exports.ProjectUploadService = ProjectUploadService;
//# sourceMappingURL=ProjectUpload.service.js.map