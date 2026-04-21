import{h as e}from"./iframe-DleOR9qZ.js";import{t}from"./PlusButtonHandle-CWZkze24.js";var n=e(),r={title:`Editor/Atoms/PlusButtonHandle`,component:t,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{position:{control:`select`,options:[`top`,`right`,`bottom`,`left`]}}},i={args:{position:`top`,onCreateNode:()=>console.log(`Create node at top`)},render:e=>(0,n.jsxs)(`div`,{className:`relative flex h-[100px] w-[200px] items-center justify-center border border-dashed border-slate-300`,children:[(0,n.jsx)(`span`,{className:`text-slate-400`,children:`Node`}),(0,n.jsx)(t,{...e})]})},a={args:{position:`right`,onCreateNode:()=>console.log(`Create node at right`)},render:e=>(0,n.jsxs)(`div`,{className:`relative flex h-[100px] w-[200px] items-center justify-center border border-dashed border-slate-300`,children:[(0,n.jsx)(`span`,{className:`text-slate-400`,children:`Node`}),(0,n.jsx)(t,{...e})]})},o={args:{position:`bottom`,onCreateNode:()=>console.log(`Create node at bottom`)},render:e=>(0,n.jsxs)(`div`,{className:`relative flex h-[100px] w-[200px] items-center justify-center border border-dashed border-slate-300`,children:[(0,n.jsx)(`span`,{className:`text-slate-400`,children:`Node`}),(0,n.jsx)(t,{...e})]})},s={args:{position:`left`,onCreateNode:()=>console.log(`Create node at left`)},render:e=>(0,n.jsxs)(`div`,{className:`relative flex h-[100px] w-[200px] items-center justify-center border border-dashed border-slate-300`,children:[(0,n.jsx)(`span`,{className:`text-slate-400`,children:`Node`}),(0,n.jsx)(t,{...e})]})},c={args:{position:`top`,onCreateNode:()=>{}},render:()=>(0,n.jsxs)(`div`,{className:`relative flex h-[200px] w-[200px] items-center justify-center border border-dashed border-slate-300`,children:[(0,n.jsx)(`span`,{className:`text-slate-400`,children:`Node`}),(0,n.jsx)(t,{position:`top`,onCreateNode:()=>{}}),(0,n.jsx)(t,{position:`right`,onCreateNode:()=>{}}),(0,n.jsx)(t,{position:`bottom`,onCreateNode:()=>{}}),(0,n.jsx)(t,{position:`left`,onCreateNode:()=>{}})]})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'top',
    onCreateNode: () => console.log('Create node at top')
  },
  render: args => <div className="relative flex h-[100px] w-[200px] items-center justify-center border border-dashed border-slate-300">
      <span className="text-slate-400">Node</span>
      <PlusButtonHandle {...args} />
    </div>
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'right',
    onCreateNode: () => console.log('Create node at right')
  },
  render: args => <div className="relative flex h-[100px] w-[200px] items-center justify-center border border-dashed border-slate-300">
      <span className="text-slate-400">Node</span>
      <PlusButtonHandle {...args} />
    </div>
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'bottom',
    onCreateNode: () => console.log('Create node at bottom')
  },
  render: args => <div className="relative flex h-[100px] w-[200px] items-center justify-center border border-dashed border-slate-300">
      <span className="text-slate-400">Node</span>
      <PlusButtonHandle {...args} />
    </div>
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'left',
    onCreateNode: () => console.log('Create node at left')
  },
  render: args => <div className="relative flex h-[100px] w-[200px] items-center justify-center border border-dashed border-slate-300">
      <span className="text-slate-400">Node</span>
      <PlusButtonHandle {...args} />
    </div>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};var l=[`Top`,`Right`,`Bottom`,`Left`,`AllDirections`];export{c as AllDirections,o as Bottom,s as Left,a as Right,i as Top,l as __namedExportsOrder,r as default};