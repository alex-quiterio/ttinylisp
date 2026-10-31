;; FizzBuzz from 1 to 15, collected into a list.

(defun fizzbuzz (n)
  (if (= (% n 15) 0)
      "FizzBuzz"
      (if (= (% n 3) 0)
          "Fizz"
          (if (= (% n 5) 0) "Buzz" n))))

(defun fizzbuzz-upto (from to)
  (if (> from to)
      ()
      (cons (fizzbuzz from) (fizzbuzz-upto (+ from 1) to))))

(print (fizzbuzz-upto 1 15))
; (1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz)
