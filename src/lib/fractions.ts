import type { Frac } from "../type";

//greatest common divisor 
export function gcd(a: number, b: number) : number{
while (b!== 0){
    [a,b] = [b,a%b];
}
return a;
} 

//reduce a fraction to lowest term: 6/8 -> 2/4
export function simplify(f: Frac): Frac{
    const g = gcd(f.num, f.den);
    return {num: f.num/g , den: f.den/g}
} 

//are two fraction equal? 2/4 === 1/2 because 2*2, 4*1
export function equals(a: Frac, b: Frac): boolean{
    return a.num * b.den === b.num * a.den;
}

// -1 id a>b, 1 if a<b, 0 if equal
export function compare(a:Frac, b:Frac): -1 |0| 1{
    const left = a.num * b.den;
    const right = b.num * a.den;
    if(left<right) return -1;
    if(left>right) return 1;
    return 0;
} 