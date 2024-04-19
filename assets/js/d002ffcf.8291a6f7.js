"use strict";(self.webpackChunktrustedlogin_docs=self.webpackChunktrustedlogin_docs||[]).push([[878],{4779:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>d,frontMatter:()=>o,metadata:()=>r,toc:()=>l});var s=n(4848),i=n(8453);const o={},a="Vault API Client",r={id:"SaaS/vault-client",title:"Vault API Client",description:"The Vault API client is used to make HTTP requests to the Vault instance.",source:"@site/docs/SaaS/vault-client.md",sourceDirName:"SaaS",slug:"/SaaS/vault-client",permalink:"/SaaS/vault-client",draft:!1,unlisted:!1,editUrl:"https://github.com/trustedlogin/docs/edit/main/docs/SaaS/vault-client.md",tags:[],version:"current",frontMatter:{},sidebar:"SaaS",previous:{title:"Remote User Authentication",permalink:"/SaaS/user-remote-authentication"},next:{title:"The Vault SaaS Token",permalink:"/SaaS/vault-sass-token"}},c={},l=[{value:"Team Key Store",id:"team-key-store",level:2},{value:"Creation of the Keystore",id:"creation-of-the-keystore",level:3},{value:"Creation Of The Keystore Policies",id:"creation-of-the-keystore-policies",level:3},{value:"The Keystore Tokens",id:"the-keystore-tokens",level:3},{value:"Access Team Tokens",id:"access-team-tokens",level:4}];function h(e){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"vault-api-client",children:"Vault API Client"}),"\n",(0,s.jsx)(t.p,{children:"The Vault API client is used to make HTTP requests to the Vault instance."}),"\n",(0,s.jsx)(t.h2,{id:"team-key-store",children:"Team Key Store"}),"\n",(0,s.jsx)(t.h3,{id:"creation-of-the-keystore",children:"Creation of the Keystore"}),"\n",(0,s.jsxs)(t.p,{children:["When an account is created, Spark's ",(0,s.jsx)(t.code,{children:"TeamCreated"})," event fires. A keystore is created in Vault with the slug column from the team model used as the namespace in Vault."]}),"\n",(0,s.jsx)(t.h3,{id:"creation-of-the-keystore-policies",children:"Creation Of The Keystore Policies"}),"\n",(0,s.jsx)(t.p,{children:"Then three policies are created for the at key store."}),"\n",(0,s.jsxs)(t.p,{children:['The first, "The Write Policy" is created with create, read and delete capabilities. The policy name is ',(0,s.jsx)(t.code,{children:"<namespace>-write-policy"}),"."]}),"\n",(0,s.jsxs)(t.p,{children:['A second policy "The Delete Policy" is created with the capability of delete.  The policy name is ',(0,s.jsx)(t.code,{children:"<namespace>-delete-policy"}),"."]}),"\n",(0,s.jsxs)(t.p,{children:['A third policy, which completes the trilogy, "The Read Token" is created with the read capability. The policy name is ',(0,s.jsx)(t.code,{children:"<namespace>-read-policy"}),"."]}),"\n",(0,s.jsx)(t.h3,{id:"the-keystore-tokens",children:"The Keystore Tokens"}),"\n",(0,s.jsx)(t.p,{children:"This also schedules a job to update the team's tokens. This job will repeat once a day."}),"\n",(0,s.jsx)(t.p,{children:'The job that updates the team\'s tokens is concerned with three tokens. The first token, "The Write Token" uses the write policy. The second token, "The Delete Token" uses the delete policy. The third token, "The Read Token" used the read policy.'}),"\n",(0,s.jsx)(t.h4,{id:"access-team-tokens",children:"Access Team Tokens"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"PHP"})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-php",children:"use \\App\\Team;\n$team = Team::find(42);\n$deleteToken = $team->deleteToken();\n$writeToken = $team->writeToken();\n"})})]})}function d(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>r});var s=n(6540);const i={},o=s.createContext(i);function a(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),s.createElement(o.Provider,{value:t},e.children)}}}]);