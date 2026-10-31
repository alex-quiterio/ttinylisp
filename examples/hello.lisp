;; Greet a person by name.
(defun greet (name)
  (print (concat "Hello, " name "!")))

(greet "World") ; prints: Hello, World!

;; Recursion works because functions are defined in the global scope.
(defun factorial (n)
  (if (<= n 1)
      1
      (* n (factorial (- n 1)))))

(print (factorial 10)) ; prints: 3628800
