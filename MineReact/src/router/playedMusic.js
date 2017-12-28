import React from 'react'
import axios from 'axios'
import { Carousel } from 'antd';
import { connect } from 'react-redux'

import { getMusicListId,setPlayedMusic } from './../redux/actions'


class MusicPlay extends React.Component {

    async componentWillMount(){
        let res = await axios.get("http://127.0.0.1:8088/playedMusic/find",{
            params:{
                submitType:"findJoin",
                ref:["musics"]
            }
        })
        this.setState({
            playedMusicList:res.data[0].musics,
            totalMusicCount:res.data[0].musics.length
        })
    }

    
    constructor(props){
        super(props)

        this.state = {
            playedMusicList: [],
            totalMusicCount:0
        }
    }

    render(){
        
        return ( 
            <div className='playedMusicCls'>
                <div className='header'>
                    <img onClick={ ()=>{ this.props.history.push('/mMusic')} } src="./../../images/musicList_03.png"/>
                    <span>最近播放的歌曲</span>
                    <img onClick={ ()=>{ this.props.history.push('/mPlay')} } src='./../../images/main_06.png' />
                </div>

                <div className="leftMargin">
                    <div className="playedTotalMusic" >
                        <img src="./../../images/musicList_19.png" alt=""/>
                        <span>播放全部</span>
                        <span>（共{ this.state.totalMusicCount }首）</span>
                        <img src="./../../images/musicList_21.png" alt=""/>
                        <span>多选</span>
                    </div>
                    <ul>
                        {
                            this.state.playedMusicList.map( (music,index)=>{
                                return <li className="perMusic" key={index}>                                
                                    <div data-id={music._id} onClick={ this.playMusic.bind(this) }>
                                        <span>{music.musicName}</span>
                                        <div>
                                            <span>{music.singer}</span>
                                            <span> - </span>
                                            <span>{music.songalbum}</span>
                                        </div>
                                    </div>
                                    <img src="./../../images/musicList_29.png" alt=""/>
                                </li>
                            })
                        }
                    </ul>
                    
                    <div className="clearAll" onClick={ ()=>{ this.clearAllPlayed() } }>
                        <img src="./../../images/delIcon.jpg" alt=""/>
                        <span>清除播放记录</span>
                    </div>
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


    clearAllPlayed(){
        console.log("清楚")
        
    }

    playMusic(e){
        this.props.dispatch( setPlayedMusic(e.target.dataset.id,"played") );
        this.props.history.push('/mPlay')
    }


   

}

function filter(store){
    return {
        
    }
}

export default connect(filter)(MusicPlay)


