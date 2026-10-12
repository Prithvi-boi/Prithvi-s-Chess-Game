# Slide helper Function
### slide(dx,dy) walks in one straight direction, one square at a time, and stops when something is in the way.

dx and dy are the direction:

- slide(1, 0) = move right (file +1, rank +0)
- slide(-1, 0) = left
- slide(0, 1) = up
- slide(0, -1) = down
- slide(1, 1) = diagonal up-right, and so on
-  slide(-1, -1) = diagonal down-left, and so on