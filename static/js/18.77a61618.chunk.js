(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{116:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return v});var n=a(14),r=a(0),l=a.n(r),o=a(5875),i=a.n(o),u=a(5877),c=a.n(u),s=a(5881),d=a.n(s),f=a(288),m=a.n(f),p=a(9);function v(e){var t=e.sendExtraData,a=Object(p.useWeb3Context)(),o=Object(r.useState)(""),u=Object(n.a)(o,2),s=u[0],f=u[1],v=Object(r.useState)(""),h=Object(n.a)(v,2),b=h[0],g=h[1];return l.a.createElement("div",{style:{width:"100%"}},l.a.createElement("form",{noValidate:!0,autoComplete:"off"},l.a.createElement(d.a,{margin:"normal",label:"Contact Name",helperText:"Introduce Contact Name or Alias",onChange:function(e){return f(e.target.value)},value:s,InputProps:{startAdornment:l.a.createElement(c.a,{position:"start"},l.a.createElement(m.a,null))},fullWidth:!0}),l.a.createElement(d.a,{margin:"normal",label:"Contact Data",helperText:"Introduce public Contact Data, as facebook Id, telegram Id or public email",onChange:function(e){return g(e.target.value)},value:b,InputProps:{startAdornment:l.a.createElement(c.a,{position:"start"},l.a.createElement(m.a,null))},fullWidth:!0})),l.a.createElement(i.a,{onClick:function(){var e=a.library.eth.abi.encodeParameters(["string","string"],[s,b]);t(e)},color:"primary",autoFocus:!0},"Submit..."))}},288:function(e,t,a){"use strict";var n=a(22);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),l=(0,n(a(57)).default)(r.default.createElement(r.default.Fragment,null,r.default.createElement("path",{fill:"none",d:"M0 0h24v24H0z"}),r.default.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"})),"Info");t.default=l},5877:function(e,t,a){"use strict";var n=a(3);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r.default}});var r=n(a(5882))},5882:function(e,t,a){"use strict";var n=a(3);Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.styles=void 0;var r=n(a(12)),l=n(a(28)),o=n(a(20)),i=n(a(0)),u=(n(a(1)),n(a(38))),c=n(a(58)),s=n(a(56)),d={root:{display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center"},filled:{"&$positionStart":{marginTop:16}},positionStart:{marginRight:8},positionEnd:{marginLeft:8}};function f(e){var t,a=e.children,n=e.component,s=e.classes,d=e.className,f=e.disableTypography,m=e.position,p=e.variant,v=(0,o.default)(e,["children","component","classes","className","disableTypography","position","variant"]);return i.default.createElement(n,(0,r.default)({className:(0,u.default)(s.root,(t={},(0,l.default)(t,s.filled,"filled"===p),(0,l.default)(t,s.positionStart,"start"===m),(0,l.default)(t,s.positionEnd,"end"===m),t),d)},v),"string"!==typeof a||f?a:i.default.createElement(c.default,{color:"textSecondary"},a))}t.styles=d,f.propTypes={},f.defaultProps={component:"div",disableTypography:!1};var m=(0,s.default)(d,{name:"MuiInputAdornment"})(f);t.default=m}}]);
//# sourceMappingURL=18.77a61618.chunk.js.map