const http = require('http');
const fs = require('fs');
const url = require('url');

const prods = require('./produit');

const home = fs.readFileSync(__dirname+"/template/home.html","utf-8",);
const contact = fs.readFileSync(__dirname+"/template/contact.html","utf-8");
const addproduct = fs.readFileSync(__dirname+"/template/addproduct.html","utf-8");

const server = http.createServer((request,response)=>{
    var path = url.parse(request.url).pathname;    

    if(path == "/"){
        fs.readFile(__dirname+"/template/home.html",function(err,data){
            if(err){
                response.writeHead(404);
                response.write("file not found !");
            }else{
                console.table(prods);
                let produits="";
                for(let i=0;i<prods.length;i++){
                produits = produits+`<div class="product">
                                    <img src="${prods[i].image}" alt="" width="250">
                                    <h3>${prods[i].marque} : ${prods[i].modele}</h3>
                                    <h4>Ram : ${prods[i].ram}</h4>
                                    <h4>HDD : ${prods[i].hdd} ${prods[i].isSSD}</h4>
                                    <h4>CPU : ${prods[i].processeur}</h4>
                                    <p>description : ${prods[i].description}</p>
                                    </div>`;
          }
                    data = home.replace("{% produits %}",produits);
                response.end(data);
            }
            response.end();
        });

    }

      // ================================== Contact =====================================

    if(path == "/contact"){
        fs.readFile(__dirname+"/template/contact.html", function(err,data){
            if(err){
                response.writeHead(404);
                response.write("File not found !");
            }else{
                data=contact.replace("{% contact %}",
                `<form action="">
                <h1>Contact Us</h1>
                <label for="email">Email :</label>
                <input type="email" name="email" placeholder="exemple@mail.com" width="150"><br>
                <label for="content">Content :</label><br>
                <textarea name="content" id="" cols="100" rows="10"></textarea></form>`)
                response.writeHead(200);
                response.write(data);
            }
            response.end();
        })
    }

  // ================================== Addproduct =====================================

    if(path == "/addproduct"){
        fs.readFile(__dirname+"/template/addproduct.html", function(err,data){
            if(err){
                response.writeHead(404);
                response.write("File not found !");
            }else{
                data = addproduct.replace("{% form %}",`<form action="">
                <label for="marque">Marque :</label>
                <input class="input" type="text" placeholder="Marque" name="marque"><br>
                <label for="mdoel">Model :</label>
                <input class="input" type="text" placeholder="Model" name="model"><br>
                <label for="ram">Ram :</label>
                <input class="input" type="number" placeholder="Ram" name="ram"><br>
                <label for="hdd">HDD :</label>
                <input class="input" type="number" placeholder="HDD" name="hdd"><br>
                <label for="ram">is SSD :</label><br>
                <input type="radio" >Yes<br>
                <input type="radio" >Non<br>
                <label for="cpu">CPU :</label>
                <input class="input" type="text" placeholder="CPU" name="cpu"><br>
                <label for="image">Image :</label>
                <input class="input" type="text" placeholder="Link Image" name="image"><br>
                <label for="description">Description :</label>
                <input class="input" type="text" placeholder="description" name="description"><br>
                <button>Ajouter</button>
            </form>`)
                response.writeHead(200);
                response.write(data);
            }
            response.end();
        })
    }

    // ================================== STYLE.CSS =====================================

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