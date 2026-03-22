import{j as e}from"./jsx-runtime-BDgSbgkY.js";import{C as r,b as c,c as l,d as C,e as h,a,f as p}from"./card-D1G6Y4v9.js";import{B as n}from"./button-DMdZjQos.js";import"./iframe-osWvdCVA.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CDN07tui.js";import"./index-B9pUGwSj.js";import"./index-4iflbfGh.js";import"./index-B_jtOnfb.js";const v={title:"UI/Card",component:r,parameters:{layout:"centered"},tags:["autodocs"]},t={render:()=>e.jsxs(r,{className:"w-[350px]",children:[e.jsxs(c,{children:[e.jsx(l,{children:"Card Title"}),e.jsx(C,{children:"Card description goes here"})]}),e.jsx(a,{children:e.jsx("p",{children:"Card content with some text explaining the purpose of this card."})})]})},s={render:()=>e.jsxs(r,{className:"w-[350px]",children:[e.jsxs(c,{children:[e.jsx(l,{children:"Card with Footer"}),e.jsx(C,{children:"This card includes a footer section"})]}),e.jsx(a,{children:e.jsx("p",{children:"Main content of the card."})}),e.jsx(p,{children:e.jsx(n,{variant:"outline",className:"w-full",children:"Action"})})]})},i={render:()=>e.jsxs(r,{className:"w-[350px]",children:[e.jsxs(c,{children:[e.jsx(l,{children:"Card with Action"}),e.jsx(C,{children:"This card has an action button in the header"}),e.jsx(h,{children:e.jsx(n,{variant:"ghost",size:"icon-sm",children:"×"})})]}),e.jsx(a,{children:e.jsx("p",{children:"Card content with header action button."})})]})},d={render:()=>e.jsx(r,{className:"w-[350px]",children:e.jsx(a,{children:e.jsx("p",{children:"A simple card with only content, no header or footer."})})})},o={render:()=>e.jsxs(r,{className:"w-[400px]",children:[e.jsxs(c,{children:[e.jsx(l,{children:"Complete Card"}),e.jsx(C,{children:"A card with all available sections"}),e.jsx(h,{children:e.jsx(n,{variant:"outline",size:"sm",children:"Edit"})})]}),e.jsx(a,{children:e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{children:"This card demonstrates all available components:"}),e.jsxs("ul",{className:"list-inside list-disc space-y-1 text-sm",children:[e.jsx("li",{children:"CardHeader with title and description"}),e.jsx("li",{children:"CardAction in the header"}),e.jsx("li",{children:"CardContent with structured content"}),e.jsx("li",{children:"CardFooter with action buttons"})]})]})}),e.jsxs(p,{className:"gap-2",children:[e.jsx(n,{variant:"outline",className:"flex-1",children:"Cancel"}),e.jsx(n,{className:"flex-1",children:"Confirm"})]})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with some text explaining the purpose of this card.</p>
      </CardContent>
    </Card>
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardContent>
        <p>A simple card with only content, no header or footer.</p>
      </CardContent>
    </Card>
}`,...d.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const g=["Default","WithFooter","WithAction","Simple","Complex"];export{o as Complex,t as Default,d as Simple,i as WithAction,s as WithFooter,g as __namedExportsOrder,v as default};
