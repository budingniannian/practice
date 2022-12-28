import * as tools from './modules/tools.js'


let a = 50

console.log(tools.remap(50,1,10,10,100))


//Quotes

const quotes = [
    "Don't panic!",
    "Time is an illusion. Lunchtime doubly so.",
    "Would it save you a lot of time if I just gave up and went mad now?",
    "The ships hung in the sky in much the same way that bricks don't.",
    "I'd far rather be happy than right any day.",
    "Space is big. You just won't believe how vastly, hugely, mind-bogglingly big it is.",
    "I mean, you may think it's a long way down the road to the chemist's, but that's just peanuts to space.",
    "For a moment, nothing happened. Then, after a second or so, nothing continued to happen.",
    "Ford... you're turning into a penguin. Stop it.",
    "A towel is about the most massively useful thing an interstellar hitchhiker can have.",
    "The Answer to the Great Question... Of Life, the Universe and Everything... Is... Forty-two",
    "So long, and thanks for all the fish.",
    "Anyone who is capable of getting themselves made President should on no account be allowed to do the job.",
    "We demand rigidly defined areas of doubt and uncertainty!",
    "That's just perfectly normal paranoia. Everyone in the Universe has that.",
    "If I asked you where the hell we were, would I regret it?",
  ]

quotes.forEach(quote => 
  $ ('#quotes ul').append( $('<li>' + quote + '</li>'))
)












//Blur

function blurInput(){ 
  clearTimeout(blurTimeout)
  blurTimeout = null

  blurTimeout = setTimeout(() => {
    $( '#input' ).blur()
    console.log('blur')
  }, blurTime);
}

//Display

let typingCache = ' '

function display(list){
  list = list.replace(/( )/g,'&nbsp;')
  $('#display').append(list)
}

// Cursor

let cursorTime = 4000
let cursorCounter = 0

const cursorText = [
  '[try to type slowly ↓]',
  '[just wait when have no ideas →]',
  '[slide the cursor over the input box to start writing ☄]'
]

// Add blanks.

let timeCounter_addSpace = 0
let spaceInterval = 100
let addSpaceInterval

let blurTime = 3000
let blurTimeout

let underlineCounter = 0
let underline_return = 5

let opacityCounter = 1.0

function addSpace(){
  if(timeCounter_addSpace >= 1000){
    console.log('addSpace')

    if(opacityCounter >= 0.0){
      $('#display').append(tools.textColor('...',0,0,0,opacityCounter))
      opacityCounter -= 0.1
    }else{
      $('#display').append(tools.textColor('...',0,0,0,0))
    }
    
    
    timeCounter_addSpace = 0

    //$('#display').scrollTop($('#display').height())

    if(underlineCounter > (underline_return - 2)){
      $('#display').append('<br/>')
      underlineCounter = 0
    }else{
      underlineCounter += 1
    }
  }
  timeCounter_addSpace += spaceInterval
}

// Delete words randomly. 
// [[d],[e],[l]]
let deList = []
let delChars = ['d', 'e', 'l']

function addDeList(e){
  let currentKeyCode = String.fromCharCode(e.keyCode)
    if (delChars.includes(currentKeyCode)){
      deList.push(currentKeyCode)
    }
}

function delRandom(){
  console.log(typingCache)
  typingCache = tools.str2list(typingCache, 'char')
  
  for (let i = 0; i < deList.length; i++) {
    typingCache[tools.randInt(typingCache.length)] = '☐'
  }

  deList = []
  typingCache = tools.list2str(typingCache, 'char')
}


// Change text

let typingIntervals = [1.0]
let typingCounter = 0
let textOpaMin = 0.5
let textOpaMax = 1.0

function pressCounter(){
  typingCounter = (Date.now() - typingCounter)/1000
  typingIntervals.push(typingCounter)
  typingCounter = Date.now()
}

function textOpacity(){
  
  typingCache = tools.str2list(typingCache, 'char')
  console.log(typingCache)
  console.log(typingIntervals)
  if(typingCache.length == typingIntervals.length){
    for (let i = 0; i < typingCache.length; i++) {
      console.log(tools.textColor(typingCache[i],0,0,0,
        tools.remap(typingIntervals[i], 
          Math.min(typingIntervals), Math.max(typingIntervals), 
          textOpaMin, textOpaMax)))
      typingCache[i] = tools.textColor(typingCache[i],0,0,0,
        tools.remap(typingIntervals[i], 
          Math.min(typingIntervals), Math.max(typingIntervals), 
          textOpaMin, textOpaMax))
    }
  }else{
    for (let i = 0; i < typingCache.length; i++) {
      typingCache[i] = tools.textColor(typingCache[i],140,0,0,0.5)
    }
  }

  typingIntervals = [1.0]
  typingCache = tools.list2str(typingCache, 'char')
  console.log(typingCache)
}












$( document ).ready(function () {


  setInterval(() => {
    $('#cursor').text(cursorText[cursorCounter % cursorText.length])
    cursorCounter += 1
  }, cursorTime);



  $( '#input' ).on('keypress', function(event){

    if(event.keyCode !== 13){

      typingCache += String.fromCharCode(event.keyCode)

      pressCounter()

      addDeList(event)

    }else{

      delRandom()

      textOpacity()
      
      display(typingCache)
      typingCache = ' '
      $('#input').val('')
  
    }

  })

  $( '#input' ).on('keydown', function(){
    clearTimeout(blurTimeout)
    blurTimeout = null
  })

  $( '#input' ).on('keyup', function(event){
    blurInput()
  })

  $('#input').on('input', function(){
    
  })

  $('#input').on('focus', function(){
    typingCounter = Date.now()

    clearInterval(addSpaceInterval)
    addSpaceInterval = null
    opacityCounter = 1.0

    //blurInput()
  })

  $('#input').on('blur', function(){
    if (!addSpaceInterval){
      addSpaceInterval = setInterval(addSpace, spaceInterval)
    }
    $('#input').val('')
  })

  $('#input').on('mouseover', function(){
    $( '#input' ).focus()
    console.log('mouseOver')
  })

  document.addEventListener('mousemove', function(event){
    $('#cursor').css('left', event.pageX + (30) + 'px')
    $('#cursor').css('top', event.pageY + (-12) + 'px')
  })




})









