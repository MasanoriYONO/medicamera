// This is a JavaScript file

var image_width;
var image_height;
var prevScale;
var scale;
var cx_left = 0;
var cx_top = 0;
var dragStartX = 0;
var dragStartY = 0;
var canvas;
var context;
var image;

function view_detail(index){
    var options = {path: image_directory + array_picture[index].filename, id:index,title:array_picture[index].division};
    myNavigator.pushPage('page_photo_detail.html', options);
}

$(document).on('pageinit', '#page_photo_detail', function(event) {
    var page = myNavigator.getCurrentPage();
    pd_id = page.options.id;
    // canvas_page_init(page.options.path);
    
    $("#v_title").empty();
    $("#v_title").text(page.options.title);
    
    // $("#camera_pic").attr("src",page.options.path);
    
    var rect = document.body.getBoundingClientRect();
            
    canvas = $('#canvas').get(0);
    if ( ! canvas || ! canvas.getContext ) {
        console.log("! canvas || ! canvas.getContext");
        return false; 
    }
    canvas.width = rect.width;
    if(monaca.isAndroid){
        canvas.height = rect.height - 20;
    }
    if(monaca.isIOS){
        canvas.height = rect.height - 100;
    }
        
    console.log("canvas.width:" + canvas.width);
    console.log("canvas.height:" + canvas.height);
    
    context = canvas.getContext('2d');
    
    image = new Image();
    image.src = page.options.path;
    if(monaca.isAndroid){
        image.onload = function(){
            console.log("Android.image.onload.");
            image_width = image.width;
            image_height = image.height;
        
            console.log("image_width:" + image_width);
            console.log("image_height:" + image_height);
            //Xperiaなど
            if(image_width > image_height){
                w_scale = canvas.width / image_height;
                h_scale = canvas.height / image_width;
                console.log("w_scale:" + w_scale);
                console.log("h_scale:" + h_scale);
                if(w_scale > h_scale){
                    scale = h_scale;
                }else{
                    scale = w_scale;
                }
                
                console.log("scale:" + scale);
                
                context.translate(canvas.width, 0);
                context.rotate(90 * Math.PI/180);
                
                console.log("(canvas.height - image_width*scale)/2:" + (canvas.height - image_width*scale)/2);
                console.log("(canvas.width - image_height*scale)/2:" + (canvas.width - image_height*scale)/2);
                
                context.drawImage(image, 0, 0, image_width, image_height, 
                    (canvas.height - image_width*scale)/2,
                    (canvas.width - image_height*scale)/2,
                    image_width*scale,
                    image_height*scale);
            }else{
                w_scale = canvas.width / image_width;
                h_scale = canvas.height / image_height;
                console.log("w_scale:" + w_scale);
                console.log("h_scale:" + h_scale);
                if(w_scale > h_scale){
                    scale = h_scale;
                }else{
                    scale = w_scale;
                }
                
                console.log("scale:" + scale);
                console.log("(canvas.width - image_width*scale)/2:" + (canvas.width - image_width*scale)/2);
                console.log("(canvas.height - image_height*scale)/2:" + (canvas.height - image_height*scale)/2);
                context.drawImage(image, 0, 0, image_width, image_height, 
                    (canvas.width - image_width*scale)/2,
                    (canvas.height - image_height*scale)/2,
                    image_width*scale,
                    image_height*scale);
            }
            
        };
    }
    
    if(monaca.isIOS){
        image.onload = function(){
            console.log("iOS.image.onload.");
            image_width = image.width;
            image_height = image.height;
        
            console.log("image_width:" + image_width);
            console.log("image_height:" + image_height);
            
            w_scale = canvas.width / image_height;
            h_scale = canvas.height / image_width;
            console.log("w_scale:" + w_scale);
            console.log("h_scale:" + h_scale);
            if(w_scale > h_scale){
                scale = h_scale;
            }else{
                scale = w_scale;
            }
            console.log("scale:" + scale);
            
            context.translate(canvas.width, 0);
            context.rotate(90 * Math.PI/180);
            
            console.log("(canvas.height - image_width*scale)/2:" + (canvas.height - image_width*scale)/2);
            console.log("(canvas.width - image_height*scale)/2:" + (canvas.width - image_height*scale)/2);
            
            context.drawImage(image, 0, 0, image_width, image_height, 
                (canvas.height - image_width*scale)/2,
                (canvas.width - image_height*scale)/2,
                image_width*scale,
                image_height*scale);
            
        };
    }
});
