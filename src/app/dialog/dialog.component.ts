import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {

  productForm !: FormGroup;
  dataSource: any;
  actionBtn: String = "Save";

  constructor(private formbuilder: FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<DialogComponent>
    , @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      productName: ["", Validators.required],
      category: ["", Validators.required],
      date: ["", Validators.required],
      price: ["", Validators.required],
      comment: ["", Validators.required]
    })

    if (this.editData) {
      this.actionBtn = "update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }
  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value)
          .subscribe({
            next: (res) => {
              alert("succefully added")
              this.productForm.reset();
              this.dialogRef.close('Save');
            },
            error: () => {
              alert("something wrong added")
            }
          })
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.api.putProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("succefully updated")
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("something wrong updated")
        }
      })
  }
}










