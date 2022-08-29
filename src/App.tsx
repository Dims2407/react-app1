import React, {Suspense, useState, useEffect} from 'react';
import {Link, NavLink, Route, Routes} from 'react-router-dom';
//import './App.css';
import 'antd/dist/antd.css'


import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {Avatar, Breadcrumb, Col, Layout, Menu, Row} from 'antd';


import Navbar from './components/Navbar/Navbar';
import {LoginPage} from "./components/Login/Login";
import HeaderContainer from "./components/Header/HeaderContainer";
import {useDispatch, useSelector} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/preloader";
import {UsersPage} from "./components/Users/UsersConteiner";

import {Button} from "antd";
import {AppStateType} from "./redux/redux-store";
import {AnyAction} from "redux";
import s from "./components/Navbar/Navbar.module.css";
//import Music from './components/Music/Music';
//import News from './components/News/News';
//import Settings from './components/Settings/Settings';

const DialogsConteiner = React.lazy(() => import('./components/Dialogs/Dialogs-conteiner'));
//import DialogsConteiner from './components/Dialogs/Dialogs-conteiner';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
//import ProfileContainer from "./components/Profile/ProfileContainer";


//const UsersPage = React.lazy(() => import('./components/Users/UsersConteiner'));

//import UsersConteiner from "./components/Users/UsersConteiner";
//const Login = React.lazy(() => import('./components/Login/Login'));

const { Header, Content, Footer, Sider } = Layout;






//     <NavLink to='/profile'>Profile</NavLink>

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items = [
    getItem(<Link to='/profile'>Profile</Link>, '1', <PieChartOutlined />),
    getItem(<Link to='/users'>Users</Link>, '2', <DesktopOutlined />),
    getItem(<Link to='/dialogs'>Messages</Link>, '3', <DesktopOutlined />),

    getItem(<Link to='/"*"'>Options</Link>, 'sub1', <UserOutlined />),
    getItem('Team', 'sub2', <TeamOutlined />),
    getItem('Files', '10', <FileOutlined />),
];

const App = () => {


    const initialized = useSelector((state: AppStateType) => state.app.initialized)

    const dispatch = useDispatch()

    const _initializeApp = (initialized: boolean) => {
        dispatch(initializeApp() as unknown as AnyAction)
    }



    useEffect(() => {
        _initializeApp(initialized)
    }, [])
    {
        const [collapsed, setCollapsed] = useState(false);
        return (

            <div >
                {/*<HeaderContainer/>*/}
                {/*<Navbar/>*/}
                <div>
                    <Suspense fallback={<Preloader/>}>

                        <Layout style={{ minHeight: '100vh' }}>
                            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>

                                <div className="logo" />

                                <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline" items={items} />

                            </Sider>
                            <Layout className="site-layout">
<Row>
    <Col span={20}>
    <Header className="site-layout-background" style={{ padding: 0 }} />
    </Col>
    <Col span={4} >
    <Avatar  style={{ backgroundColor: '#87d068', position: "absolute", top: "25%",  left: "20%" }} icon={<UserOutlined />} />
    </Col>
</Row>

                                <Content style={{ margin: '0 16px' }}>
                                    <Breadcrumb style={{ margin: '16px 0' }}>
                                        {/*<Breadcrumb.Item>User</Breadcrumb.Item>*/}
                                        {/*<Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                                    </Breadcrumb>
                                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                         <Routes>
                                             <Route path="/dialogs/*" element={<DialogsConteiner/>}/>
                                            <Route path="/profile/:userId" element={<ProfileContainer/>}/>
                                            <Route path="/profile/*" element={<ProfileContainer/>}/>
                                           <Route path="/users" element={<UsersPage pageTitle={"All users:"}/>}/>
                                            <Route path="/login" element={<LoginPage/>}/>
                                           <Route path="*" element={
        <div>NOT FOUND
           <Button>OK</Button>
        </div>
     }/>
 </Routes>
                                    </div>
                                </Content>
                                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                            </Layout>
                        </Layout>




                    </Suspense>
                </div>
            </div>
        );
    }
}


export default App
