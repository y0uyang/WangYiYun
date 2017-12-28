import React from 'react';
import {render} from 'react-dom';
import './../css/reg.css'
import './../css/main.css'
import './../css/musicList.css'
import './../css/musicplay.css'
import './../css/mymusic.css'
import './../css/userInfo.css'
import './../css/video.css'
import './../css/playedMusic.css'


import { Provider } from 'react-redux'

import { 
    HashRouter as Router,
    Route
} from 'react-router-dom'

import Reg from './router/reg'
import Login from './router/login'
import Main from './router/main'
import MusicList from './router/musicList'
import MusicPlay from './router/musicPlay'
import MyMusic from './router/mymusic'
import Played from './router/playedMusic'
import UserInfo from './router/userInfo'
import Video from './router/video'
import AllMusic from './router/localMusic'
import ChangeHI from './router/changeHeadImg'
import store from './redux/store'

render( (
    <Provider store = { store }>
        <Router>
            <div>
                <Route path='/' exact component={ Login } />
                <Route path='/reg' exact component={ Reg } />
                <Route path='/main' component={ Main } />
                <Route path='/mList' component={ MusicList } />
                <Route path='/mPlay' component={ MusicPlay } />
                <Route path='/mMusic' component={ MyMusic } />
                <Route path='/userInfo' component={ UserInfo } />
                <Route path='/video' component={ Video } />
                <Route path='/played' component={ Played } />
                <Route path='/change' component={ ChangeHI } />
                <Route path='/all' component={ AllMusic } />
            </div>
        </Router>
    </Provider>
    
), webapp)