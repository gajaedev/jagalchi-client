import{n as e,o as t}from"./chunk-BEldbCjX.js";import{C as n,J as r}from"./iframe-yKZ6rMeT.js";import{n as i,t as a}from"./ColorPickerInline-Tq15IkbK.js";var o,s,c,l,u,d,f,p,m;e((()=>{o=n(),s=t(r()),i(),c={title:`Editor/Atoms/ColorPickerInline`,component:a,parameters:{layout:`centered`},tags:[`autodocs`]},l={args:{value:`#009689`},render:e=>(0,o.jsx)(`div`,{className:`flex w-[208px]`,children:(0,o.jsx)(a,{...e})})},u={args:{value:`#155dfc`},render:e=>(0,o.jsx)(`div`,{className:`flex w-[208px]`,children:(0,o.jsx)(a,{...e})})},d={args:{value:`#ec003f`},render:e=>(0,o.jsx)(`div`,{className:`flex w-[208px]`,children:(0,o.jsx)(a,{...e})})},f={args:{value:`#009689`},render:()=>{let[e,t]=(0,s.useState)(`#009689`);return(0,o.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,o.jsx)(a,{value:e,onChange:t}),(0,o.jsxs)(`p`,{className:`text-sm text-slate-600`,children:[`선택된 색상: `,e]})]})}},p={args:{value:`#009689`},render:()=>(0,o.jsx)(`div`,{className:`flex w-[208px]`,children:(0,o.jsx)(a,{value:`#009689`})})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    value: '#009689'
  },
  render: args => <div className="flex w-[208px]">
      <ColorPickerInline {...args} />
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    value: '#155dfc'
  },
  render: args => <div className="flex w-[208px]">
      <ColorPickerInline {...args} />
    </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    value: '#ec003f'
  },
  render: args => <div className="flex w-[208px]">
      <ColorPickerInline {...args} />
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    value: '#009689'
  },
  render: () => <div className="flex w-[208px]">
      <ColorPickerInline value="#009689" />
    </div>
}`,...p.parameters?.docs?.source}}},m=[`Default`,`Blue`,`Red`,`Interactive`,`WithFixedWidth`]}))();export{u as Blue,l as Default,f as Interactive,d as Red,p as WithFixedWidth,m as __namedExportsOrder,c as default};