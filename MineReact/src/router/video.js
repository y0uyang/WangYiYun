import React from 'react'
import axios from 'axios'
import { Carousel } from 'antd';
import { connect } from 'react-redux'

import { getMusicListId } from './../redux/actions'


class Main extends React.Component {

    async componentWillMount(){
        let resMusicMv = await axios.get('http://127.0.0.1:8088/musicMv/find',{});
        // let musicMvList = resMusicMv.data.slice(0,6)
        this.setState({
            resMusicMv:resMusicMv.data
        })
    }

    
    constructor(props){
        super(props)

        this.state = {
            resMusicMv: [],
        }
    }

    render(){
        return ( 
            <div className='mainCls'>
                <div className='searchTitle'>
                    <img src='./../../images/main_03.png' />
                    <div>
                        <img src='./../../images/main_09.png' />
                        <input type='text' placeholder='搜索音乐、视频、歌词、电台' />
                    </div>
                    <img onClick={ ()=>{ this.props.history.push('/mPlay')} } src='./../../images/main_06.png' />
                </div>
                <ul>
                    <li onClick={ ()=>{ this.props.history.push('/main')} }><span>音乐</span></li>
                    <li className="currentChoose"><span>视频</span></li>
                    <li><span>电台</span></li>
                </ul>
                {
                    this.state.resMusicMv.map((mv,index)=>{
                        return <div className='videoCls' key={index}>
                            <video onClick={ this.videoPlay.bind(this)} src={'http://127.0.0.1:9099/mv/'+mv.musicMvName+'.mp4'} ></video>
                            <ul>
                                <li>{ mv.text }</li>
                                <li><img src='./../../images/video_03.png'/><span>{mv.good}</span></li>
                                <li><img src='./../../images/video_05.png'/><span>{mv.comment}</span></li>
                                <li><img src='./../../images/video_08.png'/></li>
                            </ul>
                        </div>
                    })
                }
                
                
               
                <div className='marginTop'></div>
                <ul className='mainFooter'>
                    <li><img src='./../../images/main_42.png' /></li>
                    <li><img onClick={ ()=>{ this.props.history.push('/mMusic')} } src='./../../images/main_44.png' /></li>
                    <li><img src='./../../images/main_46.png' /></li>
                    <li><img onClick={ ()=>{ this.props.history.push('/userInfo')} } src='./../../images/main_48.png' /></li>
                </ul>
            </div>
        )
    }

    videoPlay(e){
        if(e.target.paused){
            e.target.play();
        }else{
            e.target.pause();
        }
    }

}

function filter(store){
    return {}
}

export default connect(filter)(Main)



