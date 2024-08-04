"use strict";(self.webpackChunktrustedlogin_docs=self.webpackChunktrustedlogin_docs||[]).push([[0],{1477:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>l,metadata:()=>o,toc:()=>a});var n=t(4848),r=t(8453);const l={title:"Template Customization",sidebar:"auto"},i="Customizing the TrustedLogin Template",o={id:"Client/customization",title:"Template Customization",description:"The TrustedLogin template is designed to be easily customized to match your brand. This guide will walk you through the steps to customize the template.",source:"@site/docs/Client/customization.md",sourceDirName:"Client",slug:"/Client/customization",permalink:"/Client/customization",draft:!1,unlisted:!1,editUrl:"https://github.com/trustedlogin/docs/edit/main/docs/Client/customization.md",tags:[],version:"current",frontMatter:{title:"Template Customization",sidebar:"auto"},sidebar:"Client",previous:{title:"CSS Namespacing",permalink:"/Client/css-namespacing"},next:{title:"Developer FAQ",permalink:"/Client/dev-faq"}},c={},a=[{value:"The Grant Support Access Template",id:"the-grant-support-access-template",level:2},{value:"<code>{{header}}</code> placeholder",id:"header-placeholder",level:3},{value:"Screenshots",id:"screenshots",level:4},{value:"<code>{{intro}}</code> placeholder",id:"intro-placeholder",level:3},{value:"Screenshots",id:"screenshots-1",level:4},{value:"<code>{{auth_header}}</code> placeholder",id:"auth_header-placeholder",level:3},{value:"Screenshot",id:"screenshot",level:4},{value:"<code>{{details}}</code> placeholder",id:"details-placeholder",level:3},{value:"Screenshot",id:"screenshot-1",level:4},{value:"<code>{{roles_summary}}</code> placeholder",id:"roles_summary-placeholder",level:4},{value:"If cloning roles is enabled",id:"if-cloning-roles-is-enabled",level:5},{value:"Screenshot",id:"screenshot-2",level:4},{value:"<code>{{notices}}</code> placeholder",id:"notices-placeholder",level:3},{value:"Screenshot",id:"screenshot-3",level:4},{value:"Settings available",id:"settings-available",level:4},{value:"Constants available",id:"constants-available",level:4},{value:"<code>{{button}}</code> placeholder",id:"button-placeholder",level:3},{value:"Screenshot",id:"screenshot-4",level:4},{value:"<code>{{reference}}</code> placeholder",id:"reference-placeholder",level:3},{value:"Screenshots",id:"screenshots-2",level:4},{value:"Filters available",id:"filters-available",level:4},{value:"<code>{{terms_of_service}}</code> placeholder",id:"terms_of_service-placeholder",level:3},{value:"HTML output",id:"html-output",level:4},{value:"Screenshots",id:"screenshots-3",level:4},{value:"Available filters",id:"available-filters",level:4},{value:"<code>{{secured_by_trustedlogin}}</code> placeholder",id:"secured_by_trustedlogin-placeholder",level:3},{value:"HTML output",id:"html-output-1",level:4},{value:"Screenshots",id:"screenshots-4",level:4},{value:"<code>{{admin_debug}}</code> placeholder",id:"admin_debug-placeholder",level:3},{value:"Screenshots",id:"screenshots-5",level:4},{value:"Examples of Customization",id:"examples-of-customization",level:2},{value:"Removing the Header",id:"removing-the-header",level:3}];function d(e){const s={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"customizing-the-trustedlogin-template",children:"Customizing the TrustedLogin Template"}),"\n",(0,n.jsx)(s.p,{children:"The TrustedLogin template is designed to be easily customized to match your brand. This guide will walk you through the steps to customize the template."}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"hooks#trustedloginnamespacetemplateauth",children:"Reference the hooks"})," doc for more information on how to customize the template using hooks."]}),"\n",(0,n.jsx)(s.admonition,{type:"tip",children:(0,n.jsx)(s.p,{children:"By removing placeholders you don't need, or replacing the placeholders with your preferred HTML, you can customize all output generated by the TrustedLogin Client."})}),"\n",(0,n.jsx)(s.h2,{id:"the-grant-support-access-template",children:"The Grant Support Access Template"}),"\n",(0,n.jsxs)(s.p,{children:["You can modify the Grant Support Access auth form by using the ",(0,n.jsxs)(s.a,{href:"hooks#trustedloginnamespacetemplateauth",children:[(0,n.jsx)(s.code,{children:"trustedlogin/{namespace}/template/auth"})," filter"]}),"."]}),"\n",(0,n.jsx)(s.p,{children:"This is the default HTML structure of the Grant Support Access form:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-html",children:'<div class="tl-{{ns}}-auth tl-{{ns}}-{{has_access_class}}">\n    {{header}}\n    <section class="tl-{{ns}}-auth__body">\n        <h2 class="tl-{{ns}}-auth__intro">\n            {{intro}}\n        </h2>\n        <div class="tl-{{ns}}-auth__content">\n            <header class="tl-{{ns}}-auth__header">\n                {{auth_header}}\n            </header>\n            <div class="tl-{{ns}}-auth__details">\n                {{details}}\n            </div>\n            <div class="tl-{{ns}}-auth__response" aria-live="assertive"></div>\n            {{notices}}\n            <div class="tl-{{ns}}-auth__actions">\n                {{button}}\n            </div>\n            {{terms_of_service}}\n        </div>\n        <div class="tl-{{ns}}-auth__secured_by">{{secured_by_trustedlogin}}</div>\n    </section>\n    <footer class="tl-{{ns}}-auth__footer">\n        {{footer}}\n        {{reference}}\n    </footer>\n    {{admin_debug}}\n</div>\n'})}),"\n",(0,n.jsxs)(s.h3,{id:"header-placeholder",children:[(0,n.jsx)(s.code,{children:"{{header}}"})," placeholder"]}),"\n",(0,n.jsx)(s.p,{children:"The header of the auth form outputs the logo of the vendor."}),"\n",(0,n.jsxs)(s.p,{children:["It is only displayed on the Grant Auth screen, not on the ",(0,n.jsx)(s.code,{children:"wp-login.php"})," screen."]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-html",children:'<header class="tl-{{ns}}-auth__header__top">\n    <div class="tl-{{ns}}-auth__logo">\n        <a href="{{vendor/website}}" title="Visit the {{vendor/title}} website (opens in a new tab)" target="_blank" rel="noreferrer noopener"><img src="{{vendor/logo_url}}" alt="{{vendor/title}}" /></a>\n    </div>\n</header>\n'})}),"\n",(0,n.jsx)(s.h4,{id:"screenshots",children:"Screenshots"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.img,{alt:"A screenshot of the Grant Support Access form with the header highlighted.",src:t(711).A+"",width:"3096",height:"1558"})}),"\n",(0,n.jsxs)(s.h3,{id:"intro-placeholder",children:[(0,n.jsx)(s.code,{children:"{{intro}}"})," placeholder"]}),"\n",(0,n.jsxs)(s.p,{children:["The ",(0,n.jsx)(s.code,{children:"{{intro}}"})," placeholder is the introductory text displayed at the top of the Grant Support Access form."]}),"\n",(0,n.jsxs)(s.p,{children:["Based on the context, the ",(0,n.jsx)(s.code,{children:"{{intro}}"})," placeholder will be replaced with one of the following:"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Access has been granted:"}),(0,n.jsx)("br",{}),"\n",(0,n.jsx)(s.code,{children:'<a href="{{vendor/website}}">Vendor Display Name</a> has site access that expires in [expiration time].'})]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"On the login screen:"}),(0,n.jsx)("br",{}),"\n",(0,n.jsx)(s.code,{children:'<a href="{{vendor/website}}">Vendor Display Name</a> would like support access to this site.'})]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"On the Grant Support Access screen:"}),(0,n.jsx)("br",{}),"\n",(0,n.jsx)(s.code,{children:'Grant <a href="{{vendor/website}}">Vendor Display Name</a> access to this site.'})]}),"\n"]}),"\n",(0,n.jsx)(s.h4,{id:"screenshots-1",children:"Screenshots"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.img,{alt:"A screenshot of the Grant Support Access form with the intro highlighted.",src:t(8628).A+"",width:"2944",height:"1184"})}),"\n",(0,n.jsxs)(s.h3,{id:"auth_header-placeholder",children:[(0,n.jsx)(s.code,{children:"{{auth_header}}"})," placeholder"]}),"\n",(0,n.jsx)(s.p,{children:"If there are no active Support Users, this placeholder will not be rendered."}),"\n",(0,n.jsx)(s.p,{children:"If there are, the auth header shows the display name of the Support User, information about who granted access, and the Revoke Access button."}),"\n",(0,n.jsx)(s.h4,{id:"screenshot",children:"Screenshot"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.img,{alt:"A screenshot of the Grant Support Access form with the placeholder parts highlighted.",src:t(5810).A+"",width:"3032",height:"1592"})}),"\n",(0,n.jsxs)(s.h3,{id:"details-placeholder",children:[(0,n.jsx)(s.code,{children:"{{details}}"})," placeholder"]}),"\n",(0,n.jsxs)(s.p,{children:["The ",(0,n.jsx)(s.code,{children:"{{details}}"})," placeholder contains the bulk of the content of the Grant Support Access form."]}),"\n",(0,n.jsx)(s.h4,{id:"screenshot-1",children:"Screenshot"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.img,{alt:"A screenshot of the Grant Support Access form with the placeholder parts highlighted.",src:t(920).A+"",width:"3024",height:"3104"})}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-html",children:'<p><span class="dashicons dashicons-info-outline dashicons--small"></span> This will allow <strong>{{name}}</strong> to:</p>\n<div class="tl-{{ns}}-auth__roles">\n    <h2>\n        <span class="dashicons dashicons-admin-users dashicons--large"></span>{{roles_summary}}\n    </h2>\n    {{caps}}\n</div>\n<div class="tl-{{ns}}-auth__expire">\n    <h2>\n        <span class="dashicons dashicons-clock dashicons--large"></span>{{expire_summary}}{{expire_desc}}\n    </h2>\n</div>\n'})}),"\n",(0,n.jsxs)(s.h4,{id:"roles_summary-placeholder",children:[(0,n.jsx)(s.code,{children:"{{roles_summary}}"})," placeholder"]}),"\n",(0,n.jsxs)(s.p,{children:["If cloning roles is disabled (using the ",(0,n.jsx)(s.code,{children:"clone_role"})," configuration setting), the ",(0,n.jsx)(s.code,{children:"{{roles_summary}}"})," placeholder is replaced by ",(0,n.jsx)(s.code,{children:"Create a user with a role of <strong>{{role}}</strong>."}),"."]}),"\n",(0,n.jsx)(s.h5,{id:"if-cloning-roles-is-enabled",children:"If cloning roles is enabled"}),"\n",(0,n.jsxs)(s.p,{children:["When cloning roles is enabled, ",(0,n.jsx)(s.code,{children:"{{roles_summary}}"})," is replaced by ",(0,n.jsx)(s.code,{children:"Create a user with a role based on <strong>{{cloned_role}}</strong>."}),". Further, if custom capabilities are defined (using the ",(0,n.jsx)(s.code,{children:"caps/remove"})," or ",(0,n.jsx)(s.code,{children:"caps/add"})," configuration settings) are set, the ",(0,n.jsx)(s.code,{children:"{{caps}}"})," placeholder will be rendered."]}),"\n",(0,n.jsx)(s.h4,{id:"screenshot-2",children:"Screenshot"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.img,{alt:"The capabilities display, showing additional capabilities that have been added or removed from the cloned role.",src:t(3231).A+"",width:"2928",height:"2040"})}),"\n",(0,n.jsxs)(s.h3,{id:"notices-placeholder",children:[(0,n.jsx)(s.code,{children:"{{notices}}"})," placeholder"]}),"\n",(0,n.jsxs)(s.p,{children:["The ",(0,n.jsx)(s.code,{children:"{{notices}}"})," placeholder is displayed when TrustedLogin is running on a local website that will not be accessible to support."]}),"\n",(0,n.jsxs)(s.p,{children:["It is disabled when ",(0,n.jsx)(s.code,{children:"wp_get_environment_type()"}),' is "staging" or "production", so it will not be displayed on a live site.']}),"\n",(0,n.jsx)(s.h4,{id:"screenshot-3",children:"Screenshot"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.img,{alt:"A screenshot of the Grant Support Access form with the notice circled with a green border.",src:t(3333).A+"",width:"3032",height:"1844"})}),"\n",(0,n.jsx)(s.h4,{id:"settings-available",children:"Settings available"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"vendor/about_live_access_url"})," - The URL to the vendor's documentation about live access. Defaults to ",(0,n.jsx)(s.code,{children:"https://www.trustedlogin.com/about/live-access/"}),"."]}),"\n"]}),"\n",(0,n.jsx)(s.h4,{id:"constants-available",children:"Constants available"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"TRUSTEDLOGIN_DISABLE_LOCAL_NOTICE"})," - Set to ",(0,n.jsx)(s.code,{children:"true"})," to disable the local notice."]}),"\n",(0,n.jsxs)(s.h3,{id:"button-placeholder",children:[(0,n.jsx)(s.code,{children:"{{button}}"})," placeholder"]}),"\n",(0,n.jsxs)(s.p,{children:["The button to grant or extend access to the support user. Generated by the ",(0,n.jsx)(s.code,{children:"TrustedLogin\\Form::generate_button()"})," placeholder."]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["If access ",(0,n.jsx)(s.strong,{children:"has"}),' been granted to the website, the button text will be "Extend [Vendor Display Name] Support Access".']}),"\n",(0,n.jsxs)(s.li,{children:["If access ",(0,n.jsx)(s.strong,{children:"has not"}),' been granted, the button text will be "Grant [Vendor Display Name] Support Access".']}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:"Here is sample HTML output for the button:"}),"\n",(0,n.jsx)(s.h4,{id:"screenshot-4",children:"Screenshot"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-html",children:'<a href="{{vendor/support_url}}" class="button button-hero authlink button-primary tl-client-grant-button button-trustedlogin-{{ns}}" data-access="grant">Grant [Vendor Display Name] Support Access</a>\n'})}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.img,{alt:"A screenshot of the Grant Support Access form with the button circled with a green border.",src:t(8900).A+"",width:"2944",height:"1388"})}),"\n",(0,n.jsxs)(s.h3,{id:"reference-placeholder",children:[(0,n.jsx)(s.code,{children:"{{reference}}"})," placeholder"]}),"\n",(0,n.jsxs)(s.p,{children:["If reference IDs are being displayed (controlled by the ",(0,n.jsx)(s.a,{href:"#trustedloginnamespacetemplateauthdisplay_reference",children:(0,n.jsx)(s.code,{children:"trustedlogin/{namespace}/template/auth/display_reference"})})," filter, render the reference ouput."]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-html",children:'<div class="tl-{{ns}}-auth__ref"><p><span class="tl-{{ns}}-auth_ref__id">{{reference_text}}</span></p></div>\n'})}),"\n",(0,n.jsx)(s.h4,{id:"screenshots-2",children:"Screenshots"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.img,{alt:"A screenshot of the Grant Support Access form with the reference ID section circled with a green border.",src:t(233).A+"",width:"2924",height:"1160"})}),"\n",(0,n.jsx)(s.h4,{id:"filters-available",children:"Filters available"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"hooks#trustedloginnamespacetemplateauthdisplay_reference",children:(0,n.jsx)(s.code,{children:"trustedlogin/{namespace}/template/auth/display_reference"})})," filter to control whether the reference ID is displayed."]}),"\n"]}),"\n",(0,n.jsxs)(s.h3,{id:"terms_of_service-placeholder",children:[(0,n.jsx)(s.code,{children:"{{terms_of_service}}"})," placeholder"]}),"\n",(0,n.jsxs)(s.p,{children:["If the ",(0,n.jsxs)(s.a,{href:"configuration#all-options",children:[(0,n.jsx)(s.code,{children:"terms_of_service/url"})," setting"]})," is not defined, the terms of service output will not be rendered."]}),"\n",(0,n.jsx)(s.p,{children:'If there is a URL defined for Terms of Service, a link to terms of service will be rendered. The anchor text defaults to "Terms of Service".'}),"\n",(0,n.jsx)(s.h4,{id:"html-output",children:"HTML output"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-html",children:'<div class="tl-{{ns}}-auth__tos">\n    <p>\n        <a href="{{terms_of_service/url}}" target="_blank" rel="noopener noreferrer">Terms of Service</a>\n    </p>\n</div>\n'})}),"\n",(0,n.jsx)(s.h4,{id:"screenshots-3",children:"Screenshots"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.img,{alt:"A screenshot of the Grant Support Access form with the Terms of Service link circled with a green border.",src:t(888).A+"",width:"2924",height:"1024"})}),"\n",(0,n.jsx)(s.h4,{id:"available-filters",children:"Available filters"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"hooks#trustedloginnamespacetemplateauthterms_of_serviceanchor",children:(0,n.jsx)(s.code,{children:"trustedlogin/{namespace}/template/auth/terms_of_service/anchor"})}),' filter to modify the "Terms of Service" anchor text.']}),"\n"]}),"\n",(0,n.jsxs)(s.h3,{id:"secured_by_trustedlogin-placeholder",children:[(0,n.jsx)(s.code,{children:"{{secured_by_trustedlogin}}"})," placeholder"]}),"\n",(0,n.jsx)(s.p,{children:'The "Secured by TrustedLogin" text.'}),"\n",(0,n.jsx)(s.h4,{id:"html-output-1",children:"HTML output"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-html",children:'<p class="tl-{{ns}}-auth__secured_by">{{secured_by_trustedlogin}}</p>\n'})}),"\n",(0,n.jsx)(s.h4,{id:"screenshots-4",children:"Screenshots"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.img,{alt:"A screenshot of the Grant Support Access form with the &quot;Secured by TrustedLogin&quot; text circled with a green border.",src:t(8877).A+"",width:"2956",height:"1012"})}),"\n",(0,n.jsxs)(s.h3,{id:"admin_debug-placeholder",children:[(0,n.jsx)(s.code,{children:"{{admin_debug}}"})," placeholder"]}),"\n",(0,n.jsxs)(s.p,{children:["The admin debug output. Only displayed if the user has ",(0,n.jsx)(s.code,{children:"manage_options"})," capability and ",(0,n.jsx)(s.code,{children:"$_GET['debug']"})," is set."]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["TrustedLogin Status: ",(0,n.jsx)(s.code,{children:"Online"})," or ",(0,n.jsx)(s.code,{children:"Offline"})]}),"\n",(0,n.jsx)(s.li,{children:"API Key: The API key used to authenticate with the TrustedLogin API"}),"\n",(0,n.jsx)(s.li,{children:"License Key: If a license key is set, it will be displayed here"}),"\n",(0,n.jsx)(s.li,{children:"Log URL: A link to download the log file"}),"\n",(0,n.jsx)(s.li,{children:"Log Level: The log level set in the TrustedLogin settings"}),"\n",(0,n.jsxs)(s.li,{children:["Webhook URL: The URL to the webhook endpoint, if set. ",(0,n.jsx)(s.code,{children:"Empty"})," if not set."]}),"\n",(0,n.jsx)(s.li,{children:"Vendor Public Key: The public encryption key of the vendor, with a link to verify the key"}),"\n"]}),"\n",(0,n.jsx)(s.h4,{id:"screenshots-5",children:"Screenshots"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.img,{alt:"A screenshot of the Grant Support Access form with the admin debug section circled with a green border.",src:t(5409).A+"",width:"3452",height:"2596"})}),"\n",(0,n.jsx)(s.h2,{id:"examples-of-customization",children:"Examples of Customization"}),"\n",(0,n.jsx)(s.h3,{id:"removing-the-header",children:"Removing the Header"}),"\n",(0,n.jsxs)(s.p,{children:["To customize the Grant Support Access form, you can use the ",(0,n.jsx)(s.code,{children:"trustedlogin/{namespace}/template/auth"})," filter."]}),"\n",(0,n.jsx)(s.p,{children:"Here is an example of how to customize the Grant Support Access form:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-php",children:"// Replace `{namespace}` with the namespace of your configuration.\nadd_filter( 'trustedlogin/{namespace}/template/auth', 'RENAME_THIS_FUNCTION_remove_header', 10 );\n\n/**\n * Remove the header, including the logo, from the Grant Support Access form.\n *\n * This is an example function name! Replace `RENAME_THIS_FUNCTION_remove_header` with a unique function name.\n * \n * @param string $auth_screen_template The HTML template of the Grant Support Access form.\n * @return string\n */\nfunction RENAME_THIS_FUNCTION_remove_header( $auth_screen_template ) {\n    return str_replace( '{{header}}', '', $auth_screen_template );\n}\n"})})]})}function h(e={}){const{wrapper:s}={...(0,r.R)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},5409:(e,s,t)=>{t.d(s,{A:()=>n});const n=t.p+"assets/images/admin-debug-20b8322ecd101ade4986959344bde264.png"},5810:(e,s,t)=>{t.d(s,{A:()=>n});const n=t.p+"assets/images/auth-header-f9108f871e9cc1d222e20c3e49562da0.png"},8900:(e,s,t)=>{t.d(s,{A:()=>n});const n=t.p+"assets/images/button-dcfa07ac81cb57349e74d374219f6ed3.png"},3231:(e,s,t)=>{t.d(s,{A:()=>n});const n=t.p+"assets/images/caps-f63e3ffb75e0f9f55d037475786e313f.png"},920:(e,s,t)=>{t.d(s,{A:()=>n});const n=t.p+"assets/images/details-c7d32504a4c75040971035c803c5f544.png"},711:(e,s,t)=>{t.d(s,{A:()=>n});const n=t.p+"assets/images/header-2e815729ce513a91277c6a706e83ea2b.png"},8628:(e,s,t)=>{t.d(s,{A:()=>n});const n=t.p+"assets/images/intro-429bfb58d642953fd687ffe035547f33.png"},3333:(e,s,t)=>{t.d(s,{A:()=>n});const n=t.p+"assets/images/notices-b7dacaffcaca2dac7cb1bdad2423f986.png"},233:(e,s,t)=>{t.d(s,{A:()=>n});const n=t.p+"assets/images/reference-01cdd50c74786de12caa9471b1369819.png"},8877:(e,s,t)=>{t.d(s,{A:()=>n});const n=t.p+"assets/images/secured-by-0906743abe49aa31f515351acda4dacf.png"},888:(e,s,t)=>{t.d(s,{A:()=>n});const n=t.p+"assets/images/tos-61e24e35f8430cf2aa6a6a85b7076da3.png"},8453:(e,s,t)=>{t.d(s,{R:()=>i,x:()=>o});var n=t(6540);const r={},l=n.createContext(r);function i(e){const s=n.useContext(l);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),n.createElement(l.Provider,{value:s},e.children)}}}]);