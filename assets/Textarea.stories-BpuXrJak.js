import{j as l}from"./jsx-runtime-CA4urzy9.js";import{T as c}from"./textarea-CecOUBrd.js";import"./iframe-CMhSVNTD.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CDN07tui.js";const u={title:"UI/Textarea",component:c,parameters:{layout:"centered"},tags:["autodocs"]},e={args:{placeholder:"Type your message here..."}},a={args:{value:"This is a sample text in the textarea.",onChange:()=>{}}},r={args:{placeholder:"This textarea is disabled",disabled:!0}},s={args:{placeholder:"This field has an error","aria-invalid":!0}},o={args:{placeholder:"This textarea has custom rows",rows:10}},t={render:()=>l.jsxs("div",{className:"flex w-80 flex-col gap-2",children:[l.jsx("label",{htmlFor:"message",className:"text-sm font-medium",children:"Your Message"}),l.jsx(c,{id:"message",placeholder:"Type your message here..."})]})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Type your message here...'
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'This is a sample text in the textarea.',
    onChange: () => {}
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'This textarea is disabled',
    disabled: true
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'This field has an error',
    'aria-invalid': true
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'This textarea has custom rows',
    rows: 10
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-80 flex-col gap-2">
      <label htmlFor="message" className="text-sm font-medium">
        Your Message
      </label>
      <Textarea id="message" placeholder="Type your message here..." />
    </div>
}`,...t.parameters?.docs?.source}}};const h=["Default","WithValue","Disabled","WithError","CustomRows","WithLabel"];export{o as CustomRows,e as Default,r as Disabled,s as WithError,t as WithLabel,a as WithValue,h as __namedExportsOrder,u as default};
