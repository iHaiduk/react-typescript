import {exec} from "child_process";
import {resolve} from "path";
import * as React from "react";
import {renderToStaticMarkup} from "react-dom/server";
import * as renderer from "react-test-renderer";

test("PureComponent render test - Development", (done) => {

    const otput = resolve(__dirname, "../../../.gulp/test/PureComponent");
    const component = resolve(__dirname, "../../../view/components/PureComponent/index.tsx");
    const webpack = resolve(__dirname, "../../../node_modules/.bin/webpack");
    const config = resolve(__dirname, "../../../webpack/webpack.config.dev.js");

    exec(`rm -rf ${otput}/*`, (error, stdout, stderr) => {
        exec(`TEMP_DIR=${otput} TEMP_NAME=${component} ${webpack} --config ${config}`, (error, stdout, stderr) => {
            const PureComponent = require(otput + "/bundle.js").PureComponent;
            const myComponent = renderer.create(<PureComponent/>);
            const stringStatic = renderToStaticMarkup(<PureComponent/>);
            const element = myComponent.toJSON();
            expect(element).toMatchSnapshot();
            expect(stringStatic).toBe("<div></div>");
            done();
        });
    });

}, 20000);

test("PureComponent render test - Production", (done) => {

    const otput = resolve(__dirname, "../../../.gulp/test/PureComponent");
    const component = resolve(__dirname, "../../../view/components/PureComponent/index.tsx");
    const webpack = resolve(__dirname, "../../../node_modules/.bin/webpack");
    const config = resolve(__dirname, "../../../webpack/webpack.config.prod.js");

    exec(`rm -rf ${otput}/*`, (error, stdout, stderr) => {
        exec(`TEMP_DIR=${otput} TEMP_NAME=${component} ${webpack} --config ${config}`, (error, stdout, stderr) => {
            const PureComponent = require(otput + "/bundle.js").PureComponent;
            const myComponent = renderer.create(<PureComponent/>);
            const stringStatic = renderToStaticMarkup(<PureComponent/>);
            const element = myComponent.toJSON();
            expect(element).toMatchSnapshot();
            expect(stringStatic).toBe("<div></div>");
            done();
        });
    });

}, 20000);
