(this.webpackJsonpsemeru=this.webpackJsonpsemeru||[]).push([[0],{140:function(e){e.exports=JSON.parse('{"name":"de","test":{"greeting":"hallo"},"errors":{"removeQuickTask":"Konnte Schnelltask nicht l\xf6schen","addQuickTask":"Konnte Schnelltask nicht hinzuf\xfcgen","getTasks":"Konnte Tasks nicht laden","getCurrentTask":"Konnte die aktuelle Task nicht laden","updateCurrentTask":"Konnte die aktuelle Task nicht speichern","getQuickTasks":"Konnte Schnelltasks nicht laden","setLocale":"Konnte Spracheinstellungen nicht speichern","addTask":"Konnte Task nicht speichern"},"root":{"timerPage":"Timer","settingsPage":"Optionen","dataPage":"Statistiken","languages":{"de":"Deutsch","en":"Englisch","title":"Deutsch"}},"timer":{"start":"Start","pause":"Pause","resume":"Weiter","stop":"Stopp","cancel":"Abbrechen","enterLastTaskName":"Name der letzten Aufgabe eingeben:","enterBreakName":"Task w\xe4hrend der Pause eingeben (leer f\xfcr keine):"},"settings":{"quickTasks":"Schnelltasks","new":"Neu","newTaskMessage":"Aufgabenname eingeben","synchronizeTitle":"Mit der Cloud synchronosieren","mustBeLoggedIn":"Du musst eingeogged sein, um diese Funktion zu benutzen","fromLtoC":"Von Lokal zur Cloud","fromCtoL":"Von der Cloud zu Lokal","upload":"Hochladen","download":"Herunterladen","syncExplain":"Man kann alles lokal speichern, um die App zu nutzen, ohne eingelogged zu sein.","deleteData":"Daten l\xf6schen. Kann nicht r\xfcckg\xe4ngig gemacht werden!","delete":"L\xf6schen"},"stats":{"day":"Tag","week":"Woche","month":"Monat","all":"Alle"},"auth":{"signIn":"Login","signUp":"Registrieren","signOut":"Ausloggen","email":"E-Mail","password":"Passwort","passwordConfirm":"Passwort best\xe4tigen","incorrectPassword":"Falsches Passwort","incorrectEmail":"Falsche E-Mail","passwordReq":"Passwort ben\xf6tigt","emailReq":"E-Mail ben\xf6tigt","notAnEmail":"Keine E-Mail Adresse","userNotFound":"E-Mail nicht gefunden","passwordMustMatch":"Passw\xf6rter m\xfcssen \xfcbereinstimmten","passwordLength":"Passwort muss mindestens 6 Zeichen lang sein","weakPassword":"Passwort zu schwach","emailAlreadyInUse":"Email bereits verwendet","noAccountYet":"Noch keinen Account?","accountInfo":"Es braucht keinen Account, um SEMERU nutzen zu k\xf6nnen. Mit einem Account kann man jedoch den Timer und die Aufgaben \xfcber mehrere Ger\xe4te verkn\xfcpfen."},"prompt":{"ok":"Ok","cancel":"Abbrechen"}}')},141:function(e){e.exports=JSON.parse('{"apiKey":"AIzaSyCCu8thmlZuqNG2MhJjnCloW5sO_7C83g4","authDomain":"semeru-242a3.firebaseapp.com","databaseURL":"https://semeru-242a3-default-rtdb.europe-west1.firebasedatabase.app","projectId":"semeru-242a3","storageBucket":"semeru-242a3.appspot.com","messagingSenderId":"670943232847","appId":"1:670943232847:web:44b88be3a66c06b1edfb3a","measurementId":"G-M1LHVFVQFR"}')},256:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(52),c=n.n(s),i=n(1),u=n.n(i),o=n(3),l=n(17),h=n(36),d=n(23),f=n(28),j=n(267),p=n(262),b=n(269),m=n(131),k=n(132),O=n(265),v=n(8),g=function(e){var t=e.changeLocale,n=Object(a.useContext)(re),r=Object(a.useContext)(se);return Object(v.jsx)(j.a,{collapseOnSelect:!0,expand:"lg",children:Object(v.jsxs)(p.a,{children:[Object(v.jsx)(h.b,{to:"/",className:"navbar-brand",children:"Semeru"}),Object(v.jsx)(j.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),Object(v.jsx)(j.a.Collapse,{id:"responsive-navbar-nav",children:Object(v.jsxs)(b.a,{className:"me-auto",children:[Object(v.jsx)(h.b,{to:"/",className:"nav-link",children:n.root.timerPage}),Object(v.jsx)(h.b,{to:"/settings",className:"nav-link",children:n.root.settingsPage}),Object(v.jsx)(h.b,{to:"/stats",className:"nav-link",children:n.root.dataPage}),r?Object(v.jsx)(m.a,{children:Object(v.jsx)(k.a,{variant:"outline-primary",onClick:function(){f.a.auth().signOut().then((function(){return window.location.reload()})).catch((function(e){console.error("Could not sign out user",e)}))},children:n.auth.signOut})}):Object(v.jsx)(h.b,{to:"/sign-in",className:"nav-link",children:n.auth.signIn}),Object(v.jsxs)(O.a,{title:n.root.languages.title,id:"collasible-nav-dropdown",children:[Object(v.jsx)(O.a.Item,{onClick:function(){return t("en")},children:n.root.languages.en}),Object(v.jsx)(O.a.Item,{onClick:function(){return t("de")},children:n.root.languages.de})]})]})})]})})},x=n(22),w=n(39),y=n(263);function T(e){var t=e.breaks.map((function(e){return e.end-e.start})).reduce((function(e,t){return e+t}),0);return(e.currentBreakStart||Date.now())-e.start-t}function C(e){return Object.values(e)}function S(e,t){var n={};return e.map((function(e){return Object(w.a)(Object(w.a)({},e),{},{start:Math.max(e.start,t)})})).filter((function(e){return e.end>t})).forEach((function(e){var t;n[e.name]=null!==(t=n[e.name])&&void 0!==t?t:{name:e.name,time:0},n[e.name].time+=function(e){var t=e.breaks.map((function(e){return e.end-e.start})).reduce(M,0);return e.end-e.start-t}(e)})),Object.entries(n).sort((function(e,t){var n=Object(l.a)(e,2)[1];return Object(l.a)(t,2)[1].time-n.time})).map((function(e){var t=Object(l.a)(e,2);return{name:t[0],time:t[1].time}}))}var M=function(e,t){return e+t},E=function(e){var t=e.highlight,n=e.name,a=e.handler;return Object(v.jsx)(k.a,{onClick:a,variant:t?"success":"outline-success",className:"m-1",children:n})},N=function(e){return Object(v.jsx)("h1",{style:{fontSize:60},children:Object(v.jsx)(L,Object(w.a)({},e))})},L=function(e){var t=e.task,n=Object(a.useState)(0),r=Object(l.a)(n,2)[1];return Object(a.useEffect)((function(){if(t){var e=setInterval((function(){r((function(e){return e+1}))}),500);return function(){return clearInterval(e)}}}),[t]),Object(v.jsx)(v.Fragment,{children:t?P(T(t)):"00:00:00"})};function P(e){var t=(e/=1e3)%60,n=e/60,a=0;return n>60&&(a=n/60,n%=60),"".concat(Math.floor(Math.max(a,0)).toString().padStart(2,"0"),":")+"".concat(Math.floor(Math.max(n,0)).toString().padStart(2,"0"),":")+"".concat(Math.floor(Math.max(t,0)).toString().padStart(2,"0"))}var q=function(e){var t=e.quickTasks,n=Object(a.useContext)(re),r=Object(a.useContext)(ce),s=Object(a.useContext)(ie),c=Object(a.useState)(null),i=Object(l.a)(c,2),h=i[0],d=i[1],f=C(t);Object(a.useEffect)((function(){var e=function(e){return d(e?(t=e,Object(w.a)({breaks:[]},t)):null);var t};return r.getCurrentTask(e).catch(s(n.errors.getCurrentTask)),function(){r.removeListener(e).catch(s(n.errors.getCurrentTask))}}),[n,s,r]);var j=function(){var e=Object(o.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b();case 2:if(e.sent){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,r.start(t);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),b=function(){var e=Object(o.a)(u.a.mark((function e(){var t,a,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(h){e.next=2;break}return e.abrupt("return",!0);case 2:if(t=h.name){e.next=8;break}if(a=window.prompt(n.timer.enterLastTaskName)){e.next=7;break}return e.abrupt("return",!1);case 7:t=a;case 8:return c=Object(w.a)(Object(w.a)({},h),{},{name:t}),e.next=11,r.stop(c).catch(s(n.errors.addTask));case 11:return e.abrupt("return",!0);case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),O=function(){var e=Object(o.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.cancel();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),g=!!f.find((function(e){return e===(null===h||void 0===h?void 0:h.name)}));return Object(v.jsxs)(m.a,{className:"d-grid justify-content-center",children:[Object(v.jsxs)(y.a,{children:[Object(v.jsx)(p.a,{className:"d-grid justify-content-center",children:Object(v.jsx)(N,{task:h})}),Object(v.jsx)(p.a,{className:"d-grid justify-content-center",children:Object(v.jsxs)(m.a,{children:[Object(v.jsx)(k.a,{variant:g||!h?"outline-success":"success",onClick:function(){return j()},children:n.timer.start}),(null===h||void 0===h?void 0:h.currentBreakStart)?Object(v.jsx)(k.a,{variant:"info",className:"m-1",onClick:function(){if(console.log(h),!(null===h||void 0===h?void 0:h.currentBreakStart))return h;var e=Date.now(),t={start:h.start,name:h.name||null,breaks:[].concat(Object(x.a)(h.breaks),[{start:h.currentBreakStart,end:e}])};r.updateCurrentTask(t).catch(s(n.errors.updateCurrentTask));var a=window.prompt(n.timer.enterBreakName);if(a){var c={start:h.currentBreakStart,name:a,end:e,breaks:[]};r.addTask(c).catch(s(n.errors.addTask))}},children:n.timer.resume}):Object(v.jsx)(k.a,{variant:"outline-info",className:"m-1",onClick:function(){var e=h&&Object(w.a)(Object(w.a)({},h),{},{currentBreakStart:Date.now()});r.updateCurrentTask(e).catch(s(n.errors.updateCurrentTask))},children:n.timer.pause}),Object(v.jsx)(k.a,{variant:"outline-danger",onClick:b,children:n.timer.stop}),Object(v.jsx)(k.a,{variant:"outline-danger",className:"m-1",onClick:O,children:n.timer.cancel})]})})]}),Object(v.jsx)("div",{className:"m-3"}),Object(v.jsx)(y.a,{className:"d-grid justify-content-center",children:f.map((function(e){return Object(v.jsx)(E,{highlight:e===(null===h||void 0===h?void 0:h.name),name:e,handler:function(){return j(e)}},e)}))})]})},I=function(e){var t=e.quickTasks,n=e.upload,r=e.download,s=Object(a.useContext)(re),c=Object(a.useContext)(se),i=Object(a.useContext)(ce),h=Object(a.useContext)(ie),d=function(){var e=Object(o.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=window.prompt(s.settings.newTaskMessage)){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,i.addQuickTask(t).catch(h(s.errors.addQuickTask));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(v.jsx)(p.a,{children:Object(v.jsxs)(y.a,{children:[Object(v.jsxs)(y.a,{className:"mb-4",children:[Object(v.jsx)("h2",{children:s.settings.quickTasks}),Object.entries(t).map((function(e){var t=Object(l.a)(e,2),n=t[0],a=t[1];return Object(v.jsx)(y.a,{children:Object(v.jsxs)(m.a,{xs:10,children:[Object(v.jsx)(E,{name:a,handler:function(){}}),Object(v.jsx)(k.a,{className:"m-1",onClick:function(){return function(e){return i.removeQuickTask(e).catch(h(s.errors.removeQuickTask))}(n)},variant:"outline-danger",children:"X"})]})},n)})),Object(v.jsx)(y.a,{children:Object(v.jsx)(m.a,{children:Object(v.jsx)(k.a,{variant:"outline-primary",className:"m-1",onClick:d,children:s.settings.new})})})]}),Object(v.jsxs)(y.a,{className:"mb-4",children:[Object(v.jsx)("h2",{children:s.settings.synchronizeTitle}),c?Object(v.jsxs)(m.a,{children:[s.settings.syncExplain,Object(v.jsx)("h5",{children:s.settings.fromCtoL}),Object(v.jsx)(k.a,{variant:"outline-primary",onClick:n,children:s.settings.upload}),Object(v.jsx)("h5",{className:"mt-3",children:s.settings.fromLtoC}),Object(v.jsx)(k.a,{variant:"outline-primary",onClick:r,children:s.settings.download}),Object(v.jsx)("h5",{className:"mt-3",children:s.settings.deleteData}),Object(v.jsx)(k.a,{variant:"outline-primary",onClick:r,children:s.settings.delete})]}):Object(v.jsx)("h5",{children:s.settings.mustBeLoggedIn})]})]})})},A=n(264),D=n(134),Q=["day","week","month","all"],F=function(e){switch(e){case"all":return 0;case"day":var t=new Date;return t.setHours(0,0,0),t.getTime();case"week":var n=new Date,a=(n.getDay()||7)-1,r=n.getDate()-a;return n.setDate(r),n.setHours(0,0,0),n.getTime();case"month":var s=new Date;return s.setDate(1),s.setHours(0,0,0),s.getTime()}};function z(e){var t=(e/=1e3)%60,n=e/60,a=0;return n>60&&(a=n/60,n%=60),"".concat(Math.floor(a),"h ").concat(Math.floor(n),"min ").concat(Math.floor(t),"s")}var B=function(){var e=Object(a.useContext)(re),t=Object(a.useContext)(ce),n=Object(a.useContext)(ie),r=Object(a.useState)("day"),s=Object(l.a)(r,2),c=s[0],i=s[1],u=Object(a.useState)([]),o=Object(l.a)(u,2),h=o[0],d=o[1];return Object(a.useEffect)((function(){var a=function(e){return d(S(C(e).map((function(e){return Object(w.a)({breaks:[]},e)})),F(c)))};return t.getTasks(a).catch(n(e.errors.getTasks)),function(){t.removeListener(a).catch(n(e.errors.getTasks))}}),[e,n,t,c]),Object(v.jsxs)(p.a,{children:[Object(v.jsx)("div",{className:"mb-2",children:Q.map((function(t){return Object(v.jsx)("span",{className:"m-1",children:Object(v.jsx)(k.a,{variant:c===t?"secondary":"outline-secondary",onClick:function(){return i(t)},children:e.stats[t]})},t)}))}),Object(v.jsx)(A.a,{children:h.map((function(e){return Object(v.jsx)(D.a,{children:Object(v.jsx)(p.a,{children:Object(v.jsxs)(y.a,{children:[Object(v.jsx)(m.a,{children:e.name}),Object(v.jsx)(m.a,{children:z(e.time)})]})})},e.name)}))})]})},R=n(266),_=n(268),U=n(90),K=n(42),J=function(){var e=Object(a.useContext)(re),t=Object(a.useState)(null),n=Object(l.a)(t,2),r=n[0],s=n[1],c=Object(d.f)(),i=Object(a.useMemo)((function(){return K.a().shape({email:K.c().email(e.auth.notAnEmail).required(e.auth.emailReq),password:K.c().required(e.auth.passwordReq)})}),[e]),u=Object(a.useMemo)((function(){return{"auth/invalid-email":e.auth.notAnEmail,"auth/user-disabled":e.auth.userNotFound,"auth/user-not-found":e.auth.userNotFound,"auth/wrong-password":e.auth.incorrectPassword}}),[e]),o=Object(U.a)({initialValues:{email:"",password:""},validationSchema:i,onSubmit:function(e){s(null),f.a.auth().signInWithEmailAndPassword(e.email,e.password).then((function(){s(null),c.push("/")})).catch((function(e){console.error(e),s(u[e.code])}))},validateOnChange:!1,validateOnBlur:!0});return Object(v.jsxs)("div",{children:[Object(v.jsx)("h1",{children:e.auth.signIn}),Object(v.jsxs)(R.a,{onSubmit:function(e){e.preventDefault(),o.handleSubmit(e)},children:[["email","password"].map((function(t){return Object(v.jsxs)(R.a.Group,{children:[Object(v.jsx)(R.a.Label,{children:e.auth[t]}),Object(v.jsx)(R.a.Control,{type:t,name:t,isInvalid:!!o.errors[t],value:o.values[t],onChange:o.handleChange}),Object(v.jsx)(_.a,{variant:"danger",show:!!o.errors[t],children:o.errors[t]})]},t)})),Object(v.jsx)(k.a,{type:"submit",children:e.auth.signIn}),Object(v.jsx)(_.a,{variant:"danger",show:!!r,children:r})]}),Object(v.jsxs)("div",{children:[Object(v.jsx)("div",{children:e.auth.noAccountYet}),Object(v.jsx)(h.b,{to:"/sign-up",children:e.auth.signUp})]})]})},V=function(){var e=Object(a.useContext)(re),t=Object(a.useState)(null),n=Object(l.a)(t,2),r=n[0],s=n[1],c=Object(d.f)(),i=Object(a.useMemo)((function(){return K.a().shape({email:K.c().email(e.auth.notAnEmail).required(e.auth.emailReq),password:K.c().required(e.auth.passwordReq),passwordConfirm:K.c().required(e.auth.passwordReq).min(6,e.auth.passwordLength).oneOf([K.b("password")],e.auth.passwordMustMatch)})}),[e]),u=Object(a.useMemo)((function(){return{"auth/invalid-email":e.auth.notAnEmail,"auth/email-already-in-use":e.auth.emailAlreadyInUse,"auth/weak-password":e.auth.weakPassword}}),[e]),o=Object(U.a)({initialValues:{email:"",password:"",passwordConfirm:""},validationSchema:i,onSubmit:function(e){s(null),f.a.auth().createUserWithEmailAndPassword(e.email,e.password).then((function(){s(null),c.push("/")})).catch((function(e){console.error(e),s(u[e.code])}))},validateOnChange:!1,validateOnBlur:!0});return Object(v.jsxs)("div",{children:[Object(v.jsx)("h1",{children:e.auth.signUp}),Object(v.jsx)("p",{children:e.auth.accountInfo}),Object(v.jsxs)(R.a,{onSubmit:function(e){e.preventDefault(),o.handleSubmit(e)},children:[["email","password","passwordConfirm"].map((function(t){return Object(v.jsxs)(R.a.Group,{children:[Object(v.jsx)(R.a.Label,{children:e.auth[t]}),Object(v.jsx)(R.a.Control,{type:t,name:t,isInvalid:!!o.errors[t],value:o.values[t],onChange:o.handleChange}),Object(v.jsx)(_.a,{variant:"danger",show:!!o.errors[t],children:o.errors[t]})]},t)})),Object(v.jsx)(k.a,{type:"submit",children:e.auth.signIn}),Object(v.jsx)(_.a,{variant:"danger",show:!!r,children:r})]})]})},G=n(4),H=n(5),W=n(12),Y=n(13),Z=function(){function e(){Object(G.a)(this,e)}return Object(H.a)(e,[{key:"start",value:function(){var e=Object(o.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={name:t||null,start:Date.now(),breaks:[]},e.next=3,this.set("currentTask",n);case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"stop",value:function(){var e=Object(o.a)(u.a.mark((function e(t){var n,a,r,s,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.start,a=t.name,r=t.breaks,s=Date.now(),c={start:n,end:s,breaks:r,name:a},e.next=5,Promise.all([this.addTask(c),this.set("currentTask",null)]);case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"clear",value:function(){var e=Object(o.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.set("tasks",{});case 2:return e.next=4,this.set("currentTask",{});case 4:return e.next=6,this.set("quickTasks",{});case 6:return e.next=8,this.set("locale","en");case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"addTask",value:function(){var e=Object(o.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.push("tasks",t);case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"cancel",value:function(){var e=Object(o.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.set("currentTask",null);case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"updateCurrentTask",value:function(){var e=Object(o.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.set("currentTask",t);case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"setLocale",value:function(){var e=Object(o.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.set("locale",t);case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"addQuickTask",value:function(){var e=Object(o.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.push("quickTasks",t);case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getTasks",value:function(e){return this.get("tasks",{},e)}},{key:"getQuickTasks",value:function(e){return this.get("quickTasks",{},e)}},{key:"getLocale",value:function(e){return this.get("locale","en",e)}},{key:"getCurrentTask",value:function(e){return this.get("currentTask",null,e)}}]),e}(),X=function(e){Object(W.a)(n,e);var t=Object(Y.a)(n);function n(){var e;Object(G.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r)))._listeners=[],e}return Object(H.a)(n,[{key:"getOnce",value:function(){var e=Object(o.a)(u.a.mark((function e(t,n){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=localStorage.getItem(t)){e.next=3;break}return e.abrupt("return",n);case 3:return e.abrupt("return",JSON.parse(a));case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"set",value:function(){var e=Object(o.a)(u.a.mark((function e(t,n){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=JSON.stringify(n),localStorage.setItem(t,a),this._listeners.filter((function(e){return e.value===t})).forEach((function(e){var t=e.listener,a=e.defaultValue;return t(n||a)}));case 3:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"removeQuickTask",value:function(){var e=Object(o.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getOnce("quickTasks",{});case 2:return delete(n=e.sent)[t],e.next=6,this.set("quickTasks",n);case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"removeListener",value:function(){var e=Object(o.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this._listeners=this._listeners.filter((function(e){return e.listener!==t}));case 1:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"pushAll",value:function(e,t){this.set(e,C(t)).then()}},{key:"push",value:function(){var e=Object(o.a)(u.a.mark((function e(t,n){var a,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="id".concat(Date.now(),"_").concat(Math.floor(1e3*Math.random())),e.next=3,this.getOnce(t,{});case 3:return(r=e.sent)[a]=n,e.next=7,this.set(t,r);case 7:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"get",value:function(){var e=Object(o.a)(u.a.mark((function e(t,n,a){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this._listeners.push({value:t,listener:a,defaultValue:n}),e.t0=a,e.next=4,this.getOnce(t,n);case 4:e.t1=e.sent,(0,e.t0)(e.t1);case 6:case"end":return e.stop()}}),e,this)})));return function(t,n,a){return e.apply(this,arguments)}}()}]),n}(Z),$=function(e){Object(W.a)(n,e);var t=Object(Y.a)(n);function n(e){var a;return Object(G.a)(this,n),(a=t.call(this))._user=void 0,a._listenerMap=void 0,a._user=e,a._listenerMap=new Map,a}return Object(H.a)(n,[{key:"removeListener",value:function(){var e=Object(o.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=this._listenerMap.get(t)){e.next=3;break}return e.abrupt("return");case 3:f.a.database().ref(this.path(n.name)).off("value",n.listener);case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"removeQuickTask",value:function(){var e=Object(o.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.database().ref("".concat(this.path("quickTasks"),"/").concat(t)).set(null);case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getOnce",value:function(e,t){return f.a.database().ref(this.path(e)).get().then((function(e){return e.val()}))}},{key:"set",value:function(){var e=Object(o.a)(u.a.mark((function e(t,n){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.database().ref(this.path(t)).set(n);case 2:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"push",value:function(){var e=Object(o.a)(u.a.mark((function e(t,n){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:f.a.database().ref(this.path(t)).push(n);case 1:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"get",value:function(){var e=Object(o.a)(u.a.mark((function e(t,n,a){var r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=function(e){return a(e.val()||n)},this._listenerMap.set(a,{name:t,listener:r}),f.a.database().ref(this.path(t)).on("value",r);case 3:case"end":return e.stop()}}),e,this)})));return function(t,n,a){return e.apply(this,arguments)}}()},{key:"path",value:function(e){return"users/".concat(this._user.uid,"/").concat(e)}}]),n}(Z),ee=n(140),te=n(94),ne={de:ee,en:te},ae=new X,re=r.a.createContext(te),se=r.a.createContext(null),ce=r.a.createContext(ae),ie=r.a.createContext((function(){return function(){}})),ue=function(){var e=Object(o.a)(u.a.mark((function e(t,n){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getOnce("tasks",{}).then((function(e){return C(e).forEach((function(e){return n.addTask(e)}))}));case 2:return e.next=4,t.getOnce("locale","en").then((function(e){return n.setLocale(e)}));case 4:return e.next=6,t.getOnce("quickTasks",{}).then((function(e){return C(e).forEach((function(e){return n.addQuickTask(e)}))}));case 6:return e.next=8,t.getOnce("currentTask",null).then((function(e){return n.updateCurrentTask(e)}));case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),oe=function(){var e=Object(a.useCallback)((function(e){return function(t){console.error(e,t),S(e),setTimeout((function(){return S(null)}),3e3)}}),[]),t=Object(a.useState)(te),n=Object(l.a)(t,2),r=n[0],s=n[1],c=Object(a.useState)(ae),i=Object(l.a)(c,2),u=i[0],o=i[1],j=Object(a.useState)({}),p=Object(l.a)(j,2),b=p[0],m=p[1],k=Object(a.useState)(null),O=Object(l.a)(k,2),x=O[0],w=O[1],y=Object(a.useState)(null),T=Object(l.a)(y,2),C=T[0],S=T[1];Object(a.useEffect)((function(){var t=function(e){return s(ne[e])};return u.getLocale(t).catch(),function(){u.removeListener(t).catch(e(r.errors.getQuickTasks))}}),[r,e,u]),Object(a.useEffect)((function(){var t=function(e){return m(e)};return u.getQuickTasks(t).catch(e(r.errors.getQuickTasks)),function(){u.removeListener(t).catch(e(r.errors.getQuickTasks))}}),[r,e,u]),Object(a.useEffect)((function(){f.a.auth().onAuthStateChanged((function(e){w(e),o(e?new $(e):ae)}))}),[]);return Object(v.jsx)("div",{lang:r.name,children:Object(v.jsx)(h.a,{children:Object(v.jsx)(re.Provider,{value:r,children:Object(v.jsx)(se.Provider,{value:x,children:Object(v.jsx)(ce.Provider,{value:u,children:Object(v.jsxs)(ie.Provider,{value:e,children:[Object(v.jsx)(g,{changeLocale:function(t){return u.setLocale(t).catch(e(r.errors.setLocale))}}),Object(v.jsxs)(d.c,{children:[Object(v.jsx)(d.a,{path:"/settings",children:Object(v.jsx)(I,{quickTasks:b,upload:function(){return ue(ae,u)},download:function(){return ue(u,ae)}})}),Object(v.jsx)(d.a,{path:"/stats",children:Object(v.jsx)(B,{})}),Object(v.jsx)(d.a,{path:"/sign-in",component:J}),Object(v.jsx)(d.a,{path:"/sign-up",component:V}),Object(v.jsx)(d.a,{path:"/",children:Object(v.jsx)(q,{quickTasks:b})})]}),Object(v.jsx)("footer",{children:Object(v.jsx)(_.a,{variant:"danger",show:!!C,children:C})})]})})})})})})},le=(n(252),n(141));n(253),n(257);0===f.a.apps.length&&f.a.initializeApp(le),c.a.render(Object(v.jsx)(r.a.StrictMode,{children:Object(v.jsx)(oe,{})}),document.getElementById("root"))},94:function(e){e.exports=JSON.parse('{"name":"en","test":{"greeting":"hi"},"errors":{"removeQuickTask":"Failed to remove quick task","addQuickTask":"Failed to add quick task","getTasks":"Failed to fetch tasks","getCurrentTask":"Failed to fetch current task","updateCurrentTask":"Failed to update current task","getQuickTasks":"Failed to fetch quick tasks","setLocale":"Failed to save language settings","addTask":"Failed to save task"},"root":{"timerPage":"Timer","settingsPage":"Settings","dataPage":"Stats","languages":{"de":"German","en":"English","title":"Language"}},"timer":{"start":"Start","pause":"Pause","resume":"Resume","stop":"Stop","cancel":"Cancel","enterLastTaskName":"Enter name for the last task:","enterBreakName":"Enter the task during the break (empty for nothing):"},"settings":{"quickTasks":"Quick Tasks","new":"New","newTaskMessage":"Enter task name","synchronizeTitle":"Synchronize with the cloud","mustBeLoggedIn":"You must be logged in to use this feature","fromLtoC":"From local data to the cloud","fromCtoL":"From the cloud to local","upload":"Upload","download":"Download","syncExplain":"You can save everything locally, so you can continue to use the app even if you are not logged in.","deleteData":"Delete data. This can not be undone!","delete":"Delete"},"stats":{"day":"Day","week":"Week","month":"Month","all":"All"},"auth":{"signIn":"Sign In","signUp":"Sign Up","signOut":"Sign Out","email":"E-Mail","password":"Password","passwordConfirm":"Confirm Password","incorrectPassword":"Incorrect password","incorrectEmail":"Incorrect e-mail","passwordReq":"Password is required","emailReq":"E-Mail is required","notAnEmail":"Not an E-Mail address","userNotFound":"E-Mail not found","passwordMustMatch":"Passwords must match","passwordLength":"Password must be at least 6 characters","weakPassword":"Password too weak","emailAlreadyInUse":"Email already in use","noAccountYet":"Don\'t have an account?","accountInfo":"You don\'t need an account to use SEMERU. But using an account will let you sync your timer and tasks across multiple different devices."},"prompt":{"ok":"Ok","cancel":"Cancel"}}')}},[[256,1,2]]]);
//# sourceMappingURL=main.d5fda397.chunk.js.map