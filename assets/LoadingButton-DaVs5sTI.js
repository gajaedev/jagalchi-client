import{a as e}from"./chunk-gsjJvkCQ.js";import{t}from"./react-aNIrFo1u.js";import{h as n}from"./iframe-DQi7WpjF.js";import{t as r}from"./utils-Ce99TZLg.js";import{t as i}from"./button-JgZopqPN.js";var a=n(),o=(0,e(t()).forwardRef)(({isLoading:e=!1,disabled:t,children:n,className:o,...s},c)=>(0,a.jsxs)(i,{ref:c,disabled:t||e,"aria-busy":e,"aria-live":`polite`,className:r(o),...s,children:[e&&(0,a.jsxs)(`svg`,{className:`mr-2 h-4 w-4 animate-spin`,xmlns:`http://www.w3.org/2000/svg`,fill:`none`,viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,a.jsx)(`circle`,{className:`opacity-25`,cx:`12`,cy:`12`,r:`10`,stroke:`currentColor`,strokeWidth:`4`}),(0,a.jsx)(`path`,{className:`opacity-75`,fill:`currentColor`,d:`M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z`})]}),n]}));o.displayName=`LoadingButton`,o.__docgenInfo={description:`로딩 상태를 지원하는 버튼 컴포넌트

AI 추천 등 비동기 작업에 사용됩니다.

@example
\`\`\`tsx
<LoadingButton
  isLoading={isLoadingRecommendations}
  onClick={handleAIRecommend}
>
  AI 추천 받기
</LoadingButton>
\`\`\``,methods:[],displayName:`LoadingButton`,props:{isLoading:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}}},composes:[`ButtonProps`]};export{o as t};