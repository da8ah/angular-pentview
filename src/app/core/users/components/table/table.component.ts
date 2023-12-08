import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SnackbarComponent } from '../../../../base/snackbar/snackbar.component';
import { UsersService } from '../../services/users.service';
import { tableItem, user } from '../../users.types';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [UsersService]
})
export class TableComponent implements OnChanges {
  // Data
  @Input() displayedColumns: string[]
  @Input() users: user[]
  @Input() isDelete: boolean
  @Output() changeDelete = new EventEmitter()

  onChangeDelete() {
    this.changeDelete.emit()
  }

  // Table
  dataSource: MatTableDataSource<tableItem>
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  // SnackBar
  snackBarRef: MatSnackBarRef<{
    data: { status: number, message: string }
  }>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private snackBar: MatSnackBar, private srvUsers: UsersService) { }

  onDelete(id: string) {
    const user = this.users.find(user => user._id === id)
    if (!!user) this.srvUsers.deleteUser(user).subscribe({
      next: (res: any) => { if (res.ok) console.log('eliminado'); this.openSnackBar(res.status, res.body.message); this.srvUsers.getUsers() },
      error: (error) => { console.log(error); this.openSnackBar(error.status, error.error.message) }
    })
  }

  openSnackBar(status: number, message: string) {
    this.snackBarRef = this.snackBar.openFromComponent(SnackbarComponent, {
      data: { status, message },
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000
    })
  }

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
    this.dataSource = new MatTableDataSource(table)
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
}
