
var result;
var myElement;
var detailId;
var theUrl="/api/rest/things";
var cy;
var myObject;
var myProperties;

var toNetjson=function (result) {
    var nodes=[];
    var edges=[];
    var elements={nodes:"",edges:""};

    for(var i=0;i<result.length;i++){
        console.log("xxx",result.length);
        nodes.push({
            data:{id:result[i].properties.zigbee_networkaddress,name:result[i].label+" "+result[i].properties.zigbee_lastupdate.slice(0,10)+" "+result[i].properties.zigbee_lastupdate.slice(11,19),weight: 15, faveColor: '#EDA1ED', faveShape: 'ellipse'}
        });
    }

    for (var j=0;j<result.length;j++){
        if(result[j].properties.zigbee_neighbors){
            var ifNeigh=eval(result[j].properties.zigbee_neighbors).length;
            if(ifNeigh){
                for (var z=0;z<ifNeigh;z++){
                    var test2=eval(result[j].properties.zigbee_neighbors)[z];
                    edges.push({
                        data:{source:result[j].properties.zigbee_networkaddress,target:test2.address, faveColor: '#6FB1FC',label:test2.lqi}
                    })
                }
            }
        }

    }

    console.log("nodes is ",nodes);
    console.log("edges is ",edges);
    elements.nodes=nodes;
    elements.edges=edges;
    console.log("element",elements)
    myElement=elements;
    console.log("my element ",myElement);
}
var myHttp=function(theUrl) {

   $.ajax(theUrl,{
       success:function (res) {
           console.log("get response",res);
          result=res;
          console.log("this result",result)
       }
   })
       .done(function (res) {
           console.log("done res",res);
       })
    console.log("??result",result)

}
var delay=function () {
    setTimeout(function () {
        console.log("3 sec");
        toNetjson(result);
        drawTopology(myElement);
    },3000);
}
var drawTopology=function(myElement){
    cy=cytoscape({
        container: document.getElementById('cy'),

        layout: {
            name: 'cose',
            padding: 10,
            randomize: true
        },

        style: cytoscape.stylesheet()
            .selector('node')
            .css({
                'shape': 'data(faveShape)',
                'width': 'mapData(weight, 40, 80, 20, 60)',
                'content': 'data(name)',
                'text-valign': 'center',
                'text-outline-width': 2,
                'text-outline-color': 'data(faveColor)',
                'background-color': 'data(faveColor)',
                'color': '#fff',
            })
            .selector(':selected')
            .css({
                'border-width': 3,
                'border-color': '#333'
            })
            .selector('edge')
            .css({
                'curve-style': 'bezier',
                'opacity': 0.666,
                'width': 'mapData(strength, 70, 100, 2, 6)',
                'target-arrow-shape': 'triangle',
                'source-arrow-shape': 'circle',
                'line-color': 'data(faveColor)',
                'source-arrow-color': 'data(faveColor)',
                'target-arrow-color': 'data(faveColor)',
                'label': 'data(label)'
            })
            .selector('edge.questionable')
            .css({
                'line-style': 'dotted',
                'target-arrow-shape': 'diamond'
            })

            .selector('.top-left')
            .css({
                'text-valign': 'top',
                'text-halign': 'left'
            })

            .selector('.faded')
            .css({
                'opacity': 0.25,
                'text-opacity': 0
            }),

        elements:myElement,


        ready:function () {
            window.cy=this;
        }

    });
    cy.$('node').once('click',function (e) {
        var ele=e.target;
        console.log("clicked",ele.id());
        detailId=ele.id();
        console.log("what i get",detailId);
        console.log("type",typeof detailId);
       findDetailById(detailId);
    })
};
var findDetailById=function (detailId) {
    for (var i=0;i<result.length;i++){
        if(result[i].properties.zigbee_networkaddress===detailId){
            console.log("the object",result[i]);
            myObject=result[i];
            console.log("my object",myObject);
            myProperties=myObject.properties;
            console.log("my properties",myProperties);
            $('#table').empty();
            for( var key in myProperties){
                $('#table').append('<thead><tr><th>' + key + '</th></tr></thead>'
                    +'<tbody><tr><td>'+myProperties[key]+'</td></tr></tbody>')
            }
        }
    }
}

function loadData() {
    myHttp(theUrl);
    console.log("load data result",result);
    delay();
}
loadData();
setInterval(loadData,30000);

















