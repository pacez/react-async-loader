/**
 * Authoer: pace_zhong@foxmail.com
 * Name: 'react-context-hocconsumer'
 * Desc: 基于React.createContext实现的Consumer高阶组件. 将上下文注入到组件的props中。
 * Usage: 推荐修饰器用法，@Consumer, 组件从props中获取注入的上下文,默认挂载点统一为store，如果使用了contextParser，按照contextParser解析结构挂载props.
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
