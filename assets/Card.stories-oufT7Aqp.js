import{h as e}from"./iframe-DQi7WpjF.js";import{t}from"./button-JgZopqPN.js";import{a as n,i as r,n as i,o as a,r as o,s,t as c}from"./card-dg119m_l.js";var l=e(),u={title:`UI/Card`,component:c,parameters:{layout:`centered`},tags:[`autodocs`]},d={render:()=>(0,l.jsxs)(c,{className:`w-[350px]`,children:[(0,l.jsxs)(a,{children:[(0,l.jsx)(s,{children:`Card Title`}),(0,l.jsx)(r,{children:`Card description goes here`})]}),(0,l.jsx)(o,{children:(0,l.jsx)(`p`,{children:`Card content with some text explaining the purpose of this card.`})})]})},f={render:()=>(0,l.jsxs)(c,{className:`w-[350px]`,children:[(0,l.jsxs)(a,{children:[(0,l.jsx)(s,{children:`Card with Footer`}),(0,l.jsx)(r,{children:`This card includes a footer section`})]}),(0,l.jsx)(o,{children:(0,l.jsx)(`p`,{children:`Main content of the card.`})}),(0,l.jsx)(n,{children:(0,l.jsx)(t,{variant:`outline`,className:`w-full`,children:`Action`})})]})},p={render:()=>(0,l.jsxs)(c,{className:`w-[350px]`,children:[(0,l.jsxs)(a,{children:[(0,l.jsx)(s,{children:`Card with Action`}),(0,l.jsx)(r,{children:`This card has an action button in the header`}),(0,l.jsx)(i,{children:(0,l.jsx)(t,{variant:`ghost`,size:`icon-sm`,children:`×`})})]}),(0,l.jsx)(o,{children:(0,l.jsx)(`p`,{children:`Card content with header action button.`})})]})},m={render:()=>(0,l.jsx)(c,{className:`w-[350px]`,children:(0,l.jsx)(o,{children:(0,l.jsx)(`p`,{children:`A simple card with only content, no header or footer.`})})})},h={render:()=>(0,l.jsxs)(c,{className:`w-[400px]`,children:[(0,l.jsxs)(a,{children:[(0,l.jsx)(s,{children:`Complete Card`}),(0,l.jsx)(r,{children:`A card with all available sections`}),(0,l.jsx)(i,{children:(0,l.jsx)(t,{variant:`outline`,size:`sm`,children:`Edit`})})]}),(0,l.jsx)(o,{children:(0,l.jsxs)(`div`,{className:`space-y-2`,children:[(0,l.jsx)(`p`,{children:`This card demonstrates all available components:`}),(0,l.jsxs)(`ul`,{className:`list-inside list-disc space-y-1 text-sm`,children:[(0,l.jsx)(`li`,{children:`CardHeader with title and description`}),(0,l.jsx)(`li`,{children:`CardAction in the header`}),(0,l.jsx)(`li`,{children:`CardContent with structured content`}),(0,l.jsx)(`li`,{children:`CardFooter with action buttons`})]})]})}),(0,l.jsxs)(n,{className:`gap-2`,children:[(0,l.jsx)(t,{variant:`outline`,className:`flex-1`,children:`Cancel`}),(0,l.jsx)(t,{className:`flex-1`,children:`Confirm`})]})]})};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with some text explaining the purpose of this card.</p>
      </CardContent>
    </Card>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardContent>
        <p>A simple card with only content, no header or footer.</p>
      </CardContent>
    </Card>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}};var g=[`Default`,`WithFooter`,`WithAction`,`Simple`,`Complex`];export{h as Complex,d as Default,m as Simple,p as WithAction,f as WithFooter,g as __namedExportsOrder,u as default};