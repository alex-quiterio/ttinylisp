;; Towers of Hanoi: move n disks from one peg to another, one at a time,
;; never putting a bigger disk on a smaller one.

(defun move (n from to via)
  (if (= n 0)
      0
      (+ (move (- n 1) from via to)
         ;; A let body runs every expression and returns the last one.
         (let ()
           (print (concat "move disk " n " from " from " to " to))
           1)
         (move (- n 1) via to from))))

(print (concat "total moves: " (move 3 "A" "C" "B"))) ; 2^3 - 1 = 7
