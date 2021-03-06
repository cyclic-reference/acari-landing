"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var animations_1 = require("@angular/platform-browser/animations");
var app_component_1 = require("./app.component");
var http_1 = require("@angular/http");
var BackendAPI_service_1 = require("./util/BackendAPI.service");
var http_2 = require("@angular/common/http");
var Project_module_1 = require("./project/Project.module");
var window_1 = require("./util/window");
var auth_module_1 = require("./auth/auth.module");
var common_1 = require("@angular/common");
var konami_directive_1 = require("./util/konami.directive");
var Welcome_module_1 = require("./welcome/Welcome.module");
var loading_indicator_module_1 = require("./loading/loading.indicator.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                http_2.HttpClientModule,
                animations_1.BrowserAnimationsModule,
                Project_module_1.ProjectModule,
                auth_module_1.AuthModule,
                common_1.CommonModule,
                loading_indicator_module_1.LoadingIndicatorModule,
                Welcome_module_1.WelcomeModule
            ],
            exports: [
                router_1.RouterModule
            ],
            declarations: [
                app_component_1.AppComponent,
                konami_directive_1.KonamiDirective
            ],
            bootstrap: [app_component_1.AppComponent],
            providers: [
                BackendAPI_service_1.BackendAPIService, window_1.WindowRef
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map