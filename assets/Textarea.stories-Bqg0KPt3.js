import{h as e}from"./iframe-CfF3Xyq-.js";import{t}from"./textarea-JsimPN5q.js";var n=e(),r={title:`UI/Textarea`,component:t,parameters:{layout:`centered`},tags:[`autodocs`]},i={args:{placeholder:`Type your message here...`}},a={args:{value:`This is a sample text in the textarea.`,onChange:()=>{}}},o={args:{placeholder:`This textarea is disabled`,disabled:!0}},s={args:{placeholder:`This field has an error`,"aria-invalid":!0}},c={args:{placeholder:`This textarea has custom rows`,rows:10}},l={render:()=>(0,n.jsxs)(`div`,{className:`flex w-80 flex-col gap-2`,children:[(0,n.jsx)(`label`,{htmlFor:`message`,className:`text-sm font-medium`,children:`Your Message`}),(0,n.jsx)(t,{id:`message`,placeholder:`Type your message here...`})]})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Type your message here...'
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'This is a sample text in the textarea.',
    onChange: () => {}
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'This textarea is disabled',
    disabled: true
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'This field has an error',
    'aria-invalid': true
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'This textarea has custom rows',
    rows: 10
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-80 flex-col gap-2">
      <label htmlFor="message" className="text-sm font-medium">
        Your Message
      </label>
      <Textarea id="message" placeholder="Type your message here..." />
    </div>
}`,...l.parameters?.docs?.source}}};var u=[`Default`,`WithValue`,`Disabled`,`WithError`,`CustomRows`,`WithLabel`];export{c as CustomRows,i as Default,o as Disabled,s as WithError,l as WithLabel,a as WithValue,u as __namedExportsOrder,r as default};