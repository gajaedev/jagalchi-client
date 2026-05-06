import{n as e}from"./chunk-BEldbCjX.js";import{C as t}from"./iframe-BW17Ef0A.js";import{n,t as r}from"./button-Bc1fOUM_.js";import{a as i,c as a,i as o,n as s,o as c,r as l,s as u,t as d}from"./card-BpTxeXiM.js";var f,p,m,h,g,_,v,y;e((()=>{f=t(),a(),n(),p={title:`UI/Card`,component:d,parameters:{layout:`centered`},tags:[`autodocs`]},m={render:()=>(0,f.jsxs)(d,{className:`w-[350px]`,children:[(0,f.jsxs)(c,{children:[(0,f.jsx)(u,{children:`Card Title`}),(0,f.jsx)(o,{children:`Card description goes here`})]}),(0,f.jsx)(l,{children:(0,f.jsx)(`p`,{children:`Card content with some text explaining the purpose of this card.`})})]})},h={render:()=>(0,f.jsxs)(d,{className:`w-[350px]`,children:[(0,f.jsxs)(c,{children:[(0,f.jsx)(u,{children:`Card with Footer`}),(0,f.jsx)(o,{children:`This card includes a footer section`})]}),(0,f.jsx)(l,{children:(0,f.jsx)(`p`,{children:`Main content of the card.`})}),(0,f.jsx)(i,{children:(0,f.jsx)(r,{variant:`outline`,className:`w-full`,children:`Action`})})]})},g={render:()=>(0,f.jsxs)(d,{className:`w-[350px]`,children:[(0,f.jsxs)(c,{children:[(0,f.jsx)(u,{children:`Card with Action`}),(0,f.jsx)(o,{children:`This card has an action button in the header`}),(0,f.jsx)(s,{children:(0,f.jsx)(r,{variant:`ghost`,size:`icon-sm`,children:`×`})})]}),(0,f.jsx)(l,{children:(0,f.jsx)(`p`,{children:`Card content with header action button.`})})]})},_={render:()=>(0,f.jsx)(d,{className:`w-[350px]`,children:(0,f.jsx)(l,{children:(0,f.jsx)(`p`,{children:`A simple card with only content, no header or footer.`})})})},v={render:()=>(0,f.jsxs)(d,{className:`w-[400px]`,children:[(0,f.jsxs)(c,{children:[(0,f.jsx)(u,{children:`Complete Card`}),(0,f.jsx)(o,{children:`A card with all available sections`}),(0,f.jsx)(s,{children:(0,f.jsx)(r,{variant:`outline`,size:`sm`,children:`Edit`})})]}),(0,f.jsx)(l,{children:(0,f.jsxs)(`div`,{className:`space-y-2`,children:[(0,f.jsx)(`p`,{children:`This card demonstrates all available components:`}),(0,f.jsxs)(`ul`,{className:`list-inside list-disc space-y-1 text-sm`,children:[(0,f.jsx)(`li`,{children:`CardHeader with title and description`}),(0,f.jsx)(`li`,{children:`CardAction in the header`}),(0,f.jsx)(`li`,{children:`CardContent with structured content`}),(0,f.jsx)(`li`,{children:`CardFooter with action buttons`})]})]})}),(0,f.jsxs)(i,{className:`gap-2`,children:[(0,f.jsx)(r,{variant:`outline`,className:`flex-1`,children:`Cancel`}),(0,f.jsx)(r,{className:`flex-1`,children:`Confirm`})]})]})},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with some text explaining the purpose of this card.</p>
      </CardContent>
    </Card>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardContent>
        <p>A simple card with only content, no header or footer.</p>
      </CardContent>
    </Card>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y=[`Default`,`WithFooter`,`WithAction`,`Simple`,`Complex`]}))();export{v as Complex,m as Default,_ as Simple,g as WithAction,h as WithFooter,y as __namedExportsOrder,p as default};