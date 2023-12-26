"use strict";(self.webpackChunktrustedlogin_docs=self.webpackChunktrustedlogin_docs||[]).push([[14],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>g});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(n),m=o,g=u["".concat(l,".").concat(m)]||u[m]||d[m]||a;return n?r.createElement(g,i(i({ref:t},c),{},{components:n})):r.createElement(g,i({ref:t},c))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:o,i[1]=s;for(var p=2;p<a;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},2612:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>p});var r=n(7462),o=(n(7294),n(3905));const a={sidebar_label:"Troubleshooting"},i=void 0,s={unversionedId:"Client/troubleshooting",id:"Client/troubleshooting",title:"troubleshooting",description:"If the CSS isn't loading on the Grant Support Access page",source:"@site/docs/Client/troubleshooting.md",sourceDirName:"Client",slug:"/Client/troubleshooting",permalink:"/Client/troubleshooting",draft:!1,editUrl:"https://github.com/trustedlogin/docs/edit/main/docs/Client/troubleshooting.md",tags:[],version:"current",frontMatter:{sidebar_label:"Troubleshooting"},sidebar:"Client",previous:{title:"Security Details",permalink:"/Client/security"}},l={},p=[{value:"If the CSS isn&#39;t loading on the Grant Support Access page",id:"if-the-css-isnt-loading-on-the-grant-support-access-page",level:3}],c={toc:p},u="wrapper";function d(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h3",{id:"if-the-css-isnt-loading-on-the-grant-support-access-page"},"If the CSS isn't loading on the Grant Support Access page"),(0,o.kt)("p",null,"If you have ",(0,o.kt)("a",{parentName:"p",href:"/Client/css-namespacing"},"modified the CSS namespacing"),", that is the likley culprit."),(0,o.kt)("p",null,"Otherwise, this is likely an issue with the ",(0,o.kt)("inlineCode",{parentName:"p"},"build-sass")," script not being passed the same ",(0,o.kt)("inlineCode",{parentName:"p"},"namespace")," flag as the Client is using."),(0,o.kt)("p",null,"Make sure the ",(0,o.kt)("inlineCode",{parentName:"p"},"--namespace=")," setting in the Composer file:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'"trustedlogin": [\n  "@php vendor/bin/build-sass --namespace=example-namespace"\n],\n')),(0,o.kt)("p",null,"Matches the ",(0,o.kt)("inlineCode",{parentName:"p"},"vendor/namespace")," setting in the Config settings array:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-php"},"$config = [\n    // ...\n    'vendor' => [\n        'namespace' => 'example-namespace',\n    // ...\n];\n")),(0,o.kt)("p",null,"If those are not the same, the CSS rules will not match the HTML generated and won't be applied."))}d.isMDXComponent=!0}}]);