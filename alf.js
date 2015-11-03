var request = require("request"),
	cheerio = require("cheerio"),
	express = require("express"),
	ejs = require('ejs'),
	fs = require('fs'),

	url = "http://www.github.com/trending",
	title = "Trending repos on GitHub",
	arrNoms=[], arrDesc=[], arrLinks=[];


var app = express();//.scrapGithub();
	app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('githubTrends.ejs', { title:title,arrNoms:arrNoms });
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

					/////     SCRAPPER y Guardado  /////

request(url, function (error, response, body) {
	if (!error) {
		var $ = cheerio.load(body,{xmlMode: true}),

			nombre = $(".repo-list-name").each(function(i, elem) {
  			arrNoms[i] = $(this).text().replace(/\s+/g, "");
				arrLinks[i] = $(this).children().attr("href");
			});

			descripcion=$(".repo-list-description").each(function(i,eleme) {
				arrDesc[i] = $(this).text();

			});
			var textNoms=arrNoms.join(", ");//+descripcion;
			var textLinks=arrLinks.join("");
			var textDesc=	arrDesc.join(" ");

						//// guardar datos en archivo /////

			fs.writeFile('datos.txt', ["textNoms= \n",textNoms,"\n","textLinks=\n\n",textLinks,"\n\n",textDesc], function (err) {

				if (err) return console.log(err);
				console.log('guardando datos en datos.txt');
			});


	} else { /// si hay un error
		console.log("We’ve encountered an error: " + error);
	}
});
