;; Higher-order functions: building map, filter and reduce from scratch.
;; Functions are values, so they can be passed around and returned.

(defun empty? (xs) (= (len xs) 0))

(defun range (from to)
  (if (> from to)
      ()
      (cons from (range (+ from 1) to))))

(defun map (f xs)
  (if (empty? xs)
      ()
      (cons (f (car xs)) (map f (cdr xs)))))

(defun filter (keep? xs)
  (if (empty? xs)
      ()
      (if (keep? (car xs))
          (cons (car xs) (filter keep? (cdr xs)))
          (filter keep? (cdr xs)))))

(defun reduce (f acc xs)
  (if (empty? xs)
      acc
      (reduce f (f acc (car xs)) (cdr xs))))

(defun compose (f g) (lambda (x) (f (g x))))

(defparameter numbers (range 1 10))
(defparameter square (lambda (x) (* x x)))
(defparameter even? (lambda (x) (= (% x 2) 0)))

(print numbers)                         ; (1 2 3 4 5 6 7 8 9 10)
(print (map square numbers))            ; (1 4 9 16 25 36 49 64 81 100)
(print (filter even? numbers))          ; (2 4 6 8 10)
(print (reduce + 0 numbers))            ; 55

;; Sum of the squares of the even numbers, as one pipeline.
(print (reduce + 0 (map square (filter even? numbers)))) ; 220

;; compose returns a new function.
(defparameter inc-then-square (compose square (lambda (x) (+ x 1))))
(print (map inc-then-square (1 2 3)))  ; (4 9 16)
