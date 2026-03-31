import{j as e}from"./jsx-runtime-CKc7U6XQ.js";import{P as t}from"./index-Ex697JMN.js";import"./iframe-CucAqyq3.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-BQHNewu7.js";import"./createLucideIcon-C8LcKO5w.js";const u={title:"Editor/Atoms/PlusButtonHandle",component:t,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{position:{control:"select",options:["top","right","bottom","left"]}}},o={args:{position:"top",onCreateNode:()=>console.log("Create node at top")},render:r=>e.jsxs("div",{className:"relative flex h-[100px] w-[200px] items-center justify-center border border-dashed border-slate-300",children:[e.jsx("span",{className:"text-slate-400",children:"Node"}),e.jsx(t,{...r})]})},s={args:{position:"right",onCreateNode:()=>console.log("Create node at right")},render:r=>e.jsxs("div",{className:"relative flex h-[100px] w-[200px] items-center justify-center border border-dashed border-slate-300",children:[e.jsx("span",{className:"text-slate-400",children:"Node"}),e.jsx(t,{...r})]})},a={args:{position:"bottom",onCreateNode:()=>console.log("Create node at bottom")},render:r=>e.jsxs("div",{className:"relative flex h-[100px] w-[200px] items-center justify-center border border-dashed border-slate-300",children:[e.jsx("span",{className:"text-slate-400",children:"Node"}),e.jsx(t,{...r})]})},d={args:{position:"left",onCreateNode:()=>console.log("Create node at left")},render:r=>e.jsxs("div",{className:"relative flex h-[100px] w-[200px] items-center justify-center border border-dashed border-slate-300",children:[e.jsx("span",{className:"text-slate-400",children:"Node"}),e.jsx(t,{...r})]})},n={args:{position:"top",onCreateNode:()=>{}},render:()=>e.jsxs("div",{className:"relative flex h-[200px] w-[200px] items-center justify-center border border-dashed border-slate-300",children:[e.jsx("span",{className:"text-slate-400",children:"Node"}),e.jsx(t,{position:"top",onCreateNode:()=>{}}),e.jsx(t,{position:"right",onCreateNode:()=>{}}),e.jsx(t,{position:"bottom",onCreateNode:()=>{}}),e.jsx(t,{position:"left",onCreateNode:()=>{}})]})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'top',
    onCreateNode: () => console.log('Create node at top')
  },
  render: args => <div className="relative flex h-[100px] w-[200px] items-center justify-center border border-dashed border-slate-300">
      <span className="text-slate-400">Node</span>
      <PlusButtonHandle {...args} />
    </div>
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'right',
    onCreateNode: () => console.log('Create node at right')
  },
  render: args => <div className="relative flex h-[100px] w-[200px] items-center justify-center border border-dashed border-slate-300">
      <span className="text-slate-400">Node</span>
      <PlusButtonHandle {...args} />
    </div>
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'bottom',
    onCreateNode: () => console.log('Create node at bottom')
  },
  render: args => <div className="relative flex h-[100px] w-[200px] items-center justify-center border border-dashed border-slate-300">
      <span className="text-slate-400">Node</span>
      <PlusButtonHandle {...args} />
    </div>
}`,...a.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'left',
    onCreateNode: () => console.log('Create node at left')
  },
  render: args => <div className="relative flex h-[100px] w-[200px] items-center justify-center border border-dashed border-slate-300">
      <span className="text-slate-400">Node</span>
      <PlusButtonHandle {...args} />
    </div>
}`,...d.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'top',
    onCreateNode: () => {}
  },
  render: () => <div className="relative flex h-[200px] w-[200px] items-center justify-center border border-dashed border-slate-300">
      <span className="text-slate-400">Node</span>
      <PlusButtonHandle position="top" onCreateNode={() => {}} />
      <PlusButtonHandle position="right" onCreateNode={() => {}} />
      <PlusButtonHandle position="bottom" onCreateNode={() => {}} />
      <PlusButtonHandle position="left" onCreateNode={() => {}} />
    </div>
}`,...n.parameters?.docs?.source}}};const N=["Top","Right","Bottom","Left","AllDirections"];export{n as AllDirections,a as Bottom,d as Left,s as Right,o as Top,N as __namedExportsOrder,u as default};
