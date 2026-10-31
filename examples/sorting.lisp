;; Two classic sorts written with plain recursion on lists.

(defun empty? (xs) (= (len xs) 0))

(defun append (a b)
  (if (empty? a)
      b
      (cons (car a) (append (cdr a) b))))

(defun filter (keep? xs)
  (if (empty? xs)
      ()
      (if (keep? (car xs))
          (cons (car xs) (filter keep? (cdr xs)))
          (filter keep? (cdr xs)))))

;; Quicksort: partition around the first element, sort each side.
(defun quicksort (xs)
  (if (empty? xs)
      ()
      (let ((pivot (car xs)) (rest (cdr xs)))
        (append (quicksort (filter (lambda (x) (< x pivot)) rest))
                (cons pivot
                      (quicksort (filter (lambda (x) (>= x pivot)) rest)))))))

;; Merge sort: split in halves, sort them, merge the results.
(defun take (n xs)
  (if (= n 0) () (cons (car xs) (take (- n 1) (cdr xs)))))

(defun drop (n xs)
  (if (= n 0) xs (drop (- n 1) (cdr xs))))

(defun merge (a b)
  (if (empty? a)
      b
      (if (empty? b)
          a
          (if (<= (car a) (car b))
              (cons (car a) (merge (cdr a) b))
              (cons (car b) (merge a (cdr b)))))))

(defun merge-sort (xs)
  (if (<= (len xs) 1)
      xs
      (let ((half (- (len xs) (% (len xs) 2))))
        (let ((mid (/ half 2)))
          (merge (merge-sort (take mid xs))
                 (merge-sort (drop mid xs)))))))

(defparameter data (38 27 43 3 9 82 10 3))

(print (quicksort data))   ; (3 3 9 10 27 38 43 82)
(print (merge-sort data))  ; (3 3 9 10 27 38 43 82)
