import{_,q as o,c as h,a as e,e as n,t as l,d as x,o as b,p as f,f as y}from"./index-DTcQMwFa.js";const t=a=>(f("data-v-c73ddbc9"),a=a(),y(),a),g={class:"p-6 bg-gray-100 min-h-screen"},v=x('<div class="mb-6" data-v-c73ddbc9><h1 class="text-3xl font-bold text-gray-800 mb-4" data-v-c73ddbc9>Forum Management</h1><div class="flex justify-between items-center" data-v-c73ddbc9><div class="relative w-1/3" data-v-c73ddbc9><span class="absolute inset-y-0 left-0 flex items-center pl-3" data-v-c73ddbc9><span class="material-icons text-gray-500" data-v-c73ddbc9>search</span></span><input type="text" class="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search topics..." data-v-c73ddbc9></div></div></div>',1),m=t(()=>e("thead",{class:"bg-gray-200 text-gray-600 uppercase text-sm leading-normal"},[e("tr",null,[e("th",{class:"py-3 px-6 text-left"},"Topic Title"),e("th",{class:"py-3 px-6 text-left"},"Author"),e("th",{class:"py-3 px-6 text-center"},"Comments"),e("th",{class:"py-3 px-6 text-center"},"Created At"),e("th",{class:"py-3 px-6 text-center"},"Actions")])],-1)),w=t(()=>e("td",{class:"py-3 px-6 text-left whitespace-nowrap"},[e("span",{class:"font-medium"},"How to train a new puppy?")],-1)),C=t(()=>e("td",{class:"py-3 px-6 text-left"},[e("span",null,"John Doe")],-1)),S=t(()=>e("td",{class:"py-3 px-6 text-center"},[e("span",null,"15")],-1)),T=t(()=>e("td",{class:"py-3 px-6 text-center"},[e("span",null,"2024-08-30")],-1)),k=t(()=>e("span",{class:"material-icons text-blue-500"},"visibility",-1)),j=[k],P=t(()=>e("span",{class:"material-icons text-yellow-500"},"edit",-1)),D=[P],F=t(()=>e("span",{class:"material-icons text-red-500"},"delete",-1)),I=[F],N={class:"flex justify-between items-center mt-4"},V=["disabled"],A=t(()=>e("span",{class:"material-icons"},"navigate_before",-1)),B=["disabled"],M=t(()=>e("span",{class:"material-icons"},"navigate_next",-1)),E={__name:"ForumManagement",setup(a){const s=o(1),c=o(5);function i(){alert("View Topic Details Coming Soon!")}function d(){alert("Edit Topic Functionality Coming Soon!")}function r(){alert("Topic Deleted Successfully!")}function p(){s.value>1&&s.value--}function u(){s.value<c.value&&s.value++}return(q,H)=>(b(),h("div",g,[v,e("div",{class:"bg-white shadow rounded-lg overflow-hidden"},[e("table",{class:"min-w-full bg-white"},[m,e("tbody",{class:"text-gray-600 text-sm font-light"},[e("tr",{class:"border-b border-gray-200 hover:bg-gray-100"},[w,C,S,T,e("td",{class:"py-3 px-6 text-center"},[e("div",{class:"flex item-center justify-center space-x-2"},[e("button",{class:"w-8 h-8 rounded-full hover:bg-blue-100 flex items-center justify-center",onClick:i},j),e("button",{class:"w-8 h-8 rounded-full hover:bg-yellow-100 flex items-center justify-center",onClick:d},D),e("button",{class:"w-8 h-8 rounded-full hover:bg-red-100 flex items-center justify-center",onClick:r},I)])])])])])]),e("div",N,[e("button",{class:"bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 disabled:opacity-50",disabled:s.value===1,onClick:p},[A,n(" Previous ")],8,V),e("span",null,"Page "+l(s.value)+" of "+l(c.value),1),e("button",{class:"bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 disabled:opacity-50",disabled:s.value===c.value,onClick:u},[n(" Next "),M],8,B)])]))}},z=_(E,[["__scopeId","data-v-c73ddbc9"]]);export{z as default};