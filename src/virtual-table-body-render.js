export default function render(h) {
  const data = this.data || [];
  return (
    <div
      style={[{height: `${this.table.virtualBodyHeight}px`}]}
      class={['el-table__virtual-wrapper', {'el-table--fixed__virtual-wrapper': this.fixed}]}
      v-mousewheel={this.table.handleFixedMousewheel}
    >
      <div style={[{transform: `translateY(${this.table.innerTop}px)`}]}>
      <table
        class="el-table__body"
        cellspacing="0"
        cellpadding="0"
        border="0">
        <colgroup>
          {
            this.columns
              .filter((column, index) => !(this.columnsHidden[index] && this.fixed))
              .map(column => <col name={column.id} key={column.id} />)
          }
        </colgroup>
        <tbody>
          {
            data.reduce((acc, row) => {
              const isSelected = this.store.isSelected(row);
              const isExpanded = this.store.states.expandRows.indexOf(row) > -1;
              return acc.concat(this.wrappedRowRender({
                row,
                $index: acc.length,
                isSelected,
                isExpanded
              }));
            }, [])
          }
          <el-tooltip effect={ this.table.tooltipEffect } popper-class="el-table-tooltip" placement="top" ref="tooltip" content={ this.tooltipContent }></el-tooltip>
        </tbody>
      </table>
      </div>
    </div>
  );
}
