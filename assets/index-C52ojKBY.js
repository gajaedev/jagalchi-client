import{j as o}from"./jsx-runtime-DzmlkZa1.js";import{r as l}from"./iframe-Ca-YxJOr.js";import{B as m}from"./button-DIC14KoC.js";import{c}from"./utils-BQHNewu7.js";const a=l.forwardRef(({isLoading:e=!1,disabled:n,children:s,className:t,...r},i)=>o.jsxs(m,{ref:i,disabled:n||e,"aria-busy":e,"aria-live":"polite",className:c(t),...r,children:[e&&o.jsxs("svg",{className:"mr-2 h-4 w-4 animate-spin",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),o.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),s]}));a.displayName="LoadingButton";a.__docgenInfo={description:`로딩 상태를 지원하는 버튼 컴포넌트

AI 추천 등 비동기 작업에 사용됩니다.

@example
\`\`\`tsx
<LoadingButton
  isLoading={isLoadingRecommendations}
  onClick={handleAIRecommend}
>
  AI 추천 받기
</LoadingButton>
\`\`\``,methods:[],displayName:"LoadingButton",props:{isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}},composes:["ButtonProps"]};export{a as L};
