import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeemodelobj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder, private api : ApiService) { }

  ngOnInit() {
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      Salary : ['']
    })
    this.getAllEmployee();
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails() {
    this.employeemodelobj.firstName = this.formValue.value.firstName;
    this.employeemodelobj.lastName = this.formValue.value.lastName;
    this.employeemodelobj.email = this.formValue.value.email;
    this.employeemodelobj.mobile = this.formValue.value.mobile;
    this.employeemodelobj.Salary = this.formValue.value.Salary;

    this.api.postEmployee(this.employeemodelobj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully");
      let ref = document.getElementById('cancel');
      ref.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("Something went wrong");
    })
  }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }

  deleteEmp(row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee Deleted");
      this.getAllEmployee();
    })
  }

  onEdit(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeemodelobj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['Salary'].setValue(row.Salary);
  }

  updateEmployeeDetails(){
  this.employeemodelobj.firstName = this.formValue.value.firstName;
  this.employeemodelobj.lastName = this.formValue.value.lastName;
  this.employeemodelobj.email = this.formValue.value.email;
  this.employeemodelobj.mobile = this.formValue.value.mobile;
  this.employeemodelobj.Salary = this.formValue.value.Salary;

  this.api.updateEmployee(this.employeemodelobj, this.employeemodelobj.id)
  .subscribe(res=>{
    alert("Updated Successfull");
    let ref = document.getElementById('cancel');
      ref.click();
      this.formValue.reset();
      this.getAllEmployee();
  })

  }
}
