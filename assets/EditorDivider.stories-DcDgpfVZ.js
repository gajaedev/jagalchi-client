import{n as e}from"./chunk-BEldbCjX.js";import{C as t}from"./iframe-BW17Ef0A.js";import{n,t as r}from"./EditorDivider-CFh3E--W.js";var i,a,o,s,c,l;e((()=>{i=t(),n(),a={title:`Editor/Atoms/EditorDivider`,component:r,parameters:{layout:`centered`},tags:[`autodocs`]},o={args:{orientation:`horizontal`},render:e=>(0,i.jsx)(`div`,{className:`w-[200px]`,children:(0,i.jsx)(r,{...e})})},s={args:{orientation:`vertical`},render:e=>(0,i.jsx)(`div`,{className:`h-[100px]`,children:(0,i.jsx)(r,{...e})})},c={args:{orientation:`horizontal`},render:()=>(0,i.jsxs)(`div`,{className:`flex w-[240px] flex-col gap-4`,children:[(0,i.jsx)(`div`,{children:(0,i.jsx)(`p`,{className:`text-sm font-medium`,children:`노드 이름`})}),(0,i.jsx)(r,{orientation:`horizontal`}),(0,i.jsx)(`div`,{children:(0,i.jsx)(`p`,{className:`text-sm font-medium`,children:`기본 컬러`})})]})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: 'horizontal'
  },
  render: args => <div className="w-[200px]">
      <EditorDivider {...args} />
    </div>
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: 'vertical'
  },
  render: args => <div className="h-[100px]">
      <EditorDivider {...args} />
    </div>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}},l=[`Horizontal`,`Vertical`,`InContent`]}))();export{o as Horizontal,c as InContent,s as Vertical,l as __namedExportsOrder,a as default};