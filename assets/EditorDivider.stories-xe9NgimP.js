import{h as e}from"./iframe-jT_-kCp0.js";import{t}from"./EditorDivider-CVBmBfYU.js";var n=e(),r={title:`Editor/Atoms/EditorDivider`,component:t,parameters:{layout:`centered`},tags:[`autodocs`]},i={args:{orientation:`horizontal`},render:e=>(0,n.jsx)(`div`,{className:`w-[200px]`,children:(0,n.jsx)(t,{...e})})},a={args:{orientation:`vertical`},render:e=>(0,n.jsx)(`div`,{className:`h-[100px]`,children:(0,n.jsx)(t,{...e})})},o={args:{orientation:`horizontal`},render:()=>(0,n.jsxs)(`div`,{className:`flex w-[240px] flex-col gap-4`,children:[(0,n.jsx)(`div`,{children:(0,n.jsx)(`p`,{className:`text-sm font-medium`,children:`노드 이름`})}),(0,n.jsx)(t,{orientation:`horizontal`}),(0,n.jsx)(`div`,{children:(0,n.jsx)(`p`,{className:`text-sm font-medium`,children:`기본 컬러`})})]})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: 'horizontal'
  },
  render: args => <div className="w-[200px]">
      <EditorDivider {...args} />
    </div>
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: 'vertical'
  },
  render: args => <div className="h-[100px]">
      <EditorDivider {...args} />
    </div>
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: 'horizontal'
  },
  render: () => <div className="flex w-[240px] flex-col gap-4">
      <div>
        <p className="text-sm font-medium">노드 이름</p>
      </div>
      <EditorDivider orientation="horizontal" />
      <div>
        <p className="text-sm font-medium">기본 컬러</p>
      </div>
    </div>
}`,...o.parameters?.docs?.source}}};var s=[`Horizontal`,`Vertical`,`InContent`];export{i as Horizontal,o as InContent,a as Vertical,s as __namedExportsOrder,r as default};