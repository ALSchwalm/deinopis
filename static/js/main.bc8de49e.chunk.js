(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{142:function(e,t,n){"use strict";(function(e){var r=n(19),a=n(20),c=n(23),o=n(21),s=n(24),i=n(143),u=n(0),l=n.n(u),d=n(16),p=n(75),h=n.n(p),f=n(152),m=n.n(f),b=n(151),E=n.n(b),v=n(149),g=n.n(v),O=n(35),S=n.n(O),x=n(150),y=n.n(x),j=n(70),T=n.n(j),w=n(36),C=n.n(w),k=n(147),N=n.n(k),U=n(148),R=n.n(U),_=n(74),D=n.n(_),L=n(73),A=n.n(L),J=n(34),H=n.n(J),I=n(28),q=n.n(I),B=n(72),G=n.n(B),P=n(57),F=n.n(P),V=n(89),M=n.n(V),X=n(146),W=n.n(X),Y=n(22),z=n(7),K=function(t){function n(){var e,t;Object(r.a)(this,n);for(var a=arguments.length,s=new Array(a),i=0;i<a;i++)s[i]=arguments[i];return(t=Object(c.a)(this,(e=Object(o.a)(n)).call.apply(e,[this].concat(s)))).state={mobileOpen:!1},t.handleDrawerToggle=function(){t.setState(function(e){return{mobileOpen:!e.mobileOpen}})},t}return Object(s.a)(n,t),Object(a.a)(n,[{key:"render",value:function(){var t=this,n=this.props.classes,r=e.browser&&/iPad|iPhone|iPod/.test(navigator.userAgent),a=l.a.createElement("div",{className:n.drawerContents},l.a.createElement(F.a,null,l.a.createElement(G.a,{htmlFor:"score-helper"},"Min Score"),l.a.createElement(A.a,{value:this.props.score,onChange:this.props.setScore,input:l.a.createElement(H.a,{name:"score",id:"score-helper"})},l.a.createElement(q.a,{value:50},"50"),l.a.createElement(q.a,{value:150},"150"),l.a.createElement(q.a,{value:300},"300"),l.a.createElement(q.a,{value:500},"500")),l.a.createElement(D.a,null,"Minimum score for results")),l.a.createElement(F.a,null,l.a.createElement(G.a,{htmlFor:"count-helper"},"Count"),l.a.createElement(A.a,{value:this.props.count,onChange:this.props.setCount,input:l.a.createElement(H.a,{name:"count",id:"count-helper"})},l.a.createElement(q.a,{value:10},"10"),l.a.createElement(q.a,{value:20},"20"),l.a.createElement(q.a,{value:50},"50"),l.a.createElement(q.a,{value:100},"100")),l.a.createElement(D.a,null,"Number of results to show")),l.a.createElement(F.a,{component:"fieldset"},l.a.createElement(M.a,{component:"legend",className:n.excluded},"Excluded Subreddits"),l.a.createElement(W.a,null,["HFY","nosleep"].map(function(e,n){return l.a.createElement(N.a,{control:l.a.createElement(R.a,{checked:t.props.excluded.includes(e),onChange:function(){return t.props.toggleSubreddit(e)},value:e}),key:n,label:e})}))));return l.a.createElement("div",{className:n.root},l.a.createElement(h.a,{position:"fixed",className:n.appBar},l.a.createElement(g.a,null,l.a.createElement(T.a,{color:"inherit","aria-label":"Open drawer",onClick:this.handleDrawerToggle,className:n.menuButton},l.a.createElement(y.a,null)),l.a.createElement(S.a,{variant:"h6",color:"inherit",noWrap:!0},"Deinopis"))),l.a.createElement(C.a,{mdUp:!0,implementation:"css"},l.a.createElement(E.a,{disableBackdropTransition:!r,disableDiscovery:r,className:n.drawer,variant:"temporary",open:this.state.mobileOpen,onOpen:this.handleDrawerToggle,onClose:this.handleDrawerToggle,classes:{paper:n.drawerPaper}},a)),l.a.createElement(C.a,{smDown:!0,implementation:"css"},l.a.createElement(m.a,{classes:{paper:n.drawerPaper},variant:"permanent",open:!0},l.a.createElement("div",{className:n.toolbar}),a)))}}]),n}(l.a.Component);t.a=Object(d.withStyles)(function(e){return{root:{flexGrow:1},appBar:{zIndex:e.zIndex.drawer+1},drawer:{width:240,flexShrink:0},drawerPaper:{width:240},drawerContents:{paddingLeft:20,paddingTop:20},content:{flexGrow:1,padding:3*e.spacing.unit},menuButton:Object(i.a)({marginRight:20},e.breakpoints.up("md"),{display:"none"}),excluded:{paddingTop:30},toolbar:e.mixins.toolbar}})(Object(Y.b)(function(e){return{score:e.score,count:e.count,excluded:e.excludedSubreddits}},function(e){return{setScore:function(t){e(Object(z.q)(parseInt(t.target.value)))},setCount:function(t){e(Object(z.m)(parseInt(t.target.value)))},toggleSubreddit:function(t){e(Object(z.x)(t))}}})(K))}).call(this,n(173))},166:function(e,t,n){e.exports=n(374)},171:function(e,t,n){},374:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(18),o=n.n(c),s=(n(171),n(19)),i=n(20),u=n(23),l=n(21),d=n(24),p=n(142),h=n(16),f=n(17),m=n.n(f),b=n(153),E=n.n(b),v=n(75),g=n.n(v),O=n(158),S=n.n(O),x=n(92),y=n.n(x),j=n(35),T=n.n(j),w=n(25),C=n(154),k=n.n(C),N=n(156),U=n.n(N),R=n(91),_=n.n(R),D=n(54),L=n.n(D),A=n(90),J=n.n(A),H=n(36),I=n.n(H);var q=Object(h.withStyles)(function(e){return{author:{overflow:"hidden",textOverflow:"ellipsis"}}})(function(e){var t,n,r=e.data,c=e.classes;return a.a.createElement(J.a,{in:!0},a.a.createElement(L.a,{button:!0,component:"a",target:"_blank",href:(t=r.suggestion.subreddit,n=r.suggestion.id,"https://reddit.com/r/"+t+"/comments/"+n)},a.a.createElement(m.a,{container:!0,justify:"flex-start"},a.a.createElement(m.a,{item:!0,xs:2,sm:1},r.suggestion.score),a.a.createElement(m.a,{item:!0,xs:7},r.suggestion.title),a.a.createElement(I.a,{only:"xs"},a.a.createElement(m.a,{item:!0,sm:2,className:c.author},r.suggestion.author)),a.a.createElement(m.a,{item:!0,sm:2},r.suggestion.subreddit))))}),B=n(22),G=n(155),P=n.n(G),F=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"shouldComponentUpdate",value:function(e,t){return this.props.data!==e.data||this.props.loading!==e.loading}},{key:"render",value:function(){var e,t=this.props,n=t.classes,r=t.data;return this.props.loading?a.a.createElement("div",{className:n.loading},a.a.createElement(P.a,null)):(e=r.length?a.a.createElement(L.a,{key:"header"},a.a.createElement(m.a,{container:!0,justify:"flex-start"},a.a.createElement(m.a,{item:!0,xs:2,sm:1},a.a.createElement("b",null,"Score")),a.a.createElement(m.a,{item:!0,xs:7},a.a.createElement("b",null,"Title")),a.a.createElement(I.a,{only:"xs"},a.a.createElement(m.a,{item:!0,sm:2},a.a.createElement("b",null,"Author"))),a.a.createElement(m.a,{item:!0,sm:2},a.a.createElement("b",null,"Subreddit")))):null,a.a.createElement("div",{className:n.root},a.a.createElement(_.a,null,e,r.map(function(e,t){return a.a.createElement(q,{data:e,key:t})}))))}}]),t}(a.a.Component),V=Object(B.b)(function(e){return{loading:e.loading}})(Object(h.withStyles)(function(e){return{root:{width:"100%",backgroundColor:e.palette.background.paper},loading:{display:"flex",justifyContent:"center",flexWrap:"wrap",marginTop:100}}})(F)),M=n(76),X=n.n(M),W=n(7),Y=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={data:[]},n.search=n.search.bind(Object(w.a)(Object(w.a)(n))),n.onChipClick=n.onChipClick.bind(Object(w.a)(Object(w.a)(n))),n.onCancel=n.onCancel.bind(Object(w.a)(Object(w.a)(n))),n}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.props.urlSearched&&(this.props.setUrlSearch(this.props.urlSearched),this.search(this.props.urlSearched))}},{key:"componentDidUpdate",value:function(e){this.props.score===e.score&&this.props.count===e.count&&this.props.excluded===e.excluded||"undefined"===typeof this.props.score||"undefined"===typeof this.props.count||"undefined"===typeof this.props.excluded||"undefined"===typeof this.props.urlSearch||this.search(this.props.urlSearch)}},{key:"onChipClick",value:function(e){this.props.setUrlSearch(e),this.search(e)}},{key:"onCancel",value:function(){this.props.setUrlSearch(""),this.props.setUrlSearched(""),this.setState({data:[]})}},{key:"search",value:function(e){var t=this;if(""!==e){var n=new XMLHttpRequest;n.open("POST","https://micro-ec2.alschwalm.com/suggestions",!0),n.setRequestHeader("Content-Type","application/json; charset=UTF-8"),!X()(e)&&X()("http://"+e)&&(e="http://"+e),X()(e)?n.send(JSON.stringify({count:this.props.count,url:e,score:this.props.score,excluded_subreddits:this.props.excluded})):n.send(JSON.stringify({count:this.props.count,text:e,score:this.props.score,excluded_subreddits:this.props.excluded})),n.onloadend=function(e){if(t.props.setLoading(!1),0!==n.status){var r=JSON.parse(n.responseText),a=r.body.suggestions;a?(t.setState({data:[]}),t.setState({data:a})):t.props.setError(r.body.error)}else t.props.setError("Unable to connect to server")},this.props.setLoading(!0),this.props.setUrlSearched(e),this.props.setTextSearched(""),this.props.setTextSearch("")}}},{key:"render",value:function(){var e,t=this,n=this.props.classes;if(this.state.data.length&&this.props.urlSearched)e=null;else{e=a.a.createElement("div",{className:n.examples},a.a.createElement("p",null,"Can't think of anything? Try one of these examples:"),a.a.createElement("div",{className:n.chips},["space cat","reddit.com/r/nosleep/comments/7txais","elf","dark and stormy night","reddit.com/r/HFY/comments/5tcesp","reddit.com/r/HFY/comments/2it95v"].map(function(e,r){return a.a.createElement(U.a,{label:e,key:r,className:n.chip,onClick:function(){return t.onChipClick(e)}})})))}return a.a.createElement("div",null,a.a.createElement(k.a,{onChange:this.props.setUrlSearch,onRequestSearch:this.search,onCancelSearch:this.onCancel,value:this.props.urlSearch}),e,a.a.createElement("div",{className:n.results},this.props.urlSearched&&a.a.createElement(V,{data:this.state.data})))}}]),t}(a.a.Component),z=Object(B.b)(function(e){return{score:e.score,count:e.count,excluded:e.excludedSubreddits,urlSearch:e.urlSearch,urlSearched:e.urlSearched}},function(e){return{setError:function(t){e(Object(W.n)(t)),e(Object(W.w)())},setUrlSearched:function(t){e(Object(W.v)(t))},setUrlSearch:function(t){e(Object(W.u)(t))},setTextSearched:function(t){e(Object(W.t)(t))},setTextSearch:function(t){e(Object(W.s)(t))},setLoading:function(t){e(Object(W.p)(t))}}})(Object(h.withStyles)(function(e){return{results:{marginTop:20},chips:{display:"flex",justifyContent:"center",flexWrap:"wrap"},chip:{margin:e.spacing.unit},examples:{marginTop:40}}})(Y)),K=n(157),Q=n.n(K),Z=n(55),$=n.n(Z),ee=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={data:[]},n.handleChange=n.handleChange.bind(Object(w.a)(Object(w.a)(n))),n.search=n.search.bind(Object(w.a)(Object(w.a)(n))),n}return Object(d.a)(t,e),Object(i.a)(t,[{key:"handleChange",value:function(e){this.props.setTextSearch(e.target.value)}},{key:"componentDidMount",value:function(){this.props.textSearched&&(this.props.setTextSearch(this.props.textSearched),this.search(this.props.textSearched))}},{key:"componentDidUpdate",value:function(e){this.props.score===e.score&&this.props.count===e.count&&this.props.excluded===e.excluded||"undefined"===typeof this.props.score||"undefined"===typeof this.props.count||"undefined"===typeof this.props.excluded||"undefined"===typeof this.props.textSearch||this.search(this.props.textSearch)}},{key:"search",value:function(e){var t=this;if(""!==e){var n=new XMLHttpRequest;n.open("POST","https://micro-ec2.alschwalm.com/suggestions",!0),n.setRequestHeader("Content-Type","application/json; charset=UTF-8"),n.send(JSON.stringify({count:this.props.count,score:this.props.score,text:e,excluded_subreddits:this.props.excluded})),n.onloadend=function(e){if(t.props.setLoading(!1),0!==n.status){var r=JSON.parse(n.responseText),a=r.body.suggestions;a?(t.setState({data:[]}),t.setState({data:a})):t.props.setError(r.body.error)}else t.props.setError("Unable to connect to server")},this.props.setLoading(!0),this.props.setTextSearched(e),this.props.setUrlSearched(""),this.props.setUrlSearch("")}}},{key:"render",value:function(){var e=this,t=this.props.classes;return a.a.createElement("div",null,a.a.createElement("div",null,a.a.createElement(Q.a,{multiline:!0,rows:"12",fullWidth:!0,variant:"outlined",placeholder:"Enter your search text here",onChange:this.handleChange,value:this.props.textSearch})),a.a.createElement($.a,{variant:"contained",color:"primary",className:t.button,onClick:function(){return e.search(e.props.textSearch)}},"Search"),this.props.textSearched&&a.a.createElement(V,{data:this.state.data}))}}]),t}(a.a.Component),te=Object(B.b)(function(e){return{score:e.score,count:e.count,excluded:e.excludedSubreddits,textSearch:e.textSearch,textSearched:e.textSearched}},function(e){return{setError:function(t){e(Object(W.n)(t)),e(Object(W.w)())},setTextSearched:function(t){e(Object(W.t)(t))},setTextSearch:function(t){e(Object(W.s)(t))},setUrlSearched:function(t){e(Object(W.v)(t))},setUrlSearch:function(t){e(Object(W.u)(t))},setLoading:function(t){e(Object(W.p)(t))}}})(Object(h.withStyles)({button:{marginTop:20}})(ee));function ne(e){var t=e.children,n=e.dir;return a.a.createElement(T.a,{component:"div",dir:n,style:{padding:24}},t)}var re=function(e){function t(){var e,n;Object(s.a)(this,t);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(a)))).handleChange=function(e,t){n.props.setTab(t)},n.handleChangeIndex=function(e){n.props.setTab(e)},n}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props.theme;return a.a.createElement("div",null,a.a.createElement(g.a,{position:"static",color:"default"},a.a.createElement(S.a,{value:this.props.tab,onChange:this.handleChange,indicatorColor:"primary",textColor:"primary",fullWidth:!0},a.a.createElement(y.a,{label:"Keyword or URL"}),a.a.createElement(y.a,{label:"Text"}))),a.a.createElement(E.a,{axis:"rtl"===e.direction?"x-reverse":"x",index:this.props.tab,onChangeIndex:this.handleChangeIndex},a.a.createElement(ne,{dir:e.direction},a.a.createElement(z,null)),a.a.createElement(ne,{dir:e.direction},a.a.createElement(te,null))))}}]),t}(a.a.Component),ae=Object(B.b)(function(e){return{tab:e.tab}},function(e){return{setTab:function(t){e(Object(W.r)(t))}}})(Object(h.withStyles)(function(e){return{}},{withTheme:!0})(re));var ce=Object(h.withStyles)(function(e){return{root:{flexGrow:1,marginTop:20},toolbar:e.mixins.toolbar}})(function(e){var t=e.classes;return a.a.createElement("div",{className:t.root},a.a.createElement("div",{className:t.toolbar}),a.a.createElement(m.a,{container:!0,justify:"center"},a.a.createElement(m.a,{item:!0,xs:12,sm:12,md:6},a.a.createElement(ae,null))))}),oe=n(159),se=n.n(oe),ie=n(163),ue=n.n(ie),le=n(161),de=n.n(le),pe=n(162),he=n.n(pe),fe=n(160),me=n.n(fe),be=n(164),Ee=n.n(be),ve=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props.fullScreen;return a.a.createElement("div",null,a.a.createElement(se.a,{fullScreen:e,open:this.props.errorOpen,onClose:this.props.closeError,"aria-labelledby":"responsive-dialog-title"},a.a.createElement(me.a,{id:"responsive-dialog-title"},"Error"),a.a.createElement(de.a,null,a.a.createElement(he.a,null,this.props.errorText)),a.a.createElement(ue.a,null,a.a.createElement($.a,{onClick:this.props.closeError,color:"primary"},"Close"))))}}]),t}(a.a.Component),ge=Object(B.b)(function(e){return{errorOpen:e.errorOpen,errorText:e.errorText}},function(e){return{closeError:function(){e(Object(W.w)())}}})(Ee()()(ve)),Oe=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"App"},a.a.createElement("header",{className:"App-header"},a.a.createElement(ge,null),a.a.createElement(p.a,null)),a.a.createElement(ce,null))}}]),t}(r.Component),Se=n(45);var xe=Object(Se.b)({count:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case W.a:return t.count;default:return e}},score:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:150,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case W.e:return t.score;default:return e}},excludedSubreddits:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case W.c:return t.subreddits;case W.l:return e=e.includes(t.subreddit)?e.filter(function(e){return e!==t.subreddit}):e.concat(t.subreddit);default:return e}},errorOpen:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];switch((arguments.length>1?arguments[1]:void 0).type){case W.k:return!e;default:return e}},errorText:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case W.b:return t.text;default:return e}},urlSearch:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case W.i:return t.text;default:return e}},urlSearched:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case W.j:return t.text;default:return e}},textSearch:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case W.g:return t.text;default:return e}},textSearched:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case W.h:return t.text;default:return e}},tab:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case W.f:return t.number;default:return e}},loading:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case W.d:return t.loading;default:return e}}}),ye=n(165),je=n.n(ye),Te=Object(Se.c)(xe);je()({store:Te,params:{count:{selector:function(e){return e.count},action:function(e){return Object(W.m)(e)},defaultValue:10},score:{selector:function(e){return e.score},action:function(e){return Object(W.q)(e)},defaultValue:150},urlSearch:{selector:function(e){return e.urlSearched},action:function(e){return Object(W.v)(e)},defaultValue:""},textSearch:{selector:function(e){return e.textSearched},action:function(e){return Object(W.t)(e)},defaultValue:""},excludedSubreddits:{selector:function(e){return JSON.stringify(e.excludedSubreddits)},action:function(e){return Object(W.o)(JSON.parse(e))},defaultValue:JSON.stringify([])},tab:{selector:function(e){return e.tab},action:function(e){return Object(W.r)(e)},stringToValue:function(e){return JSON.parse(e)},valueToString:function(e){return JSON.stringify(e)},defaultValue:0}},initialTruth:"location",replaceState:!0}),o.a.render(a.a.createElement(B.a,{store:Te},a.a.createElement(Oe,null)),document.getElementById("root"))},7:function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"e",function(){return a}),n.d(t,"l",function(){return c}),n.d(t,"c",function(){return o}),n.d(t,"k",function(){return s}),n.d(t,"b",function(){return i}),n.d(t,"i",function(){return u}),n.d(t,"j",function(){return l}),n.d(t,"g",function(){return d}),n.d(t,"h",function(){return p}),n.d(t,"f",function(){return h}),n.d(t,"d",function(){return f}),n.d(t,"q",function(){return m}),n.d(t,"m",function(){return b}),n.d(t,"x",function(){return E}),n.d(t,"o",function(){return v}),n.d(t,"w",function(){return g}),n.d(t,"n",function(){return O}),n.d(t,"u",function(){return S}),n.d(t,"v",function(){return x}),n.d(t,"s",function(){return y}),n.d(t,"t",function(){return j}),n.d(t,"r",function(){return T}),n.d(t,"p",function(){return w});var r="SET_COUNT",a="SET_SCORE",c="TOGGLE_SUBREDDIT",o="SET_EXCLUDED",s="TOGGLE_ERROR",i="SET_ERROR_TEXT",u="SET_URL_SEARCH",l="SET_URL_SEARCHED",d="SET_TEXT_SEARCH",p="SET_TEXT_SEARCHED",h="SET_TAB",f="SET_LOADING";function m(e){return{type:a,score:e}}function b(e){return{type:r,count:e}}function E(e){return{type:c,subreddit:e}}function v(e){return{type:o,subreddits:e}}function g(){return{type:s}}function O(e){return{type:i,text:e}}function S(e){return{type:u,text:e}}function x(e){return{type:l,text:e}}function y(e){return{type:d,text:e}}function j(e){return{type:p,text:e}}function T(e){return{type:h,number:e}}function w(e){return{type:f,loading:e}}}},[[166,2,1]]]);
//# sourceMappingURL=main.bc8de49e.chunk.js.map