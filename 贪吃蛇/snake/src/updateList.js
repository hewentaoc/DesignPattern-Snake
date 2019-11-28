 
 /* 
   更新list数组中的数据 */
 function UpdateList(score) {
    var obj = {
        score:  score,
        date : new Date().toLocaleDateString(),
    }
    list.push(obj);

    list.sort(function (a,b){
        return b.score - a.score ;
    })
    list = list.filter(function(ele,index){
        return index <=9;
    })
    localStorage.setItem('list',JSON.stringify(list))
    renderPage(list);
 }

 /* 
  渲染页面 */
function renderPage(arr){
    var str = '';
    arr.forEach(function (ele,index) {
        str += "<tr>\
            <td>"+ (Number(index) + 1)+"</td> \
            <td>"+ ele.score +"</td> \
            <td>"+ ele.date +"</td> \
        </tr>" 
    })
    table.innerHTML = str;
}

var olist = localStorage.getItem('list');
if(typeof JSON.parse(olist) == 'object' && olist != null){
    list = JSON.parse(olist);
    renderPage(list)
}
