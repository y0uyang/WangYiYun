import React from 'react'
import axios from 'axios'
import { Carousel } from 'antd';
import { connect } from 'react-redux'

import { getMusicListId, setAllMusic } from './../redux/actions'


class MusicPlay extends React.Component {

    async componentWillMount(){
        let res = await axios.get("http://127.0.0.1:8088/musics/find",{})
        console.log(res)
        this.setState({
            playedMusicList:res.data,
            totalMusicCount:res.data.length
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
                    <span>全部歌曲</span>
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

    playMusic(e){
        this.props.dispatch( setAllMusic(e.target.dataset.id,"all") );
        this.props.history.push('/mPlay')
    }


   

}

function filter(store){
    return {
        
    }
}

export default connect(filter)(MusicPlay)


