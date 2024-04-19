export class Employee {
    id!: Number;
    name: String;
    age: Number;
    department: String;
    salary: Number;

    constructor(name: String, age: Number, department: String, salary: Number){
        this.name = name;
        this.age = age;
        this.department = department;
        this.salary = salary;
    }
}