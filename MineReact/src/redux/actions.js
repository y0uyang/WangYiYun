export const GET_MUSIC_LIST_ID = 'GET_MUSIC_LIST_ID'
export const MUSICPLAY = 'MUSICPLAY'
export const USERINFO = 'USERINFO'

//获取歌单id
export function getMusicListId( listId ){
    return {
        type: GET_MUSIC_LIST_ID,
        listId
    }  
    
}


//所有歌
export function setAllMusic( music,list ){
    return {
        type: MUSICPLAY,
        obj:{
            music,
            list
        }
    }  
    
}

//所有已播放的歌
export function setPlayedMusic( music,list ){
    return {
        type: MUSICPLAY,
        obj:{
            music,
            list
        }
    }  
    
}


//选歌
export function musicPlay( music,list ){
    return {
        type: MUSICPLAY,
        obj:{
            music,
            list
        }
    }
}


//设置用户信息
export function userInfo( user ){
    return {
        type: USERINFO,
        user
    }
}