import React from 'react';
import {Link} from "react-router-dom";
import {Avatar, Button, Col, Layout, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUserLogin, selectIsAuth} from "../../redux/auth-selectors";
import {AnyAction} from "redux";
import {logout} from "../../redux/auth-reduser";


type PropsType = {}

export const Header: React.FC<PropsType> = () => {

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch = useDispatch()

    const logoutCallBack = () => {
        dispatch(logout() as unknown as AnyAction)
    }

    const {Header} = Layout;
    return <Row>
        <Col span={16}>
            <Header className="site-layout-background" style={{backgroundSize: "15px"}}/>
        </Col>
        {isAuth
            ? <> <Col span={4} style={{alignSelf: 'center', paddingLeft: '5%'}}>

                <Avatar style={{backgroundColor: '#87d068',}} icon={<UserOutlined/>}/> {login}
            </Col>
                <Col span={4} style={{alignSelf: 'center', paddingLeft: '2%'}}>
                    <Button onClick={logoutCallBack}>Log out</Button>
                </Col>
            </>
            : <Col span={6} style={{alignSelf: 'center', paddingLeft:'14%'}}>
                <Link to={'/login'}><Button>Login</Button></Link>
            </Col>

        }
    </Row>

}





