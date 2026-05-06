import{n as e}from"./chunk-BEldbCjX.js";import{C as t}from"./iframe-BW17Ef0A.js";import{n,t as r}from"./textarea-D_ZlSs14.js";var i,a,o,s,c,l,u,d,f;e((()=>{i=t(),n(),a={title:`UI/Textarea`,component:r,parameters:{layout:`centered`},tags:[`autodocs`]},o={args:{placeholder:`Type your message here...`}},s={args:{value:`This is a sample text in the textarea.`,onChange:()=>{}}},c={args:{placeholder:`This textarea is disabled`,disabled:!0}},l={args:{placeholder:`This field has an error`,"aria-invalid":!0}},u={args:{placeholder:`This textarea has custom rows`,rows:10}},d={render:()=>(0,i.jsxs)(`div`,{className:`flex w-80 flex-col gap-2`,children:[(0,i.jsx)(`label`,{htmlFor:`message`,className:`text-sm font-medium`,children:`Your Message`}),(0,i.jsx)(r,{id:`message`,placeholder:`Type your message here...`})]})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Type your message here...'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'This is a sample text in the textarea.',
    onChange: () => {}
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'This textarea is disabled',
    disabled: true
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'This field has an error',
    'aria-invalid': true
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'This textarea has custom rows',
    rows: 10
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-80 flex-col gap-2">
      <label htmlFor="message" className="text-sm font-medium">
        Your Message
      </label>
      <Textarea id="message" placeholder="Type your message here..." />
    </div>
}`,...d.parameters?.docs?.source}}},f=[`Default`,`WithValue`,`Disabled`,`WithError`,`CustomRows`,`WithLabel`]}))();export{u as CustomRows,o as Default,c as Disabled,l as WithError,d as WithLabel,s as WithValue,f as __namedExportsOrder,a as default};