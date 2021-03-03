"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var LandingHeader_module_scss_1 = require("./LandingHeader.module.scss");
var LandingHeader = /** @class */ (function (_super) {
    __extends(LandingHeader, _super);
    function LandingHeader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LandingHeader.prototype.render = function () {
        return (<header className={LandingHeader_module_scss_1.default.header}>
        <div className={LandingHeader_module_scss_1.default.container}>
          <h1 className={LandingHeader_module_scss_1.default.title}>PartyPlanner.io</h1>
          <div className={LandingHeader_module_scss_1.default.headerButtons}>
            <button onClick={function () { console.log("Login button"); }} className={LandingHeader_module_scss_1.default.loginButton}>Login</button>
            <button onClick={function () { console.log("Register button"); }} className={LandingHeader_module_scss_1.default.registerButton}>Register</button>
          </div>
        </div>
      </header>);
    };
    return LandingHeader;
}(React.Component));
exports.default = LandingHeader;
