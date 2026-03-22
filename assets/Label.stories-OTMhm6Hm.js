import{j as e}from"./jsx-runtime-CCaZ3Xqs.js";import{L as r}from"./label-DMDNHY_A.js";import"./iframe-P3gPBkhb.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Amd8F7xL.js";import"./index-JN8nqcUi.js";import"./index-D6poOmaW.js";import"./index-DDRDqzXw.js";import"./utils-CDN07tui.js";const g={title:"UI/Label",component:r,parameters:{layout:"centered"},tags:["autodocs"]},s={args:{children:"Label"}},o={render:()=>e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx(r,{htmlFor:"email",children:"Email"}),e.jsx("input",{id:"email",type:"email",placeholder:"Enter your email",className:"border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"})]})},i={render:()=>e.jsxs("div",{className:"group","data-disabled":"true",children:[e.jsx(r,{htmlFor:"disabled",children:"Disabled Label"}),e.jsx("input",{id:"disabled",type:"text",disabled:!0,placeholder:"Disabled input",className:"border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring mt-2 flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"})]})},l={render:()=>e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("input",{id:"terms",type:"checkbox",className:"border-primary ring-offset-background focus-visible:ring-ring size-4 rounded border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"}),e.jsx(r,{htmlFor:"terms",children:"Accept terms and conditions"})]})},a={render:()=>e.jsxs("div",{className:"flex w-80 flex-col gap-4",children:[e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx(r,{htmlFor:"username",children:"Username"}),e.jsx("input",{id:"username",type:"text",placeholder:"Enter username",className:"border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"})]}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx(r,{htmlFor:"password",children:"Password"}),e.jsx("input",{id:"password",type:"password",placeholder:"Enter password",className:"border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"})]})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Label'
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <input id="email" type="email" placeholder="Enter your email" className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" />
    </div>
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="group" data-disabled="true">
      <Label htmlFor="disabled">Disabled Label</Label>
      <input id="disabled" type="text" disabled placeholder="Disabled input" className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring mt-2 flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" />
    </div>
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-2">
      <input id="terms" type="checkbox" className="border-primary ring-offset-background focus-visible:ring-ring size-4 rounded border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-80 flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="username">Username</Label>
        <input id="username" type="text" placeholder="Enter username" className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <input id="password" type="password" placeholder="Enter password" className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none" />
      </div>
    </div>
}`,...a.parameters?.docs?.source}}};const x=["Default","WithInput","Disabled","WithCheckbox","Multiple"];export{s as Default,i as Disabled,a as Multiple,l as WithCheckbox,o as WithInput,x as __namedExportsOrder,g as default};
