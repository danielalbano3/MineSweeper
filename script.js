const board = document.querySelector('#board')
const spaces = document.querySelectorAll('.space')
const gg = document.querySelector('#gameover')
const minecounter = document.querySelector('#counter')
const reload = document.querySelector('#reload')

const grid = []
const gRow = 20
const gCol = 10

let over = false

for (let r = 1; r <= gRow; r++){
  for (let c = 1; c <= gCol; c++){
    const space = document.createElement('div')
    space.classList.add('space')
    space.addEventListener('click', e => clickCell(e))
    space.addEventListener('contextmenu', e => flag(e))
    board.appendChild(space)
    const cell = {
      row: r,
      col: c,
      hasMine: false,
      div: space,
      count(){
        countAround(this.row,this.col)
      },     
    }
    grid.push(cell)
  }
}

let size = gRow * gCol
let mines = size * 0.2
const allMines = mines

minecounter.innerText = allMines

while (mines > 0){
  let num = Math.floor((Math.random() * size) + 1)
  num--
  if (mines === size * 0.2) {
    grid[num].hasMine = true
    mines--
  }
  if (!grid[num].hasMine === true){
    grid[num].hasMine = true
    mines--
  }
}

function findCellObj(target){
  return grid.find(cell => cell.div === target)
}

function getCell(row,col){
  return grid.find(cell => cell.row === row && cell.col === col)
}

function countAround(row,col){
  let count = 0
  const delta = [
    [-1,-1],
    [-1,0],
    [-1,1],
    [0,-1],
    [0,1],
    [1,-1],
    [1,0],
    [1,1]
  ]

  delta.forEach(d => {
    let cell = getCell(row + d[0],col + d[1])
    if (cell != null){
      if (cell.hasMine === true) count++
    }
  })
 
  getCell(row,col).mineCount = count
}

grid.forEach(cell => {
  cell.count()
  cell.div.classList.add('hidden')
})


function reveal(cell){
  cell.div.classList.remove('hidden')
  if (cell.hasMine){
    cell.div.classList.add('mine')
    drawMine(cell.div)
    gameOver()
  } else {
    cell.div.innerText = cell.mineCount
    if (cell.div.innerText == 0){
      cell.div.innerText = ''
      showAdjacent(cell)
    }  

  }

}

function gameOver(){
  grid.forEach(cell => {
    if (cell.div.classList.contains('hidden') && cell.hasMine) {
      reveal(cell)
    }
  })
  gg.classList.add('show')
  board.classList.add('lose')
  document.body.classList.add('lose')
  over = true
}

function showAdjacent(cell){
  const row = cell.row
  const col = cell.col

  const delta = [
    [-1,-1],
    [-1,0],
    [-1,1],
    [0,-1],
    [0,1],
    [1,-1],
    [1,0],
    [1,1]
  ]

  delta.forEach(d => {
    let cell = getCell(row + d[0],col + d[1])
    if (cell != null){
      if (cell.div.classList.contains('hidden')) {
        cell.div.classList.remove('hidden')
        reveal(cell)
      }
    }
  })
}

function checkWin(){
  const notMines = grid.filter(cell => cell.hasMine === false && !cell.div.classList.contains('hidden'))
  if (notMines.length === (size - allMines)) gameWin()
  
  const hiddenMines = grid.filter(cell => cell.hasMine === true)
}

function gameWin(){
  over= true
  board.classList.add('win')
  document.body.classList.add('win')
  gg.innerText = 'You Win!'
  gg.classList.add('win')
  gg.classList.add('show')
  console.log('you win')
}

function clickCell(event){
  if (over) return
  if (event.target.classList.contains('flag')) return
  reveal(findCellObj(event.target))
  checkWin()
}

function flag(event) {
  event.preventDefault()
  const cell = event.target
  if (!event.target.classList.contains('hidden')) return
  let minecount = parseInt(minecounter.innerText)
  if (cell.classList.contains('flag')){
    cell.classList.remove('flag')
    minecount++
  } else {
    cell.classList.add('flag')
    minecount--
  } 
  minecounter.innerText = minecount
}

reload.addEventListener('click', () => window.history.go(0))

function drawMine(target){
  const minebody = document.createElement('div')
  minebody.classList.add('minebody')
  const minespike1 = document.createElement('div')
  minespike1.classList.add('spike')
  minespike1.classList.add('spike1')
  const minespike2 = document.createElement('div')
  minespike2.classList.add('spike')
  minespike2.classList.add('spike2')

  minebody.appendChild(minespike1)
  minebody.appendChild(minespike2)

  target.appendChild(minebody)
}