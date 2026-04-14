import{j as e}from"./jsx-runtime-BjVM7qWw.js";import{S as s}from"./separator-CxadnP1i.js";import"./iframe-CIyXAdiT.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BcP3U1GI.js";import"./index-BMo2qGt1.js";import"./index-CmVf-IGw.js";import"./index-CMGjT5pJ.js";import"./utils-BQHNewu7.js";const u={title:"UI/Separator",component:s,parameters:{layout:"centered"},tags:["autodocs"]},r={render:()=>e.jsxs("div",{className:"w-80",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsx("h4",{className:"text-sm font-medium",children:"Radix Primitives"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"An open-source UI component library."})]}),e.jsx(s,{className:"my-4"}),e.jsxs("div",{className:"flex h-5 items-center space-x-4 text-sm",children:[e.jsx("div",{children:"Blog"}),e.jsx(s,{orientation:"vertical"}),e.jsx("div",{children:"Docs"}),e.jsx(s,{orientation:"vertical"}),e.jsx("div",{children:"Source"})]})]})},a={render:()=>e.jsxs("div",{className:"flex h-20 items-center space-x-4",children:[e.jsx("div",{children:"Item 1"}),e.jsx(s,{orientation:"vertical"}),e.jsx("div",{children:"Item 2"}),e.jsx(s,{orientation:"vertical"}),e.jsx("div",{children:"Item 3"})]})},t={render:()=>e.jsx("div",{className:"w-80",children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"text-sm font-medium",children:"Dashboard"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"View your dashboard and analytics"})]}),e.jsx(s,{}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-sm font-medium",children:"Settings"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Manage your account settings"})]}),e.jsx(s,{}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-sm font-medium",children:"Profile"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"View and edit your profile"})]})]})})},i={render:()=>e.jsxs("div",{className:"w-80 space-y-4",children:[e.jsx("div",{children:"Default separator"}),e.jsx(s,{}),e.jsx("div",{children:"Primary colored separator"}),e.jsx(s,{className:"bg-primary"}),e.jsx("div",{children:"Destructive colored separator"}),e.jsx(s,{className:"bg-destructive"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-80">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Radix Primitives</h4>
        <p className="text-muted-foreground text-sm">An open-source UI component library.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex h-20 items-center space-x-4">
      <div>Item 1</div>
      <Separator orientation="vertical" />
      <div>Item 2</div>
      <Separator orientation="vertical" />
      <div>Item 3</div>
    </div>
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-80">
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium">Dashboard</h4>
          <p className="text-muted-foreground text-sm">View your dashboard and analytics</p>
        </div>
        <Separator />
        <div>
          <h4 className="text-sm font-medium">Settings</h4>
          <p className="text-muted-foreground text-sm">Manage your account settings</p>
        </div>
        <Separator />
        <div>
          <h4 className="text-sm font-medium">Profile</h4>
          <p className="text-muted-foreground text-sm">View and edit your profile</p>
        </div>
      </div>
    </div>
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-80 space-y-4">
      <div>Default separator</div>
      <Separator />
      <div>Primary colored separator</div>
      <Separator className="bg-primary" />
      <div>Destructive colored separator</div>
      <Separator className="bg-destructive" />
    </div>
}`,...i.parameters?.docs?.source}}};const h=["Horizontal","Vertical","InList","CustomColor"];export{i as CustomColor,r as Horizontal,t as InList,a as Vertical,h as __namedExportsOrder,u as default};
