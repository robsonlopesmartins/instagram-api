/**************************************
* Popula os dados para montar um
* mosaico com imagens da API do
* Instagram.
* Requisita: vue.js
**************************************/
var Mosaico = (function(){
  var config = {
    accessToken: '3563392451.38e05d8.752a00a710c148b49138a67926b542ec', // Instagram token de acesso
    limit: '11', /// Número de midias a mostrar
    selector: '#mosaico' /// Seletor do mosaico
  }
  var endpoint = 'https://api.instagram.com/v1/users/self/media/recent/';
  var apiRequest = endpoint + '?access_token=' + config.accessToken + '&count=' + config.limit;

  /**************************************
  * Inicia o Vue e chama a coneção quando
  * tudo estiver pronto
  **************************************/
  function vueInit(){
    var app = new Vue({
      el: config.selector,
      data: {
        midias: []
      },
      created: function(){
        connection(this);
      }
    })
  }

  /**************************************
  * Conecta com a API e chama a função
  * para servir o retorno
  **************************************/
  function connection(app){
    $.ajax({
      url: apiRequest,
      type: "GET",
      dataType: "jsonp",
      success: function(res){
        serveData(res, app);
      }
    });
  }

  /**************************************
  * Trata o retorno da API e libera para
  * ser consumida no front
  **************************************/
  function serveData(res, app){
    var data = [];
    res.data.map(function(item, key){
      var rand = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
      data.push({
        index: key,
        image: item.images.standard_resolution.url,
        thumb: item.images.thumbnail.url,
        link: item.link,
        desc: item.caption.text,
        classEffect: 'effect-' + rand
      });
    });
    app.midias = data;
  }

  return{
    init: vueInit
  }
}());

