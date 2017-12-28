import React from 'react'
import axios from 'axios'
import { Carousel } from 'antd';
import { connect } from 'react-redux'

import { getMusicListId, musicPlay } from './../redux/actions'


let didWidth = 0,didLeft=-.16,deg = 0,playId,timer2;


class MusicPlay extends React.Component {

    async componentWillMount(){
        let res = await axios.get('http://127.0.0.1:8088/musics/find',{
            params:{
                _id:this.props.musicId
            }
        });
        this.setState({
            id:res.data._id,
            musicName:res.data.musicName, 
            singer:res.data.singer, 
            imgUrl:res.data.imgUrl,
            istrans:false
        })
    }

    
    constructor(props){
        super(props)

        this.state = {
            id:'',
            musicName: '',
            singer: '',
            imgUrl:'',
            time:'00:00',
            totalTime:'00:00',
            isRandom:false,
            nowPlay:"",
        }
    }

    render(){
        let { musicName,
            singer,
            imgUrl,
            time,
            totalTime
        } = this.state;
        return ( 
            // style={{backgroundImage:url('http://127.0.0.1:9099/images/'+imgUrl)}} 
            <div className='musicplayCls'>
                <img src={'http://127.0.0.1:9099/images/'+ imgUrl} /> 
                <div className='header'>
                    <img onClick={ ()=>{ history.back()  } } src='./../../images/musicInfo_03.png' />
                    <div>
                        <p>{musicName}</p>
                        <p>{singer}</p>
                    </div>
                    <img src='./../../images/musicInfo_05.png' />
                </div>
                <div className='cir'>
                    <div>
                        <div>
                        <audio id='music' src={ 'http://127.0.0.1:9099/music/'+ musicName +'.mp3'} >
                        </audio>
                        </div>
                    </div>
                </div>
                <div><div className='musicImgCls'><img id='musicPlayImg' src={'http://127.0.0.1:9099/images/'+ imgUrl} /></div></div>
                <div className='playBtn'>
                    <img src='./../../images/musicInfo_16.png' />
                    <img src='./../../images/musicInfo_19.png' />
                    <img src='./../../images/musicInfo_10.png' />
                    <img src='./../../images/musicInfo_13.png' />
                </div>
                <div className='plan'>
                    <span>{ time }</span>
                    <div>
                        <img id='didPoint' onMouseDown={this.progressBar.bind(this)} style={{left:'-.16rem'}} src='./../../images/musicInfo_26.png'/>
                        <div id='didLine' style={{width: '0rem'}}></div>
                        <div className='all'></div>
                    </div>
                    <span>{ totalTime }</span>
                </div>
                <div className='playJob'>
                    <img id='isRandomImg' onClick={ this.isRandom.bind(this) } src='./../../images/musicInfo_41.png' />
                    <img onClick={ this.last.bind(this) } src='./../../images/musicInfo_33.png' />
                    <img onClick={ this.play.bind(this) } data-play='play' src='./../../images/musicInfo_30.png' />
                    <img onClick={ this.next.bind(this) } src='./../../images/musicInfo_36.png' />
                    <img src='./../../images/musicInfo_39.png' />
                </div>
            </div>
        )
    }


    progressBar(e){
        
    }

    addtime(){//当前播放秒数
        timer2=setInterval(function(){
            let cur=parseInt(music.currentTime);//秒数
            let total=parseInt(music.duration);//总秒数
            let temp=cur;
            let totaltemp=total;
            let divDerSecond = 5.4/totaltemp;
            let imgPerSecond = 5.5/totaltemp;
            let minute=parseInt(temp/60);
            if(cur%60<10){
                didWidth += divDerSecond;
                didLeft += imgPerSecond;
                didLine.style.width = didWidth+'rem';
                didPoint.style.left = didLeft+'rem';
                this.setState({
                    time:"0"+minute+":0"+cur%60+""
                })
                if (music.currentTime == music.duration) {
                    clearInterval(playId);
                    clearInterval(timer2);
                    deg = 0;
                }
            }else{
                didWidth += divDerSecond;
                didLeft += imgPerSecond;
                didLine.style.width = didWidth+'rem';
                didPoint.style.left = didLeft+'rem';
                this.setState({
                    time:"0"+minute+":"+cur%60+""
                })
                if (music.currentTime == music.duration) {
                    clearInterval(playId);
                    clearInterval(timer2);
                    deg = 0;
                }
            }
        }.bind(this),1000);
    }

