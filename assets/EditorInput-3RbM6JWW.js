import{a as e}from"./chunk-gsjJvkCQ.js";import{t}from"./react-aNIrFo1u.js";import{h as n}from"./iframe-jT_-kCp0.js";import{t as r}from"./utils-Ce99TZLg.js";import{t as i}from"./label-C1V7MxoE.js";var a=n(),o=e(t()),s=(0,o.forwardRef)(({label:e,value:t,placeholder:n,onChange:s,onBlur:c,isMultiline:l=!1,hasError:u=!1,errorMessage:d,isDisabled:f=!1,className:p},m)=>{let h=(0,o.useId)(),g=`${h}-error`,_=e=>{s?.(e.target.value)},v=r(`w-full min-h-[36px] px-3 py-[7.5px]`,`bg-white border border-slate-200 rounded-lg`,`shadow-sm`,`text-sm leading-[21px] tracking-[0.07px]`,`text-slate-950 placeholder:text-slate-500`,`outline-none transition-colors`,`focus-visible:border-slate-300 focus-visible:ring-2 focus-visible:ring-slate-100`,u&&[`border-red-500`,`focus-visible:border-red-500 focus-visible:ring-red-100`],f&&`opacity-50 cursor-not-allowed pointer-events-none`,p);return(0,a.jsxs)(`div`,{className:`flex flex-col gap-1.5`,children:[e&&(0,a.jsx)(i,{htmlFor:h,className:`text-sm font-medium text-slate-950`,children:e}),(0,a.jsx)(l?`textarea`:`input`,{ref:m,id:h,value:t,placeholder:n,onChange:_,onBlur:c,disabled:f,"aria-invalid":u,"aria-describedby":u&&d?g:void 0,className:v,...l&&{rows:3}}),u&&d&&(0,a.jsx)(`p`,{id:g,className:`text-xs text-red-500`,children:d})]})});s.displayName=`EditorInput`,s.__docgenInfo={description:`에디터 전용 입력 필드 컴포넌트

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
\`\`\``,methods:[],displayName:`EditorInput`,props:{label:{required:!1,tsType:{name:`string`},description:``},value:{required:!1,tsType:{name:`string`},description:``},placeholder:{required:!1,tsType:{name:`string`},description:``},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: string) => void`,signature:{arguments:[{type:{name:`string`},name:`value`}],return:{name:`void`}}},description:``},onBlur:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},isMultiline:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},hasError:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},errorMessage:{required:!1,tsType:{name:`string`},description:``},isDisabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``}}};export{s as t};