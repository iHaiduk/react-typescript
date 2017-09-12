import {IconComponent} from "_components/Icon";
import {PureComponent} from "_components/PureComponent";
import {component, sectionStyle} from "_style";
import * as React from "react";
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

        const styleIcon = {
            [component.icon]: true,
            [component["icon--white"]]: true,
        };

        return (
            <PureComponent>
                {this.props.children}
                <PureComponent tag="section">
                    List of components
                </PureComponent>
                <PureComponent tag="section">
                    Componetns:
                    <IconComponent name="download" className={styleIcon} />
                </PureComponent>
            </PureComponent>
        );
    }
}

export default Test;
