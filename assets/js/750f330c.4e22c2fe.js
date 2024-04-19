"use strict";(self.webpackChunktrustedlogin_docs=self.webpackChunktrustedlogin_docs||[]).push([[220],{4875:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>s,metadata:()=>l,toc:()=>d});var o=t(4848),r=t(8453);const s={title:"Local Development"},i="TrustedLogin Connector Plugin Development",l={id:"Connector/development",title:"Local Development",description:"Plugin to interact with TrustedLogin's encrypted storage infrastructure to redirect support staff into an authenticated session on client installations.",source:"@site/docs/Connector/development.md",sourceDirName:"Connector",slug:"/Connector/development",permalink:"/Connector/development",draft:!1,unlisted:!1,editUrl:"https://github.com/trustedlogin/docs/edit/main/docs/Connector/development.md",tags:[],version:"current",frontMatter:{title:"Local Development"},sidebar:"Connector",previous:{title:"TrustedLogin Connector Plugin",permalink:"/Connector/intro"},next:{title:"Help Scout App",permalink:"/Connector/help-scout"}},c={},d=[{value:"To Compile",id:"to-compile",level:2},{value:"Code Standards Installation",id:"code-standards-installation",level:2},{value:"Local Development Environment",id:"local-development-environment",level:2},{value:"Running PHPUnit in Docker",id:"running-phpunit-in-docker",level:3},{value:"Server-to-Server HTTP Requests",id:"server-to-server-http-requests",level:3}];function a(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"trustedlogin-connector-plugin-development",children:"TrustedLogin Connector Plugin Development"}),"\n",(0,o.jsx)(n.p,{children:"Plugin to interact with TrustedLogin's encrypted storage infrastructure to redirect support staff into an authenticated session on client installations."}),"\n",(0,o.jsx)(n.h2,{id:"to-compile",children:"To Compile"}),"\n",(0,o.jsx)(n.p,{children:"The plugin will need to be built. Here's how:"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["Change directories to the plugin directory (",(0,o.jsx)(n.code,{children:"cd /path/to/directory"}),")"]}),"\n",(0,o.jsxs)(n.li,{children:["Run ",(0,o.jsx)(n.code,{children:"composer install --no-dev"})]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"code-standards-installation",children:"Code Standards Installation"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["Change directories to the plugin directory (",(0,o.jsx)(n.code,{children:"cd /path/to/directory"}),")"]}),"\n",(0,o.jsxs)(n.li,{children:["Run ",(0,o.jsx)(n.code,{children:"composer install"})," - this will also install the code standards directory"]}),"\n",(0,o.jsxs)(n.li,{children:["Run ",(0,o.jsx)(n.code,{children:"./vendor/bin/phpcs"})]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"local-development-environment",children:"Local Development Environment"}),"\n",(0,o.jsxs)(n.p,{children:["A ",(0,o.jsx)(n.a,{href:"https://docs.docker.com/samples/wordpress/",children:"docker-compose"}),"-based local development environment is provided."]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["Start server","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.code,{children:"docker-compose up -d"})}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["Acess Site","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"http://localhost:6100",children:"http://localhost:6300"})}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["Run WP CLI command:","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.code,{children:"docker-compose run wp cli wp ..."})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.code,{children:"docker-compose run wpcli wp db reset"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["In the local development container, the constant ",(0,o.jsx)(n.code,{children:"DOING_TL_VENDOR_TESTS"})," is set to true, as is ",(0,o.jsx)(n.code,{children:"WP_DEBUG"}),"."]}),"\n",(0,o.jsx)(n.h3,{id:"running-phpunit-in-docker",children:"Running PHPUnit in Docker"}),"\n",(0,o.jsx)(n.p,{children:"There is a special phpunit container for running WordPress tests, with WordPress and MySQL configured."}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["Enter container","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.code,{children:"docker-compose run phpunit"})}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["Test","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.code,{children:"phpunit"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"server-to-server-http-requests",children:"Server-to-Server HTTP Requests"}),"\n",(0,o.jsxs)(n.p,{children:["If the eCommerce app (the SaaS) is also running in ",(0,o.jsx)(n.code,{children:"docker-compose"}),', this WordPress and the "web" service of app should be in ',(0,o.jsx)(n.code,{children:"tl-dev"})," network. This allows you to make an HTTP request to the eCommerce app like this:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-php",children:"$r = wp_remote_get( 'http://web:80', ['sslverify' => false] );\n"})}),"\n",(0,o.jsxs)(n.p,{children:["If this doesn't work, make sure a ",(0,o.jsx)(n.code,{children:"tl-dev"})," network exists:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"docker network ls\n"})}),"\n",(0,o.jsx)(n.p,{children:"If it does not, create one:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"docker network create tl-dev\n"})})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(a,{...e})}):a(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>l});var o=t(6540);const r={},s=o.createContext(r);function i(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);