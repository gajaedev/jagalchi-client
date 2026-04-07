import{j as r}from"./jsx-runtime-BNEg3zb6.js";import{r as n}from"./iframe-DAei-zyE.js";import{HexColorPicker as c}from"./index-gdTahOja.js";import{c as i}from"./utils-BQHNewu7.js";const o=n.forwardRef(({value:e="#009689",onChange:l,className:a},t)=>r.jsx("div",{ref:t,className:i("flex-1","[&_.react-colorful]:h-auto [&_.react-colorful]:w-full","[&_.react-colorful]:rounded-[8px]","[&_.react-colorful]:border [&_.react-colorful]:border-slate-200","[&_.react-colorful]:shadow-sm","[&_.react-colorful__saturation]:h-[100px] [&_.react-colorful__saturation]:rounded-t-[8px]","[&_.react-colorful__hue]:h-[36px] [&_.react-colorful__hue]:rounded-b-[8px]","[&_.react-colorful__hue]:border-t [&_.react-colorful__hue]:border-slate-200","[&_.react-colorful__pointer]:size-[16px]","[&_.react-colorful__pointer]:border-2 [&_.react-colorful__pointer]:border-white","[&_.react-colorful__pointer]:shadow-md",a),role:"group","aria-label":"색상 선택",children:r.jsx(c,{color:e,onChange:l})}));o.displayName="ColorPickerInline";o.__docgenInfo={description:`인라인 2D 그라디언트 컬러 피커 컴포넌트

Figma EditorNodeSidebar (4472:1569)의 커스텀 컬러 섹션에서 추출.
react-colorful을 사용한 2D 그라디언트 컬러 피커.
molecules/ColorPicker (Dialog 기반)과 구분하기 위해 Inline 접미사 사용.

@example
\`\`\`tsx
<ColorPickerInline
  value="#009689"
  onChange={(color) => setCustomColor(color)}
/>
\`\`\``,methods:[],displayName:"ColorPickerInline",props:{value:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'#009689'",computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(color: string) => void",signature:{arguments:[{type:{name:"string"},name:"color"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};export{o as C};
