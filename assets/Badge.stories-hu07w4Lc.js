import{h as e}from"./iframe-DQi7WpjF.js";import{t}from"./utils-Ce99TZLg.js";import{t as n}from"./dist-DyCU1wM2.js";import{t as r}from"./dist-CZiI4oEu.js";var i=e(),a=r(`inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden`,{variants:{variant:{default:`border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90`,secondary:`border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90`,destructive:`border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60`,outline:`text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground`}},defaultVariants:{variant:`default`}});function o({className:e,variant:r,asChild:o=!1,...s}){return(0,i.jsx)(o?n:`span`,{"data-slot":`badge`,className:t(a({variant:r}),e),...s})}o.__docgenInfo={description:``,methods:[],displayName:`Badge`,props:{asChild:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}}}};var s={title:`UI/Badge`,component:o,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{variant:{control:`select`,options:[`default`,`secondary`,`destructive`,`outline`]}}},c={args:{children:`Badge`,variant:`default`}},l={args:{children:`Secondary`,variant:`secondary`}},u={args:{children:`Destructive`,variant:`destructive`}},d={args:{children:`Outline`,variant:`outline`}},f={render:()=>(0,i.jsxs)(`div`,{className:`flex flex-wrap gap-2`,children:[(0,i.jsx)(o,{variant:`default`,children:`Default`}),(0,i.jsx)(o,{variant:`secondary`,children:`Secondary`}),(0,i.jsx)(o,{variant:`destructive`,children:`Destructive`}),(0,i.jsx)(o,{variant:`outline`,children:`Outline`})]})},p={render:()=>(0,i.jsxs)(`div`,{className:`flex flex-wrap gap-2`,children:[(0,i.jsxs)(o,{variant:`default`,children:[(0,i.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,i.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,i.jsx)(`path`,{d:`m9 12 2 2 4-4`})]}),`Active`]}),(0,i.jsxs)(o,{variant:`secondary`,children:[(0,i.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,i.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,i.jsx)(`path`,{d:`m15 9-6 6`}),(0,i.jsx)(`path`,{d:`m9 9 6 6`})]}),`Inactive`]}),(0,i.jsxs)(o,{variant:`destructive`,children:[(0,i.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,i.jsx)(`path`,{d:`M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z`}),(0,i.jsx)(`line`,{x1:`12`,x2:`12`,y1:`9`,y2:`13`}),(0,i.jsx)(`line`,{x1:`12`,x2:`12.01`,y1:`17`,y2:`17`})]}),`Error`]})]})},m={render:()=>(0,i.jsxs)(`div`,{className:`flex flex-wrap gap-2`,children:[(0,i.jsx)(o,{variant:`default`,asChild:!0,children:(0,i.jsx)(`a`,{href:`#`,className:`cursor-pointer`,children:`Default Link`})}),(0,i.jsx)(o,{variant:`secondary`,asChild:!0,children:(0,i.jsx)(`a`,{href:`#`,className:`cursor-pointer`,children:`Secondary Link`})}),(0,i.jsx)(o,{variant:`outline`,asChild:!0,children:(0,i.jsx)(`a`,{href:`#`,className:`cursor-pointer`,children:`Outline Link`})})]})},h={render:()=>(0,i.jsxs)(`div`,{className:`flex flex-wrap gap-2`,children:[(0,i.jsx)(o,{variant:`default`,children:`New`}),(0,i.jsx)(o,{variant:`secondary`,children:`In Progress`}),(0,i.jsx)(o,{variant:`outline`,children:`Pending`}),(0,i.jsx)(o,{variant:`destructive`,children:`Failed`})]})},g={render:()=>(0,i.jsxs)(`div`,{className:`flex flex-wrap items-center gap-4`,children:[(0,i.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,i.jsx)(`span`,{className:`text-sm`,children:`Notifications`}),(0,i.jsx)(o,{variant:`destructive`,children:`3`})]}),(0,i.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,i.jsx)(`span`,{className:`text-sm`,children:`Messages`}),(0,i.jsx)(o,{variant:`default`,children:`12`})]}),(0,i.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,i.jsx)(`span`,{className:`text-sm`,children:`Tasks`}),(0,i.jsx)(o,{variant:`secondary`,children:`5`})]})]})};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Badge',
    variant: 'default'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Secondary',
    variant: 'secondary'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Destructive',
    variant: 'destructive'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Outline',
    variant: 'outline'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      <Badge variant="default">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
        Active
      </Badge>
      <Badge variant="secondary">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
        Inactive
      </Badge>
      <Badge variant="destructive">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" x2="12" y1="9" y2="13" />
          <line x1="12" x2="12.01" y1="17" y2="17" />
        </svg>
        Error
      </Badge>
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      <Badge variant="default" asChild>
        <a href="#" className="cursor-pointer">
          Default Link
        </a>
      </Badge>
      <Badge variant="secondary" asChild>
        <a href="#" className="cursor-pointer">
          Secondary Link
        </a>
      </Badge>
      <Badge variant="outline" asChild>
        <a href="#" className="cursor-pointer">
          Outline Link
        </a>
      </Badge>
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      <Badge variant="default">New</Badge>
      <Badge variant="secondary">In Progress</Badge>
      <Badge variant="outline">Pending</Badge>
      <Badge variant="destructive">Failed</Badge>
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm">Notifications</span>
        <Badge variant="destructive">3</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Messages</span>
        <Badge variant="default">12</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Tasks</span>
        <Badge variant="secondary">5</Badge>
      </div>
    </div>
}`,...g.parameters?.docs?.source}}};var _=[`Default`,`Secondary`,`Destructive`,`Outline`,`AllVariants`,`WithIcon`,`AsLink`,`Statuses`,`WithCount`];export{f as AllVariants,m as AsLink,c as Default,u as Destructive,d as Outline,l as Secondary,h as Statuses,g as WithCount,p as WithIcon,_ as __namedExportsOrder,s as default};