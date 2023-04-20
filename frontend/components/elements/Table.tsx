// cred Kevin Powel - https://www.youtube.com/watch?v=czZ1PvNW5hk
import styled from "styled-components"


export function Table({ tableData }: { tableData: any }) {

  tableData = {
    headers: [
      'name',
      'type',
      'height (m)',
      'weight (kg)',
      'base Experience',
    ],
    cells: [
      {
        name: 'pikachu',
        type: 'electric',
        height: '0.4',
        weight: '6.0',
        baseExp: '112',
      },
      {
        name: 'Charmander',
        type: 'Fire',
        height: '0.6',
        weight: '8.5',
        baseExp: '62',
      }
    ]
  }

  function handleCellRender(obj: any) {

    const keys = Object.keys(obj);
    const values = Object.values(obj)
    // console.log({ keys, values });

    const element = keys.map((k, i) => {

      return (
        <tr key={i}>
          <td data-cell={k}>
            heyyy
            {/* {values[i]} */}
          </td>
        </tr>
      )
    })
    console.log(element);

    return element
  }


  return (

    <div role="region" aria-labelledby="Cap" tabIndex={0}>
      <StyledTable>
        <caption> Table Caption </caption>

        <thead>
          <tr>
            {tableData.headers.map((head: string) => (
              <th key={head}> {head} </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableData.cells.map((cell: any) => {
            handleCellRender(cell)

          })}

          <tr>
            <td data-cell="name">Snorlax</td>
            <td data-cell="type">Normal</td>
            <td data-cell="height">2.1</td>
            <td data-cell="weight">460.0</td>
            <td data-cell="base-exp">189</td>
          </tr>
        </tbody>


      </StyledTable>
    </div>
  )
}
// export function Table({tableData}:{tableData:any}) {
//   return (
//     // @ts-ignore
//     <div role="region" aria-labelledby="Cap" tabindex="0">
//       <StyledTable>
//         <caption> Table Caption </caption>

//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Type</th>
//             <th>Height (m)</th>
//             <th>Weight (kg)</th>
//             <th>Base Experience</th>
//           </tr>
//         </thead>

//         <tbody>
//           <tr>
//             <td data-cell="name">Pikachu</td>
//             <td data-cell="type">Electric</td>
//             <td data-cell="height">0.4</td>
//             <td data-cell="weight">6.0</td>
//             <td data-cell="base-exp">112</td>
//           </tr>
//           <tr>
//             <td data-cell="name">Charmander</td>
//             <td data-cell="type">Fire</td>
//             <td data-cell="height">0.6</td>
//             <td data-cell="weight">8.5</td>
//             <td data-cell="base-exp">62</td>
//           </tr>
//           <tr>
//             <td data-cell="name">Squirtle</td>
//             <td data-cell="type">Water</td>
//             <td data-cell="height">0.5</td>
//             <td data-cell="weight">9.0</td>
//             <td data-cell="base-exp">63</td>
//           </tr>
//           <tr>
//             <td data-cell="name">Bulbasaur</td>
//             <td data-cell="type">Grass/Poison</td>
//             <td data-cell="height">0.7</td>
//             <td data-cell="weight">6.9</td>
//             <td data-cell="base-exp">64</td>
//           </tr>
//           <tr>
//             <td data-cell="name">Jigglypuff</td>
//             <td data-cell="type">Normal/Fairy</td>
//             <td data-cell="height">0.5</td>
//             <td data-cell="weight">5.5</td>
//             <td data-cell="base-exp">95</td>
//           </tr>
//           <tr>
//             <td data-cell="name">Snorlax</td>
//             <td data-cell="type">Normal</td>
//             <td data-cell="height">2.1</td>
//             <td data-cell="weight">460.0</td>
//             <td data-cell="base-exp">189</td>
//           </tr>
//         </tbody>


//       </StyledTable>
//     </div>
//   )
// }


const StyledTable = styled.table`
  background-color: #909c9f;
  color: white;
  border-collapse: collapse;
  padding: 1rem;

  th, td, caption {
    padding: .1rem 1rem;
  }

  caption{
    background-color: #479282;
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  th {
    text-align: left;
    background-color: hsl( 0 0% 0% / 0.5);
    border-right: solid 1px black;
  }
  tr:nth-of-type(2n) {
    background-color: hsl( 0 0% 0% / 0.1);
  }

  @media (max-width: 650px) {

    th{
      display: none;
    }

    td{
      display: grid;
      grid-template-columns: 15ch auto;
      gap: .5rem;
      padding: 0.5rem 1rem;
    }

    td:first-child{
      padding-top: 2rem;
    }
    td:last-child{
      padding-bottom: 2rem;
    }

    td::before {
      content: attr(data-cell) ': ';
      font-weight: 700;
      text-transform: capitalize;
    }
  }
`

function AddTableARIA() {
  try {
    var allTables = document.querySelectorAll('table');
    for (var i = 0; i < allTables.length; i++) {
      allTables[i].setAttribute('role', 'table');
    }
    var allCaptions = document.querySelectorAll('caption');
    for (var i = 0; i < allCaptions.length; i++) {
      allCaptions[i].setAttribute('role', 'caption');
    }
    var allRowGroups = document.querySelectorAll('thead, tbody, tfoot');
    for (var i = 0; i < allRowGroups.length; i++) {
      allRowGroups[i].setAttribute('role', 'rowgroup');
    }
    var allRows = document.querySelectorAll('tr');
    for (var i = 0; i < allRows.length; i++) {
      allRows[i].setAttribute('role', 'row');
    }
    var allCells = document.querySelectorAll('td');
    for (var i = 0; i < allCells.length; i++) {
      allCells[i].setAttribute('role', 'cell');
    }
    var allHeaders = document.querySelectorAll('th');
    for (var i = 0; i < allHeaders.length; i++) {
      allHeaders[i].setAttribute('role', 'columnheader');
    }
    // this accounts for scoped row headers
    var allRowHeaders = document.querySelectorAll('th[scope=row]');
    for (var i = 0; i < allRowHeaders.length; i++) {
      allRowHeaders[i].setAttribute('role', 'rowheader');
    }
  } catch (e) {
    console.log("AddTableARIA(): " + e);
  }
}
// todo add back later
// AddTableARIA();