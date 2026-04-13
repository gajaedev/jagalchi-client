import{j as n}from"./jsx-runtime-D0ZP9ShM.js";import{r as i}from"./iframe-Dc48HFqB.js";import{c as l}from"./utils-BQHNewu7.js";const o=i.forwardRef(({color:e,isSelected:r=!1,onClick:s,className:t},a)=>n.jsx("button",{ref:a,type:"button",onClick:s,className:l("h-8 min-h-[32px] min-w-[32px] flex-1","rounded-[8px]","border border-slate-200","shadow-sm","transition-all duration-200","hover:scale-105 hover:shadow-md","focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:outline-none","active:scale-95",r&&"scale-105 ring-2 ring-slate-900 ring-offset-2","disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100",t),style:{backgroundColor:e},"aria-pressed":r,"aria-label":`색상: ${e}`}));o.displayName="ColorPresetButton";o.__docgenInfo={description:`컬러 프리셋 버튼 컴포넌트

Figma EditorNodeSidebar (4472:1569)의 기본 컬러 섹션에서 추출.
6개 프리셋 컬러: white, black, blue(#155dfc), purple(#9810fa), red(#ec003f), orange(#e17100)

@example
\`\`\`tsx
<ColorPresetButton
  color="#155dfc"
  isSelected={selectedColor === '#155dfc'}
  onClick={() => setSelectedColor('#155dfc')}
/>
\`\`\``,methods:[],displayName:"ColorPresetButton",props:{color:{required:!0,tsType:{name:"string"},description:""},isSelected:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};export{o as C};
