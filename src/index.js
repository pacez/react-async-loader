/**
 * Authoer: pace_zhong@foxmail.com
 * Name: 'react-component-async-loader'
 * Desc: REACT组件异步加载器, 支持同时加载多个组件从export的组件库中。
 */
import React, { PureComponent } from "react";
import ReactDom from "react-dom";

// 加载default组件
export default (importComponent,Loading) => {
    class AsyncComponent extends PureComponent {
        state = {
            Component: null
        };

        async componentDidMount() {
            this.setState({
                loading: true
            });

            const { default: Component } = await importComponent();

            this.setState({ loading: false, Component });
        }

        render() {
            const { Component, loading } = this.state;

            return (
                <React.Fragment>
                    {Loading && loading && ReactDom.createPortal(<Loading />, document.body)}
                    {Component ? <Component {...this.props} /> : null}
                </React.Fragment>
            );
        }
    }

    return AsyncComponent;
};

// 加载单module组件
export function asyncMoudleComponent(key, importMoudles, Loading) {
    class AsyncComponent extends PureComponent {
        state = {
            Component: null
        };

        async componentDidMount() {
            this.setState({
                loading: true
            });

            const moudles = await importMoudles();
            let Component = null;

            if (moudles && moudles[key]) {
                Component = moudles[key];
            }

            this.setState({ loading: false, Component });
        }

        render() {
            const { Component, loading } = this.state;

            return (
                <React.Fragment>
                    {Loading && loading && ReactDom.createPortal(<Loading />, document.body)}
                    {Component ? <Component {...this.props} /> : null}
                </React.Fragment>
            );
        }
    }

    return AsyncComponent;
}

// 同一个组件库加载多个module组件
export function asyncMoudleComponents(keys, importMoudles,Loading) {
    const components = {};

    keys.map(key => {
        components[key] = asyncMoudleComponent(key, importMoudles, Loading)
    })

    return components;
}
