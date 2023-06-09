import React, {useEffect} from 'react';
import BreakdownBar from './BreakdownBar.jsx'

const ProductBreakdown = ({characteristics, characteristicSelections}) => {

  const loadBars = () => {
    var breakdowns = [];
    var key = 1;
    for (const individualCharacteristic in characteristics) {
      breakdowns.push(<BreakdownBar key={key} characteristic={individualCharacteristic} characteristicValue={characteristics[individualCharacteristic]} characteristicSelections={characteristicSelections}/>)
      key+=1;
    }
    return breakdowns;
  }

  return (
    <div data-testid='productBreakdown-1' className="reviews productBreakdown">
    <div className="reviews productBreakdownTitle">Product Breakdown!</div>
    {loadBars()}
    </div>
  )
}

export default ProductBreakdown;