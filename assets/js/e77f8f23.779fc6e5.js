"use strict";(self.webpackChunktrustedlogin_docs=self.webpackChunktrustedlogin_docs||[]).push([[181],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>k});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),p=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=p(e.components);return a.createElement(o.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},g=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,s=d(e,["components","mdxType","originalType","parentName"]),m=p(n),g=r,k=m["".concat(o,".").concat(g)]||m[g]||u[g]||l;return n?a.createElement(k,i(i({ref:t},s),{},{components:n})):a.createElement(k,i({ref:t},s))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=g;var d={};for(var o in t)hasOwnProperty.call(t,o)&&(d[o]=t[o]);d.originalType=e,d[m]="string"==typeof e?e:r,i[1]=d;for(var p=2;p<l;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}g.displayName="MDXCreateElement"},5478:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>d,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const l={},i="Client Configuration",d={unversionedId:"Client/configuration",id:"Client/configuration",title:"Client Configuration",description:"Minimal configuration",source:"@site/docs/Client/configuration.md",sourceDirName:"Client",slug:"/Client/configuration",permalink:"/Client/configuration",draft:!1,editUrl:"https://github.com/trustedlogin/docs/edit/main/docs/Client/configuration.md",tags:[],version:"current",frontMatter:{},sidebar:"Client",previous:{title:"Client SDK Intro",permalink:"/Client/intro"},next:{title:"CSS Namespacing",permalink:"/Client/css-namespacing"}},o={},p=[{value:"Minimal configuration",id:"minimal-configuration",level:2},{value:"Logging",id:"logging",level:2},{value:"Default settings:",id:"default-settings",level:3},{value:"logging/enabled",id:"loggingenabled",level:3},{value:"<code>logging/directory</code>",id:"loggingdirectory",level:3},{value:"<code>logging/threshold</code>",id:"loggingthreshold",level:3},{value:"<code>logging/options</code>",id:"loggingoptions",level:3},{value:"Log file names",id:"log-file-names",level:3},{value:"Display Name vs Title",id:"display-name-vs-title",level:2},{value:"Task-specific email addresses",id:"task-specific-email-addresses",level:2},{value:"Invalid capabilities",id:"invalid-capabilities",level:2},{value:"Webhooks",id:"webhooks",level:2}],s={toc:p},m="wrapper";function u(e){let{components:t,...n}=e;return(0,r.kt)(m,(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"client-configuration"},"Client Configuration"),(0,r.kt)("h2",{id:"minimal-configuration"},"Minimal configuration"),(0,r.kt)("p",null,"When instantiating the TrustedLogin ",(0,r.kt)("inlineCode",{parentName:"p"},"Client")," class, you need to pass a valid ",(0,r.kt)("inlineCode",{parentName:"p"},"Config")," object."),(0,r.kt)("p",null,"The following is a minimal configuration. It has all the ",(0,r.kt)("em",{parentName:"p"},"required")," settings, but not all ",(0,r.kt)("strong",{parentName:"p"},"recommended")," settings!"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"\n// Include the Composer autoloader.\ninclude_once trailingslashit( dirname( __FILE__ ) ) . 'vendor/autoload.php';\n\n$config = [\n    'auth' => [\n        'api_key' => '1234567890',\n    ],\n    'vendor' => [\n        'namespace' => 'pro-block-builder',\n        'title' => 'Pro Block Builder',\n        'email' => 'support@example.com',\n        'website' => 'https://example.com',\n        'support_url' => 'https://help.example.com',\n    ],\n    'role' => 'editor',\n];\n\ntry {\n\n    // Check class_exists() for sites running PHP 5.2.x\n    if ( class_exists( '\\ProBlockBuilder\\TrustedLogin\\Client') ) {\n        new \\ProBlockBuilder\\TrustedLogin\\Client( \n            new \\ProBlockBuilder\\TrustedLogin\\Config( $config )\n        );\n    }\n\n} catch ( \\Exception $exception ) {\n    error_log( $exception->getMessage() );\n}\n")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Key"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"),(0,r.kt)("th",{parentName:"tr",align:null},"Default"),(0,r.kt)("th",{parentName:"tr",align:"center"},"Required?"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"auth/api_key")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},'The TrustedLogin key for the vendor, found in "API Keys" on ',(0,r.kt)("a",{parentName:"td",href:"https://app.trustedlogin.com"},"https://app.trustedlogin.com"),"."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"null")),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2705")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"auth/license_key")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"null")),(0,r.kt)("td",{parentName:"tr",align:null},"If enabled, the license key for the current client. This is used as a lookup value when integrating with help desk support widgets. If not defined, a cryptographic hash will be generated to use as the Access Key."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"null")),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"role")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"The role to clone when creating a new Support User."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"editor")),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2705")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"clone_role")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"bool")),(0,r.kt)("td",{parentName:"tr",align:null},"If true, create a new role with the same capabilites as the ",(0,r.kt)("inlineCode",{parentName:"td"},"role")," setting. If false, use the defined ",(0,r.kt)("inlineCode",{parentName:"td"},"role")," setting."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"true")),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"vendor/namespace")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Slug for vendor. Must be unique. Must be shorter than 96 characters. Must not be a reserved namespace: ",(0,r.kt)("inlineCode",{parentName:"td"},"trustedlogin"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"client"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"vendor"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"admin"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"wordpress")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"null")),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2705")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"vendor/title")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Name of the vendor company. Used in text such as ",(0,r.kt)("inlineCode",{parentName:"td"},"Visit the %s website")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"null")),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2705")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"vendor/email")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Email address for support. Used when creating usernames. Recommended: use ",(0,r.kt)("inlineCode",{parentName:"td"},"{hash}")," dynamic replacement (",(0,r.kt)("a",{parentName:"td",href:"#email-hash"},"see below"),")."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"null")),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2705")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"vendor/website")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"URL to the vendor website. Must be a valid URL."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"null")),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2705")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"vendor/support_url")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"URL to the vendor support page. Shown to users in the Grant Access form and also serves as a backup to redirect users if the TrustedLogin server is unreachable. Must be a valid URL."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"null")),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2705")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"vendor/display_name")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},'Optional. Display name for the support team. See "Display Name vs Title" below.'),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"null")),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"vendor/logo_url")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Optional. URL to the vendor logo. Displayed in the Grant Access form. May be inline SVG. Must be local to comply with WordPress.org."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"null")),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"caps/add")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"array")),(0,r.kt)("td",{parentName:"tr",align:null},"An array of additional capabilities to be granted to the Support User after their user role is cloned based on the ",(0,r.kt)("inlineCode",{parentName:"td"},"role")," setting.",(0,r.kt)("br",null),(0,r.kt)("br",null),"The key is the capability slug and the value is the reason why it is needed. Example: ",(0,r.kt)("inlineCode",{parentName:"td"},"[ 'gf_full_access' => 'Support will need to see and edit the forms, entries, and Gravity Forms settings on your site.' ]")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"[]")),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"caps/remove")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"array")),(0,r.kt)("td",{parentName:"tr",align:null},"An array of capabilities you want to ",(0,r.kt)("em",{parentName:"td"},"remove")," from Support User. If you want to remove access to WooCommerce, for example, you could remove the ",(0,r.kt)("inlineCode",{parentName:"td"},"manage_woocommerce")," cap by using this setting: ",(0,r.kt)("inlineCode",{parentName:"td"},"[ 'manage_woocommerce' => 'We don\\'t need to manage your shop!' ]"),"."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"[]")),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"decay")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"int")),(0,r.kt)("td",{parentName:"tr",align:null},"If defined, how long should support be granted access to the site? Defaults to a week in seconds (",(0,r.kt)("inlineCode",{parentName:"td"},"604800"),"). Minimum: 1 day (",(0,r.kt)("inlineCode",{parentName:"td"},"86400"),"). Maximum: 30 days (",(0,r.kt)("inlineCode",{parentName:"td"},"2592000"),"). If ",(0,r.kt)("inlineCode",{parentName:"td"},"decay")," is not defined, support access will not expire."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"604800")),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"menu/slug")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string"),",",(0,r.kt)("inlineCode",{parentName:"td"},"null"),",",(0,r.kt)("inlineCode",{parentName:"td"},"false")),(0,r.kt)("td",{parentName:"tr",align:null},"TrustedLogin adds a submenu item to the sidebar in the Dashboard. The ",(0,r.kt)("inlineCode",{parentName:"td"},"menu/slug")," setting is the slug name for the parent menu (or the file name of a standard WordPress admin page). If ",(0,r.kt)("inlineCode",{parentName:"td"},"null"),", the a top-level menu will be added. If ",(0,r.kt)("inlineCode",{parentName:"td"},"false"),", a menu item will not be added. If a string, it will be used as the ",(0,r.kt)("inlineCode",{parentName:"td"},"$parent_slug")," argument passed to the ",(0,r.kt)("a",{parentName:"td",href:"https://developer.wordpress.org/reference/functions/add_submenu_page/"},(0,r.kt)("inlineCode",{parentName:"a"},"add_submenu_page()")," function"),"."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"null")),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"menu/title")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"The title of the submenu in the sidebar menu."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"Grant Support Access")),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"menu/icon_url")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"The URL to the icon to be used for this menu. The value is passed as ",(0,r.kt)("inlineCode",{parentName:"td"},"$icon_url")," to the ",(0,r.kt)("a",{parentName:"td",href:"https://developer.wordpress.org/reference/functions/add_menu_page/"},(0,r.kt)("inlineCode",{parentName:"a"},"add_menu_page()")," function"),"."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"''")," (empty string)"),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"menu/priority")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"int")),(0,r.kt)("td",{parentName:"tr",align:null},"The priority of the ",(0,r.kt)("inlineCode",{parentName:"td"},"admin_menu")," action used by TrustedLogin."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"100")),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"menu/position")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"int")),(0,r.kt)("td",{parentName:"tr",align:null},"The ",(0,r.kt)("inlineCode",{parentName:"td"},"$position")," argument passed to the ",(0,r.kt)("a",{parentName:"td",href:"https://developer.wordpress.org/reference/functions/add_submenu_page/"},(0,r.kt)("inlineCode",{parentName:"a"},"add_submenu_page()")," function")," function."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"null")),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"logging/enabled")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"bool")),(0,r.kt)("td",{parentName:"tr",align:null},"If enabled, logs are stored in ",(0,r.kt)("inlineCode",{parentName:"td"},"wp-uploads/trustedlogin-logs")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"false")),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"logging/directory")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"null"),",",(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Override the directory where logs are stored. See ",(0,r.kt)("a",{parentName:"td",href:"logging/"},"Logging")," for more information."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"null")),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"logging/threshold")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Define what ",(0,r.kt)("a",{parentName:"td",href:"https://www.php-fig.org/psr/psr-3/#5-psrlogloglevel"},"PSR log level")," should be logged. To log everything, set the threshold to ",(0,r.kt)("inlineCode",{parentName:"td"},"debug"),"."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"notice")),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"logging/options")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"array")),(0,r.kt)("td",{parentName:"tr",align:null},"Array of ",(0,r.kt)("a",{parentName:"td",href:"https://github.com/katzgrau/klogger#additional-options"},"KLogger Additional Options")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"['extension' => 'log', 'dateFormat' => 'Y-m-d G:i:s.u', 'filename' => null, 'flushFrequency' => false, 'logFormat' => false, 'appendContext' => true ]")),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"paths/css")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Where to load CSS assets from. By default, the bundled TrustedLogin CSS file will be used. Must be local to comply with WordPress.org."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"{plugin_dir_url() to Config.php}/assets/trustedlogin.css")),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"paths/js")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Where to load JS assets from. By default, the bundled TrustedLogin JS file will be used. Must be local to comply with WordPress.org."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"{plugin_dir_url() to Config.php}/assets/trustedlogin.js")),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"reassign_posts")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"bool")),(0,r.kt)("td",{parentName:"tr",align:null},"When the Support User is revoked, should posts & pages be re-assigned to a site administrator? If ",(0,r.kt)("inlineCode",{parentName:"td"},"false"),", posts and pages created by the user will be deleted. Passed as the second argument to ",(0,r.kt)("a",{parentName:"td",href:"https://developer.wordpress.org/reference/functions/wp_delete_user/"},"the ",(0,r.kt)("inlineCode",{parentName:"a"},"wp_delete_user()")," function"),". ",(0,r.kt)("br",null),(0,r.kt)("br",null),"When ",(0,r.kt)("inlineCode",{parentName:"td"},"reassign_posts")," setting is enabled, TrustedLogin will attempt to assign posts created by the user to the best-guess administrator: the user with the longest-active ",(0,r.kt)("inlineCode",{parentName:"td"},"administrator")," role."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"true")),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"require_ssl")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"bool")),(0,r.kt)("td",{parentName:"tr",align:null},"Whether to use TrustedLogin when the site isn't served over HTTPS. TrustedLogin will still work, but the requests may not be secure. If ",(0,r.kt)("inlineCode",{parentName:"td"},"false"),', the TrustedLogin "Grant Access" button will take users to the ',(0,r.kt)("inlineCode",{parentName:"td"},"vendor/support_url")," URL directly."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"true")),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"terms_of_service/url")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"null"),",",(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},'The URL to the vendor\'s Terms of Service. If defined, a message "By granting access, you agree to the Terms of Service." will be added below the Grant Access button. Added in 1.6.0.'),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"null")),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"webhook/url")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"If defined, TrustedLogin will send a ",(0,r.kt)("inlineCode",{parentName:"td"},"POST")," request to the defined URL. Must be a valid URL if defined. See the Webhooks section below."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"null")),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"webhook/debug_data")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"bool")),(0,r.kt)("td",{parentName:"tr",align:null},"Whether to show the user an opt-in consent checkbox to send debugging data (the Site Health report) to the Webhook. Only relevant if ",(0,r.kt)("inlineCode",{parentName:"td"},"webhook/url")," is defined and a valid URL."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"false")),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"webhook/create_ticket")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"bool")),(0,r.kt)("td",{parentName:"tr",align:null},"Whether to show the user a form to send a message to support via the Webhook. Only relevant if ",(0,r.kt)("inlineCode",{parentName:"td"},"webhook/url")," is defined and a valid URL."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"false")),(0,r.kt)("td",{parentName:"tr",align:"center"})))),(0,r.kt)("h2",{id:"logging"},"Logging"),(0,r.kt)("h3",{id:"default-settings"},"Default settings:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"'logging' => array(\n    'enabled' => false,\n    'directory' => null,\n    'threshold' => 'debug',\n    'options' => array(),\n),\n")),(0,r.kt)("h3",{id:"loggingenabled"},"logging/enabled"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Optional.")," Default: ",(0,r.kt)("inlineCode",{parentName:"p"},"false")),(0,r.kt)("p",null,"Whether to enable logging TrustedLogin activity to a file. Helpful for debugging."),(0,r.kt)("p",null,"To enable logging in TrustedLogin, the minimum configuration necessary is:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"'logging' => array(\n    'enabled' => true,\n),\n")),(0,r.kt)("h3",{id:"loggingdirectory"},(0,r.kt)("inlineCode",{parentName:"h3"},"logging/directory")),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Optional.")," Default: ",(0,r.kt)("inlineCode",{parentName:"p"},"null")),(0,r.kt)("p",null,"If ",(0,r.kt)("inlineCode",{parentName:"p"},"null"),", TrustedLogin will generate its own directory inside the ",(0,r.kt)("inlineCode",{parentName:"p"},"wp-uploads/")," directory. The path for logs is\n",(0,r.kt)("inlineCode",{parentName:"p"},"/wp-uploads/trustedlogin-logs/"),". Created directories are protected by an index.html file to prevent browsing."),(0,r.kt)("h3",{id:"loggingthreshold"},(0,r.kt)("inlineCode",{parentName:"h3"},"logging/threshold")),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Optional.")," Default: ",(0,r.kt)("inlineCode",{parentName:"p"},"debug")),(0,r.kt)("p",null,"This setting defines the level of logging that should be recorded."),(0,r.kt)("p",null,"The default setting if logging is to record all logs (",(0,r.kt)("inlineCode",{parentName:"p"},"debug"),")."),(0,r.kt)("p",null,"The available options include the logging levels defined in\n",(0,r.kt)("a",{parentName:"p",href:"https://www.php-fig.org/psr/psr-3/#5-psrlogloglevel"},"PSR-3 ",(0,r.kt)("inlineCode",{parentName:"a"},"Psr\\Log\\LogLevel")),":"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"emergency")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"alert")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"critical")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"error")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"warning")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"notice")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"info")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"debug"))),(0,r.kt)("p",null,"Setting ",(0,r.kt)("inlineCode",{parentName:"p"},"logging/threshold")," to ",(0,r.kt)("inlineCode",{parentName:"p"},"error")," will record logs with the level of ",(0,r.kt)("inlineCode",{parentName:"p"},"error")," and above (",(0,r.kt)("inlineCode",{parentName:"p"},"error"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"critical"),",\n",(0,r.kt)("inlineCode",{parentName:"p"},"alert"),", and ",(0,r.kt)("inlineCode",{parentName:"p"},"emergency"),")."),(0,r.kt)("h3",{id:"loggingoptions"},(0,r.kt)("inlineCode",{parentName:"h3"},"logging/options")),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Optional.")," Default: ",(0,r.kt)("inlineCode",{parentName:"p"},"[]")),(0,r.kt)("p",null,"This setting can be used to pass additional options to the ",(0,r.kt)("inlineCode",{parentName:"p"},"Logger")," class. The TrustedLogin Logger class is based on KLogger. See ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/katzgrau/KLogger#additional-options"},"the KLogger docs\nfor more information"),"."),(0,r.kt)("h3",{id:"log-file-names"},"Log file names"),(0,r.kt)("p",null,"There is one log file generated per day. Log file names use a hash to make them more secure by obscurity, in this format:\n",(0,r.kt)("inlineCode",{parentName:"p"},"trustedlogin-debug-{{Date in Y-m-d format}}-{{hash}}.log")),(0,r.kt)("p",null,"Example: ",(0,r.kt)("inlineCode",{parentName:"p"},"trustedlogin-debug-2020-07-27-39dabe12636f200938bbe8790c0aef94.log")),(0,r.kt)("h2",{id:"display-name-vs-title"},"Display Name vs Title"),(0,r.kt)("p",null,"If ",(0,r.kt)("inlineCode",{parentName:"p"},"vendor/title")," is set to ",(0,r.kt)("inlineCode",{parentName:"p"},"GravityView"),", the default confirmation screen will say ",(0,r.kt)("inlineCode",{parentName:"p"},"Grant GravityView access to your site.")),(0,r.kt)("p",null,"When ",(0,r.kt)("inlineCode",{parentName:"p"},"vendor/display_name")," is also defined, the text will read ",(0,r.kt)("inlineCode",{parentName:"p"},"GravityView Support"),", the default confirmation screen will say ",(0,r.kt)("inlineCode",{parentName:"p"},"Grant GravityView Support access to your site.")),(0,r.kt)("h2",{id:"task-specific-email-addresses"},"Task-specific email addresses"),(0,r.kt)("p",null,'In order to prevent email address collision, we recommend using "plus addresses" (also called "task-specific email addresses") for your ',(0,r.kt)("inlineCode",{parentName:"p"},"vendor/email")," setting."),(0,r.kt)("p",null,"Rather than ",(0,r.kt)("inlineCode",{parentName:"p"},"support@example.com"),", use ",(0,r.kt)("inlineCode",{parentName:"p"},"support+{hash}@example.com"),". ",(0,r.kt)("inlineCode",{parentName:"p"},"{hash}")," will be dynamically replaced when used in\nthe email address."),(0,r.kt)("p",null,"This is supported by many email providers, including ",(0,r.kt)("a",{parentName:"p",href:"https://docs.microsoft.com/en-us/exchange/recipients-in-exchange-online/plus-addressing-in-exchange-online"},"Gmail"),", ",(0,r.kt)("a",{parentName:"p",href:"https://docs.microsoft.com/en-us/exchange/recipients-in-exchange-online/plus-addressing-in-exchange-online"},"Microsoft"),", ",(0,r.kt)("a",{parentName:"p",href:"https://www.fastmail.com/help/receive/addressing.html"},"Fastmail"),", and ",(0,r.kt)("a",{parentName:"p",href:"https://protonmail.com/support/knowledge-base/creating-aliases/"},"ProtonMail"),"."),(0,r.kt)("h2",{id:"invalid-capabilities"},"Invalid capabilities"),(0,r.kt)("p",null,"The Support User will be created based on the role defined in the configuration (see configuration above)."),(0,r.kt)("p",null,"The following capabilities are never allowed when creating users through TrustedLogin, regardless of the role:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"create_users")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"delete_users")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"edit_users")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"promote_users")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"delete_site")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"remove_users"))),(0,r.kt)("p",null,"A goal for TrustedLogin is to instill confidence in the end user that they are not creating security holes when granting\nsupport access to their site."),(0,r.kt)("h2",{id:"webhooks"},"Webhooks"),(0,r.kt)("p",null,"If the ",(0,r.kt)("inlineCode",{parentName:"p"},"webhook_url")," setting is set and is a valid URL, the URL will be sent a ",(0,r.kt)("inlineCode",{parentName:"p"},"POST")," request when creating a Support User, extending access, or revoking access."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Key"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"url")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"The site URL from where the webhook was triggered, as returned by ",(0,r.kt)("inlineCode",{parentName:"td"},"get_site_url()"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"action")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"The type of trigger: ",(0,r.kt)("inlineCode",{parentName:"td"},"created"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"extended"),", or ",(0,r.kt)("inlineCode",{parentName:"td"},"logged_in"),", or ",(0,r.kt)("inlineCode",{parentName:"td"},"revoked"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"ref")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string"),",",(0,r.kt)("inlineCode",{parentName:"td"},"null")),(0,r.kt)("td",{parentName:"tr",align:null},"A sanitized reference ID, if passed. Otherwise, null.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"debug_data")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"The Site Health report in Markdown formatting. This key is only set for the ",(0,r.kt)("inlineCode",{parentName:"td"},"trustedlogin/{namespace}/access/created")," action, and only if the user opted-in. Added in 1.4.0.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"ticket")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"array")),(0,r.kt)("td",{parentName:"tr",align:null},"The unmodified message created by the user. This key is only set for the ",(0,r.kt)("inlineCode",{parentName:"td"},"trustedlogin/{namespace}/access/created")," action, and only if the message is not empty. Added in 1.5.0.")))),(0,r.kt)("p",null,"The default actions that trigger webhooks to run are:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"trustedlogin/{namespace}/access/created")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"trustedlogin/{namespace}/access/extended")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"trustedlogin/{namespace}/access/revoked")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"trustedlogin/{namespace}/logged_in"))),(0,r.kt)("p",null,"See ",(0,r.kt)("a",{parentName:"p",href:"/Client/hooks"},"hook documentation"),"."))}u.isMDXComponent=!0}}]);