import{j as s}from"./jsx-runtime-CImd0PQU.js";import{r as l}from"./iframe-ZYk7C0JA.js";import{L as y}from"./label-CQ3W_gw-.js";import{c as h}from"./utils-BQHNewu7.js";const d=l.forwardRef(({label:n,value:p,placeholder:u,onChange:c,isMultiline:r=!1,hasError:e=!1,errorMessage:a,isDisabled:i=!1,className:m},f)=>{const t=l.useId(),o=`${t}-error`,x=v=>{c?.(v.target.value)},g=h("w-full min-h-[36px] px-3 py-[7.5px]","bg-white border border-slate-200 rounded-lg","shadow-sm","text-sm leading-[21px] tracking-[0.07px]","text-slate-950 placeholder:text-slate-500","outline-none transition-colors","focus-visible:border-slate-300 focus-visible:ring-2 focus-visible:ring-slate-100",e&&["border-red-500","focus-visible:border-red-500 focus-visible:ring-red-100"],i&&"opacity-50 cursor-not-allowed pointer-events-none",m),b=r?"textarea":"input";return s.jsxs("div",{className:"flex flex-col gap-1.5",children:[n&&s.jsx(y,{htmlFor:t,className:"text-sm font-medium text-slate-950",children:n}),s.jsx(b,{ref:f,id:t,value:p,placeholder:u,onChange:x,disabled:i,"aria-invalid":e,"aria-describedby":e&&a?o:void 0,className:g,...r&&{rows:3}}),e&&a&&s.jsx("p",{id:o,className:"text-xs text-red-500",children:a})]})});d.displayName="EditorInput";d.__docgenInfo={description:`에디터 전용 입력 필드 컴포넌트

Figma 디자인에 맞춘 36px 높이의 입력 필드로,
단일 라인 input과 멀티라인 textarea를 지원합니다.

@example
\`\`\`tsx
<EditorInput
  label="노드 이름"
  placeholder="이름을 입력하세요"
  value={name}
  onChange={setName}
/>
\`\`\``,methods:[],displayName:"EditorInput",props:{label:{required:!1,tsType:{name:"string"},description:""},value:{required:!1,tsType:{name:"string"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},isMultiline:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},hasError:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},errorMessage:{required:!1,tsType:{name:"string"},description:""},isDisabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};export{d as E};
