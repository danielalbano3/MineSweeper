const board = document.querySelector('#board')

const grid = []

for (let r = 1; r <= 10; r++){
  for (let c = 1; c <= 5; c++){
    const space = document.createElement('div')
    space.classList.add('space')
    space.addEventListener('click', e => {
      console.log(e.target)
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

let mines = 10
//choose 10 random numbers from 0 to 49
while (mines > 0){
  let num = Math.floor((Math.random() * 50) + 1)
  num--
  if (mines === 10) {
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
  let a = getCell(row - 1,col - 1)
  let b = getCell(row - 1,col)
  let c = getCell(row - 1,col + 1)
  let d = getCell(row,col - 1)
  let e = getCell(row,col + 1)
  let f = getCell(row + 1,col - 1)
  let g = getCell(row + 1,col)
  let h = getCell(row + 1,col + 1)

  if (a != null){ if (a.hasMine === true) count++ }
  if (b != null){ if (b.hasMine === true) count++ }
  if (c != null){ if (c.hasMine === true) count++ }
  if (d != null){ if (d.hasMine === true) count++ }
  if (e != null){ if (e.hasMine === true) count++ }
  if (f != null){ if (f.hasMine === true) count++ }
  if (g != null){ if (g.hasMine === true) count++ }
  if (h != null){ if (h.hasMine === true) count++ }

  getCell(row,col).mineCount = count
}

grid.forEach(cell => {
  cell.count()
  cell.hasMine ? cell.div.classList.add('mine') : cell.div.innerText = cell.mineCount
  if (cell.div.innerText == 0) cell.div.innerText = ''
})


function reveal(cell){
  console.log(cell)
}

function gameOver(){
  //grid.forEach(cell => cell.showAll())
}