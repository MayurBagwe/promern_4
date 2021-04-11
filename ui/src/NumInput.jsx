import React from 'react';
function format(num) {
    return num != null ? num.toString() : '';
}
function unformat(str) {
    const val = parseInt(str, 10);
    return Number.isNaN(val) ? null : val;
}
export default class NumInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: format(props.value) };
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        console.log("Value ", e.target.value);
        if (e.target.value.match(/^\d*$/)) {
            this.setState({ value: e.target.value });
        }
    }
    onBlur(e) {
        console.log("Value ", e.target.value);
        const { onChange } = this.props;
        const { value } = this.state;
        onChange(e, unformat(value));
    }

    render() {
        const { value } = this.state;
        return (<input
            type="text"
            {...this.props}
            value={value}
            onBlur={this.onBlur}
            onChange={this.onChange}
        />
        );
    }
}