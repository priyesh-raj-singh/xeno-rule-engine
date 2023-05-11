# xeno-rule-engine
Assignment work for SDE internship
test case 1- 
* Input: Order amount = $120, VIP status = Yes. Expected output: 10% discount applied.
         * Input: Order amount = $90, VIP status = Yes. Expected output: No discount applied.
         * Input: Order amount = $150, VIP status = No. Expected output: No discount applied.
         * condition - operation - effect
         * Case 1 :
         * Rule 1
         *  condition -> 40
         *  operation -> greaterThan
         *  effect -> turn ac to 24C 

end points in server - 
"/rule" - endpoint for creating rules that are framed in database.
"/rule/verify" - when we get input using this endpoint we verify the rules according to schema created in database.
