import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { tableItem, users } from '../../users.types';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatButtonModule, MatSelectModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnChanges {
  // Data
  @Input() displayedColumns: string[]
  @Input() users: users

  // Actions
  isNew: boolean = false
  isDelete: boolean = false

  // Table
  dataSource: MatTableDataSource<tableItem>
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor() { }

  onAction(opcion: boolean) {
    if (opcion) this.isNew = !this.isNew
    else {
      if (!this.isDelete) this.displayedColumns.push('actions')
      else this.displayedColumns.splice(this.displayedColumns.length - 1)
      this.isDelete = !this.isDelete
    }
  }
  onNew() { }
  onDelete(id: string) { }

  ngOnChanges(changes: SimpleChanges): void {
    const table: tableItem[] = this.users.map((item, i) => {
      return {
        'position': i + 1,
        '_id': item._id,
        'name': item.firstName,
        'last': item.lastName,
        'email': item.email,
        'role': item.role.name
      }
    })
    // this.dataSource = new MatTableDataSource(table)
    this.userGenerator()
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  // Utils
  userGenerator() {
    // Create 100 users
    const table: tableItem[] = [];
    for (let i = 1; i <= 100; i++) { table.push(createNewUser(i)); }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(table);
  }
}

/** Builds and returns a new User. */
function createNewUser(index: number): tableItem {
  const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
    'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
    'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    position: index,
    _id: index.toString(),
    name: name,
    last: name,
    email: `${name}@email.com`,
    role: Math.round(Math.random() * 100) % 2 === 0 ? 'ADMIN' : 'USER'
  };
}