
//Primitive Types: string number boolean

const Name:String="RAM";
const age:number=100
const isMarried:boolean=false;
console.log(Name);

//Object Types 
const address: {
  city: string;
  province: string;
  country: string;
  postalCode: number;
  street: string;
} = {
  street: "Birat Chowk",
  city: "Biratnagar",
  province: "Koshi",
  country: "Nepal",
  postalCode: 56604,
};

// array types
const phoneNumber:number[]=[213454,54675685,78980,798]


// array of object types
const students: {
  name: string;
  class: number;
  roll: number;
}[] = [
  {
    name: "ram",
    class: 10,
    roll: 1,
  },
  {
    name: "harry",
    class: 10,
    roll: 2,
  },
  {
    name: "sita",
    class: 10,
    roll: 3,
  },
];

// any-> dynamic (not recommended)
 const data:any =[12345,"dfcg",true,21345]

// multiple types
const number:string | number = 12345;
const idNumber:string | number = "12345";

//enum(fixed Types)
const role:"User"|"Merchant"|"Admin"='Merchant'



/*
 * 1. Function type:()=>void
 * 2. Function's params type
 * 3. Function's return type
 */
function sum(a: number, b: number):number{
    return a + b;
}
sum(123,3453)


const greet = (name: string): string => {
    return `Hello ${name}`;
};

greet("ram");




function hello() {
  // console.log("hello");
}

const getUser = async (): Promise<string> => {
  return await "User";
};


type address={
    city: string;
  province: string;
  country: string;
  postalCode: number;
  street: string;

};
interface User {
    name: string;              // required
    age: number;               // required
    email?: string | number;   // optional (string OR number)
    phone?: number;            // optional (only number)
    roles: string[]; 
    location?:address;          // required (array of strings)
}
interface Student extends User{
class:number;
roll:number;
section:number;
}
type Teacher=User &{
  subject:string[];
  faculty :string;
}
const user1: User = {
    name: "Ram",
    age: 30,
    roles: ["user"],
};
const user2: User = {
    name: "Ram",
    age: 30,
    email: "sam@gmail.com", // optional but included
    roles: ["admin"],
};
const teacher: Teacher={

};

//type
type Address={
    city: string;
  province: string;
  country: string;
  postalCode: number;
  street: string;

};
const address2:Address={
  street: "Birat Chowk",
  city: "Biratnagar",
  province: "Koshi",
  country: "Nepal",
  postalCode: 56604,
};