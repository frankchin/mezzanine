
// Map Django language codes to valid TinyMCE language codes.
// There's an entry for every TinyMCE language that exists,
// so if a Django language code isn't here, we can default to en.

var language_codes = {
    'ar': 'ar',
    'ca': 'ca',
    'cs': 'cs',
    'da': 'da',
    'de': 'de',
    'es': 'es',
    'et': 'et',
    'fa': 'fa',
    'fa_IR': 'fa_IR',
    'fi': 'fi',
    'fr': 'fr_FR',
    'hr_HR': 'hr',
    'hu': 'hu_HU',
    'id_ID': 'id',
    'is_IS': 'is_IS',
    'it': 'it',
    'ja': 'ja',
    'ko': 'ko_KR',
    'lv': 'lv',
    'nb': 'nb_NO',
    'nl': 'nl',
    'pl': 'pl',
    'pt_BR': 'pt_BR',
    'pt_PT': 'pt_PT',
    'ru': 'ru',
    'sk': 'sk',
    'sr': 'sr_Latn',
    'sv': 'sv_SE',
    'tr': 'tr',
    'uk': 'uk_UA',
    'vi': 'vi',
    'zh_CN': 'zh_CN',
    'zh_TW': 'zh_TW'
};

function custom_file_browser(field_name, url, type, win) {
    tinyMCE.activeEditor.windowManager.open({
        title: 'Select ' + type + ' to insert',
        file: window.__filebrowser_url + '?pop=5&type=' + type,
        width: 800,
        height: 500,
        resizable: 'yes',
        scrollbars: 'yes',
        inline: 'yes',
        close_previous: 'no'
    }, {
        window: win,
        input: field_name
    });
    return false;
}

var first = true;
jQuery(function($) {

    if (typeof tinyMCE != 'undefined') {

        tinyMCE.init({
        	    selector: "textarea.mceEditor",  
    			 language: "zh_TW",
             fontsize_formats: "8pt 10pt 12pt 26pt 36pt 48pt 62pt 70pt",
             theme: "modern",
             width: "100%",
             plugins: [
               "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
                "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                "save table contextmenu directionality emoticons template paste textcolor"
             ],
             content_css: "css/content.css",
             toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons | fontselect | fontsizeselect",
             setup: function(ed) {
               ed.on('init', function() {
                 this.getDoc().body.style.fontSize = '12px'; <!---字體預設大小---!>
               });
             },           
             
             file_browser_callback: function(field_name, url, type, win) {
               if(type=='image') {
               	if (first){
               		$('body').append('<input id=selectFile type=file >');
                 		var input = "[id^='tinymce-'][id$='-inp']";
    	      	      var a = "<script>$('#selectFile').on('change', function() {\
    	      	           uploadToS3('news/abc.png', 'selectFile', '/moderna/signS3/', function(){\
    	      	  			  $(\"" + input + "\").attr({'value':'https://isccyut2.s3.amazonaws.com/news/abc.png'});\
    	      	  			  });\
    	      	  			});</script>";	  
    	      	    $('body').append(a);
    	      	    first = false;
               	}          	
    	      	  
                 $('#selectFile').click();
               }
             }

        	/*
            selector: "textarea.mceEditor",
            height: '500px',
            language: 'zh_TW',
            plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table contextmenu paste"
            ],
            link_list: '/displayable_links.js',
            relative_urls: false,
            convert_urls: false,
            menubar: false,
            statusbar: false,
            toolbar: ("insertfile undo redo | styleselect | bold italic | " +
                      "alignleft aligncenter alignright alignjustify | " +
                      "bullist numlist outdent indent | link image table | " +
                      "code fullscreen"),
            file_browser_callback: custom_file_browser,
            content_css: window.__tinymce_css
            */
        });

    }

});
    	      	