import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);

import { TreeGrid, Resize, ExcelExport, PdfExport, Edit, Page, ContextMenu, Sort } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';

TreeGrid.Inject(Resize, ExcelExport, PdfExport, Edit, Page, ContextMenu, Sort);

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit, OnChanges {
  constructor() { }
  dataStorage: object | undefined;
  treegrid: TreeGrid = new TreeGrid;
  ngOnInit(): void {
    this.dataStorage = JSON.parse(localStorage.getItem('sampleData') || '{}');
    this.treegrid = new TreeGrid(
      {
          dataSource: this.dataStorage,
          allowSorting: true,
          childMapping: 'subtasks',
          height: 350,
          allowPaging: true,
          pageSettings: { pageSize: 10 },
          treeColumnIndex: 1,
          editSettings: { allowAdding: true, allowDeleting: true, allowEditing: true, mode: 'Row' },
          contextMenuItems: [
            'SortAscending', 'SortDescending',
            'Edit', 'Delete', 'Save', 
            'Cancel', 'AddRow', 'AutoFitAll',
            'FirstPage', 'PrevPage',
            'LastPage', 'NextPage'
          ],
          columns: [
              { field: 'taskID', headerText: 'Task ID', width: 80, isPrimaryKey: true, textAlign: 'Right', editType: 'numericedit' },
              { field: 'taskName', headerText: 'Task Name', width: 190 },
              { field: 'startDate', headerText: 'Start Date', format: 'yMd', width: 90,
                  editType: 'datepickeredit', textAlign: 'Right' },
              { field: 'endDate', headerText: 'End Date', format: 'yMd', width: 90, editType: 'datepickeredit', textAlign: 'Right' },
              { field: 'duration', headerText: 'Duration', width: 85, textAlign: 'Right', editType: 'numericedit',
                   edit: {params: {format: 'n'}} },
              { field: 'priority', headerText: 'Priority', width: 80 }
          ]
      });
  this.treegrid.appendTo('#TreeGrid');
  localStorage.setItem('sampleData', JSON.stringify(sampleData));
  }

  ngOnChanges(changes: any) {
    console.log(changes);
  }
}
