"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
function handler(pageName) {
    return "const page = require(\"./" + pageName + "\");\n\nmodule.exports = async function (context) {\n    await page.render(context.bindings.req, context.res);\n};";
}
exports.handler = handler;
function functionJson(page) {
    return JSON.stringify({
        bindings: [
            {
                authLevel: "anonymous",
                type: "httpTrigger",
                direction: "in",
                name: "req",
                methods: ["get"],
                route: page.processedRoute
            },
            {
                type: "http",
                direction: "out",
                name: "res"
            }
        ]
    });
}
exports.functionJson = functionJson;
function hostJson() {
    return JSON.stringify({
        version: "2.0",
        extensions: {
            http: {
                routePrefix: ""
            }
        }
    });
}
exports.hostJson = hostJson;
function proxiesJson(assetsUrl, pages) {
    var pageProxies = {};
    // Generate proxies for static pages
    for (var _i = 0, _a = pages.filter(function (p) { return p.isStatic && !p.isSpecial; }); _i < _a.length; _i++) {
        var p = _a[_i];
        pageProxies["proxy_" + p.identifier] = {
            matchCondition: {
                methods: ["GET"],
                route: p.route
            },
            backendUri: url_1.resolve(assetsUrl, "_next/pages/" + p.targetPageFileName)
        };
    }
    // Add proxies for static assets
    return JSON.stringify({
        proxies: __assign({ page_assets: {
                matchCondition: {
                    methods: ["GET"],
                    route: "_next/{*asset}"
                },
                backendUri: assetsUrl + "_next/{asset}"
            }, static_assets: {
                matchCondition: {
                    methods: ["GET"],
                    route: "static/{*asset}"
                },
                backendUri: assetsUrl + "public/static/{asset}"
            }, robot_txt: {
                matchCondition: {
                    methods: ["GET"],
                    route: "robots.txt"
                },
                backendUri: assetsUrl + "public/robots.txt"
            }, sitemap_xml: {
                matchCondition: {
                    methods: ["GET"],
                    route: "sitemap.xml"
                },
                backendUri: assetsUrl + "public/sitemap.txt"
            } }, pageProxies)
    });
}
exports.proxiesJson = proxiesJson;
//# sourceMappingURL=templates.js.map