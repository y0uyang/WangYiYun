import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'


import {userInfo} from './../redux/actions'

class Login extends React.Component {


    render(){
        return ( 
            <div className='regCls'>
                <div className='header'>
                    <a onClick={ ()=>{ this.props.history.push('/userInfo')} } ><img src='./../../images/musicList_03.png' /></a>
                    <p>手机号登录</p>
                </div>
                <div className='inputCls'>
                    <div>
                        <img src='./../../images/reg_07.gif' />
                        <input className='marginLeft' ref='phone' type='text' maxLength='11' placeholder='手机号' />
                    </div>
                    <div>
                        <img src='./../../images/reg_11.gif' />
                        <input ref='pwd' type='text' placeholder='密码' />
                    </div>
                    <button onClick={ this.login.bind(this) }>登录</button>
                </div>
                <div className='refresh'>
                    <a  onClick={ ()=>{ this.props.history.push('/reg')} } >重设密码</a>
                </div>
            </div>
        )
    }

    login(){
        let { phone, pwd } = this.refs;
        let { history,dispatch } = this.props;
        if( phone.value && pwd.value ){
            axios.get('http://127.0.0.1:8088/admin/find',{
                params:{
                    acc:phone.value,
                    pwd: pwd.value,
                    findType: 'exact'
                }
            }).then(function(res){
                if (res.data.length == 0) {
                    alert('账号或密码不正确！');
                }else{
                    dispatch( userInfo(res.data[0]) )
                    history.push("/main")
                }
            })
        }
    }

}

function filter(store){
    return {}
}
export default connect(filter)(Login)
