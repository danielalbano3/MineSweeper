const board = document.querySelector('#board')
const spaces = document.querySelectorAll('.space')
const gg = document.querySelector('#gameover')

const grid = []
const gRow = 20
const gCol = 10

for (let r = 1; r <= gRow; r++){
  for (let c = 1; c <= gCol; c++){
    const space = document.createElement('div')
    space.classList.add('space')
    space.addEventListener('click', e => {
      reveal(findCellObj(e.target))
    })
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
//choose 10 random numbers from 0 to 49
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
      gg.classList.add('show')
    }
  })
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