;; Church numerals: numbers built out of nothing but functions.
;; The numeral n is a function that applies f to x, n times.

(defparameter zero (lambda (f) (lambda (x) x)))

(defun succ (n)
  (lambda (f) (lambda (x) (f ((n f) x)))))

(defun add (m n)
  (lambda (f) (lambda (x) ((m f) ((n f) x)))))

(defun mul (m n)
  (lambda (f) (m (n f))))

;; Convert back to a regular number by counting applications.
(defun to-int (n) ((n (lambda (x) (+ x 1))) 0))

(defparameter one (succ zero))
(defparameter two (succ one))
(defparameter three (add one two))

(print (to-int three))                    ; 3
(print (to-int (mul three (succ three)))) ; 12
(print (to-int (mul (add two three) (mul two two)))) ; 20
