import React, { Component } from 'react';
import { render } from 'react-dom';
import permission, { setUserPermissions, withPermission } from './index';

permission.settings({
    transformData(data) {
        return data;
    }
});

var promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([1, 2, 'A']);
    }, 3000);
});

permission.setUserPermissionsAsync(promise);

permission.getUserPermissionsAsync((p) => {
    console.log('UserPermissions: ', p);
});

@permission((num, el) => {
    console.log('---------------------------', el);
    
    return React.cloneElement(el, { style: { color: 'red' } });
})
class MyComponent extends Component {

    state = {
        data: []
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: ['A', 'B', 'C']
            }, () => {
                // this.forceUpdate();
            });
        }, 2000);
        
        // setTimeout(() => {
        //     this.setState({
        //         dataSource: [{
        //             key: '1',
        //             name: '胡彦斌1',
        //             age: 32,
        //             address: '西湖区湖底公园1号'
        //         }, {
        //             key: '2',
        //             name: '胡彦祖2',
        //             age: 42,
        //             address: '西湖区湖底公园2号'
        //         }, {
        //             key: '3',
        //             name: '胡彦祖3',
        //             age: 52,
        //             address: '西湖区湖底公园3号'
        //         }]
        //     });
        // }, 1000);
    }

    renderData(data) {
        return data.map((data, index) => {
            return (
                <div key={index + 1}>
                    <p>Function Map {data}</p>
                    <a  href="#">{index + 1}</a>
                </div>
            );
        });
    }

    render() {
        return (
            <div id="0" name="div__">
                <h1 type="text" data-permission="5">Denied</h1>
                <div id="1" name="subcomponent0____" data-permission={['1']}>
                    <h1>MyComponent</h1>
                    { this.renderData(this.state.data) }
                </div>
                <SubComponent1 id="2" name="subcomponent1____"  permission={52} disable={false} />
                <SubComponent2 id="3" name="subcomponent2____">
                    <div data-permission="6">sc2</div>
                    <SubComponent1 />
                </SubComponent2>
                {/* <Table dataSource={this.state.dataSource} >
                    <Column
                        title="姓名"
                        dataIndex="name"
                        key="name"
                    />
                    <Column
                        title="年龄"
                        dataIndex="age"
                        key="age"
                    />
                    <Column
                        title="住址"
                        dataIndex="address"
                        key="address"
                        render={(text, record, index) => {
                            var Wrapper = RenderWrapper(
                                <span permission={index + 1}>
                                    <a href="javascript:;">{text}</a>
                                </span>
                            );
                            return <Wrapper />;
                        }}
                    />
                </Table> */}
            </div>
        );
    }
} 

@permission()
class SubComponent1 extends Component {
    
    state =  {
        data: []
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({
        //         data: ['A', 'B', 'C']
        //     });
        // }, 5000);
    }

    renderDate(data = []) {
        return data.map((data, index) => {
            return (<div permission={data}>
                <a href="#">{data}</a>
            </div>);
        });
    }
    
    render() {
        return (
            <div>
                SubComponent1
                <h1 data-permission={[1, 2, 3]}>SubComponent1.h1</h1>
                <p>
                    SubComponent1.p1
                    <span>SubComponent1.disable: {this.props.disable ? 'DISABLE' : 'ENABLE' }</span>    
                </p>
                { this.renderDate(this.state.data) }
            </div>
        );
    }
} 

function SubComponent2(props) {
    return (
        <div>
            <h1>SubComponent2</h1>
            { props.children }
        </div>
    );
}

function SubComponent3(props) {
    return (
        <div>
            <h1>SubComponent3</h1>
            <p>deny</p>
            { props.children }
        </div>
    );
}

var T = withPermission((props) => {
    return (
        <p id="1" name="P">
            <a permission="1" href="#">Hello1 </a>
            <a permission="2" href="#">HelloB </a>
        </p>
    );
});

render(
    <MyComponent />,
    document.getElementById('app')
);
