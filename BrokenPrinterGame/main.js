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

// Cursor

const cursorText = [
  '[try to type slowly ↓]',
  '[just wait when have no ideas →]',
  '[slide the cursor over the input box to start writing ☄]'
]

let cursorTime = 4000
let cursorCounter = 0


// Add a underline.
let timeCounter_addSpace = 0
let spaceInterval = 100
let addSpaceInterval

let blurTime = 3000
let blurTimeout

let underlineCounter = 0
let underline_return = 5

// Delete words randomly.
let deList = []



function randInt(max) {
  return Math.floor(Math.random() * max);
}






function display(e){
  $('#display').append(String.fromCharCode(e.keyCode))
}

function addSpace(){
  if(timeCounter_addSpace >= 1000){
    $('#display').append('...')
    console.log('addSpace')
    timeCounter_addSpace = 0

    $('#display').scrollTop($('#display').height())

    if(underlineCounter > (underline_return - 2)){
      $('#display').append('<br/>')
      underlineCounter = 0
    }else{
      underlineCounter += 1
    }
  }
  timeCounter_addSpace += spaceInterval
}

function blurInput(){ 
  clearTimeout(blurTimeout)
  blurTimeout = null

  blurTimeout = setTimeout(() => {
    $( '#input' ).blur()
    console.log('blur')
  }, blurTime);
}

function addDeList(e){
  let currentKeyCode = String.fromCharCode(e.keyCode)
    if (currentKeyCode == 'd' ||
        currentKeyCode == 'e' ||
        currentKeyCode == 'l'){
      deList.push(currentKeyCode)
    }
}

function delRandom(){
  const nowdeList = $('#display').html().split('<br>')
  console.log(nowdeList)
  
  for (let i = 0; i < deList.length; i++) {
    if (deList[i] && deList [i+1] && deList[i+2]){
      if(deList[i].toLowerCase() == 'd' && 
        deList [i+1].toLowerCase() == 'e' && 
        deList[i+2].toLowerCase() == 'l'){
          const rI = randInt(nowdeList.length)
          if(typeof(nowdeList[rI]) == 'string'){
            const It = nowdeList[rI].split('')
            for (let i = 0; i < It.length; i++) {
              It[i] = '☐'
            }
            nowdeList[rI] = It.join('')
          }
      }
    }
  }

  deList = []
  let newdeList = nowdeList.flat(Infinity)
  //$('#display').text(newdeList.join(' '))
}

$( document ).ready(function () {


  setInterval(() => {
    $('#cursor').text(cursorText[cursorCounter % cursorText.length])
    cursorCounter += 1
  }, cursorTime);



  $( '#input' ).on('keypress', function(event){
    display(event)
    addDeList(event)
  })

  $('#input').on('input', function(){
    blurInput()
  })

  $('#input').on('focus', function(){
    clearInterval(addSpaceInterval)
    addSpaceInterval = null

    blurInput()
  })

  $('#input').on('blur', function(){
    if (!addSpaceInterval){
      addSpaceInterval = setInterval(addSpace, spaceInterval)
    }
    $('#input').val('')
    delRandom()
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









