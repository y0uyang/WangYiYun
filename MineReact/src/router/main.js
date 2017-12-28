import React from 'react'
import axios from 'axios'
import { Carousel } from 'antd';
import { connect } from 'react-redux'
import { getMusicListId, setAllMusic } from './../redux/actions'

let index=0,count=1,stop;


class Main extends React.Component {

    async componentWillMount(){
        let resMlist = await axios.get('http://127.0.0.1:8088/musicList/find',{});
        let musicList = resMlist.data.slice(0,6)
        let resNewMlist = await axios.get('http://127.0.0.1:8088/newMusicList/find',{});
        let newMusicList = resNewMlist.data.slice(0,6)
        let resMusicMv = await axios.get('http://127.0.0.1:8088/musicMv/find',{});
        let musicMv = resMusicMv.data.slice(0,4)
        let banner =  await axios.get('http://127.0.0.1:8088/banner/find',{});
        this.setState({
            musicList, 
            newMusicList, 
            musicMv,
            banners:banner.data[0]
        })
    }

    componentDidMount(){
        stop = setInterval(async function () {
            let banner =  await axios.get('http://127.0.0.1:8088/banner/find',{});
            this.setState({
                banners:banner.data[index]
            })
            if (index>=9) {
                index = 0;
            }
        }.bind(this), 2000)
    }

    componentWillUnmount(){
        clearInterval(stop);        
    }

    
    constructor(props){
        super(props)

        this.state = {
            musicList: [],
            newMusicList: [],
            musicMv: [],
            banners:[],
            searchList:[]
        }
    }

    render(){
        return ( 
            <div className='mainCls'>
                {this.state.searchList.length > 0 &&
                    <div className="searchBoxCls">
                        {
                            this.state.searchList.map((text,index)=>{
                                return <text onClick={ this.musicPlay.bind(this) } data-id={text._id} key={index}>{text.musicName} - {text.singer}</text>
                            })
                        }
                    </div>  
                    
                }
                <div className='searchTitle'>
                    <img src='./../../images/main_03.png' />
                    <div>
                        <img src='./../../images/main_09.png' />
                        <input ref="searchText" onKeyDown={this.searchAll.bind(this)} type='text' placeholder='搜索音乐、视频、歌词、电台' />
                    </div>
                    <img onClick={ ()=>{ this.props.history.push('/mPlay')} } src='./../../images/main_06.png' />
                </div>
                <ul>
                    <li className="currentChoose"><span>音乐</span></li>
                    <li onClick={ ()=>{ this.props.history.push('/video')} }><span>视频</span></li>
                    <li><span>电台</span></li>
                </ul>

                <div className="img-div">
                     <img className="images" src={'http://127.0.0.1:9099/' + this.state.banners.bannerUrl } />
                </div>
                
                {this.setIntervalBanner()}

                <ul className='nav'>
                    <li><img src='./../../images/main_17.png' /><p>私人FM</p></li>
                    <li><img src='./../../images/main_19.png' /><p>每日推荐</p></li>
                    <li><img src='./../../images/main_21.png' /><p>歌单</p></li>
                    <li><img src='./../../images/main_23.png' /><p>排行榜</p></li>
                </ul>
                <div className='contain'>
                    <p>推荐歌单<img src='./../../images/main_30.png' /></p>
                    <div className='songalbum'>
                    {
                    this.state.musicList.map(( musicList,index)=>{
                        return <div key={index}  >
                                    <img onClick={ this.musicListBtn.bind(this) } data-id={ musicList._id } src={'http://127.0.0.1:9099/images/'+ musicList.imgUrl } alt='歌单图1'/>
                                    <p>{musicList.listName}</p>
                                </div>
                        })
                    }
                    </div>
                </div>
                <div className='contain'>
                    <p>最新音乐<img src='./../../images/main_30.png' /></p>
                    <div className='songalbum'>
                    {
                    this.state.newMusicList.map(( newMusicList,index)=>{
                        return <div key={index}  >
                                    <img onClick={ this.musicListBtn.bind(this) } data-id={ newMusicList._id } src={'http://127.0.0.1:9099/images/'+ newMusicList.imgUrl } alt='歌单图1'/>
                                    <p>{newMusicList.listName}</p>
                                </div>
                        })
                    }
                    </div>
                </div>
                <div className='containMv'>
                    <p>推荐MV<img src='./../../images/main_30.png' /></p>
                    <div className='songalbum'>
                    {
                    this.state.musicMv.map(( musicMv,index)=>{
                        return <div key={index}  >
                                    <img onClick={ this.musicListBtn.bind(this) } data-id={ musicMv._id } src={'http://127.0.0.1:9099/images/'+ musicMv.musicMvName+'.jpg' } alt='歌单图1'/>
                                    <p>{musicMv.musicMvName}</p>
                                    <p>{musicMv.singer}</p>
                                </div>
                        })
                    }
                    </div>
                </div>
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

    async searchAll(e){
        if (e.keyCode == 13) {
            if (this.refs.searchText.value) {
                let searchResoult = [];
                let searchText = this.refs.searchText.value;
                let resMusic = await axios.get("http://127.0.0.1:8088/musics/find",{
                    params:{
                        musicName:searchText
                    }
                })
                searchResoult = resMusic.data
                if (resMusic.data.length == 0) {
                    let resSinger = await axios.get("http://127.0.0.1:8088/musics/find",{
                        params:{
                            singer:searchText
                        }
                    })
                    searchResoult = resSinger.data
                }
                this.setState({
                    searchList:searchResoult
                })
            }else{
                this.setState({
                    searchList:[]
                })
            }
            
        }
    }

    musicPlay(e){
        this.props.dispatch( setAllMusic(e.target.dataset.id,"all") );
        this.props.history.push('/mPlay')
    }

    musicListBtn(e){
        this.props.dispatch( getMusicListId(e.target.dataset.id) )
        this.props.history.push('/mList')
    }

    bannersJs(){
        let that = this;
        if (count < 2) {
            index+=1;        
            let stop = setInterval(async function () {
                let banner =  await axios.get('http://127.0.0.1:8088/banner/find',{});
                that.setState({
                    banners:banner.data[index]
                })
                if (index>=9) {
                    index = 0;
                }
                clearInterval(stop);
            }, 3000)
            count++;
        }else{
            count--;
        }
    }

    setIntervalBanner(){
        setInterval(this.bannersJs(),2000)
    }
    

}

function filter(store){
    return {}
}

export default connect(filter)(Main)



