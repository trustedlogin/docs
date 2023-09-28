"use strict";(self.webpackChunktrustedlogin_docs=self.webpackChunktrustedlogin_docs||[]).push([[132],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>k});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,l=e.originalType,p=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),d=s(n),m=o,k=d["".concat(p,".").concat(m)]||d[m]||u[m]||l;return n?r.createElement(k,a(a({ref:t},c),{},{components:n})):r.createElement(k,a({ref:t},c))}));function k(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=n.length,a=new Array(l);a[0]=m;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[d]="string"==typeof e?e:o,a[1]=i;for(var s=2;s<l;s++)a[s]=n[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},668:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>u,frontMatter:()=>l,metadata:()=>i,toc:()=>s});var r=n(7462),o=(n(7294),n(3905));const l={title:"Local Development"},a="Vendor Plugin Development",i={unversionedId:"Vendor/development",id:"Vendor/development",title:"Local Development",description:"Plugin to interact with TrustedLogin's encrypted storage infrastructure to redirect support staff into an authenticated session on client installations.",source:"@site/docs/Vendor/development.md",sourceDirName:"Vendor",slug:"/Vendor/development",permalink:"/Vendor/development",draft:!1,editUrl:"https://github.com/trustedlogin/docs/edit/main/docs/Vendor/development.md",tags:[],version:"current",frontMatter:{title:"Local Development"},sidebar:"Vendor",previous:{title:"Vendor Plugin",permalink:"/Vendor/intro"},next:{title:"Help Scout App",permalink:"/Vendor/help-scout"}},p={},s=[{value:"To Compile",id:"to-compile",level:2},{value:"Code Standards Installation",id:"code-standards-installation",level:2},{value:"Local Development Environment",id:"local-development-environment",level:2},{value:"Running PHPUnit in Docker",id:"running-phpunit-in-docker",level:3},{value:"Server-to-Server HTTP Requests",id:"server-to-server-http-requests",level:3}],c={toc:s},d="wrapper";function u(e){let{components:t,...n}=e;return(0,o.kt)(d,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"vendor-plugin-development"},"Vendor Plugin Development"),(0,o.kt)("p",null,"Plugin to interact with TrustedLogin's encrypted storage infrastructure to redirect support staff into an authenticated session on client installations."),(0,o.kt)("h2",{id:"to-compile"},"To Compile"),(0,o.kt)("p",null,"The repo lacks the ",(0,o.kt)("inlineCode",{parentName:"p"},"/vendor/")," directory; you'll need to build first. Here's how:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Change directories to the plugin directory (",(0,o.kt)("inlineCode",{parentName:"li"},"cd /path/to/directory"),")"),(0,o.kt)("li",{parentName:"ol"},"Run ",(0,o.kt)("inlineCode",{parentName:"li"},"composer install --no-dev"))),(0,o.kt)("h2",{id:"code-standards-installation"},"Code Standards Installation"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Change directories to the plugin directory (",(0,o.kt)("inlineCode",{parentName:"li"},"cd /path/to/directory"),")"),(0,o.kt)("li",{parentName:"ol"},"Run ",(0,o.kt)("inlineCode",{parentName:"li"},"composer install")," - this will also install the code standards directory"),(0,o.kt)("li",{parentName:"ol"},"Run ",(0,o.kt)("inlineCode",{parentName:"li"},"./vendor/bin/phpcs"))),(0,o.kt)("h2",{id:"local-development-environment"},"Local Development Environment"),(0,o.kt)("p",null,"A ",(0,o.kt)("a",{parentName:"p",href:"https://docs.docker.com/samples/wordpress/"},"docker-compose"),"-based local development environment is provided."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Start server",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"docker-compose up -d")))),(0,o.kt)("li",{parentName:"ul"},"Acess Site",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"http://localhost:6100"},"http://localhost:6300")))),(0,o.kt)("li",{parentName:"ul"},"Run WP CLI command:",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"docker-compose run wp cli wp ...")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"docker-compose run wpcli wp db reset"))))),(0,o.kt)("p",null,"In the local development container, the constant ",(0,o.kt)("inlineCode",{parentName:"p"},"DOING_TL_VENDOR_TESTS")," is set to true, as is ",(0,o.kt)("inlineCode",{parentName:"p"},"WP_DEBUG"),"."),(0,o.kt)("h3",{id:"running-phpunit-in-docker"},"Running PHPUnit in Docker"),(0,o.kt)("p",null,"There is a special phpunit container for running WordPress tests, with WordPress and MySQL configured."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Enter container",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"docker-compose run phpunit")))),(0,o.kt)("li",{parentName:"ul"},"Test",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"phpunit"))))),(0,o.kt)("h3",{id:"server-to-server-http-requests"},"Server-to-Server HTTP Requests"),(0,o.kt)("p",null,"If the eCommerce app (the SaaS) is also running in ",(0,o.kt)("inlineCode",{parentName:"p"},"docker-compose"),', this WordPress and the "web" service of app should be in ',(0,o.kt)("inlineCode",{parentName:"p"},"tl-dev")," network. This allows you to make an HTTP request to the eCommerce app like this:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-php"},"$r = wp_remote_get( 'http://web:80', ['sslverify' => false] );\n")),(0,o.kt)("p",null,"If this doesn't work, make sure a ",(0,o.kt)("inlineCode",{parentName:"p"},"tl-dev")," network exists:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"docker network ls\n")),(0,o.kt)("p",null,"If it does not, create one:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"docker network create tl-dev\n")))}u.isMDXComponent=!0}}]);