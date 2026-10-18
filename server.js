var http=require('http'),fs=require('fs'),path=require('path');
var ROOT=__dirname;
var MIME={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.txt':'text/plain; charset=utf-8','.png':'image/png','.json':'application/json; charset=utf-8'};
http.createServer(function(req,res){
  var u=decodeURIComponent((req.url||'/').split('?')[0]);
  if(u==='/api/files'){
    var dir=path.join(ROOT,'files');
    fs.readdir(dir,function(e,files){
      if(e)return res.end('[]');
      var list=files.filter(function(f){return /\.txt$/i.test(f)});
      res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
      res.end(JSON.stringify(list));
    });
    return;
  }
  var p=path.normalize(path.join(ROOT,u));
  if(p.indexOf(ROOT)!==0){res.writeHead(403);return res.end('forbidden')}
  fs.readFile(p,function(e,d){
    if(e){res.writeHead(404);return res.end('not found')}
    res.writeHead(200,{'Content-Type':MIME[path.extname(p)]||'application/octet-stream'});
    res.end(d);
  });
}).listen(8080,function(){console.log('Сервер запущен: http://localhost:8080 (для остановки Ctrl+C)')});