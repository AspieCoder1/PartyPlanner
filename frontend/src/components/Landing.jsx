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
var Landing_module_scss_1 = require("./Landing.module.scss");
var LandingHeader_1 = require("./LandingHeader");
var landingImage_svg_1 = require("../img/landingImage.svg");
var Landing = /** @class */ (function (_super) {
    __extends(Landing, _super);
    function Landing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Landing.prototype.render = function () {
        return (<div>
        <LandingHeader_1.default />
        <div className={Landing_module_scss_1.default.container}>
          <h2 className={Landing_module_scss_1.default.title}>
            Take the stress out of party planning
          </h2>
          <p className={Landing_module_scss_1.default.paragraph}>
            We all know party planning is hard. But it does not have to be.
            PartyPlanner.io provides you with all the tools you need in order to
            have a stress-free party. So relax, get a drink and give
            PartyPlanner a try!
          </p>
          <button className={Landing_module_scss_1.default.button}>Get PartyPlanner</button>
          <landingImage_svg_1.default className={Landing_module_scss_1.default.img} src={landingImage_svg_1.default} alt=""/>
        </div>
      </div>);
    };
    return Landing;
}(React.Component));
exports.default = Landing;
