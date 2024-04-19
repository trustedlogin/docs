"use strict";(self.webpackChunktrustedlogin_docs=self.webpackChunktrustedlogin_docs||[]).push([[585],{7116:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>l,toc:()=>d});var t=i(4848),s=i(8453);const o={},r="Security Details",l={id:"Client/security",title:"Security Details",description:"Logging in",source:"@site/docs/Client/security.md",sourceDirName:"Client",slug:"/Client/security",permalink:"/Client/security",draft:!1,unlisted:!1,editUrl:"https://github.com/trustedlogin/docs/edit/main/docs/Client/security.md",tags:[],version:"current",frontMatter:{},sidebar:"Client",previous:{title:"Hooks",permalink:"/Client/hooks"},next:{title:"Troubleshooting",permalink:"/Client/troubleshooting"}},c={},d=[{value:"Logging in",id:"logging-in",level:2},{value:"Auto-expiring access",id:"auto-expiring-access",level:2},{value:"Capabilities",id:"capabilities",level:2},{value:"Access control",id:"access-control",level:2},{value:"Lockdown mode",id:"lockdown-mode",level:2},{value:"Preventing sites from going into lockdown:",id:"preventing-sites-from-going-into-lockdown",level:3}];function a(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"security-details",children:"Security Details"}),"\n",(0,t.jsx)(n.h2,{id:"logging-in",children:"Logging in"}),"\n",(0,t.jsxs)(n.p,{children:["Every time a login occurs using a TrustedLogin link, the login is also verified by the TrustedLogin service. See ",(0,t.jsx)(n.a,{href:"/flows",children:"TrustedLogin Flow"})," for details."]}),"\n",(0,t.jsx)(n.h2,{id:"auto-expiring-access",children:"Auto-expiring access"}),"\n",(0,t.jsx)(n.p,{children:"Accounts created with TrustedLogin auto-expire after a period of time defined in the Client configuration."}),"\n",(0,t.jsx)(n.p,{children:"Also, secrets stored in the Vault contain expiration timestamps. If the secret is older than the configured expiration time, the secret is deleted the next time it is requested."}),"\n",(0,t.jsx)(n.h2,{id:"capabilities",children:"Capabilities"}),"\n",(0,t.jsxs)(n.p,{children:["When creating a support user in TrustedLogin using the default ",(0,t.jsx)(n.code,{children:"clone_role=true"})," configuration, it's not possible to assign these capabilities to the generated users:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"create_users"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"delete_users"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"edit_users"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"promote_users"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"delete_site"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"remove_users"})}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["In order to maintain a higher level of security, users created by TrustedLogin with the ",(0,t.jsx)(n.code,{children:"clone_role"})," configuration enabled are not able to create other users. This will help prevent the possibility for support agents to create secret users for themselves."]}),"\n",(0,t.jsx)(n.h2,{id:"access-control",children:"Access control"}),"\n",(0,t.jsx)(n.p,{children:"At any time, a website administrator may revoke TrustedLogin access. When access is revoked locally, the secret is also deleted from the SaaS."}),"\n",(0,t.jsx)(n.h2,{id:"lockdown-mode",children:"Lockdown mode"}),"\n",(0,t.jsx)(n.p,{children:"TrustedLogin should not generate multiple User Identifiers in frequent succession. If many User Identifiers are being used to attempt a login, it may be the sign of a brute force attack on the website."}),"\n",(0,t.jsx)(n.p,{children:"When TrustedLogin identifies more than 3 User Identifiers have been used in 10 minutes, TrustedLogin enables lockdown mode for the plugin for 20 minutes."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Lockdown mode:"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Prevents all site access using the plugin's TrustedLogin link"}),"\n",(0,t.jsx)(n.li,{children:"Notifies the TrustedLogin service of the lockdown"}),"\n",(0,t.jsxs)(n.li,{children:["Runs the ",(0,t.jsx)(n.code,{children:"trustedlogin/{namespace}/lockdown/after"})," action so developers can customize behavior"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"preventing-sites-from-going-into-lockdown",children:"Preventing sites from going into lockdown:"}),"\n",(0,t.jsx)(n.p,{children:"When setting up TrustedLogin on a testing site, it may be helpful to temporarily disable lockdown mode."}),"\n",(0,t.jsxs)(n.p,{children:["Security checks will automatically be disabled for ",(0,t.jsx)(n.code,{children:"local"})," and ",(0,t.jsx)(n.code,{children:"development"})," sites based on the value of the ",(0,t.jsx)(n.a,{href:"https://developer.wordpress.org/reference/functions/wp_get_environment_type/",children:(0,t.jsx)(n.code,{children:"wp_get_environment_type()"})})," function."]}),"\n",(0,t.jsxs)(n.p,{children:["You can also define a ",(0,t.jsx)(n.code,{children:"TRUSTEDLOGIN_TESTING_{NAMESPACE}"})," constant in the site's ",(0,t.jsx)(n.code,{children:"wp-config.php"})," file."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-php",children:"define( 'TRUSTEDLOGIN_TESTING_EXAMPLE', true );\n"})})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>l});var t=i(6540);const s={},o=t.createContext(s);function r(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);