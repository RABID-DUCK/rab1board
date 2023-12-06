"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[864],{864:(e,s,o)=>{o.r(s),o.d(s,{default:()=>N});var a=o(821),r={class:"container"},t={class:"row justify-content-center"},n={class:"col-md-8"},l={class:"card"},i=(0,a._)("div",{class:"card-header text-center"},"Register",-1),d={class:"card-body"},c={method:"POST",action:"register"},m={class:"row mb-3"},u=(0,a._)("label",{for:"name",class:"col-md-4 col-form-label text-md-end"},"Name",-1),p={class:"col-md-6"},f={class:"row mb-3"},w=(0,a._)("label",{for:"name",class:"col-md-4 col-form-label text-md-end"},"Login",-1),_={class:"col-md-6"},b={class:"row mb-3"},v=(0,a._)("label",{for:"email",class:"col-md-4 col-form-label text-md-end"},"Email address",-1),g={class:"col-md-6"},h={class:"row mb-3"},y=(0,a._)("label",{for:"password",class:"col-md-4 col-form-label text-md-end"},"Password",-1),x={class:"col-md-6"},k={class:"row mb-3"},U=(0,a._)("label",{for:"password-confirm",class:"col-md-4 col-form-label text-md-end"},"Confirm password",-1),q={class:"col-md-6"},V={class:"row mb-0"},C={class:"col-md-6 offset-md-4"};var $=o(123),R=o.n($);const L={name:"Register",data:function(){return{message:"",name:"",login:"",email:"",password:"",password_confirm:""}},mounted:function(){this.$store.getters.statusUser&&this.$router.push({name:"main"})},methods:{register:function(){var e=this;this.axios.post("/api/user/register",{name:this.name,login:this.login,email:this.email,password:this.password,password_confirmation:this.password_confirm}).then((function(s){R().set("access_token",s.data.access_token,{expires:"30d"}),e.$store.commit("AUTH_LOGIN",s.data.user),e.$router.push({name:"main"})}))}}};const N=(0,o(744).Z)(L,[["render",function(e,s,o,$,R,L){return(0,a.wg)(),(0,a.iD)("div",r,[(0,a._)("div",t,[(0,a._)("div",n,[(0,a._)("div",l,[i,(0,a._)("div",d,[(0,a._)("form",c,[(0,a._)("div",m,[u,(0,a._)("div",p,[(0,a.wy)((0,a._)("input",{id:"name","onUpdate:modelValue":s[0]||(s[0]=function(e){return R.name=e}),type:"text",class:"form-control",name:"name",required:"",autocomplete:"name",autofocus:""},null,512),[[a.nr,R.name]])])]),(0,a._)("div",f,[w,(0,a._)("div",_,[(0,a.wy)((0,a._)("input",{id:"login","onUpdate:modelValue":s[1]||(s[1]=function(e){return R.login=e}),type:"text",class:"form-control",name:"login",required:"",autocomplete:"login",autofocus:""},null,512),[[a.nr,R.login]])])]),(0,a._)("div",b,[v,(0,a._)("div",g,[(0,a.wy)((0,a._)("input",{id:"email","onUpdate:modelValue":s[2]||(s[2]=function(e){return R.email=e}),type:"email",class:"form-control",name:"email",required:"",autocomplete:"email"},null,512),[[a.nr,R.email]])])]),(0,a._)("div",h,[y,(0,a._)("div",x,[(0,a.wy)((0,a._)("input",{id:"password","onUpdate:modelValue":s[3]||(s[3]=function(e){return R.password=e}),type:"password",class:"form-control",name:"password",required:"",autocomplete:"new-password"},null,512),[[a.nr,R.password]])])]),(0,a._)("div",k,[U,(0,a._)("div",q,[(0,a.wy)((0,a._)("input",{id:"password-confirm","onUpdate:modelValue":s[4]||(s[4]=function(e){return R.password_confirm=e}),type:"password",class:"form-control",name:"password_confirmation",required:"",autocomplete:"new-password"},null,512),[[a.nr,R.password_confirm]])])]),(0,a._)("div",V,[(0,a._)("div",C,[(0,a._)("button",{type:"submit",class:"btn btn-primary",onClick:s[5]||(s[5]=(0,a.iM)((function(){return L.register&&L.register.apply(L,arguments)}),["prevent"]))}," Register ")])])])])])])])])}]])}}]);