    changeTotalTime(){
        let cur=parseInt(music.duration);//秒数
        let temp=cur;
        let minute=parseInt(temp/60);
        let totalTimes = "";
        if (cur%60<10) {
            totalTimes = "0"+minute+":"+"0"+cur%60
        }else{
            totalTimes = "0"+minute+":"+cur%60
        }
        this.setState({
            totalTime:totalTimes
        })
    }

    
    play(e){//播放暂停
        this.changeTotalTime()
        if(e.target.dataset.play == 'play'){
            music.play();
            e.target.dataset.play = 'pause';
            playId = setInterval(function(){
                deg += .5;
                musicPlayImg.style.transform = "rotate(" + deg + "deg)";   
            },60)
            this.addtime();
        }else{
            clearInterval(playId);
            clearInterval(timer2);
            music.pause();
            e.target.dataset.play = 'play'
        }
        this.setState({
            nowPlay:e.target.dataset.play
        })
        this.addPlayedMusic()
    }


    isRandom(){
        this.state.isRandom = !this.state.isRandom
        if (this.state.isRandom) {
            isRandomImg.src = './../../images/random.png'
        }else{
            isRandomImg.src = './../../images/musicInfo_41.png'
        }
    }

    async next(){
        let res;
        let musicPlayList=[];
        if(this.props.listId == "played"){
            res = await axios.get('http://127.0.0.1:8088/playedMusic/find',{
                params:{
                    submitType:'findJoin',
                    ref: ['musics','']
                }
            });
            musicPlayList = res.data[0].musics;
        }else if(this.props.listId == "all"){
            res = await axios.get('http://127.0.0.1:8088/musics/find',{});
            musicPlayList = res.data;
        }else{
            res = await axios.get('http://127.0.0.1:8088/musicList/find',{
                params:{
                    _id:this.props.listId,
                    submitType:'findJoin',
                    ref: ['musics','']
                }
            });
            musicPlayList = res.data.musics;

        }
        let i = 0,j=0;
        for(i in musicPlayList){
        if(musicPlayList[i]._id == this.state.id){
                j = parseInt(i)+1;
                if(j >= musicPlayList.length){
                    j = 0;
                }
                if(this.state.isRandom){
                    j = parseInt(Math.random()*musicPlayList.length)
                }
                break;
            }
        }
        this.setState({
            id:musicPlayList[j]._id,
            musicName:musicPlayList[j].musicName, 
            singer:musicPlayList[j].singer, 
            imgUrl:musicPlayList[j].imgUrl,
            istrans:false
        })
        didLine.style.width = '0';
        didPoint.style.left = '-.16rem';
        musicPlayImg.style.transform = "rotate(0deg)";  
        deg = 0;didWidth = 0;didLeft=-.16;
        this.addPlayedMusic()
    }


    async last(){
        let res;
        let musicPlayList=[];
        if(this.props.listId == "played"){
            res = await axios.get('http://127.0.0.1:8088/playedMusic/find',{
                params:{
                    submitType:'findJoin',
                    ref: ['musics','']
                }
            });
            musicPlayList = res.data[0].musics;
        }else if(this.props.listId == "all"){
            res = await axios.get('http://127.0.0.1:8088/musics/find',{});
            musicPlayList = res.data;
        }else{
            res = await axios.get('http://127.0.0.1:8088/musicList/find',{
                params:{
                    _id:this.props.listId,
                    submitType:'findJoin',
                    ref: ['musics','']
                }
            });
            musicPlayList = res.data.musics;

        }
        let i = 0,j=0;
        for(i in musicPlayList){
            if(musicPlayList[i]._id == this.state.id){
                j = parseInt(i)-1;
                if(j<0){
                    j = musicPlayList.length - 1;
                }
                if(this.state.isRandom){
                    j = parseInt(Math.random()*musicPlayList.length)
                }
                break;
            }
        }
        this.setState({
            id:musicPlayList[j]._id,
            musicName:musicPlayList[j].musicName, 
            singer:musicPlayList[j].singer, 
            imgUrl:musicPlayList[j].imgUrl,
            istrans:false
        })
        didLine.style.width = '0';
        didPoint.style.left = '-.16rem';
        musicPlayImg.style.transform = "rotate(0deg)";  
        deg = 0;didWidth = 0;didLeft=-.16;
        this.addPlayedMusic()
    }

   async addPlayedMusic(){
        if (this.state.nowPlay) {
            let res = await axios.get("http://127.0.0.1:8088/playedMusic/find",{
            params:{}
            })
            for(let id of res.data[0].musics){
                if (id == this.state.id) {
                    return; 
                }
            }
            let newMusicAry = [...res.data[0].musics,this.state.id];
            let addPlayed = await axios.get("http://127.0.0.1:8088/playedMusic/update",{
                params:{
                    _id:res.data[0]._id,
                    musics:newMusicAry
                }
            })
        }
   }

}

function filter(store){
    return {
        musicId:store.musicPlay.music,
        listId:store.musicPlay.list
    }
}

export default connect(filter)(MusicPlay)



