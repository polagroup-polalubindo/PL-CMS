import React from "react";
import { Button } from '@material-ui/core';
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class exportToExcel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  render() {
    return (
      <ExcelFile filename={`Komisi-${this.props.month}-${Date.now()}`} element={<Button variant="contained" color="secondary" style={{ marginRight: 20 }}>Download</Button>}>
        <ExcelSheet data={this.props.data} name="All">
          {
            this.props.labelValue.length > 0 && this.props.labelValue.map((el, index) => (
              <ExcelColumn label={el.label} value={el.value} key={index} />
            ))
          }
        </ExcelSheet>
      </ExcelFile>
    );
  }
}
