(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2da1ff0a"],{"39f1":function(t,e,s){"use strict";var a=s("40b3"),n=s.n(a);n.a},"40b3":function(t,e,s){},a55b:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("main",[s("div",{staticClass:"wrapper"},[s("p",{staticClass:"login-msg"},[t._v(t._s(this.$store.state.authenticationMessage))]),s("h1",{staticClass:"underline underline--center"},[t._v("Login")]),s("form",{on:{submit:function(e){return e.preventDefault(),t.verifyAuthentication(e)}}},[s("ul",{staticClass:"form"},[s("li",{staticClass:"form__item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"form__input",attrs:{type:"text",id:"name",name:"name"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})]),s("li",{staticClass:"form__item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form__input",attrs:{type:"password",id:"password",name:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),t._m(0)])])])])},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",{staticClass:"form__item"},[s("button",{staticClass:"form__btn",attrs:{type:"submit"}},[t._v("Login")])])}],i={name:"Login",data(){return{name:"",password:""}},computed:{isAuthenticated(){return this.$store.state.isAuthenticated}},methods:{verifyAuthentication(){const t={name:this.name,password:this.password};this.$store.dispatch("verifyAuthentication",{credentials:t,router:this.$router})}}},r=i,o=(s("39f1"),s("2877")),u=Object(o["a"])(r,a,n,!1,null,"053de742",null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2da1ff0a.584d2ede.js.map