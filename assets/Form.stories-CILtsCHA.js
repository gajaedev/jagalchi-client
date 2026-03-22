import{j as t}from"./jsx-runtime-CCaZ3Xqs.js";import{r as d}from"./iframe-P3gPBkhb.js";import{g as P,s as N,b as T,F as K,C as Q,c as X,d as Y,u as O}from"./index.esm-DQzQL657.js";import{S as ee}from"./index-D6poOmaW.js";import{L as re}from"./label-DMDNHY_A.js";import{c as S}from"./utils-CDN07tui.js";import{I as g}from"./input-CwuatZbt.js";import{B as V}from"./button-BdW2YrJv.js";import{o as B,s as z}from"./types-CxSZrmmY.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DDRDqzXw.js";import"./index-Amd8F7xL.js";import"./index-JN8nqcUi.js";import"./index-B_jtOnfb.js";const D=(r,n,o)=>{if(r&&"reportValidity"in r){const e=P(o,n);r.setCustomValidity(e&&e.message||""),r.reportValidity()}},C=(r,n)=>{for(const o in n.fields){const e=n.fields[o];e&&e.ref&&"reportValidity"in e.ref?D(e.ref,o,r):e&&e.refs&&e.refs.forEach(m=>D(m,o,r))}},L=(r,n)=>{n.shouldUseNativeValidation&&C(r,n);const o={};for(const e in r){const m=P(n.fields,e),i=Object.assign(r[e]||{},{ref:m&&m.ref});if(oe(n.names||Object.keys(r),e)){const s=Object.assign({},P(o,e));N(s,"root",i),N(o,e,s)}else N(o,e,i)}return o},oe=(r,n)=>{const o=M(n);return r.some(e=>M(e).match(`^${o}\\.\\d+`))};function M(r){return r.replace(/\]|\[/g,"")}function A(r,n,o){function e(a,l){var c;Object.defineProperty(a,"_zod",{value:a._zod??{},enumerable:!1}),(c=a._zod).traits??(c.traits=new Set),a._zod.traits.add(r),n(a,l);for(const u in s.prototype)u in a||Object.defineProperty(a,u,{value:s.prototype[u].bind(a)});a._zod.constr=s,a._zod.def=l}const m=o?.Parent??Object;class i extends m{}Object.defineProperty(i,"name",{value:r});function s(a){var l;const c=o?.Parent?new i:this;e(c,a),(l=c._zod).deferred??(l.deferred=[]);for(const u of c._zod.deferred)u();return c}return Object.defineProperty(s,"init",{value:e}),Object.defineProperty(s,Symbol.hasInstance,{value:a=>o?.Parent&&a instanceof o.Parent?!0:a?._zod?.traits?.has(r)}),Object.defineProperty(s,"name",{value:r}),s}class ne extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}}const te={};function Z(r){return te}function se(r,n){return typeof n=="bigint"?n.toString():n}const R=Error.captureStackTrace?Error.captureStackTrace:(...r)=>{};function x(r){return typeof r=="string"?r:r?.message}function k(r,n,o){const e={...r,path:r.path??[]};if(!r.message){const m=x(r.inst?._zod.def?.error?.(r))??x(n?.error?.(r))??x(o.customError?.(r))??x(o.localeError?.(r))??"Invalid input";e.message=m}return delete e.inst,delete e.continue,n?.reportInput||delete e.input,e}const W=(r,n)=>{r.name="$ZodError",Object.defineProperty(r,"_zod",{value:r._zod,enumerable:!1}),Object.defineProperty(r,"issues",{value:n,enumerable:!1}),Object.defineProperty(r,"message",{get(){return JSON.stringify(n,se,2)},enumerable:!0}),Object.defineProperty(r,"toString",{value:()=>r.message,enumerable:!1})},ae=A("$ZodError",W),J=A("$ZodError",W,{Parent:Error}),ie=r=>(n,o,e,m)=>{const i=e?Object.assign(e,{async:!1}):{async:!1},s=n._zod.run({value:o,issues:[]},i);if(s instanceof Promise)throw new ne;if(s.issues.length){const a=new(m?.Err??r)(s.issues.map(l=>k(l,i,Z())));throw R(a,m?.callee),a}return s.value},me=ie(J),le=r=>async(n,o,e,m)=>{const i=e?Object.assign(e,{async:!0}):{async:!0};let s=n._zod.run({value:o,issues:[]},i);if(s instanceof Promise&&(s=await s),s.issues.length){const a=new(m?.Err??r)(s.issues.map(l=>k(l,i,Z())));throw R(a,m?.callee),a}return s.value},ce=le(J);function U(r,n){try{var o=r()}catch(e){return n(e)}return o&&o.then?o.then(void 0,n):o}function ue(r,n){for(var o={};r.length;){var e=r[0],m=e.code,i=e.message,s=e.path.join(".");if(!o[s])if("unionErrors"in e){var a=e.unionErrors[0].errors[0];o[s]={message:a.message,type:a.code}}else o[s]={message:i,type:m};if("unionErrors"in e&&e.unionErrors.forEach(function(u){return u.errors.forEach(function(w){return r.push(w)})}),n){var l=o[s].types,c=l&&l[e.code];o[s]=T(s,n,o,m,c?[].concat(c,e.message):e.message)}r.shift()}return o}function de(r,n){for(var o={};r.length;){var e=r[0],m=e.code,i=e.message,s=e.path.join(".");if(!o[s])if(e.code==="invalid_union"&&e.errors.length>0){var a=e.errors[0][0];o[s]={message:a.message,type:a.code}}else o[s]={message:i,type:m};if(e.code==="invalid_union"&&e.errors.forEach(function(u){return u.forEach(function(w){return r.push(w)})}),n){var l=o[s].types,c=l&&l[e.code];o[s]=T(s,n,o,m,c?[].concat(c,e.message):e.message)}r.shift()}return o}function $(r,n,o){if(o===void 0&&(o={}),(function(e){return"_def"in e&&typeof e._def=="object"&&"typeName"in e._def})(r))return function(e,m,i){try{return Promise.resolve(U(function(){return Promise.resolve(r[o.mode==="sync"?"parse":"parseAsync"](e,n)).then(function(s){return i.shouldUseNativeValidation&&C({},i),{errors:{},values:o.raw?Object.assign({},e):s}})},function(s){if((function(a){return Array.isArray(a?.issues)})(s))return{values:{},errors:L(ue(s.errors,!i.shouldUseNativeValidation&&i.criteriaMode==="all"),i)};throw s}))}catch(s){return Promise.reject(s)}};if((function(e){return"_zod"in e&&typeof e._zod=="object"})(r))return function(e,m,i){try{return Promise.resolve(U(function(){return Promise.resolve((o.mode==="sync"?me:ce)(r,e,n)).then(function(s){return i.shouldUseNativeValidation&&C({},i),{errors:{},values:o.raw?Object.assign({},e):s}})},function(s){if((function(a){return a instanceof ae})(s))return{values:{},errors:L(de(s.issues,!i.shouldUseNativeValidation&&i.criteriaMode==="all"),i)};throw s}))}catch(s){return Promise.reject(s)}};throw new Error("Invalid input: not a Zod schema")}const E=K,H=d.createContext(null),f=({...r})=>t.jsx(H.Provider,{value:{name:r.name},children:t.jsx(Q,{...r})}),I=()=>{const r=d.useContext(H),n=d.useContext(q);if(!r)throw new Error("useFormField should be used within <FormField>");const{getFieldState:o}=X(),e=Y({name:r.name}),m=o(r.name,e),{id:i}=n;return{id:i,name:r.name,formItemId:`${i}-form-item`,formDescriptionId:`${i}-form-item-description`,formMessageId:`${i}-form-item-message`,...m}},q=d.createContext({});function p({className:r,...n}){const o=d.useId();return t.jsx(q.Provider,{value:{id:o},children:t.jsx("div",{"data-slot":"form-item",className:S("grid gap-2",r),...n})})}function h({className:r,...n}){const{error:o,formItemId:e}=I();return t.jsx(re,{"data-slot":"form-label","data-error":!!o,className:S("data-[error=true]:text-destructive",r),htmlFor:e,...n})}function F({...r}){const{error:n,formItemId:o,formDescriptionId:e,formMessageId:m}=I();return t.jsx(ee,{"data-slot":"form-control",id:o,"aria-describedby":n?`${e} ${m}`:`${e}`,"aria-invalid":!!n,...r})}function _({className:r,...n}){const{formDescriptionId:o}=I();return t.jsx("p",{"data-slot":"form-description",id:o,className:S("text-muted-foreground text-sm",r),...n})}function y({className:r,...n}){const{error:o,formMessageId:e}=I(),m=o?String(o?.message??""):n.children;return m?t.jsx("p",{"data-slot":"form-message",id:e,className:S("text-destructive text-sm",r),...n,children:m}):null}p.__docgenInfo={description:"",methods:[],displayName:"FormItem"};h.__docgenInfo={description:"",methods:[],displayName:"FormLabel"};F.__docgenInfo={description:"",methods:[],displayName:"FormControl"};_.__docgenInfo={description:"",methods:[],displayName:"FormDescription"};y.__docgenInfo={description:"",methods:[],displayName:"FormMessage"};f.__docgenInfo={description:"",methods:[],displayName:"FormField"};const Ne={title:"UI/Form",component:E,parameters:{layout:"centered",docs:{story:{inline:!1}}},tags:["autodocs"]},G=B({username:z().min(2,{message:"Username must be at least 2 characters."}),email:z().email({message:"Please enter a valid email address."})}),b={args:{},render:()=>{const r=()=>{const n=O({resolver:$(G),defaultValues:{username:"",email:""}}),o=e=>{console.log(e),alert(JSON.stringify(e,null,2))};return t.jsx(E,{...n,children:t.jsxs("form",{onSubmit:n.handleSubmit(o),className:"w-[350px] space-y-6",children:[t.jsx(f,{control:n.control,name:"username",render:({field:e})=>t.jsxs(p,{children:[t.jsx(h,{children:"Username"}),t.jsx(F,{children:t.jsx(g,{placeholder:"Enter username",...e})}),t.jsx(_,{children:"This is your public display name."}),t.jsx(y,{})]})}),t.jsx(f,{control:n.control,name:"email",render:({field:e})=>t.jsxs(p,{children:[t.jsx(h,{children:"Email"}),t.jsx(F,{children:t.jsx(g,{placeholder:"email@example.com",type:"email",...e})}),t.jsx(y,{})]})}),t.jsx(V,{type:"submit",className:"w-full",children:"Submit"})]})})};return t.jsx(r,{})}},j={args:{},render:()=>{const r=()=>{const n=O({resolver:$(G),defaultValues:{username:"a",email:"invalid"}});d.useEffect(()=>{n.trigger()},[n]);const o=e=>{console.log(e)};return t.jsx(E,{...n,children:t.jsxs("form",{onSubmit:n.handleSubmit(o),className:"w-[350px] space-y-6",children:[t.jsx(f,{control:n.control,name:"username",render:({field:e})=>t.jsxs(p,{children:[t.jsx(h,{children:"Username"}),t.jsx(F,{children:t.jsx(g,{placeholder:"Enter username",...e})}),t.jsx(_,{children:"This is your public display name."}),t.jsx(y,{})]})}),t.jsx(f,{control:n.control,name:"email",render:({field:e})=>t.jsxs(p,{children:[t.jsx(h,{children:"Email"}),t.jsx(F,{children:t.jsx(g,{placeholder:"email@example.com",type:"email",...e})}),t.jsx(y,{})]})}),t.jsx(V,{type:"submit",className:"w-full",children:"Submit"})]})})};return t.jsx(r,{})}},fe=B({name:z().min(1,{message:"Name is required."})}),v={args:{},render:()=>{const r=()=>{const n=O({resolver:$(fe),defaultValues:{name:""}}),o=e=>{console.log(e),alert(`Hello, ${e.name}!`)};return t.jsx(E,{...n,children:t.jsxs("form",{onSubmit:n.handleSubmit(o),className:"w-[350px] space-y-6",children:[t.jsx(f,{control:n.control,name:"name",render:({field:e})=>t.jsxs(p,{children:[t.jsx(h,{children:"Name"}),t.jsx(F,{children:t.jsx(g,{placeholder:"Enter your name",...e})}),t.jsx(_,{children:"What should we call you?"}),t.jsx(y,{})]})}),t.jsx(V,{type:"submit",className:"w-full",children:"Submit"})]})})};return t.jsx(r,{})}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}};const Pe=["Default","WithError","SingleField"];export{b as Default,v as SingleField,j as WithError,Pe as __namedExportsOrder,Ne as default};
