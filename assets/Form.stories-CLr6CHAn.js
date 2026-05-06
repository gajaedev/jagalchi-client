import{a as e}from"./chunk-gsjJvkCQ.js";import{t}from"./react-aNIrFo1u.js";import{h as n}from"./iframe-Pjt-YlPn.js";import{t as r}from"./utils-Ce99TZLg.js";import{c as i,i as a,l as o,o as s,u as c}from"./schemas-BIlAehzE.js";import{t as l}from"./dist-BT-FWCtL.js";import{t as u}from"./button-Bjp_v4S1.js";import{t as d}from"./label-BpON_rnJ.js";import{t as f}from"./input-BwSHplKW.js";import{a as p,c as m,i as h,l as g,n as _,r as v,s as y,t as b}from"./index.esm-BJrRn2gv.js";var x=e(t()),S=n(),C=(e,t,n)=>{if(e&&`reportValidity`in e){let r=h(n,t);e.setCustomValidity(r&&r.message||``),e.reportValidity()}},w=(e,t)=>{for(let n in t.fields){let r=t.fields[n];r&&r.ref&&`reportValidity`in r.ref?C(r.ref,n,e):r&&r.refs&&r.refs.forEach(t=>C(t,n,e))}},T=(e,t)=>{t.shouldUseNativeValidation&&w(e,t);let n={};for(let r in e){let i=h(t.fields,r),a=Object.assign(e[r]||{},{ref:i&&i.ref});if(E(t.names||Object.keys(e),r)){let e=Object.assign({},h(n,r));p(e,`root`,a),p(n,r,e)}else p(n,r,a)}return n},E=(e,t)=>{let n=D(t);return e.some(e=>D(e).match(`^${n}\\.\\d+`))};function D(e){return e.replace(/\]|\[/g,``)}function O(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}function k(e,t){for(var n={};e.length;){var r=e[0],i=r.code,a=r.message,o=r.path.join(`.`);if(!n[o])if(`unionErrors`in r){var s=r.unionErrors[0].errors[0];n[o]={message:s.message,type:s.code}}else n[o]={message:a,type:i};if(`unionErrors`in r&&r.unionErrors.forEach(function(t){return t.errors.forEach(function(t){return e.push(t)})}),t){var c=n[o].types,l=c&&c[r.code];n[o]=v(o,t,n,i,l?[].concat(l,r.message):r.message)}e.shift()}return n}function A(e,t){for(var n={};e.length;){var r=e[0],i=r.code,a=r.message,o=r.path.join(`.`);if(!n[o])if(r.code===`invalid_union`&&r.errors.length>0){var s=r.errors[0][0];n[o]={message:s.message,type:s.code}}else n[o]={message:a,type:i};if(r.code===`invalid_union`&&r.errors.forEach(function(t){return t.forEach(function(t){return e.push(t)})}),t){var c=n[o].types,l=c&&c[r.code];n[o]=v(o,t,n,i,l?[].concat(l,r.message):r.message)}e.shift()}return n}function j(e,t,n){if(n===void 0&&(n={}),function(e){return`_def`in e&&typeof e._def==`object`&&`typeName`in e._def}(e))return function(r,i,a){try{return Promise.resolve(O(function(){return Promise.resolve(e[n.mode===`sync`?`parse`:`parseAsync`](r,t)).then(function(e){return a.shouldUseNativeValidation&&w({},a),{errors:{},values:n.raw?Object.assign({},r):e}})},function(e){if(function(e){return Array.isArray(e?.issues)}(e))return{values:{},errors:T(k(e.errors,!a.shouldUseNativeValidation&&a.criteriaMode===`all`),a)};throw e}))}catch(e){return Promise.reject(e)}};if(function(e){return`_zod`in e&&typeof e._zod==`object`}(e))return function(r,a,s){try{return Promise.resolve(O(function(){return Promise.resolve((n.mode===`sync`?i:o)(e,r,t)).then(function(e){return s.shouldUseNativeValidation&&w({},s),{errors:{},values:n.raw?Object.assign({},r):e}})},function(e){if(function(e){return e instanceof c}(e))return{values:{},errors:T(A(e.issues,!s.shouldUseNativeValidation&&s.criteriaMode===`all`),s)};throw e}))}catch(e){return Promise.reject(e)}};throw Error(`Invalid input: not a Zod schema`)}var M=_,N=x.createContext(null),P=({...e})=>(0,S.jsx)(N.Provider,{value:{name:e.name},children:(0,S.jsx)(b,{...e})}),F=()=>{let e=x.useContext(N),t=x.useContext(I);if(!e)throw Error(`useFormField should be used within <FormField>`);let{getFieldState:n}=m(),r=g({name:e.name}),i=n(e.name,r),{id:a}=t;return{id:a,name:e.name,formItemId:`${a}-form-item`,formDescriptionId:`${a}-form-item-description`,formMessageId:`${a}-form-item-message`,...i}},I=x.createContext({});function L({className:e,...t}){let n=x.useId();return(0,S.jsx)(I.Provider,{value:{id:n},children:(0,S.jsx)(`div`,{"data-slot":`form-item`,className:r(`grid gap-2`,e),...t})})}function R({className:e,...t}){let{error:n,formItemId:i}=F();return(0,S.jsx)(d,{"data-slot":`form-label`,"data-error":!!n,className:r(`data-[error=true]:text-destructive`,e),htmlFor:i,...t})}function z({...e}){let{error:t,formItemId:n,formDescriptionId:r,formMessageId:i}=F();return(0,S.jsx)(l,{"data-slot":`form-control`,id:n,"aria-describedby":t?`${r} ${i}`:`${r}`,"aria-invalid":!!t,...e})}function B({className:e,...t}){let{formDescriptionId:n}=F();return(0,S.jsx)(`p`,{"data-slot":`form-description`,id:n,className:r(`text-muted-foreground text-sm`,e),...t})}function V({className:e,...t}){let{error:n,formMessageId:i}=F(),a=n?String(n?.message??``):t.children;return a?(0,S.jsx)(`p`,{"data-slot":`form-message`,id:i,className:r(`text-destructive text-sm`,e),...t,children:a}):null}L.__docgenInfo={description:``,methods:[],displayName:`FormItem`},R.__docgenInfo={description:``,methods:[],displayName:`FormLabel`},z.__docgenInfo={description:``,methods:[],displayName:`FormControl`},B.__docgenInfo={description:``,methods:[],displayName:`FormDescription`},V.__docgenInfo={description:``,methods:[],displayName:`FormMessage`},P.__docgenInfo={description:``,methods:[],displayName:`FormField`};var H={title:`UI/Form`,component:M,parameters:{layout:`centered`,docs:{story:{inline:!1}}},tags:[`autodocs`]},U=a({username:s().min(2,{message:`Username must be at least 2 characters.`}),email:s().email({message:`Please enter a valid email address.`})}),W={args:{},render:()=>(0,S.jsx)(()=>{let e=y({resolver:j(U),defaultValues:{username:``,email:``}}),t=e=>{console.log(e),alert(JSON.stringify(e,null,2))};return(0,S.jsx)(M,{...e,children:(0,S.jsxs)(`form`,{onSubmit:e.handleSubmit(t),className:`w-[350px] space-y-6`,children:[(0,S.jsx)(P,{control:e.control,name:`username`,render:({field:e})=>(0,S.jsxs)(L,{children:[(0,S.jsx)(R,{children:`Username`}),(0,S.jsx)(z,{children:(0,S.jsx)(f,{placeholder:`Enter username`,...e})}),(0,S.jsx)(B,{children:`This is your public display name.`}),(0,S.jsx)(V,{})]})}),(0,S.jsx)(P,{control:e.control,name:`email`,render:({field:e})=>(0,S.jsxs)(L,{children:[(0,S.jsx)(R,{children:`Email`}),(0,S.jsx)(z,{children:(0,S.jsx)(f,{placeholder:`email@example.com`,type:`email`,...e})}),(0,S.jsx)(V,{})]})}),(0,S.jsx)(u,{type:`submit`,className:`w-full`,children:`Submit`})]})})},{})},G={args:{},render:()=>(0,S.jsx)(()=>{let e=y({resolver:j(U),defaultValues:{username:`a`,email:`invalid`}});(0,x.useEffect)(()=>{e.trigger()},[e]);let t=e=>{console.log(e)};return(0,S.jsx)(M,{...e,children:(0,S.jsxs)(`form`,{onSubmit:e.handleSubmit(t),className:`w-[350px] space-y-6`,children:[(0,S.jsx)(P,{control:e.control,name:`username`,render:({field:e})=>(0,S.jsxs)(L,{children:[(0,S.jsx)(R,{children:`Username`}),(0,S.jsx)(z,{children:(0,S.jsx)(f,{placeholder:`Enter username`,...e})}),(0,S.jsx)(B,{children:`This is your public display name.`}),(0,S.jsx)(V,{})]})}),(0,S.jsx)(P,{control:e.control,name:`email`,render:({field:e})=>(0,S.jsxs)(L,{children:[(0,S.jsx)(R,{children:`Email`}),(0,S.jsx)(z,{children:(0,S.jsx)(f,{placeholder:`email@example.com`,type:`email`,...e})}),(0,S.jsx)(V,{})]})}),(0,S.jsx)(u,{type:`submit`,className:`w-full`,children:`Submit`})]})})},{})},K=a({name:s().min(1,{message:`Name is required.`})}),q={args:{},render:()=>(0,S.jsx)(()=>{let e=y({resolver:j(K),defaultValues:{name:``}}),t=e=>{console.log(e),alert(`Hello, ${e.name}!`)};return(0,S.jsx)(M,{...e,children:(0,S.jsxs)(`form`,{onSubmit:e.handleSubmit(t),className:`w-[350px] space-y-6`,children:[(0,S.jsx)(P,{control:e.control,name:`name`,render:({field:e})=>(0,S.jsxs)(L,{children:[(0,S.jsx)(R,{children:`Name`}),(0,S.jsx)(z,{children:(0,S.jsx)(f,{placeholder:`Enter your name`,...e})}),(0,S.jsx)(B,{children:`What should we call you?`}),(0,S.jsx)(V,{})]})}),(0,S.jsx)(u,{type:`submit`,className:`w-full`,children:`Submit`})]})})},{})};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {} as any,
  render: () => {
    const FormExample = () => {
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: '',
          email: ''
        }
      });
      const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        alert(JSON.stringify(values, null, 2));
      };
      return <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-[350px] space-y-6">
            <FormField control={form.control} name="username" render={({
            field
          }) => <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>} />
            <FormField control={form.control} name="email" render={({
            field
          }) => <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>;
    };
    return <FormExample />;
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {} as any,
  render: () => {
    const FormExample = () => {
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: 'a',
          email: 'invalid'
        }
      });

      // Trigger validation to show errors
      useEffect(() => {
        form.trigger();
      }, [form]);
      const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
      };
      return <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-[350px] space-y-6">
            <FormField control={form.control} name="username" render={({
            field
          }) => <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>} />
            <FormField control={form.control} name="email" render={({
            field
          }) => <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>;
    };
    return <FormExample />;
  }
}`,...G.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {} as any,
  render: () => {
    const FormExample = () => {
      const form = useForm<z.infer<typeof simpleSchema>>({
        resolver: zodResolver(simpleSchema),
        defaultValues: {
          name: ''
        }
      });
      const onSubmit = (values: z.infer<typeof simpleSchema>) => {
        console.log(values);
        alert(\`Hello, \${values.name}!\`);
      };
      return <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-[350px] space-y-6">
            <FormField control={form.control} name="name" render={({
            field
          }) => <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormDescription>What should we call you?</FormDescription>
                  <FormMessage />
                </FormItem>} />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>;
    };
    return <FormExample />;
  }
}`,...q.parameters?.docs?.source}}};var J=[`Default`,`WithError`,`SingleField`];export{W as Default,q as SingleField,G as WithError,J as __namedExportsOrder,H as default};