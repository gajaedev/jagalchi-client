import{j as o}from"./jsx-runtime-BmOk0bVY.js";import{r as t}from"./iframe-0OvX-p8O.js";import{c as n}from"./utils-BQHNewu7.js";const r=t.forwardRef(({orientation:e="horizontal",className:i},a)=>o.jsx("div",{ref:a,className:n("bg-slate-200",e==="horizontal"?"h-px w-full":"h-full w-px",i),role:"separator","aria-orientation":e}));r.displayName="EditorDivider";r.__docgenInfo={description:`에디터 전용 구분선 컴포넌트

수평 또는 수직 구분선을 표시합니다.

@example
\`\`\`tsx
<EditorDivider orientation="horizontal" />
<EditorDivider orientation="vertical" />
\`\`\``,methods:[],displayName:"EditorDivider",props:{orientation:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:"",defaultValue:{value:"'horizontal'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};export{r as E};
