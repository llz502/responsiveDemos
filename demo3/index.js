var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.env.PORT || 8888;

var server = http.createServer(function(request, response){
  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query
  var method = request.method
  if(method === 'GET'){
    if(path === '/'){  
      var string = fs.readFileSync('./index.html')  
      response.setHeader('Content-Type', 'text/html;charset=utf-8')  

      let result = ''
      if(query.page === '1' || query.page === undefined){
        result = string.replace('{{pageNumbers}}',"1,2,3,4,5,6,7,8,9,10")
      }else if(query.page === '2'){
        result = string.replace('{{pageNumbers}}',"11,12,13,14,15,16,17,18,19,20")
      }if(query.page === '3'){
        result = string.replace('{{pageNumbers}}',"21,22,23,24,25,26,27,28,29,30")
      }
      result = result.replace('{{pageCount}}',3)
      result = result.replace('{{page}}',query.page)
      response.end(result)   
    }else{
      response.statusCode = 404
      response.setHeader('Content-Type', 'text/html;charset=utf-8') 
      response.end('找不到对应的路径，你需要自行修改 index.js')
    }
  }
  console.log(method + ' ' + request.url)
})

server.listen(port)
console.log('监听 ' + port + ' 成功，请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)

