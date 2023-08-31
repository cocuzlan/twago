/**
 * @description Algorith for primes numbers from 2 to max
 * @param { Number } max Maximun for primes
 * @returns { Object } primes Array with primes numbers
 */
const PRIMES = (max=100) => {
  let primes = []
  for (let num = 2; num <= max; num++) {
    primes.push(num)
    primes = primes.filter((number) => {
      for (var i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) return false
      }
      return true;
    })
  }
  return primes
}
/**
 * @description Logic for create sizes for cointaner and child
 * @param { Object } param
 * @var { Number } container_size Size for cointaner
 * @var { Function } callback Function callback for create a cointaner
 * @var { Function } callbackChildren Function callback for create a child
 */
const SquaresLogic = ({
  container_size,
  child_size,
  callback,
  callbackChildren
}) => {
  let containerSize = container_size
  if (typeof containerSize != 'number') {
    containerSize = Math.floor(Math.random() * window.innerWidth)
  }
  if (!containerSize) {
    return alert('Size of cointaner is 0, please refreh to page')
  }
  
  let primes_result
  if (typeof child_size == 'number') {
    primes_result = child_size
    if (!child_size) {
      return alert('Size of child is 0, please refreh to page')
    }
    if (child_size>containerSize) {
      return alert('Size of child is higher that cointainer, please refreh to page')
    }
    if (child_size===containerSize) {
      callback({
        containerSize,
        gridNumber: containerSize,
        flag: 1
      })
      callbackChildren({
        number: containerSize,
        containerSize: containerSize
      })
      return
    }
    if (!(containerSize%child_size)) {
      let n = containerSize/child_size
      callback({
        containerSize,
        gridNumber: n,
        child_size,
        flag: 2
      })
      for (let i = 0; i < Math.pow(n, 2); i++) {
        callbackChildren({
          number: n,
          containerSize: child_size
        })
      }
      return
    }
    // -----------------------------------------------------------------
    let n = Math.floor(containerSize/child_size)
    callback({
      containerSize,
      child_size,
      gridNumber: n,
      flag: 2
    })
    for (let i = 0; i < Math.pow(n, 2); i++) {
      callbackChildren({
        number: n,
        containerSize: child_size
      })
    }
    // -----------------------------------------------------------------
  } else {
    primes_result = PRIMES()
    primes_result = primes_result.filter((number) => {
      if (!(containerSize%number)) {
        return true
      }
      return false
    })
    if (!primes_result.length) {
      let ran = Math.floor(Math.random() * 100)
      callback({
        containerSize,
        gridNumber: ran
      })
      for (let i = 0; i < Math.pow(ran, 2); i++) {
        callbackChildren({
          number: ran,
          containerSize: containerSize/ran
        })
      }
      return
    }
    for (const n of primes_result) {
      callback({
        containerSize,
        gridNumber: n,
      })
  
      for (let i = 0; i < Math.pow(n, 2); i++) {
        callbackChildren({
          number: n,
          containerSize: containerSize/n
        })
      }
    }
  }
}
/**
 * @description Function for draw a child
 * @param { Object } param 
 * @var { Number } number No. prime for identify the div parent
 * @var { Number } containerSize Size for child
 */
const SquaresChildrenDraw = ({
  number,
  containerSize
}) => {
  const cointaner = document.createElement('div')
  cointaner.style.height = `${containerSize}px`
  cointaner.style.width = `${containerSize}px`
  cointaner.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
  let timer = null
  cointaner.addEventListener('mouseover', () => {
    cointaner.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
    timer = setInterval(() => {
      cointaner.style.backgroundColor = '#fff'
    }, "2000")
  })
  cointaner.addEventListener('mouseout', () => {
    clearInterval(timer)
  })
  const mainSquare = document.getElementById(`cointaner-${number}`)
  mainSquare.appendChild(cointaner)
}
/**
 * @description Function for draw a cointaner
 * @param { Object } param
 * @var { Number } containerSize Size for cointaner
 * @var { Number } gridNumber No. prime for identify the div parent
 */
