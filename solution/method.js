function init (data) {
  return new Promise(function (resolve) {
    setTimeout(resolve(data),50)
  })
}
export default{
  getnote(id) {
    const Arr=[
      {title: 'vue学习笔记', content: '感谢你一直以来的肯定', id: '0'},
      {title: 'vue学习笔记', content: 'W中国人真是自豪啊', id: '1'},
      {title: 'vue学习笔记', content: 'S今天怎么又短路了', id: '2'}
    ]
    if(id){
      for(var i=0;i<Arr.length;i++){
        if(id-0==Arr[i].id){
          return init(Arr[i])
        }
      }
  }else{
    return init(Arr)
  }
  }
}
