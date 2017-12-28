import React from 'react'
import axios from 'axios'

class Reg extends React.Component {

    render(){
        return ( 
            <div className='regCls'>
                <div className='header'>
                    <a href='#'><img src='./../../images/musicList_03.png' /></a>
                    <p>手机号注册</p>
                </div>
                <div className='inputCls'>
                    <div>
                        <img src='./../../images/reg_07.gif' />
                        <span>+86</span>
                        <input onBlur={ this.checkAcc.bind(this) } ref='phone' type='text' maxLength='11' placeholder='输入手机号' />
                    </div>
                    <div>
                        <img src='./../../images/reg_11.gif' />
                        <input ref='pwd' type='text' placeholder='设置登录密码，不少于6位' />
                    </div>
                    <button onClick={ this.loginBtn.bind(this) }>下一步</button>
                </div>
                <div className='footer'>
                    <div>
                        <span> </span>    
                        <span>其他注册方式</span>    
                        <span> </span>    
                    </div>
                    <ul>
                        <li><img src='./../../images/reg_15.gif' /><p>微信</p></li>
                        <li><img src='./../../images/reg_17.gif' /><p>QQ</p></li>
                        <li><img src='./../../images/reg_19.gif' /><p>微博</p></li>
                        <li><img src='./../../images/reg_21.gif' /><p>网易邮箱</p></li>
                    </ul>
                </div>
            </div>
        )
    }

    checkAcc(){
        axios.get('http://127.0.0.1:8088/admin/find',{
            params:{
                acc:this.refs.phone.value,
            }
        }).then(function(res){
            if (res.data.length > 0) {
                alert('该手机号已注册！')
            }
        })
    }

    loginBtn(){
        let {phone, pwd} = this.refs;
        let { history } = this.props;
        if ( phone.value && pwd.value ) {
            axios.get('http://127.0.0.1:8088/admin/add',{
                params:{
                    acc:phone.value,
                    pwd: pwd.value
                }
            }).then(function(res){
                history.push("/")
            })
        }
    }

}

export default Reg