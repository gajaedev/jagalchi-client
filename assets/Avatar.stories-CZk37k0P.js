import{j as a}from"./jsx-runtime-DdmxcLET.js";import{r as m}from"./iframe-BmpoGx1R.js";import{u as $,a as I}from"./index-CwnMz2et.js";import{P as L}from"./index-CgxCSjj6.js";import{s as J}from"./index-BBtVWh6G.js";import{c as _}from"./utils-CDN07tui.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DwDeJz6h.js";import"./index-ChgYa-84.js";import"./index-Dv9gSYyR.js";import"./index-g0L6Z6Rh.js";function G(e,t=[]){let n=[];function l(r,o){const s=m.createContext(o);s.displayName=r+"Context";const d=n.length;n=[...n,o];const p=h=>{const{scope:S,children:F,...x}=h,R=S?.[e]?.[d]||s,P=m.useMemo(()=>x,Object.values(x));return a.jsx(R.Provider,{value:P,children:F})};p.displayName=r+"Provider";function g(h,S){const F=S?.[e]?.[d]||s,x=m.useContext(F);if(x)return x;if(o!==void 0)return o;throw new Error(`\`${h}\` must be used within \`${r}\``)}return[p,g]}const c=()=>{const r=n.map(o=>m.createContext(o));return function(s){const d=s?.[e]||r;return m.useMemo(()=>({[`__scope${e}`]:{...s,[e]:d}}),[s,d])}};return c.scopeName=e,[l,T(c,...t)]}function T(...e){const t=e[0];if(e.length===1)return t;const n=()=>{const l=e.map(c=>({useScope:c(),scopeName:c.scopeName}));return function(r){const o=l.reduce((s,{useScope:d,scopeName:p})=>{const h=d(r)[`__scope${p}`];return{...s,...h}},{});return m.useMemo(()=>({[`__scope${t.scopeName}`]:o}),[o])}};return n.scopeName=t.scopeName,n}function W(){return J.useSyncExternalStore(B,()=>!0,()=>!1)}function B(){return()=>{}}var C="Avatar",[X]=G(C),[H,U]=X(C),y=m.forwardRef((e,t)=>{const{__scopeAvatar:n,...l}=e,[c,r]=m.useState("idle");return a.jsx(H,{scope:n,imageLoadingStatus:c,onImageLoadingStatusChange:r,children:a.jsx(L.span,{...l,ref:t})})});y.displayName=C;var z="AvatarImage",w=m.forwardRef((e,t)=>{const{__scopeAvatar:n,src:l,onLoadingStatusChange:c=()=>{},...r}=e,o=U(z,n),s=O(l,r),d=$(p=>{c(p),o.onImageLoadingStatusChange(p)});return I(()=>{s!=="idle"&&d(s)},[s,d]),s==="loaded"?a.jsx(L.img,{...r,ref:t,src:l}):null});w.displayName=z;var M="AvatarFallback",D=m.forwardRef((e,t)=>{const{__scopeAvatar:n,delayMs:l,...c}=e,r=U(M,n),[o,s]=m.useState(l===void 0);return m.useEffect(()=>{if(l!==void 0){const d=window.setTimeout(()=>s(!0),l);return()=>window.clearTimeout(d)}},[l]),o&&r.imageLoadingStatus!=="loaded"?a.jsx(L.span,{...c,ref:t}):null});D.displayName=M;function E(e,t){return e?t?(e.src!==t&&(e.src=t),e.complete&&e.naturalWidth>0?"loaded":"loading"):"error":"idle"}function O(e,{referrerPolicy:t,crossOrigin:n}){const l=W(),c=m.useRef(null),r=l?(c.current||(c.current=new window.Image),c.current):null,[o,s]=m.useState(()=>E(r,e));return I(()=>{s(E(r,e))},[r,e]),I(()=>{const d=h=>()=>{s(h)};if(!r)return;const p=d("loaded"),g=d("error");return r.addEventListener("load",p),r.addEventListener("error",g),t&&(r.referrerPolicy=t),typeof n=="string"&&(r.crossOrigin=n),()=>{r.removeEventListener("load",p),r.removeEventListener("error",g)}},[r,n,t]),o}var q=y,K=w,V=D;function i({className:e,...t}){return a.jsx(q,{"data-slot":"avatar",className:_("relative flex size-8 shrink-0 overflow-hidden rounded-full",e),...t})}function v({className:e,...t}){return a.jsx(K,{"data-slot":"avatar-image",className:_("aspect-square size-full",e),...t})}function u({className:e,...t}){return a.jsx(V,{"data-slot":"avatar-fallback",className:_("bg-muted flex size-full items-center justify-center rounded-full",e),...t})}i.__docgenInfo={description:"",methods:[],displayName:"Avatar"};v.__docgenInfo={description:"",methods:[],displayName:"AvatarImage"};u.__docgenInfo={description:"",methods:[],displayName:"AvatarFallback"};const la={title:"UI/Avatar",component:i,parameters:{layout:"centered"},tags:["autodocs"]},A={render:()=>a.jsxs(i,{children:[a.jsx(v,{src:"https://github.com/shadcn.png",alt:"User avatar"}),a.jsx(u,{children:"CN"})]})},b={render:()=>a.jsxs(i,{children:[a.jsx(v,{src:"/invalid-url.jpg",alt:"User avatar"}),a.jsx(u,{children:"JD"})]})},f={render:()=>a.jsx(i,{children:a.jsx(u,{children:"AB"})})},j={render:()=>a.jsxs("div",{className:"flex items-center gap-4",children:[a.jsxs(i,{className:"size-6",children:[a.jsx(v,{src:"https://github.com/shadcn.png",alt:"Small avatar"}),a.jsx(u,{children:"XS"})]}),a.jsxs(i,{className:"size-8",children:[a.jsx(v,{src:"https://github.com/shadcn.png",alt:"Default avatar"}),a.jsx(u,{children:"SM"})]}),a.jsxs(i,{className:"size-12",children:[a.jsx(v,{src:"https://github.com/shadcn.png",alt:"Medium avatar"}),a.jsx(u,{children:"MD"})]}),a.jsxs(i,{className:"size-16",children:[a.jsx(v,{src:"https://github.com/shadcn.png",alt:"Large avatar"}),a.jsx(u,{children:"LG"})]}),a.jsxs(i,{className:"size-24",children:[a.jsx(v,{src:"https://github.com/shadcn.png",alt:"Extra large avatar"}),a.jsx(u,{children:"XL"})]})]})},k={render:()=>a.jsxs("div",{className:"flex -space-x-4",children:[a.jsxs(i,{className:"border-background border-2",children:[a.jsx(v,{src:"https://github.com/shadcn.png",alt:"User 1"}),a.jsx(u,{children:"U1"})]}),a.jsxs(i,{className:"border-background border-2",children:[a.jsx(v,{src:"https://github.com/shadcn.png",alt:"User 2"}),a.jsx(u,{children:"U2"})]}),a.jsxs(i,{className:"border-background border-2",children:[a.jsx(v,{src:"https://github.com/shadcn.png",alt:"User 3"}),a.jsx(u,{children:"U3"})]}),a.jsx(i,{className:"border-background border-2",children:a.jsx(u,{children:"+3"})})]})},N={render:()=>a.jsxs("div",{className:"flex items-center gap-3",children:[a.jsxs(i,{children:[a.jsx(v,{src:"https://github.com/shadcn.png",alt:"User avatar"}),a.jsx(u,{children:"JD"})]}),a.jsxs("div",{className:"flex flex-col",children:[a.jsx("span",{className:"text-sm font-medium",children:"John Doe"}),a.jsx("span",{className:"text-muted-foreground text-xs",children:"john.doe@example.com"})]})]})};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
}`,...A.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Avatar>
      <AvatarImage src="/invalid-url.jpg" alt="User avatar" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
}`,...b.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <Avatar>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
}`,...f.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <Avatar className="size-6">
        <AvatarImage src="https://github.com/shadcn.png" alt="Small avatar" />
        <AvatarFallback>XS</AvatarFallback>
      </Avatar>
      <Avatar className="size-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="Default avatar" />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <AvatarImage src="https://github.com/shadcn.png" alt="Medium avatar" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="size-16">
        <AvatarImage src="https://github.com/shadcn.png" alt="Large avatar" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar className="size-24">
        <AvatarImage src="https://github.com/shadcn.png" alt="Extra large avatar" />
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
    </div>
}`,...j.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex -space-x-4">
      <Avatar className="border-background border-2">
        <AvatarImage src="https://github.com/shadcn.png" alt="User 1" />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <Avatar className="border-background border-2">
        <AvatarImage src="https://github.com/shadcn.png" alt="User 2" />
        <AvatarFallback>U2</AvatarFallback>
      </Avatar>
      <Avatar className="border-background border-2">
        <AvatarImage src="https://github.com/shadcn.png" alt="User 3" />
        <AvatarFallback>U3</AvatarFallback>
      </Avatar>
      <Avatar className="border-background border-2">
        <AvatarFallback>+3</AvatarFallback>
      </Avatar>
    </div>
}`,...k.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium">John Doe</span>
        <span className="text-muted-foreground text-xs">john.doe@example.com</span>
      </div>
    </div>
}`,...N.parameters?.docs?.source}}};const da=["Default","WithFallback","OnlyFallback","Sizes","Group","WithText"];export{A as Default,k as Group,f as OnlyFallback,j as Sizes,b as WithFallback,N as WithText,da as __namedExportsOrder,la as default};
