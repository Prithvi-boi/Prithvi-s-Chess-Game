
# getAttackedSquares(s, color) function  - Attacks.js

> It checks If color (Black or White) could capture on any square, which squares would it hit right now?" It returns a Set like {'a3', 'd5', 'f1', ...}.
> This is Used in MoveGen.js on Line number 130 as
> const enemyAttacks = getAttackedSquares(s, enemyColor, position.toLowerCase()) 

### 1. occupied. 
It loops over every array in the store and collects every square that has a piece (skipping '' slots). It's used only to know where sliders must stop.

### 2. The add(f, r) helper function
is the heart of it. It takes a file number (0-7 for a-h) and a rank (1-8):

If the square is off the board, it returns false.
Otherwise it puts the square in attacked, and returns true only if the square was empty.

The "return true only if empty" part is the same trick as your InsertMoves: the return value tells the sliding loop whether to keep going.

### 3. The slide helper function
walks in one direction, calling add each step, and breaks when add returns false. It's like your slide, with one difference: the blocker's square is still added to attacked before the loop stops.

### 4. The main loop 
It goes through every key like WhiteRook, skips the other color (key[0] != color), and reads the piece type from key[5] (R, B, Q, N, K, P). For each piece square it applies that piece's pattern:

- Rook: 4 straight slides. Bishop: 4 diagonal slides. Queen: both.
- Knight and king: single add calls, no sliding.
- Pawn: only the two diagonal squares ahead, never straight.

---

# case 'K' - MoveGen.js

### 1. Get the enemy's attacked squares:
> const enemyAttacks = getAttackedSquares(s, enemyColor, position.toLowerCase())

The third argument is ignoreSquare, the king's own square. It's removed from occupied, so the king doesn't block enemy rays that pass through it.

### 2. Check detection:
> const inCheck = attacked(position)
If the king's own square is in the enemy's set, the king is in check.

### 3. Castling. Only if not in check, each side needs all of these:

> king not in check
if (!inCheck) {
> squares between empty, king's path not attacked
    if (side.right && !occupied(`F${rank}`) && !occupied(`G${rank}`)
            && !attacked(`F${rank}`) && !attacked(`G${rank}`)) 
        {
            InsertMoves(letters[l + 2], rank, false)
        }

    if (side.left && !occupied(`B${rank}`) && !occupied(`C${rank}`) 
            && !occupied(`D${rank}`)
            && !attacked(`D${rank}`) && !attacked(`C${rank}`)) 
        {
            InsertMoves(letters[l - 2], rank, false)
        }
}

### 4. Normal king steps:
> InsertMoves(letters[l + x], Number(posY) + y)

### 5. The filter:
> Moves = Moves.filter(sq => !attacked(sq))
> killables = killables.filter(sq => !attacked(sq))

This removes any move onto an attacked square. The killables part covers protected pieces: the king can't capture a piece that's defended, because it would land in check.