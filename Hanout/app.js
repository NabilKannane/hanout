const http = require('http');
const fs = require('fs');
const url = require('url');

const prods = require('./produit');

const home = fs.readFileSync(__dirname+"/template/home.html","utf-8",);
const contact = fs.readFileSync(__dirname+"/template/contact.html","utf-8");

const server = http.createServer((request,response)=>{
    var path = url.parse(request.url).pathname;    

    if(path == "/"){
        fs.readFile(__dirname+"/template/index.html",function(err,data){
            if(err){
                response.writeHead(404);
                response.write("file not found !");
            }else{
                console.table(prods);
                for(let i=0;i<prods.length;i++){
                    data = data+home.replace("{% produits %}",
                    `<div class="product">
                    <img src="${prods[i].image}" alt="" width="250">
                    <h3>${prods[i].marque} : ${prods[i].modele}</h3>
                    <h4>Ram : ${prods[i].ram}</h4>
                    <h4>HDD : ${prods[i].hdd} ${prods[i].isSSD}</h4>
                    <h4>CPU : ${prods[i].processeur}</h4>
                    <h4>description : ${prods[i].description}</h4>
                </div>`)

                // data = home.replace("{% srcImg %}",prods[i].image);
                // data = data.replace("{% marque %}",prods[i].marque); 
                // data = data.replace("{% modele %}",prods[i].modele); 
                // data = data.replace("{% ram %}",prods[i].ram); 
                // data = data.replace("{% hdd %}",prods[i].hdd);
                // if(prods[i].isSSD)data = data.replace("{% isSSD %}","SSD");
                // else{data = data.replace("{% isSSD %}","HDD");}
                // data = data.replace("{% processeur %}",prods[i].processeur);
                // data = data.replace("{% description %}",prods[i].description);
                }

                response.end(data);
            }

            response.end();
        });

    }
    if(path == "/contact"){
        fs.readFile(__dirname+"/template/index.html", function(err,data){
            if(err){
                response.writeHead(404);
                response.write("File not found !");
            }else{
                response.write(data);
            }
            response.end();
        })
    }
    if(path == "/addproduct"){
        fs.readFile(__dirname+"/template/index.html", function(err,data){
            if(err){
                response.writeHead(404);
                response.write("File not found !");
            }else{
                response.write(data);
            }
            response.end();
        })
    }

    if(request.url.indexOf('.css') != -1){ //req.url has the pathname, check if it conatins '.css'
        fs.readFile(__dirname + '/template/style/style.css', function (err, data) {
          if (err) console.log(err);
          response.writeHead(200, {'Content-Type': 'text/css'});
          response.write(data);
          response.end();
        })
    }

}).listen(3030);
console.log('Server running at http://127.0.0.1:3030/');