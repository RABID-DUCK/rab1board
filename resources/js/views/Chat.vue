<template>
    <div class="container-fluid h-100">
        <div class="row justify-content-center h-100">
            <div class="col-md-4 col-xl-3 chat"><div class="card mb-sm-3 mb-md-0 contacts_card">
                <div class="card-header">
                    <div class="input-group">
                        <input type="text" placeholder="Поиск..." name="" class="form-control search">
                        <div class="input-group-prepend">
                            <span class="input-group-text search_btn"><i class="fas fa-search"></i></span>
                        </div>
                    </div>
                </div>
                <span class="text-center text-white">Пользователей: <b>{{users.length}}</b></span>
                <div class="card-body contacts_body">
                    <div class="contacts">
                        <li v-for="(user, index) in users" :class="{'active': activeIndex ===  index}" @click="activeIndex = index">
                            <div class="d-flex bd-highlight">
                                <div class="img_cont">
                                    <img :src="'/images/'+ user.get_users.image" class="rounded-circle user_img">
                                    <span class="online_icon offline"></span>
                                </div>
                                <div class="user_info">
                                    <span>{{user.get_users.login}}</span>
                                    <p>Taherah left 7 mins ago</p>
                                </div>
                            </div>
                        </li>
                    </div>
                </div>
                <div class="card-footer"></div>
            </div></div>
            <div class="col-md-8 col-xl-6 chat">
                <div class="card">
                    <div class="card-header msg_head">
                        <div class="d-flex bd-highlight">
                            <div class="img_cont">
                                <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img">
                                <span class="online_icon"></span>
                            </div>
                            <div class="user_info">
                                <span>{{this.$route.params.title}}</span>
                                <p>{{Object.keys(messages).length}} Сообщений</p>
                            </div>
                            <div class="video_cam">
                                <span><i class="fas fa-video"></i></span>
                                <span><i class="fas fa-phone"></i></span>
                            </div>
                        </div>
                        <span id="action_menu_btn" @click="action_menu = !action_menu"><i class="fas fa-ellipsis-v"></i></span>
                        <div class="action_menu" v-if="action_menu">
                            <ul>
                                <li><i class="fas fa-user-circle"></i> View profile</li>
                                <li><i class="fas fa-users"></i> Add to close friends</li>
                                <li><i class="fas fa-plus"></i> Add to group</li>
                                <li><i class="fas fa-ban"></i> Block</li>
                            </ul>
                        </div>
                    </div>
                    <div class="card-body msg_card_body" id="content_messages">
                        <div class="d-flex mb-4" :class="[message.user.id === this.$store.getters.infoUser.id ? 'justify-content-end' : 'justify-content-start']" v-for="message in messages">
                            <div class="img_cont_msg position-relative">
                                <span class="position-absolute name_user">{{ message.user.login }}</span>
                                <img :src="'/images/' + message.user.image" class="rounded-circle user_img_msg">
                            </div>
                            <div class="msg_cotainer" :class="[message.user.id === this.$store.getters.infoUser.id ? 'msg_cotainer_send' :  'img_cont_msg']">
                                {{message.text}}
                                <span class="msg_time">{{ convertData(message.created_at) }}</span>
                            </div>
                        </div>

                    </div>
                    <div class="card-footer">
                        <div class="input-group">
                            <div class="input-group-append">
                                <span class="input-group-text attach_btn"><i class="fas fa-paperclip"></i></span>
                            </div>
                            <textarea v-model="title_text" class="form-control type_msg" placeholder="Напишите сообщение..."></textarea>
                            <div @click.prevent="sendMessage" class="input-group-append">
                                <span class="input-group-text send_btn"><i class="fas fa-location-arrow"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
require('moment/locale/ru')

export default {
    name: "Chat",
    data(){
        return {
            action_menu: false,
            dash_id: null,
            users: [],
            activeIndex: 0,
            title_text: '',
            messages: []
        }
    },
    watch: {
      '$store.getters.statusUser': function (value){
          if (value){
              window.Echo.private('chat-get')
                  .listen('.chat_messages', res => {
                      this.getMessages();
                  })
          }
      }
    },
    mounted() {
        this.dash_id = this.decoder(this.$route.params.id);
        this.getUsers()
        this.getMessages();
    },
    methods: {
        getUsers(){
            this.axios.post('/api/dashboard/getUsersDashboard', {
                dashboard_id: this.dash_id
            })
                .then(res => {
                    this.users = res.data
                })
        },
        sendMessage(){
            this.axios.post('/api/chat/send', {
                chat_dashboard_id: this.dash_id,
                text: this.title_text,
                user_id: this.$store.getters.infoUser.id
            },{
                headers: {
                    Authorization: "Bearer " + this.$store.getters.getToken
                }
            })
                .then(res => {
                    this.messages.push(res.data.data);
                    this.title_text = ''
                    this.$nextTick(() => {
                        this.keepScrollDown();
                    });
                })
        },
        getMessages(){
            this.axios.post('/api/chat/getMessages', {
                dashboard_id: this.dash_id,
            },{
                headers: {
                    Authorization: "Bearer " + this.$store.getters.getToken
                }
            })
                .then(res => {
                    this.messages = res.data.data;
                    this.$nextTick(() => {
                        this.keepScrollDown();
                    });
                })
        },
        convertData(date){
            return moment(date).format("HH:mm");
        },
        keepScrollDown(){
            let messageBody = document.getElementById('content_messages');
            messageBody.scrollTop = messageBody.scrollHeight;
        }
    }
}
</script>

