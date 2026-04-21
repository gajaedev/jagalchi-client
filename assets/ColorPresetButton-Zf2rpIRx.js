import{a as e}from"./chunk-gsjJvkCQ.js";import{t}from"./react-aNIrFo1u.js";import{h as n}from"./iframe-DQi7WpjF.js";import{t as r}from"./utils-Ce99TZLg.js";var i=n(),a=(0,e(t()).forwardRef)(({color:e,isSelected:t=!1,onClick:n,className:a},o)=>(0,i.jsx)(`button`,{ref:o,type:`button`,onClick:n,className:r(`h-8 min-h-[32px] min-w-[32px] flex-1`,`rounded-[8px]`,`border border-slate-200`,`shadow-sm`,`transition-all duration-200`,`hover:scale-105 hover:shadow-md`,`focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:outline-none`,`active:scale-95`,t&&`scale-105 ring-2 ring-slate-900 ring-offset-2`,`disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100`,a),style:{backgroundColor:e},"aria-pressed":t,"aria-label":`색상: ${e}`}));a.displayName=`ColorPresetButton`,a.__docgenInfo={description:`컬러 프리셋 버튼 컴포넌트

Figma EditorNodeSidebar (4472:1569)의 기본 컬러 섹션에서 추출.
6개 프리셋 컬러: white, black, blue(#155dfc), purple(#9810fa), red(#ec003f), orange(#e17100)

@example
\`\`\`tsx
<ColorPresetButton
  color="#155dfc"
  isSelected={selectedColor === '#155dfc'}
  onClick={() => setSelectedColor('#155dfc')}
/>
\`\`\``,methods:[],displayName:`ColorPresetButton`,props:{color:{required:!0,tsType:{name:`string`},description:``},isSelected:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},onClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},className:{required:!1,tsType:{name:`string`},description:``}}};export{a as t};