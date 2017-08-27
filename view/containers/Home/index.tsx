import {Header} from "_blocks/Header";
import {IconComponent} from "_components/Icon";
import {PureComponent} from "_components/PureComponent";
import {sectionStyle} from "_style";
import * as React from "react";
import {Link} from "react-router-dom";
import {IHelloProps} from "./interface";

// Example image load
// const img = require('_images/log.png');

@sectionStyle
export class Home extends React.Component<IHelloProps, undefined> {

    public static defaultProps: IHelloProps = {
        compiler: "Test",
        framework: "work",
    };

    constructor(props: IHelloProps) {
        super(props);
    }

    public render() {
        return (
            <PureComponent>
                {this.props.children}
                <Header/>
                <PureComponent tag="main">
                    Main
                    <IconComponent name="download" />
                    <Link to={"/"}>Home</Link>
                    <Link to={"/test"}>test</Link>
                </PureComponent>
                <PureComponent tag="footer">
                    Footer
                </PureComponent>
            </PureComponent>
        );
    }
}
export default Home;
