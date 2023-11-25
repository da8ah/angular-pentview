import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { role, tableItem } from '../../roles.types';
import { RolesService } from '../../services/roles.service';

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
  providers: [RolesService]
})
export class TableComponent implements OnChanges {
  // Data
  @Input() displayedColumns: string[]
  @Input() roles: role[]
  @Input() isDelete: boolean

  // Table
  dataSource: MatTableDataSource<tableItem>
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(private service: RolesService) { }

  ngOnChanges(changes: SimpleChanges): void {
    const table: tableItem[] = this.roles.map((item, i) => {
      return {
        'position': i + 1,
        'name': item.name
      }
    })
    this.dataSource = new MatTableDataSource(table)
    // this.userGenerator()
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
    for (let i = 1; i <= 100; i++) { table.push(createNewRole(i)); }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(table);
  }
}


/** Builds and returns a new User. */
function createNewRole(index: number): tableItem {
  const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
    'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
    'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

  return {
    position: index,
    name: NAMES[Math.round(Math.random() * (NAMES.length - 1))]
  }
}