const SquaresDraw = ({
  containerSize,
  gridNumber,
  child_size,
  flag = 0
}) => {
  const headerText = document.createElement('h3')
  if (flag == 1) {
    headerText.textContent = `Cointaner create with size ${containerSize}px and child with size ${gridNumber}px and 1 child`
  } else if (flag == 2) {
    headerText.textContent = `Cointaner create with size ${containerSize}px and child with size ${child_size}px with ${Math.pow(gridNumber, 2)} children`
  } else {
    headerText.textContent = `Cointaner create with a prime ${gridNumber} and childs ${Math.pow(gridNumber, 2)}`
  }
  const cointaner = document.createElement('div')
  cointaner.id = `cointaner-${gridNumber}`
  cointaner.style.height = `${containerSize}px`
  cointaner.style.width = `${containerSize}px`
  cointaner.style.border = '5px solid black'
  cointaner.style.display = 'grid'
  cointaner.style.gridTemplateColumns = `repeat(${gridNumber}, auto)`
  cointaner.style.margin = '1%'
  const main = document.getElementById('mainSquare')
  main.appendChild(headerText);
  main.appendChild(cointaner);
}
/**
 * @description Init script for draw a cointainer and childs
 * Cases
 * 1. If don´t set a cointainer and child sizes
 *  1.1. Create a elements with random size
 *  1.2. If cointainer size is 0, return alert
 *  1.3. If exists one or more multiples where fully within the container, create the number of cointaners appropriate to this multiples
 *  1.4. If don´t exist one multiple where fully within the container, create only one cointaner with children size random within 0 to 100
 * 2. If set a cointainer size but don´t from child size
 *  2.1. If cointainer size is 0, return alert 
 *  2.2. If exists one or more multiples where fully within the container, create the number of cointaners appropriate to this multiples
 *  2.3. If don´t exist one multiple where fully within the container, create only one cointaner with children size random within 0 to 100
 * Case 1 and 2, always the child size is lower that cointainer size
 * 3. If set a cointainer and child size
 *  3.1. If cointainer or child size is 0, return alert
 *  3.2. If child size is higher that cointainer, return alert
 *  3.3. If child size is same that cointainer, create only one child
 *  3.4. If child size fully within the container, create the respective children
 *  3.5. If child size NOT fully within the container, create the respective children
 */

// Case 1 for use
SquaresLogic({
  callback: SquaresDraw,
  callbackChildren: SquaresChildrenDraw
})

// Case 2
// SquaresLogic({
//   container_size: 0,
//   callback: SquaresDraw,
//   callbackChildren: SquaresChildrenDraw
// })
// SquaresLogic({
//   container_size: 800,
//   callback: SquaresDraw,
//   callbackChildren: SquaresChildrenDraw
// })
// SquaresLogic({
//   container_size: 373,
//   callback: SquaresDraw,
//   callbackChildren: SquaresChildrenDraw
// })

// Case 3
// SquaresLogic({
//   container_size: 800,
//   child_size: 0,
//   callback: SquaresDraw,
//   callbackChildren: SquaresChildrenDraw
// })
// SquaresLogic({
//   container_size: 800,
//   child_size: 801,
//   callback: SquaresDraw,
//   callbackChildren: SquaresChildrenDraw
// })
// SquaresLogic({
//   container_size: 300,
//   child_size: 300,
//   callback: SquaresDraw,
//   callbackChildren: SquaresChildrenDraw
// })
// SquaresLogic({
//   container_size: 300,
//   child_size: 30,
//   callback: SquaresDraw,
//   callbackChildren: SquaresChildrenDraw
// })
// SquaresLogic({
//   container_size: 300,
//   child_size: 19,
//   callback: SquaresDraw,
//   callbackChildren: SquaresChildrenDraw
// })
