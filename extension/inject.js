/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// if page is repository, button on top
// if()
var ugly=[
    '<li>',
    '<div class="select-menu js-menu-container js-select-menu js-transitionable">',
    '<a class="btn btn-sm " aria-expanded="false" id="the_button_who_will_clone_this_repo">CUSTOM</a>',
    '</div>',
    '</li>'
].join('');

console.log([jQuery, jQuery('.pagehead-actions').prepend(ugly)]);


document.getElementById('the_button_who_will_clone_this_repo').onclick = function(){
    chrome.runtime.sendMessage('nkckncmnhgnilbbgdcpmdjihgdmhihed', {openUrlInEditor: 'aloalo'},
      function(response) {
        if (!response.success){
            alert('Errão'); //handleError('aloalo');
        }
          
      });    
}
//alert(jQuery('.pagehead-actions')); //.appendChild(ugly);
//alert('Hello from Inject');