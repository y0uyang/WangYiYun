import React from 'react'
import axios from 'axios'
import { Carousel } from 'antd';
import { connect } from 'react-redux'

import { getMusicListId } from './../redux/actions'


class MusicPlay extends React.Component {

    async componentWillMount(){
        let res = await axios.get("http://127.0.0.1:8088/playedMusic/find",{
            params:{
                submitType:"findJoin",
                ref:["musics"]
            }
        })
        let resAll = await axios.get("http://127.0.0.1:8088/musics/find",{})
        this.setState({
            totalMusicCount:res.data[0].musics.length,
            totalMusicsCount:resAll.data.length
        })
    }

    
    constructor(props){
        super(props)

        this.state = {
            musicName: '',
            singer: '',
            imgUrl:'',
            totalMusicCount:0,
            totalMusicsCount:0
        }
    }

    render(){
        
        return ( 
            <div className='mymusicCls'>
                <div className='header'>
                    <span>更多</span>
                    <span>我的音乐</span>
                    <img onClick={ ()=>{ this.props.history.push('/mPlay')} } src='./../../images/main_06.png' />
                </div>
                <ul>
                    <li onClick={ ()=>{ this.props.history.push('/all') } }>
                        <img src='./../../images/mymusic_03.jpg'/>
                        <div>
                            <span>本地音乐</span>
                            <span>{this.state.totalMusicsCount}</span>
                            <img src='./../../images/mymusic_06.jpg'/>
                        </div>
                    </li>
                    <li onClick={ ()=>{ this.props.history.push('/played') } }>
                        <img src='./../../images/mymusic_10.jpg'/>
                        <div>
                            <span>最近播放</span>
                            <span>{this.state.totalMusicCount}</span>
                            <img src='./../../images/mymusic_06.jpg'/>
                        </div>
                    </li>
                    <li>
                        <img src='./../../images/mymusic_12.jpg'/>
                        <div>
                            <span>我的电台</span>
                            <span>1</span>
                            <img src='./../../images/mymusic_06.jpg'/>
                        </div>
                    </li>
                    <li>
                        <img src='./../../images/mymusic_15.jpg'/>
                        <div>
                            <span>我的收藏</span>
                            <span>4</span>
                            <img src='./../../images/mymusic_06.jpg'/>
                        </div>
                    </li>
                </ul>
                <div className='myMusicList'>
                    <ul>
                        <li>
                            <img src='./../../images/mymusic_18.jpg'/>
                            <span>我创建的歌单（0）</span>
                        </li>
                    </ul>
                </div>
                <div className='myMusicList'>
                    <ul>
                        <li>
                            <img src='./../../images/mymusic_18.jpg'/>
                            <span>我收藏的歌单（0）</span>
                        </li>
                    </ul>
                </div>
                
                <div className='marginTop'></div>
                <ul className='listFooter'>
                    <li><img onClick={ ()=>{ this.props.history.push('/main')} } src='./../../images/mymusic_22.jpg' /></li>
                    <li><img src='./../../images/mymusic_24.jpg' /></li>
                    <li><img src='./../../images/listfooter_07.png' /></li>
                    <li><img onClick={ ()=>{ this.props.history.push('/userInfo')} } src='./../../images/listfooter_09.png' /></li>
                </ul>
            </div>
        )
    }




   

}

function filter(store){
    return {
        
    }
}

export default connect(filter)(MusicPlay)



