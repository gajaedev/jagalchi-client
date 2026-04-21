import{t as e}from"./input-DDMnK7ek.js";var t={title:`UI/Input`,component:e,parameters:{layout:`centered`},tags:[`autodocs`]},n={args:{placeholder:`Enter text...`}},r={args:{value:`Hello World`,readOnly:!0}},i={args:{type:`email`,placeholder:`email@example.com`}},a={args:{type:`password`,placeholder:`Enter password`}},o={args:{placeholder:`Disabled input`,disabled:!0}},s={args:{placeholder:`Invalid input`,"aria-invalid":!0}},c={args:{type:`file`}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter text...'
  }
}`,...n.parameters?.docs?.source}}},r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'Hello World',
    readOnly: true
  }
}`,...r.parameters?.docs?.source}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'email',
    placeholder: 'email@example.com'
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'password',
    placeholder: 'Enter password'
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Disabled input',
    disabled: true
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Invalid input',
    'aria-invalid': true
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'file'
  }
}`,...c.parameters?.docs?.source}}};var l=[`Default`,`WithValue`,`Email`,`Password`,`Disabled`,`WithError`,`File`];export{n as Default,o as Disabled,i as Email,c as File,a as Password,s as WithError,r as WithValue,l as __namedExportsOrder,t as default};