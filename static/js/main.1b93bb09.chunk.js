(window["webpackJsonpgraph-traversal-visualizer"]=window["webpackJsonpgraph-traversal-visualizer"]||[]).push([[0],{71:function(e,t,n){e.exports=n(85)},76:function(e,t,n){},77:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},78:function(e,t,n){},85:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(8),i=n.n(o),s=(n(76),n(77),n(78),n(7)),u=n.n(s),c=n(12),l=n(10),d=n(23),h=n(16),p=n(53),f=n(54),g=n(18),v=n(63),m=n(2),y=n(35),b=n(33),k="region/europe",C="all",w="region/africa",E="https://restcountries.eu/rest/v2/",x="?fields=name;alpha3Code;borders;";function O(e){return N.apply(this,arguments)}function N(){return(N=Object(c.a)(u.a.mark(function e(t){var n,r;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(E+t+x);case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}},e)}))).apply(this,arguments)}var S=function(){return{getEUCountries:function(){var e=Object(c.a)(u.a.mark(function e(){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O(k);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),getWorldCountries:function(){var e=Object(c.a)(u.a.mark(function e(){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O(C);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),getAfricaCountries:function(){var e=Object(c.a)(u.a.mark(function e(){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O(w);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()}},j=n(21),M=n(15),H=n.n(M),B=n(44),A=n.n(B);function D(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function G(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?D(n,!0).forEach(function(t){Object(l.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):D(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var F=function(e,t,n){H.a.use(A.a);var r=H.a.Engine,a=H.a.Render,o=H.a.World,i=H.a.Composite,s=H.a.Bodies,l=(H.a.Body,H.a.Constraint),p=H.a.Mouse,f=H.a.MouseConstraint,g="blue",v="orange",m="white",y="yellow",b="red",k="white",C="green",w=10,E=50,x=.005,O=.1,N=new Map,S=r.create(),M=a.create({element:e.current,engine:S,options:{width:t,height:n,wireframes:!1,hasZIndex:!1}}),B=i.create(),D={label:"undefied"},F=function(){function e(t,n,r){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};Object(d.a)(this,e),this.id=t,this.details=a,this.nodeBody=n,this.neighbours=r,this.prevColor=g,this.currentColor=g}return Object(h.a)(e,[{key:"setDetails",value:function(e){var t=this.details;this.details=G({},t,{},e)}},{key:"setCurrentColor",value:function(e){this.nodeBody.render.fillStyle=e,this.nodeBody.render.strokeStyle=e,this.prevColor=this.currentColor,this.currentColor=e}},{key:"setToOldColor",value:function(){this.nodeBody.render.fillStyle=this.prevColor,this.nodeBody.render.strokeStyle=this.prevColor;var e=this.currentColor;this.currentColor=this.prevColor,this.prevColor=e}},{key:"resetColors",value:function(){this.currentColor=g,this.setCurrentColor(g)}},{key:"addNeighbour",value:function(e){this.neighbours.push(e)}},{key:"getNeighbours",value:function(){return this.neighbours}},{key:"getBody",value:function(){return this.nodeBody}}]),e}();function T(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:w,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=N.get(e);if(o)o.setDetails(a);else{var u={x:(.8*Math.random()+.1)*t,y:(.8*Math.random()+.1)*n},c={label:e,render:{fillStyle:g,strokeStyle:g,lineWidth:3,zIndex:500},plugin:{attractors:[A.a.Attractors.gravity]}},l=s.circle(u.x,u.y,r,c);i.add(B,l);o=new F(e,l,[],a),N.set(e,o)}}function P(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:E,r=N.get(e),a=N.get(t);if(!r||!a){var o={name:"Outside region"};r||(o.name=e+" - "+o.name,T(e,void 0,o),r=N.get(e)),a||(o.name=t+" - "+o.name,T(t,void 0,o),a=N.get(t))}var s={length:n,damping:O,stiffness:x};!function(e,t,n){var r=G({bodyA:e,bodyB:t},n),a=l.create(r);a.render.type="line",a.render.anchors=!1,i.add(B,a)}(r.getBody(),a.getBody(),s),r.addNeighbour(t),a.addNeighbour(e)}function W(e,t,n){var r=N.get(e);if(!r)return console.error("Tried to change Color on non existing NodeID");var a=t;t=e,r.setCurrentColor(n);var o=N.get(a);o&&o.setToOldColor()}function R(){return(R=Object(c.a)(u.a.mark(function e(t,n,r,a){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("clearing all nodes"),i.clear(B,!1),N.clear(),e.next=5,n(t,this);case 5:this.setStart(r),this.setFinish(a);case 7:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}return{setUp:function(){S.world.gravity.y=0,A.a.Attractors.gravityConstant=-7.5,x=.005,O=.1,function(){var e={render:{fillStyle:g,strokeStyle:g,lineWidth:3},isStatic:!0},r=[s.rectangle(-250,n/2,500,n,e),s.rectangle(t/2,-250,t,500,e),s.rectangle(t+250,n/2,500,n,e),s.rectangle(t/2,n+250,t,500,e)];o.add(S.world,r),o.add(S.world,B)}(),function(){var t=p.create(M.canvas),n=f.create(S,{mouse:t,constraint:{stiffness:.2,render:{visible:!1}}});o.add(S.world,n),function(t){H.a.Events.on(t,"mousemove",function(t){var n=H.a.Query.point(i.allBodies(B),t.mouse.position)[0];if("undefined"!==typeof n){if(n.label!==D)!function(t){var n=N.get(t);if(!n)return;var r=new CustomEvent("onNodeHover",{detail:{node:n}});e.current.dispatchEvent(r)}(n.label);D=n.label}})}(n)}()},run:function(){r.run(S),a.run(M)},reset:function(){var e=!0,t=!1,n=void 0;try{for(var r,a=N.values()[Symbol.iterator]();!(e=(r=a.next()).done);e=!0){r.value.resetColors()}}catch(o){t=!0,n=o}finally{try{e||null==a.return||a.return()}finally{if(t)throw n}}},addNode:T,getNode:function(e){var t=N.get(e);return t||console.error("Could not find node")},addEdge:P,addMultipleEdges:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:E;t.forEach(function(t){P(e,t,n)})},selectNode:function(e,t){W(e,t,v)},setStart:function(e,t){W(e,t,m)},setFinish:function(e,t){W(e,t,y)},setPath:function(e){e.forEach(function(e){N.get(e).setCurrentColor(C)})},setNewGraphData:function(e,t,n,r){return R.apply(this,arguments)},setVisited:function(e,t){t.set(e,!0)},setVisitedColor:function(e){e.setCurrentColor(b)},setInQueueColor:function(e){var t=N.get(e);if(!t)return console.error("Couldn't set in queue Color - No nodeID found");t.setCurrentColor(k)},setStaticNode:function(e){var t=N.get(e);if(!t)return console.log("couldn\xe4t set static node - no node found with id:",e);t.getBody().isStatic=!0},setNodeRadius:function(e){w=e},setEdgeLength:function(e){E=e},calcSetNodeEdgeSize:function(e){var r=function(e){var r=Math.ceil(t/n),a=!1,o=1;for(;!a;){o*r*o>=e&&(a=!0),o+=1}return Math.ceil(n/o)}(e),a=Math.ceil(r/5),o=Math.ceil(4*a);console.log("Nodelength: ",a),console.log("edgeLength: ",o),console.log("Calculated node size"),this.setNodeRadius(a/2),this.setEdgeLength(o),console.log("set sizes for datalength ",e)},getAllNodeID:function(){return Object(j.a)(N.keys())}}};var T=function(e,t,n){function r(){return(r=Object(c.a)(u.a.mark(function e(t,n){var r,a;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S().getEUCountries();case 2:return r=e.sent,e.next=5,o(r,s,t,n);case 5:return a=e.sent,e.abrupt("return",a);case 7:case"end":return e.stop()}},e)}))).apply(this,arguments)}function a(){return(a=Object(c.a)(u.a.mark(function e(t,n){var r,a;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S().getWorldCountries();case 2:return r=e.sent,e.next=5,o(r,s,t,n);case 5:return a=e.sent,e.abrupt("return",a);case 7:case"end":return e.stop()}},e)}))).apply(this,arguments)}function o(e,t,n,r){return i.apply(this,arguments)}function i(){return(i=Object(c.a)(u.a.mark(function r(a,o,i,s){var c;return u.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return(c=new F(e,t,n)).setUp(),r.next=4,o(a,c);case 4:return c.run(),c.setStart(i),c.setFinish(s),r.abrupt("return",c);case 8:case"end":return r.stop()}},r)}))).apply(this,arguments)}function s(e,t){return l.apply(this,arguments)}function l(){return(l=Object(c.a)(u.a.mark(function e(t,n){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Adding countries to graph ",n),n.calcSetNodeEdgeSize(t.length),e.next=4,t.forEach(function(e){var t=e.alpha3Code,r=e.borders,a={name:e.name};n.addNode(t,void 0,a),n.addMultipleEdges(t,r)});case 4:case"end":return e.stop()}},e)}))).apply(this,arguments)}return{EUGraph:function(e,t){return r.apply(this,arguments)},WorldGraph:function(e,t){return a.apply(this,arguments)},addCountriesToGraph:s}},P=function(){function e(){Object(d.a)(this,e),this.items=[]}return Object(h.a)(e,[{key:"enqueue",value:function(e){this.items.push(e)}},{key:"dequeue",value:function(){return this.isEmpty()?"Trying to dequeue empty queue":this.items.shift()}},{key:"peek",value:function(){return this.isEmpty()?"Trying to peek empty queue":this.items[0]}},{key:"isEmpty",value:function(){return 0===this.items.length}}]),e}(),W=function(){function e(){Object(d.a)(this,e),this.items=[]}return Object(h.a)(e,[{key:"push",value:function(e){this.items.push(e)}},{key:"pop",value:function(){return this.isEmpty()?"Trying to dequeue empty queue":this.items.pop()}},{key:"peek",value:function(){return this.isEmpty()?"Trying to peek empty queue":this.items[this.items.length-1]}},{key:"isEmpty",value:function(){return 0===this.items.length}}]),e}();function R(e){return new Promise(function(t){return setTimeout(t,e)})}var z=function(e,t){function n(){return(n=Object(c.a)(u.a.mark(function n(r){var a,o,i,s,c,l,d,h,p,f,g,v,m,y,b,k,C=arguments;return u.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:k=function(){for(var e=[],t=a;void 0!==t;){if(e.push(t),t===r)return console.log("Backtracked: ",e),e;t=s.get(t)}return console.error("Backtrack error")},a=C.length>1&&void 0!==C[1]?C[1]:void 0,o=new P,i=new Map,s=new Map,c=void 0,l=r,e.setVisited(r,i),o.enqueue(r),e.setStart(r,l);case 10:if(o.isEmpty()){n.next=43;break}if((d=o.dequeue())!==a){n.next=16;break}return h=k(),e.setPath(h),n.abrupt("return",h);case 16:for(p=e.getNode(d),e.setVisitedColor(p),e.selectNode(d,c),c=d,f=!0,g=!1,v=void 0,n.prev=23,m=p.getNeighbours()[Symbol.iterator]();!(f=(y=m.next()).done);f=!0)b=y.value,i.has(b)||(e.setVisited(b,i),o.enqueue(b),s.set(b,d),e.setInQueueColor(b));n.next=31;break;case 27:n.prev=27,n.t0=n.catch(23),g=!0,v=n.t0;case 31:n.prev=31,n.prev=32,f||null==m.return||m.return();case 34:if(n.prev=34,!g){n.next=37;break}throw v;case 37:return n.finish(34);case 38:return n.finish(31);case 39:return n.next=41,R(t);case 41:n.next=10;break;case 43:return n.abrupt("return",console.log("BFS done"));case 44:case"end":return n.stop()}},n,null,[[23,27,31,39],[32,,34,38]])}))).apply(this,arguments)}function r(){return(r=Object(c.a)(u.a.mark(function n(r){var a,o,i,s,c,l,d,h,p,f,g,v;return u.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:a=new W,o=new Map,i=void 0,s=r,a.push(r),e.setVisited(r,o),e.setStart(r,s);case 7:if(a.isEmpty()){n.next=36;break}for(c=a.pop(),l=e.getNode(c),e.setVisitedColor(l),e.selectNode(c,i),i=c,d=!0,h=!1,p=void 0,n.prev=16,f=l.getNeighbours()[Symbol.iterator]();!(d=(g=f.next()).done);d=!0)v=g.value,o.has(v)||(e.setVisited(v,o),a.push(v),e.setInQueueColor(v));n.next=24;break;case 20:n.prev=20,n.t0=n.catch(16),h=!0,p=n.t0;case 24:n.prev=24,n.prev=25,d||null==f.return||f.return();case 27:if(n.prev=27,!h){n.next=30;break}throw p;case 30:return n.finish(27);case 31:return n.finish(24);case 32:return n.next=34,R(t);case 34:n.next=7;break;case 36:case"end":return n.stop()}},n,null,[[16,20,24,32],[25,,27,31]])}))).apply(this,arguments)}return{bfs:function(e){return n.apply(this,arguments)},dfs:function(e){return r.apply(this,arguments)}}},q=n(124),I=n(127),Q=n(131),V=n(126),U=n(115),L=n(129),Y=n(38),J=n(130),Z=n(117),$=n(118),_=n(119),K=n(120),X=n(86),ee=n(121),te=n(122),ne=n(123);function re(e){var t=Object(r.useState)(!0),n=Object(Y.a)(t,2),o=n[0],i=n[1];function s(){i(!1)}return a.a.createElement(J.a,{onClose:s,"aria-labelledby":"simple-dialog-title",open:o},a.a.createElement(Z.a,{id:"welcome-title"},"Welcome to Graph Traversal Visualizer!"),a.a.createElement($.a,null,a.a.createElement(_.a,{id:"project-description"},"Welcome to my (jFrisks) project - a graph traversal visualizer with floating nodes and edges. You can play around with various World Maps and see country name and their neighbouring countries."),a.a.createElement(K.a,null,a.a.createElement(X.a,null,a.a.createElement(ee.a,{primary:"Select a graph from buttons on the right side."})),a.a.createElement(X.a,null,a.a.createElement(ee.a,{primary:"You can hover on a node to see which country you are looking at"})),a.a.createElement(X.a,null,a.a.createElement(ee.a,{primary:"Select starting node for traversals, and also ending node if you want to use shortest paths algos."})),a.a.createElement(X.a,null,a.a.createElement(ee.a,{primary:"You can change speed of the algo with the selector"})),a.a.createElement(X.a,null,a.a.createElement(ee.a,{primary:"You can click on an algo button to run"}))),a.a.createElement(_.a,{id:"future-description"},"Project is still running. Some bugs and a lot of features that could be even better! I will implement more algos, more beautiful visualization, my own physics engine, error console handling, more ...","//Jonathan Frisk (jFrisks)")),a.a.createElement(te.a,null,a.a.createElement(ne.a,{onClick:s,color:"primary",autoFocus:!0},"Okay")))}function ae(){var e=Object(y.a)(["\n    background-color:#EDAF55;\n    text-shadow:0px 1px 0px rgba(237,175,85,0.72);\n    border:1px solid rgba(237,175,85,0.72);\n"]);return ae=function(){return e},e}function oe(){var e=Object(y.a)(["\n    background-color:#EA3C3C;\n    text-shadow:0px 1px 0px rgba(35,35,35,0.72);\n    border:1px solid rgba(35,35,35,0.72);\n"]);return oe=function(){return e},e}function ie(){var e=Object(y.a)(["\n    background-color:#44c767;\n\t-moz-border-radius:28px;\n\t-webkit-border-radius:28px;\n\tborder-radius:28px;\n\tborder:1px solid #18ab29;\n\tdisplay:inline-block;\n\tcursor:pointer;\n\tcolor:#ffffff;\n\tfont-family:Arial;\n\tfont-size:17px;\n\tpadding:16px 31px;\n\ttext-decoration:none;\n\ttext-shadow:0px 1px 0px #2f6627;\n"]);return ie=function(){return e},e}function se(){var e=Object(y.a)(["\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 7%;\n    margin-left: auto;\n    margin-right: auto;\n\n    display: flex;\n    flex-wrap: wrap;\n    width: 93vw;\n    justify-content: center;\n"]);return se=function(){return e},e}function ue(){var e=Object(y.a)(["\n    position: relative;\n"]);return ue=function(){return e},e}var ce=b.a.div(ue()),le=b.a.div(se()),de=b.a.button(ie()),he=Object(b.a)(de)(oe()),pe=Object(b.a)(de)(ae());function fe(e){var t=e.data,n=e.value,r=e.onChange,o=e.typeName;Object(m.a)(e,["data","value","onChange","typeName"]);return a.a.createElement(q.a,null,a.a.createElement(Q.a,{htmlFor:"age-simple"},o),a.a.createElement(I.a,{value:n,onChange:r,inputProps:{name:o,id:o}},t.map(function(e,t){return a.a.createElement(V.a,{key:e+t,value:e},e)})))}var ge=[50,100,500,1e3,2e3],ve=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(p.a)(this,Object(f.a)(t).call(this,e))).setHoverMessage=function(e){n.setState({hoverMessage:e})},n.setHoverOpen=function(e){n.setState({hoverOpen:e})},n.processHoverMessageQueue=function(){n.state.hoverQueue.length>0&&(n.setHoverMessage(n.state.hoverQueue.shift()),n.setHoverOpen(!0))},n.sendHoverMessage=function(e){n.state.hoverQueue.push({message:e,key:(new Date).getTime()}),n.state.hoverOpen?n.setHoverOpen(!1):n.processHoverMessageQueue()},n.handleHoverClose=function(e,t){"clickaway"!==t&&n.setHoverOpen(!1)},n.handleHoverExited=function(){n.processHoverMessageQueue()},n.state={Graph:void 0,graphNodes:[],algoRunning:!1,startNode:"Choose",endNode:"Choose",speed:ge[3],selectedNode:void 0,hoverQueue:[],hoverOpen:!1,hoverMessage:void 0},n.scene=a.a.createRef(),n.handleSelectChange=n.handleSelectChange.bind(Object(g.a)(n)),n.handleNodeHover=n.handleNodeHover.bind(Object(g.a)(n)),n}return Object(v.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this;T(this.scene,this.props.width,this.props.height).WorldGraph().then(function(t){var n=t.getAllNodeID();e.setState({Graph:t,graphNodes:n,startNode:n[0],endNode:n[0]})}),this.scene.current.addEventListener("onNodeHover",this.handleNodeHover)}},{key:"handleSelectChange",value:function(e,t){this.setState(Object(l.a)({},t,e.target.value))}},{key:"handleNodeHover",value:function(e){var t=e.detail.node;this.sendHoverMessage(t.details.name),this.setState({selectedNode:t})}},{key:"handleBFTClick",value:function(){var e=this;this.runAlgo(function(){return z(e.state.Graph,e.state.speed).bfs(e.state.startNode)})}},{key:"handleBFSClick",value:function(){var e=this;this.runAlgo(function(){return z(e.state.Graph,e.state.speed).bfs(e.state.startNode,e.state.endNode)})}},{key:"handleDFSClick",value:function(){var e=this;this.runAlgo(function(){return z(e.state.Graph,e.state.speed).dfs(e.state.startNode)})}},{key:"handleGraphChange",value:function(){var e=Object(c.a)(u.a.mark(function e(t){var n,r,a,o,i,s=this;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.state.algoRunning){e.next=2;break}return e.abrupt("return",this.sendHoverMessage("You can only change graph when algo is not running"));case 2:e.t0=t,e.next="eu"===e.t0?5:"world"===e.t0?9:"africa"===e.t0?13:17;break;case 5:return e.next=7,S().getEUCountries();case 7:return n=e.sent,e.abrupt("break",20);case 9:return e.next=11,S().getWorldCountries();case 11:return n=e.sent,e.abrupt("break",20);case 13:return e.next=15,S().getAfricaCountries();case 15:return n=e.sent,e.abrupt("break",20);case 17:return e.next=19,S().getWorldCountries();case 19:n=e.sent;case 20:r=T(this.scene,this.props.width,this.props.height).addCountriesToGraph,a=n.find(function(e){return s.state.startNode===e.alpha3Code}),o=n.find(function(e){return s.state.endNode===e.alpha3Code}),a||this.setState({startNode:n[0].alpha3Code}),o||this.setState({endNode:n[0].alpha3Code}),this.state.Graph.setNewGraphData(n,r,a,o),i=this.state.Graph.getAllNodeID(),this.setState(function(e){return{graphNodes:i,startNode:e.startNode,endNode:e.endNode}});case 28:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"handleReset",value:function(){var e=this;this.runAlgo(function(){return new Promise(function(t){console.log("resetting colors"),e.state.Graph.reset(),t()})})}},{key:"runAlgo",value:function(){var e=Object(c.a)(u.a.mark(function e(t){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.state.algoRunning){e.next=2;break}return e.abrupt("return",this.sendHoverMessage("SLOW DOWN - Algo already running"));case 2:return this.setState({algoRunning:!0}),e.next=5,t();case 5:this.sendHoverMessage("Algo Finished! - Path is indicated with green nodes"),this.setState({algoRunning:!1});case 7:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return a.a.createElement(ce,null,a.a.createElement("div",{className:"graphView",ref:this.scene},a.a.createElement(le,null,a.a.createElement(de,{onClick:function(){return e.handleBFTClick()}},"START BFT"),a.a.createElement(de,{onClick:function(){return e.handleBFSClick()}},"START BFS"),a.a.createElement(de,{onClick:function(){return e.handleDFSClick()}},"START DFT"),a.a.createElement(he,{onClick:function(){return e.handleReset()}},"Reset"),a.a.createElement(U.a,null,a.a.createElement(fe,{data:this.state.graphNodes,typeName:"Start Node",value:this.state.startNode,onChange:function(t){return e.handleSelectChange(t,"startNode")}}),a.a.createElement(fe,{data:this.state.graphNodes,typeName:"End Node",value:this.state.endNode,onChange:function(t){return e.handleSelectChange(t,"endNode")}}),a.a.createElement(fe,{data:ge,typeName:"Algo Speed",value:this.state.speed,onChange:function(t){return e.handleSelectChange(t,"speed")}})),a.a.createElement(de,{onClick:function(){return e.handleGraphChange("eu")}},"EU Graph"),a.a.createElement(de,{onClick:function(){return e.handleGraphChange("world")}},"World Graph"),a.a.createElement(de,{onClick:function(){return e.handleGraphChange("africa")}},"Africa Graph"),a.a.createElement(pe,{onClick:function(){window.open("https://github.com/jFrisks/graph-traversal-visualizer","_blank")}},"CODE REPO")),a.a.createElement(L.a,{key:this.state.hoverMessage?this.state.hoverMessage.key:void 0,anchorOrigin:{vertical:"top",horizontal:"left"},open:this.state.hoverOpen,autoHideDuration:2e3,onClose:this.handleHoverClose,onExited:this.handleHoverExited,ContentProps:{"aria-describedby":"message-id"},message:a.a.createElement("span",{id:"message-id"},this.state.hoverMessage?this.state.hoverMessage.message:void 0)}),a.a.createElement(re,null)))}}]),t}(a.a.Component);function me(e){var t=a.a.useRef([]),n=a.a.useState(!1),r=Object(Y.a)(n,2),o=r[0],i=r[1],s=a.a.useState(void 0),u=Object(Y.a)(s,2),c=u[0],l=u[1],d=function(){t.current.length>0&&(l(t.current.shift()),i(!0))};return a.a.createElement(a.a.Fragment,null,e.children,a.a.createElement(L.a,{key:c?c.key:void 0,anchorOrigin:{vertical:"bottom",horizontal:"left"},open:o,autoHideDuration:2e3,onClose:function(e,t){"clickaway"!==t&&i(!1)},onExited:function(){d()},ContentProps:{"aria-describedby":"message-id"},message:a.a.createElement("span",{id:"message-id"},c?c.message:void 0)}))}var ye=function(){return a.a.createElement(me,null,a.a.createElement(ve,{height:window.innerHeight,width:window.innerWidth}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(ye,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[71,1,2]]]);
//# sourceMappingURL=main.1b93bb09.chunk.js.map