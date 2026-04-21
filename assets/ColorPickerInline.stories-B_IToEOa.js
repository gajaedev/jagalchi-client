import{a as e}from"./chunk-gsjJvkCQ.js";import{t}from"./react-aNIrFo1u.js";import{h as n}from"./iframe-KS2JIGtR.js";import{t as r}from"./ColorPickerInline-DfXiAmSz.js";var i=n(),a=e(t()),o={title:`Editor/Atoms/ColorPickerInline`,component:r,parameters:{layout:`centered`},tags:[`autodocs`]},s={args:{value:`#009689`},render:e=>(0,i.jsx)(`div`,{className:`flex w-[208px]`,children:(0,i.jsx)(r,{...e})})},c={args:{value:`#155dfc`},render:e=>(0,i.jsx)(`div`,{className:`flex w-[208px]`,children:(0,i.jsx)(r,{...e})})},l={args:{value:`#ec003f`},render:e=>(0,i.jsx)(`div`,{className:`flex w-[208px]`,children:(0,i.jsx)(r,{...e})})},u={args:{value:`#009689`},render:()=>{let[e,t]=(0,a.useState)(`#009689`);return(0,i.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,i.jsx)(r,{value:e,onChange:t}),(0,i.jsxs)(`p`,{className:`text-sm text-slate-600`,children:[`선택된 색상: `,e]})]})}},d={args:{value:`#009689`},render:()=>(0,i.jsx)(`div`,{className:`flex w-[208px]`,children:(0,i.jsx)(r,{value:`#009689`})})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    value: '#009689'
  },
  render: args => <div className="flex w-[208px]">
      <ColorPickerInline {...args} />
    </div>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    value: '#155dfc'
  },
  render: args => <div className="flex w-[208px]">
      <ColorPickerInline {...args} />
    </div>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    value: '#ec003f'
  },
  render: args => <div className="flex w-[208px]">
      <ColorPickerInline {...args} />
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    value: '#009689'
  },
  render: () => <div className="flex w-[208px]">
      <ColorPickerInline value="#009689" />
    </div>
}`,...d.parameters?.docs?.source}}};var f=[`Default`,`Blue`,`Red`,`Interactive`,`WithFixedWidth`];export{c as Blue,s as Default,u as Interactive,l as Red,d as WithFixedWidth,f as __namedExportsOrder,o as default};