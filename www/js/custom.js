// This is a JavaScript file
var input_div;
var photo_div = "";
var saved_date = "";
var map_lat;
var map_lng;
var array_picture = [];
var array_emg = [];
var emg_index;
var emg_phone_number = "";

function start_activity_html(){
    if(monaca.isIOS){
        window.open('http://ekikara.jp/newdata/ekijikoku/2301011/up1_22201011.htm', '_system', 'location=yes');
    }
    if(monaca.isAndroid){
        window.plugins.webintent.startActivity(
            {
                action: window.plugins.webintent.ACTION_VIEW,
                url:  'http://ekikara.jp/newdata/ekijikoku/2301011/up1_22201011.htm'
            },
            function() {},
            function() {console.log('Failed to open URL via Android Intent');}        
        );
    }
}

function start_activity_html_thanks(){
    if(monaca.isIOS){
        window.open('http://tetto.com/sp/index.html', '_system', 'location=yes');
    }
    if(monaca.isAndroid){
        window.plugins.webintent.startActivity(
            {
                action: window.plugins.webintent.ACTION_VIEW,
                url:  'http://tetto.com/sp/index.html'
            },
            function() {},
            function() {console.log('Failed to open URL via Android Intent');}        
        );
    }
}

function start_activity_html_shizuoka_emg(){
    if(monaca.isIOS){
        window.open('http://www.shizuoka.shizuoka.med.or.jp/', '_blank');
    }
    if(monaca.isAndroid){
        window.plugins.webintent.startActivity(
            {
                action: window.plugins.webintent.ACTION_VIEW,
                url:  'http://www.shizuoka.shizuoka.med.or.jp/'
            },
            function() {},
            function() {console.log('Failed to open URL via Android Intent');}        
        );
    }
}

function start_activity_html_shimizu_emg(){
    if(monaca.isIOS){
        window.open('http://www.shimizu-ishikai.com/', '_blank');
    }
    if(monaca.isAndroid){
        window.plugins.webintent.startActivity(
            {
                action: window.plugins.webintent.ACTION_VIEW,
                url:  'http://www.shimizu-ishikai.com/'
            },
            function() {},
            function() {console.log('Failed to open URL via Android Intent');}        
        );
    }
}

function set_phone_number(phone){
    emg_phone_number = phone;
}
// 電話をかける場合  
function startActivity_phone() {
    window.plugins.webintent.startActivity({
        action: window.plugins.webintent.ACTION_VIEW,
        url: 'tel:' + emg_phone_number},
        function() {},
        function() {alert('Failed to open URL via Android Intent')}
    );
}

function page_skip(){
    window.location.href = "./index2.html";
}

function page_top(){
    window.location.href = "./index.html";
}

function hospital(name, medical_courses, lat, lng, phone, address, open_time, day){
    this.name = name;
    this.medical_courses = medical_courses;
    this.lat = lat;
    this.lng = lng;
    this.phone = phone;
    this.address = address;
    this.open_time = open_time;
    this.day = day;
}

function set_emg_list(){
    
    array_emg = [];
    
    jQuery.each(emerg_doctors.dataset, function()
    {
        
        var m = moment();
        var t_current = moment(m.format("YYYY-MM-DD 00:00:00"));
        // var t_current = moment(new Date(2015, 11, 12, 9, 0, 0));
        var t_next = moment(m.add(6, "days").format("YYYY-MM-DD 00:00:00"));
        var t_day = moment(new Date(m.format("YYYY"), this.month - 1, this.day));
        if (t_current > t_day){
            console.log(t_current.format("YYYY-MM-DD") + " > " + t_day.format("YYYY-MM-DD"));
            return true;//continueの代わり。
        }
        if (t_day >= t_next){
            console.log(t_day.format("YYYY-MM-DD") + " >= " + t_next.format("YYYY-MM-DD"));
            return true;//continueの代わり。
        }
        var t_opentime = this.month + "/" + this.day + " " +this.consultation_time;
        
        var t_hospital = new hospital(
            this.name,
            this.medical_courses, 
            this.lat, 
            this.lng, 
            this.phone, 
            this.address, 
            t_opentime,
            t_day);
            
        array_emg.push(t_hospital);
    });
    
    array_emg.sort(function(a,b){
        if(a.day < b.day) return -1;
        if(a.day > b.day) return 1;
        if(a.medical_courses < b.medical_courses) return -1;
        if(a.medical_courses > b.medical_courses) return 1;
        return 0;
    });
    
    var emg_list = new EmgList();
    emg_list.load();
}

function view_map(index){
    emg_index = index;
    var options = {title: array_emg[emg_index].name, id:emg_index};
    myNavigator.pushPage('page_map_emerg.html', options);
    
    myNavigator.on('postpush', function(e) {
        $(e.enterPage.element).find("#view_title").text(array_emg[emg_index].name);
    });
}