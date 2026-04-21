import{h as e}from"./iframe-X6fBeLnc.js";import{t}from"./label-B1GjZOTZ.js";var n=e(),r={title:`UI/Label`,component:t,parameters:{layout:`centered`},tags:[`autodocs`]},i={args:{children:`Label`}},a={render:()=>(0,n.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,n.jsx)(t,{htmlFor:`email`,children:`Email`}),(0,n.jsx)(`input`,{id:`email`,type:`email`,placeholder:`Enter your email`,className:`border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`})]})},o={render:()=>(0,n.jsxs)(`div`,{className:`group`,"data-disabled":`true`,children:[(0,n.jsx)(t,{htmlFor:`disabled`,children:`Disabled Label`}),(0,n.jsx)(`input`,{id:`disabled`,type:`text`,disabled:!0,placeholder:`Disabled input`,className:`border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring mt-2 flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`})]})},s={render:()=>(0,n.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,n.jsx)(`input`,{id:`terms`,type:`checkbox`,className:`border-primary ring-offset-background focus-visible:ring-ring size-4 rounded border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`}),(0,n.jsx)(t,{htmlFor:`terms`,children:`Accept terms and conditions`})]})},c={render:()=>(0,n.jsxs)(`div`,{className:`flex w-80 flex-col gap-4`,children:[(0,n.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,n.jsx)(t,{htmlFor:`username`,children:`Username`}),(0,n.jsx)(`input`,{id:`username`,type:`text`,placeholder:`Enter username`,className:`border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none`})]}),(0,n.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,n.jsx)(t,{htmlFor:`password`,children:`Password`}),(0,n.jsx)(`input`,{id:`password`,type:`password`,placeholder:`Enter password`,className:`border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none`})]})]})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Label'
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <input id="email" type="email" placeholder="Enter your email" className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" />
    </div>
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="group" data-disabled="true">
      <Label htmlFor="disabled">Disabled Label</Label>
      <input id="disabled" type="text" disabled placeholder="Disabled input" className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring mt-2 flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" />
    </div>
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-2">
      <input id="terms" type="checkbox" className="border-primary ring-offset-background focus-visible:ring-ring size-4 rounded border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};var l=[`Default`,`WithInput`,`Disabled`,`WithCheckbox`,`Multiple`];export{i as Default,o as Disabled,c as Multiple,s as WithCheckbox,a as WithInput,l as __namedExportsOrder,r as default};