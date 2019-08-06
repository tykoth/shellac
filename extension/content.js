// Inform the background page that 
// this tab should have a page-action
// chrome.runtime.sendMessage({
//     from: 'content',
//     subject: 'event',
//     total: document.querySelectorAll('*').length,
//     inputs: document.querySelectorAll('input').length,
//     buttons: document.querySelectorAll('button').length,
//     forms: document.querySelectorAll('form').length,

// });

// document.addEventListener('mousemove', function(event){
//   chrome.runtime.sendMessage({
//       from: 'content',
//       subject: 'showPageAction',
//       mouse:{x:event.x, y:event.y}
//   });
// })
  // // Listen for messages from the popup
  // chrome.runtime.onMessage.addListener(function (msg, sender, response) {

  //   console.log(['chrome.runtime.onMessage.addListener',msg, sender, response])
  //   // First, validate the message's structure
  //   // if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
  //     // Collect the necessary data 
  //     // (For your specific requirements `document.querySelectorAll(...)`
  //     //  should be equivalent to jquery's `$(...)`)
  //     var domInfo = {
  //     };
  
  //     // Directly respond to the sender (popup), 
  //     // through the specified callback */
  //     response(domInfo);
  //   // }
  // });