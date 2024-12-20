import { useState } from 'react';
import { tableData } from '../../data/tableData';
import { formatNumber } from '../../utils/formatNumber';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styles from './TableWithChart.module.css';

export const TableWithChart = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const options = selectedRow
    ? {
        chart: {
          type: 'line',
        },
        title: {
          text: `${selectedRow.label}`,
        },
        xAxis: {
          categories: ['Текущий день', 'Вчера', 'Этот день недели'],
        },
        yAxis: {
          title: {
            text: 'Сумма (руб)',
          },
        },
        series: [
          {
            name: selectedRow.label,
            data: [
              selectedRow.currentDay,
              selectedRow.yesterday,
              selectedRow.thisWeek,
            ],
          },
        ],
      }
    : {};

  return (
    <section>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.highchart} colSpan={4}>
              {selectedRow && (
                <HighchartsReact highcharts={Highcharts} options={options} />
              )}
            </th>
          </tr>
          <tr>
            <th>Показатель</th>
            <th className={styles.current_day}>Текущий день</th>
            <th>Вчера</th>
            <th>Этот день недели</th>
          </tr>
        </thead>

        <tbody>
          {tableData.map((row, index) => (
            <tr
              className={
                row.label === selectedRow?.label ? styles.active_row : ''
              }
              key={index}
              onClick={() => setSelectedRow(row)}
            >
              <td>{row.label}</td>
              <td className={`${styles.col_num} ${styles.current_day}`}>
                {formatNumber(row.currentDay)}
              </td>
              <td className={styles.col_num}>{formatNumber(row.yesterday)}</td>
              <td className={styles.col_num}>{formatNumber(row.thisWeek)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
