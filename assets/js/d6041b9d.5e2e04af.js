"use strict";(self.webpackChunktrustedlogin_docs=self.webpackChunktrustedlogin_docs||[]).push([[227],{7109:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>r,toc:()=>l});var s=n(4848),i=n(8453);const o={},a="Webhooks",r={id:"SaaS/webhooks",title:"Webhooks",description:"There are webhooks that are fired at key customer life-cycle events so that TrustedLogin can integrate with Mailchimp and other sorts of marketing automation or reporting tools without modifying the codebase.",source:"@site/docs/SaaS/webhooks.md",sourceDirName:"SaaS",slug:"/SaaS/webhooks",permalink:"/SaaS/webhooks",draft:!1,unlisted:!1,editUrl:"https://github.com/trustedlogin/docs/edit/main/docs/SaaS/webhooks.md",tags:[],version:"current",frontMatter:{},sidebar:"SaaS",previous:{title:"Working with Vault",permalink:"/SaaS/vault"}},c={},l=[{value:"Editing Webhook Settings",id:"editing-webhook-settings",level:2},{value:"Getting Webhook Settings",id:"getting-webhook-settings",level:2},{value:"Technical Details",id:"technical-details",level:2},{value:"Site-Related Webhooks",id:"site-related-webhooks",level:2},{value:"Site Created",id:"site-created",level:3},{value:"Site Deleted",id:"site-deleted",level:3},{value:"Account Created",id:"account-created",level:3},{value:"Account-Related Webhooks",id:"account-related-webhooks",level:2},{value:"Account Cancelled",id:"account-cancelled",level:3},{value:"Account Renewed",id:"account-renewed",level:3},{value:"User-Realted Webhook",id:"user-realted-webhook",level:2},{value:"User Created",id:"user-created",level:2},{value:"User Deleted",id:"user-deleted",level:2}];function d(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"webhooks",children:"Webhooks"}),"\n",(0,s.jsx)(t.p,{children:"There are webhooks that are fired at key customer life-cycle events so that TrustedLogin can integrate with Mailchimp and other sorts of marketing automation or reporting tools without modifying the codebase."}),"\n",(0,s.jsx)(t.h2,{id:"editing-webhook-settings",children:"Editing Webhook Settings"}),"\n",(0,s.jsx)(t.p,{children:'There is a nova page called "Settings". It has settings pages'}),"\n",(0,s.jsx)(t.h2,{id:"getting-webhook-settings",children:"Getting Webhook Settings"}),"\n",(0,s.jsxs)(t.p,{children:["The class ",(0,s.jsx)(t.code,{children:"App\\Contracts\\GetSettingsContract"})," is a wrapper for the settings these webhooks use."]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-php",children:"use App\\Contracts\\GetSettingsContract;\nuse App\\Interactions\\GetSettings;\n$settings = app()->get(GetSettingsContract::class);\n$webhookUrl = $settings->getWebhook( 'webhook_site_created' );\n"})}),"\n",(0,s.jsx)(t.h2,{id:"technical-details",children:"Technical Details"}),"\n",(0,s.jsxs)(t.p,{children:["The webhook server is built with ",(0,s.jsx)(t.a,{href:"https://github.com/spatie/laravel-webhook-server",children:"spatie/laravel-webhook-server"})]}),"\n",(0,s.jsxs)(t.p,{children:["The site events are triggered inside the ",(0,s.jsx)(t.code,{children:"SiteObserver"}),"."]}),"\n",(0,s.jsx)(t.p,{children:"The account webhooks are triggered using listeners attached to Spark events."}),"\n",(0,s.jsx)(t.h2,{id:"site-related-webhooks",children:"Site-Related Webhooks"}),"\n",(0,s.jsx)(t.p,{children:"The payload for these webhooks looks like this:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-json",children:'{\n    "id" : "7",\n    "account" : "901",\n    "url": "https://industry.io"\n}\n'})}),"\n",(0,s.jsx)(t.h3,{id:"site-created",children:"Site Created"}),"\n",(0,s.jsx)(t.p,{children:"This event fires after a new site is created."}),"\n",(0,s.jsx)(t.h3,{id:"site-deleted",children:"Site Deleted"}),"\n",(0,s.jsx)(t.p,{children:"This event fires after a site is deleted."}),"\n",(0,s.jsx)(t.h3,{id:"account-created",children:"Account Created"}),"\n",(0,s.jsx)(t.p,{children:"This event fires after an account is created."}),"\n",(0,s.jsx)(t.h2,{id:"account-related-webhooks",children:"Account-Related Webhooks"}),"\n",(0,s.jsx)(t.p,{children:"The payload for these webhooks looks like this:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-json",children:'{\n    "id" : 7,\n    "name" : "Thunder Bubble",\n    "publicKey" : "1234-7890-12345",\n    "namespace" : "thunder-bubble",\n    "ownerName" : "Trover DuChamps",\n    "ownerEmail" : "trover@industry.io",\n    "trial" : false,\n    "hasCard" : true,\n    "isSubscribed" : true\n}\n'})}),"\n",(0,s.jsx)(t.h3,{id:"account-cancelled",children:"Account Cancelled"}),"\n",(0,s.jsx)(t.p,{children:"This event fires after an account is updated."}),"\n",(0,s.jsx)(t.h3,{id:"account-renewed",children:"Account Renewed"}),"\n",(0,s.jsx)(t.p,{children:"This event fires after an account subscription is renewed."}),"\n",(0,s.jsx)(t.h2,{id:"user-realted-webhook",children:"User-Realted Webhook"}),"\n",(0,s.jsx)(t.p,{children:"The payload for these webhooks looks like this:"}),"\n",(0,s.jsx)(t.h2,{id:"user-created",children:"User Created"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-json",children:'{\n    "id" : 7,\n    "name" : "Duke Corknelius Von Canadia",\n    "email" : "hiroy@electronic-email-service.com"\n}\n'})}),"\n",(0,s.jsx)(t.h2,{id:"user-deleted",children:"User Deleted"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-json",children:'{\n    "id" : 7,\n    "name" : "Duke Corknelius Von Canadia",\n    "email" : "hiroy@electronic-email-service.com"\n}\n'})})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>r});var s=n(6540);const i={},o=s.createContext(i);function a(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),s.createElement(o.Provider,{value:t},e.children)}}}]);