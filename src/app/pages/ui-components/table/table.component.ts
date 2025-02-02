import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { signal } from '@angular/core';
import { TestdialagComponent } from './testdialag/testdialag.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { InfodialogComponent } from './infodialog/infodialog.component';


export interface DialogData {
  name: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
}

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']

})

export class TableComponent {

  [x: string]: any;
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit', 'button'];
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource();
  displayedColumns2: string[] = ['id', 'name', 'progress', 'fruit', 'button'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatPaginator)
  paginator2!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  tap1Data: any[] = [];
  tap2Data: any[] = [];
  dataSource1: MatTableDataSource<any>;
  dataSource2: MatTableDataSource<any>;

  name: string = '';
  lastname: string = '';
  address1: string = '';
  address2: string = '';
  city: string = '';
  province: string = '';
  postalCode: string = '';
  phone: string = '';

  constructor(private _cdr: ChangeDetectorRef) {

    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));


    for (const item of users) {
      if (parseInt(item.progress, 10) < 50) {
        console.log(item)
        this.tap1Data.push(item);
      } else {
        this.tap2Data.push(item);
      }
    }



    this.dataSource1 = new MatTableDataSource(this.tap1Data);
    this.dataSource1.paginator = this.paginator;
    this.dataSource2 = new MatTableDataSource(this.tap2Data);
    this.dataSource2.paginator = this.paginator2;

    console.log(this.dataSource2);

  }
  dialogtest() {
    this.name
    console.log(this.name);

    this.dialog.open(InfodialogComponent, {
      width: '250px',
      height: 'auto',
      data: {
        name: this.name,
        lastName: this.lastname,
        address1: this.address1,
        address2: this.address2,
        city: this.city,
        province: this.province,
        postalCode: this.postalCode,
        phone: this.phone
      }
    });
  }


  ngAfterViewInit() {
    this.dataSource1.paginator = this.paginator;
    this._cdr.detectChanges();

    this.dataSource1.sort = this.sort;
    this.dataSource2.paginator = this.paginator2;
    this._cdr.detectChanges();

    this.dataSource2.sort = this.sort;



  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }
  longText1 = `Jack ชอบแซ่บๆสับปะรด 18%`;
  longText2 = `Asher A. ชอบแซ่บๆมะม่วง 18%`;
  step = signal(0);

  setStep(index: number) {
    this.step.set(index);
  }

  nextStep() {
    this.step.update(i => i + 1);
  }

  prevStep() {
    this.step.update(i => i - 1);
  }
  readonly dialog = inject(MatDialog);


  openDialog(test: any[]): void {
    this.dialog.open(TestdialagComponent, {
      width: '250px',
      height: 'auto',
      data: test
    });
  }

  readonly date = new FormControl(new Date());
  readonly serializedDate = new FormControl(new Date().toISOString());
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  
}


function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}