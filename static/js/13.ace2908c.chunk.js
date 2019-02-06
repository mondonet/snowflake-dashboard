(window.webpackJsonp=window.webpackJsonp||[]).push([[13,17],{161:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return d});var r=a(14),n=a(0),o=a.n(n),s=a(5841),i=a(9),c=a(21),l=a(269);function d(){var e=Object(n.useState)(""),t=Object(r.a)(e,2),a=t[0],d=t[1],u=Object(i.useWeb3Context)(),m=Object(c.useNamedContract)("snowflake"),f=Object(c.useNamedContract)("clientRaindrop")._address,p=u.library.eth.abi.encodeParameters(["address","string"],[u.account,a]);return o.a.createElement("div",null,o.a.createElement(s.z,{variant:"h4",gutterBottom:!0,color:"textPrimary"},"Almost There..."),o.a.createElement(s.z,{variant:"body2",gutterBottom:!0,color:"textPrimary"},"Just one last step: please choose a Hydro ID to be associated with your Identity."),o.a.createElement(s.x,{key:"Hydro ID",label:"Hydro ID",helperText:"This is a public identifier.",margin:"normal",value:a,onChange:function(e){return d(e.target.value)},fullWidth:!0}),o.a.createElement(l.default,{readyText:"Claim Hydro ID!",method:function(){return m.methods.addResolver(f,!0,0,p)},onConfirmation:u.forceAccountReRender}))}},269:function(e,t,a){"use strict";a.r(t);var r=a(14),n=a(0),o=a.n(n),s=a(5841),i=a(5842),c=a.n(i),l=a(32),d=a(9),u=a(67),m=Object(l.withTheme)()(function(e){var t=e.theme;return o.a.createElement(c.a,{size:t.typography.button.fontSize})});function f(e){var t=e.show,a=e.method,n=e.readyText,i=e.classes,c=e.onTransactionHash,l=e.onConfirmation,f=e.transactionOptions,p=Object(d.useWeb3Context)(),h=Object(d.useTransactionManager)(a,{handlers:{transactionHash:c,receipt:l},transactionOptions:f}),y=Object(r.a)(h,4),v=y[0],g=y[1],k=y[2],b=y[3];switch(v){case"ready":return o.a.createElement(s.a,{style:t?void 0:{display:"none"},variant:"contained",onClick:k,className:i.ready},n);case"sending":return o.a.createElement(s.a,{style:t?void 0:{display:"none"},variant:"contained",disabled:!0,className:i.sendingPending},o.a.createElement(m,null));case"pending":return o.a.createElement(s.a,{style:t?void 0:{display:"none"},variant:"contained",className:i.sendingPending,component:"a",href:Object(u.getEtherscanLink)(p.networkId,"transaction",g.transactionHash),target:"_blank"},o.a.createElement("span",null,"Pending Confirmation ",o.a.createElement(m,null)));case"success":return o.a.createElement(s.a,{style:t?void 0:{display:"none"},variant:"contained",className:i.success,component:"a",href:Object(u.getEtherscanLink)(p.networkId,"transaction",g.transactionHash),target:"_blank"},o.a.createElement("span",null,"Success!"));case"error":return o.a.createElement(s.a,{style:t?void 0:{display:"none"},variant:"contained",onClick:b,className:i.error},o.a.createElement("span",null,"Error. Retry?"));default:throw Error("This should not happen\u2122.")}}f.defaultProps={show:!0,onTransactionHash:function(){},onConfirmation:function(){}},t.default=Object(l.withStyles)(function(e){return{ready:{backgroundColor:e.palette.primary.main,color:e.palette.primary.contrastText,"&:hover":{backgroundColor:e.palette.primary.dark}},sendingPending:{backgroundColor:e.palette.grey[300],color:e.palette.getContrastText(e.palette.grey[300]),"&:hover":{backgroundColor:e.palette.grey[500]}},error:{backgroundColor:e.palette.error.main,color:e.palette.error.contrastText,"&:hover":{backgroundColor:e.palette.error.dark}},success:{backgroundColor:e.palette.success.main,color:e.palette.success.contrastText,"&:hover":{backgroundColor:e.palette.success.dark}}}})(f)},5842:function(e,t,a){"use strict";var r=a(3);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return n.default}});var n=r(a(5843))},5843:function(e,t,a){"use strict";var r=a(3);Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.styles=void 0;var n=r(a(12)),o=r(a(28)),s=r(a(20)),i=r(a(0)),c=(r(a(1)),r(a(38))),l=r(a(55)),d=a(80),u=(r(a(270)),44);function m(e){var t,a,r;return t=e,a=0,r=1,e=(Math.min(Math.max(a,t),r)-a)/(r-a),e=(e-=1)*e*e+1}var f=function(e){return{root:{display:"inline-block",lineHeight:1},static:{transition:e.transitions.create("transform")},indeterminate:{animation:"mui-progress-circular-rotate 1.4s linear infinite"},colorPrimary:{color:e.palette.primary.main},colorSecondary:{color:e.palette.secondary.main},svg:{},circle:{stroke:"currentColor"},circleStatic:{transition:e.transitions.create("stroke-dashoffset")},circleIndeterminate:{animation:"mui-progress-circular-dash 1.4s ease-in-out infinite",strokeDasharray:"80px, 200px",strokeDashoffset:"0px"},"@keyframes mui-progress-circular-rotate":{"100%":{transform:"rotate(360deg)"}},"@keyframes mui-progress-circular-dash":{"0%":{strokeDasharray:"1px, 200px",strokeDashoffset:"0px"},"50%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-15px"},"100%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-120px"}},circleDisableShrink:{animation:"none"}}};function p(e){var t,a,r,l=e.classes,f=e.className,p=e.color,h=e.disableShrink,y=e.size,v=e.style,g=e.thickness,k=e.value,b=e.variant,x=(0,s.default)(e,["classes","className","color","disableShrink","size","style","thickness","value","variant"]),C={},E={},w={};if("determinate"===b||"static"===b){var D=2*Math.PI*((u-g)/2);C.strokeDasharray=D.toFixed(3),w["aria-valuenow"]=Math.round(k),"static"===b?(C.strokeDashoffset="".concat(((100-k)/100*D).toFixed(3),"px"),E.transform="rotate(-90deg)"):(C.strokeDashoffset="".concat((r=(100-k)/100,r*r*D).toFixed(3),"px"),E.transform="rotate(".concat((270*m(k/70)).toFixed(3),"deg)"))}return i.default.createElement("div",(0,n.default)({className:(0,c.default)(l.root,(t={},(0,o.default)(t,l["color".concat((0,d.capitalize)(p))],"inherit"!==p),(0,o.default)(t,l.indeterminate,"indeterminate"===b),(0,o.default)(t,l.static,"static"===b),t),f),style:(0,n.default)({width:y,height:y},E,v),role:"progressbar"},w,x),i.default.createElement("svg",{className:l.svg,viewBox:"".concat(u/2," ").concat(u/2," ").concat(u," ").concat(u)},i.default.createElement("circle",{className:(0,c.default)(l.circle,(a={},(0,o.default)(a,l.circleIndeterminate,"indeterminate"===b),(0,o.default)(a,l.circleStatic,"static"===b),(0,o.default)(a,l.circleDisableShrink,h),a)),style:C,cx:u,cy:u,r:(u-g)/2,fill:"none",strokeWidth:g})))}t.styles=f,p.propTypes={},p.defaultProps={color:"primary",disableShrink:!1,size:40,thickness:3.6,value:0,variant:"indeterminate"};var h=(0,l.default)(f,{name:"MuiCircularProgress",flip:!1})(p);t.default=h}}]);
//# sourceMappingURL=13.ace2908c.chunk.js.map