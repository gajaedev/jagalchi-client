import{n as e}from"./chunk-BEldbCjX.js";import{n as t,t as n}from"./EditorInput-4uayrhPM.js";var r,i,a,o,s,c,l,u,d;e((()=>{t(),r={title:`Editor/Atoms/EditorInput`,component:n,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{label:{control:`text`,description:`입력 필드 레이블`},placeholder:{control:`text`,description:`Placeholder 텍스트`},value:{control:`text`,description:`입력 값`},isMultiline:{control:`boolean`,description:`멀티라인(textarea) 여부`},hasError:{control:`boolean`,description:`에러 상태 여부`},errorMessage:{control:`text`,description:`에러 메시지`},isDisabled:{control:`boolean`,description:`Disabled 상태 여부`}}},i={args:{placeholder:`자료 링크 입력`}},a={args:{label:`노드 이름`,placeholder:`노드 이름을 입력하세요`}},o={args:{label:`자료 링크`,placeholder:`자료 링크 입력`,value:`Justin'sVelog@velog.fejwnajwaf`}},s={args:{label:`노드 설명`,placeholder:`노드 설명을 입력하세요`,isMultiline:!0}},c={args:{label:`자료 링크`,placeholder:`자료 링크 입력`,value:`invalid-url`,hasError:!0,errorMessage:`올바른 URL을 입력하세요`}},l={args:{label:`노드 이름`,placeholder:`비활성화된 입력 필드`,value:`수정 불가`,isDisabled:!0}},u={args:{label:`노드 설명`,placeholder:`노드 설명을 입력하세요`,value:`React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다.
컴포넌트 기반 아키텍처를 사용하여 재사용 가능한 UI를 만들 수 있습니다.`,isMultiline:!0}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: '자료 링크 입력'
  }
}`,...i.parameters?.docs?.source},description:{story:`기본 EditorInput (레이블 없음)`,...i.parameters?.docs?.description}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: '노드 이름',
    placeholder: '노드 이름을 입력하세요'
  }
}`,...a.parameters?.docs?.source},description:{story:`레이블이 있는 EditorInput`,...a.parameters?.docs?.description}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: '자료 링크',
    placeholder: '자료 링크 입력',
    value: "Justin'sVelog@velog.fejwnajwaf"
  }
}`,...o.parameters?.docs?.source},description:{story:`값이 있는 EditorInput`,...o.parameters?.docs?.description}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: '노드 설명',
    placeholder: '노드 설명을 입력하세요',
    isMultiline: true
  }
}`,...s.parameters?.docs?.source},description:{story:`멀티라인 (Textarea) EditorInput`,...s.parameters?.docs?.description}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: '자료 링크',
    placeholder: '자료 링크 입력',
    value: 'invalid-url',
    hasError: true,
    errorMessage: '올바른 URL을 입력하세요'
  }
}`,...c.parameters?.docs?.source},description:{story:`에러 상태 EditorInput`,...c.parameters?.docs?.description}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: '노드 이름',
    placeholder: '비활성화된 입력 필드',
    value: '수정 불가',
    isDisabled: true
  }
}`,...l.parameters?.docs?.source},description:{story:`Disabled 상태 EditorInput`,...l.parameters?.docs?.description}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: '노드 설명',
    placeholder: '노드 설명을 입력하세요',
    value: 'React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다.\\n컴포넌트 기반 아키텍처를 사용하여 재사용 가능한 UI를 만들 수 있습니다.',
    isMultiline: true
  }
}`,...u.parameters?.docs?.source},description:{story:`긴 텍스트가 있는 Multiline EditorInput`,...u.parameters?.docs?.description}}},d=[`Default`,`WithLabel`,`WithValue`,`Multiline`,`WithError`,`Disabled`,`MultilineWithValue`]}))();export{i as Default,l as Disabled,s as Multiline,u as MultilineWithValue,c as WithError,a as WithLabel,o as WithValue,d as __namedExportsOrder,r as default};