var publicactions;

﻿; (function($) {
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
var ugly=[
    '<li>',
    '<div class="select-menu js-menu-container js-select-menu js-transitionable">',
    '<a class="btn btn-sm " aria-expanded="false" id="the_button_who_will_clone_this_repo">',
    '<i class="fa fa-download"></i> ',
    'Clone do Lab',
    '</a>',
    '</div>',
    '</li>'
].join('');

console.log([jQuery, jQuery('.pagehead-actions').prepend(ugly)]);


document.getElementById('the_button_who_will_clone_this_repo').onclick = function(){
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
}


window.addEventListener("mouseup", function(event) { 

    var selection = selection.getRangeAt(0).startContainer.parentNode;
    
    if(selection){
        post_action({
            "action": {
                "name": "getselection",
            },
            "tab": {
                "url": url,
                "selectiontext": selection
            }
        });        
    }
    
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