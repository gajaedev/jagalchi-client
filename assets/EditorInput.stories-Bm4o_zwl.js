import{E as i}from"./index-D356ozg7.js";import"./jsx-runtime-DtzCM18y.js";import"./iframe-BY0TrE16.js";import"./preload-helper-PPVm8Dsz.js";import"./label-BmLgjKIU.js";import"./index-u_s1DPDD.js";import"./index-CR-8GSgu.js";import"./index-DRjnCd_H.js";import"./index-Dj1EL8Bq.js";import"./utils-CDN07tui.js";const v={title:"Editor/Atoms/EditorInput",component:i,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{label:{control:"text",description:"입력 필드 레이블"},placeholder:{control:"text",description:"Placeholder 텍스트"},value:{control:"text",description:"입력 값"},isMultiline:{control:"boolean",description:"멀티라인(textarea) 여부"},hasError:{control:"boolean",description:"에러 상태 여부"},errorMessage:{control:"text",description:"에러 메시지"},isDisabled:{control:"boolean",description:"Disabled 상태 여부"}}},e={args:{placeholder:"자료 링크 입력"}},r={args:{label:"노드 이름",placeholder:"노드 이름을 입력하세요"}},a={args:{label:"자료 링크",placeholder:"자료 링크 입력",value:"Justin'sVelog@velog.fejwnajwaf"}},o={args:{label:"노드 설명",placeholder:"노드 설명을 입력하세요",isMultiline:!0}},t={args:{label:"자료 링크",placeholder:"자료 링크 입력",value:"invalid-url",hasError:!0,errorMessage:"올바른 URL을 입력하세요"}},s={args:{label:"노드 이름",placeholder:"비활성화된 입력 필드",value:"수정 불가",isDisabled:!0}},l={args:{label:"노드 설명",placeholder:"노드 설명을 입력하세요",value:`React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다.
컴포넌트 기반 아키텍처를 사용하여 재사용 가능한 UI를 만들 수 있습니다.`,isMultiline:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: '자료 링크 입력'
  }
}`,...e.parameters?.docs?.source},description:{story:"기본 EditorInput (레이블 없음)",...e.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: '노드 이름',
    placeholder: '노드 이름을 입력하세요'
  }
}`,...r.parameters?.docs?.source},description:{story:"레이블이 있는 EditorInput",...r.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: '자료 링크',
    placeholder: '자료 링크 입력',
    value: "Justin'sVelog@velog.fejwnajwaf"
  }
}`,...a.parameters?.docs?.source},description:{story:"값이 있는 EditorInput",...a.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: '노드 설명',
    placeholder: '노드 설명을 입력하세요',
    isMultiline: true
  }
}`,...o.parameters?.docs?.source},description:{story:"멀티라인 (Textarea) EditorInput",...o.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: '자료 링크',
    placeholder: '자료 링크 입력',
    value: 'invalid-url',
    hasError: true,
    errorMessage: '올바른 URL을 입력하세요'
  }
}`,...t.parameters?.docs?.source},description:{story:"에러 상태 EditorInput",...t.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: '노드 이름',
    placeholder: '비활성화된 입력 필드',
    value: '수정 불가',
    isDisabled: true
  }
}`,...s.parameters?.docs?.source},description:{story:"Disabled 상태 EditorInput",...s.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: '노드 설명',
    placeholder: '노드 설명을 입력하세요',
    value: 'React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다.\\n컴포넌트 기반 아키텍처를 사용하여 재사용 가능한 UI를 만들 수 있습니다.',
    isMultiline: true
  }
}`,...l.parameters?.docs?.source},description:{story:"긴 텍스트가 있는 Multiline EditorInput",...l.parameters?.docs?.description}}};const M=["Default","WithLabel","WithValue","Multiline","WithError","Disabled","MultilineWithValue"];export{e as Default,s as Disabled,o as Multiline,l as MultilineWithValue,t as WithError,r as WithLabel,a as WithValue,M as __namedExportsOrder,v as default};
