import React from 'react'
import axios from 'axios'
import { Carousel } from 'antd';
import { connect } from 'react-redux'

import { getMusicListId } from './../redux/actions'


class UserInfo extends React.Component {

    componentWillMount(){
        console.log("changeBack")
        if (this.props.userInfo.name == '请登录') {
            this.setState({
                isLogin:'登录',
            })
        }else{
            this.setState({
                isLogin:'退出登录',
            })
        }
    }

    // static defaultProps = {
	// 	userInfo:{
    //         name:'请登录', 
    //         lv:0, 
    //         active:0, 
    //         fans:0, 
    //         attention:0
    //     }
	// }
    
    constructor(props){
        super(props)

        this.state = {
            isLogin:'',
        }
    }

    render(){
        let { name, lv, active, fans, attention, headImg, _id} = this.props.userInfo;
        return ( 
            <div className='userInfoCls'>
                <div className='header'>
                    <span>账号</span>
                    <img onClick={ ()=>{ this.props.history.push('/mPlay')} } src='./../../images/main_06.png' />
                </div>
                <div className='next'>
                    <div>
                        <div><img onClick={ ()=>{ this.changeHeadImg(_id) }} src={ 'http://127.0.0.1:9099/images/'+headImg } /></div>
                        <div>
                            <p>{name}</p>
                            <i>Lv.{lv}</i>
                        </div>
                        <div>
                            <img src='./../../images/userIcon_03.png' />
                            <span>签到</span>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <p>动态</p>
                            <p>{active}</p>
                        </li>
                        <li>
                            <p>关注</p>
                            <p>{attention}</p>
                        </li>
                        <li>
                            <p>粉丝</p>
                            <p>{fans}</p>
                        </li>
                        <li>
                            <img src='./../../images/userupdate_03.png' />
                            <p>我的资料</p>
                        </li>
                    </ul>
                </div>
                <ul>
                    <li>
                        <img src='./../../images/userIcon_07.png'/>
                        <div>
                            <span>我的信息</span>
                            <img src='./../../images/mymusic_06.jpg'/>
                        </div>
                    </li>
                </ul>
                <ul>
                    <li>
                        <img src='./../../images/userIcon_10.png'/>
                        <div>
                            <span>会员中心</span>
                            <img src='./../../images/mymusic_06.jpg'/>
                        </div>
                    </li>
                    <li>
                        <img src='./../../images/userIcon_12.png'/>
                        <div>
                            <span>商城</span>
                            <img src='./../../images/mymusic_06.jpg'/>
                        </div>
                    </li>
                    <li>
                        <img src='./../../images/userIcon_14.png'/>
                        <div>
                            <span>在线听歌免流量</span>
                            <img src='./../../images/mymusic_06.jpg'/>
                        </div>
                    </li>
                </ul>
                <ul>
                    <li>
                        <img src='./../../images/userIcon_16.png'/>
                        <div>
                            <span>设置</span>
                            <img src='./../../images/mymusic_06.jpg'/>
                        </div>
                    </li>
                    <li>
                        <img src='./../../images/userIcon_18.png'/>
                        <div>
                            <span>扫一扫</span>
                            <img src='./../../images/mymusic_06.jpg'/>
                        </div>
                    </li>
                    <li>
                        <img src='./../../images/userIcon_20.png'/>
                        <div>
                            <span>个性换肤</span>
                            <span>官方红</span>
                            <img src='./../../images/mymusic_06.jpg'/>
                        </div>
                    </li>
                    <li>
                        <img src='./../../images/userIcon_22.png'/>
                        <div>
                            <span>夜间模式</span>
                            <span>开关</span>
                        </div>
                    </li>
                </ul>
                <ul>
                    <li>
                        <div>
                            <span onClick={ ()=>{ this.props.history.push('/')} }>{this.state.isLogin}</span>
                        </div>
                    </li>
                </ul>
                <div className='marginTop'></div>
                <ul className='listFooter'>
                    <li><img onClick={ ()=>{ this.props.history.push('/main')} } src='./../../images/mymusic_22.jpg' /></li>
                    <li><img onClick={ ()=>{ this.props.history.push('/mMusic')} } src='./../../images/listfooter_05.png' /></li>
                    <li><img src='./../../images/listfooter_07.png' /></li>
                    <li><img src='./../../images/userInfo_03.png' /></li>
                </ul>
            </div>
        )
    }


    changeHeadImg(id){
        sessionStorage.adminId=id;
        this.props.history.push('/change')
    }

   

}

function filter(store){
    return {
        userInfo:store.userInfo
    }
}

export default connect(filter)(UserInfo)



