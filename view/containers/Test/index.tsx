import {Header} from "_blocks/Header";
import {PureComponent} from "_components/PureComponent";
import {sectionStyle} from "_style";
import * as React from "react";
import {Link} from "react-router-dom";
import {IHelloProps} from "./interface";

@sectionStyle
export class Test extends React.Component<IHelloProps, undefined> {

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
                    Main Test
                    <Link to={"/"}>Home</Link>
                    <Link to={"/test"}>test</Link>
                </PureComponent>
                <PureComponent tag="footer">
                    Footer Test`
                </PureComponent>
            </PureComponent>
        );
    }
}

export default Test;