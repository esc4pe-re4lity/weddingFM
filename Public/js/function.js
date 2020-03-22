/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function clean(node)
{
  for(var i = 0; i < node.childNodes.length; i ++)
  {
    var child = node.childNodes[i];
    if(child.nodeType === 8 || (child.nodeType === 3 && !/\S/.test(child.nodeValue)))
    {
      node.removeChild(child);
      i --;
    }
    else if(child.nodeType === 1)
    {
      clean(child);
    }
  }
}