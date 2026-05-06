import{n as e}from"./chunk-BEldbCjX.js";import{C as t}from"./iframe-CVXxN-RE.js";import{n,t as r}from"./scroll-area-rViQ_1uE.js";import{n as i,t as a}from"./separator-TBCMLAlD.js";var o,s,c,l,u,d,f,p;e((()=>{o=t(),n(),i(),s={title:`UI/ScrollArea`,component:r,parameters:{layout:`centered`},tags:[`autodocs`]},c=Array.from({length:50}).map((e,t,n)=>`v1.2.0-beta.${n.length-t}`),l={render:()=>(0,o.jsx)(r,{className:`border-border h-72 w-48 rounded-md border`,children:(0,o.jsxs)(`div`,{className:`p-4`,children:[(0,o.jsx)(`h4`,{className:`mb-4 text-sm leading-none font-medium`,children:`Tags`}),c.map(e=>(0,o.jsxs)(`div`,{children:[(0,o.jsx)(`div`,{className:`text-sm`,children:e}),(0,o.jsx)(a,{className:`my-2`})]},e))]})})},u={render:()=>(0,o.jsx)(r,{className:`border-border w-96 rounded-md border whitespace-nowrap`,children:(0,o.jsx)(`div`,{className:`flex w-max space-x-4 p-4`,children:Array.from({length:20}).map((e,t)=>(0,o.jsxs)(`div`,{className:`bg-muted flex size-32 shrink-0 items-center justify-center rounded-md`,children:[`Item `,t+1]},t))})})},d={render:()=>(0,o.jsxs)(r,{className:`border-border h-[400px] w-[350px] rounded-md border p-4`,children:[(0,o.jsx)(`h4`,{className:`mb-4 text-sm leading-none font-medium`,children:`Documentation`}),(0,o.jsx)(`p`,{className:`text-muted-foreground mb-4 text-sm`,children:`The scroll area component is a custom scrollbar implementation that provides a consistent scrolling experience across different browsers and operating systems.`}),(0,o.jsx)(`h5`,{className:`mb-2 text-sm font-medium`,children:`Features`}),(0,o.jsxs)(`ul`,{className:`text-muted-foreground mb-4 list-inside list-disc space-y-1 text-sm`,children:[(0,o.jsx)(`li`,{children:`Consistent scrollbar styling across browsers`}),(0,o.jsx)(`li`,{children:`Customizable scrollbar appearance`}),(0,o.jsx)(`li`,{children:`Smooth scrolling behavior`}),(0,o.jsx)(`li`,{children:`Support for both vertical and horizontal scrolling`}),(0,o.jsx)(`li`,{children:`Keyboard navigation support`}),(0,o.jsx)(`li`,{children:`Touch and mouse wheel support`})]}),(0,o.jsx)(`h5`,{className:`mb-2 text-sm font-medium`,children:`Usage`}),(0,o.jsx)(`p`,{className:`text-muted-foreground mb-4 text-sm`,children:`To use the scroll area component, wrap your content with the ScrollArea component. The component will automatically add scrollbars when the content overflows.`}),(0,o.jsx)(`p`,{className:`text-muted-foreground mb-4 text-sm`,children:`You can customize the appearance of the scrollbars by passing className props to the ScrollArea component or by modifying the global styles in your CSS file.`}),(0,o.jsx)(`h5`,{className:`mb-2 text-sm font-medium`,children:`Accessibility`}),(0,o.jsx)(`p`,{className:`text-muted-foreground text-sm`,children:`The scroll area component is built with accessibility in mind. It supports keyboard navigation using arrow keys, page up/down, home, and end keys. Screen readers will announce the scrollable region appropriately.`})]})},f={render:()=>(0,o.jsxs)(r,{className:`border-border h-48 w-80 rounded-md border p-4`,children:[(0,o.jsx)(`h4`,{className:`mb-4 text-sm leading-none font-medium`,children:`Recent Activity`}),Array.from({length:15}).map((e,t)=>(0,o.jsxs)(`div`,{className:`mb-3`,children:[(0,o.jsxs)(`div`,{className:`text-sm font-medium`,children:[`Activity `,t+1]}),(0,o.jsxs)(`p`,{className:`text-muted-foreground text-xs`,children:[`Description of activity `,t+1]})]},t))]})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollArea className="border-border h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
        {tags.map(tag => <div key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </div>)}
      </div>
    </ScrollArea>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollArea className="border-border w-96 rounded-md border whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({
        length: 20
      }).map((_, i) => <div key={i} className="bg-muted flex size-32 shrink-0 items-center justify-center rounded-md">
            Item {i + 1}
          </div>)}
      </div>
    </ScrollArea>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollArea className="border-border h-48 w-80 rounded-md border p-4">
      <h4 className="mb-4 text-sm leading-none font-medium">Recent Activity</h4>
      {Array.from({
      length: 15
    }).map((_, i) => <div key={i} className="mb-3">
          <div className="text-sm font-medium">Activity {i + 1}</div>
          <p className="text-muted-foreground text-xs">Description of activity {i + 1}</p>
        </div>)}
    </ScrollArea>
}`,...f.parameters?.docs?.source}}},p=[`Default`,`Horizontal`,`WithContent`,`CustomHeight`]}))();export{f as CustomHeight,l as Default,u as Horizontal,d as WithContent,p as __namedExportsOrder,s as default};