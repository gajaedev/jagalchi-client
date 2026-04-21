import{h as e}from"./iframe-jT_-kCp0.js";import{t}from"./scroll-area-D-G1MzDP.js";import{t as n}from"./separator-DUWFYYmX.js";var r=e(),i={title:`UI/ScrollArea`,component:t,parameters:{layout:`centered`},tags:[`autodocs`]},a=Array.from({length:50}).map((e,t,n)=>`v1.2.0-beta.${n.length-t}`),o={render:()=>(0,r.jsx)(t,{className:`border-border h-72 w-48 rounded-md border`,children:(0,r.jsxs)(`div`,{className:`p-4`,children:[(0,r.jsx)(`h4`,{className:`mb-4 text-sm leading-none font-medium`,children:`Tags`}),a.map(e=>(0,r.jsxs)(`div`,{children:[(0,r.jsx)(`div`,{className:`text-sm`,children:e}),(0,r.jsx)(n,{className:`my-2`})]},e))]})})},s={render:()=>(0,r.jsx)(t,{className:`border-border w-96 rounded-md border whitespace-nowrap`,children:(0,r.jsx)(`div`,{className:`flex w-max space-x-4 p-4`,children:Array.from({length:20}).map((e,t)=>(0,r.jsxs)(`div`,{className:`bg-muted flex size-32 shrink-0 items-center justify-center rounded-md`,children:[`Item `,t+1]},t))})})},c={render:()=>(0,r.jsxs)(t,{className:`border-border h-[400px] w-[350px] rounded-md border p-4`,children:[(0,r.jsx)(`h4`,{className:`mb-4 text-sm leading-none font-medium`,children:`Documentation`}),(0,r.jsx)(`p`,{className:`text-muted-foreground mb-4 text-sm`,children:`The scroll area component is a custom scrollbar implementation that provides a consistent scrolling experience across different browsers and operating systems.`}),(0,r.jsx)(`h5`,{className:`mb-2 text-sm font-medium`,children:`Features`}),(0,r.jsxs)(`ul`,{className:`text-muted-foreground mb-4 list-inside list-disc space-y-1 text-sm`,children:[(0,r.jsx)(`li`,{children:`Consistent scrollbar styling across browsers`}),(0,r.jsx)(`li`,{children:`Customizable scrollbar appearance`}),(0,r.jsx)(`li`,{children:`Smooth scrolling behavior`}),(0,r.jsx)(`li`,{children:`Support for both vertical and horizontal scrolling`}),(0,r.jsx)(`li`,{children:`Keyboard navigation support`}),(0,r.jsx)(`li`,{children:`Touch and mouse wheel support`})]}),(0,r.jsx)(`h5`,{className:`mb-2 text-sm font-medium`,children:`Usage`}),(0,r.jsx)(`p`,{className:`text-muted-foreground mb-4 text-sm`,children:`To use the scroll area component, wrap your content with the ScrollArea component. The component will automatically add scrollbars when the content overflows.`}),(0,r.jsx)(`p`,{className:`text-muted-foreground mb-4 text-sm`,children:`You can customize the appearance of the scrollbars by passing className props to the ScrollArea component or by modifying the global styles in your CSS file.`}),(0,r.jsx)(`h5`,{className:`mb-2 text-sm font-medium`,children:`Accessibility`}),(0,r.jsx)(`p`,{className:`text-muted-foreground text-sm`,children:`The scroll area component is built with accessibility in mind. It supports keyboard navigation using arrow keys, page up/down, home, and end keys. Screen readers will announce the scrollable region appropriately.`})]})},l={render:()=>(0,r.jsxs)(t,{className:`border-border h-48 w-80 rounded-md border p-4`,children:[(0,r.jsx)(`h4`,{className:`mb-4 text-sm leading-none font-medium`,children:`Recent Activity`}),Array.from({length:15}).map((e,t)=>(0,r.jsxs)(`div`,{className:`mb-3`,children:[(0,r.jsxs)(`div`,{className:`text-sm font-medium`,children:[`Activity `,t+1]}),(0,r.jsxs)(`p`,{className:`text-muted-foreground text-xs`,children:[`Description of activity `,t+1]})]},t))]})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollArea className="border-border h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
        {tags.map(tag => <div key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </div>)}
      </div>
    </ScrollArea>
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollArea className="border-border w-96 rounded-md border whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({
        length: 20
      }).map((_, i) => <div key={i} className="bg-muted flex size-32 shrink-0 items-center justify-center rounded-md">
            Item {i + 1}
          </div>)}
      </div>
    </ScrollArea>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollArea className="border-border h-48 w-80 rounded-md border p-4">
      <h4 className="mb-4 text-sm leading-none font-medium">Recent Activity</h4>
      {Array.from({
      length: 15
    }).map((_, i) => <div key={i} className="mb-3">
          <div className="text-sm font-medium">Activity {i + 1}</div>
          <p className="text-muted-foreground text-xs">Description of activity {i + 1}</p>
        </div>)}
    </ScrollArea>
}`,...l.parameters?.docs?.source}}};var u=[`Default`,`Horizontal`,`WithContent`,`CustomHeight`];export{l as CustomHeight,o as Default,s as Horizontal,c as WithContent,u as __namedExportsOrder,i as default};