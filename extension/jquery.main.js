; (function($) {

var extension_name = "Shellac";
var base_url = "http://127.0.0.1:8783";
var actions = {};
var parent_menu;
var DEBUG = 1;   // set to '1' to see console logging
var logger = function() { if (DEBUG) console.log.apply(console,arguments); };
var socket = null;

$(document).ready(function() {

  // This js handles both:
  //   * the background page context menu
  //   * the popup page when the omnibar icon is clicked

  var uri = window.location.pathname;

  if (uri == '/background.html')
    init_background_page();
  else if (uri == '/popup.html')
    init_popup_page();

});

function showRadialMenu(){
  $("nav.radial-menu-holder").show();
  $("nav.radial-menu-holder :checkbox").click();
  // $(".radial-menu-holder .sortable").sortable();
}

function hideRadialMenu(){
  $("nav.radial-menu-holder :checkbox").click();
  $("nav.radial-menu-holder").hide();
}

function toggleRadialMenu(){
  if($("nav.radial-menu-holder").is(":visible")){
    return hideRadialMenu();
  }

  return showRadialMenu();
}
function init_background_page()
{
  // Create a default context menu with the "refresh" menu item,
  // in case the server is brought up *after* the extension is launched.

  setup_context_menu(null);
  populate_context_menu();

  socket = io.connect('http://127.0.0.1:55777/');
  // init_bot();
}


function populate_context_menu()
{
  // Ajax to get the shellac.json config data.
  // Clear the current context menu for this extension,
  // then rebuild the context menu from scratch.

  ajax('/config/', {}, {
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      chrome.contextMenus.removeAll( function() {
        parent_menu = null;
        refresh_menuitem = null;
        actions = [];
        setup_context_menu(data);
        setup_command_listener(data);
      });
    }
  });
}


function init_popup_page()
{
  // Ajax to get the shellac.json config data.
  // Display server status and list of commands in the popup page.


  // init_bot();

  $('#server').html(base_url);
  $('#server').attr('href',base_url);
    
$("#menu-toggler").click(toggleRadialMenu);
// window.addEventListener('load', showRadialMenu);
window.addEventListener("contextmenu", function(){
    toggleRadialMenu();
});
  ajax('/config/', {}, {
    type: 'GET',
    dataType: 'json',
    success: function(config) {
      $('#status').html('running');
      $('#status').addClass('status-okay');
      $.each( config.actions, function(i,action) {
        var li = $('<li></li>');
        li.html(action.title)
        $('#actions').append(li);
      });
    },
    error: function(data) {
      $('#status').addClass('status-error');
      $('#status').html('error');
    },
    complete: function(data) {
      $('#status').removeClass('status-unknown');
    }
  });
}

function init_bot()
{


  bot = new Bot();

  bot.assimilate(BotJavascriptInterpreter);
  bot.assimilate(BotRegexClassMethodsInterpreter);
  bot.assimilate(BotWindowCommandsV1Interpreter);
  bot.assimilate(BotWebController);
  bot.assimilate(BotCalculatorController);
  bot.assimilate(BotRepeaterController);
  bot.assimilate(BotLuckyOpenerController);
  bot.assimilate(BotYoutubeController);
  bot.assimilate(BotBrowserSyncController);
  bot.assimilate(BotTodoListController);
  bot.assimilate(BotLanguageSettingsController);
  bot.assimilate(BotCustomerServiceSimulatorController);
  bot.assimilate(BotPtBrHelpController);
  bot.assimilate(BotBehaviorismController);
  bot.assimilate(BotChineseCommander);
  bot.assimilate(Palavrao);
  bot.assimilate(Bot5W);
  bot.assimilate(BotArquivosController);


  bot.assimilate(BotWindowSpeechRecognitionComponent);
  bot.assimilate(BotWindowSpeechSynthesisComponent);
  // bot.assimilate(BotWindowSpeechRecognitionComponent);
  // bot.assimilate(BotWindowSpeechSynthesisComponent);
  bot.assimilate(BotNotifierComponent);
  bot.assimilate(BotBelievesController);
  bot.assimilate(BotOpinionController);
  bot.assimilate(BotLikesController);
  bot.assimilate(BotUserNeedsController);
  bot.assimilate(BotUserBagController);
  bot.assimilate(BotUserAskingsController);
  bot.assimilate(BotListsController);
  bot.assimilate(BotUserPeopleController);
  bot.assimilate(BotIsController);


  /**
   * All debuggers are belong to us
   */
  bot.assimilate(BotDebuggerController);
  bot.assimilate(BotDebuggerSistemaController);
  bot.assimilate(BotDebuggerAleatoriosController);
  bot.assimilate(BotDebuggerAnalisarController);
  bot.assimilate(BotDebuggerApresentadorImagensController);
  bot.assimilate(BotDebuggerAtualizarPalavraController);
  bot.assimilate(BotDebuggerCaracteristicasPessoaisController);
  bot.assimilate(BotDebuggerEnglishController);
  bot.assimilate(BotDebuggerExportarController);
  bot.assimilate(BotDebuggerFrasesComunsController);
  bot.assimilate(BotDebuggerGeradorController);
  bot.assimilate(BotDebuggerPalavrasController);
  bot.assimilate(BotDebuggerSistemaController);
  bot.assimilate(BotLayoutController);  


  bot.components.speechSynthesis.onspeak(function(text) {
      console.log(text);
      var name = (bot.params['nome']) ? bot.params['nome'] : 'BotSemNome';
      bot.notify(text);
  });
  bot.components.speechRecognition.start();
  bot.components.speechRecognition.oneachevent(function(event) {


      switch (event.type) {
          case 'start':
              // $("#status").addClass("listening");
              break;

          case 'speechstart':
              // $("#status").removeClass("listening").addClass("working");
              break;

          case 'speechend':
              // $("#status").removeClass("working").addClass("listening");
              break;

          case 'end':
              // $("#status").removeClass("listening");
              break;

          case 'result':
              // if (event.results[0].isFinal) {

                  // frases++;
              // }
              break;

      }
      if (event.type === 'error') {


      }

      if (typeof lastEvent != 'undefined' && event.type != lastEvent.type) {
          timeLast = event.timeStamp - lastEvent.timeStamp;
      }

      // lastEvent = event;

      // $(".event-timestamp").html(formatTime((event.timeStamp / 1000).toFixed(0)));
      // $(".event-timestamp-last").html(formatTime((timeLast / 1000).toFixed(0)));
      // $(".executions").html(bot.executions);
      // $(".opened-windows").html(bot.windows.length);
      // $(".executions").html(bot.executions);
      // $(".phrases").html(frases);
      // $(".readed-lines").html(bot.readedLines);
      // $(".total-readable-lines").html(bot.totalReadableLines);
  });

  bot.components.speechRecognition.oneachresult(function(result, final) {
      // var transcript = result.transcript;
      // var confidence = result.confidence;
      // $(".intro-text").text(transcript);
  });

  bot.components.speechRecognition.onfinal(function(result) {
      // $("#ugli").val($("#ugli").val() + "\n" + result);
      // alert("BKZ");
  });    
}
function setup_context_menu(config)
{
  // Create the parent menu item.

  parent_menu = chrome.contextMenus.create({
    title: extension_name,
    contexts: ['all']
  });

  // Create the shell commands.

  if (config != null)
  {
    $.each( config.actions, function(i,action) {
      var child_menu = chrome.contextMenus.create({
        title: action.title,
        onclick: context_onclick,
        parentId: parent_menu,
        contexts: action.contexts
      });
      actions[child_menu] = action;
    });
  }

  // Create a special menu item for refreshing the context menu itself.
  // XXX kind of a hack, clean up when Chrome supports dynamic context menus

  var separator = chrome.contextMenus.create({
    type: 'separator',
    parentId: parent_menu,
    contexts: ['all']
  });

  var refresh_menuitem = chrome.contextMenus.create({
    title: 'Refresh This List of Commands',
    parentId: parent_menu,
    contexts: ['all'],
    onclick: function(info,tab) {
      populate_context_menu();
    }
  });

  var copy_urls = chrome.contextMenus.create({
    title: 'Copy all URLS to Console',
    parentId: parent_menu,
    contexts: ['all'],
    onclick: function(info,tab) {

      chrome.windows.getAll({populate:true},function(windows){
        windows.forEach(function(window){
          window.tabs.forEach(function(tab){
            //collect all of the urls here, I will just log them instead
            console.log(tab.url);
          });
        });
      });
    }
  });

}


// Listener for keyboard shortcuts, as defined in manifest.json (as "commands")

function setup_command_listener(config)
{
  chrome.commands.onCommand.addListener(function(command) {
    // Match command name to action name
    var action = $.grep(config.actions, function(a) {
      return a.name == command;
    })[0];
    handle_command(action);
  });
}

function handle_command(action)
{
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var data = {
      action: action,
      tab: tabs[0],
      info: {}  // Unfortunately unavailable in this context
    };
    post_action(data);
  });
}

function context_onclick(info, tab)
{
  var data = {
    action: actions[ info.menuItemId ],
    tab: tab,
    info: info
  };
  post_action(data);

  socket.emit('message', data);
}

function post_action(data)
{
//    alert(JSON.stringify(data));
  var payload = { action: data.action.name };
  $.each( data.info, function(k,v) { payload["info."+k] = v; } );
  $.each( data.tab, function(k,v) { payload["tab."+k] = v; } );
  ajax('/action/', payload, { type:'POST' });
}


function ajax( uri, data, opts )
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

  $.ajax($.extend({},defaults,opts));
}


// chrome.runtime.onMessageExternal.addListener(
//   function(request, sender, sendResponse) {
//     if (sender.url == '?')
//       return;  // don't allow this web page access
//     if (request.openUrlInEditor){
//         alert('ok from request');
//         //openUrl(request.openUrlInEditor);
//     }

//   });


  chrome.runtime.onMessage.addListener(function (msg, sender) {
    
    if ((msg.from === 'formCrawler') && (msg.subject === 'newInputs')) {
      socket.emit('formCrawler.newInputs', msg);
    }
  });  

})(jQuery);