<style scoped>
body,html{
    height: 100%;
    margin: 0;
    background: #7F7FD5;
    background: -webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
    background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
}

.chat{
    margin-top: auto;
    margin-bottom: auto;
}
.card{
    height: 500px;
    border-radius: 15px !important;
    background-color: rgba(0,0,0,0.4) !important;
}
.contacts_body{
    padding:  0.75rem 0 !important;
    overflow-y: auto;
    white-space: nowrap;
}
.msg_card_body{
    overflow-y: auto;
}
.card-header{
    border-radius: 15px 15px 0 0 !important;
    border-bottom: 0 !important;
}
.card-footer{
    border-radius: 0 0 15px 15px !important;
    border-top: 0 !important;
}
.container{
    align-content: center;
}
.search{
    border-radius: 15px 0 0 15px !important;
    background-color: rgba(0,0,0,0.3) !important;
    border:0 !important;
    color:white !important;
}
.search:focus{
    box-shadow:none !important;
    outline: 0 !important;
}
.type_msg{
    background-color: rgba(0,0,0,0.3) !important;
    border:0 !important;
    color:white !important;
    height: 60px !important;
    overflow-y: auto;
}
.type_msg:focus{
    box-shadow:none !important;
    outline: 0 !important;
}
.attach_btn{
    border-radius: 15px 0 0 15px !important;
    background-color: rgba(0,0,0,0.3) !important;
    border:0 !important;
    color: white !important;
    cursor: pointer;
    height: 100%;
}
.send_btn{
    border-radius: 0 15px 15px 0 !important;
    background-color: rgba(0,0,0,0.3) !important;
    border:0 !important;
    color: white !important;
    cursor: pointer;
    height: 100%;
}
.search_btn{
    border-radius: 0 15px 15px 0 !important;
    background-color: rgba(0,0,0,0.3) !important;
    border:0 !important;
    color: white !important;
    cursor: pointer;
    height: 100%;
}
.contacts{
    list-style: none;
    padding: 0;
}
.contacts li{
    width: 100% !important;
    padding: 5px 10px;
    margin-bottom: 15px !important;
}
.active{
    background-color: rgba(0,0,0,0.3);
}
.user_img{
    height: 70px;
    width: 70px;
    border:1.5px solid #f5f6fa;

}
.user_img_msg{
    height: 40px;
    width: 40px;
    border:1.5px solid #f5f6fa;

}
.img_cont{
    position: relative;
    height: 70px;
    width: 70px;
}

.online_icon{
    position: absolute;
    height: 15px;
    width:15px;
    background-color: #4cd137;
    border-radius: 50%;
    bottom: 0.2em;
    right: 0.4em;
    border:1.5px solid white;
}
.offline{
    background-color: #c23616 !important;
}
.user_info{
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 15px;
}
.user_info span{
    font-size: 20px;
    color: white;
}
.user_info p{
    font-size: 10px;
    color: rgba(255,255,255,0.6);
}
.video_cam{
    margin-left: 50px;
    margin-top: 5px;
}
.video_cam span{
    color: white;
    font-size: 20px;
    cursor: pointer;
    margin-right: 20px;
}
.msg_cotainer{
    width: auto;
    max-width: 235px;
    min-width: 50px;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
    border-radius: 25px;
    background-color: #82ccdd;
    padding: 10px;
    position: relative;
}
.msg_cotainer_send{
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 10px;
    border-radius: 25px;
    background-color: #78e08f;
    padding: 10px;
    position: relative;
}
.msg_time{
    position: absolute;
    left: 8px;
    bottom: -1px;
    color: rgba(255,255,255,0.8);
    font-size: 10px;
    max-width: 40px;
    min-width: 35px;
}
.msg_time_send{
    position: absolute;
    right:0;
    bottom: -15px;
    color: rgba(255,255,255,0.5);
    font-size: 10px;
}
.msg_head{
    position: relative;
}
#action_menu_btn{
    position: absolute;
    right: 10px;
    top: 10px;
    color: white;
    cursor: pointer;
    font-size: 20px;
}
.action_menu{
    z-index: 1;
    position: absolute;
    padding: 15px 0;
    background-color: rgba(0,0,0,0.5);
    color: white;
    border-radius: 15px;
    top: 30px;
    right: 15px;
}
.action_menu ul{
    list-style: none;
    padding: 0;
    margin: 0;
}
.action_menu ul li{
    width: 100%;
    padding: 10px 15px;
    margin-bottom: 5px;
}
.action_menu ul li i{
    padding-right: 10px;

}
.action_menu ul li:hover{
    cursor: pointer;
    background-color: rgba(0,0,0,0.2);
}

.name_user{
    top: -16px;
    left: 0;
    font-size: 12px;
    color: floralwhite;
}

@media(max-width: 576px){
    .contacts_card{
        margin-bottom: 15px !important;
    }
}
</style>
