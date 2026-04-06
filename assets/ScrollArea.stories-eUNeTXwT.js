import{j as e}from"./jsx-runtime-DzmlkZa1.js";import{S as t}from"./scroll-area-CqkEAA-U.js";import{S as m}from"./separator-CJ3GyOku.js";import"./iframe-Ca-YxJOr.js";import"./preload-helper-PPVm8Dsz.js";import"./index-6QOnQ3Ip.js";import"./index-BJGjkQA7.js";import"./index-Cylo4i7r.js";import"./index-xfPD5mvF.js";import"./index-CfzKEgpk.js";import"./utils-BQHNewu7.js";import"./index-DhmuwwOC.js";import"./index-G9H5bQaU.js";const S={title:"UI/ScrollArea",component:t,parameters:{layout:"centered"},tags:["autodocs"]},c=Array.from({length:50}).map((s,r,l)=>`v1.2.0-beta.${l.length-r}`),o={render:()=>e.jsx(t,{className:"border-border h-72 w-48 rounded-md border",children:e.jsxs("div",{className:"p-4",children:[e.jsx("h4",{className:"mb-4 text-sm leading-none font-medium",children:"Tags"}),c.map(s=>e.jsxs("div",{children:[e.jsx("div",{className:"text-sm",children:s}),e.jsx(m,{className:"my-2"})]},s))]})})},a={render:()=>e.jsx(t,{className:"border-border w-96 rounded-md border whitespace-nowrap",children:e.jsx("div",{className:"flex w-max space-x-4 p-4",children:Array.from({length:20}).map((s,r)=>e.jsxs("div",{className:"bg-muted flex size-32 shrink-0 items-center justify-center rounded-md",children:["Item ",r+1]},r))})})},n={render:()=>e.jsxs(t,{className:"border-border h-[400px] w-[350px] rounded-md border p-4",children:[e.jsx("h4",{className:"mb-4 text-sm leading-none font-medium",children:"Documentation"}),e.jsx("p",{className:"text-muted-foreground mb-4 text-sm",children:"The scroll area component is a custom scrollbar implementation that provides a consistent scrolling experience across different browsers and operating systems."}),e.jsx("h5",{className:"mb-2 text-sm font-medium",children:"Features"}),e.jsxs("ul",{className:"text-muted-foreground mb-4 list-inside list-disc space-y-1 text-sm",children:[e.jsx("li",{children:"Consistent scrollbar styling across browsers"}),e.jsx("li",{children:"Customizable scrollbar appearance"}),e.jsx("li",{children:"Smooth scrolling behavior"}),e.jsx("li",{children:"Support for both vertical and horizontal scrolling"}),e.jsx("li",{children:"Keyboard navigation support"}),e.jsx("li",{children:"Touch and mouse wheel support"})]}),e.jsx("h5",{className:"mb-2 text-sm font-medium",children:"Usage"}),e.jsx("p",{className:"text-muted-foreground mb-4 text-sm",children:"To use the scroll area component, wrap your content with the ScrollArea component. The component will automatically add scrollbars when the content overflows."}),e.jsx("p",{className:"text-muted-foreground mb-4 text-sm",children:"You can customize the appearance of the scrollbars by passing className props to the ScrollArea component or by modifying the global styles in your CSS file."}),e.jsx("h5",{className:"mb-2 text-sm font-medium",children:"Accessibility"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"The scroll area component is built with accessibility in mind. It supports keyboard navigation using arrow keys, page up/down, home, and end keys. Screen readers will announce the scrollable region appropriately."})]})},i={render:()=>e.jsxs(t,{className:"border-border h-48 w-80 rounded-md border p-4",children:[e.jsx("h4",{className:"mb-4 text-sm leading-none font-medium",children:"Recent Activity"}),Array.from({length:15}).map((s,r)=>e.jsxs("div",{className:"mb-3",children:[e.jsxs("div",{className:"text-sm font-medium",children:["Activity ",r+1]}),e.jsxs("p",{className:"text-muted-foreground text-xs",children:["Description of activity ",r+1]})]},r))]})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollArea className="border-border h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
        {tags.map(tag => <div key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </div>)}
      </div>
    </ScrollArea>
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollArea className="border-border w-96 rounded-md border whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({
        length: 20
      }).map((_, i) => <div key={i} className="bg-muted flex size-32 shrink-0 items-center justify-center rounded-md">
            Item {i + 1}
          </div>)}
      </div>
    </ScrollArea>
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollArea className="border-border h-[400px] w-[350px] rounded-md border p-4">
      <h4 className="mb-4 text-sm leading-none font-medium">Documentation</h4>
      <p className="text-muted-foreground mb-4 text-sm">
        The scroll area component is a custom scrollbar implementation that provides a consistent
        scrolling experience across different browsers and operating systems.
      </p>
      <h5 className="mb-2 text-sm font-medium">Features</h5>
      <ul className="text-muted-foreground mb-4 list-inside list-disc space-y-1 text-sm">
        <li>Consistent scrollbar styling across browsers</li>
        <li>Customizable scrollbar appearance</li>
        <li>Smooth scrolling behavior</li>
        <li>Support for both vertical and horizontal scrolling</li>
        <li>Keyboard navigation support</li>
        <li>Touch and mouse wheel support</li>
      </ul>
      <h5 className="mb-2 text-sm font-medium">Usage</h5>
      <p className="text-muted-foreground mb-4 text-sm">
        To use the scroll area component, wrap your content with the ScrollArea component. The
        component will automatically add scrollbars when the content overflows.
      </p>
      <p className="text-muted-foreground mb-4 text-sm">
        You can customize the appearance of the scrollbars by passing className props to the
        ScrollArea component or by modifying the global styles in your CSS file.
      </p>
      <h5 className="mb-2 text-sm font-medium">Accessibility</h5>
      <p className="text-muted-foreground text-sm">
        The scroll area component is built with accessibility in mind. It supports keyboard
        navigation using arrow keys, page up/down, home, and end keys. Screen readers will announce
        the scrollable region appropriately.
      </p>
    </ScrollArea>
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollArea className="border-border h-48 w-80 rounded-md border p-4">
      <h4 className="mb-4 text-sm leading-none font-medium">Recent Activity</h4>
      {Array.from({
      length: 15
    }).map((_, i) => <div key={i} className="mb-3">
          <div className="text-sm font-medium">Activity {i + 1}</div>
          <p className="text-muted-foreground text-xs">Description of activity {i + 1}</p>
        </div>)}
    </ScrollArea>
}`,...i.parameters?.docs?.source}}};const A=["Default","Horizontal","WithContent","CustomHeight"];export{i as CustomHeight,o as Default,a as Horizontal,n as WithContent,A as __namedExportsOrder,S as default};
