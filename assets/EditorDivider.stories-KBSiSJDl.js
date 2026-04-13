import{j as r}from"./jsx-runtime-CIGZEGtD.js";import{E as s}from"./index-CXFrMj1p.js";import"./iframe-BNBJMGN3.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-BQHNewu7.js";const l={title:"Editor/Atoms/EditorDivider",component:s,parameters:{layout:"centered"},tags:["autodocs"]},e={args:{orientation:"horizontal"},render:t=>r.jsx("div",{className:"w-[200px]",children:r.jsx(s,{...t})})},a={args:{orientation:"vertical"},render:t=>r.jsx("div",{className:"h-[100px]",children:r.jsx(s,{...t})})},o={args:{orientation:"horizontal"},render:()=>r.jsxs("div",{className:"flex w-[240px] flex-col gap-4",children:[r.jsx("div",{children:r.jsx("p",{className:"text-sm font-medium",children:"노드 이름"})}),r.jsx(s,{orientation:"horizontal"}),r.jsx("div",{children:r.jsx("p",{className:"text-sm font-medium",children:"기본 컬러"})})]})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: 'horizontal'
  },
  render: args => <div className="w-[200px]">
      <EditorDivider {...args} />
    </div>
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: 'vertical'
  },
  render: args => <div className="h-[100px]">
      <EditorDivider {...args} />
    </div>
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const p=["Horizontal","Vertical","InContent"];export{e as Horizontal,o as InContent,a as Vertical,p as __namedExportsOrder,l as default};
