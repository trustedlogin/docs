"use strict";(self.webpackChunktrustedlogin_docs=self.webpackChunktrustedlogin_docs||[]).push([[913],{1814:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>t,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>a});var i=s(4848),r=s(8453);const o={title:"Client SDK Intro",sidebar:"auto",sidebar_position:1},t="TrustedLogin SDK",l={id:"Client/intro",title:"Client SDK Intro",description:"Easily and securely log in to your customers sites when providing support.",source:"@site/docs/Client/01-intro.md",sourceDirName:"Client",slug:"/Client/intro",permalink:"/Client/intro",draft:!1,unlisted:!1,editUrl:"https://github.com/trustedlogin/docs/edit/main/docs/Client/01-intro.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"Client SDK Intro",sidebar:"auto",sidebar_position:1},sidebar:"Client",next:{title:"Client Configuration",permalink:"/Client/configuration"}},d={},a=[{value:"Our priority: Be secure and  don&#39;t crash sites",id:"our-priority-sdks-should-not-crash-sites",level:2},{value:"Including in your plugin or theme",id:"including-in-your-plugin-or-theme",level:2},{value:"When you see <code>ProBlockBuilder</code>, make sure to replace with your own namespace!",id:"when-you-see-problockbuilder-make-sure-to-replace-with-your-own-namespace",level:3},{value:"Install Strauss &amp; update your composer.json file",id:"install-strauss--update-your-composerjson-file",level:3},{value:"To manually include the autoloader",id:"to-manually-include-the-autoloader",level:4},{value:"Vendor directory cleanup",id:"vendor-directory-cleanup",level:4},{value:"No-Conflict mode",id:"no-conflict-mode",level:3},{value:"Testing on local environments",id:"testing-on-local-environments",level:3},{value:"Reference IDs",id:"reference-ids",level:2},{value:"Logging",id:"logging",level:2},{value:"Using your own logging library",id:"using-your-own-logging-library",level:3}];function c(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"trustedlogin-sdk",children:"TrustedLogin SDK"}),"\n",(0,i.jsx)(n.p,{children:"Easily and securely log in to your customers sites when providing support."}),"\n",(0,i.jsxs)(n.h2,{id:"our-priority-sdks-should-not-crash-sites",children:["Our priority: Be secure and  ",(0,i.jsx)(n.a,{href:"https://www.bugsnag.com/blog/sdks-should-not-crash-apps",children:"don't crash sites"})]}),"\n",(0,i.jsx)(n.p,{children:"When you integrate TrustedLogin into your project (theme, plugin, or custom code), you are counting on us not to mess up your customer or clients' sites. We take that extremely seriously."}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"including-in-your-plugin-or-theme",children:"Including in your plugin or theme"}),"\n",(0,i.jsxs)(n.admonition,{type:"info",children:[(0,i.jsxs)(n.h3,{id:"when-you-see-problockbuilder-make-sure-to-replace-with-your-own-namespace",children:["When you see ",(0,i.jsx)(n.code,{children:"ProBlockBuilder"}),", make sure to replace with your own namespace!"]}),(0,i.jsx)(n.p,{children:'In the examples below, we\'re going to pretend your plugin or theme is named "Pro Block Builder" and your business is named Widgets, Co. These should not be the names you use\u2014make sure to update the sample code below to match your business and plugin/theme name!'})]}),"\n",(0,i.jsx)(n.h3,{id:"install-strauss--update-your-composerjson-file",children:"Install Strauss & update your composer.json file"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/BrianHenryIE/strauss#use",children:"Install Strauss"}),". Strauss is used for namespacing the Client to prevent conflicts with other plugins or themes that are using TrustedLogin. We recommend installing via the ",(0,i.jsx)(n.code,{children:"strauss.phar"})," method.","\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"cd"})," into your plugin or theme directory"]}),"\n",(0,i.jsxs)(n.li,{children:["Run ",(0,i.jsx)(n.code,{children:"curl -o strauss.phar -L -C - https://github.com/BrianHenryIE/strauss/releases/latest/download/strauss.phar"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Run ",(0,i.jsx)(n.code,{children:"composer require trustedlogin/client:dev-main"})," to install the TrustedLogin Client SDK"]}),"\n",(0,i.jsxs)(n.li,{children:["Run ",(0,i.jsx)(n.code,{children:"composer require scssphp/scssphp --dev"})," to install ",(0,i.jsx)(n.code,{children:"scssphp"})," as a dev dependency. This is used to generate and namespace the CSS used by TrustedLogin. If you already have ",(0,i.jsx)(n.code,{children:"scssphp"})," installed, or are ",(0,i.jsx)(n.a,{href:"/Client/css-namespacing",children:"using an alternative way to namespace the CSS"}),", skip this step."]}),"\n",(0,i.jsxs)(n.li,{children:["Update your ",(0,i.jsx)(n.code,{children:"composer.json"})," file to integrate with Strauss. Follow the instructions as detailed in the ",(0,i.jsx)(n.a,{href:"https://github.com/BrianHenryIE/strauss#configuration",children:"Strauss documentation"})," for namespacing your plugin and theme. See example below."]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'[...]\n  "require": {\n    "trustedlogin/client": "dev-main"\n  },\n  "require-dev": {\n    "brianhenryie/strauss": "dev-master",\n    "scssphp/scssphp": "^v1.11.0"\n  },\n  "autoload": {\n    "classmap": [\n      "vendor"\n    ]\n  },\n  "extra": {\n    "strauss": {\n      "target_directory": "vendor-namespaced",\n      "namespace_prefix": "ProBlockBuilder\\\\",\n      "classmap_prefix": "ProBlockBuilder_",\n      "classmap_output": true,\n      "packages": [\n        "trustedlogin/client"\n      ]\n    }\n  },\n  "scripts": {\n    "strauss": [\n      "@php strauss.phar"\n    ],\n    "trustedlogin": [\n      "@php vendor/bin/build-sass --namespace=ProBlockBuilder"\n    ],\n    "post-install-cmd": [\n      "@strauss",\n      "@trustedlogin"\n    ],\n    "post-update-cmd": [\n      "@strauss",\n      "@trustedlogin"\n    ]\n  }\n[...]\n'})}),"\n",(0,i.jsxs)(n.ol,{start:"4",children:["\n",(0,i.jsxs)(n.li,{children:["Run ",(0,i.jsx)(n.code,{children:"composer update"})," to update your dependencies. Strauss should generate a ",(0,i.jsx)(n.code,{children:"vendor-namespaced/"})," directory. If it doesn't, you may need to run ",(0,i.jsx)(n.code,{children:"composer install"})," first."]}),"\n",(0,i.jsxs)(n.li,{children:["Follow ",(0,i.jsx)(n.a,{href:"./configuration",children:"these directions to configure and instantiate the client"})]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"to-manually-include-the-autoloader",children:"To manually include the autoloader"}),"\n",(0,i.jsxs)(n.p,{children:["If you chose to set ",(0,i.jsx)(n.code,{children:"classmap_output"})," to ",(0,i.jsx)(n.code,{children:"false"})," in the Strauss configuration, you will need to include the autoloader in your code. If using the sample above, it would be located at ",(0,i.jsx)(n.code,{children:"vendor-namepaced/autoload.php"}),"; the code would be something like:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-php",children:"// For a plugin or theme:\ninclude_once trailingslashit( dirname( __FILE__ ) ) . 'vendor-namespaced/autoload.php';\n"})}),"\n",(0,i.jsx)(n.h4,{id:"vendor-directory-cleanup",children:"Vendor directory cleanup"}),"\n",(0,i.jsxs)(n.p,{children:["If you find the TrustedLogin directories in your ",(0,i.jsx)(n.code,{children:"vendor/"})," directory to be undesirable for some reason, you may use this configuration for the ",(0,i.jsx)(n.code,{children:"trustedlogin"})," script in Composer."]}),"\n",(0,i.jsx)(n.p,{children:"Replace this:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'"trustedlogin": [\n  "@php vendor/bin/build-sass --namespace=ProBlockBuilder"\n ],\n'})}),"\n",(0,i.jsx)(n.p,{children:"With this:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'"trustedlogin": [\n  "@php vendor/bin/build-sass --namespace=ProBlockBuilder",\n   "[ -d \'vendor/trustedlogin\' ] && rm -rf vendor/trustedlogin || true",\n   "[ -d \'vendor/scssphp\' ] && rm -rf vendor/scssphp || true",\n   "[ -d \'vendor/bin\' ] && rm -rf vendor/bin/build-sass && rm -rf vendor/bin/pscss || true"\n ],\n'})}),"\n",(0,i.jsxs)(n.p,{children:["The script modification will now remove the ",(0,i.jsx)(n.code,{children:"trustedlogin"}),", ",(0,i.jsx)(n.code,{children:"scssphp"}),", and TrustedLogin-related files inside ",(0,i.jsx)(n.code,{children:"bin"}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"no-conflict-mode",children:"No-Conflict mode"}),"\n",(0,i.jsx)(n.p,{children:"Some plugins like Gravity Forms and GravityView have a \"no-conflict mode\" to limit script and style conflicts. If you see\nscripts and styles not loading on your Grant Support Access page, that's what's going on."}),"\n",(0,i.jsxs)(n.p,{children:["The WordPress script and style handles registered by TrustedLogin are formatted as ",(0,i.jsx)(n.code,{children:"trustedlogin-{namespace}"}),".\nHere's an example of how GravityView (with a namespace of ",(0,i.jsx)(n.code,{children:"gravityview"}),") allows TrustedLogin scripts:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-php",children:"add_filter( 'gravityview_noconflict_scripts', function ( $allowed_scripts = array() ) {\n\n\t$allowed_scripts[] = 'trustedlogin-gravityview'; // \u26a0\ufe0f GravityView's namespace is `gravityview`\n\n\treturn $allowed_scripts;\n} );\n"})}),"\n",(0,i.jsx)(n.h3,{id:"testing-on-local-environments",children:"Testing on local environments"}),"\n",(0,i.jsx)(n.p,{children:"TrustedLogin won't work in local environments unless using a tunnel such as ngrok. Thus, TrustedLogin will display a warning when attempting to generate a login when in a local environment."}),"\n",(0,i.jsxs)(n.p,{children:["To disable the warning, define ",(0,i.jsx)(n.code,{children:"TRUSTEDLOGIN_DISABLE_LOCAL_NOTICE"})," and set it to true:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-php",children:"define( 'TRUSTEDLOGIN_DISABLE_LOCAL_NOTICE', true );\n"})}),"\n",(0,i.jsx)(n.h2,{id:"reference-ids",children:"Reference IDs"}),"\n",(0,i.jsx)(n.p,{children:"Reference IDs are useful when you want to attach a specific ticket ID or conversation ID to a login."}),"\n",(0,i.jsxs)(n.p,{children:["Reference IDs can be passed via URL like so: ",(0,i.jsx)(n.code,{children:"wp-login.php?action=trustedlogin&ns={namespace}&ref=[123]"})]}),"\n",(0,i.jsx)(n.p,{children:"When a Reference ID exists, users will see the reference while granting access:"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Reference ID is shown below the footer links in the Grant Access screen",src:s(1978).A+"",width:"1164",height:"580"})}),"\n",(0,i.jsx)(n.h2,{id:"logging",children:"Logging"}),"\n",(0,i.jsx)(n.p,{children:"We recommend disabling logging by default, but sometimes logs are necessary."}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["TrustedLogin creates a ",(0,i.jsx)(n.code,{children:"trustedlogin-logs"})," directory inside the ",(0,i.jsx)(n.code,{children:"wp-content/uploads/"})," directory."]}),"\n",(0,i.jsxs)(n.li,{children:["An empty ",(0,i.jsx)(n.code,{children:"index.html"})," file is placed inside the directory to prevent browsing."]}),"\n",(0,i.jsxs)(n.li,{children:["New log files are created daily for each TrustedLogin namespace. The default log ",(0,i.jsx)(n.code,{children:"filename"})," format is ",(0,i.jsx)(n.code,{children:"client-{namespace}-{Y-m-d}-{hash}.log"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"{namespace}"})," is the namespace of your business, plugin, or theme name"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"{date}"})," is ",(0,i.jsx)(n.code,{children:"YYYY-MM-DD"})," format"]}),"\n",(0,i.jsxs)(n.li,{children:["The hash is generated using ",(0,i.jsx)(n.code,{children:"wp_hash()"})," using on the ",(0,i.jsx)(n.code,{children:"vendor/namespace"}),", site ",(0,i.jsx)(n.code,{children:"home_url()"}),", and the day of the year (",(0,i.jsx)(n.code,{children:"date('z')"}),"). The point of the hash is to make log names harder to guess (security by obscurity)."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"using-your-own-logging-library",children:"Using your own logging library"}),"\n",(0,i.jsxs)(n.p,{children:["If you add an action for ",(0,i.jsx)(n.code,{children:"trustedlogin/{namespace}/logging/log"}),", TrustedLogin will let you handle logging. The ",(0,i.jsx)(n.code,{children:"trustedlogin-logs"})," directory and log files will not be created."]})]})}function u(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},1978:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/reference-id-7a62ee844c0726fa1fffc1f8c5bfb268.png"},8453:(e,n,s)=>{s.d(n,{R:()=>t,x:()=>l});var i=s(6540);const r={},o=i.createContext(r);function t(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);