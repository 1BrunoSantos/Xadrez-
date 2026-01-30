var board = null
var game = new Chess()
var $status = $('#status')

function onDragStart (source, piece, position, orientation) {
  // Não permite pegar peças se o jogo acabou
  if (game.game_over()) return false

  // Só permite mover peças da cor de quem é a vez
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false
  }
}

function onDrop (source, target) {
  // Tenta fazer o movimento na lógica (memória)
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // SEMPRE promove para Rainha por simplicidade
  })

  // Se o movimento for ilegal, a peça volta
  if (move === null) return 'snapback'

  updateStatus()
}

// Atualiza a posição no tabuleiro visual após roque ou en passant
function onSnapEnd () {
  board.position(game.fen())
}

function updateStatus () {
  var status = ''
  var moveColor = (game.turn() === 'w') ? 'Brancas' : 'Pretas'

  if (game.in_checkmate()) {
    status = 'Fim de jogo, ' + moveColor + ' perderam (xeque-mate).'
  } else if (game.in_draw()) {
    status = 'Empate!'
  } else {
    status = moveColor + ' jogam'
    if (game.in_check()) {
      status += ', ' + moveColor + ' estão em xeque'
    }
  }

  $status.html(status)
}

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
}

board = Chessboard('myBoard', config)

$('#resetBtn').on('click', function () {
    game.reset()
    board.start()
    updateStatus()
})

updateStatus()
