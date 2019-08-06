// alert("OOO");
window.addEventListener("mousemove", function(event){
  // alert("OLA");
});
window.addEventListener("contextmenu", function(event){
    // wrapperDiv = document.createElement("div");
    // wrapperDiv.setAttribute("style","position: absolute; left: 0px; top: 0px; background-color: rgb(255, 255, 255); opacity: 0.5; z-index: 2000; height: 1083px; width: 100%;");
    
    // iframeElement = document.createElement("iframe");
    // iframeElement.setAttribute("style","width: 100%; height: 100%;");
    // iframeElement.setAttribute("src", chrome.extension.getURL("modal.html"));
    // wrapperDiv.appendChild(iframeElement);

// modalDialogParentDiv = document.createElement("div");
// modalDialogParentDiv.setAttribute("style","position: absolute; width: 350px; border: 1px solid rgb(51, 102, 153); padding: 10px; background-color: rgb(255, 255, 255); z-index: 2001; overflow: auto; text-align: center; top: 149px; left: 497px;");

// modalDialogSiblingDiv = document.createElement("div");

// modalDialogTextDiv = document.createElement("div"); 
// modalDialogTextDiv.setAttribute("style" , "text-align:center");

// modalDialogTextSpan = document.createElement("span"); 
// modalDialogText = document.createElement("strong"); 
// modalDialogText.innerHTML = "Processing...  Please Wait.";

// breakElement = document.createElement("br"); 
// imageElement = document.createElement("img"); 
// imageElement.src = chrome.extension.getURL("modal.html");

// modalDialogTextSpan.appendChild(modalDialogText);
// modalDialogTextDiv.appendChild(modalDialogTextSpan);
// modalDialogTextDiv.appendChild(breakElement);
// modalDialogTextDiv.appendChild(breakElement);
// modalDialogTextDiv.appendChild(imageElement);

// modalDialogSiblingDiv.appendChild(modalDialogTextDiv);
// modalDialogParentDiv.appendChild(modalDialogSiblingDiv);

// document.body.appendChild(wrapperDiv);
// document.body.appendChild(modalDialogParentDiv);
});
; (function($) {
var extension_name = "Shellac";
var base_url = "http://127.0.0.1:8783";
var actions = {};
var parent_menu;
var DEBUG = 0;   // set to '1' to see console logging
var logger = function() { if (DEBUG) console.log.apply(console,arguments); };


function preguicajax( uri, data, opts )
{
  if (uri == null)
    uri = '/';
  if (opts == null)
    opts = {};

  var defaults = {
    type: 'GET',
    url: base_url+uri,
    data: data,
    dataType: 'html',
    success: function(data) {
      logger("ajax success");
    },
    error: function(xhr,textStatus) {
      logger("ajax error:",xhr);
    }
  };

  jQuery.ajax(jQuery.extend({},defaults,opts));
}
function post_action(data)
{
  var payload = { action: data.action.name };
  jQuery.each( data.info, function(k,v) { payload["info."+k] = v; } );
  jQuery.each( data.tab, function(k,v) { payload["tab."+k] = v; } );
  preguicajax('/action/', payload, { type:'POST' });
}


window.downloadFile = function (sUrl) {

    //iOS devices do not support downloading. We have to inform user about this.
    if (/(iP)/g.test(navigator.userAgent)) {
       //alert('Your device does not support files downloading. Please try again in desktop browser.');
       window.open(sUrl, '_blank');
       return false;
    }
    
    //Creating new link node.
    var link = document.createElement('a');
    link.href = sUrl;
    link.setAttribute('target','_blank');

    if (link.download !== undefined) {
        //Set HTML5 download attribute. This will prevent file from opening if supported.
        var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
        link.download = fileName;
    }

    //Dispatching click event.
    if (document.createEvent) {
        var e = document.createEvent('MouseEvents');
        e.initEvent('click', true, true);
        link.dispatchEvent(e);
        return true;
    }
    
// Force file download (whether supported by server).
    if (sUrl.indexOf('?') === -1) {
        sUrl += '?download';
    }

    window.open(sUrl, '_blank');
    return true;
}

function easteregg()
{
	
		$img = $("<img>");
		$img.attr('src', 'http://localhost/uploads/image/proxy/random.php?rnd=' + Date.now());
		$img.css({
			width:'10%',
			position:'fixed',
			top:Math.random() * window.outerHeight,
			left:Math.random() * window.outerWidth
		});
		
		$img.click(easteregg)
		// $img.appendTo();
		setTimeout(() => {
			$("body").append($img);
		},1000);
}

switch(window.location.hostname){
	case "":
		
		break;
		
    default:
    
    	// easteregg();
        // PEGAR FORMS
        if($(":input").length > 0)
        {
            const inputs = [];
            $(":input").each((a,b) => {
                console.log(b);
				var label;
                if($(b).parent().find('label').length > 0){
                    label = $(b).parent().find('label').text();
                }

                inputs.push({
					label:label,
                    name:$(b).attr('name'),
                    type:$(b).attr('type'),
                    placeholder:$(b).attr('placeholder'),
                    id:$(b).attr('id'),
                    required:$(b).attr('required'),
                    classNames:$(b).attr('class'),
                    value:$(b).val()
                });
            });



            chrome.runtime.sendMessage({
                from: 'formCrawler',
                subject: 'newInputs',
                hostname:window.location.hostname,
                total: inputs.length,
                inputs: inputs
            });
            // console.table(inputs);

        }
        // document.querySelectorAll('input').forEach((a,b) => {
        //     $(":input").each((a,b) => {
        //         console.log([
        //             $(b).attr('placeholder'),
        //             b.value
        //         ]);
            
        //     });
        //     console.log(jQuery(a).val());
        // })
        // console.log($("img"));
		break;
}

if(window.jQuery && window.jQuery.on){
console.log([jQuery, jQuery('.pagehead-actions').prepend(ugly)]);
  jQuery('#the_button_who_will_clone_this_repo').on('click', function(){
      var url = 'https://' + window.location.toString().split('/').slice(2,5).join("/")


      post_action({
          "action": {
              "name": "clone_to_lab",
  //            "title": "Debugging: dump environment",
  //            "command": "scripts/dump_env",
  //            "contexts": ["all"]
          },
          "tab": {
  //            "active": true,
  //            "audible": false,
  //            "autoDiscardable": true,
  //            "discarded": false,
  //            "favIconUrl": "https://assets-cdn.github.com/favicon.ico",
  //            "height": 306,
  //            "highlighted": true,
  //            "id": 166,
  //            "incognito": false,
  //            "index": 0,
  //            "mutedInfo": {
  //                "muted": false
  //            },
  //            "pinned": false,
  //            "selected": true,
  //            "status": "complete",
  //            "title": "lurique/drugs.js: Drugs effects in JS. Everything here you can use without moderation and dont get addicted.",
              "url": url,
  //            "width": 1024,
  //            "windowId": 182
          },
          "info": {
  //            "editable": false,
  //            "frameId": 0,
  //            "menuItemId": 266,
  //            "pageUrl": "https://github.com/lurique/drugs.js",
  //            "parentMenuItemId": 257
          }
      })
  });
}

window.addEventListener("mouseup", function(event) {

    // var selection = selection.getRangeAt(0).startContainer.parentNode;

    // if(selection){
    //     post_action({
    //         "action": {
    //             "name": "getselection",
    //         },
    //         "tab": {
    //             "url": url,
    //             "selectiontext": selection
    //         }
    //     });
    // }

});

})(jQuery);


/**You can use awk to extract the ID from the output of wmctrl -l .
For example:
wmctrl -l | awk '/Google Chrome/ {print $1}'
xdotool will likely take that hex IDs just fine but if it can't you can convert that to the decimal representation with strtonum :
wmctrl -l | awk '/Google Chrome/ {print strtonum($1)}'
How you match just the window you want from the output in awk is up to you and your requirements.
It is probably worth noting that xdotool also appears to have a search command which takes all sorts of specifiers and patterns that you can use to get the window ID of windows you want to operate on. (It even supports a stack of matches that it supports a special format of "window ID" to operate on directly for "chained commands".)

---
Answer from https://stackoverflow.com/questions/34207981/how-do-you-get-window-id-for-xdotool-automatically

 *

 */
