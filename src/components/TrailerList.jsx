import React from 'react'
import Trailer from './Trailer'

export default function TrailerList({data}) {
    let trailers = data.map(function(trailer) {
      return(
      	<Trailer trailer={trailer.id} key={trailer.id}/>
	 
     );
    });
	const style = {
      marginTop: '15px'
    };

    const titleStyle = {
      paddingLeft: '20px'
    };

    if (trailers.length !== 0){
      return(
        <div>
          <h3 style={titleStyle}>Trailers</h3>
          <div style={style}>{trailers}</div>
        </div>
      );
    } else
      return null;
}





