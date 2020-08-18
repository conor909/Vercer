import React from 'react';

export default function Table (props) {

  function getFormattedValue (obj, key) {
    const header = props.headers.find(h => h.propName === key)
    if (header.formatValue) return header.formatValue(obj[key])
    else return obj[key]
  }

  return (
    <table>
      <thead>
        <tr>
          {
            props.headers.map(header =>
              <th key={ header.propName }>{ header.label }</th>)
          }
        </tr>
      </thead>
      <tbody>
        {
          props.data.map((obj, rowIndex) =>
            <tr key={ `row-${ rowIndex }` }>
              {
                props.headers.map(header =>
                  <td key={ `row-${ rowIndex }-${ header.propName }` }>
                    { getFormattedValue(obj, header.propName ) }
                  </td>)
              }
            </tr>
          )
        }
      </tbody>
    </table>
  )
}
