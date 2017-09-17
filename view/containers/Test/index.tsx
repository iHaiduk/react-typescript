import {ButtonComponent} from "_components/ButtonComponent";
import {IconComponent} from "_components/IconComponent";
import {ImageComponent} from "_components/ImageComponent";
import {LinkComponent} from "_components/LinkComponent";
import {PureComponent} from "_components/PureComponent";
import {SelectComponent} from "_components/SelectComponent";
import {component} from "_style";
import {List} from "immutable";
import * as React from "react";
import {IHelloProps} from "./interface";

export class Test extends React.Component<IHelloProps, undefined> {

    public static defaultProps: IHelloProps = {
        compiler: "Test",
        framework: "work",
    };

    constructor(props: IHelloProps) {
        super(props);
    }

    public render() {

        // Icon
        const styleIcon = {
            [component.icon]: true,
            [component["icon--white"]]: false,
            [component["icon--red"]]: true,
        };

        // Select
        const styleSelect = {
            [component.select]: true,
        };
        const selectOptions = List([
            {
                label: "One",
                value: "one",
            },
            {
                label: "Two",
                value: "two",
            },
        ]);

        // Image
        const imageCustom = List([
            {src: "http://via.placeholder.com/350x150?text=custom1", media: "(min-width: 1367px) and (max-width: 1920px)"},
            {src: "http://via.placeholder.com/350x150?text=custom2", media: "(min-width: 769px) and (max-width: 1366px)"},
        ]);

        return (
            <PureComponent>
                {this.props.children}
                <PureComponent tag="section">
                    List of components
                </PureComponent>
                <PureComponent tag="section">
                    Icons:
                    <IconComponent name="download" className={styleIcon} />
                </PureComponent>
                <PureComponent tag="section">
                    Selects default:
                    <SelectComponent className={styleSelect} options={selectOptions} />
                </PureComponent>
                <PureComponent tag="section">
                    Selects creatable:
                    <SelectComponent className={styleSelect} options={selectOptions} creatable={true} />
                </PureComponent>
                <PureComponent tag="section">
                    Image default:
                    <ImageComponent src={"image1.jpg"} alt={"Image Text"} />
                </PureComponent>
                <PureComponent tag="section">
                    On image default:
                    <ImageComponent src={"image1.jpg"} alt={"Image Text"} ones={true} />
                </PureComponent>
                <PureComponent tag="section">
                    One image custom:
                    <ImageComponent imgSrc={"http://via.placeholder.com/350x150?text=oneimage"} alt={"Image Text"} />
                </PureComponent>
                <PureComponent tag="section">
                    Image custom:
                    <ImageComponent imgSrc={"http://via.placeholder.com/350x150?text=custom"} alt={"Image Text"} custom={imageCustom} />
                </PureComponent>
                <PureComponent tag="section">
                    Default Link:
                    <LinkComponent href={"/"} title={"Home"} />
                </PureComponent>
                <PureComponent tag="section">
                    Link with icon:
                    <LinkComponent href={"/"} title={"Home"} icon={"download"} iconClass={styleIcon} />
                </PureComponent>
                <PureComponent tag="section">
                    Custom children in link:
                    <LinkComponent href={"/"}><ImageComponent src={"image1.jpg"} alt={"Image Text"} /></LinkComponent>
                </PureComponent>
                <PureComponent tag="section">
                    Default button:
                    <ButtonComponent title={"This is button"} />
                </PureComponent>
                <PureComponent tag="section">
                    Button with icon:
                    <ButtonComponent title={"This is button with icon"} icon={"download"} iconClass={styleIcon} />
                </PureComponent>
            </PureComponent>
        );
    }
}

export default Test;
