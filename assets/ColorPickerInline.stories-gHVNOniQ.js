import{j as e}from"./jsx-runtime-CX6gKgts.js";import{r as d}from"./iframe-Cv-ihnrn.js";import{C as s}from"./index-Br21Q7PC.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Px_F9KUZ.js";import"./utils-CDN07tui.js";const g={title:"Editor/Atoms/ColorPickerInline",component:s,parameters:{layout:"centered"},tags:["autodocs"]},a={args:{value:"#009689"},render:r=>e.jsx("div",{className:"flex w-[208px]",children:e.jsx(s,{...r})})},o={args:{value:"#155dfc"},render:r=>e.jsx("div",{className:"flex w-[208px]",children:e.jsx(s,{...r})})},l={args:{value:"#ec003f"},render:r=>e.jsx("div",{className:"flex w-[208px]",children:e.jsx(s,{...r})})},t={args:{value:"#009689"},render:()=>{const[r,i]=d.useState("#009689");return e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(s,{value:r,onChange:i}),e.jsxs("p",{className:"text-sm text-slate-600",children:["선택된 색상: ",r]})]})}},c={args:{value:"#009689"},render:()=>e.jsx("div",{className:"flex w-[208px]",children:e.jsx(s,{value:"#009689"})})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    value: '#009689'
  },
  render: args => <div className="flex w-[208px]">
      <ColorPickerInline {...args} />
    </div>
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    value: '#155dfc'
  },
  render: args => <div className="flex w-[208px]">
      <ColorPickerInline {...args} />
    </div>
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    value: '#ec003f'
  },
  render: args => <div className="flex w-[208px]">
      <ColorPickerInline {...args} />
    </div>
}`,...l.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    value: '#009689'
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [color, setColor] = useState('#009689');
    return <div className="flex flex-col gap-4">
        <ColorPickerInline value={color} onChange={setColor} />
        <p className="text-sm text-slate-600">선택된 색상: {color}</p>
      </div>;
  }
}`,...t.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    value: '#009689'
  },
  render: () => <div className="flex w-[208px]">
      <ColorPickerInline value="#009689" />
    </div>
}`,...c.parameters?.docs?.source}}};const f=["Default","Blue","Red","Interactive","WithFixedWidth"];export{o as Blue,a as Default,t as Interactive,l as Red,c as WithFixedWidth,f as __namedExportsOrder,g as default};
