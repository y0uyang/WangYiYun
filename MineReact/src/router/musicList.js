import React from 'react'
import axios from 'axios'
import { Carousel } from 'antd';
import { connect } from 'react-redux'

import { musicPlay } from './../redux/actions'


class MusicList extends React.Component {

    async componentWillMount(){
        if (this.props.mListId) {
            let res = await axios.get('http://127.0.0.1:8088/musicList/find',{
                params:{
                    _id:this.props.mListId,
                    submitType:'findJoin',
                    ref: ['musics','']
                }
            })
            this.setState({
                musicList:res.data.musics,
                listName:res.data.listName,
                author:res.data.author,
                imgUrl:res.data.imgUrl,
            })
        }
    }
    constructor(props){
        super(props);
        this.state = {
            author:'',
            imgUrl:'',
            listName:'',
            musicList:[],
        }
    }

    render(){
        return ( 
            <div className='musicListCls'>
                <div className='top'>
                    <div className='header'>
                        <img onClick={ ()=>{ this.props.history.push('/main') }  } src='./../../images/musicList_03.png' />
                        <span>歌单</span>
                        <img src='./../../images/musicList_09.png' />
                        <img onClick={ ()=>{ this.props.history.push('/mPlay')} } src='./../../images/musicList_06.png' />
                    </div>
                    <div className='listInfo'>
                        <img src={'http://127.0.0.1:9099/images/'+this.state.imgUrl} />
                        <div>
                            <p>{ this.state.listName }</p>
                            <p>
                                { this.state.author }
                                <img src='./../../images/musicList_15.png' />
                            </p>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <img src='./../../images/top_03.png' />   
                            <span>3321</span>                       
                        </li>
                        <li>
                            <img src='./../../images/musicInfo_10.png' />
                            <span>31</span>                       
                        </li>
                        <li>
                            <img src='./../../images/musicInfo_05.png' />
                            <span>17</span>                       
                        </li>
                        <li>
                            <img src='./../../images/musicInfo_19.png' />
                            <span>下载</span>                       
                        </li>
                    </ul>
               </div>
               <div>
                   <img src='./../../images/musicList_19.png' />
                   <span>播放全部</span>
                   <span>（共{ this.state.musicList.length }首）</span>
                   <img src='./../../images/musicList_21.png' />
                   <span>多选</span>
               </div>
               <ul>
                   {
                       this.state.musicList.map( (music,index)=> {
                           return <li key={index}>
                                <span>{index + 1}</span>
                                <div>
                                    <div>
                                        <p data-name={ music._id } onClick={ this.musicPlay.bind(this) }>{ music.musicName}</p>
                                        <span>{ music.singer } - </span><span>{ music.songalbum }</span>
                                    </div>
                                    <img src='./../../images/musicList_26.png' />
                                    <img src='./../../images/musicList_29.png' />
                                </div>
                           </li>
                       } )
                   }
               </ul>
               <div className='marginTop'></div>
                <ul className='listFooter'>
                    <li><img onClick={ ()=>{ this.props.history.push('/main')} } src='./../../images/listfooter_03.png' /></li>
                    <li><img onClick={ ()=>{ this.props.history.push('/mMusic')} } src='./../../images/listfooter_05.png' /></li>
                    <li><img src='./../../images/listfooter_07.png' /></li>
                    <li><img onClick={ ()=>{ this.props.history.push('/userInfo')} } src='./../../images/listfooter_09.png' /></li>
                </ul>
            </div>
        )
    }
                
    

    musicPlay(e){
        this.props.dispatch( musicPlay(e.target.dataset.name,this.props.mListId) );
        this.props.history.push('/mPlay')
    }

}

function filter(store){
    return {
        mListId:store.musicListId
    }
}

export default connect(filter)(MusicList)



