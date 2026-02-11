import{j as e}from"./jsx-runtime-Cxzz85lI.js";import{c as n}from"./utils-CDN07tui.js";import{B as d}from"./button-iIF-bU3q.js";import"./iframe-SctQ3zmA.js";import"./preload-helper-PPVm8Dsz.js";import"./index-N1wJpAX6.js";import"./index-DRnjLPOD.js";import"./index-B_jtOnfb.js";function t({className:r,...a}){return e.jsx("div",{"data-slot":"card",className:n("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",r),...a})}function o({className:r,...a}){return e.jsx("div",{"data-slot":"card-header",className:n("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",r),...a})}function i({className:r,...a}){return e.jsx("div",{"data-slot":"card-title",className:n("leading-none font-semibold",r),...a})}function c({className:r,...a}){return e.jsx("div",{"data-slot":"card-description",className:n("text-muted-foreground text-sm",r),...a})}function x({className:r,...a}){return e.jsx("div",{"data-slot":"card-action",className:n("col-start-2 row-span-2 row-start-1 self-start justify-self-end",r),...a})}function s({className:r,...a}){return e.jsx("div",{"data-slot":"card-content",className:n("px-6",r),...a})}function u({className:r,...a}){return e.jsx("div",{"data-slot":"card-footer",className:n("flex items-center px-6 [.border-t]:pt-6",r),...a})}t.__docgenInfo={description:"",methods:[],displayName:"Card"};o.__docgenInfo={description:"",methods:[],displayName:"CardHeader"};u.__docgenInfo={description:"",methods:[],displayName:"CardFooter"};i.__docgenInfo={description:"",methods:[],displayName:"CardTitle"};x.__docgenInfo={description:"",methods:[],displayName:"CardAction"};c.__docgenInfo={description:"",methods:[],displayName:"CardDescription"};s.__docgenInfo={description:"",methods:[],displayName:"CardContent"};const _={title:"UI/Card",component:t,parameters:{layout:"centered"},tags:["autodocs"]},l={render:()=>e.jsxs(t,{className:"w-[350px]",children:[e.jsxs(o,{children:[e.jsx(i,{children:"Card Title"}),e.jsx(c,{children:"Card description goes here"})]}),e.jsx(s,{children:e.jsx("p",{children:"Card content with some text explaining the purpose of this card."})})]})},p={render:()=>e.jsxs(t,{className:"w-[350px]",children:[e.jsxs(o,{children:[e.jsx(i,{children:"Card with Footer"}),e.jsx(c,{children:"This card includes a footer section"})]}),e.jsx(s,{children:e.jsx("p",{children:"Main content of the card."})}),e.jsx(u,{children:e.jsx(d,{variant:"outline",className:"w-full",children:"Action"})})]})},C={render:()=>e.jsxs(t,{className:"w-[350px]",children:[e.jsxs(o,{children:[e.jsx(i,{children:"Card with Action"}),e.jsx(c,{children:"This card has an action button in the header"}),e.jsx(x,{children:e.jsx(d,{variant:"ghost",size:"icon-sm",children:"×"})})]}),e.jsx(s,{children:e.jsx("p",{children:"Card content with header action button."})})]})},m={render:()=>e.jsx(t,{className:"w-[350px]",children:e.jsx(s,{children:e.jsx("p",{children:"A simple card with only content, no header or footer."})})})},h={render:()=>e.jsxs(t,{className:"w-[400px]",children:[e.jsxs(o,{children:[e.jsx(i,{children:"Complete Card"}),e.jsx(c,{children:"A card with all available sections"}),e.jsx(x,{children:e.jsx(d,{variant:"outline",size:"sm",children:"Edit"})})]}),e.jsx(s,{children:e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{children:"This card demonstrates all available components:"}),e.jsxs("ul",{className:"list-inside list-disc space-y-1 text-sm",children:[e.jsx("li",{children:"CardHeader with title and description"}),e.jsx("li",{children:"CardAction in the header"}),e.jsx("li",{children:"CardContent with structured content"}),e.jsx("li",{children:"CardFooter with action buttons"})]})]})}),e.jsxs(u,{className:"gap-2",children:[e.jsx(d,{variant:"outline",className:"flex-1",children:"Cancel"}),e.jsx(d,{className:"flex-1",children:"Confirm"})]})]})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with some text explaining the purpose of this card.</p>
      </CardContent>
    </Card>
}`,...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card with Footer</CardTitle>
        <CardDescription>This card includes a footer section</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Main content of the card.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Action
        </Button>
      </CardFooter>
    </Card>
}`,...p.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card with Action</CardTitle>
        <CardDescription>This card has an action button in the header</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm">
            ×
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Card content with header action button.</p>
      </CardContent>
    </Card>
}`,...C.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardContent>
        <p>A simple card with only content, no header or footer.</p>
      </CardContent>
    </Card>
}`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Complete Card</CardTitle>
        <CardDescription>A card with all available sections</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>This card demonstrates all available components:</p>
          <ul className="list-inside list-disc space-y-1 text-sm">
            <li>CardHeader with title and description</li>
            <li>CardAction in the header</li>
            <li>CardContent with structured content</li>
            <li>CardFooter with action buttons</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button className="flex-1">Confirm</Button>
      </CardFooter>
    </Card>
}`,...h.parameters?.docs?.source}}};const b=["Default","WithFooter","WithAction","Simple","Complex"];export{h as Complex,l as Default,m as Simple,C as WithAction,p as WithFooter,b as __namedExportsOrder,_ as default};
