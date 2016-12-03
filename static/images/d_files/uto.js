!function e(n,t,o){function i(a,s){if(!t[a]){if(!n[a]){var c="function"==typeof require&&require;if(!s&&c)return c(a,!0);if(r)return r(a,!0);var d=new Error("Cannot find module '"+a+"'");throw d.code="MODULE_NOT_FOUND",d}var u=t[a]={exports:{}};n[a][0].call(u.exports,function(e){var t=n[a][1][e];return i(t?t:e)},u,u.exports,e,n,t,o)}return t[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(e,n,t){function o(e,n,t,o,i,r,a){this.realStunHost=n,this.turnSignalHost=t,this.stunGunHost=o,this.remoteCandidates=[],this.serverCandidate=e,this.nodePeerPort=null,this.nodePeerIp=null,this.localCandidates=[],this.sentDataToTurn=!1,this.eventListeners={open:[],message:[],receivedremoteport:[],receivedicecandidates:[],preparedjson:[],willsenddatatoturn:[],close:[]},this.requests={},this.isOpen=!1,a&&(this.handleError=a),this.isLocalConnection=i,this.timingEvents=[],this.reportStats=!0}function i(){var e=this,n={iceServers:[{url:"stun:"+this.stunGunHost,urls:["stun:"+this.stunGunHost],username:"test",credential:"test"}]};C.info("Connecting to stungun server : "+this.stunGunHost);var t=this.stunGunPeerConnection=new w(n);t.createDataChannel(""),t.createOffer(function(n){t.setLocalDescription(n,function(){e.addTimingEvent("requestingServerIp",performance.now()-e.estConnectionStart)},function(){})},function(){}),t.onicecandidate=function(n){if(null!==n.candidate){var o=n.candidate.candidate;if(C.debug("onicecandidate: "+o),g.isServerReflexive(o)&&!g.isIPv6(o)){t.close();var i=g.matchNodePeerIpAndPort(o);if(null!==i){e.addTimingEvent("serverIpReceived",performance.now()-e.estConnectionStart),e.nodePeerIp=i[1],e.nodePeerPort=i[2],C.info("ip and port to connect on: "+e.nodePeerIp+":"+e.nodePeerPort);var r=e.serverCandidate.replace(/SERVER_PORT/g,e.nodePeerPort);r=r.replace(/SERVER_IP/g,e.nodePeerIp),C.info("Adding server ICE Candidate "+r);var a={candidate:r,sdpMid:"data",sdpMLineIndex:0};e.peerConnection.addIceCandidate(new T(a),h,e.handleError),e.triggerEvent("receivedremoteport"),e.remoteCandidateReceived=!0,u.call(e)}}}}}function r(){var e=this.peerConnection=new w({iceServers:[{url:"stun:"+this.realStunHost,urls:["stun:"+this.realStunHost]}]}),n=this;this.peerConnection.onicecandidate=function(e){if(null!==e.candidate){var t=e.candidate.candidate;C.info("RECEVIED LOCAL CANDIDATE "+t),g.isServerReflexive(t)&&!g.isIPv6(t)&&(n.addTimingEvent("iceCandidate",performance.now()-n.estConnectionStart),n.localCandidates.push(t),n.localCandidateReceived=!0,u.call(n))}},this.peerConnection.ondatachannel=function(e){n.dataChannel=e.channel,n.turnSignalPeerConnection.close(),C.info("ondatachannel",n.dataChannel.label,n.dataChannel.readyState),n.dataChannel.binaryType="arraybuffer",n.dataChannel.onopen=function(){n.isOpen=!0,C.info("onopen");var e=performance.now(),t=e-n.estConnectionStart;n.addTimingEvent("dataChannelOpen",t);var o={host:"test"};n.request(o,function(){var t=performance.now()-e;n.addTimingEvent("msgRoundTrip",t),n.report("success",performance.now()-n.estConnectionStart),clearTimeout(n.connectionTimeout),setTimeout(function(){n.close()},y)}),C.info("TIMING:total "+t),C.info("onopen"),n.triggerEvent("open"),n.messageSendStartTime=performance.now()};var t="";n.dataChannel.onmessage=function(e){var o=e.data;C.info(o),n.triggerEvent("message",o);var i=null;try{i=m.handleMessage(o,t),C.info("got response chunk",i)}catch(e){C.error(e)}i&&(i.complete?(a.call(n,i.data.id,i.data.http),t="",C.info("recieved complete response, reset accumulator")):(t=i.data,C.info("response is not complete yet, updated accumulated data",t)))},n.dataChannel.onclose=function(){C.info("onClose"),n.triggerEvent("close")},n.dataChannel.onerror=n.handleError},this.peerConnection.onsignalingstatechange=function(){C.info("signaling state change: ",e.iceConnectionState)},this.peerConnection.oniceconnectionstatechange=function(){var t=performance.now();C.info("ice connection state change: ",e.iceConnectionState,"after ",t-n.estConnectionStart,"millis")},this.peerConnection.onicegatheringstatechange=function(){C.info("ice gathering state change: ",e.iceConnectionState)},s.call(this)}function a(e,n){var t=n.headers;t&&t["set-cookie"]&&(document.cookie=t["set-cookie"]);var o=this.requests[e];o(n.body,n.headers,n.status),delete this.requests[e]}function s(){var e={type:"offer",sdp:"v=0\r\no=- 7745999191240241858 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=msid-semantic: WMS\r\nm=application 9 DTLS/SCTP 5000\r\nc=IN IP4 0.0.0.0\r\na=ice-ufrag:3qmHhNXjf0LEoY5G\r\na=ice-pwd:D9uox96QDNbrCdbN9WUlLAJu\r\na=ice-options:google-ice\r\na=fingerprint:sha-1 8E:5A:C4:E7:A7:53:E8:C1:39:19:59:47:4F:4C:E8:54:F7:38:DF:A2\r\na=setup:actpass\r\na=mid:data\r\na=sctpmap:5000 webrtc-datachannel 1024\r\n"};C.info("SETTING HARD CODED offer data : "+e.sdp);var n=new S(e);this.peerConnection.setRemoteDescription(n,c.bind(this),this.handleError),c.bind(this)}function c(){this.peerConnection.createAnswer(d.bind(this),this.handleError),this.iceCandidateStartTime=performance.now()}function d(e){this.answer=e,this.peerConnection.setLocalDescription(new S(e),l.bind(this),this.handleError),this.localDescriptionSet=!0,u.call(this)}function u(){!this.sentDataToTurn&&this.remoteCandidateReceived&&this.localCandidateReceived&&this.localDescriptionSet&&(C.debug("sending data to TURN"),p.call(this),this.sentDataToTurn=!0)}function l(){C.info("Sending answer"),this.addTimingEvent("setLocalDesc",performance.now()-this.estConnectionStart)}function p(){this.triggerEvent("receivedicecandidates");var e=performance.now();C.info("TIMING:ice_candidates "+(e-this.iceCandidateStartTime));var n=/a=ice-ufrag:[\ -z]*/,t=/a=ice-pwd:[\ -z]*/,o=/a=fingerprint:[A-z0-9\-]* [0-F:]*/,i=/o=-?\S* [0-9]+ [0-9] IN IP4 [0-9\.]+/,r=performance.now();C.info("Before matching regexes"+(r-this.estConnectionStart)),C.info(this.answer.sdp);var a=this.answer.sdp.match(n),s=this.answer.sdp.match(t),c=this.answer.sdp.match(o),d=this.answer.sdp.match(i);C.info("UFRAG:"+a),C.info("PWD:"+s),C.info("FINGERPRINT:"+c),C.info("O=:"+d);var u=[this.localCandidates];u.push(a[0]),u.push(s[0]),u.push(c[0]),u.push(d[0]);var l=new Uint8Array(8);window.crypto.getRandomValues(l);var p=String.fromCharCode.apply(null,l);u.push(p),u.push(this.nodePeerIp),u.push(this.nodePeerPort),this.triggerEvent("preparedjson",u);var h=performance.now();C.info("After matching regexes"+(h-this.estConnectionStart));var g=performance.now();C.info("Before jsonifying candidates"+(g-this.estConnectionStart));var v=JSON.stringify(u),m=performance.now();C.info("After jsonifying candidates"+(m-this.estConnectionStart)),f.call(this,v)}function f(e){this.triggerEvent("willsenddatatoturn",e);var n=performance.now()-this.estConnectionStart;this.addTimingEvent("turnPrep",n),C.debug("Sending data to turn @ "+this.turnSignalHost+" after "+n+" millis");var t={iceServers:[{url:"turn:"+this.turnSignalHost,urls:["turn:"+this.turnSignalHost],username:e,credential:"x"}]};this.turnSignalPeerConnection=new w(t),this.turnSignalPeerConnection.createDataChannel("");var o=this;this.turnSignalPeerConnection.createOffer(function(e){var n=performance.now(),t=n-o.estConnectionStart;o.addTimingEvent("turnSend",t),C.info("Fake offer generated which should trigger TURN request after "+(n-o.estConnectionStart)+" millis"),o.turnSignalPeerConnection.setLocalDescription(e,function(){},function(){})},function(){})}function h(){C.info("Successfully added ICE candidate")}var g=e(3),v=e(4),m=e(5),C=e(2);C.setLevel("silent");var w=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection,S=window.RTCSessionDescription||window.mozRTCSessionDescription||window.webkitRTCSessionDescription,T=window.RTCIceCandidate||window.mozRTCIceCandidate||window.webkitRTCIceCandidate,E=15e3,y=3e5;o.prototype.handleError=function(){},o.prototype.getTimingEvents=function(){return this.timingEvents},o.prototype.addTimingEvent=function(e,n){var t={name:"t_"+e,timing:n};this.timingEvents.push(t)},o.prototype.report=function(e,n){this.getTimingEvents().forEach(function(e){C.debug("sending stat : "+e.name+" : "+e.timing)}),this.reportStats&&v.sendStats(e,[{name:"t",timing:n}].concat(this.getTimingEvents()))},o.prototype.open=function(){var e=this;this.connectionTimeout=setTimeout(function(){e.report("timeout",performance.now()-e.estConnectionStart),e.close()},E),this.estConnectionStart=performance.now(),e.report("open",performance.now()-e.estConnectionStart),setTimeout(function(){C.debug("v8Lag is : "+(performance.now()-e.estConnectionStart)),e.addTimingEvent("v8Lag",performance.now()-e.estConnectionStart)},1),i.call(this),r.call(this)},o.prototype.send=function(e){C.info("sending message",e),this.dataChannel.send(e)},o.prototype.request=function(e,n){var t=m.buildRequest(e),o=m.buildTerminator(t.id);this.requests[t.id]=n,this.send(JSON.stringify(t)),this.send(JSON.stringify(o))},o.prototype.close=function(){this.dataChannel&&(this.report("unfinished",performance.now()-this.estConnectionStart),this.dataChannel.close(),this.dataChannel=null),this.peerConnection&&"closed"!==this.peerConnection.signalingState&&(console.log("Closed PC"),this.peerConnection.close()),this.stunGunPeerConnection&&"closed"!==this.stunGunPeerConnection.signalingState&&(console.log("Closed Stungun PC"),this.stunGunPeerConnection.close()),this.turnSignalPeerConnection&&"closed"!==this.turnSignalPeerConnection.signalingState&&(console.log("Closed Turnsignal PC"),this.turnSignalPeerConnection.close())},o.prototype.on=function(e,n){e in this.eventListeners&&this.eventListeners[e].push(n)},o.prototype.triggerEvent=function(e){if(e in this.eventListeners){var n=Array.prototype.slice.call(arguments,1);this.eventListeners[e].forEach(function(e){e.apply(this,n)})}},o.prototype.setLogLevel=function(e){C.setLevel(e)},window.PanamaClient=o,n.exports=o},{}],2:[function(e,n,t){!function(t,o){"use strict";"object"==typeof n&&n.exports&&"function"==typeof e?n.exports=o():"function"==typeof define&&"object"==typeof define.amd?define(o):t.log=o()}(this,function(){"use strict";function e(e){return typeof console===s?!1:void 0!==console[e]?n(console,e):void 0!==console.log?n(console,"log"):a}function n(e,n){var t=e[n];if("function"==typeof t.bind)return t.bind(e);try{return Function.prototype.bind.call(t,e)}catch(n){return function(){return Function.prototype.apply.apply(t,[e,arguments])}}}function t(e,n,t){return function(){typeof console!==s&&(o.call(this,n,t),this[e].apply(this,arguments))}}function o(e,n){for(var t=0;t<c.length;t++){var o=c[t];this[o]=e>t?a:this.methodFactory(o,e,n)}}function i(n,o,i){return e(n)||t.apply(this,arguments)}function r(e,n,t){function r(e){var n=(c[e]||"silent").toUpperCase();try{return void(window.localStorage[l]=n)}catch(e){}try{window.document.cookie=encodeURIComponent(l)+"="+n+";"}catch(e){}}function a(){var e;try{e=window.localStorage[l]}catch(e){}if(typeof e===s)try{var n=window.document.cookie,t=n.indexOf(encodeURIComponent(l)+"=");t&&(e=/^([^;]+)/.exec(n.slice(t))[1])}catch(e){}return void 0===u.levels[e]&&(e=void 0),e}var d,u=this,l="loglevel";e&&(l+=":"+e),u.levels={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,SILENT:5},u.methodFactory=t||i,u.getLevel=function(){return d},u.setLevel=function(n,t){if("string"==typeof n&&void 0!==u.levels[n.toUpperCase()]&&(n=u.levels[n.toUpperCase()]),!("number"==typeof n&&n>=0&&n<=u.levels.SILENT))throw"log.setLevel() called with invalid level: "+n;return d=n,t!==!1&&r(n),o.call(u,n,e),typeof console===s&&n<u.levels.SILENT?"No console available for logging":void 0},u.setDefaultLevel=function(e){a()||u.setLevel(e,!1)},u.enableAll=function(e){u.setLevel(u.levels.TRACE,e)},u.disableAll=function(e){u.setLevel(u.levels.SILENT,e)};var p=a();null==p&&(p=null==n?"WARN":n),u.setLevel(p,!1)}var a=function(){},s="undefined",c=["trace","debug","info","warn","error"],d=new r,u={};d.getLogger=function(e){if("string"!=typeof e||""===e)throw new TypeError("You must supply a name when creating a logger.");var n=u[e];return n||(n=u[e]=new r(e,d.getLevel(),d.methodFactory)),n};var l=typeof window!==s?window.log:void 0;return d.noConflict=function(){return typeof window!==s&&window.log===d&&(window.log=l),d},d})},{}],3:[function(e,n,t){n.exports.getPortNoFromCandidate=function(e){var n=/([0-9]+) ([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}) ([0-9]+)/.exec(e)||[];return n[3]||null},n.exports.isServerReflexive=function(e){return-1!==e.indexOf("srflx")},n.exports.isIPv6=function(e){return/([0-9a-fA-F]){1,4}(:([0-9a-fA-F]){1,4}){7}/.test(e)},n.exports.extractCandidateIp=function(e){return/([0-9]+) ([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}) ([0-9]+)/.exec(e)},n.exports.matchNodePeerIpAndPort=function(e){return e.match(/candidate:[0-9]+ [0-9]+ udp [0-9]+ ([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}) ([0-9]*)/i)}},{}],4:[function(e,n,t){function o(e,n,t){var o=new XMLHttpRequest,r=[i,"?s=",e];n&&n.forEach(function(e){return r.push(["&",e.name,"=",0|e.timing].join(""))}),t&&(t=[t.toString(),t.stack],t=JSON.stringify(t),r=r.concat(["&e=",encodeURIComponent(t)])),r=r.join(""),o.open("GET",r,!0),o.send()}var i="http://s.xpanama.net/stats/panama_staging";n.exports={sendStats:o}},{}],5:[function(e,n,t){function o(){return Math.floor(99999*Math.random()+1)}function i(e){var n=o().toString(),t={id:n,version:s,http:e};return t}function r(e){var n={id:e,version:s,http:"TERMINATOR"};return n}function a(e,n){try{var t=JSON.parse(e)}catch(t){return{data:n+e,complete:!1}}var o="TERMINATOR"===t.http;return o?n.length>0?{data:JSON.parse(n),complete:!0}:{data:"",complete:!1}:{data:t,complete:!0}}var s="1.0";n.exports={buildRequest:i,buildTerminator:r,handleMessage:a}},{}],6:[function(e,n,t){function o(e,n){var t=new XMLHttpRequest,o=[REPORTING_URL,"/uwrtc_connected?t=",e,"&c=",n].join("");t.open("GET",o,!0),t.send()}function i(){var e="ts.us-east-1.staging.xpanama.net:7000",n="sg.us-east-1.staging.xpanama.net:3480",t="candidate:3129333942 1 udp 1685987071 SERVER_IP SERVER_PORT typ host generation 0",i=new a(t,"stun.l.google.com:19302",e,n);setTimeout(function(){o(0,i.isOpen)},0),setTimeout(function(){o(2,i.isOpen)},2e3),setTimeout(function(){o(4,i.isOpen)},4e3),setTimeout(function(){o(6,i.isOpen)},6e3),setTimeout(function(){o(8,i.isOpen)},8e3),setTimeout(function(){o(16,i.isOpen)},16e3),setTimeout(function(){o(32,i.isOpen)},32e3),i.open()}var r=e(4),a=e(1);REPORTING_URL="http://s.xpanama.net/stats";var s=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection;s?Math.random()<1&&i():r.sendStats("unsupported")},{}]},{},[6]);
