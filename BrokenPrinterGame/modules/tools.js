export function randInt(max) {
  return Math.floor(Math.random() * max);
}

export function str2list(str, type){
  if(type == 'char'){
    return str.split('')
  }
  else if(type == 'word'){
    return str.split(' ')
  }
}

export function list2str(li, type){
  if(type == 'char'){
    return li.join('')
  }
  else if(type == 'word'){
    return li.join(' ')
  }
}

export function replaceStr(list, oldOne, newOne){
  for (let i = 0; index < list.length; i++) {
    
    
  }
}
