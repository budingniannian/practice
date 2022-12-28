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

export function textColor(words,r,g,b,a){
  return '<span style="color:rgba(' + r + "," + g + "," + b + "," + a + ')">' + words + "</span>"
}

export function replaceItem(list, input, output){
  for (let i = 0; i < list.length; i++){
    if(list[i]==input){
      list[i] = output
    }
  }
  return list
}

export function remap(num, inMin, inMax, outMin, outMax) {

  const result = (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;

  if(result < outMin){
    return outMin
  }else if(result > outMax){
    return outMax
  }else{
    return result
  }
  
}
