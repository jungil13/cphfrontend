import l from"./Forum-Cz7UU7sc.js";import{_ as p,c as n,b as m,a as e,F as _,l as u,o as a,t as s,p as f,f as h,r as b}from"./index-DTcQMwFa.js";const x={components:{Forum:l},data(){return{topics:[{id:1,title:"How to care for a new puppy?",description:"Looking for tips on taking care of a new puppy.",userName:"John Doe",comments:12},{id:2,title:"Best food for older cats?",description:"What kind of food is best for senior cats?",userName:"Jane Smith",comments:8}]}},methods:{addNewTopic(){},viewTopic(o){this.$router.push({name:"TopicDetail",params:{id:o}})}}},w=o=>(f("data-v-8f39f043"),o=o(),h(),o),g={class:"w-full"},v={class:"bg-white p-5 text-center shadow-xl mb-8"},y=w(()=>e("h1",{class:"text-2xl text-gray-700 font-extrabold mb-6"},"Training and Behavior Forum",-1)),k=["onClick"],N={class:"flex justify-between items-center"},T={class:"text-xl font-bold text-gray-800 mb-4"},F={class:"text-gray-600"},B={class:"text-sm text-gray-500 mb-4"},C={class:"text-center"},S={class:"text-blue-700 font-semibold"};function I(o,i,D,J,d,r){const c=b("Forum");return a(),n("div",g,[m(c),e("div",v,[y,e("button",{onClick:i[0]||(i[0]=(...t)=>r.addNewTopic&&r.addNewTopic(...t)),class:"bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold transform transition-transform hover:scale-105 duration-300"}," Add New Topic ")]),(a(!0),n(_,null,u(d.topics,t=>(a(),n("div",{key:t.id,onClick:L=>r.viewTopic(t.id),class:"w-full bg-white p-5 shadow-lg mb-4 rounded-lg border border-gray-800 cursor-pointer"},[e("div",N,[e("div",null,[e("h2",T,s(t.title),1),e("p",F,s(t.description),1),e("p",B,"Posted by "+s(t.userName),1)]),e("div",C,[e("span",S,s(t.comments)+" Comments",1)])])],8,k))),128))])}const j=p(x,[["render",I],["__scopeId","data-v-8f39f043"]]);export{j as default};
