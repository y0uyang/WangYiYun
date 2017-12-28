import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { Upload, message } from 'antd';

import {userInfo} from './../redux/actions'
import { getMusicListId } from './../redux/actions'


class Login extends React.Component {

    async componentWillMount(){
        let id = sessionStorage.adminId;
        if (id.length > 0) {
            let res = await axios.get("http://127.0.0.1:8088/admin/find",{
                params:{
                    _id:id
                }
            })
            this.setState({
                adminId:id,
                headImg:res.data.headImg
            })
        }else{
            this.setState({
                headImg:"timg.jpg"
            })
        }
        
    }
    
    constructor(props){
        super(props)

        this.state = {
            adminId:'',
            headImg:''
        }
    }


    render(){
        return ( 
            <div className="changeHeadImgCls">
                <img onClick={()=>{ history.back() }} src={'http://127.0.0.1:9099/images/' + this.state.headImg } />
                <Upload
                    name="file"
                    action='http://127.0.0.1:8088/upload'
                    onChange={this.changeHeadImg.bind(this)} >
                    <p>更换头像</p>
                </Upload>
            </div>
        )
    }

    async changeHeadImg(info){
        let imgUrl = "";
        let { dispatch } = this.props;
        if (info.file.status !== 'uploading') {
            imgUrl = info.file.response.substr(7)
            this.setState({
                headImg:imgUrl
            })
        }
        let res = await axios.get("http://127.0.0.1:8088/admin/update",{
            params:{
                _id:this.state.adminId,
                headImg:imgUrl
            }
        })
        axios.get('http://127.0.0.1:8088/admin/find',{
            params:{
                _id:this.state.adminId
            }
        }).then(function(res){
            console.log(res)
            dispatch( userInfo(res.data) )
        })
    }

}

function filter(store){
    return {}
}
export default connect(filter)(Login)
