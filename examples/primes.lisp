;; Prime numbers by trial division, plus a few number-theory classics.

(defun divides? (d n) (= (% n d) 0))

(defun prime? (n)
  (if (< n 2)
      (= 1 0)
      (no-divisor-from? 2 n)))

(defun no-divisor-from? (d n)
  (if (> (* d d) n)
      (= 1 1)
      (if (divides? d n)
          (= 1 0)
          (no-divisor-from? (+ d 1) n))))

;; Collect the first `count` primes, starting the search at `n`.
(defun first-primes (count n)
  (if (= count 0)
      ()
      (if (prime? n)
          (cons n (first-primes (- count 1) (+ n 1)))
          (first-primes count (+ n 1)))))

;; Euclid's algorithm.
(defun gcd (a b)
  (if (= b 0) a (gcd b (% a b))))

(defun lcm (a b) (/ (* a b) (gcd a b)))

;; Length of the Collatz sequence starting at n.
(defun collatz (n)
  (if (= n 1)
      1
      (+ 1 (collatz (if (= (% n 2) 0) (/ n 2) (+ (* 3 n) 1))))))

(print (first-primes 15 2))  ; (2 3 5 7 11 13 17 19 23 29 31 37 41 43 47)
(print (prime? 7919))        ; true
(print (gcd 1071 462))       ; 21
(print (lcm 4 6))            ; 12
(print (collatz 27))         ; 112
