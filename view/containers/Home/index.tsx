import {changeCount} from "_actions";
import {Header} from "_blocks/Header";
import {IconComponent} from "_components/IconComponent";
import {PureComponent} from "_components/PureComponent";
import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {IHelloProps} from "./interface";

// Example image load
// const img = require('_images/log.png');

class HomeComponent extends React.Component<IHelloProps, undefined> {

    public static defaultProps: IHelloProps = {
        compiler: "Test",
        count: null,
        framework: "work",
    };

    constructor(props: IHelloProps) {
        super(props);
    }

    public render() {
        const {children, count} = this.props;
        return (
            <PureComponent>
                {children}
                <Header/>
                <PureComponent tag="main">
                    Main
                    <div>
                        <button onClick={changeCount}>Count click: {count.get("number")}</button>
                    </div>
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

export const Home = connect((state: IHelloProps) => ({ count: state.count }))(HomeComponent);
export default Home;
