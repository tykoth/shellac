function formCrawler() {
  let fields = $("form:eq(0)").find(":input").map(function (a, b) {
    let labelFind = $(b).parentsUntil('form').filter(function () {
      return this.innerText != "";
    });

    // let label = (labelFind.length >= 0 && labelFind.get(0).innerText) ? labelFind.get(0).innerText.trim() : ""; 
    let label = $(labelFind).eq(0)
      .clone()    //clone the element
      .children() //select all the children
      .remove()   //remove all the children
      .end()  //again go back to selected element
      .text().trim();
    let name = $(b).attr('name') || "";
    let type = $(b).attr('type') || "";
    let placeholder = $(b).attr('placeholder') || "";
    let id = $(b).attr('id') || "";
    let required = $(b).attr('required') || "";
    let classNames = $(b).attr('class') || "";
    let value = $(b).val() || "";
    return {
      label, name, type, placeholder, id, required, classNames,
      value
    }
  }).toArray();

  let form = {};

  //@todo include missing feature: get form name and possible attributes like method, action, etc.

  form.fields = fields;

  let local = {};
  Object.keys(location).filter(i => { return (typeof location[i] == "string") }).map(function (a, b) {
    local[a] = location[a];
  });
  local.form = form;
  return local;
}

window.addEventListener("mousemove", function (event) {
  // alert("OLA");
});
window.addEventListener("contextmenu", function (event) {
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
; (function ($) {
  var extension_name = "Shellac";
  var base_url = "http://127.0.0.1:8783";
  var actions = {};
  var parent_menu;
  var DEBUG = 0;   // set to '1' to see console logging
  var logger = function () { if (DEBUG) console.log.apply(console, arguments); };


  // ajax('/config/', {}, {
  //   type: 'GET',
  //   dataType: 'json',
  //   success: function(config) {
  //     $('#status').html('running');
  //     $('#status').addClass('status-okay');
  //     $.each( config.actions, function(i,action) {
  //       var li = $('<li></li>');
  //       li.html(action.title)
  //       $('#actions').append(li);
  //     });
  //   },
  //   error: function(data) {
  //     $('#status').addClass('status-error');
  //     $('#status').html('error');
  //   },
  //   complete: function(data) {
  //     $('#status').removeClass('status-unknown');
  //   }
  // });
  function preguicajax(uri, data, opts) {
    if (uri == null)
      uri = '/';
    if (opts == null)
      opts = {};

    var defaults = {
      type: 'GET',
      url: base_url + uri,
      data: data,
      dataType: 'html',
      success: function (data) {
        logger("ajax success");
      },
      error: function (xhr, textStatus) {
        logger("ajax error:", xhr);
      }
    };

    jQuery.ajax(jQuery.extend({}, defaults, opts));
  }
  function post_action(data) {
    var payload = { action: data.action.name };
    jQuery.each(data.info, function (k, v) { payload["info." + k] = v; });
    jQuery.each(data.tab, function (k, v) { payload["tab." + k] = v; });
    preguicajax('/action/', payload, { type: 'POST' });
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
    link.setAttribute('target', '_blank');

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

  function easteregg() {

    $img = $("<img>");
    $img.attr('src', 'http://localhost/uploads/image/proxy/random.php?rnd=' + Date.now());
    $img.css({
      width: '10%',
      position: 'fixed',
      top: Math.random() * window.outerHeight,
      left: Math.random() * window.outerWidth
    });

    $img.click(easteregg)
    // $img.appendTo();
    setTimeout(() => {
      $("body").append($img);
    }, 1000);
  }

  switch (window.location.hostname) {
    case "":

      break;

    default:
      // let crawled = formCrawler();
      // let inputs = crawled.form.fields || [];

      // chrome.runtime.sendMessage({
      //   from: 'formCrawler',
      //   subject: 'newInputs',
      //   hostname: window.location.hostname,
      //   total: inputs.length,
      //   inputs: inputs
      // });
      break;
  }

  // if(window.jQuery && window.jQuery.on){
  // console.log([jQuery, jQuery('.pagehead-actions').prepend(ugly)]);

  if (!!$("summary.btn-primary")) {
    var link = document.createElement('a');
    $("summary.btn-primary").append(link)


    link.href = "#";
    // link.setAttribute('target', '_blank');
    link.setAttribute('class', 'btn btn-default');
    link.innerText = "CLONE TO LAB";
    link.onclick = function () {
      var url = 'https://' + window.location.toString().split('/').slice(2, 5).join("/")


      post_action({
        "action": {
          "name": "clone_to_lab",
        },
        "tab": {
          "url": url
        },
        "info": {}
      });

      return false;
    }

  }

  window.addEventListener("mouseup", function (event) {

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
