import React, {Suspense, useState, useEffect} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import 'antd/dist/antd.css'
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Breadcrumb, Layout, Menu} from 'antd';



import {LoginPage} from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/preloader";
import {UsersPage} from "./components/Users/UsersConteiner";

import {Button} from "antd";

import {AnyAction} from "redux";

import {Header} from "./components/Header/Header";
import {initializedApp} from "./redux/auth-selectors";
import {Github} from "./components/Github/Github";
import Forms from "./Ultimate-forms/Forms";

//import Music from './components/Music/Music';
//import News from './components/News/News';
//import Settings from './components/Settings/Settings';

const DialogsConteiner = React.lazy(() => import('./components/Dialogs/Dialogs-conteiner'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'));







const {Content, Footer, Sider} = Layout;




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
    getItem(<Link to='/profile'>Profile</Link>, '1', <UserOutlined/>),
    getItem(<Link to='/users'>Users</Link>, '2', <TeamOutlined/>),
    getItem(<Link to='/dialogs'>Messages</Link>, '3', <DesktopOutlined/>),

    getItem(<Link to='/git'>GIT</Link>, '4', <PieChartOutlined/>),
    getItem(<Link to='/chat'>Chat</Link>, '5', <TeamOutlined/>),
    getItem(<Link to='/forms/*'>Forms</Link>, '6', <FileOutlined/>),
];

const App = () => {


    const initialized = useSelector(initializedApp)

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

            <div>
                {/*<HeaderContainer/>*/}
                {/*<Navbar/>*/}
                <div>
                    <Suspense fallback={<Preloader/>}>

                        <Layout style={{minHeight: '100vh'}}>
                            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>

                                <div className="logo">
                                    REACT
                                <img src={ "https://www.shareicon.net/download/2016/07/08/117367_logo.ico"}  alt={"React"}/>
                                    </div>

                                <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline" items={items}/>

                            </Sider>
                            <Layout className="site-layout">
                               <Header/>

                                <Content style={{margin: '-10px 20px'}}>
                                    <Breadcrumb style={{margin: '16px 0'}}>
                                        {/*<Breadcrumb.Item>User</Breadcrumb.Item>*/}
                                        {/*<Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                                    </Breadcrumb>
                                    <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                                        <Routes>
                                            <Route path="/dialogs/*" element={<DialogsConteiner/>}/>
                                            <Route path="/profile/:userId" element={<ProfileContainer/>}/>
                                            <Route path="/profile/*" element={<ProfileContainer/>}/>
                                            <Route path="/users" element={<UsersPage pageTitle={"All users:"}/>}/>
                                            <Route path="/login" element={<LoginPage/>}/>
                                            <Route path="/chat" element={<ChatPage/>}/>
                                            <Route path="/git" element={<Github/>}/>
                                            <Route path="/forms/*" element={<Forms/>}/>
                                            <Route path="/*" element={
                                                <div>NOT FOUND
                                                    <Button>OK</Button>
                                                </div>
                                            }/>
                                        </Routes>
                                    </div>
                                </Content>
                                <Footer style={{textAlign: 'center'}}>Social Network © 2022 Created by Dimasik69 </Footer>
                            </Layout>
                        </Layout>


                    </Suspense>
                </div>
            </div>
        );
    }
}


export default App
