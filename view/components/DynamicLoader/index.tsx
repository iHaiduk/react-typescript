import * as React from "react";

interface IBundleProps {
    componentName: any;
    componentProps?: any;
    children?: React.ReactNode;
}

interface IBundleState {
    mod: boolean | React.ComponentClass<any>;
}

class Bundle extends React.Component<IBundleProps, IBundleState> {

    public state = {mod: false};

    constructor(props: IBundleProps) {
        super(props);
    }

    public componentWillMount() {
        if (process.env.BROWSER) {
            this.load(this.props.componentName);
        }
    }

    public componentWillReceiveProps(nextProps: IBundleProps) {
        if (process.env.BROWSER) {
            if (nextProps.componentName !== this.props.componentName) {
                this.load(nextProps.componentName);
            }
        }
    }

    public render() {
        if (!process.env.BROWSER) {
            let mod = this.props.componentName;
            mod = (mod as any).default || mod[Object.keys(mod)[0]] || mod;
            return React.createElement(mod, this.props.componentProps);
        } else {
            return this.state.mod && React.createElement(this.state.mod as any, this.props.componentProps);
        }
    }

    private async load(componentName: string) {
        if (process.env.BROWSER) {
            this.setState({mod: false});
            try {
                const mod = await this.props.componentName;
                this.setState({mod: (mod as any).default || mod[Object.keys(mod)[0]] || mod});
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default Bundle;
