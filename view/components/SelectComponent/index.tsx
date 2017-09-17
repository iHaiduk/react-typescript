import {component} from "_style";
import * as cx from "classnames";
import {List} from "immutable";
import * as React from "react";
import * as Select from "react-select";
import {ISelectComponent} from "./interface";

export class SelectComponent extends React.Component<ISelectComponent, undefined> {

    public static defaultProps: ISelectComponent = {
        className: component.select,
        creatable: false,
    };

    public render() {

        const {className, creatable, options, ...otherProps} = this.props;
        const classes = cx(component.select, className);
        const SelectElement: Select.Creatable | any = creatable === true ? Select.Creatable : (Select as any).default;

        return (
            <SelectElement
                className={classes}
                options={options instanceof List ? options.toArray() : options}
                {...otherProps}
            />
        );

    }
}

export default SelectComponent;
