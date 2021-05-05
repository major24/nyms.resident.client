import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SpendCategory, SpendMasterCategory } from '../../../models/index';
import { SpendCategoryService } from '../../../services/spend-category.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { Role } from '../../../../models/role';

export interface RoleUI {
  id: number;
  name: string;
  isChecked: boolean;
}
@Component({
  selector: 'categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  spendMasterCategories: SpendMasterCategory[] = []
  spendCategories: SpendCategory[] = [];
  roles: Role[] = [];
  loading: boolean = false;
  selectedCategoryId: number;
  error: string = '';
  saving: boolean = false;
  closeResult = '';
  newRoles: RoleUI[] = [];
  newSpendCategory: SpendCategory = { id: 0, spendMasterCategoryId: 0, name: '', roles: this.newRoles };
  initSpendCategory: SpendCategory = { id: 0, spendMasterCategoryId: 0, name: '' , roles: this.newRoles };

  createCategoryForm = new FormGroup({
    masterCategory: new FormControl(''),
    name: new FormControl(''),
    role: new FormControl('')
  });

  constructor(private spendCategoryService: SpendCategoryService,
    private userService: UserService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadMasterCategories();
    this.loadCategories();
    this.loadRoles();
  }

  loadMasterCategories(): void {
    this.loading = true;
    this.spendCategoryService.loadMasterCategories()
    .subscribe({
      next: (data) => {
        Object.assign(this.spendMasterCategories, [...data]);
        this.loading = false;
      },
      error: (error) => {
        console.log('Error fetching master categories ', error);
        this.loading = false;
      }
    });
  }

  loadCategories(): void {
    this.loading = true;
    this.spendCategoryService.loadCategories()
    .subscribe({
      next: (data) => {
        Object.assign(this.spendCategories, [...data]);
        console.log('loaded cats:', this.spendCategories)
        this.loading = false;
      },
      error: (error) => {
        console.log('Error fetching categories ', error);
        this.loading = false;
      }
    });
  }

  loadRoles(): void {
    this.loading = true;
    this.userService.loadRoles()
    .subscribe({
      next: (data) => {
        Object.assign(this.roles, [...data]);
        this.loading = false;
      },
      error: (error) => {
        console.log('Error fetching roles ', error);
        this.loading = false;
      }
    });
  }

  onMasterCategoryChange(event: any): void {
    if (event.target.value) {
      this.newSpendCategory = Object.assign(this.newSpendCategory, { spendMasterCategoryId: +event.target.value });
    }
  }

  onNameChange(event: any): void {
    if (event.target.value) {
      this.newSpendCategory = Object.assign(this.newSpendCategory, { name: event.target.value });
    }
  }

  onRoleChange(event: any, id: number): void {
    let rolesClone = this.newSpendCategory.roles;
    rolesClone.map(r => {
      if (r.id === id) {
        r.isChecked = event.target.checked;
      }
    });
    this.newSpendCategory = Object.assign(this.newSpendCategory, { roles: rolesClone });
  }

  saveCategory(): void {
    if (this.newSpendCategory.name == '' || this.newSpendCategory.spendMasterCategoryId == 0) return;
    // assign roles to newSpendCategory
    let newSpendUpdate = Object.assign({}, this.newSpendCategory);
    const rolesToSend = this.newSpendCategory.roles.filter(r => r.isChecked === true);
    newSpendUpdate = Object.assign(newSpendUpdate, { roles: rolesToSend });
    console.log('>>>>saving33..', newSpendUpdate);

    if (this.newSpendCategory.id === 0) {
      this.saving = true;
      this.spendCategoryService.createCategory(newSpendUpdate)
        .subscribe({
          next: (data) => {
            this.modalService.dismissAll();
            this.saving = false;
            // reload data
            this.loadCategories();
          },
          error: (error) => {
            console.log('Error creating category ', error);
            this.saving = false;
          }
        });
    } else {
      this.saving = true;
      this.spendCategoryService.updateCategory(newSpendUpdate)
        .subscribe({
          next: (data) => {
            this.modalService.dismissAll();
            this.saving = false;
            // reload data
            this.loadCategories();
          },
          error: (error) => {
            console.log('Error creating category ', error);
            this.saving = false;
          }
        });
    }
  }







    // open from template
    openModal(contentAdd: any, id: number) {
      console.log('opeining11....', id);
      this.selectedCategoryId = +id;
      this.error = '';
      this.newRoles.splice(0, this.newRoles.length);
      let arr = [];
      if (this.selectedCategoryId > 0) {
        const selectedCategory = this.spendCategories.find(c => c.id === this.selectedCategoryId);
        this.newSpendCategory = Object.assign(this.newSpendCategory, selectedCategory);
        selectedCategory.roles.forEach(r => {
          arr.push(r.id);
        });
      } else {
        this.newSpendCategory = Object.assign(this.newSpendCategory, this.initSpendCategory);
      }
      this.roles.forEach(r => {
        this.newRoles.push({ id: r.id, name: r.name, isChecked: arr.includes(r.id) });
      });
      this.newSpendCategory = Object.assign(this.newSpendCategory, { roles: this.newRoles });

      this.createCategoryForm.controls['masterCategory'].setValue(this.newSpendCategory.spendMasterCategoryId);
      this.createCategoryForm.controls['name'].setValue(this.newSpendCategory.name);

      this.open(contentAdd);
    }
    // private
    open(content) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }




}
