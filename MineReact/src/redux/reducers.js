import { combineReducers } from 'redux'

import { 
    GET_MUSIC_LIST_ID,
    MUSICPLAY,
    USERINFO,
    SETPLAYEDMUSIC
} from './actions'



//歌曲列表IDreducer
function musicListId (state = '5a294e4a5da1bf307c4bb452',action){
    switch ( action.type ){
        case GET_MUSIC_LIST_ID:
            return action.listId;
        default:
            return state
    }
}

//当前LABReducer
function musicPlay ( obj = {
    music:"5a294a075da1bf307c4bb44d",
    list:"all"
},action ){
    switch ( action.type ){
        case MUSICPLAY:
            return action.obj;
        default:
            return obj
    }
}

//当前用户
function userInfo ( state = {
    name:'请登录', 
    lv:0, 
    active:0, 
    fans:0, 
    attention:0,
    headImg:'timg.jpg'
},action ){
    switch ( action.type ){
        case USERINFO:
            return action.user;
        default:
            return state
    }
}


export default combineReducers({
    musicListId,
    musicPlay,
    userInfo
})