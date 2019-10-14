var http = require('http');
var fs = require('fs')
var url = require('url')

function generateHtmlError(message){
    return '<!DOCTYPE html> <html><head><meta charset= "UTF-8"></head>'+
    '<body>'+

         '<center><div>'+
        '<center><h1>Erro!!!</h1>'+

        '<h5>Erro: '+message+'</h5>'+
        '<img src="data:image/png;base64,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"></img>'+
        '<h5>Para mais informações contacte os canais alternativos </h5>'+
        '<label id ="d">Insira o numero do ficheiro arq.xml que pretende ver:<label>'+
        '<input type = "number" min = "1" id ="numero">'+
        '<button onclick="openArqxml()">Pesquisar</button>'+
        '</div></center>'+
'<script>'+
'function openArqxml() {'+
  'var x = document.getElementById("numero").value;'+
    'window.location.href = x'+
'}'+
'</script>'+
        '</body>'+
    
    '</html>'
}

function send_error(res,message){
        res.writeHead(200, {'Content-Type': 'text/html; charset =utf-8'})
        res.write(generateHtmlError(message));
        res.end()
}

function writeContent(res,type,data){
    res.writeHead(200, {'Content-Type': type})
    res.write(data)
    res.end()
}

function handle_call(call,res){
    
    if(call ==  "arq2html.xsl"){

        fs.readFile('arq2html.xsl',function(err,data){
            if(err) 
                send_error(res,"Stylesheet arq2html.xsl nao foi encontrada no servidor.")
            else  
                writeContent(res,'text/xsl',data)
        })
    }
    else{

        fs.readFile('dataset/arq' + call +'.xml',function(err,data){
            if(err)
                send_error(res,"Finchero arq"+ call+ ".xml Inexistente.");
            else
                writeContent(res,'text/xml',data)
        })
    }

}


http.createServer(function (req, res) {
    var partes = req.url.split('/')
    var result = partes[partes.length-1];
    handle_call(result,res);
}).listen(7777)

console.log('servidor à escuta na porta 7777...')