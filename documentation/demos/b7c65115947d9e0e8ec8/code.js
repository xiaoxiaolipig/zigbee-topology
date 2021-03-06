
var result;
var myElement;
var detailId;
var theUrl="/api/rest/things";
var cy;
var myObject;
var myProperties;
var UID;
var nodeIdArr;
var edgeTargetArr;
var edgesDuplicate;

var toNetjson=function (result) {
    var nodes=[];
    var edges=[];
    edgesDuplicate=[];
    var elements={nodes:"",edges:""};
    var currentDate=new Date();
    console.log("current date",currentDate);
    var currentUTC=currentDate.toISOString();
    console.log("current UTC ",currentUTC);
     var currentUTCtime=new Date(currentUTC).getTime();
     console.log("current UTC UNIX ",currentUTCtime);
    for(var i=0;i<result.length;i++){
        console.log("result length",result.length);
        if(result[i].properties.zigbee_lastupdate){
            //var timeString=result[i].properties.zigbee_lastupdate.slice(0,10)+" "+result[i].properties.zigbee_lastupdate.slice(11,19);
            var timeString=result[i].properties.zigbee_lastupdate;
            console.log("original data time string ",timeString);
            var timeStamp=(new Date(timeString)).getTime();
            console.log("data time stamp ",timeStamp);
            var timeDiff=Math.floor((currentUTCtime-timeStamp)/1000);//in seconds
            console.log("time difference",timeDiff);


            if(result[i].properties.zigbee_logicaltype==="COORDINATOR"){
                if(timeDiff<=30){
                    nodes.push({
                        data:{id:result[i].properties.zigbee_networkaddress,name:result[i].properties.zigbee_networkaddress,weight: 75, faveColor: '#EDA1ED', faveShape: 'triangle'}
                    });
                }else if(30<timeDiff<=120){
                    nodes.push({
                        data:{id:result[i].properties.zigbee_networkaddress,name:result[i].properties.zigbee_networkaddress,weight: 75, faveColor: '#86B242', faveShape: 'triangle'}
                    });
                }else if(120<timeDiff<=180){
                    nodes.push({
                        data:{id:result[i].properties.zigbee_networkaddress,name:result[i].properties.zigbee_networkaddress,weight: 75, faveColor: '#6FB1FC', faveShape: 'triangle'}
                    });
                }else {
                    nodes.push({
                        data:{id:result[i].properties.zigbee_networkaddress,name:result[i].properties.zigbee_networkaddress,weight: 75, faveColor: '#F5A45D', faveShape: 'triangle'}
                    });
                }

            }else if(result[i].properties.zigbee_logicaltype==="ROUTER"){
                if(timeDiff<=30){
                    nodes.push({
                        data:{id:result[i].properties.zigbee_networkaddress,name:result[i].properties.zigbee_networkaddress,weight: 75, faveColor: '#EDA1ED', faveShape: 'octagon'}
                    });
                }else if(timeDiff>30&&timeDiff<=120){
                    nodes.push({
                        data:{id:result[i].properties.zigbee_networkaddress,name:result[i].properties.zigbee_networkaddress,weight: 75, faveColor: '#86B242', faveShape: 'octagon'}
                    });
                }else if(timeDiff>120&&timeDiff<=180){
                    nodes.push({
                        data:{id:result[i].properties.zigbee_networkaddress,name:result[i].properties.zigbee_networkaddress,weight: 75, faveColor: '#6FB1FC', faveShape: 'octagon'}
                    });
                }else {
                    nodes.push({
                        data:{id:result[i].properties.zigbee_networkaddress,name:result[i].properties.zigbee_networkaddress,weight: 75, faveColor: '#F5A45D', faveShape: 'octagon'}
                    });
                }

            }else if(result[i].properties.zigbee_logicaltype==="END_DEVICE"){
                if(timeDiff<=30){
                    nodes.push({
                        data:{id:result[i].properties.zigbee_networkaddress,name:result[i].properties.zigbee_networkaddress,weight: 75, faveColor: '#EDA1ED', faveShape: 'ellipse'}
                    });
                }else if(timeDiff>30&&timeDiff<=120){
                    nodes.push({
                        data:{id:result[i].properties.zigbee_networkaddress,name:result[i].properties.zigbee_networkaddress,weight: 75, faveColor: '#86B242', faveShape: 'ellipse'}
                    });
                }else if(timeDiff>120&&timeDiff<=180){
                    nodes.push({
                        data:{id:result[i].properties.zigbee_networkaddress,name:result[i].properties.zigbee_networkaddress,weight: 75, faveColor: '#6FB1FC', faveShape: 'ellipse'}
                    });
                }else {
                    nodes.push({
                        data:{id:result[i].properties.zigbee_networkaddress,name:result[i].properties.zigbee_networkaddress,weight: 75, faveColor: '#F5A45D', faveShape: 'ellipse'}
                    });
                }

            }else {
                nodes.push({
                    data:{id:result[i].properties.zigbee_networkaddress,name:result[i].properties.zigbee_networkaddress,weight: 75, faveColor: '#000000', faveShape: 'rectangle'}
                });
            }

        }
        /* no update time info
        else {
            if(result[i].properties.zigbee_logicaltype==="COORDINATOR"){
                nodes.push({
                    data:{id:result[i].properties.zigbee_networkaddress,name:result[i].label,weight: 75, faveColor: '#6FB1FC', faveShape: 'triangle'}
                });
            }else if(result[i].properties.zigbee_logicaltype==="ROUTER"){
                nodes.push({
                    data:{id:result[i].properties.zigbee_networkaddress,name:result[i].properties.zigbee_networkaddress,weight: 75, faveColor: '#6FB1FC', faveShape: 'octagon'}
                });
            }else if(result[i].properties.zigbee_logicaltype==="END_DEVICE"){
                nodes.push({
                    data:{id:result[i].properties.zigbee_networkaddress,name:result[i].properties.zigbee_networkaddress,weight: 75, faveColor: '#6FB1FC', faveShape: 'ellipse'}
                });
            }else {
                nodes.push({
                    data:{id:result[i].properties.zigbee_networkaddress,name:result[i].properties.zigbee_networkaddress,weight: 75, faveColor: '#6FB1FC', faveShape: 'triangle'}
                });
            }
        }
        */


    }

/* routes data structure
 for (var j=0;j<result.length;j++){
 if(result[j].properties.zigbee_routes){
 var ifRoutes=eval(result[j].properties.zigbee_routes).length;
 if(ifRoutes){
 for (var z=0;z<ifRoutes;z++){
 var test3=eval(result[j].properties.zigbee_routes)[z];
 edgesDuplicate.push({
 data:{source:result[j].properties.zigbee_networkaddress,target:test3.next_hop, faveColor: '#6FB1FC',label:test3.state}
 })
 }
 }
 }

 }
 */

    for (var j=0;j<result.length;j++){
        if(result[j].properties.zigbee_neighbors){
            var ifNeigh=eval(result[j].properties.zigbee_neighbors).length;
            if(ifNeigh){
                for (var z=0;z<ifNeigh;z++){
                    var test3=eval(result[j].properties.zigbee_neighbors)[z];
                    if(test3.lqi!=0){
                        if(test3.lqi>0&&test3.lqi<=63){
                            edgesDuplicate.push({
                                data:{source:test3.address,target:result[j].properties.zigbee_networkaddress, faveColor: '#FFFF33',label:test3.lqi}
                            });
                        }else if(test3.lqi<63&&test3.lqi<=126){
                            edgesDuplicate.push({
                                data:{source:test3.address,target:result[j].properties.zigbee_networkaddress, faveColor: '#6EFF33',label:test3.lqi}
                            });
                        }else if(test3.lqi>126&&test3.lqi<=189){
                            edgesDuplicate.push({
                                data:{source:test3.address,target:result[j].properties.zigbee_networkaddress, faveColor: '#33FFF3',label:test3.lqi}
                            });
                        }else {
                            edgesDuplicate.push({
                                data:{source:test3.address,target:result[j].properties.zigbee_networkaddress, faveColor: '#3352FF',label:test3.lqi}
                            });
                        }

                    }
                }
            }
        }

    }
    edgesDuplicate.forEach(function(item) { // loop through array which contain duplicate
        // if item is not found in _unArray it will return empty array
        var isPresent = edges.filter(function(elem) {
            return elem.data.source === item.data.source && elem.data.target === item.data.target
        });
        if (isPresent.length == 0) {
            edges.push(item)
        }
    });
    console.log("after un duplicate",edges);


    nodeIdArr=[];
    for(var a=0;a<nodes.length;a++){
        nodeIdArr.push(nodes[a].data.id);
    }
    console.log("node id",nodeIdArr);

    edgeTargetArr=[];
    for (var b=0;b<edges.length;b++){
        edgeTargetArr.push(edges[b].data.source);
    }
    console.log("target are",edgeTargetArr);

    var unique=[];
    /*
    if(nodeIdArr.length&&edgeTargetArr.length){
        for (var c=0;c<nodeIdArr.length;c++){
            var found=false;
            for (var d=0;d<edgeTargetArr.length;d++){
                if(nodeIdArr[c]===edgeTargetArr[d]){
                    found=true;
                    break;
                }
            }
            if(found==false){
                unique.push(nodeIdArr[c]);
            }
        }
    }
    */
    if(nodeIdArr.length&&edgeTargetArr.length){
        for (var c=0;c<edgeTargetArr.length;c++){
            var found=false;
            for (var d=0;d<nodeIdArr.length;d++){
                if(edgeTargetArr[c]===nodeIdArr[d]){
                    found=true;
                    break;
                }
            }
            if(found==false){
                unique.push(edgeTargetArr[c]);
            }
        }
    }
    console.log("unique",unique);

    if(unique.length){
        for (var e=0;e<unique.length;e++){
            nodes.push({
                data:{id:unique[e],name:unique[e],weight: 75, faveColor: '#808080', faveShape:'octagon'}
            })
        }
    }

    elements.nodes=nodes;
    elements.edges=edges;
    console.log("element",elements)
    myElement=elements;
    console.log("my element ",myElement);


    /*
        for(var i=0;i<result.length;i++){
            console.log("xxx",result.length);
            if(result[i].properties.zigbee_lastupdate){
                if(result[i].properties.zigbee_logicaltype==="COORDINATOR"){
                    nodes.push({
                        data:{id:result[i].properties.zigbee_networkaddress,name:result[i].label+" "+result[i].properties.zigbee_lastupdate.slice(0,10)+" "+result[i].properties.zigbee_lastupdate.slice(11,19),weight: 75, faveColor: '#6FB1FC', faveShape: 'triangle'}
                    });
                }else if(result[i].properties.zigbee_logicaltype==="ROUTER"){
                    nodes.push({
                        data:{id:result[i].properties.zigbee_networkaddress,name:result[i].label+" "+result[i].properties.zigbee_lastupdate.slice(0,10)+" "+result[i].properties.zigbee_lastupdate.slice(11,19),weight: 75, faveColor: '#6FB1FC', faveShape: 'octagon'}
                    });
                }else if(result[i].properties.zigbee_logicaltype==="END_DEVICE"){
                    nodes.push({
                        data:{id:result[i].properties.zigbee_networkaddress,name:result[i].label+" "+result[i].properties.zigbee_lastupdate.slice(0,10)+" "+result[i].properties.zigbee_lastupdate.slice(11,19),weight: 75, faveColor: '#6FB1FC', faveShape: 'ellipse'}
                    });
                }else {
                    nodes.push({
                        data:{id:result[i].properties.zigbee_networkaddress,name:result[i].label+" "+result[i].properties.zigbee_lastupdate.slice(0,10)+" "+result[i].properties.zigbee_lastupdate.slice(11,19),weight: 75, faveColor: '#6FB1FC', faveShape: 'triangle'}
                    });
                }

            }else {
                if(result[i].properties.zigbee_logicaltype==="COORDINATOR"){
                    nodes.push({
                        data:{id:result[i].properties.zigbee_networkaddress,name:result[i].label,weight: 75, faveColor: '#6FB1FC', faveShape: 'triangle'}
                    });
                }else if(result[i].properties.zigbee_logicaltype==="ROUTER"){
                    nodes.push({
                        data:{id:result[i].properties.zigbee_networkaddress,name:result[i].label,weight: 75, faveColor: '#6FB1FC', faveShape: 'octagon'}
                    });
                }else if(result[i].properties.zigbee_logicaltype==="END_DEVICE"){
                    nodes.push({
                        data:{id:result[i].properties.zigbee_networkaddress,name:result[i].label,weight: 75, faveColor: '#6FB1FC', faveShape: 'ellipse'}
                    });
                }else {
                    nodes.push({
                        data:{id:result[i].properties.zigbee_networkaddress,name:result[i].label,weight: 75, faveColor: '#6FB1FC', faveShape: 'triangle'}
                    });
                }
            }


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

        nodeIdArr=[];
        for(var a=0;a<nodes.length;a++){
            nodeIdArr.push(nodes[a].data.id);
        }
        console.log("node id",nodeIdArr);

        edgeTargetArr=[];
        for (var b=0;b<edges.length;b++){
            edgeTargetArr.push(edges[b].data.target);
        }
        console.log("target are",edgeTargetArr);

        var unique=[];
        if(nodeIdArr.length&&edgeTargetArr.length){
            for (var c=0;c<nodeIdArr.length;c++){
                var found=false;
                for (var d=0;d<edgeTargetArr.length;d++){
                    if(nodeIdArr[c]===edgeTargetArr[d]){
                        found=true;
                        break;
                    }
                }
                if(found===false){
                    unique.push(nodeIdArr[c]);
                }
            }
        }
        console.log("unique",unique);

        if(unique.length){
            for (var e=0;e<unique.length;e++){
                nodes.push({
                    data:{id:unique[e],name:unique[e],weight: 75, faveColor: '#808080', faveShape:'octagon'}
                })
            }
        }

        elements.nodes=nodes;
        elements.edges=edges;
        console.log("element",elements)
        myElement=elements;
        console.log("my element ",myElement);

        */
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
    },2000);
}
var drawTopology=function(myElement){
    cy=cytoscape({
        container: document.getElementById('cy'),

        layout: {
            name: 'circle',
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
                'text-color':'data(faveColor)',
                'text-outline-width': 1,
                'text-outline-color': 'data(faveColor)',
                'background-color': 'data(faveColor)',
                'color': '#fff'
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
    cy.$('node').on('tap',function (e) {
        var ele=e.target;
        console.log("clicked",ele.id());
        detailId=ele.id();
        console.log("what i get",detailId);
        console.log("type",typeof detailId);
       findDetailById(detailId);
    });

};
var findDetailById=function (detailId) {
    for (var i=0;i<result.length;i++){
        if(result[i].properties.zigbee_networkaddress===detailId){
            console.log("the object",result[i]);
            myObject=result[i];
            console.log("my object",myObject);
            myProperties=myObject.properties;
            UID=myObject.UID;
            console.log("my properties",myProperties);
            console.log("UID",UID);
            $('#table').empty();
            $('#modal-body').empty();

            $('#table').append('<thead><tr><th>Status</th></tr></thead>'
                +'<tbody><tr><td>'+myObject.statusInfo.status+'</td></tr></tbody>'
                +'<thead><tr><th>Status Detail</th></tr></thead>'
                +'<tbody><tr><td>'+myObject.statusInfo.statusDetail+'</td></tr></tbody>'
                +'<thead><tr><th>Label</th></tr></thead>'
                +'<tbody><tr><td>'+myObject.label+'</td></tr></tbody>'
                +'<thead><tr><th>Bridge UID</th></tr></thead>'
                +'<tbody><tr><td>'+myObject.bridgeUID+'</td></tr></tbody>'
                +'<thead><tr><th>Zigbee Mac Address</th></tr></thead>'
                +'<tbody><tr><td>'+myObject.configuration.zigbee_macaddress+'</td></tr></tbody>'
                +'<thead><tr><th>UID</th></tr></thead>'
                +'<tbody><tr><td>'+myObject.UID+'</td></tr></tbody>'
                +'<thead><tr><th>Thing Type UID</th></tr></thead>'
                +'<tbody><tr><td>'+myObject.thingTypeUID+'</td></tr></tbody>'
                // +'<thead><tr><th>Channels</th></tr></thead>'
                // +'<tbody><tr><td>'+JSON.stringify(myObject.channels)+'</td></tr></tbody>'
            );

            for( var key in myProperties){
                $('#modal-body').append('<thead><tr><th>' + key + '</th></tr></thead>'
                    +'<tbody><tr><td>'+myProperties[key]+'</td></tr></tbody>')
            }
            if(myObject.properties.zigbee_networkaddress==0){
                $('#modal-footer').empty();
                $('#modal-footer').append('<div class="row"><div id="join" class="col-md-12"><button type="button" class="btn btn-info" onclick="joinCommand(UID)" >Join Command</button></div></div>')
            }else {
                $('#modal-footer').empty();
                $('#modal-footer').append('<div class="row"><div id="join" class="col-md-8"><button type="button" class="btn btn-info" onclick="joinCommand(UID)" >Join Command</button></div>'
                    +'<div id="join" class="col-md-4"><button type="button" class="btn btn-info" onclick="leaveCommand(UID)" >Leave Command</button></div></div>')
            }

        }
    }
}
var leaveCommand=function (UID) {
    console.log("uid",UID);
    console.log("leave");
    var leaveUrl="/api/rest/things/"+UID+"/config";
    console.log("leave url",leaveUrl);
    var data={"zigbee_leave":true};
    $.ajax({
        url : leaveUrl,
        type : "PUT",
        data : JSON.stringify(data),
        contentType: "application/json",
        success:function (res) {
            console.log("leave response",res);
        }
    })
};
var joinCommand=function (UID) {
    console.log("join");
    var joinUrl="/api/rest/things/"+UID+"/config";
    var dataa={"zigbee_joinenable":true};
    $.ajax({
        url:joinUrl,
        type:'PUT',
        contentType: "application/json",
        data:JSON.stringify(dataa),
        dataType: "json",
        success:function (res) {
            console.log("join response",res);
        }
    })

}


function loadData() {
    myHttp(theUrl);
    console.log("load data result",result);
    delay();
}
loadData();
setInterval(loadData,20000);












